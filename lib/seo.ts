import type { Metadata } from "next";

const SITE_NAME = "WebEquate";
const SITE_URL = "https://webequate.com";
const DEFAULT_OG_IMAGE = "/images/webequate-og.jpg";
const TWITTER_HANDLE = "@WebEquate";

export type SeoMetadataProps = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
};

export const generateSeoMetadata = ({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
  ogType = "website",
  twitterCard = "summary_large_image",
  robots,
}: SeoMetadataProps): Metadata => {
  const url = `${SITE_URL}${path}`;
  const absoluteOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${SITE_URL}${ogImage}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: absoluteOgImage,
          alt: ogImageAlt || title,
        },
      ],
      locale: "en_US",
      type: ogType,
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: [absoluteOgImage],
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
    },
    robots: robots
      ? {
          index: robots.index ?? true,
          follow: robots.follow ?? true,
        }
      : undefined,
  };
};
