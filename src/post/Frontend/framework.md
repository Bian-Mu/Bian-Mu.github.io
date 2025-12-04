### Nextjs

- 服务端渲染SSR：提升首屏加载和搜索引擎优化SEO（利于爬虫高效获取html内容）
- 静态网站生成SSG：构建时生成静态html，允许增量静态再生ISR
- API Routes：在pages/api/下文件会自动映射成API路由，同时可以安全的保存api等信息
- useclient：声明客户端运行

vercel：会自动将nextjs转化为无服务器函数，灵活开关api请求；支持流量自动扩展
