/**
 * Public URL + share-card settings.
 *
 * Keep the image under /public so it is a normal, anonymously accessible file.
 * Social crawlers cannot read a local file path, a client-side image, or an
 * asset protected by authentication.
 */
export const seo = {
  defaultSiteUrl: "https://shayna-bergeron-portfolio.netlify.app",
  siteName: "Shayna Bergeron | Developer Portfolio",
  description:
    "Meet Shayna Bergeron, a full-stack software engineer building web experiences with React, TypeScript, and .NET.",
  imagePath: "/og-image.jpg",
  imageAlt:
    "Shayna Bergeron — full-stack software engineer. Thoughtful code. Human-centered experiences. Developer-themed graphic with React and TypeScript.",
  imageWidth: 1200,
  imageHeight: 630,
} as const;

/**
 * Optionally override the public canonical domain via SITE_URL on Netlify.
 * Values must contain the origin only, e.g. https://example.com (no /about).
 */
export function resolveSiteUrl(value: string | undefined = process.env.SITE_URL): URL {
  const url = new URL(value?.trim() || seo.defaultSiteUrl);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("SITE_URL must begin with https:// (or http:// for local testing).");
  }
  if (url.pathname !== "/" || url.search || url.hash || url.username || url.password) {
    throw new Error("SITE_URL must contain only the public domain/origin, with no path, query, or credentials.");
  }
  return url;
}
