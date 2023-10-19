"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("f61a6a2a-0dd8-417f-9ae4-bec33b05a06f");
  }, []);
  return null;
};
