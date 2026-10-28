import { NextResponse, type NextRequest } from "next/server";
import { formatEmailText, validateContact } from "@/lib/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Do not take the recipient from form submissions or query parameters.
const PORTFOLIO_INBOX = "shayna.celine@gmail.com";

export async function POST(request: NextRequest) {
  // Origin check rejects browser cross-site submissions. Does not replace abuse protection.
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return NextResponse.json({ message: "Expected JSON." }, { status: 415 });
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 16_384) return NextResponse.json({ message: "Message is too large." }, { status: 413 });

  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > 16_384) return NextResponse.json({ message: "Message is too large." }, { status: 413 });
    raw = JSON.parse(text);
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const parsed = validateContact(raw);
  if (!parsed.valid) return NextResponse.json({ message: parsed.message }, { status: 400 });
  // A filled, visually hidden honeypot is almost always an automated submission.
  if (parsed.spam) return NextResponse.json({ message: "Message sent!" }, { status: 200 });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from || apiKey.startsWith("re_replace_") || from.includes("your-verified-domain.com")) {
    return NextResponse.json({ message: "Contact form is not configured yet. Please email me directly at shayna.celine@gmail.com." }, { status: 503 });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [PORTFOLIO_INBOX],
        subject: `Portfolio inquiry: ${parsed.data.subject}`,
        reply_to: parsed.data.email,
        text: formatEmailText(parsed.data),
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!response.ok) {
      // Avoid logging form content, credentials or provider response bodies.
      console.error("Contact email provider rejected request", { status: response.status });
      return NextResponse.json({ message: "The message could not be delivered right now. Please try again or email me directly." }, { status: 502 });
    }
    return NextResponse.json({ message: "Message sent!" }, { status: 200 });
  } catch {
    console.error("Contact email provider request failed");
    return NextResponse.json({ message: "Email service is unavailable. Please try again or email me directly." }, { status: 502 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed." }, { status: 405, headers: { Allow: "POST" } });
}
