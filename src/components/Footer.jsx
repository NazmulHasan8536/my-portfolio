import { motion } from "framer-motion";

const floatingIcons = ["🐱", "💼", "🐦", "🌐", "⚡", "💻"];

export default function Footer() {
  return (
    <footer className="relative py-16 overflow-hidden text-gray-300 bg-gray-950">
      {/* Floating Neon Icons */}
      {floatingIcons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute z-10 text-3xl select-none md:text-4xl"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            textShadow: "0 0 12px #00ffff, 0 0 8px #0ff",
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
            rotate: [0, 360, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 6 + Math.random() * 4,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.div>
      ))}

      {/* Neon Lines Background */}
      <svg
        className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: 20 }).map((_, i) => {
          const x1 = Math.random() * window.innerWidth;
          const y1 = Math.random() * window.innerHeight;
          const x2 = Math.random() * window.innerWidth;
          const y2 = Math.random() * window.innerHeight;
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#00ffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4 + Math.random() * 3,
                delay: Math.random() * 4,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>

      <div className="relative z-20 flex flex-col items-start justify-between max-w-6xl gap-8 px-6 mx-auto md:flex-row md:items-center md:gap-0">
        {/* Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_10px_cyan]">
            Nazmul Hasan
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            Full-Stack Developer | Crafting modern web experiences
          </p>
        </motion.div>

        {/* Quick Links & Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-6 md:flex-row md:gap-12"
        >
          <div>
            <h4 className="mb-3 font-semibold text-cyan-400">Sections</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="transition hover:text-cyan-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#projects" className="transition hover:text-cyan-400">
                  Projects
                </a>
              </li>
              <li>
                <a href="#blog" className="transition hover:text-cyan-400">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="transition hover:text-cyan-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-cyan-400">Social</h4>
            <ul className="flex gap-4">
              <li>
                <a
                  href="https://github.com/nazmul"
                  className="text-2xl transition hover:text-cyan-400"
                >
                  🐱
                </a>
              </li>
              <li>
                <a
                  href="www.linkedin.com/in/nazmul-hasan-8a5279198

"
                  className="text-2xl transition hover:text-cyan-400"
                >
                  💼
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/nazmul"
                  className="text-2xl transition hover:text-cyan-400"
                >
                  🐦
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-20 mt-12 text-sm text-center text-gray-500"
      >
        © 2025 Nazmul Hasan. All rights reserved.
      </motion.div>
    </footer>
  );
}
