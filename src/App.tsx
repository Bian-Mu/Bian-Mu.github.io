import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import TableOfContents from './components/TableOfContents'
import { blogData, Folder, BlogPost } from './content/blogData'
import './styles/App.css'

function App() {
  const [folders, setFolders] = useState<Folder[]>(blogData)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([])

  const toggleFolder = (folderId: string) => {
    setFolders(folders.map(folder =>
      folder.id === folderId
        ? { ...folder, isOpen: !folder.isOpen }
        : folder
    ))
  }

  const selectPost = (post: BlogPost) => {
    setSelectedPost(post)
  }

  useEffect(() => {
    if (selectedPost) {
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
        selectedPostId={selectedPost?.id}
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
