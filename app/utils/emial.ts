import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  try {
    const res = await resend.emails.send({
      from: "PromptMart <onboarding@resend.dev>",
      // to,
      to: "rupeshkhadka000@gmail.com",

      subject,
      text,
      html,
    });
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
}
