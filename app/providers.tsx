"use client";

import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";
import UseScrollToTop from "@/hooks/useScrollToTop";
import type { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AnimatePresence>{children}</AnimatePresence>
      <UseScrollToTop />
    </ThemeProvider>
  );
};

export default Providers;
