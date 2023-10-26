import { EmailTemplate } from "@/components/email-template";
import { NextResponse, NextRequest } from "next/server";
import { Resend } from "resend";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);
// const fromEmail = process.env.local.FROM_EMAIL;

export async function POST(req: NextRequest) {
  const { email, subject, message } = await req.json();
  console.log(email, subject, message);
  try {
    const data = await resend.emails.send({
      from: "Your Name <sender@domain.com>",
      to: ["oleg17.k@gmail.com"],
      subject: subject,
      react: EmailTemplate({
        subject: subject,
        message: message,
      }) as React.ReactElement,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
