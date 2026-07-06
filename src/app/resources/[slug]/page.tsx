import { notFound } from "next/navigation";
import Link from "next/link";
import { getLiterateBlocks } from "@/lib/content";
import LiterateViewer from "@/components/LiterateViewer";

export const dynamicParams = false;

export async function generateStaticParams() {
  const { resources } = await import("@/data/resources");
  return resources.map((p) => ({ slug: p.slug }));
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { resources } = await import("@/data/resources");
  const resource = resources.find((p) => p.slug === slug);
  if (!resource) notFound();

  const blocks = await getLiterateBlocks("Resources", slug);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <Link
        href="/resources/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
      >
        &larr; Back to Resources
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground mb-4">
          {resource.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-5">
          <time>{resource.date}</time>
        </div>
        <div className="flex flex-wrap gap-2">
          {resource.tags.map((tag) => (
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
