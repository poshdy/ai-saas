"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ImageAmount, ImageResolution, formSchema } from "./constant";
import { ImageGenerateParams } from "openai/resources/index.mjs";
import { cn } from "@/lib/utils";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

const ImagePage = () => {
  const { onOpen } = useProModal();
  const router = useRouter();
  const [Images, setImages] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resoultion: "512x512",
    },
  });
  let isLoading = form.formState.isSubmitting;
  const Submit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);

      const response = await axios.post("/api/image", values);
      const urls = response.data.map((image: { url: string }) => image.url);
      setImages(urls);
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
        title="Image Generation"
        desc="TRANSFORM ANY THOGHT TO AN IMAGE"
        color="text-violet-700"
        bgColor="bg-violet-700/10"
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
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0
                       outline-none
                        focus-visible:ring-0
                         focus-visible:ring-transparent
                          bg-transparent"
                      disabled={isLoading}
                      placeholder="An image for cat on the moon"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-3">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl className="m-0 p-2">
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ImageAmount.map((opt) => (
                        <SelectItem value={opt.value} key={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resoultion"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-3">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl className="m-0 p-2">
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ImageResolution.map((opt) => (
                        <SelectItem value={opt.value} key={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button
              variant={"pre"}
              className=" col-span-12 w-full font-bold"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {Images.map((src) => (
            <Card key={src} className="rounded-lg bg-[#121212] overflow-hidden">
              <div className="relative aspect-square">
                <Image fill alt="Generated" src={src} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImagePage;
