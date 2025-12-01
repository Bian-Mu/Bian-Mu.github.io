import ReactMarkdown from 'react-markdown'
import { BlogPost } from '../content/blogData'
import '../styles/Content.css'

interface ContentProps {
  post: BlogPost | null
}

interface HeadingProps {
  children?: React.ReactNode
  node?: unknown
}

function Content({ post }: ContentProps) {
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
          {post.content}
        </ReactMarkdown>
      </article>
    </main>
  )
}

export default Content
