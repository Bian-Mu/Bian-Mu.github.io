import ReactMarkdown from 'react-markdown'
import { ContentItem } from '../types/content'
import { useState, useEffect } from 'react'
import '../styles/Content.css'

interface ContentProps {
  post: ContentItem | null
}

// Load markdown file via fetch
const loadMarkdown = async (path: string): Promise<string> => {
  try {
    const response = await fetch(`/content/${path}.md`)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}.md: ${response.status}`)
    }
    return await response.text()
  } catch (error) {
    console.error(`Failed to load markdown: ${path}`, error)
    return '# 文章加载失败'
  }
}

interface HeadingProps {
  children?: React.ReactNode
  node?: unknown
}

const Content: React.FC<ContentProps> = ({ post }) => {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchContent = async () => {
      if (post) {
        setLoading(true)
        const mdContent = await loadMarkdown(post.path)
        setContent(mdContent)
        setLoading(false)
      } else {
        setContent('')
      }
    }

    fetchContent()
  }, [post])

  if (!post) {
    return (
      <main className="content">
        <div className="welcome">
          <h1>欢迎来到我的博客</h1>
          <p>请从左侧选择一篇文章开始阅读</p>
        </div>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="content">
        <div className="loading">加载中...</div>
      </main>
    )
  }

  return (
    <main className="content">
      <article className="markdown-body">
        <ReactMarkdown
          components={{
            h3: ({ children, ...props }: HeadingProps) => {
              const text = String(children)
              const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
              return <h3 id={id} {...props}>{children}</h3>
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </main>
  )
}

export default Content
