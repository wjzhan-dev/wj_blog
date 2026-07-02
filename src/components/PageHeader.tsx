interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-12 sm:mb-16">
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground mb-3">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
