
### 单点登陆

1. 在认证中心存储session，客户端存储包含sessionId的cookie，当用户访问子系统时提交cookie，由子系统鉴权
2. 认证中心返回短时效性的token和长时效性的refresh token，由子系统自行检查token是否有效，客户端发现过期时用refresh重新找认证中心获取新token

#### 三种存储

1. cookie 客户端，会话结束过期，4kb，在每个http请求头中
2. session 服务器 浏览器关闭或超时，大小取决于服务器，仅传递session id 有状态
3. localstorage 客户端 永久 5mb+ 不参与通信

#### token与拦截 无状态

- 一般是服务器根据登陆信息生成的jwt，前端每次请求都会bear token检验有效
- 可以通过axios拦截配置/检查token

### JSON Schema

用json定义数据结构，实现复用功能更高级的抽象，实现公共处理方法

```
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
