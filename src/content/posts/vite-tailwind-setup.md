# 从零梳理 Vite + Tailwind V4 的极简配置流

随着工具链的不断迭代，前端项目的初始化应该越来越轻量。Vite 配合最新的 Tailwind CSS V4，可以说是目前开发体验最丝滑的组合。

## 极速初始化

抛弃繁琐的 Webpack 配置，直接用 Vite 官方模板起手：

```bash
npm create vite@latest my-project -- --template react-ts
cd my-project
npm install
```

## Tailwind V4 的极致精简

Tailwind V4 最大的改变在于**零配置（Zero-config）**理念的进一步加深。不再需要臃肿的 `tailwind.config.js`，很多设置直接回归 CSS 本身。

在 `src/index.css` 中直接引入：

```css
@import "tailwindcss";

/* 自定义主题变量直接写在这里 */
@theme {
  --color-brand-500: #10b981;
}
```

大道至简，把精力留给真正的业务逻辑和代码架构，而不是在构建工具上反复拉扯。
