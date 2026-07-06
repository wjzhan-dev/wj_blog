import ThoughtCard from "@/components/ThoughtCard";
import PageHeader from "@/components/PageHeader";
import { resources } from "@/data/resources";

export default function ResourcesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <PageHeader
        title="Resources"
        subtitle="Books, papers, and articles I'm reading and recommend."
      />

      <div className="divide-y divide-border border-t border-border">
        {resources.map((resource) => (
          <ThoughtCard key={resource.slug} thought={resource} baseHref="/resources/" />
        ))}
      </div>
    </div>
  );
}
