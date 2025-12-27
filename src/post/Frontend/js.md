
### 杂谈

1. 闭包：可以将被引用的变量参数保留在内存中
2. 箭头函数：无自己的this,只能自动捕捉上下文，不能作new构造，无prototye
3. this：非严格函数、全局为window，严格模式函数为undefined，new/对象，call/apply/bind显式绑定
4. promise包含pending、fulfilled、rejected，通过then/catch处理
5. async的函数返回promise，await等待promise被解决
6. 浅拷贝：只复制对象或数组的第一层属性。 如果属性值是原始类型，就复制值；如果是引用类型（如对象、数组），则只复制其内存地址（引用）。因此，修改拷贝对象中的引用类型属性会影响到原对象。
7. 深拷贝：
    - JSON.parse(JSON.stringify(obj))：简单易用，但无法处理函数、undefined、正则表达式等特殊类型。
    - 递归函数：手动实现递归遍历。
    - 第三方库：如 Lodash 的cloneDeep()
8. es6：let/const，箭头函数，class/extends，import，promise，解构赋值，模板字符串，函数默认参数，展开运算符、剩余参数，map与set
9. 原型链：实现继承，存在内部链接指向原型__proto__，便于向上自动链式寻找属性，终点一般都是Object.prototype
10. 声明
    1. var
    2. let
    3. const

### 数组的操作

- 修改原数组: push(), pop(), shift(), unshift(), splice(), sort(), reverse(), fill()
- 不修改原数组: concat(), join(), slice(), indexOf(), lastIndexOf(), includes()
- 遍历方法: forEach(), map(), filter(), reduce(), reduceRight(), every(), some(), find(), findIndex()

### 如何执行一个字符串s

1. `eval(s)` 同步，局部作用域
2. `setTimeout(s,0)` 异步，全局作用域
3. `const code=document.createElement('script').innerHTML=s; document.body.appendChild(code)` 同步，全局作用域
4. `new Function(s){}` 同步，全局作用域

### 字符串的操作

1. `s.padStart(sum,char)`当s长度不足sum时前置补char
2. s为只包含数字的字符串时，`numS=+s`会直接赋其number值
