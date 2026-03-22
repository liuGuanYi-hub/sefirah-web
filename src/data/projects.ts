import { BrainCircuit, Database, Utensils } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    icon: LucideIcon;
}

export const projectData: Project[] = [
    {
        id: 'openclaw-kb',
        title: 'OpenClaw Agent 知识库',
        description: '基于 OpenClaw 工具链搭建的个人智能助手，探索大语言模型在多源知识检索与自动化流中的落地。',
        techStack: ['AI Agent', 'OpenClaw', 'LLM'],
        icon: BrainCircuit,
    },
    {
        id: 'quickquiz',
        title: 'QuickQuiz 题库系统',
        description: '前后端分离的本地题库管理平台。处理了复杂组件的状态共享，并优化了 MySQL 的查询效率。',
        techStack: ['React', 'Vite', 'Spring Boot', 'MySQL'],
        icon: Database,
    },
    {
        id: 'what2eat',
        title: 'What2Eat 餐饮推荐引擎',
        description: '解决日常“吃什么”痛点的全栈应用。设计了合理的数据库表结构，并实现了流畅的接口数据交互。',
        techStack: ['Vue', 'Java', 'MySQL'],
        icon: Utensils,
    },
];