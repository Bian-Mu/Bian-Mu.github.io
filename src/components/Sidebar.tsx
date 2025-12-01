import { Folder, ContentItem } from '../types/content';
import '../styles/Sidebar.css';

interface SidebarProps {
  folders: Folder[]
  toggleFolder: (folderId: string) => void
  selectPost: (post: ContentItem) => void
  selectedPostPath?: string
}

function Sidebar({ folders, toggleFolder, selectPost, selectedPostPath }: SidebarProps) {
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
                    key={post.path}
                    className={`post-item ${selectedPostPath === post.path ? 'selected' : ''}`}
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
