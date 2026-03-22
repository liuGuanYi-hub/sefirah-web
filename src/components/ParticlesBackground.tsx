import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; // 引入轻量级版本

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  // 初始化粒子引擎
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // 加载 slim 版本，体积更小
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log("Particles loaded", container);
  };

  // 【最核心】Innei 同款“飘零”参数配置
  const options: ISourceOptions = {
    background: {
      color: {
        value: "transparent", // 保持透明，不遮挡背景色
      },
    },
    fpsLimit: 120, // 确保高刷屏流畅
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "bubble", // 鼠标悬停时粒子轻轻放大
        },
      },
      modes: {
        bubble: {
          distance: 100,
          size: 4,
          duration: 2,
          opacity: 0.6,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff", // 白色小粒子
      },
      links: {
        enable: false, // Innei 风格没有连线，更干净
      },
      move: {
        direction: "bottom", // 【核心】粒子缓慢向下飘落
        enable: true,
        outModes: {
          default: "out", // 超出边界后从上方重新进入
        },
        random: true, // 随机移动，更有灵动感
        speed: 0.4, // 【关键】极慢的速度，营造空灵感
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 120, // 粒子数量，保持细碎不拥挤
      },
      opacity: {
        value: 0.2, // 【关键】极低的透明度，似有似无
        random: true, // 随机透明度，增加层次感
      },
      shape: {
        type: "circle", // 圆形小粒子
      },
      size: {
        value: { min: 1, max: 2 }, // 粒子大小在 1px-2px 之间，非常精致
        random: true, // 随机大小
      },
    },
    detectRetina: true, // 适配视网膜屏幕
  };

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="fixed inset-0 z-[-1] pointer-events-none" // 【关键】限定在最底层，且不干扰鼠标事件
      />
    );
  }

  return <></>;
}
