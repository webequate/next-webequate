import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectHeader from "@/components/ProjectHeader";

describe("ProjectHeader", () => {
  it("renders the title", () => {
    render(<ProjectHeader title="My Project" path="projects" />);
    expect(screen.getByRole("heading", { name: "My Project" })).toBeInTheDocument();
  });

  it("renders a Previous link when prevId is provided", () => {
    render(<ProjectHeader title="T" path="projects" prevId="proj-1" />);
    expect(screen.getByRole("link", { name: "Previous Project" })).toHaveAttribute(
      "href",
      "/projects/proj-1"
    );
  });

  it("renders a Next link when nextId is provided", () => {
    render(<ProjectHeader title="T" path="projects" nextId="proj-3" />);
    expect(screen.getByRole("link", { name: "Next Project" })).toHaveAttribute(
      "href",
      "/projects/proj-3"
    );
  });

  it("renders no Previous link when prevId is absent", () => {
    render(<ProjectHeader title="T" path="projects" nextId="proj-3" />);
    expect(screen.queryByRole("link", { name: "Previous Project" })).not.toBeInTheDocument();
  });

  it("renders no Next link when nextId is absent", () => {
    render(<ProjectHeader title="T" path="projects" prevId="proj-1" />);
    expect(screen.queryByRole("link", { name: "Next Project" })).not.toBeInTheDocument();
  });

  it("renders invisible placeholder arrows when prevId and nextId are absent", () => {
    const { container } = render(<ProjectHeader title="T" path="projects" />);
    const invisible = container.querySelectorAll(".invisible");
    expect(invisible).toHaveLength(2);
  });

  it("uses the path prop to construct hrefs", () => {
    render(<ProjectHeader title="T" path="services" prevId="svc-0" nextId="svc-2" />);
    expect(screen.getByRole("link", { name: "Previous Project" })).toHaveAttribute(
      "href",
      "/services/svc-0"
    );
    expect(screen.getByRole("link", { name: "Next Project" })).toHaveAttribute(
      "href",
      "/services/svc-2"
    );
  });
});
