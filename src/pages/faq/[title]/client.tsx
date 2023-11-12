"use client";
import React, { CSSProperties, ReactNode, useEffect } from "react";
import Link from "next/link";
import { Link1Icon } from "@radix-ui/react-icons";
import { getTheme } from "@/utils/getPageTheme";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import Accordion from "@/components/accordion";
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function Client(props: { title: string }) {
  const { title } = props;
  const { data } = useSession();

  const me = data?.user;
  const router = useRouter();
  const { data: faq } = api.faq.getFaqPage.useQuery(
    { faqTitle: title },
    {
      enabled: !!title,
    },
  );
  const createVectorEmbedings = api.faq.createVectorEmbeddings.useMutation({
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "AI bot is now live on your page",
        type: "background",
        duration: 2000,
      });
    },
  });

  console.log(createVectorEmbedings.isLoading);

  const styles = getTheme(faq?.theme ?? undefined);
  const searchParams = useSearchParams();
  const adminMode = searchParams.get("adminMode");

  const isAdmin = me?.id == faq?.userId;

  const isAIMode = faq && JSON.stringify(faq).length > 2500;

  const Subheading = (props: {
    children: ReactNode;
    [key: string]: any;
  }): React.ReactElement => {
    const { children, ...rest } = props;
    return (
      <div
        className={`text-lg font-semibold ${faq?.theme} text-primary `}
        style={{
          color: styles?.primary ?? " ",
        }}
        {...rest}
      >
        {children}
      </div>
    );
  };

  const pageUrl = window.location.href.split("?")[0];

  return (
    <div
      className={` absolute inset-0 h-screen overflow-auto   `}
      style={
        {
          background: styles?.background,
          color: styles?.foreground,
        } as CSSProperties
      }
    >
      {isAdmin && adminMode ? (
        <div
          className=" mx-2 my-4 mb-0  rounded-2xl p-3  md:mx-auto md:w-3/4  "
          style={{
            background: styles?.accent,
          }}
        >
          <div className="">
            <div className="flex items-center">
              <div className="max-w-[100px] rounded-full  p-4  ">
                <img src="/stars.gif" className=" w-full  " />
              </div>
              <div className="w-full items-center justify-between md:flex">
                <div>
                  <div
                    className="font-bold md:text-2xl "
                    style={{
                      color: styles?.primary,
                    }}
                  >
                    Your page is live!
                  </div>
                  <div
                    className="text-sm"
                    style={{
                      color: styles?.mutedForeground,
                    }}
                  >
                    page is now accessible and you can share this where you
                    viewers <br />
                  </div>
                </div>
                <AlertDialog>
                  <div className="flex h-full gap-2 ">
                    <AlertDialogTrigger asChild>
                      {isAIMode && (
                        <button
                          className={` flex h-full  items-center justify-center  rounded-2xl p-3 text-2xl font-bold `}
                          style={{
                            borderColor: styles?.primary,
                            borderWidth: "1px",
                            borderStyle: "solid",
                          }}
                          disabled={createVectorEmbedings.isLoading}
                        >
                          {createVectorEmbedings.isLoading ? (
                            <div className="flex items-center gap-2 text-xl ">
                              <svg
                                aria-hidden="true"
                                className="h-8 w-8 animate-spin "
                                style={{
                                  fill: styles?.primary,
                                  color: styles?.mutedForeground,
                                }}
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                              <div className="leading- text-left">
                                <span>Processing...</span>
                                <div className="text-xs opacity-40">
                                  please be patience.
                                </div>
                              </div>
                            </div>
                          ) : (
                            "AI"
                          )}
                        </button>
                      )}
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Congratulations ✨</AlertDialogTitle>
                        <AlertDialogDescription>
                          You are eligible to convert you normal FAQ page to a
                          Smart FAQ page by addding a AI bot to your page. This
                          will allow your viewers to ask questions to the bot
                          and get answers to their questions from a AI agent
                          that is fine tuned on your FAQ page data.
                        </AlertDialogDescription>
                        <div>Note: This process can take few minutes</div>
                      </AlertDialogHeader>
                      <AlertDialogFooter className=" flex w-full flex-col">
                        <AlertDialogCancel className="w-full">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            createVectorEmbedings.mutate({ trainingData: faq })
                          }
                          className="w-full"
                          style={{
                            background: styles?.primary,
                          }}
                        >
                          Start
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                    <button
                      className={` aspect-square h-full rounded-2xl p-3 `}
                      style={{
                        borderColor: styles?.primary,
                        borderWidth: "1px",
                        borderStyle: "solid",
                      }}
                      onClick={async () => {
                        if (pageUrl) {
                          await navigator.clipboard.writeText(pageUrl);
                          toast({
                            title: "Success!",
                            description: "Link copied to clipboard",
                            type: "background",
                            duration: 2000,
                          });
                        }
                      }}
                    >
                      <Copy size={30} />
                    </button>
                    <button
                      style={{
                        background: styles?.primary,
                        color: styles?.background,
                      }}
                      className=" aspect-square h-full rounded-2xl p-3"
                      onClick={() =>
                        pageUrl &&
                        void window.open(pageUrl, "_blank", "noreferrer")
                      }
                    >
                      <ExternalLink size={30} />
                    </button>
                  </div>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div
        className={` mx-auto  md:w-3/4 ${
          faq?.logo ?? faq?.backdrop ? "md:translate-y-10" : ""
        }`}
      >
        {faq?.backdrop && (
          <div
            className="grid  aspect-[5/1] w-full items-center justify-center overflow-hidden   bg-muted md:rounded-3xl   "
            style={
              {
                backgroundImage: `url(${faq.backdrop})`,
                backgroundSize: "cover",
              } as CSSProperties
            }
          ></div>
        )}
        <div className=" overflow-visible px-4">
          {faq?.logo && (
            <div
              className={`relative my-3  grid  items-center gap-1.5 rounded-3xl  py-6`}
            >
              <div
                className={`} absolute -bottom-16 left-1/2 mb-14  grid
            aspect-square w-[120px]  -translate-x-1/2 items-center  justify-center rounded-3xl border-[5px] border-background bg-muted p-3   `}
                style={{
                  backgroundImage: `url(${faq.logo})`,
                  backgroundSize: "cover",
                }}
              />
            </div>
          )}
          <div className="pt-5 text-center text-3xl font-bold ">
            {faq?.title}
          </div>
          {faq?.organization && (
            <div className="text-center text-sm italic opacity-70">
              {faq.organization}
            </div>
          )}
          <div className="my-4 mt-10 flex w-full flex-col gap-10 md:flex-row">
            <div className={`${faq?.address && "md:w-[70%]"}`}>
              <Subheading>Description</Subheading>
              <p className="py-1 text-sm  ">{faq?.description}</p>
            </div>
            {faq?.socials && (
              <div className="">
                <Subheading>Socials</Subheading>
                <div className="mt-1 flex">
                  {faq.socials.map((social, index) => (
                    <Link
                      key={index}
                      href={social.url}
                      className=" flex items-center justify-center gap-2 rounded-full  px-2 py-1 text-sm"
                      style={{
                        color: styles?.background,
                        background: styles?.primary,
                      }}
                    >
                      {social.name}
                      <Link1Icon />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Accordion faqs={faq?.faqs} theme={faq?.theme ?? undefined} />
        </div>
      </div>
    </div>
  );
}

export default Client;
