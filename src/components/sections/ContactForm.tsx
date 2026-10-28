"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    setStatus("sending"); setFeedback("Sending your message…");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"), email: data.get("email"), subject: data.get("subject"),
          message: data.get("message"), website: data.get("website"),
        }),
      });
      const result: { message?: string } = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to send your message.");
      form.reset(); setStatus("success"); setFeedback("Message sent! Thanks for reaching out — I’ll be in touch.");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Unable to send right now. Please try again.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-pair">
        <div><label htmlFor="sender-name">Your name</label><input id="sender-name" name="name" maxLength={100} autoComplete="name" placeholder="First & Last Name" required /></div>
        <div><label htmlFor="sender-email">Email address</label><input id="sender-email" name="email" type="email" maxLength={254} autoComplete="email" placeholder="email@example.com" required /></div>
      </div>
      <div><label htmlFor="sender-subject">What’s this about?</label><input id="sender-subject" name="subject" maxLength={160} placeholder="An exciting opportunity" required /></div>
      <div><label htmlFor="sender-message">Your message</label><textarea id="sender-message" name="message" minLength={10} maxLength={5000} placeholder="Tell me a little about it..." required /></div>
      <div className="honeypot" aria-hidden="true"><label htmlFor="sender-website">Website (leave blank)</label><input id="sender-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
      <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : status === "success" ? "Send another message" : "Send message"} <ArrowUpRight size={16} /></button>
      <div className={`form-feedback ${status === "success" ? "is-success" : status === "error" ? "is-error" : ""}`} role="status" aria-live="polite">{status === "success" && <CheckCircle2 size={16} aria-hidden="true"/>}{feedback}</div>
      <p className="form-hint">Your message is sent securely through a server-side endpoint. No email app required.</p>
    </form>
  );
}
