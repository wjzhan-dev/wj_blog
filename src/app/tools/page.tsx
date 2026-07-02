import { Feature108 } from "@/components/ui/feature108";
import type { Tab } from "@/components/ui/feature108";
import { getProjectImage } from "@/lib/content";

const toolTabs: Tab[] = [
  {
    value: "claude-code",
    icon: null,
    label: "Claude Code",
    content: {
      badge: "Agentic Coding",
      title: "The primary tool I use for software development.",
      description:
        "Deep context understanding, multi-file edits, and test generation. Claude Code explores entire codebases, proposes architectural plans, and self-corrects based on test output — more like pair programming than writing prompts.",
      buttonText: "View details",
      buttonHref: "/tools/claude-code-tool/",
      imageSrc: getProjectImage("Tools", "claude-code-tool") ?? "",
      imageAlt: "Claude Code",
    },
  },
  {
    value: "llm",
    icon: null,
    label: "LLM",
    content: {
      badge: "Multi-Model Orchestration",
      title: "Orchestrating multiple LLM calls for complex reasoning.",
      description:
        "Chaining, routing, and parallel execution patterns for sophisticated AI workflows. Combining the strengths of different models — classification, generation, evaluation — into cohesive pipelines that solve problems no single model can.",
      buttonText: "View details",
      buttonHref: "/tools/llm-orchestrator/",
      imageSrc: getProjectImage("Tools", "llm-orchestrator") ?? "",
      imageAlt: "LLM Orchestrator",
    },
  },
];

export default function ToolsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28">
      <Feature108
        badge=""
        heading="The instruments that shape my workflow."
        description="Tools I use and build. Click through to see the code behind each one."
        tabs={toolTabs}
      />
    </div>
  );
}
