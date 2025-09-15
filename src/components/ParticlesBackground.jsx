// ParticlesBackground.jsx
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // ✅ slim loader import

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    // loadFull নয়, slim ব্যবহার করো
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "#0d47a1" },
        particles: {
          color: { value: "#ffffff" },
          links: { enable: true, color: "#ffffff" },
          move: { enable: true },
          number: { value: 80 },
        },
      }}
    />
  );
}
