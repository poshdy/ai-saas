"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { LucideZap } from "lucide-react";
import toast from "react-hot-toast";

type Props = {
  isPro: boolean | undefined;
};

const Subscriptionbutton = ({ isPro }: Props) => {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/stripe");
      window.location.href = res.data.url;
    } catch (error) {
      toast.error("Somthing went wrong!");

      console.log("BILLING ERROR", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      onClick={handleClick}
      variant={isPro ? "default" : "pre"}
    >
      {isPro ? "Manage Subscription" : "Upgarde"}
      {!isPro && <LucideZap />}
    </Button>
  );
};

export default Subscriptionbutton;
