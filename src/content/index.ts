import type { ContentItem } from '../types/content';

// Use Vite's import.meta.glob to dynamically discover all markdown files
// The 'eager: true' option loads all files at build time
// The 'query: ?raw' option imports the raw content as a string
const markdownModules = import.meta.glob('./**/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

// Extract title from markdown content (first h1 heading)
function extractTitle(content: string, filename: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : filename.replace(/\.md$/, '');
}

// Extract summary from markdown content (first paragraph after h1)
function extractSummary(content: string): string {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Skip empty lines and headings
    if (line && !line.startsWith('#')) {
      return line;
    }
  }
  return '';
}

// Build contentIndex dynamically from discovered markdown files
export const contentIndex: ContentItem[] = Object.entries(markdownModules)
  .map(([path, content]) => {
    // Remove leading './' and trailing '.md' from path
    const cleanPath = path.replace(/^\.\//, '').replace(/\.md$/, '');
    const filename = cleanPath.split('/').pop() || cleanPath;
    
    return {
      path: cleanPath,
      title: extractTitle(content, filename),
      date: new Date().toISOString().split('T')[0], // Default to today
      summary: extractSummary(content),
    };
  })
  .sort((a, b) => a.path.localeCompare(b.path));

// Export a function to get markdown content by path
export function getMarkdownContent(path: string): string | null {
  const key = `./${path}.md`;
  return markdownModules[key] || null;
}