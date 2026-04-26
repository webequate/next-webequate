import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SocialButton from "@/components/SocialButton";

describe("SocialButton", () => {
  it.each([
    "github",
    "linkedin",
    "twitter",
    "facebook",
    "instagram",
    "youtube",
  ])("renders an accessible link for %s", (name) => {
    render(<SocialButton name={name} url={`https://example.com/${name}`} />);
    const link = screen.getByRole("link", { name });
    expect(link).toBeInTheDocument();
  });

  it("uses the url prop as the href", () => {
    render(<SocialButton name="github" url="https://github.com/test" />);
    expect(screen.getByRole("link", { name: "github" })).toHaveAttribute(
      "href",
      "https://github.com/test"
    );
  });

  it("opens in a new tab", () => {
    render(<SocialButton name="github" url="https://github.com/test" />);
    expect(screen.getByRole("link", { name: "github" })).toHaveAttribute(
      "target",
      "_blank"
    );
  });

  it("renders a fallback icon for an unknown name without crashing", () => {
    render(<SocialButton name="unknown" url="https://example.com" />);
    expect(screen.getByRole("link", { name: "unknown" })).toBeInTheDocument();
  });
});
