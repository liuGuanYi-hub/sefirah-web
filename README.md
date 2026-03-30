# 🌌 Project Sefirah (sefirah-web)

> 一个极具呼吸感与工程化美学的个人数字花园 (Personal Digital Garden)。

[![React](https://img.shields.io/badge/React-18%2B-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

## 📖 简介

**Project Sefirah** 并非传统的博客模板，而是基于现代前端工程化标准从零构建的个人技术门户与思想留存地。
项目追求极致的交互体验（Innei 风格的微光卡片、物理级弹簧动画）与极简的内容管理流（全自动 Markdown 引擎），致力于在代码的逻辑世界与人文的荒诞中寻找锚点。

🌐 **在线预览**: [https://sefirah-web.vercel.app](https://sefirah-web.vercel.app) (请替换为你自己的真实域名)

---

## ✨ 核心特性

- **🪄 极致视觉交互 (Vibe UX)**：
  - 基于 Framer Motion 实现的页面级丝滑过渡与 `Layout Animation`（布局自动重排）。
  - 利用 Tailwind V4 的 `@theme` 变量体系，构建了动态跟随鼠标的局部光晕（Spotlight）与磨砂玻璃质感。
  - 引入轻量级粒子引擎 `@tsparticles`，营造深色模式下的沉浸式空气感。
- **⚙️ 全自动内容引擎 (Serverless CMS)**：
  - 弃用繁重的数据库，基于 Vite 的 `import.meta.glob` 底层 API，实现本地 `.md` 文件的全自动批量解析。
  - 支持 Frontmatter 元数据提取，实现文章的自动分类、时间轴排序与高亮过滤。
- **📐 高度组件化架构**：
  - 封装了高复用的 `ProjectGrid`（动态主题映射项目矩阵）与自动响应的时间轴组件。
- **🚀 零宕机 CI/CD 流水线**：
  - 完美接入 Vercel 自动化部署，解决 TypeScript 严格类型校验与环境差异导致的构建痛点，实现 `git push` 即发布的极客工作流。

---

## 🛠️ 技术栈

- **核心框架**: React + Vite
- **样式引擎**: Tailwind CSS V4 + `lucide-react` (精美图标库)
- **动画驱动**: Framer Motion
- **Markdown 渲染**: `react-markdown` + `@tailwindcss/typography`
- **内容解析**: Vite `import.meta.glob` (静态资源预编译)
- **平台部署**: Vercel

---

## 🚀 快速开始

### 1. 本地环境搭建
```bash
# 克隆仓库
git clone [https://github.com/liuGuanYi-hub/sefirah-web.git](https://github.com/liuGuanYi-hub/sefirah-web.git)
cd sefirah-web

# 安装依赖
npm install

# 启动本地开发服务器
npm run dev
