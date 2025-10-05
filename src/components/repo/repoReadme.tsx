"use client"
import { useState } from "react";

interface Props {
  readme: string | null;
}

export default function RepoReadme({ readme }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (!readme) return null;

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <div className="markdown bg-card rounded-xl p-6 space-y-4 border">
      <h2 className="text-lg font-semibold text-foreground mb-4">README</h2>
      <div
        className={`overflow-hidden transition-all duration-300 prose prose-sm max-w-none dark:prose-invert ${
          expanded ? "max-h-full" : "max-h-[500px]" 
        }`}
        dangerouslySetInnerHTML={{ __html: readme }}
      />
      <button
        onClick={toggleExpanded}
        className="mt-4 text-primary hover:text-primary/80 font-medium text-sm transition-colors"
      >
        {expanded ? "View Less" : "View More"}
      </button>
    </div>
  );
}
