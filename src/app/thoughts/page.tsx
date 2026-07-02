import { thoughts } from "@/data/thoughts";
import ThoughtCard from "@/components/ThoughtCard";
import PageHeader from "@/components/PageHeader";

export default function ThoughtsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <PageHeader
        title="Thoughts"
        subtitle="Ideas, reflections, and essays. Thinking out loud about software, design, and the craft."
      />

      <div className="divide-y divide-border border-t border-border">
        {thoughts.map((thought) => (
          <ThoughtCard key={thought.slug} thought={thought} />
        ))}
      </div>
    </div>
  );
}
