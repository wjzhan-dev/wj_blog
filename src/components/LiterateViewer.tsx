import type { Block } from "@/lib/literate";

interface LiterateViewerProps {
  blocks: Block[];
}

export default function LiterateViewer({ blocks }: LiterateViewerProps) {
  if (!blocks.length) {
    return <p className="text-sm text-muted-foreground italic">No content.</p>;
  }

  return (
    <div>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "prose":
            return <ProseBlock key={i} content={block.content} />;
          case "image":
            return <ImageBlock key={i} src={block.src} width={block.width} />;
          case "link":
            return <LinkBlock key={i} url={block.url} title={block.title} />;
          case "code":
            return <CodeBlock key={i} html={block.html} />;
          case "space":
            return <SpaceBlock key={i} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

function ProseBlock({ content }: { content: string }) {
  return <ProseLines lines={content.split("\n")} />;
}

function ProseLines({ lines }: { lines: string[] }) {
  const result: React.ReactNode[] = [];
  let listItems: string[] = [];
  let i = 0;

  function flushList() {
    if (listItems.length > 0) {
      result.push(
        <ul key={`ul-${i++}`} className="list-disc pl-5 space-y-0.5 my-1">
          {listItems.map((item, j) => (
            <li key={j} className="leading-relaxed">
              {parseInline(item.slice(2))}
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  }

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      result.push(<div key={i++} className="h-3" />);
      return;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      result.push(
        <h3 key={i++} className="text-lg font-semibold mt-4 mb-1">
          {parseInline(trimmed.slice(4))}
        </h3>
      );
      return;
    }
    if (trimmed.startsWith("## ")) {
      flushList();
      result.push(
        <h2 key={i++} className="text-xl font-semibold mt-6 mb-2">
          {parseInline(trimmed.slice(3))}
        </h2>
      );
      return;
    }
    if (trimmed.startsWith("# ")) {
      flushList();
      result.push(
        <h1 key={i++} className="text-2xl font-semibold mt-6 mb-1">
          {parseInline(trimmed.slice(2))}
        </h1>
      );
      return;
    }

    if (trimmed.startsWith("- ")) {
      listItems.push(trimmed);
      return;
    }

    flushList();
    result.push(
      <p key={i++} className="my-1 leading-relaxed">
        {parseInline(trimmed)}
      </p>
    );
  });

  flushList();
  return <>{result}</>;
}

function parseInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function ImageBlock({ src, width }: { src: string; width?: number }) {
  return (
    <div className="my-4">
      <img
        src={src}
        alt=""
        className="max-w-full"
        style={width ? { maxWidth: `min(${width}px, 100%)` } : undefined}
      />
    </div>
  );
}

function LinkBlock({ url, title }: { url: string; title?: string }) {
  return (
    <span className="inline">
      {" "}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        {title || url}
      </a>
    </span>
  );
}

function CodeBlock({ html }: { html: string }) {
  return (
    <div
      className="my-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function SpaceBlock() {
  return <div className="h-6" />;
}
