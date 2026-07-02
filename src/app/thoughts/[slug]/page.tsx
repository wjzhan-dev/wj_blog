import { notFound } from "next/navigation";
import Link from "next/link";
import { thoughts } from "@/data/thoughts";
import { getLiterateBlocks } from "@/lib/content";
import LiterateViewer from "@/components/LiterateViewer";

export async function generateStaticParams() {
  return thoughts.map((p) => ({ slug: p.slug }));
}

export default async function ThoughtDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const thought = thoughts.find((p) => p.slug === slug);
  if (!thought) notFound();

  const blocks = await getLiterateBlocks("Thoughts", slug);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <Link
        href="/thoughts/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
      >
        &larr; Back to Thoughts
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground mb-4">
          {thought.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-5">
          <time>{thought.date}</time>
          {thought.readingTime && (
            <>
              <span className="text-border">&middot;</span>
              <span>{thought.readingTime} min read</span>
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {thought.tags.map((tag) => (
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
