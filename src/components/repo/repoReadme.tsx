'use client';
import { useState } from 'react';

interface Props {
  readme: string | null;
}

export default function RepoReadme({ readme }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (!readme) return null;

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <div className="markdown bg-card space-y-4 rounded-xl border p-6">
      <h2 className="text-foreground mb-4 text-lg font-semibold">README</h2>
      <div
        className={`prose prose-sm dark:prose-invert max-w-none overflow-hidden transition-all duration-300 ${
          expanded ? 'max-h-full' : 'max-h-[500px]'
        }`}
        dangerouslySetInnerHTML={{ __html: readme }}
      />
      <button
        onClick={toggleExpanded}
        className="text-primary hover:text-primary/80 mt-4 text-sm font-medium transition-colors"
      >
        {expanded ? 'View Less' : 'View More'}
      </button>
    </div>
  );
}
