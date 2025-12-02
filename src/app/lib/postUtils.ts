import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export interface PostCategory {
    name: string;
    path: string;
    children: PostItem[];
}

export interface PostItem {
    title: string;
    path: string;
    isDirectory: boolean;
}

export function getPostStructure(): PostCategory[] {
    const postDir = join(process.cwd(), 'src/post');
    const categories: PostCategory[] = [];

    const categoryDirs = readdirSync(postDir).filter(dir => statSync(join(postDir, dir)).isDirectory());

    for (const category of categoryDirs) {
        const categoryPath = join(postDir, category);
        const items: PostItem[] = [];

        const files = readdirSync(categoryPath);
        for (const file of files) {
            const filePath = join(categoryPath, file);
            if (statSync(filePath).isFile() && file.endsWith('.md')) {
                const title = file.replace('.md', '');
                items.push({
                    title,
                    path: `/post/${category}/${file}`,
                    isDirectory: false,
                });
            }
        }

        categories.push({
            name: category,
            path: `/post/${category}`,
            children: items,
        });
    }

    return categories;
}