
### 有意思的样式设计（基于css或者js）

#### 瀑布布局

#### 地图 基于Echarts

json注册成图表

#### mac docker

画线函数+根据变量变化的css

#### b站弹幕不遮挡人像

扣图出一张黑白色svg，在使用mask-image、mask-size属性加载

#### gpt文本末尾光标

捕获最后的文本节点，添加一个新字符

### 懒加载

1. 原生属性如iframe/img loading="lazy"
2. 数据的延迟fetch
3. 路由按需加载
4. js代码分割
5. CDN+本地缓存策略

### Web语义化

语义化的html标签可以提升可访问性、SEO、可维护性

### 单点登陆

1. 在认证中心存储session，客户端存储包含sessionId的cookie，当用户访问子系统时提交cookie，由子系统鉴权
2. 认证中心返回短时效性的token和长时效性的refresh token，由子系统自行检查token是否有效，客户端发现过期时用refresh重新找认证中心获取新token

#### 三种存储

1. cookie 客户端，会话结束过期，4kb，在每个http请求头中
2. session 服务器 浏览器关闭或超时，大小取决于服务器，仅传递session id 有状态 同步
3. localstorage 客户端 永久 5mb+ 不参与通信 同步

#### token与拦截 无状态

- 一般是服务器根据登陆信息生成的jwt，前端每次请求都会bear token检验有效
- 可以通过axios拦截配置/检查token

### JSON Schema

用json定义数据结构，实现复用功能更高级的抽象，实现公共处理方法

```ts
    const userSchema = {
        type: 'object',
        properties:{
            name:{
                type:'string',
                minLength:2,
                pattern:'^[a-z]',
                validator //扩展字段
                ...
            },
            ...
        }
        required:['name']
    }
```

### Core Web Vitals

一组评价用户体验以及搜索引擎排名、网页性能的指标：

1. LCP最大内容绘制：衡量页面加载性能，指最大内容元素如图片、视频加载到可见所需的时间，应该小于2.5s
2. INP交互到下次绘制：衡量页面交互性，指如点击页面后响应该操作的时间，应该小于200ms
3. CLS累计布局偏移：衡量视觉稳定性，指内容意外移动的程度，如图片加载完推开了原处的文字，应该小于0.1

针对性改进：

1. LCP：延迟加载、减少服务器响应时间等
2. INP：减少主线程负载
3. CLS：为动态内容预留空间

### monorepo

可能会遇到的问题：

1. 依赖管理复杂：容易出现依赖冲突、版本不一致等问题。
2. 包间耦合和部署：跨包依赖、发布与回滚测试有时不易管理。
3. CI/CD 构建压力大：涉及很多包时，整体构建、测试时间长。
4. 权限和协作：不同团队/成员对不同包的管理权限分配、协作流程要求更高。
