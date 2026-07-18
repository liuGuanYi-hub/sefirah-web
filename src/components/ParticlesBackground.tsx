import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);
  useEffect(() => { initParticlesEngine(async (engine) => { await loadSlim(engine); }).then(() => setInit(true)); }, []);
  const particlesLoaded = async (): Promise<void> => {};
  const options: ISourceOptions = {
    background: { color: { value: "transparent" } }, fpsLimit: 60,
    interactivity: { events: { onHover: { enable: true, mode: "bubble" } }, modes: { bubble: { distance: 80, size: 2, duration: 2, opacity: 0.25 } } },
    particles: {
      color: { value: ["#9fc5aa", "#d4cdb8"] }, links: { enable: false },
      move: { direction: "bottom", enable: true, outModes: { default: "out" }, random: true, speed: 0.18, straight: false },
      number: { density: { enable: true, width: 800, height: 800 }, value: 48 },
      opacity: { value: { min: 0.04, max: 0.12 } }, shape: { type: "circle" }, size: { value: { min: 1, max: 2 } },
    }, detectRetina: true,
  };
  return init ? <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} className="fixed inset-0 z-[-1] pointer-events-none" /> : null;
}
