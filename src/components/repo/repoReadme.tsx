"use client"
import { useState } from "react";

interface Props {
  readme: string;
}

export default function RepoReadme({ readme }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (!readme) return null;

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <div className="markdown bg-white rounded-xl p-4 space-y-4 text-gray-700">
      <div
        className={`overflow-hidden transition-max-height duration-300 ${
          expanded ? "max-h-full" : "max-h-[500px]" 
        }`}
        dangerouslySetInnerHTML={{ __html: readme }}
      />
      <button
        onClick={toggleExpanded}
        className="mt-2 text-blue-500 hover:text-blue-400 font-medium text-sm sm:text-base"
      >
        {expanded ? "View Less" : "View More"}
      </button>
    </div>
  );
}
