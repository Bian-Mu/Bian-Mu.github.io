import '../styles/TableOfContents.css'

interface Heading {
  id: string
  text: string
}

interface TableOfContentsProps {
  headings: Heading[]
  onHeadingClick: (id: string) => void
}

function TableOfContents({ headings, onHeadingClick }: TableOfContentsProps) {
  if (headings.length === 0) {
    return (
      <aside className="toc">
        <h3 className="toc-title">目录</h3>
        <p className="toc-empty">暂无目录</p>
      </aside>
    )
  }

  return (
    <aside className="toc">
      <h3 className="toc-title">目录</h3>
      <nav className="toc-nav">
        <ul className="toc-list">
          {headings.map((heading, index) => (
            <li
              key={`${heading.id}-${index}`}
              className="toc-item"
              onClick={() => onHeadingClick(heading.id)}
            >
              {heading.text}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default TableOfContents
