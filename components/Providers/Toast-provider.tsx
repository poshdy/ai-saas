"use client";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
type Props = {};

const ToastProvider = (props: Props) => {
  const [Mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!Mounted) {
    return null;
  }
  return <Toaster position="top-center" />;
};

export default ToastProvider;
