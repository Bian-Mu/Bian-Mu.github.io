import { Folder, BlogPost } from '../content/blogData'
import '../styles/Sidebar.css'

interface SidebarProps {
  folders: Folder[]
  toggleFolder: (folderId: string) => void
  selectPost: (post: BlogPost) => void
  selectedPostId?: string
}

function Sidebar({ folders, toggleFolder, selectPost, selectedPostId }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="profile">
        <div className="avatar">
          <img
            src="https://avatars.githubusercontent.com/u/87698008?v=4"
            alt="头像"
            className="avatar-img"
          />
        </div>
        <h2 className="nickname">Bian-Mu</h2>
      </div>
      
      <nav className="folder-list">
        {folders.map(folder => (
          <div key={folder.id} className="folder">
            <button
              className="folder-header"
              onClick={() => toggleFolder(folder.id)}
            >
              <span className={`folder-icon ${folder.isOpen ? 'open' : ''}`}>
                ▶
              </span>
              <span className="folder-name">{folder.name}</span>
            </button>
            
            {folder.isOpen && (
              <ul className="post-list">
                {folder.posts.map(post => (
                  <li
                    key={post.id}
                    className={`post-item ${selectedPostId === post.id ? 'selected' : ''}`}
                    onClick={() => selectPost(post)}
                  >
                    <span className="post-icon">📄</span>
                    <span className="post-title">{post.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
