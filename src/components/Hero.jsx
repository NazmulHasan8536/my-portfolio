import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import myImage from "../../public/myimg.jpeg"; // Ensure your image is in src/assets/

const floatingIcons = ["💻", "⚡", "🔥", "🌐", "🖥️", "⚙️", "🛠️", "📦"];

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse movement for neon trails
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const trails = Array.from({ length: 6 });

  return (
    <section
      id="home"
      className="h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-10 px-6 md:px-20 pt-20 relative overflow-hidden bg-gray-950"
    >
      {/* Deep Gradient Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(120deg, #0a0a0a, #111827, #0f172a, #1e293b)`,
          backgroundSize: "400% 400%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Icons */}
      {floatingIcons.map((icon, index) => {
        const x = useMotionValue(Math.random() * window.innerWidth);
        const y = useMotionValue(Math.random() * window.innerHeight);
        const rotate = useMotionValue(0);
        const xTransform = useTransform(x, (val) => val);
        const yTransform = useTransform(y, (val) => val);

        useEffect(() => {
          const interval = setInterval(() => {
            x.set(Math.random() * window.innerWidth);
            y.set(Math.random() * window.innerHeight);
            rotate.set(Math.random() * 360);
          }, 7000 + Math.random() * 5000);
          return () => clearInterval(interval);
        }, [x, y, rotate]);

        return (
          <motion.div
            key={index}
            className="absolute text-4xl md:text-5xl select-none z-20"
            style={{
              top: yTransform,
              left: xTransform,
              rotate,
              textShadow:
                "0 0 14px rgba(0,255,255,0.7), 0 0 10px rgba(0,200,255,0.5)",
            }}
          >
            {icon}
          </motion.div>
        );
      })}

      {/* Neon Trails following mouse */}
      {trails.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-6 h-6 rounded-full bg-cyan-400 opacity-50 z-10"
          style={{
            x: mousePos.x - i * 10,
            y: mousePos.y - i * 10,
            filter: "blur(8px)",
          }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{
            repeat: Infinity,
            duration: 2 + i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Left Side: Text */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex-1 text-center md:text-left relative z-30"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
          Hi, I am{" "}
          <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(0,255,255,0.9)]">
            Nazmul Hasan
          </span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-lg">
          Senior Full-Stack Developer with 4+ years of experience building
          scalable web apps using{" "}
          <span className="text-cyan-400">
            Laravel, React, and modern technologies
          </span>
          . I deliver clean code, solve complex problems, and craft exceptional
          digital experiences.
        </p>

        <div className="mt-6 flex gap-4 justify-center md:justify-start">
          <a
            href="#projects"
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg shadow-lg hover:bg-cyan-500 transition-colors hover:scale-105 transform"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 hover:scale-105 transition transform"
          >
            Hire Me
          </a>
        </div>
      </motion.div>

      {/* Right Side: Profile Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex-1 flex justify-center relative z-30"
      >
        <motion.img
          src={myImage}
          alt="Nazmul Hasan"
          className="w-80 h-80 md:w-[400px] md:h-[400px] object-cover rounded-full border-4 border-cyan-400 shadow-xl"
          whileHover={{
            scale: 1.15,
            rotate: 5,
            boxShadow: "0 0 60px #00ffff",
            y: [-5, 5, -5],
          }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        />
      </motion.div>
    </section>
  );
}
