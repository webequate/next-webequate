import { describe, it, expect } from "vitest";
import { generateSeoMetadata } from "@/lib/seo";
import type { Metadata } from "next";

// Convenience helpers to access the complex union types Next.js uses for OG/Twitter
type OGImage = { url: string; alt?: string };
const ogImages = (meta: Metadata): OGImage[] =>
  (meta.openGraph as { images?: OGImage[] })?.images ?? [];
const twitterImages = (meta: Metadata): string[] =>
  (meta.twitter as { images?: string[] })?.images ?? [];

const BASE = { title: "Test", description: "Desc", path: "/test" };

describe("generateSeoMetadata", () => {
  // ── title, description, canonical ────────────────────────────────────────
  it("passes title and description through unchanged", () => {
    const meta = generateSeoMetadata(BASE);
    expect(meta.title).toBe("Test");
    expect(meta.description).toBe("Desc");
  });

  it("constructs the canonical URL from the path", () => {
    const meta = generateSeoMetadata({ ...BASE, path: "/about" });
    expect(meta.alternates?.canonical).toBe("https://webequate.com/about");
  });

  it("works for the root path", () => {
    const meta = generateSeoMetadata({ ...BASE, path: "/" });
    expect(meta.alternates?.canonical).toBe("https://webequate.com/");
  });

  // ── OpenGraph ─────────────────────────────────────────────────────────────
  it("uses the default OG image when none is supplied", () => {
    const meta = generateSeoMetadata(BASE);
    expect(ogImages(meta)[0].url).toBe(
      "https://webequate.com/images/webequate-og.jpg"
    );
  });

  it("makes a relative ogImage path absolute", () => {
    const meta = generateSeoMetadata({ ...BASE, ogImage: "/images/my.jpg" });
    expect(ogImages(meta)[0].url).toBe("https://webequate.com/images/my.jpg");
  });

  it("leaves an already-absolute ogImage URL unchanged", () => {
    const url = "https://cdn.example.com/image.jpg";
    const meta = generateSeoMetadata({ ...BASE, ogImage: url });
    expect(ogImages(meta)[0].url).toBe(url);
  });

  it("uses the title as ogImageAlt when ogImageAlt is omitted", () => {
    const meta = generateSeoMetadata({ ...BASE, title: "My Page" });
    expect(ogImages(meta)[0].alt).toBe("My Page");
  });

  it("uses the explicit ogImageAlt when provided", () => {
    const meta = generateSeoMetadata({ ...BASE, ogImageAlt: "Custom alt" });
    expect(ogImages(meta)[0].alt).toBe("Custom alt");
  });

  it("defaults ogType to 'website'", () => {
    const meta = generateSeoMetadata(BASE);
    expect((meta.openGraph as { type?: string })?.type).toBe("website");
  });

  it("accepts 'article' as ogType", () => {
    const meta = generateSeoMetadata({ ...BASE, ogType: "article" });
    expect((meta.openGraph as { type?: string })?.type).toBe("article");
  });

  it("sets siteName to 'WebEquate'", () => {
    const meta = generateSeoMetadata(BASE);
    expect((meta.openGraph as { siteName?: string })?.siteName).toBe(
      "WebEquate"
    );
  });

  // ── Twitter ───────────────────────────────────────────────────────────────
  it("defaults twitterCard to 'summary_large_image'", () => {
    const meta = generateSeoMetadata(BASE);
    expect((meta.twitter as { card?: string })?.card).toBe(
      "summary_large_image"
    );
  });

  it("accepts 'summary' as twitterCard", () => {
    const meta = generateSeoMetadata({ ...BASE, twitterCard: "summary" });
    expect((meta.twitter as { card?: string })?.card).toBe("summary");
  });

  it("sets the Twitter site and creator handles", () => {
    const meta = generateSeoMetadata(BASE);
    const twitter = meta.twitter as { site?: string; creator?: string };
    expect(twitter.site).toBe("@WebEquate");
    expect(twitter.creator).toBe("@WebEquate");
  });

  it("includes the absolute OG image URL in the Twitter images array", () => {
    const meta = generateSeoMetadata({ ...BASE, ogImage: "/images/my.jpg" });
    expect(twitterImages(meta)).toContain(
      "https://webequate.com/images/my.jpg"
    );
  });

  // ── robots ────────────────────────────────────────────────────────────────
  it("omits robots when the robots option is not provided", () => {
    const meta = generateSeoMetadata(BASE);
    expect(meta.robots).toBeUndefined();
  });

  it("passes robots: { index: false } through correctly", () => {
    const meta = generateSeoMetadata({
      ...BASE,
      robots: { index: false },
    });
    expect(meta.robots).toEqual({ index: false, follow: true });
  });

  it("passes robots: { index: false, follow: false } through correctly", () => {
    const meta = generateSeoMetadata({
      ...BASE,
      robots: { index: false, follow: false },
    });
    expect(meta.robots).toEqual({ index: false, follow: false });
  });

  it("defaults follow to true when only index is specified", () => {
    const meta = generateSeoMetadata({ ...BASE, robots: { index: true } });
    expect((meta.robots as { follow?: boolean })?.follow).toBe(true);
  });
});
