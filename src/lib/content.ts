import fs from "fs";
import path from "path";
import { createHighlighter } from "shiki";
import type { ContentItem } from "@/lib/types";
import { parseLiterateRaw } from "@/lib/literate";
import type { Block } from "@/lib/literate";

const SCRIPTS_ROOT = path.join(process.cwd(), "public", "scripts");

// Shiki highlighter singleton — loaded once at build time
let _highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null;

async function getHighlighter() {
  if (!_highlighter) {
    _highlighter = await createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: ["python"],
    });
  }
  return _highlighter;
}

/**
 * Read a Python file from scripts/{category}/{slug}/{slug}.py at build time.
 */
export function getPythonContent(category: string, slug: string): string {
  const filePath = path.join(SCRIPTS_ROOT, category, slug, `${slug}.py`);

  if (!fs.existsSync(filePath)) {
    return "";
  }

  return fs.readFileSync(filePath, "utf-8");
}

/**
 * Get all slugs for a given category by reading subdirectory names.
 */
export function getSlugs(category: string): string[] {
  const dirPath = path.join(SCRIPTS_ROOT, category);

  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

/**
 * Extract the value of the `ARCHIVE_STATUS` global variable from a .py file.
 * Looks for: ARCHIVE_STATUS = "SomeLabel"
 */
export function getArchiveStatus(category: string, slug: string): string | null {
  const code = getPythonContent(category, slug);
  if (!code) return null;

  const match = code.match(/^ARCHIVE_STATUS\s*=\s*["']([^"']+)["']/m);
  return match ? match[1] : null;
}

/**
 * Read, parse, and syntax-highlight a literate Python file into renderable blocks.
 * Highlighting happens at build time via Shiki — zero client JS.
 */
export async function getLiterateBlocks(
  category: string,
  slug: string
): Promise<Block[]> {
  const code = getPythonContent(category, slug);
  if (!code) return [];

  const rawBlocks = parseLiterateRaw(code);
  const hl = await getHighlighter();

  const blocks: Block[] = rawBlocks.map((b) => {
    if (b.type === "code" && b.content) {
      const html = hl.codeToHtml(b.content, {
        lang: "python",
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      });
      return { type: "code", html };
    }
    if (b.type === "image") {
      let src = b.src!;
      // Resolve relative paths (./ or ../) to public/scripts/... URLs
      if (src.startsWith("./") || src.startsWith("../")) {
        src = path.join("/scripts", category, slug, src);
      }
      return { type: "image", src, width: b.width };
    }
    if (b.type === "link") {
      return { type: "link", url: b.url!, title: b.title };
    }
    if (b.type === "prose") {
      return { type: "prose", content: b.content! };
    }
    if (b.type === "space") {
      return { type: "space" };
    }
    return { type: "prose", content: "" };
  });

  return blocks;
}

/**
 * Extract the first meaningful paragraph from a Python file.
 * Skips shebangs, imports, and blank lines. Returns the first text block
 * that looks like a paragraph (multi-word, non-code).
 */
export function getFirstParagraph(code: string): string {
  const lines = code.split("\n");

  // Collect lines of the module docstring or first comment block
  let inDocstring = false;
  let paragraph = "";

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines before we start
    if (!inDocstring && !trimmed) continue;

    // Start of docstring
    if (!inDocstring && (trimmed.startsWith('"""') || trimmed.startsWith("'''"))) {
      inDocstring = true;
      const inner = trimmed.slice(3);
      if (inner.endsWith('"""') || inner.endsWith("'''")) {
        // Single-line docstring
        paragraph = inner.slice(0, -3).trim();
        break;
      }
      if (inner) paragraph = inner;
      continue;
    }

    // End of docstring
    if (inDocstring && (trimmed.endsWith('"""') || trimmed.endsWith("'''"))) {
      const inner = trimmed.slice(0, -3).trim();
      if (inner) paragraph += (paragraph ? " " : "") + inner;
      break;
    }

    if (inDocstring) {
      if (trimmed && trimmed !== '"""' && trimmed !== "'''") {
        paragraph += (paragraph ? " " : "") + trimmed;
      }
      continue;
    }

    // Fallback: first comment block if no docstring
    if (trimmed.startsWith("# ")) {
      paragraph += (paragraph ? " " : "") + trimmed.slice(2).trim();
    } else if (paragraph) {
      break;
    }
  }

  // If we got something, return first ~200 chars
  if (paragraph) {
    return paragraph.length > 200
      ? paragraph.slice(0, 200) + "…"
      : paragraph;
  }

  return "";
}

/**
 * Find an image file inside a project folder.
 * Looks for common image extensions, returns the public path.
 */
export function getProjectImage(
  category: string,
  slug: string
): string | null {
  const dirPath = path.join(SCRIPTS_ROOT, category, slug);
  const exts = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

  if (!fs.existsSync(dirPath)) return null;

  for (const file of fs.readdirSync(dirPath)) {
    if (exts.some((ext) => file.toLowerCase().endsWith(ext))) {
      return `/scripts/${category}/${slug}/${file}`;
    }
  }

  return null;
}

/**
 * Return the single latest item from a ContentItem array, sorted by date descending.
 */
export function getLatest(items: ContentItem[]): ContentItem | undefined {
  return [...items].sort((a, b) => b.date.localeCompare(a.date))[0];
}

/**
 * Combine multiple ContentItem arrays and return the latest item across all of them.
 */
export function getLatestAcross(
  ...arrays: ContentItem[][]
): { item: ContentItem; sourceIndex: number } | undefined {
  let latest: ContentItem | undefined;
  let sourceIndex = -1;

  arrays.forEach((items, i) => {
    const candidate = getLatest(items);
    if (candidate && (!latest || candidate.date > latest.date)) {
      latest = candidate;
      sourceIndex = i;
    }
  });

  return latest ? { item: latest, sourceIndex } : undefined;
}
