export interface BlogPost {
  id: string
  title: string
  content: string
}

export interface Folder {
  id: string
  name: string
  posts: BlogPost[]
  isOpen: boolean
}

export const blogData: Folder[] = [
  {
    id: 'tech',
    name: '技术文章',
    isOpen: true,
    posts: [
      {
        id: 'react-intro',
        title: 'React入门指南',
        content: `# React入门指南

React是一个用于构建用户界面的JavaScript库。

## 什么是React

React是由Facebook开发的开源JavaScript库，用于构建用户界面。

### 核心概念

React的核心概念包括组件、Props和State。

### 组件化开发

React采用组件化开发模式，每个组件可以独立维护自己的状态和逻辑。

### 虚拟DOM

React使用虚拟DOM来提高性能，减少直接操作真实DOM的次数。

## 开始使用

要开始使用React，你可以使用Create React App或Vite来创建项目。

### 使用Vite创建项目

\`\`\`bash
npm create vite@latest my-app -- --template react-ts
\`\`\`

### 项目结构

一个典型的React项目包含以下结构：
- src/: 源代码目录
- public/: 静态资源目录
- package.json: 项目配置文件

## 总结

React是一个强大的前端库，值得学习和使用。`
      },
      {
        id: 'typescript-basics',
        title: 'TypeScript基础',
        content: `# TypeScript基础教程

TypeScript是JavaScript的超集，添加了类型系统。

## 为什么使用TypeScript

TypeScript提供了更好的开发体验和代码质量。

### 类型安全

TypeScript的类型系统可以在编译时捕获错误。

### 更好的IDE支持

使用TypeScript可以获得更好的代码补全和重构支持。

### 可维护性

类型注解使代码更易于理解和维护。

## 基本类型

TypeScript支持多种基本类型。

### 字符串和数字

\`\`\`typescript
let name: string = "TypeScript"
let age: number = 10
\`\`\`

### 数组和对象

\`\`\`typescript
let list: number[] = [1, 2, 3]
let person: { name: string; age: number } = { name: "John", age: 30 }
\`\`\`

## 总结

TypeScript是现代前端开发的必备技能。`
      }
    ]
  },
  {
    id: 'life',
    name: '生活随笔',
    isOpen: false,
    posts: [
      {
        id: 'reading-notes',
        title: '读书笔记',
        content: `# 读书笔记

记录我的阅读心得。

## 最近在读

最近在阅读一些技术书籍和文学作品。

### 技术类

技术书籍帮助我提升编程能力。

### 文学类

文学作品让我放松心情，拓宽视野。

## 阅读计划

制定合理的阅读计划很重要。

### 每日阅读

每天保持至少30分钟的阅读时间。

### 做笔记

阅读时做好笔记，便于回顾。

## 总结

阅读是一生的习惯。`
      }
    ]
  },
  {
    id: 'projects',
    name: '项目记录',
    isOpen: false,
    posts: [
      {
        id: 'blog-project',
        title: '个人博客开发',
        content: `# 个人博客开发记录

记录个人博客的开发过程。

## 项目介绍

这是一个使用React和TypeScript开发的个人博客。

### 技术栈

- React 18
- TypeScript
- Vite
- React Markdown

### 主要功能

- 文件夹式的文章管理
- Markdown渲染
- 目录导航

## 开发过程

开发过程中的一些心得体会。

### 布局设计

采用三栏布局，左侧导航，中间内容，右侧目录。

### 状态管理

使用React的useState和useEffect管理状态。

## 总结

这是一个有趣的项目，学到了很多。`
      }
    ]
  }
]
