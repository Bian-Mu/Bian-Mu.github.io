'use client';

import MarkdownShower from "./components/MarkdownShower";
import SiderBar from "./components/SiderBar";
import { useState, useEffect } from 'react';
import axios from 'axios';

interface PostCategory {
  name: string;
  path: string;
  children: PostItem[];
}

interface PostItem {
  title: string;
  path: string;
  isDirectory: boolean;
}

export default function Home() {
  const [currentPost, setCurrentPost] = useState<string | null>(null);
  const [categories, setCategories] = useState<PostCategory[] | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/posts');
        setCategories(res.data);
      } catch (error) {
        console.error('Failed to load posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="overflow-hidden flex min-h-screen items-center justify-center brightness-97 dark:brightness-90">
      <div className="fixed inset-0 blur-xs opacity-95 dark:opacity-90 bg-[url(/background.jpg)]  bg-cover  bg-center "></div>
      <main className="gap-3 grid grid-cols-11 fixed h-full w-full max-w-7xl sm:items-start">
        {categories ?
          <>
            <div className="col-span-3 h-full">
              <SiderBar categories={categories} onPostSelect={setCurrentPost} />
            </div>
            <div className="col-span-8 h-full">
              <MarkdownShower currentPost={currentPost} />
            </div>
          </>
          : ""
        }
      </main>
    </div>
  );
}
