
### React

#### 展示组件与容器组件

将UI与数据分离，展示组件仅接受props，尽可能不依赖上下文；在容器组件中调用api、store、订阅等

##### React.memo与React.useCallback

memo:当父组件重新渲染且传入该子组件的props与上一次浅比较相等时，跳过子组件渲染并复用上一次输出
useCallback:稳定要传给子组件的函数，帮助实现浅比较一致

### Nextjs

- 服务端渲染SSR：提升首屏加载和搜索引擎优化SEO（利于爬虫高效获取html内容）
- 静态网站生成SSG：构建时生成静态html，允许增量静态再生ISR
- API Routes：在pages/api/下文件会自动映射成API路由，同时可以安全的保存api等信息
- useclient：声明客户端运行

vercel：会自动将nextjs转化为无服务器函数，灵活开关api请求；支持流量自动扩展
