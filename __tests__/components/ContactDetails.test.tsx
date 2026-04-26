import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactDetails from "@/components/ContactDetails";

describe("ContactDetails", () => {
  it("always renders the Contact Details heading", () => {
    render(<ContactDetails />);
    expect(screen.getByText("Contact Details")).toBeInTheDocument();
  });

  it("renders contactIntro when provided", () => {
    render(<ContactDetails contactIntro="Reach out anytime." />);
    expect(screen.getByText("Reach out anytime.")).toBeInTheDocument();
  });

  it("omits contactIntro when not provided", () => {
    render(<ContactDetails />);
    expect(screen.queryByText("Reach out anytime.")).not.toBeInTheDocument();
  });

  it("renders name when provided", () => {
    render(<ContactDetails name="Alice Smith" />);
    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
  });

  it("omits name when not provided", () => {
    render(<ContactDetails location="NYC" />);
    expect(screen.queryByText("Alice Smith")).not.toBeInTheDocument();
  });

  it("renders location when provided", () => {
    render(<ContactDetails location="New York, NY" />);
    expect(screen.getByText("New York, NY")).toBeInTheDocument();
  });

  it("renders phone when provided", () => {
    render(<ContactDetails phone="555-1234" />);
    expect(screen.getByText("555-1234")).toBeInTheDocument();
  });

  it("renders email as a mailto link", () => {
    render(<ContactDetails email="hello@example.com" />);
    const link = screen.getByRole("link", { name: "hello@example.com" });
    expect(link).toHaveAttribute("href", "mailto:hello@example.com");
  });

  it("renders website as an https link", () => {
    render(<ContactDetails website="example.com" />);
    const link = screen.getByRole("link", { name: "example.com" });
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("renders only the list items whose props are provided", () => {
    render(<ContactDetails name="Alice" email="a@b.com" />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "a@b.com" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /https?:\/\// })).not.toBeInTheDocument();
  });
});
