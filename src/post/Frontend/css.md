
### css3

- 增加了选择器、nth结构伪类、:enabled状态伪类等
- 增加了border等视觉效果
- 提供了flexbox等
- transform
  - translate 平移
  - scale 缩放
  - rotate 旋转
  - skew 倾斜
- transition 从方向与时间来设置过渡动画
- 媒体查询
- 字体

### flex

```css

flex-grow //比例
flex-basis //初始值
flex-shrink //收缩
flex-flow
    flex-direction //主轴方向、正反
    flex-wrap //换行
```

### justify、align

在flex与grid下生效
在flex中分别表示主轴与交叉轴

```css

justify-content //排列 全网水平对齐
align-content //多行排列 全网垂直对齐
align-items //单行排列 格内垂直对齐
align-self //控制单项目对齐 格子垂直对齐
```

仅在grid下生效

```css

justify-items //格内水平对齐
justify-self //格子水平对齐
```

有一个vertical-align用于指定行内元素的垂直对齐

赋值order可以实现元素升值排序

### css单位

- px 像素
- pt 点，用于打印
- %
- em 相对父元素
- rem 相对根元素
- vh/vw
- vmax/vmin

### 清除浮动float

- 空div clear
- 触发blocking formatting context
  - display: flow-root
  - 父元素overflow
- ::afer伪元素 clear

### 响应式布局

- flex
- grid:grid-column用于控制网格项跨度、grid-template-columns则是容器布局
- 媒体查询
- 容器查询
- 相对单位
- clamp函数流体排版

### postition

fixed在父元素transform的情况下会失效，即不再相对视口固定，此时可以用portal方式将所需fixed组件放置在body中避免影响

### 提高图片/canvas清晰度

使得原始尺寸=样式尺寸*dpr（`devicePixelRatio`）
