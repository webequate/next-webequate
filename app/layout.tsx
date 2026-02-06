import "@/styles/globals.css";
import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import Layout from "@/components/Layout";
import Providers from "./providers";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://webequate.com"),
  title: {
    template: "%s | WebEquate",
    default: "WebEquate | Full Service Web Development",
  },
  description:
    "WebEquate is your full service web development partner. We build custom websites, web applications, and digital solutions.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://webequate.com",
    siteName: "WebEquate",
    images: [
      {
        url: "/images/webequate-og.jpg",
        width: 1200,
        height: 630,
        alt: "WebEquate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@WebEquate",
    creator: "@WebEquate",
  },
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
