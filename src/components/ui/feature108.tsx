"use client";

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface Feature108Props {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

const Feature108 = ({
  badge = "Now",
  heading = "What I'm focused on right now.",
  description = "Building, reading, and thinking. This page updates as my interests evolve.",
  tabs = [],
}: Feature108Props) => {
  if (tabs.length === 0) return null;

  return (
    <section className="pb-24">
      <div className="container mx-auto">
        {(heading || description) && (
          <div className="flex flex-col items-center gap-4 text-center">
            {badge && <Badge variant="outline">{badge}</Badge>}
            {heading && (
              <h1 className="max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl">
                {heading}
              </h1>
            )}
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        <Tabs
          defaultValue={tabs[0].value}
          className={heading || description ? "mt-12" : ""}
        >
          <TabsList className="container flex flex-row items-center justify-center gap-1 sm:gap-4 md:gap-10">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-1 sm:gap-2 rounded-xl px-2 sm:px-4 py-2 sm:py-3 text-sm sm:text-lg font-bold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary whitespace-nowrap"
              >
                {tab.icon}{tab.icon ? " " : ""}{tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mx-auto mt-8 max-w-screen-xl rounded-2xl bg-muted/50 p-6 lg:p-16">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10"
              >
                <div className="flex flex-col gap-5">
                  <Badge variant="outline" className="w-fit bg-background">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-3xl font-semibold tracking-tight lg:text-5xl">
                    {tab.content.title}
                  </h3>
                  <p className="text-muted-foreground lg:text-lg leading-relaxed">
                    {tab.content.description}
                  </p>
                  <Button className="mt-2.5 w-fit gap-2" size="lg" asChild>
                    <Link href={tab.content.buttonHref}>{tab.content.buttonText}</Link>
                  </Button>
                </div>
                <img
                  src={tab.content.imageSrc}
                  alt={tab.content.imageAlt}
                  className="rounded-xl w-full max-w-md"
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { Feature108 };
export type { Feature108Props, Tab, TabContent };
