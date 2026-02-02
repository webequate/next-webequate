import { NextResponse } from "next/server";
import type { ContactForm } from "@/interfaces/ContactForm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    // Import React and email modules only at runtime
    const React = await import("react");
    const { default: sendMail } = await import("@/emails");
    const { default: Contact } = await import("@/emails/Contact");

    const formData = (await request.json()) as ContactForm;

    if (formData.website) {
      return NextResponse.json(
        { message: "Invalid submission." },
        { status: 400 }
      );
    }

    await sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      cc: process.env.EMAIL_CC,
      subject: formData.subject,
      component: React.createElement(Contact, {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }),
      text: `
      Name: ${formData.name}
      Email: ${formData.email}
      Subject: ${formData.subject}
      Message: ${formData.message}
    `,
    });

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error sending email." },
      { status: 500 }
    );
  }
}
