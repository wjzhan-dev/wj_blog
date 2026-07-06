import { Changelog1 } from "@/components/ui/changelog-1";
import type { ChangelogEntry } from "@/components/ui/changelog-1";
import { labProjects } from "@/data/lab";
import {
  getPythonContent,
  getFirstParagraph,
  getProjectImage,
  getArchiveStatus,
} from "@/lib/content";

const labEntries: ChangelogEntry[] = labProjects.map((project) => {
  const code = getPythonContent("Lab", project.slug);
  const paragraph = getFirstParagraph(code) || project.description;
  const image = getProjectImage("Lab", project.slug, project.image) ?? undefined;
  const version =
    getArchiveStatus("Lab", project.slug) ??
    (project.status
      ? project.status.charAt(0).toUpperCase() + project.status.slice(1)
      : "Project");

  return {
    version,
    date: project.date,
    title: project.title,
    description: paragraph,
    items: project.tags,
    image,
    button: {
      url: `/lab/${project.slug}/`,
      text: "View details",
    },
  };
});

export default function LabPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28">
      <Changelog1
        title="Lab"
        description="Experiments, prototypes, and research projects. Things I'm tinkering with."
        entries={labEntries}
      />
    </div>
  );
}
