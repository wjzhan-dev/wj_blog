/**
 * Parses literate Python files into structured blocks for rich rendering.
 *
 * Recognizes these patterns:
 *   text("...")        → prose / markdown text
 *   image("url", ...)  → image embed
 *   link("url")        → clickable link
 *   link(title="...", url="...") → titled link
 *   article_link("...") → article reference link
 *
 * Code blocks are pre-highlighted at build time via Shiki.
 */

export type Block =
  | { type: "prose"; content: string }
  | { type: "image"; src: string; width?: number }
  | { type: "link"; url: string; title?: string }
  | { type: "code"; html: string }
  | { type: "space" };

/**
 * Parse a raw .py string into an array of renderable blocks.
 * Code blocks carry raw content in `content` temporarily — caller
 * should run them through Shiki for highlighting.
 */
interface RawBlock {
  type: "prose" | "image" | "link" | "code" | "space";
  content?: string;
  src?: string;
  width?: number;
  url?: string;
  title?: string;
}

export function parseLiterateRaw(code: string): RawBlock[] {
  const lines = code.split("\n");
  const blocks: RawBlock[] = [];
  let codeLines: string[] = [];
  let proseLines: string[] = [];
  let i = 0;

  function flushCode() {
    const content = codeLines.join("\n").trim();
    if (content) blocks.push({ type: "code", content });
    codeLines = [];
  }

  function flushProse() {
    const content = proseLines
      .map((l) => l.trim())
      .filter(Boolean)
      .join("\n");
    if (content) blocks.push({ type: "prose", content });
    proseLines = [];
  }

  while (i < lines.length) {
    const raw = lines[i];
    const trimmed = raw.trim();

    const textMatch = trimmed.match(
      /^text\(\s*((?:f|rf)?["'])((?:(?!\1).)*)\1\s*\)/
    );
    if (textMatch) {
      flushCode();
      // textMatch[1] may include f/rf prefix (e.g. "f\""); extract only the quote char
      const quote = textMatch[1].slice(-1);
      proseLines.push(extractString(textMatch[2], quote));
      i++;
      continue;
    }

    const spaceMatch = trimmed.match(/^space\(\s*\)/);
    if (spaceMatch) {
      flushCode();
      flushProse();
      blocks.push({ type: "space" });
      i++;
      continue;
    }

    const imgMatch = trimmed.match(
      /^image\(\s*["']([^"']+)["']\s*(?:,\s*width\s*=\s*(\d+))?/
    );
    if (imgMatch) {
      flushCode();
      flushProse();
      blocks.push({ type: "image", src: imgMatch[1], width: imgMatch[2] ? parseInt(imgMatch[2]) : undefined });
      i++;
      continue;
    }

    const linkMatch = trimmed.match(
      /^link\(\s*(?:title\s*=\s*["']([^"']*)["']\s*,\s*)?url\s*=\s*["']([^"']+)["']\s*\)/
    );
    const simpleLinkMatch = trimmed.match(/^link\(\s*["']([^"']+)["']\s*\)/);
    if (linkMatch) {
      flushCode();
      flushProse();
      blocks.push({ type: "link", url: linkMatch[2], title: linkMatch[1] || undefined });
      i++;
      continue;
    }
    if (simpleLinkMatch) {
      flushCode();
      flushProse();
      blocks.push({ type: "link", url: simpleLinkMatch[1] });
      i++;
      continue;
    }

    const articleMatch = trimmed.match(
      /^article_link\(\s*["']([^"']+)["']\s*\)/
    );
    if (articleMatch) {
      flushCode();
      flushProse();
      blocks.push({ type: "link", url: articleMatch[1], title: "Article" });
      i++;
      continue;
    }

    if (!trimmed) {
      if (proseLines.length > 0) {
        flushProse();
      } else {
        codeLines.push(raw);
      }
    } else {
      if (proseLines.length > 0) flushProse();
      codeLines.push(raw);
    }
    i++;
  }

  flushCode();
  flushProse();

  return mergeAdjacentProse(blocks);
}

function extractString(raw: string, quote: string): string {
  return raw
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(new RegExp(`\\\\${quote}`, "g"), quote);
}

function mergeAdjacentProse(blocks: RawBlock[]): RawBlock[] {
  const merged: RawBlock[] = [];
  for (const block of blocks) {
    const last = merged[merged.length - 1];
    if (block.type === "prose" && last?.type === "prose") {
      last.content = (last.content || "") + "\n" + (block.content || "");
    } else {
      merged.push(block);
    }
  }
  return merged;
}
