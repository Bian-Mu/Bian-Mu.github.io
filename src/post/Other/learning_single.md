
### 一、业务场景的工具函数实现

#### 函数组合、右到左执行

```js
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
console.log('[test compose]', compose((x) => x + 1, (x) => x * 2)(3)); // 预期：7
```

#### 并发控制、任务调度

```js
async function asyncPool(limit, items, iteratorFn) {
  const ret = [];
  const executing = new Set();

  for (const item of items) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);
    executing.add(p);

    const clean = () => executing.delete(p);
    p.then(clean, clean);

    if (executing.size >= limit) await Promise.race(executing);
  }

  return Promise.all(ret);
}
asyncPool(2, [1, 2, 3], async (n) => n * 10).then((r) => console.log('[test asyncPool]', r)); // 预期：[10, 20, 30]
```

#### 超时控制、Promise.race、AbortController

```js
function fetchWithTimeout(url, options = {}, timeout = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  return fetch(url, { ...options, signal: controller.signal }).finally(() => {
    clearTimeout(timer);
  });
}
if (typeof fetch === 'function') {
  fetchWithTimeout('data:text/plain,ok', {}, 2000)
    .then((r) => r.text())
    .then((t) => console.log('[test fetchWithTimeout]', t)) // 预期：ok
    .catch((e) => console.log('[test fetchWithTimeout]', e.name)); // 预期：超时时通常为 AbortError
} else {
  console.log('[test fetchWithTimeout]', 'skip(no fetch)'); // 预期：skip(no fetch)
}
```

#### 深拷贝、循环引用、特殊类型

```js
function deepClone(value, map = new WeakMap()) {
  if (typeof value !== 'object' || value === null) return value;

  if (value instanceof Date) return new Date(value);
  if (value instanceof RegExp) return new RegExp(value.source, value.flags);
  if (value instanceof Map) {
    const result = new Map();
    map.set(value, result);
    value.forEach((v, k) => result.set(deepClone(k, map), deepClone(v, map)));
    return result;
  }
  if (value instanceof Set) {
    const result = new Set();
    map.set(value, result);
    value.forEach((v) => result.add(deepClone(v, map)));
    return result;
  }

  if (map.has(value)) return map.get(value);

  const result = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));
  map.set(value, result);

  Reflect.ownKeys(value).forEach((key) => {
    result[key] = deepClone(value[key], map);
  });

  return result;
}
const deepObj = { a: 1, d: new Date('2020-01-01'), r: /ab/g, s: Symbol('x') };
deepObj.self = deepObj;
const deepCopy = deepClone(deepObj);
console.log('[test deepClone]', deepCopy.a, String(deepCopy.s), deepCopy.d instanceof Date, deepCopy.r.source); // 预期：1 Symbol(x) true ab
```

#### 对象遍历、路径拼接

```js
function flattenObject(obj, prefix = '', res = {}) {
  if (typeof obj !== 'object' || obj === null) {
    if (prefix) res[prefix] = obj;
    return res;
  }

  const keys = Reflect.ownKeys(obj);
  if (!keys.length && prefix) res[prefix] = Array.isArray(obj) ? [] : {};

  keys.forEach((key) => {
    const path = prefix ? `${prefix}.${String(key)}` : String(key);
    const val = obj[key];
    if (typeof val === 'object' && val !== null) {
      flattenObject(val, path, res);
    } else {
      res[path] = val;
    }
  });

  return res;
}
console.log('[test flattenObject]', flattenObject({ a: { b: 1 } })); // 预期：{ 'a.b': 1 }
```

### 二、JS运行机制与控制权

#### 异步串行、队列化执行

```js
function createScheduler() {
  let chain = Promise.resolve();
  return function schedule(task) {
    chain = chain.then(() => task());
    return chain;
  };
}
const schedule = createScheduler();
schedule(() => Promise.resolve('A')).then((v) => console.log('[test createScheduler]', v)); // 预期：A
```

#### 请求中断、控制权暴露

```js
function createCancelableFetch(url, options = {}) {
  const controller = new AbortController();
  const promise = fetch(url, { ...options, signal: controller.signal });
  return {
    promise,
    cancel: () => controller.abort(),
  };
}
if (typeof fetch === 'function') {
  const c = createCancelableFetch('data:text/plain,cancel');
  c.promise.then((r) => r.text()).then((t) => console.log('[test createCancelableFetch]', t)); // 预期：cancel
} else {
  console.log('[test createCancelableFetch]', 'skip(no fetch)'); // 预期：skip(no fetch)
}
```

#### redux中间件思想（thunk）

```js
const thunk = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === 'function') return action(dispatch, getState);
  return next(action);
};
thunk({ dispatch: () => 'd', getState: () => ({ ok: 1 }) })((a) => a)((dispatch, getState) => {
  console.log('[test thunk]', getState(), dispatch('x')); // 预期：{ ok: 1 } d
});
```

#### redux中间件思想（logger）

```js
const logger = ({ getState }) => (next) => (action) => {
  const prev = getState();
  const result = next(action);
  const nextState = getState();
  console.log('[logger]', action, { prev, next: nextState });
  return result;
};
logger({ getState: () => ({ n: 1 }) })((a) => a)({ type: 'X' });
console.log('[test logger]', logger({ getState: () => ({ n: 1 }) })((a) => a)({ type: 'Y' })); // 预期：{ type: 'Y' }
```

### 三、数据处理与算法应用

#### 索引映射、树构建

```js
function listToTree(list) {
  const map = new Map();
  const roots = [];

  list.forEach((item) => map.set(item.id, { ...item, children: [] }));

  list.forEach((item) => {
    const node = map.get(item.id);
    if (item.parentId == null) {
      roots.push(node);
    } else {
      const parent = map.get(item.parentId);
      if (parent) parent.children.push(node);
    }
  });

  return roots;
}
const treeData = listToTree([{ id: 1, parentId: null }, { id: 2, parentId: 1 }]);
console.log('[test listToTree]', treeData); // 预期：根节点下有 id=2 的 children
```

#### DFS、层级信息保留

```js
function treeToList(tree) {
  const res = [];
  const dfs = (nodes, level = 0, parentId = null) => {
    nodes.forEach((node) => {
      const { children = [], ...rest } = node;
      res.push({ ...rest, level, parentId });
      if (children.length) dfs(children, level + 1, node.id);
    });
  };
  dfs(Array.isArray(tree) ? tree : [tree]);
  return res;
}
console.log('[test treeToList]', treeToList(treeData)); // 预期：第二项 level 为 1
```

#### URL解析、重复key、嵌套key、解码

```js
function parseQuery(queryString) {
  const query = queryString.replace(/^\?/, '');
  if (!query) return {};

  const result = {};

  const assign = (obj, path, value) => {
    let cur = obj;
    for (let i = 0; i < path.length; i++) {
      const key = path[i];
      const isLast = i === path.length - 1;

      if (isLast) {
        if (cur[key] === undefined) {
          cur[key] = value;
        } else if (Array.isArray(cur[key])) {
          cur[key].push(value);
        } else {
          cur[key] = [cur[key], value];
        }
      } else {
        if (typeof cur[key] !== 'object' || cur[key] === null) cur[key] = {};
        cur = cur[key];
      }
    }
  };

  query.split('&').forEach((pair) => {
    if (!pair) return;
    const [rawK, rawV = ''] = pair.split('=');
    const key = decodeURIComponent(rawK);
    const value = decodeURIComponent(rawV);
    const path = key.replace(/\]/g, '').split('[');
    assign(result, path, value);
  });

  return result;
}
const parsed = parseQuery('?a=1&a=2&name=%E4%B8%AD%E6%96%87&x[y]=3');
console.log('[test parseQuery]', parsed); // 预期：{ a: ['1','2'], name: '中文', x: { y: '3' } }
```

#### 模板替换、路径取值

```js
function render(template, data) {
  return template.replace(/\{\{\s*([\w.[\]]+)\s*\}\}/g, (_, expr) => {
    const path = expr.replace(/\]/g, '').split(/[.[\]]/).filter(Boolean);
    const val = path.reduce((acc, key) => (acc == null ? undefined : acc[key]), data);
    return val == null ? '' : String(val);
  });
}
console.log('[test render]', render('hi {{user.name}}', { user: { name: 'Tom' } })); // 预期：hi Tom
```

### 四、浏览器API的封装

#### Storage封装、过期策略

```js
const ExpireStorage = {
  set(key, value, ttl) {
    const payload = {
      value,
      expireAt: ttl ? Date.now() + ttl : null,
    };
    localStorage.setItem(key, JSON.stringify(payload));
  },
  get(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    try {
      const { value, expireAt } = JSON.parse(raw);
      if (expireAt && Date.now() > expireAt) {
        localStorage.removeItem(key);
        return null;
      }
      return value;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};
if (typeof localStorage !== 'undefined') {
  ExpireStorage.set('k', 1, 1000);
  console.log('[test ExpireStorage]', ExpireStorage.get('k')); // 预期：1
  ExpireStorage.remove('k');
} else {
  console.log('[test ExpireStorage]', 'skip(no localStorage)'); // 预期：skip(no localStorage)
}
```

#### 拖拽、边界处理

```js
function enableDrag(el, container = document.documentElement) {
  let startX = 0;
  let startY = 0;
  let dragging = false;

  const onMove = (e) => {
    if (!dragging) return;

    const rect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    const nextLeft = e.clientX - startX - rect.left;
    const nextTop = e.clientY - startY - rect.top;

    const maxLeft = rect.width - elRect.width;
    const maxTop = rect.height - elRect.height;

    el.style.left = `${Math.max(0, Math.min(maxLeft, nextLeft))}px`;
    el.style.top = `${Math.max(0, Math.min(maxTop, nextTop))}px`;
  };

  const onUp = () => {
    dragging = false;
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
  };

  el.addEventListener('mousedown', (e) => {
    const elRect = el.getBoundingClientRect();
    startX = e.clientX - elRect.left;
    startY = e.clientY - elRect.top;
    dragging = true;

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
}
console.log('[test enableDrag]', enableDrag.name); // 预期：enableDrag
```

#### 虚拟滚动、窗口渲染

```js
function createVirtualList({
  container,
  list,
  itemHeight,
  renderItem,
  buffer = 5,
}) {
  const totalHeight = list.length * itemHeight;

  const phantom = document.createElement('div');
  phantom.style.height = `${totalHeight}px`;

  const viewport = document.createElement('div');
  viewport.style.position = 'absolute';
  viewport.style.left = '0';
  viewport.style.right = '0';
  viewport.style.top = '0';

  container.style.position = 'relative';
  container.style.overflow = 'auto';
  container.appendChild(phantom);
  container.appendChild(viewport);

  const update = () => {
    const scrollTop = container.scrollTop;
    const height = container.clientHeight;
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
    const end = Math.min(list.length, Math.ceil((scrollTop + height) / itemHeight) + buffer);

    viewport.style.transform = `translateY(${start * itemHeight}px)`;
    viewport.innerHTML = '';

    for (let i = start; i < end; i++) {
      const row = renderItem(list[i], i);
      row.style.height = `${itemHeight}px`;
      viewport.appendChild(row);
    }
  };

  container.addEventListener('scroll', update);
  update();

  return { update };
}
console.log('[test createVirtualList]', createVirtualList.name); // 预期：createVirtualList
```

### 五、手写常见JS原理

#### new过程、原型与返回值规则

```js
function myNew(Ctor, ...args) {
  const obj = Object.create(Ctor.prototype);
  const res = Ctor.apply(obj, args);
  return (res !== null && (typeof res === 'object' || typeof res === 'function')) ? res : obj;
}
function Person(name) { this.name = name; }
console.log('[test myNew]', myNew(Person, 'A').name); // 预期：A
```

#### this绑定、临时属性调用

```js
Function.prototype.myCall = function (context, ...args) {
  const ctx = context == null ? globalThis : Object(context);
  const key = Symbol('fn');
  ctx[key] = this;
  const result = ctx[key](...args);
  delete ctx[key];
  return result;
};
function sum(a, b) { return this.base + a + b; }
console.log('[test myCall]', sum.myCall({ base: 1 }, 2, 3)); // 预期：6
```

#### 参数数组调用

```js
Function.prototype.myApply = function (context, args = []) {
  const ctx = context == null ? globalThis : Object(context);
  const key = Symbol('fn');
  ctx[key] = this;
  const result = ctx[key](...args);
  delete ctx[key];
  return result;
};
console.log('[test myApply]', sum.myApply({ base: 1 }, [2, 3])); // 预期：6
```

#### bind实现、new优先级

```js
Function.prototype.myBind = function (context, ...presetArgs) {
  const fn = this;

  function bound(...laterArgs) {
    const isNew = this instanceof bound;
    const thisArg = isNew ? this : context;
    return fn.apply(thisArg, [...presetArgs, ...laterArgs]);
  }

  bound.prototype = Object.create(fn.prototype);
  return bound;
};
const bindFn = sum.myBind({ base: 1 }, 2);
console.log('[test myBind]', bindFn(3)); // 预期：6
```

#### 原型链查找

```js
function myInstanceof(obj, Ctor) {
  if (obj == null || (typeof obj !== 'object' && typeof obj !== 'function')) return false;
  let proto = Object.getPrototypeOf(obj);
  const target = Ctor.prototype;
  while (proto) {
    if (proto === target) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
console.log('[test myInstanceof]', myInstanceof([], Array)); // 预期：true
```

#### 防抖、立即执行、取消

```js
function debounce(fn, wait, immediate = false) {
  let timer = null;

  function debounced(...args) {
    const callNow = immediate && !timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!immediate) fn.apply(this, args);
    }, wait);
    if (callNow) fn.apply(this, args);
  }

  debounced.cancel = () => {
    clearTimeout(timer);
    timer = null;
  };

  return debounced;
}
const d = debounce((x) => console.log('[test debounce]', x), 20, true); // 预期：立即输出 ok
d('ok');
```

#### 节流、首尾触发控制

```js
function throttle(fn, wait, { leading = true, trailing = true } = {}) {
  let timer = null;
  let last = 0;
  let lastArgs;

  const invoke = (ctx, args) => {
    last = Date.now();
    fn.apply(ctx, args);
  };

  function throttled(...args) {
    const now = Date.now();
    if (!last && !leading) last = now;

    const remaining = wait - (now - last);
    lastArgs = args;

    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      invoke(this, args);
    } else if (!timer && trailing) {
      timer = setTimeout(() => {
        timer = null;
        if (!leading) last = 0;
        invoke(this, lastArgs);
      }, remaining);
    }
  }

  throttled.cancel = () => {
    clearTimeout(timer);
    timer = null;
    last = 0;
  };

  return throttled;
}
const t = throttle((x) => console.log('[test throttle]', x), 20); // 预期：输出 run（首触发）
t('run');
```
