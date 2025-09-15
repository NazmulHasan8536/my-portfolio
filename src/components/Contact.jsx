import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const floatingIcons = ["📧", "📞", "💻", "🌐", "⚡", "🛠️"];

export default function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_uuapf79", // 🔹 EmailJS Service ID
        "template_ebr0cyi", // 🔹 EmailJS Template ID
        form.current,
        "3wlBKmk1wXtY0bhcl" // 🔹 EmailJS Public Key
      )
      .then(
        () => {
          setStatus("success");
          setLoading(false);
          form.current.reset();
        },
        (error) => {
          console.error(error.text);
          setStatus("error");
          setLoading(false);
        }
      );
  };

  return (
    <section
      id="contact"
      className="relative px-6 py-20 overflow-hidden bg-gray-950 dark:bg-gray-900"
    >
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
        {Array.from({ length: 15 }).map((_, i) => {
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

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-20 mb-12 text-4xl font-bold text-center text-cyan-400"
      >
        Contact Me
      </motion.h2>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-20 max-w-3xl p-10 mx-auto bg-gray-900 shadow-xl bg-opacity-70 backdrop-blur-lg rounded-3xl"
      >
        <form ref={form} onSubmit={sendEmail} className="grid gap-6">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-300">Name</label>
            <input
              type="text"
              name="user_name"
              required
              placeholder="Your Name"
              className="p-4 text-white transition bg-gray-800 border border-gray-700 outline-none rounded-xl focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-300">Email</label>
            <input
              type="email"
              name="user_email"
              required
              placeholder="you@example.com"
              className="p-4 text-white transition bg-gray-800 border border-gray-700 outline-none rounded-xl focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-300">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              placeholder="Write your message..."
              className="p-4 text-white transition bg-gray-800 border border-gray-700 outline-none rounded-xl focus:ring-2 focus:ring-cyan-400"
            ></textarea>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px #00ffff" }}
            whileTap={{ scale: 0.95 }}
            className="py-4 font-semibold text-white transition-all shadow-lg bg-cyan-600 rounded-xl hover:bg-cyan-500 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </form>

        {/* Status Messages */}
        {status === "success" && (
          <p className="mt-4 text-green-400">✅ Message sent successfully!</p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-400">❌ Failed to send. Try again!</p>
        )}

        {/* Contact Info */}
        <div className="flex flex-col items-center justify-around gap-6 mt-10 text-gray-300 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="text-2xl text-cyan-400">📧</span>
            <p>nazmul.cse2019@gmail.com</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl text-cyan-400">📞</span>
            <p>+8801616216703</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl text-cyan-400">🌐</span>
            <a
              href="https://github.com/NazmulHasan8536"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400"
            >
              github.com/NazmulHasan8536
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
