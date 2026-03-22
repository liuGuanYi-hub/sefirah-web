import { ArrowUp, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function PostActionButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // 监听滚动，只有向下滚动一段距离后才显示“回到顶部”
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shareToCSDN = () => {
    // 动态获取当前页面的标题和链接
    // const title = document.title;
    // const url = window.location.href;
    const csdnShareUrl = `https://mp.csdn.net/mp_blog/creation/editor?spm=1001.2101.3001.5352`; 
    // 注意：CSDN 没有直接的 API 分享接口，这里我们引导至创作中心，或者你可以改为复制链接
    window.open(csdnShareUrl, '_blank');
  };

  return (
    <div className="fixed bottom-12 right-8 md:right-12 z-50 flex flex-col gap-4">
      <AnimatePresence>
        {/* 回到顶部按钮 */}
        {showBackToTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-zinc-900/80 backdrop-blur-md border border-white/10 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-2xl"
            title="回到顶部"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 分享/去往 CSDN 按钮 */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onClick={shareToCSDN}
        className="p-3 rounded-xl bg-zinc-900/80 backdrop-blur-md border border-white/10 text-zinc-400 hover:text-orange-400 hover:border-orange-500/50 transition-all shadow-2xl"
        title="去 CSDN 创作"
      >
        <Share2 size={20} />
      </motion.button>
    </div>
  );
}
