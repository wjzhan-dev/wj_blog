import { Changelog1 } from "@/components/ui/changelog-1";
import type { ChangelogEntry } from "@/components/ui/changelog-1";
import { builds } from "@/data/builds";
import {
  getPythonContent,
  getFirstParagraph,
  getProjectImage,
  getArchiveStatus,
} from "@/lib/content";

const buildEntries: ChangelogEntry[] = builds.map((build) => {
  const code = getPythonContent("Builds", build.slug);
  const paragraph = getFirstParagraph(code) || build.description;
  const image = getProjectImage("Builds", build.slug) ?? undefined;
  const version =
    getArchiveStatus("Builds", build.slug) ??
    (build.status
      ? build.status.charAt(0).toUpperCase() + build.status.slice(1)
      : "Build");

  return {
    version,
    date: build.date,
    title: build.title,
    description: paragraph,
    items: build.tags,
    image,
    button: {
      url: `/builds/${build.slug}/`,
      text: "View details",
    },
  };
});

export default function BuildsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28">
      <Changelog1
        title="Builds"
        description="Production tools and systems I've built. Things that ship."
        entries={buildEntries}
      />
    </div>
  );
}
