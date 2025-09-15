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
      className="relative flex flex-col-reverse items-center justify-center h-screen gap-10 px-6 pt-20 overflow-hidden md:flex-row md:px-20 bg-gray-950"
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
            className="absolute z-20 text-4xl select-none md:text-5xl"
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
          className="absolute z-10 w-6 h-6 rounded-full opacity-50 bg-cyan-400"
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
        className="relative z-30 flex-1 text-center md:text-left"
      >
        <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl drop-shadow-lg">
          Hi, I am{" "}
          <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(0,255,255,0.9)]">
            Nazmul Hasan
          </span>
        </h1>
        <p className="max-w-lg mt-4 text-lg text-gray-300 md:text-xl">
          Senior Full-Stack Developer with 4+ years of experience building
          scalable web apps using{" "}
          <span className="text-cyan-400">
            Laravel, React, and modern technologies
          </span>
          . I deliver clean code, solve complex problems, and craft exceptional
          digital experiences.
        </p>

        <div className="flex justify-center gap-4 mt-6 md:justify-start">
          <a
            href="#projects"
            className="px-6 py-3 text-white transition-colors transform rounded-lg shadow-lg bg-cyan-600 hover:bg-cyan-500 hover:scale-105"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 text-gray-300 transition transform border border-gray-600 rounded-lg hover:bg-gray-800 hover:scale-105"
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
        className="relative z-30 flex justify-center flex-1"
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
