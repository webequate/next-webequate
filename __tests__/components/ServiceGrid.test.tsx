import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ServiceGrid from "@/components/ServiceGrid";
import type { Service } from "@/types/service";

const makeService = (overrides: Partial<Service> = {}): Service => ({
  id: "1",
  title: "Web Design",
  description: "Beautiful websites.",
  icon: "FaCode",
  ...overrides,
});

describe("ServiceGrid", () => {
  it("renders every service title and description", () => {
    const services: Service[] = [
      makeService({ id: "1", title: "Web Design", description: "Beautiful sites." }),
      makeService({ id: "2", title: "SEO", description: "Better rankings." }),
    ];
    render(<ServiceGrid services={services} />);
    expect(screen.getByText("Web Design")).toBeInTheDocument();
    expect(screen.getByText("Beautiful sites.")).toBeInTheDocument();
    expect(screen.getByText("SEO")).toBeInTheDocument();
    expect(screen.getByText("Better rankings.")).toBeInTheDocument();
  });

  it("renders without errors when all icon keys are valid react-icons/fa names", () => {
    render(<ServiceGrid services={[makeService({ icon: "FaGithub" })]} />);
    expect(screen.getByText("Web Design")).toBeInTheDocument();
    expect(screen.queryByText("Icon not found")).not.toBeInTheDocument();
  });

  it("shows 'Icon not found' for an invalid icon key", () => {
    render(<ServiceGrid services={[makeService({ icon: "FaNonExistent" })]} />);
    expect(screen.getByText("Icon not found")).toBeInTheDocument();
  });

  it("renders an empty grid without crashing when services is empty", () => {
    const { container } = render(<ServiceGrid services={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
