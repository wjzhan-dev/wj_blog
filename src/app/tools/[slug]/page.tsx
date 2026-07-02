import { notFound } from "next/navigation";
import Link from "next/link";
import { claudeCodeTools, llmTools } from "@/data/tools";
import { getLiterateBlocks } from "@/lib/content";
import LiterateViewer from "@/components/LiterateViewer";

const allTools = [...claudeCodeTools, ...llmTools];

export async function generateStaticParams() {
  return allTools.map((p) => ({ slug: p.slug }));
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = allTools.find((p) => p.slug === slug);
  if (!tool) notFound();

  const blocks = await getLiterateBlocks("Tools", slug);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <Link
        href="/tools/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
      >
        &larr; Back to Tools
      </Link>

      <header className="mb-12">
        {tool.subtitle && (
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
            {tool.subtitle}
          </span>
        )}
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground mb-4">
          {tool.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-5">
          <time>{tool.date}</time>
        </div>
        <div className="flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <LiterateViewer blocks={blocks} />
    </article>
  );
}
