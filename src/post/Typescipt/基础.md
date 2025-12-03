
### 类型系统

#### 基础类型与窄化

- 原始：string, number, boolean, bigint, symbol, null, undefined
    ```
    //symbol创建的值是唯一的（同值不同地址），解决命名冲突问题，无法运算
    let name = Symbol("test")
    console.log(name) //Symbol(test)
    ```
- 特殊：any, unknown, never, void
  - any会绕过检查
  - unknown是需要窄化后使用的any
  - never处理抛错与无限循环等
  - void无返回值
- 字面量与联合：'a' | 'b', string | number
- 交叉（同时满足）：A & B
- 数组：[]
  - 元组：数组中元素类型不同，如`let tuple:[number, string]`
- 窄化：typeof, instanceof, in
    ```
    //instanceof用于溯源原型链
    test instanceof Object //检查test是否拥有Object.prototype

    //in检查属性是否在对象或其原型链中
    "PI" in Math  //true
    ```

#### type、interface

简单来说联合或映射时用`type`，继承或同名接口合并时用`interface`。可以用`readonly`来修饰属性表示只读，用`[key: string]:number`等来对索引签名

#### 泛型

定义时对函数与类加上类型，也可以有约束
```
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const user = { id: 1, name: "Alice" };
const name = getProp(user, "name"); // 推断为 string

// 约束对象具有 length 属性
function logLen<T extends { length: number }>(x: T) {
  console.log(x.length);
}
```

可以有默认类型`<T = string>`

#### Utility Types

内置工具类型，调用后生成新的符合要求的类型：

- `Partial<T>`：把 T 的所有属性变为可选（?）。
- `Required<T>`：把 T 的所有属性变为必需（去掉 ?）。
- `Readonly<T>`：把 T 的所有属性变为 readonly。
- `Pick<T, K extends keyof T>`：从 T 中选择一组属性。
- `Omit<T, K extends keyof any>`：从 T 中剔除一组属性（常用来移除敏感字段）。
- `Record<K extends keyof any, T>`：构造一个对象类型，键为 K，值为 T。常用于字典/map。
- `Exclude<T, U>`：从 T 中剔除能赋值给 U 的类型（T \ U）。
- `Extract<T, U>`：从 T 中提取能赋值给 U 的类型（交集）。
- `NonNullable<T>`：移除 null 和 undefined。
- `ReturnType<T>`：获取函数类型 T 的返回类型。
- `Parameters<T>`：获取函数类型 T 的参数元组类型。
- `InstanceType<T>`：获取构造函数类型 T 的实例类型。
- `ConstructorParameters<T>`：构造函数参数元组。
- `Awaited<T>`：获取 Promise/thenable 内层解析类型（TS 4.5+）。

