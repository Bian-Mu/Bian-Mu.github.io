export interface ContentItem {
    path: string;
    title: string;
    date: string;
    summary: string;
}

export interface Folder {
    id: string;
    name: string;
    isOpen: boolean;
    posts: ContentItem[];
}

export interface BlogPost {
    id: string;
    title: string;
    content: string;
}

export type Post = ContentItem | BlogPost;

// Use ContentItem as the primary post type for dynamic markdown loading
export type MarkdownPost = ContentItem;