import ReactMarkdown from 'react-markdown'
import { ContentItem } from '../types/content'
import { useState, useEffect } from 'react'
import grayMatter from 'gray-matter';
import '../styles/Content.css'

interface ContentProps {
  post: ContentItem | null
}

interface HeadingProps {
  children?: React.ReactNode
  node?: unknown
}

const Content: React.FC<ContentProps> = ({ post }) => {
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    if (post) {
      const fetchContent = async () => {
        try {
          const response = await fetch(`/${post.path}`);
          if (!response.ok) {
            throw new Error('Failed to fetch content');
          }
          const text = await response.text();
          try {
            const { content: markdownContent } = grayMatter(text);
            setContent(markdownContent);
          } catch (error) {
            setContent('# 文章加载失败');
          }
        } catch (error) {
          setContent('# 文章加载失败');
        }
      };
      fetchContent();
    } else {
      setContent('');
    }
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
