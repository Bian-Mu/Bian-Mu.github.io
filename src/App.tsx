import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import TableOfContents from './components/TableOfContents'
import { contentIndex } from './content/index'
import './styles/App.css'
import type { ContentItem, Folder, Post } from './types/content'

function App() {
  const [folders, setFolders] = useState<Folder[]>(() => {
    const grouped: { [key: string]: ContentItem[] } = {};
    contentIndex.forEach(item => {
      const parts = item.path.split('/');
      const folderName = parts[0];
      if (!grouped[folderName]) {
        grouped[folderName] = [];
      }
      grouped[folderName].push(item);
    });

    return Object.entries(grouped).map(([id, posts]) => ({
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      isOpen: true,
      posts,
    }));
  });

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
    // We'll load the content dynamically in Content.tsx
    setSelectedPost(post);
  };

  useEffect(() => {
    if (selectedPost && 'content' in selectedPost) {
      const h3Regex = /^### (.+)$/gm
      const matches: { id: string; text: string }[] = []
      let match
      while ((match = h3Regex.exec(selectedPost.content)) !== null) {
        const text = match[1].trim()
        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
        matches.push({ id, text })
      }
      setHeadings(matches)
    } else {
      setHeadings([])
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
