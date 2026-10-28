/**
 * Checks whether a *deployed* portfolio exposes the social metadata and image
 * that a social platform would normally request. 
 *
 * This verifies origin and image accessibility, not third-party crawler caches.
 */
const input = process.argv[2] ?? process.env.SITE_URL ?? 'https://shayna-bergeron-portfolio.netlify.app';
const url = new URL(input);

function findMeta(html, attribute, value) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const attrs = Object.fromEntries(
      [...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/g)].map((m) => [m[1].toLowerCase(), m[3]])
    );
    if (attrs[attribute] === value) return attrs.content ?? null;
  }
  return null;
}

try {
  console.log(`Checking social metadata: ${url.href}`);
  const page = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'facebookexternalhit/1.1' } });
  if (!page.ok) throw new Error(`Home page returned HTTP ${page.status}`);
  const html = await page.text();
  const preview = findMeta(html, 'property', 'og:image');
  const card = findMeta(html, 'name', 'twitter:card');
  const twitterImage = findMeta(html, 'name', 'twitter:image');
  const title = findMeta(html, 'property', 'og:title');

  if (!preview) throw new Error('Missing og:image tag in homepage HTML');
  if (!title) throw new Error('Missing og:title tag in homepage HTML');
  if (card !== 'summary_large_image') throw new Error(`Expected Twitter summary_large_image; got ${JSON.stringify(card)}`);
  if (!twitterImage) throw new Error('Missing twitter:image tag in homepage HTML');
  const imageUrl = new URL(preview, url);
  if (!['https:', 'http:'].includes(imageUrl.protocol)) throw new Error('Social image must be available at HTTP(S) URL');
  const response = await fetch(imageUrl, { redirect: 'follow' });
  if (!response.ok) throw new Error(`Social image returned HTTP ${response.status}`);
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.startsWith('image/')) throw new Error(`Social image is not an image (Content-Type: ${contentType})`);
  const bytes = (await response.arrayBuffer()).byteLength;
  if (bytes < 10_000) throw new Error('Social image is unexpectedly small');

  console.log(`✓ og:title: ${title}`);
  console.log(`✓ og:image: ${imageUrl.href}`);
  console.log(`✓ twitter:card: ${card}`);
  console.log(`✓ twitter:image: ${twitterImage}`);
  console.log(`✓ Image accessible: HTTP ${response.status}, ${contentType}, ${(bytes / 1024).toFixed(1)} KB`);
  console.log('Social metadata checks passed. Third-party link caches may still need to refresh.');
} catch (error) {
  console.error(`✗ Social preview check failed: ${error instanceof Error ? error.message : error}`);
  process.exitCode = 1;
}
