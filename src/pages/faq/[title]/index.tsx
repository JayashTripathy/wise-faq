import React, { CSSProperties, ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { Link1Icon } from "@radix-ui/react-icons";
import { getTheme } from "@/utils/getPageTheme";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import Accordion from "@/components/accordion";
import { Copy, ExternalLink, Bot, ArrowLeft } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/loader";
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
import { Button } from "@/components/ui/button";
import ChatBox from "@/components/chatbox";
import { pageFonts } from "@/utils/pageThemes";
import Image from "next/image";
import MainFaqSection from "@/components/mainFaqSection";

function Index(props: { faqData: string }) {
  const router = useRouter();
  const title = router.query.title as string;
  const { data } = useSession();
  const me = data?.user;

  const [isChatboxOpen, setIsChatboxOpen] = useState<boolean | null>(null);

  const {
    data: faq,
    refetch: refetchFaq,
    isLoading: pageLoading,
  } = api.faq.getFaqPage.useQuery(
    { faqTitle: title },
    {
      enabled: !!title,
    },
  );
  const createVectorEmbedings = api.faq.createVectorEmbeddings.useMutation({
    onSuccess: async () => {
      toast({
        title: "Success!",
        description: "AI bot is now live on your page",
        type: "background",
        duration: 2000,
      });

      await refetchFaq();
    },
  });

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
        className={`text-lg font-semibold ${faq?.theme}  `}
        style={{
          color: `hsl(${styles?.primary})` ?? " ",
        }}
        {...rest}
      >
        {children}
      </div>
    );
  };
  const pageUrl =
    typeof window !== "undefined" && window.location.href.split("?")[0];
  return (
    <>
      {pageLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader className="w-10 " />
        </div>
      ) : (
        <div
          className={`absolute inset-0 h-screen overflow-auto`}
          style={
            {
              background: `hsl(${styles?.background})`,
              color: `hsl(${styles?.foreground})`,
              fontFamily: faq?.font && `var(${pageFonts[faq.font]})`,
            } as CSSProperties
          }
        >
          {isAdmin && adminMode ? (
            <>
              <div className="mx-1 md:mx-auto md:w-3/4 ">
                <br />
                <button
                  className="flex gap-2 py-3 "
                  onClick={() => router.back()}
                >
                  {" "}
                  <ArrowLeft /> back
                </button>
                <div
                  className="mb-6 rounded-2xl p-1 md:p-8"
                  style={{
                    background: `hsla(${styles?.muted}/.3)`,
                  }}
                >
                  <div className="flex flex-col items-center justify-between gap-6 md:flex-row ">
                    <div className=" flex  w-full items-center gap-2">
                      <div
                        className="max-w-[80px] overflow-hidden  rounded-full   "
                        style={{
                          background: `hsl(${styles?.background})`,
                        }}
                        aria-disabled={true}
                      >
                        <Image
                          width="30"
                          height="30"
                          src="/stars.gif"
                          className=" w-full  "
                          alt=""
                          aria-disabled={true}
                        />
                      </div>
                      <div>
                        <div className="font-bold md:text-2xl ">
                          Your page is live!
                        </div>
                        <div
                          className="text-sm"
                          style={{
                            color: `hsl(${styles?.mutedForeground})`,
                          }}
                        >
                          page is now accessible and you can share this with
                          your viewers <br />
                        </div>
                      </div>
                    </div>
                    <AlertDialog>
                      <div className="flex h-20 w-full  items-center gap-2 p-2 md:justify-end ">
                        <AlertDialogTrigger asChild>
                          {isAIMode && (
                            <Button
                              className={` flex h-full  items-center justify-center rounded-2xl bg-gray-800  px-3  font-bold hover:bg-gray-500 md:text-2xl  `}
                              disabled={
                                createVectorEmbedings.isLoading || faq.aiMode
                              }
                            >
                              {createVectorEmbedings.isLoading ||
                                (faq.aiMode ? "AI Enabled" : "AI")}
                              {createVectorEmbedings.isLoading && (
                                <div className="flex items-center gap-2 text-xl ">
                                  <svg
                                    aria-hidden="true"
                                    className="h-8 w-8 animate-spin "
                                    style={{
                                      fill: `hsl(${styles?.primary})`,
                                      color: `hsl(${styles?.mutedForeground})`,
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
                                      It will take a while...
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Button>
                          )}
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Congratulations ✨
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              You are eligible to convert you normal FAQ page to
                              a Smart FAQ page by addding a AI bot to your page.
                              This will allow your viewers to ask questions to
                              the bot and get answers to their questions from a
                              AI agent that is fine tuned on your FAQ page data.
                            </AlertDialogDescription>
                            <div>Note: This process can take few minutes</div>
                          </AlertDialogHeader>
                          <AlertDialogFooter className=" flex w-full flex-col">
                            <AlertDialogCancel className="w-full">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                faq &&
                                createVectorEmbedings.mutate({
                                  trainingData: faq,
                                  faqId: faq.id,
                                })
                              }
                              className="w-full font-bold"
                              style={{
                                background: `hsl(${styles?.primary})`,
                                color: `hsl(${styles?.background})`,
                              }}
                            >
                              Start
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                        <button
                          className={` flex aspect-square h-full items-center justify-center rounded-2xl p-3 `}
                          style={{
                            borderColor: `hsl(${styles?.primary})`,
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
                          <Copy />
                        </button>
                        <button
                          style={{
                            background: `hsl(${styles?.primary})`,
                            color: `hsl(${styles?.background})`,
                          }}
                          className=" flex aspect-square h-full items-center justify-center rounded-2xl p-3"
                          onClick={() =>
                            pageUrl &&
                            void window.open(pageUrl, "_blank", "noreferrer")
                          }
                        >
                          <ExternalLink />
                        </button>
                      </div>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          {faq && <MainFaqSection faq={faq} />}

          {faq?.aiMode && (
            <>
              <div className="fixed bottom-6 right-5  z-50 opacity-100 md:right-32">
                <Button
                  style={{
                    background: `hsl(${styles?.primary})`,
                    color: `hsl(${styles?.background})`,
                  }}
                  className="rounded-full p-5 font-bold md:text-2xl"
                  onClick={() => setIsChatboxOpen(true)}
                >
                  AI Bot &nbsp;
                  <Bot size={30} />
                </Button>
              </div>

              <ChatBox
                theme={faq?.theme ?? undefined}
                onClose={() => setIsChatboxOpen(false)}
                open={isChatboxOpen}
                faqId={faq.id}
                faqTitle={title}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Index;
