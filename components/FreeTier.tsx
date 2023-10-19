import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_TRAILS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { LucideZap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";

type Props = {
  LimitCount: number | undefined;
  isPro: boolean | undefined
};

function FreeTier({ LimitCount = 0, isPro = false }: Props) {
  const { onOpen } = useProModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  if (isPro) {
    return null;
  }
  return (
    <section className="px-4 ">
      <Card className="bg-[#2d2d2d] border-none text-primary ">
        <CardContent className="py-5">
          <div className="text-center text-sm mb-4 space-y-2">
            <p className="">
              {LimitCount} / {MAX_FREE_TRAILS} Free Generations
            </p>
            <Progress
              className="h-3 bg-black"
              value={(LimitCount / MAX_FREE_TRAILS) * 100}
            />
          </div>
          <Button onClick={() => onOpen()} variant={"pre"} className="w-full">
            Upgrade
            <LucideZap />
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

export default FreeTier;
