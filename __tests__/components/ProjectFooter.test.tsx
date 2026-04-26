import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectFooter from "@/components/ProjectFooter";

const BASE = { description: "A great project.", tags: "" };

describe("ProjectFooter", () => {
  it("renders the description", () => {
    render(<ProjectFooter {...BASE} />);
    expect(screen.getByText("A great project.")).toBeInTheDocument();
  });

  it("renders tag links when tags is provided", () => {
    render(<ProjectFooter {...BASE} tags="React, TypeScript, Next.js" />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });

  it("renders no tag elements when tags is empty", () => {
    render(<ProjectFooter {...BASE} tags="" />);
    expect(screen.queryByText("Tags:")).not.toBeInTheDocument();
  });

  it("renders Live Site link when link is provided", () => {
    render(<ProjectFooter {...BASE} link="https://example.com" />);
    expect(screen.getByRole("link", { name: /live site/i })).toBeInTheDocument();
  });

  it("renders Further Details link when details is provided", () => {
    render(<ProjectFooter {...BASE} details="https://details.example.com" />);
    expect(screen.getByRole("link", { name: /further details/i })).toBeInTheDocument();
  });

  it("renders both links when both are provided", () => {
    render(
      <ProjectFooter
        {...BASE}
        link="https://example.com"
        details="https://details.example.com"
      />
    );
    expect(screen.getByRole("link", { name: /live site/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /further details/i })).toBeInTheDocument();
  });

  it("renders no links section when neither link nor details is provided", () => {
    render(<ProjectFooter {...BASE} />);
    expect(screen.queryByText("Links:")).not.toBeInTheDocument();
  });

  it("renders the Screenshots section when path is provided", () => {
    render(
      <ProjectFooter
        {...BASE}
        path="projects/my-project"
        mobile="mobile.jpg"
        desktop="desktop.jpg"
      />
    );
    expect(screen.getByText("Mobile")).toBeInTheDocument();
    expect(screen.getByText("Desktop")).toBeInTheDocument();
  });

  it("omits the Screenshots section when path is not provided", () => {
    render(<ProjectFooter {...BASE} mobile="mobile.jpg" />);
    expect(screen.queryByText("Screenshots:")).not.toBeInTheDocument();
    expect(screen.queryByText("Mobile")).not.toBeInTheDocument();
  });

  it("renders only the screenshot types that are provided", () => {
    render(
      <ProjectFooter
        {...BASE}
        path="projects/my-project"
        laptop="laptop.jpg"
      />
    );
    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.queryByText("Mobile")).not.toBeInTheDocument();
    expect(screen.queryByText("Desktop")).not.toBeInTheDocument();
  });
});
