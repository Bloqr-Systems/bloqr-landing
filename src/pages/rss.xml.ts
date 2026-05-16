import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_URL, META } from '../config';
import type { APIContext } from 'astro';

export const prerender = true;

// ---------------------------------------------------------------------------
// Minimal XML pretty-printer — no extra dependencies.
//
// Strategy: split on tag boundaries, then re-join with newlines + indentation.
// Handles the self-closing tags, processing instructions, and CDATA blocks
// that @astrojs/rss emits without touching their content.
// ---------------------------------------------------------------------------
function prettyXml(xml: string, indent = '  '): string {
  // Normalise — strip existing inter-tag whitespace so we start clean.
  const flat = xml
    .replace(/>\s+</g, '><')   // collapse whitespace between tags
    .trim();

  let depth  = 0;
  let result = '';

  // Walk tag-by-tag.  The regex captures either a full tag token or a text node.
  const tokenRe = /(<[^>]+>|[^<]+)/g;
  let match: RegExpExecArray | null;

  while ((match = tokenRe.exec(flat)) !== null) {
    const token = match[1];

    if (!token.trim()) continue; // skip pure whitespace remnants

    if (token.startsWith('</')) {
      // Closing tag — dedent first, then emit.
      depth = Math.max(0, depth - 1);
      result += indent.repeat(depth) + token + '\n';
    } else if (
      token.startsWith('<?') ||     // processing instruction
      token.startsWith('<!') ||     // DOCTYPE / CDATA
      token.endsWith('/>')          // self-closing
    ) {
      result += indent.repeat(depth) + token + '\n';
    } else if (token.startsWith('<')) {
      // Opening tag — emit at current depth, then indent children.
      result += indent.repeat(depth) + token + '\n';
      depth += 1;
    } else {
      // Text node — belongs to the already-opened tag; emit at current depth.
      result += indent.repeat(depth) + token.trim() + '\n';
    }
  }

  return result.trimEnd();
}

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const feedResponse = await rss({
    title:       'Bloqr AI — Blog',
    description: META.description,
    site:        context.site ?? SITE_URL,
    items: posts.map((post) => ({
      title:       post.data.title,
      description: post.data.description,
      pubDate:     post.data.pubDate,
      link:        `/blog/${post.id}`,
      categories:  [post.data.category, ...post.data.tags],
      author:      post.data.author,
    })),
    customData: `<language>en-us</language>`,
  });

  const raw      = await feedResponse.text();
  const pretty   = prettyXml(raw);

  return new Response(pretty, {
    status:  200,
    headers: {
      'Content-Type':  'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
