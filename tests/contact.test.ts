import { describe, expect, it } from "vitest";
import { validateContact, formatEmailText } from "../src/lib/contact";

const valid = { name: "First and Last Name", email: "email@example.com", subject: "Project opportunity", message: "I would like to collaborate with you.", website: "" };

describe("contact validation", () => {
  it("accepts properly formed messages", () => {
    expect(validateContact(valid)).toEqual({ valid: true, spam: false, data: { name: valid.name, email: valid.email, subject: valid.subject, message: valid.message } });
  });
  it("rejects malformed email addresses", () => {
    expect(validateContact({ ...valid, email: "not-an-email" }).valid).toBe(false);
  });
  it("rejects malformed payloads", () => {
    expect(validateContact(null).valid).toBe(false);
    expect(validateContact({ ...valid, message: "hi" }).valid).toBe(false);
    expect(validateContact({ ...valid, subject: "Hello\nBcc: fake@example.com" }).valid).toBe(false);
  });
  it("marks honeypot submissions as spam", () => {
    expect(validateContact({ ...valid, website: "http://example.com" })).toMatchObject({ valid: true, spam: true });
  });
  it.each([valid.email, "alex@example.com"])("formats plain-text email body with the submitted email %s", (email) => {
    const result = validateContact({ ...valid, email });
    if (!result.valid) throw new Error("Expected valid payload");
    expect(formatEmailText(result.data)).toContain(`Email: ${email}`);
  });
});
