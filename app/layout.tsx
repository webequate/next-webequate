import "@/styles/globals.css";
import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import Layout from "@/components/Layout";
import Providers from "./providers";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://webequate.com"),
  title: "WebEquate",
  description: "WebEquate. Your full service web development partner.",
  icons: {
    icon: "/webequate.png",
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className="flex flex-col bg-light-1 dark:bg-black">
        <Providers>
          <div className="mx-auto max-w-7xl sm:px-8 lg:px-16">
            <Layout>{children}</Layout>
          </div>
        </Providers>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
      </body>
    </html>
  );
};

export default RootLayout;
