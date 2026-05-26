export interface NewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  category: '技术' | '互联网' | '工程';
  description: string;
  editorNote: string;
  whyItMatters: string;
  hotScore?: number;
  tags: string[];
  featured?: boolean;
}

export const newsData: NewsItem[] = [
  {
    id: 'react-compiler-practice',
    title: 'React Compiler 落地讨论持续升温，前端性能优化重新回到工程实践中心',
    link: 'https://react.dev/',
    pubDate: '2026-04-12T09:00:00+08:00',
    source: 'Editorial',
    category: '技术',
    description:
      '围绕编译期优化、状态模型和组件边界的讨论正在变多，团队开始重新审视哪些性能问题该交给工具链处理。',
    editorNote:
      '我会特别关注这类“工具替你承担复杂度”的趋势，因为它直接影响前端工程师的思维方式。',
    whyItMatters:
      '这不只是性能优化话题，更是在重新划分“开发者该手动控制什么”与“应该交给编译器什么”。',
    hotScore: 92,
    tags: ['React', 'Performance', 'Compiler'],
    featured: true,
  },
  {
    id: 'ai-product-loop',
    title: 'AI 产品从“功能演示”转向“工作流闭环”，工具可用性成为新分水岭',
    link: 'https://openai.com/',
    pubDate: '2026-04-11T19:30:00+08:00',
    source: 'Editorial',
    category: '互联网',
    description:
      '用户越来越不关心模型参数，而更关心产品是否真正嵌入日常任务，是否能稳定地省下时间。',
    editorNote:
      '这条很像我最近对 AI 工具的直觉判断：没有闭环的能力展示，最终都会沦为短暂的新鲜感。',
    whyItMatters:
      '真正决定产品生命力的，不再是“能不能做”，而是“能不能持续替用户完成一段工作”。',
    hotScore: 88,
    tags: ['AI', 'Workflow', 'Product'],
  },
  {
    id: 'vite-ecosystem',
    title: 'Vite 生态继续巩固，轻量构建链路在中小型项目里依旧极具吸引力',
    link: 'https://vite.dev/',
    pubDate: '2026-04-10T14:10:00+08:00',
    source: 'Vite',
    category: '技术',
    description:
      '对个人站、作品集和中后台来说，开发体验、构建速度和较低的心智负担依然是 Vite 的核心优势。',
    editorNote:
      '如果项目目标是尽快形成作品，而不是炫耀配置复杂度，Vite 这条路依然非常舒服。',
    whyItMatters:
      '工具链选型会直接影响创作节奏，轻量并不代表能力弱，很多时候反而意味着更高的完成率。',
    hotScore: 81,
    tags: ['Vite', 'Tooling', 'Frontend'],
  },
  {
    id: 'serverless-boundary',
    title: '越来越多独立开发者开始重视“服务端边界”，把敏感能力从浏览器端后撤',
    link: 'https://vercel.com/',
    pubDate: '2026-04-09T21:00:00+08:00',
    source: 'Editorial',
    category: '工程',
    description:
      'API Key、聚合抓取、摘要生成等能力被逐步收回到可控边界后，前端项目的稳定性和安全性都明显提升。',
    editorNote:
      '这条其实和我自己的项目演进很贴近。很多问题不是“功能不会做”，而是最初放错了边界。',
    whyItMatters:
      '当项目从 demo 走向长期维护，边界感会比堆功能更重要，安全性和可部署性都从这里开始分化。',
    hotScore: 85,
    tags: ['Security', 'Serverless', 'Architecture'],
    featured: true,
  },
  {
    id: 'markdown-knowledge-base',
    title: 'Markdown 驱动内容系统仍然是个人数字花园的高性价比方案',
    link: 'https://www.markdownguide.org/',
    pubDate: '2026-04-08T10:20:00+08:00',
    source: 'Editorial',
    category: '工程',
    description:
      '本地文件即内容源的模式依然简单直接，尤其适合强调沉淀、迭代和长期维护的个人站点。',
    editorNote:
      '我一直觉得，个人站最舒服的状态就是“写作成本尽可能低”，这样内容才会真正积累起来。',
    whyItMatters:
      '内容系统越轻，长期写下去的概率越高；对数字花园来说，持续更新比一次性完美更重要。',
    hotScore: 76,
    tags: ['Markdown', 'Content', 'Digital Garden'],
  },
  {
    id: 'frontend-career-signal',
    title: '“会做作品”重新成为前端新人最强的职业信号之一',
    link: 'https://github.com/',
    pubDate: '2026-04-07T18:45:00+08:00',
    source: 'Community',
    category: '互联网',
    description:
      '相比单纯刷题或罗列技能，能够独立完成一个有审美、有工程意识的项目，越来越能体现真实能力。',
    editorNote:
      '这条我很认同。一个完整作品能同时暴露审美、取舍、实现力和工程感，这是简历文字替代不了的。',
    whyItMatters:
      '项目作品正在重新成为表达能力的主战场，尤其对前端来说，完成度本身就是最有说服力的语言。',
    hotScore: 79,
    tags: ['Career', 'Portfolio', 'Frontend'],
  },
];
