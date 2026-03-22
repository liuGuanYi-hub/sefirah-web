import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import PostActionButtons from '../components/PostActionButtons';

export default function Post() {
  const { id } = useParams(); // 获取 URL 里的文章 ID
  const navigate = useNavigate();
  const [content, setContent] = useState('');

  useEffect(() => {
    // 使用 Vite 的原石导入 (?raw) 动态加载 markdown 文件
    if (id) {
      import(`../content/posts/${id}.md?raw`)
        .then((module) => {
          setContent(module.default);
        })
        .catch(() => {
          setContent('# 404 Not Found\n\n这篇量子碎片可能消散在虚空里了...');
        });
    }
  }, [id]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      {/* 返回按钮 */}
      <button 
        onClick={() => navigate(-1)}
        className="group flex items-center gap-2 text-zinc-500 hover:text-emerald-400 transition-colors mb-10 font-mono text-sm"
      >
        <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
        cd .. (返回列表)
      </button>

      {/* 文章头部信息 */}
      <header className="mb-8">
        <div className="flex items-center gap-4 font-mono text-sm text-zinc-500 border-b border-white/[0.08] pb-4">
          <span className="text-emerald-500/80">/post/{id}</span>
        </div>
      </header>

      {/* 文章正文 (Markdown 渲染区) */}
      <article className="prose prose-invert prose-emerald max-w-none prose-p:leading-relaxed prose-pre:bg-[#0a0a0c] prose-pre:border prose-pre:border-white/[0.05]">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>

      {/* 底部悬浮按钮组 */}
      <PostActionButtons />
    </motion.div>
  );
}
