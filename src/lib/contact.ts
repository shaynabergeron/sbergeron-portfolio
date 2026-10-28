/** Shared, dependency-free validation used by the server endpoint. */
export type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
export type ContactValidation =
  | { valid: true; data: ContactFields; spam: boolean }
  | { valid: false; message: string };

const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export function validateContact(input: unknown): ContactValidation {
  if (typeof input !== "object" || !input || Array.isArray(input)) return { valid: false, message: "Please complete the form." };
  const data = input as Record<string, unknown>;
  for (const field of ["name", "email", "subject", "message", "website"]) {
    if (field === "website" && data[field] === undefined) continue;
    if (typeof data[field] !== "string") return { valid: false, message: "Please complete all fields." };
  }
  const name = (data.name as string).trim();
  const email = (data.email as string).trim();
  const subject = (data.subject as string).trim();
  const message = (data.message as string).trim();
  if (name.length < 2 || name.length > 100) return { valid: false, message: "Please enter a name between 2 and 100 characters." };
  if (email.length > 254 || !EMAIL_RE.test(email)) return { valid: false, message: "Please enter a valid email address." };
  if (subject.length < 2 || subject.length > 160 || /[\r\n\u0000-\u001f]/.test(subject)) return { valid: false, message: "Please use a short, single-line subject." };
  if (message.length < 10 || message.length > 5000) return { valid: false, message: "Your message must be between 10 and 5,000 characters." };
  if (/[\u0000]/.test(name + email + message)) return { valid: false, message: "Your message contains invalid characters." };
  return { valid: true, data: { name, email, subject, message }, spam: Boolean((data.website as string | undefined)?.trim()) };
}

/** No HTML is rendered from user input: mail is delivered as plain text. */
export function formatEmailText(data: ContactFields): string {
  return `New portfolio contact\n\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\n${data.message}`;
}
