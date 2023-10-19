"use client";

import React, { useEffect, useState } from "react";
import ProModal from "../ProModal";

type Props = {};

const ModalProvider = (props: Props) => {
  const [Mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!Mounted) {
    return null;
  }
  return <ProModal />;
};

export default ModalProvider;
