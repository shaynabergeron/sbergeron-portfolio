import { describe, expect, it } from "vitest";
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { resolveSiteUrl, seo } from "../src/config/seo";

describe("social sharing SEO settings", () => {
  it("defaults to the live Netlify domain", () => {
    expect(resolveSiteUrl("").origin).toBe("https://shayna-bergeron-portfolio.netlify.app");
  });

  it("allows a custom public domain", () => {
    expect(resolveSiteUrl("https://myportfolio.com/").origin).toBe("https://myportfolio.com");
  });

  it("disallows a site URL with an embedded path or credentials", () => {
    expect(() => resolveSiteUrl("https://example.com/some-page")).toThrow();
    expect(() => resolveSiteUrl("https://user:secret@example.com")).toThrow();
  });

  it("ships the public social image required by link previews", () => {
    const image = join(process.cwd(), "public", seo.imagePath.replace(/^\//, ""));
    expect(existsSync(image)).toBe(true);
    expect(statSync(image).size).toBeGreaterThan(20_000);
    expect(seo.imageWidth).toBe(1200);
    expect(seo.imageHeight).toBe(630);
  });
});
