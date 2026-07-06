import { Feature108 } from "@/components/ui/feature108";
import type { Tab } from "@/components/ui/feature108";
import { labProjects } from "@/data/lab";
import { builds } from "@/data/builds";
import { thoughts } from "@/data/thoughts";
import { resources } from "@/data/resources";
import {
  getLatest,
  getLatestAcross,
  getPythonContent,
  getFirstParagraph,
  getProjectImage,
} from "@/lib/content";

/* ── Derive latest content from data files ── */

const latestProjectResult = getLatestAcross(labProjects, builds) ?? {
  item: labProjects[0] ?? builds[0],
  sourceIndex: 0,
};
const latestProject = latestProjectResult.item;
const projectSource = latestProjectResult.sourceIndex === 0 ? "lab" : "builds";
const projectImg = getProjectImage(
    projectSource === "lab" ? "Lab" : "Builds",
    latestProject.slug,
    latestProject.image
  ) ?? "";
const projectPara =
  getFirstParagraph(
    getPythonContent(projectSource === "lab" ? "Lab" : "Builds", latestProject.slug)
  ) || latestProject.description;

const latestThought = getLatest(thoughts);
const thoughtImg = latestThought
  ? (getProjectImage("Thoughts", latestThought.slug, latestThought.image) ?? "")
  : "";
const thoughtPara = latestThought
  ? (getFirstParagraph(getPythonContent("Thoughts", latestThought.slug)) || latestThought.description)
  : "";

const latestReading = resources[0];

/* ── Build tabs dynamically ── */

const nowTabs: Tab[] = [
  {
    value: "projects",
    icon: null,
    label: "Current Project",
    content: {
      badge: latestProject.status === "active" ? "Active" : "Project",
      title: latestProject.title,
      description: projectPara,
      buttonText:
        projectSource === "lab" ? "Explore Lab" : "Explore Builds",
      buttonHref: `/${projectSource}/${latestProject.slug}/`,
      imageSrc: projectImg,
      imageAlt: latestProject.title,
    },
  },
  {
    value: "reading",
    icon: null,
    label: "Current Reading",
    content: {
      badge: "Reading",
      title: latestReading.title,
      description: latestReading.description,
      buttonText: "View Resources",
      buttonHref: `/resources/${latestReading.slug}/`,
      imageSrc: getProjectImage("Resources", latestReading.slug, latestReading.image) ?? "",
      imageAlt: "Current reading and resources",
    },
  },
  {
    value: "thoughts",
    icon: null,
    label: "Quick Thought",
    content: {
      badge: "Thinking",
      title: latestThought?.title ?? "Latest Thought",
      description: thoughtPara,
      buttonText: "Read More",
      buttonHref: latestThought ? `/thoughts/${latestThought.slug}/` : "/thoughts/",
      imageSrc: thoughtImg,
      imageAlt: latestThought?.title ?? "Thought",
    },
  },
];

export default function NowPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
          Learn. Build. Share.
        </h1>
        <p className="mt-3 text-xl sm:text-2xl font-medium text-foreground/75">
          From Data Science to AI — building in public.
        </p>
      </div>

      <Feature108
        badge=""
        heading=""
        description=""
        tabs={nowTabs}
      />
    </div>
  );
}
