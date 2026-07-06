import Link from "next/link";
import type { ContentItem } from "@/lib/types";

interface ThoughtCardProps {
  thought: ContentItem;
  baseHref?: string;
}

export default function ThoughtCard({ thought, baseHref = "/thoughts/" }: ThoughtCardProps) {
  return (
    <Link
      href={`${baseHref}${thought.slug}/`}
      className="group block py-6 border-b border-border last:border-b-0 hover:bg-secondary/30 transition-colors -mx-4 px-4 rounded-lg"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-6 gap-1">
        <time className="text-sm text-muted-foreground shrink-0 sm:w-28">
          {thought.date}
        </time>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold tracking-tight text-card-foreground group-hover:text-foreground transition-colors mb-1">
            {thought.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {thought.description}
          </p>
        </div>

        {thought.readingTime && (
          <span className="text-xs text-muted-foreground/60 shrink-0 sm:self-center">
            {thought.readingTime} min read
          </span>
        )}
      </div>
    </Link>
  );
}
