"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { Code2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/Loader";
// import {ChatCompletionRequestMessage } from 'openai'
import BotAvatar from "@/components/BotAvatar";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/UserAvatar";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";
type Props = {};

const CodePage = (props: Props) => {
  const { onOpen } = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  let isLoading = form.formState.isSubmitting;
  const Submit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        onOpen();
      } else {
        toast.error("Somthing went wrong!");
      }
    } finally {
      router.refresh();
    }
  };
  return (
    <section className="px-2 md:px-4 ">
      <Heading
        Icon={Code2}
        title="Code Generation"
        desc="LET ME HELP YOU TO WRITE CODE AND DEBUG!"
        color="text-purple-700"
        bgColor="bg-purple-700/10"
      />
      <div>
        <Form {...form}>
          <form
            className="  rounded-lg 
            border 
            w-full 
            p-4 
            px-3 
            md:px-6 
            focus-within:shadow-sm
            grid
            grid-cols-12
            gap-2"
            onSubmit={form.handleSubmit(Submit)}
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0
                       outline-none
                        focus-visible:ring-0
                         focus-visible:ring-transparent
                          bg-transparent"
                      disabled={isLoading}
                      placeholder="Generate a modal code snippet for React and Tailwind"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              variant={"pre"}
              className=" col-span-12  w-full  font-bold"
              disabled={isLoading}
            >
              Generate
            </Button>
          </form>
        </Form>
        {isLoading && (
          <div className="p-20 ">
            <Loader />
          </div>
        )}
        <div className="flex flex-col-reverse gap-y-4 mb-2">
          {messages.map((message) => (
            <div
              key={message.content}
              className={cn(
                "p-8 w-full flex items-start gap-x-8 rounded-lg text-primary",
                message.role === "user"
                  ? " border bg-black/25 "
                  : "bg-[#121212]"
              )}
            >
              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
              <ReactMarkdown
                components={{
                  pre: ({ node, ...props }) => (
                    <div className="bg-[#1d1d1d]/30 overflow-auto w-full rounded-lg my-2 p-2">
                      <pre {...props} />
                    </div>
                  ),
                  code: ({ node, ...props }) => (
                    <code
                      {...props}
                      className="bg-[#1d1d1d]/50 rounded-lg p-2"
                    />
                  ),
                }}
                className={"overflow-hidden text-sm "}
              >
                {message.content || ""}
              </ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodePage;
