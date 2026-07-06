export interface ContentItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  status?: "active" | "archived" | "wip";
  image?: string;
  demo?: string;
  subtitle?: string;
  readingTime?: number;
}
