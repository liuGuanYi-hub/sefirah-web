export interface Note {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  status: 'Seedling' | 'Incubating' | 'Evergreen';
  category: 'Tech' | 'Literature' | 'Logic' | 'Life';
}

export const notesData: Note[] = [
  {
    id: 'openclaw-kb-setup',
    title: 'OpenClaw Agent：从零搭建本地知识库踩坑实录',
    excerpt: '在准备三月份开发比赛的过程中，尝试打通多源知识检索与大语言模型代理的交互。记录一些关于 Agent 工具链配置和底层逻辑的思考。',
    date: '2026-03-12',
    status: 'Incubating',
    category: 'Tech',
  },
  {
    id: 'plague-absurdism',
    title: '荒诞与韧性：重读《鼠疫》初探',
    excerpt: '当封闭的秩序面临失控，个人的抵抗如何构成群体的意义。目前刚读完前几章，记录一些关于奥兰城中人物群像和荒诞主义的碎片化思考。',
    date: '2026-03-16',
    status: 'Seedling',
    category: 'Literature',
  },
  {
    id: 'novel-power-systems',
    title: '复杂网文架构拆解：严密力量体系与非线性叙事',
    excerpt: '以《诡秘之主》的魔药途径和《蛊真人》的蛊虫设定为例，探讨底层逻辑严密的网文体系是如何支撑起宏大世界观的。',
    date: '2026-02-20',
    status: 'Evergreen',
    category: 'Logic',
  },
];
