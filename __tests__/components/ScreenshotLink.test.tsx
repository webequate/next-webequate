import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ScreenshotLink from "@/components/ScreenshotLink";

describe("ScreenshotLink", () => {
  it.each(["Mobile", "Tablet", "Laptop", "Desktop"])(
    "renders the label text for %s",
    (name) => {
      render(<ScreenshotLink name={name} path="projects/my-project" url="mobile.jpg" />);
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  );

  it("constructs the href as /{path}/{url}", () => {
    render(<ScreenshotLink name="Desktop" path="projects/my-project" url="desktop.jpg" />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/projects/my-project/desktop.jpg"
    );
  });

  it("opens in a new tab", () => {
    render(<ScreenshotLink name="Laptop" path="projects/abc" url="laptop.jpg" />);
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });

  it("renders the Desktop icon as fallback for an unknown name", () => {
    render(<ScreenshotLink name="Unknown" path="projects/abc" url="x.jpg" />);
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });
});
