import { getTheme } from "@/utils/getPageTheme";
import React, { useEffect, useRef, useState } from "react";
import {
  Bot,
  Send,
  SendHorizontal,
  Trash2,
  User,
  User2,
  User2Icon,
  X,
} from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useAtom } from "jotai";
import { storageAtom } from "@/storage";
import { api } from "@/utils/api";
import { toast } from "./ui/use-toast";
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
import { THEME } from "@prisma/client";

function ChatBox(props: {
  theme?: THEME;
  onClose?: () => void;
  open?: boolean | null;
  faqId: string;
  faqTitle: string;
}) {
  const { theme, onClose, open, faqId, faqTitle } = props;
  const styles = getTheme(theme);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");
  const [storage, setStorage] = useAtom(storageAtom);
  const [streamingRes, setStreamingRes] = useState("");
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const chatAnimation =
    open === null ? "-translate-y-[100%]" : open ? "chat " : "hideChat";

  const aiMsgMutation = api.faq.generateAIResponse.useMutation();

  const scrollChatToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };
  const messages = storage?.messages.filter((item) => item.faqid === faqId);

  const noMessages = messages && messages.length > 0;

  const onSend = () => {
    if (!input) {
      toast({
        variant: "default",
        title: "Error!",
        description: ` Message cannot be empty!`,
      });
      return;
    }
    setStorage((p) => ({
      ...p,
      messages: [
        ...(p?.messages ?? []),
        {
          faqid: faqId,
          isSent: true,
          timestamp: Date.now(),
          message: input,
        },
      ],
    }));
    setInput(() => "");
    aiMsgMutation.mutate(
      { faqId: faqId, question: input },
      {
        onSuccess: async (data: any) => {
          try {
            const response = await fetch("/api/ask", {
              method: "POST",
              body: JSON.stringify({
                faqId: faqId,
                question: input,
                context: data,
                prevQuestions: messages && messages.slice(-5),
              }),
            });
            if (response.status === 500) {
              toast({
                variant: "default",
                title: "Error!",
                description: `Something went wrong!`,
              });
              return;
            }

            if (response.body) {
              const reader = response.body.getReader();
              const decoder = new TextDecoder();
              let done = false;
              let finalRes = "";
              while (!done) {
                scrollChatToBottom();
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value);
                setStreamingRes((p) => p + chunkValue);
                finalRes += chunkValue;
              }
              setStreamingRes("");
              setStorage((p) => ({
                ...p,
                messages: [
                  ...(p?.messages ?? []),
                  {
                    faqid: faqId,
                    isSent: false,
                    timestamp: Date.now(),
                    message: finalRes,
                  },
                ],
              }));
            }
          } catch (e) {
            console.log(e);
          }
        },
      },
    );
  };

  useEffect(() => {
    if (storage?.messages) {
      scrollChatToBottom();
    }
  }, [storage?.messages]);

  return (
    <AlertDialog>
      <div
        className={`fixed left-0 top-0 z-[51] flex h-screen w-screen ${chatAnimation}   `}
      >
        <div
          className=" relative mx-5 my-10 mb-32 flex   w-full flex-col rounded-3xl shadow-lg lg:mx-auto lg:w-2/5 "
          style={{
            backgroundColor: `hsl(${styles?.secondary})`,
            color: `hsl(${styles?.popoverForeground})`,
          
          }}
        >
          <div>
            <div className="flex justify-between px-5">
              <div className="my-3 flex flex-1 items-center gap-2  text-xs font-bold md:text-base ">
                <span
                  className="aspect-square rounded-full p-1 md:p-2"
                  style={{
                    backgroundColor: `hsl(${styles?.primary})`,
                    color: `hsl(${styles?.primaryForeground})`,
                  }}
                >
                  <Bot />{" "}
                </span>
                {faqTitle} AI
              </div>
              {noMessages && (
                <AlertDialogTrigger>
                  <button
                    className="mr-3 flex font-  items-center justify-center gap-2 rounded-full  px-2  py-1 text-xs font-bold transition-all duration-100  md:mx-10"
                    style={{
                      backgroundColor: `hsl(${styles?.background})`,
                      color: `hsl(${styles?.destructive})`,
                      borderColor: `hsl(${styles?.destructive})`,
                      borderWidth: "1px",
                      borderStyle: "solid",
                    }}
                  >
                    Clear chat <Trash2 size={20} />
                  </button>
                </AlertDialogTrigger>
              )}
              <AlertDialogContent
                style={{
                  backgroundColor: `hsl(${styles?.popover})`,
                  borderColor: `hsl(${styles?.border})`,
                  borderStyle: "solid",
                  borderWidth: "1px",
                  color: `hsl(${styles?.popoverForeground})`,
                  zIndex: 100,
                }}
              >
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    all the chat history.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    style={{
                      background: `hsl(${styles?.popover})`,
                      color: `hsl(${styles?.popoverForeground})`,
                    }}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    style={{
                      backgroundColor: `hsl(${styles?.primary})`,
                      color: `hsl(${styles?.primaryForeground})`,
                    }}
                    onClick={() => {
                      const newMessages = storage?.messages.filter(
                        (item) => item.faqid !== faqId,
                      );
                      setStorage((p) => ({
                        ...p,
                        messages: newMessages ? newMessages : [],
                      }));
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
              <button onClick={onClose}>
                <X className="cursor-pointer transition-all duration-100 hover:scale-75 hover:opacity-60" />
              </button>
            </div>
            <div
              style={{
                borderWidth: "1px",
                opacity: 0.2,
                borderColor: `hsl(${styles?.popoverForeground})`,
                width: "100%",
              }}
            ></div>
          </div>

          <div
            className=" mb-16 flex flex-1  flex-col overflow-auto "
            ref={messageContainerRef}
          >
            {!noMessages && (
              <div
                className="flex h-full w-full flex-col items-center justify-center "
                style={{
                  color: `hsl(${styles?.mutedForeground})`,
                }}
              >
                <img src="/bot.gif" className="w-20 "></img>
                {` Ask anything about ${faqTitle}...`}
              </div>
            )}
            {storage?.messages?.map(
              (item, index) =>
                faqId === item.faqid && (
                  <div
                    key={index}
                    className="px-4 py-2 "
                    style={{
                      backgroundColor: item.isSent ? " " : "rgba(0,0,0,0.3)",
                      color: item.isSent ? " " : `hsl(${styles?.primary})`,
                    }}
                  >
                    <div className="flex gap-5">
                      <div className=" opacity-50 ">
                        {item.isSent ? <User2Icon /> : <Bot />}
                      </div>
                      {item.message}
                    </div>
                  </div>
                ),
            )}
            {aiMsgMutation.isLoading && (
              <div
                className="px-4 py-2 flex space-x-2  "
                style={{
                  backgroundColor: `hsl(${styles?.muted})`,
                  color: `hsl(${styles?.primary})`,
                }}
              >
                <span className="sr-only">Loading...</span>
                <div
                  className="h-2 w-2 animate-bounce rounded-full  [animation-delay:-0.3s]"
                  style={{
                    backgroundColor: `hsl(${styles?.mutedForeground})`,
                  }}
                ></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]"
                  style={{
                    backgroundColor: `hsl(${styles?.primary})`,
                  }}
                ></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full"
                  style={{
                    backgroundColor: `hsl(${styles?.mutedForeground})`,
                  }}
                ></div>
              </div>
            )}
            {streamingRes && (
              <div
                className="px-4 py-2 "
                style={{
                  backgroundColor: "rgba(0,0,0,0.3)",
                  color: `hsl(${styles?.primary})`,
                }}
              >
                <div className="flex gap-5">
                  <div className=" opacity-50 ">
                    <Bot />
                  </div>
                  {streamingRes}
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-0 flex w-full  items-end p-1 ">
            <textarea
              className=" h-[50px]  max-h-[400px] flex-1 resize-none overflow-auto rounded-2xl p-3  outline-none"
              style={{
                background: `hsl(${styles?.background})`,
                color: `hsl(${styles?.mutedForeground})`,
              }}
              ref={inputRef}
              value={input}
              placeholder="Type your question..."
              onInput={(e) => {
                setInput(e.currentTarget.value);
                e.currentTarget.style.height = "50px";
                e.currentTarget.style.height =
                  e.currentTarget.scrollHeight + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSend();
                }
              }}
            />
            <button
              className="absolute right-2  flex cursor-pointer items-center justify-center rounded-2xl p-3"
              style={{
                color: `hsl(${styles?.primary})`,
              }}
              onClick={onSend}
            >
              <SendHorizontal />
            </button>
          </div>
        </div>
      </div>
    </AlertDialog>
  );
}

export default ChatBox;
