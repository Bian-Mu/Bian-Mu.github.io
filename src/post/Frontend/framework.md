
### React

#### 设计思路

将表达与执行解耦，实现：

1. 编写jsx组件成为UI
2. react内部将UI表达成一棵树，并计算出diff
3. 由不同的渲染器去执行绘制

#### 渲染更新

##### 调度

1. 用户触发了影响state的事件，在hook内部记录最新的状态，这一记录会被添加到对应组件的fiber节点中
2. react通知内部调度器scheduler，其根据优先级分配时间片规划所有任务

##### 渲染 异步

1. react从根fiber开始，逐层根据fiber节点中的新记录，执行状态更新，状态更新后再次调用该组件获得最新的UI
2. 新旧UI的差异被记录成diff，带有标记。生成出一棵描述了UI新旧变化的fiber树，以及一个涉及标记节点的list

##### 提交 同步

1. react将指针从旧fiber指向新fiber树
2. react遍历list，，找到对应的fiber节点，react-dom执行dom操作，将节点更新（包括增删改）
3. 所有dom更新后，react会同步调用涉及生命周期/hooks的函数，然后异步调度useEffect

- 生命周期函数：在组件的不同阶段自动执行，属于类组件的一部分
- hooks：属于函数组件，是一组操作集合
- useeffect：所谓effect副作用，指的是与UI渲染这个流程无关的操作，比如http、手动修改dom、定时器、监听器。用于在函数组件中代替生命周期函数

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

### nodejs

通过事件驱动+单线程实现事件循环，把IO操作的等待时间空出来，提高并发。而浏览器的事件循环是为了UI渲染与用户交互

#### 组件

1. v8引擎，负责执行js，包括编译、垃圾处理等，包含微任务队列
2. node c++ binding，将js相关api（例如fs、http）映射到底层功能
3. libuv跨平台异步IO库，提供事件循环、计时器、线程池、网络IO等

js代码将通过node的api调用到c++，并进入libuv的事件循环与系统调用

#### 事件驱动

node中很多对象是以事件发射器eventemitter形式运作的，例如：

- Socket 有 'data'、'close'
- HTTP Server 有 'request'
- Stream 有 'readable'、'end'

当某个事件发生后，对应的回调函数会被发射到队列中等待执行

#### 非阻塞IO

node鼓励使用promise来编写异步IO操作，从而不阻塞主线程

#### 单线程

执行js的主线程只有一个，事件循环本质是一个无限循环调用的函数：

1. 执行同步的js
2. 将异步IO作为任务交给libuv，同时记录回调函数
3. IO完成后回调函数进入队列
4. 不断取出队列中的函数执行

文件fs、dns解析、部分api的工作通过libuv的线程池完成

#### 模块化

commonjs：require

esm：import

#### stream

大多数IO相关的api都是基于stream，优势在于：

1. 可读写、双工、转换流
2. 背压：下游处理不过来时上游会减速来避免内存爆炸
