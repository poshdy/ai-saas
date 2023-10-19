"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { formSchema } from "./constant";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/Loader";
// import {ChatCompletionRequestMessage } from 'openai'
import BotAvatar from "@/components/BotAvatar";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/UserAvatar";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

type Props = {};

const page = (props: Props) => {
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
        Icon={MessageSquare}
        title="Conversation"
        desc="ASK UR PAL ABOUT ANYTHING!"
        color="text-pink-700"
        bgColor="bg-pink-700/10"
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
                      placeholder="How I can Help Your"
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
        {!messages && !isLoading && <h1>No Conversation generated</h1>}
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
              <p className="text-sm">{message.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
