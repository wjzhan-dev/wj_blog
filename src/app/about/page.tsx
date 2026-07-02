import { Mail, Code2, Briefcase } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import RetroArcadeSandbox from "@/components/RetroArcadeSandbox";

const contacts = [
  {
    label: "Email",
    href: "mailto:wenjing.zhan.dev@gmail.com",
    icon: Mail,
    value: "",
    color: "bg-sky-100 text-sky-600 group-hover:bg-sky-500 group-hover:text-white",
  },
  {
    label: "GitHub",
    href: "https://github.com/wjzhan-dev",
    icon: Code2,
    value: "",
    color: "bg-sky-100 text-sky-600 group-hover:bg-sky-500 group-hover:text-white",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/wenjingzhan/",
    icon: Briefcase,
    value: "",
    color: "bg-sky-100 text-sky-600 group-hover:bg-sky-500 group-hover:text-white",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <PageHeader
        title="About Me"
        subtitle="Data Scientist & Machine Learning Engineer. Bridging research and production to build models that deliver real business impact."
      />

      <div className="max-w-2xl space-y-12">
        {/* Bio */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-foreground mb-4">
            About
          </h2>
          <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">Previously</strong> Senior DS
              @ Talroo — building ML workflows that turn data into revenue.{" "}
              <strong className="text-foreground">Currently</strong> a Mama Bear
              with two young cubs.{" "}
              <strong className="text-foreground">Future</strong> Applied AI
              Engineer / AI Solution Architect / Algorithm Engineer.
            </p>
            <p>
              Graduating from UT Austin, I started as a DS intern and grew
              into a Senior Data Scientist at Talroo, centering my role around
              core ML workflows. Over a 7-year tenure, I built NLP pipelines,
              deep learning models, and RAG-based matching systems that
              directly drove revenue. I thrive in the full lifecycle: framing
              messy business problems, sourcing the right data, and shipping
              models that actually work in production.
            </p>
            <p>
              In early 2021, amid pandemic-related changes, I transitioned out
              of the industry to welcome my firstborn. Three years later, my
              second. For the past five years, I&apos;ve been a full-time mom
              — a different kind of optimization problem. Now, as my youngest
              turns two, I&apos;m upskilling to current standards and
              re-entering the industry.
            </p>
            <p>
              This site documents my technical runway: decoding papers,
              building systems, and shipping code as I re-enter the field.
            </p>
          </div>
        </section>

        {/* Expertise */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-foreground mb-1">
            Expertise
          </h2>
          <div className="rounded-2xl border border-border bg-card p-4">
            <img
              src="/K-Tree.svg"
              alt="Expertise knowledge tree"
              className="w-full h-auto"
            />
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-foreground mb-4">
            Contact
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Always happy to chat about interesting ideas, collaborations, or
            just to say hi.
          </p>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {contacts.map(({ label, href, icon: Icon, value, color }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel={label !== "Email" ? "noopener noreferrer" : undefined}
                className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {label}
                </span>
                {value && (
                  <span className="text-xs text-muted-foreground">{value}</span>
                )}
              </a>
            ))}
          </div>
        </section>

        {/* Easter Egg */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-foreground mb-2">
            The Family Sandbox V1.0.0
          </h2>
          <p className="text-sm text-foreground font-semibold mb-6">
            A 1D interactive line of love and war. Try dragging them together.
          </p>
          <RetroArcadeSandbox />
        </section>
      </div>
    </div>
  );
}
