
### 三种存储

1. cookie 客户端，会话结束过期，4kb，在每个http请求头中
2. session 服务器 浏览器关闭或超时，大小取决于服务器，仅传递session id 有状态
3. localstorage 客户端 永久 5mb+ 不参与通信

### token与拦截 无状态

- 一般是服务器根据登陆信息生成的jwt，前端每次请求都会bear token检验有效
- 可以通过axios拦截配置/检查token
