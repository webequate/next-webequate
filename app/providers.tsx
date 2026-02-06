"use client";
import { ThemeProvider } from "next-themes";
import UseScrollToTop from "@/hooks/useScrollToTop";
import type { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
      <UseScrollToTop />
    </ThemeProvider>
  );
};

export default Providers;
