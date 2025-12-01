import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import TableOfContents from './components/TableOfContents'
import './styles/App.css'
import type { ContentItem, Folder } from './types/content'
import grayMatter from 'gray-matter';

function App() {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const loadContent = async () => {
      const files = [
        'life/reading-notes.md',
        'tech/react-intro.md',
        'tech/typescript-basics.md',
        'projects/blog-project.md'
      ];

      const contentItems: ContentItem[] = [];
      for (const path of files) {
        try {
          const response = await fetch(`/${path}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${path}`);
          }
          const text = await response.text();
          const { data, content } = grayMatter(text);
          contentItems.push({
            path,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            summary: data.summary || '',
          });
        } catch (error) {
          console.error(error);
        }
      }

      const grouped: { [key: string]: ContentItem[] } = {};
      contentItems.forEach(item => {
        const parts = item.path.split('/');
        const folderName = parts[0];
        if (!grouped[folderName]) {
          grouped[folderName] = [];
        }
        grouped[folderName].push(item);
      });

      const folders = Object.entries(grouped).map(([id, posts]) => ({
        id,
        name: id.charAt(0).toUpperCase() + id.slice(1),
        isOpen: true,
        posts,
      }));
      setFolders(folders);
    };

    loadContent();
  }, []);

  const [selectedPost, setSelectedPost] = useState<ContentItem | null>(null);
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);

  const toggleFolder = (folderId: string) => {
    setFolders(folders.map(folder =>
      folder.id === folderId
        ? { ...folder, isOpen: !folder.isOpen }
        : folder
    ));
  };

  const selectPost = (post: ContentItem) => {
    setSelectedPost(post);
  };

  useEffect(() => {
    if (selectedPost) {
      const fetchContent = async () => {
        try {
          const response = await fetch(`/${selectedPost.path}`);
          if (!response.ok) {
            throw new Error('Failed to fetch content');
          }
          const content = await response.text();
          const h3Regex = /^### (.+)$/gm;
          const matches: { id: string; text: string }[] = [];
          let match;
          while ((match = h3Regex.exec(content)) !== null) {
            const text = match[1].trim();
            const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            matches.push({ id, text });
          }
          setHeadings(matches);
        } catch (error) {
          setHeadings([]);
        }
      };
      fetchContent();
    } else {
      setHeadings([]);
    }
  }, [selectedPost])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="app">
      <Sidebar
        folders={folders}
        toggleFolder={toggleFolder}
        selectPost={selectPost}
        selectedPostPath={selectedPost?.path}
      />
      <Content post={selectedPost} />
      <TableOfContents
        headings={headings}
        onHeadingClick={scrollToHeading}
      />
    </div>
  )
}

export default App
