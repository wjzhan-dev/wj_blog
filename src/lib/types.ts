export interface ContentItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  status?: "active" | "archived" | "wip";
  demo?: string;
  subtitle?: string;
  readingTime?: number;
}
