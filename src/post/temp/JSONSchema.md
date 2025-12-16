
### what & why JSON Schema

JSON Schema 是一种用于描述和验证 JSON 数据结构的国际标准。它允许开发者在数据交换过程中定义数据的类型、格式、约束和嵌套关系，确保数据的一致性与有效性。

作为最广泛使用的数据交换格式，JSON 本身缺乏结构定义能力。JSON Schema 补足了这一短板，使前后端、微服务、API 接口能基于统一规范进行数据校验，从而降低集成成本与运行时错误。

### how JSON Schema

#### 基本格式

常见关键字：

- `type`: 数据类型
- `properties`: 对象属性定义
- `required`: 必填字段列表
- `minimum`/`maximum`: 数值范围
- `minLength`/`maxLength`: 字符串长度
- `pattern`: 正则表达式校验

一个标准的 JSON Schema 是一个 JSON 对象，必须包含 `$schema` 和 `type` 字段：

```json

{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "format": "email"
    },
    "password": {
      "type": "string",
      "minLength": 8
    },
    "age": {
      "type": "integer",
      "minimum": 13,
      "maximum": 120
    }
  },
  "required": ["email", "password"]
}
```

#### 用法示例

示例：验证用户注册数据

在 Node.js 中可使用 `ajv` 库进行校验：

```javascript

const Ajv = require('ajv');
const ajv = new Ajv();

const schema = { /* 上述 schema */ };
// 编译与注册一个type guard
const validate = ajv.compile(schema);

const data = { email: "user@example.com", password: "12345678", age: 25 };

const valid = validate(data);
if (!valid) console.log(validate.errors);
```

### 生态支持

JSON Schema 拥有广泛的生态支持：

- 语言库：JavaScript（ajv、zod）、Python（jsonschema）、Java（jsonschema-validator）、Go（go-jsonschema）
- 数据库：PostgreSQL、MongoDB 支持通过 Schema 验证文档
- API 工具：Swagger/OpenAPI 3.0+ 使用 JSON Schema 定义请求/响应结构
