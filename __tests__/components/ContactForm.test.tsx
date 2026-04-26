import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/ContactForm";

const mockFetch = (ok: boolean, message: string) =>
  vi.fn().mockResolvedValue({
    ok,
    json: () => Promise.resolve({ message }),
  });

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ContactForm", () => {
  // ── field rendering ───────────────────────────────────────────────────────
  it("renders all visible form fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Subject")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<ContactForm />);
    expect(screen.getByRole("button", { name: "Send Message" })).toBeInTheDocument();
  });

  // ── input state ───────────────────────────────────────────────────────────
  it("updates the name field on input", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    const input = screen.getByLabelText("Full Name") as HTMLInputElement;
    await user.type(input, "Alice");
    expect(input.value).toBe("Alice");
  });

  it("updates the email field on input", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    const input = screen.getByLabelText("Email") as HTMLInputElement;
    await user.type(input, "alice@example.com");
    expect(input.value).toBe("alice@example.com");
  });

  it("updates the message field on input", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    const textarea = screen.getByLabelText("Message") as HTMLTextAreaElement;
    await user.type(textarea, "Hello there");
    expect(textarea.value).toBe("Hello there");
  });

  // ── loading state ─────────────────────────────────────────────────────────
  it("disables the button and shows Sending… while submitting", async () => {
    const user = userEvent.setup();
    let resolveJson!: (v: unknown) => void;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => new Promise((r) => { resolveJson = r; }),
      })
    );

    render(<ContactForm />);
    await user.type(screen.getByLabelText("Full Name"), "Alice");
    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Subject"), "Hi");
    await user.type(screen.getByLabelText("Message"), "Hello");

    const button = screen.getByRole("button", { name: "Send Message" });
    await user.click(button);

    expect(button).toBeDisabled();
    expect(screen.getByText("Sending...")).toBeInTheDocument();

    resolveJson({ message: "Sent" });
  });

  // ── successful submission ─────────────────────────────────────────────────
  it("shows success message and resets form on successful submission", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", mockFetch(true, "Email sent successfully!"));

    render(<ContactForm />);
    await user.type(screen.getByLabelText("Full Name"), "Alice");
    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Subject"), "Hi");
    await user.type(screen.getByLabelText("Message"), "Hello");
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByText("Email sent successfully!")).toBeInTheDocument();
    expect((screen.getByLabelText("Full Name") as HTMLInputElement).value).toBe("");
    expect((screen.getByLabelText("Email") as HTMLInputElement).value).toBe("");
    expect((screen.getByLabelText("Message") as HTMLTextAreaElement).value).toBe("");
  });

  it("re-enables the button after successful submission", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", mockFetch(true, "Done"));

    render(<ContactForm />);
    await user.type(screen.getByLabelText("Full Name"), "Alice");
    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Subject"), "Hi");
    await user.type(screen.getByLabelText("Message"), "Hello");
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    await screen.findByText("Done");
    expect(screen.getByRole("button", { name: "Send Message" })).not.toBeDisabled();
  });

  // ── API error response ────────────────────────────────────────────────────
  it("shows error message from API and preserves form data on failure", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", mockFetch(false, "Server error occurred."));

    render(<ContactForm />);
    await user.type(screen.getByLabelText("Full Name"), "Alice");
    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Subject"), "Hi");
    await user.type(screen.getByLabelText("Message"), "Hello");
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByText("Server error occurred.")).toBeInTheDocument();
    expect((screen.getByLabelText("Full Name") as HTMLInputElement).value).toBe("Alice");
  });

  // ── network error ─────────────────────────────────────────────────────────
  it("shows fallback error message on network failure", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network down")));

    render(<ContactForm />);
    await user.type(screen.getByLabelText("Full Name"), "Alice");
    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Subject"), "Hi");
    await user.type(screen.getByLabelText("Message"), "Hello");
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(
      await screen.findByText("Error sending email. Please try again.")
    ).toBeInTheDocument();
  });

  // ── fetch payload ─────────────────────────────────────────────────────────
  it("calls fetch with correct JSON payload including empty honeypot website field", async () => {
    const user = userEvent.setup();
    const spy = mockFetch(true, "OK");
    vi.stubGlobal("fetch", spy);

    render(<ContactForm />);
    await user.type(screen.getByLabelText("Full Name"), "Alice");
    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Subject"), "Inquiry");
    await user.type(screen.getByLabelText("Message"), "Hello there");
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    await screen.findByText("OK");

    expect(spy).toHaveBeenCalledWith("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Alice",
        email: "alice@example.com",
        subject: "Inquiry",
        message: "Hello there",
        website: "",
      }),
    });
  });
});
