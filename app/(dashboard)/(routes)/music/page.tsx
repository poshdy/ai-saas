"use client";
import React, { useState } from "react";
import * as z from "zod";
import { Music4 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { formSchema } from "./constant";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";
type Props = {};

const page = (props: Props) => {
  const { onOpen } = useProModal();
  const router = useRouter();
  const [music, setMusic] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  let isLoading = form.formState.isSubmitting;
  const Submit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post("/api/music", values);

      setMusic(response.data.audio);
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
        Icon={Music4}
        title="Music Generation"
        desc="I CAN GENEREATE ANY SOUND YOU WANT!"
        color="text-yellow-700"
        bgColor="bg-yellow-700/10"
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
                      placeholder="What do you want to listen"
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
          <div className="p-20">
            <Loader />
          </div>
        )}
        {!music && !isLoading && <h1>No Music generated</h1>}
        {music && (
          <audio controls className="w-full mt-8">
            <source src={music} />
          </audio>
        )}
      </div>
    </section>
  );
};

export default page;
