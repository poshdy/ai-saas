"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Check, LucideZap } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  MessagesSquare,
  Code2,
  Video,
  LucideMusic4,
  Image as image,
} from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
type Props = {};
export const Tools = [
  {
    name: "Conversation",

    icon: MessagesSquare,
    color: "text-pink-700",
    bgColor: "text-pink-700/10",
  },
  {
    name: "Image Generation",

    icon: image,
    color: "text-violet-700",
    bgColor: "text-violet-700/10",
  },
  {
    name: "Code Generation",

    icon: Code2,
    color: "text-purple-700",
    bgColor: "text-purple-700/10",
  },
  {
    name: "Music Generation",

    icon: LucideMusic4,
    color: "text-yellow-700",
    bgColor: "text-yellow-700/10",
  },
  {
    name: "Video Generation",

    icon: Video,
    color: "text-blue-700",
    bgColor: "text-blue-700/10",
  },
];
function ProModal({}: Props) {
  const { isOpen, onClose, onOpen } = useProModal();
  const [Loading, setLoading] = useState(false);
  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Somthing went wrong!");

      console.log("STRIPE_CLIENT_ERRRO", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className=" ">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold text-xl">
              Upgrade to Genius
              <Badge variant="pre" className="uppercase text-sm py-1">
                pro
                <LucideZap />
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center pt-2 space-y-2 text-primary font-semibold">
          {Tools.map((tool) => (
            <Card
              key={tool.name}
              className="p-3 border-black/5 flex items-center justify-between"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                  <tool.icon className={cn("w-6 h-6", tool.color)} />
                </div>
                <div className="font-semibold text-sm">{tool.name}</div>
              </div>
              <Check className="text-primary w-5 h-5" />
            </Card>
          ))}
        </DialogDescription>
        <DialogFooter>
          <Button
            disabled={Loading}
            onClick={onSubscribe}
            size="lg"
            variant="pre"
            className="w-full"
          >
            Upgrade
            <LucideZap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProModal;
