import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import navbarimg from "../../public/logo.png";
import resumePDF from "../../public/Nazmul_Hasan_Resume.pdf";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const sections = ["home", "projects", "blog", "contact"];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let current = "home";
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop - 100;
          if (scrollY >= offsetTop) current = section;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "home" },
    { name: "Projects", href: "projects" },
    { name: "Blog", href: "blog" },
    { name: "Contact", href: "contact" },
  ];

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
      className="fixed top-0 z-50 w-full bg-white shadow-md dark:bg-gray-900"
    >
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        {/* Logo */}
        <motion.a
          href="#home"
          className="flex items-center gap-3"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={(e) => {
            e.preventDefault();
            handleScrollToSection("home");
            setMenuOpen(false);
          }}
        >
          <img
            src={navbarimg}
            alt="Logo"
            className="object-cover w-10 h-10 rounded-full"
          />
          {/* <span className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">
            Nazmul Hasan
          </span> */}
        </motion.a>

        {/* Desktop Menu */}
        <ul className="hidden gap-8 font-medium text-gray-700 md:flex dark:text-gray-200">
          {links.map((link) => (
            <motion.li
              key={link.href}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => handleScrollToSection(link.href)}
                className={`relative group hover:text-blue-500 transition duration-300 ${
                  activeSection === link.href ? "text-blue-500" : ""
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-blue-500 transition-all duration-300 ${
                    activeSection === link.href
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
            </motion.li>
          ))}
        </ul>

        {/* Dark/Light Toggle + Download CV + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Dark/Light Toggle */}
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            whileHover={{ scale: 1.2, rotate: [0, 15, -15, 0] }}
            transition={{ duration: 0.6 }}
            className="px-3 py-2 text-gray-800 transition bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-200"
          >
            {darkMode ? "🌙" : "☀️"}
          </motion.button>

          {/* Download CV with Glow */}
          <motion.a
            href="../../public/Nazmul_Hasan_Resume (1) (1).pdf"
            download
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px #00ffff" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="hidden px-4 py-2 font-semibold text-white transition-all rounded-lg shadow-md bg-cyan-500 hover:bg-cyan-400 md:inline-block"
          >
            Download CV
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            className="px-3 py-2 text-gray-800 transition bg-gray-200 rounded-lg md:hidden dark:bg-gray-700 dark:text-gray-200"
          >
            {menuOpen ? "✖" : "☰"}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-4 px-6 pb-4 overflow-hidden font-medium text-gray-700 bg-white md:hidden dark:text-gray-200 dark:bg-gray-900"
        >
          {links.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => {
                  handleScrollToSection(link.href);
                  setMenuOpen(false);
                }}
                className={`block py-2 hover:text-blue-500 transition duration-300 ${
                  activeSection === link.href ? "text-blue-500" : ""
                }`}
              >
                {link.name}
              </button>
            </li>
          ))}
          {/* Download CV in Mobile Menu */}
          <li>
            <a
              href={resumePDF}
              download
              className="block px-4 py-2 font-semibold text-white transition-all rounded-lg shadow-md bg-cyan-500 hover:bg-cyan-400"
              onClick={() => setMenuOpen(false)}
            >
              Download CV
            </a>
          </li>
        </motion.ul>
      )}
    </motion.nav>
  );
}
