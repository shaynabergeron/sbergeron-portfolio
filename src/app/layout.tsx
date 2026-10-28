import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { profile } from "@/content/portfolio";
import { resolveSiteUrl, seo } from "@/config/seo";
import "@/styles/globals.scss";

const siteUrl = resolveSiteUrl();
const title = `${profile.firstName} ${profile.lastName} | Full-Stack Software Engineer`;

/** Server-rendered metadata makes the share image available to link crawlers. */
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description: seo.description,
  applicationName: seo.siteName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl.toString(),
    title,
    description: seo.description,
    siteName: seo.siteName,
    locale: "en_US",
    images: [
      {
        url: seo.imagePath,
        width: seo.imageWidth,
        height: seo.imageHeight,
        alt: seo.imageAlt,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: seo.description,
    images: [{ url: seo.imagePath, alt: seo.imageAlt }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
};

// Read localStorage before first paint to avoid a dark/light flash.
const themeScript = `try{var saved=localStorage.getItem('shayna-theme');var pref=window.matchMedia('(prefers-color-scheme: light)').matches;document.documentElement.dataset.theme=(saved==='light'||saved==='dark')?saved:(pref?'light':'dark')}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}</body>
    </html>
  );
}
