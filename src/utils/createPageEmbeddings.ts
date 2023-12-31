import { JSONLoader } from "langchain/document_loaders/fs/json";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

import { TextLoader } from "langchain/document_loaders/fs/text";
import {
  SupabaseFilterRPCCall,
  SupabaseVectorStore,
} from "langchain/vectorstores/supabase";
import { supabaseClient } from "@/lib/supabaseClient";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Faq, Social } from "@/types/faq";
import { formSchema } from "@/lib/validators/FaqForm";
import { z } from "zod";

const embeddings =
  process.env.OPENAI_API_KEY &&
  new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

const client = supabaseClient();

export const vectorEmbeddings = {
  create: async (props: {
    data: z.infer<typeof formSchema> & { id: string };
  }) => {
    const { data } = props;
    if (!data.faqs) return;

    function formatFAQ(question: string, answer: string) {
      return `Question: ${question}\nAnswer: ${answer}`;
    }

    const { title, description, address, backdrop, logo, theme, socials } =
      data;

    const filteredProps = {
      title,
      description,
      address,
      backdrop,
      logo,
      theme,
    };

    const formattedOtherDetails = Object.entries(filteredProps).map(
      ([key, value]) => `${key}: "${value}".\n`,
    );
    const formatedSocials =
      socials &&
      socials.map(
        (social: Social) =>
          `The name of the website link is "${social.name}" and the URL for this is  "${social.url}."`,
      );

    if (!data.faqs) return;
    const formattedFaq = data.faqs
      .map((faq) => formatFAQ(faq.question, faq.answer))
      .join("\n");

    const stagingTrainingData = new Blob(
      [
        ...formattedOtherDetails,
        "\n",
        "Frequently asked question are -\n",
        ...formattedFaq,
        "\n",
        ...formatedSocials,
      ],
      { type: "text/plain" },
    );

    const loader = new TextLoader(stagingTrainingData);
    const dataset = await loader.load();

    const trainingData = dataset.map((item) => ({
      pageContent: item.pageContent,
      metadata: { ...item.metadata, faqId: data.id, faqTitle: data.title },
    }));

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 50,
      lengthFunction: (item) => item.length,
    });
    const splittedTrainingData = await splitter.splitDocuments(trainingData);

    embeddings &&
      (await SupabaseVectorStore.fromDocuments(
        splittedTrainingData,
        embeddings,
        {
          client,
          tableName: "documents",
          queryName: "match_documents",
        },
      ));
  },
  find: async (props: { faqId: string; question: string }) => {
    const { faqId, question } = props;

    if (!faqId) {
      throw new Error("faqId is required");
    }
    if (!question) {
      throw new Error("question is required");
    }

    const vectorStore =
      embeddings &&
      (await SupabaseVectorStore.fromExistingIndex(embeddings, {
        client,
        tableName: "documents",
        queryName: "match_documents",
      }));

    const result =
      vectorStore &&
      (await vectorStore.similaritySearch(question, 2, {
        faqId: faqId,
      }));
    return result;
  },
  // delete: async (props: { faqId: string }) => {
  //   const { faqId } = props;

  //   if (!faqId) {
  //     throw new Error("faqId is required");
  //   }

  //   const vectorStore =
  //     embeddings &&
  //     (await SupabaseVectorStore.fromExistingIndex(embeddings, {
  //       client,
  //       tableName: "documents",
  //       queryName: "match_documents",
  //     }));
  //   const result = vectorStore && (await vectorStore.addDocuments([]));

  //   console.log("test", result);

  
  //   // const result = vectorStore && (await vectorStore.delete({ ids: [11] }));
  //   console.log("test", result);
  //   return result;
  // },
};
