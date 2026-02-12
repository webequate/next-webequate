import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import type { ContactForm } from "@/interfaces/ContactForm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = (await request.json()) as ContactForm;

    if (formData.website) {
      return NextResponse.json(
        { message: "Invalid submission." },
        { status: 400 }
      );
    }

    // Create transport
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
      },
    });

    // Generate HTML email
    const htmlEmail = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
            .logo-section { background-color: #fff; padding: 20px; border-radius: 8px 8px 0 0; text-align: left; }
            .logo-section img { height: auto; display: block; }
            .header { color: #1f2937; padding: 20px 0; }
            .content { background-color: #fff; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 16px; }
            .label { font-weight: bold; color: #1f2937; }
            .value { color: #555; margin-top: 4px; }
            .link { color: #0066cc; text-decoration: none; }
            .reply-button { display: inline-block; background-color: #0066cc; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 20px; }
            .reply-button:hover { background-color: #0052a3; }
            .footer { background-color: #f3f4f6; padding: 20px; border-radius: 0 0 8px 8px; text-align: left; font-size: 12px; color: #666; }
            .footer-link { color: #0066cc; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo-section">
              <a href="https://webequate.com" style="text-decoration: none;">
                <img src="https://webequate.com/assets/logo-webequate-light.png" alt="WebEquate Logo" style="height: auto;" />
              </a>
            </div>
            <div class="header">
              <h2 style="margin: 0;">New Contact Form Submission</h2>
            </div>
            <div class="content">
              <p style="color: #666;">A website contact form was just submitted!</p>
              
              <div class="field">
                <div class="label">Website:</div>
                <div class="value"><a href="https://webequate.com" class="link">WebEquate.com</a></div>
              </div>

              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${formData.name}</div>
              </div>

              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${
                  formData.email
                }" class="link">${formData.email}</a></div>
              </div>

              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${formData.subject}</div>
              </div>

              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${formData.message.replace(
                  /\n/g,
                  "<br>"
                )}</div>
              </div>

              <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <a href="mailto:${formData.email}?subject=${encodeURIComponent(
      `Re: ${formData.subject}`
    )}&body=${encodeURIComponent(
      `\n\n---\nOriginal Message:\n\n${formData.message}`
    )}" class="reply-button">
                  Reply to ${formData.name}
                </a>
              </div>
            </div>
            <div class="footer">
              <p style="margin: 0;">Need help? <a href="mailto:webequate@gmail.com?subject=${encodeURIComponent(
                "Help with WebEquate.com contact form email"
              )}" class="footer-link">Contact WebEquate support</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email
    await transport.sendMail({
      from: process.env.EMAIL_FROM || "WebEquate <webequate@gmail.com>",
      to: process.env.EMAIL_TO,
      cc: process.env.EMAIL_CC,
      subject: `Contact Form: ${formData.subject}`,
      html: htmlEmail,
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
