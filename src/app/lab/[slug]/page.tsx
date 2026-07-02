import { notFound } from "next/navigation";
import Link from "next/link";
import { labProjects } from "@/data/lab";
import { getLiterateBlocks } from "@/lib/content";
import LiterateViewer from "@/components/LiterateViewer";

export async function generateStaticParams() {
  return labProjects.map((p) => ({ slug: p.slug }));
}

export default async function LabDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = labProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  const blocks = await getLiterateBlocks("Lab", slug);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <Link
        href="/lab/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
      >
        &larr; Back to Lab
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground mb-4">
          {project.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-5">
          <time>{project.date}</time>
          {project.status && (
            <>
              <span className="text-border">&middot;</span>
              <span className="capitalize">{project.status}</span>
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
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
