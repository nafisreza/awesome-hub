import { remark } from 'remark';
import html from 'remark-html';

export async function markdownToHtml(markdownText: string): Promise<string> {
  const processedContent = await remark().use(html).process(markdownText);
  return processedContent.toString();
}
