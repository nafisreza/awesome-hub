import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions) {
  return new Date(dateString).toLocaleDateString("en-US", options);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function extractAwesomeCategory(repoName: string): string {
  const name = repoName.toLowerCase()
  if (name.startsWith('awesome-')) {
    return name.replace('awesome-', '').replace(/-/g, ' ')
  }
  return 'general'
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export function getLanguageColor(language: string): string {
  switch (language.toLowerCase()) {
    case 'typescript': return '#3178c6';
    case 'javascript': return '#f1e05a';
    case 'python': return '#3572A5';
    case 'java': return '#b07219';
    case 'go': return '#00ADD8';
    case 'rust': return '#dea584';
    case 'c#': return '#178600';
    case 'php': return '#4F5D95';
    case 'ruby': return '#701516';
    case 'html': return '#e34c26';
    case 'css': return '#563d7c';
    default: return '#cccccc'; // Default grey for unknown languages
  }
}
