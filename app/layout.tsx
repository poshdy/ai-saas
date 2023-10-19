import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import ModalProvider from "@/components/Providers/modal-provider";
import ToastProvider from "@/components/Providers/Toast-provider";
import CrispProvider from "@/components/Providers/crisp-provider";
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UR AI PAL",
  description: "AI Saas Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider />
        <body className={cn("bg-[#1f1f1f] dark", montserrat.className)}>
          {children}
          <ModalProvider />

          <ToastProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}
