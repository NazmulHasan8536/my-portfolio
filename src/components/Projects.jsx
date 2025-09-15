import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import houserent from "../../public/houserent.png";
import isp from "../../public/isp.png";

const projects = [
  {
    title: "House Rent System",
    desc: "SaaS-based rent management system with monthly invoicing and tenant management.",
    tech: ["Laravel", "React", "Tailwind", "MySQL"],
    image: houserent,
    demo: "#",
    github: "#",
  },
  {
    title: "Doctor Queue App",
    desc: "Real-time appointment queue management system using React and Socket.io.",
    tech: ["React", "Socket.io", "Tailwind", "Node.js"],
    image: "https://via.placeholder.com/600x400?text=Doctor+Queue+App",
    demo: "#",
    github: "#",
  },
  {
    title: "ISP Management",
    desc: "MikroTik integration with dashboard, customer billing & usage monitoring.",
    tech: ["React", "Laravel", "REST API", "MikroTik API"],
    image: isp,
    demo: "#",
    github: "#",
  },
  {
    title: "Prescription Engine",
    desc: "Smart prescription generation system for doctors with medicine database and dosage calculation.",
    tech: ["Laravel", "React", "Tailwind", "SQLite"],
    image: "https://via.placeholder.com/600x400?text=Prescription+Engine",
    demo: "#",
    github: "#",
  },
  {
    title: "Inventory Management System",
    desc: "Manage stock, suppliers, purchase orders and reporting in real-time.",
    tech: ["Laravel", "Vue.js", "MySQL", "Tailwind"],
    image: "https://via.placeholder.com/600x400?text=Inventory+Management",
    demo: "#",
    github: "#",
  },
  {
    title: "Ecommerce Project",
    desc: "Full-featured ecommerce platform with cart, payments and order management.",
    tech: ["React", "Node.js", "Stripe API", "MongoDB"],
    image: "https://via.placeholder.com/600x400?text=Ecommerce+Project",
    demo: "#",
    github: "#",
  },
  {
    title: "Pathology Management",
    desc: "Laboratory system for pathology test management, reports, and billing.",
    tech: ["Laravel", "React", "MySQL", "Tailwind"],
    image: "https://via.placeholder.com/600x400?text=Pathology+Management",
    demo: "#",
    github: "#",
  },
  {
    title: "Radiology Management",
    desc: "Complete radiology workflow system with image uploads, patient reports and scheduling.",
    tech: ["React", "Laravel", "AWS S3", "Tailwind"],
    image: "https://via.placeholder.com/600x400?text=Radiology+Management",
    demo: "#",
    github: "#",
  },
];

function ProjectCard({ project, index, openModal }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="relative overflow-hidden transition-all transform bg-gray-900 shadow-2xl cursor-pointer group dark:bg-gray-800 rounded-3xl hover:scale-105 hover:shadow-cyan-500/50"
      onClick={() => openModal(project)}
    >
      <motion.img
        src={project.image}
        alt={project.title}
        className="object-cover w-full h-48 rounded-t-3xl"
        whileHover={{ scale: 1.05, rotate: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
      <div className="relative z-10 p-6 bg-gray-900 dark:bg-gray-800">
        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
        <p className="mt-3 text-gray-300">{project.desc}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.map((t, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs font-semibold rounded-full bg-cyan-600/20 text-cyan-400"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <section
      id="projects"
      className="relative px-6 py-20 overflow-hidden bg-gray-950 dark:bg-gray-900"
    >
      <h2 className="relative z-10 mb-16 text-4xl font-bold text-center text-cyan-400">
        My Projects
      </h2>

      <div className="relative z-10 grid gap-12 md:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} index={i} openModal={openModal} />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-3xl p-6 bg-gray-900 dark:bg-gray-800 rounded-3xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                className="absolute text-2xl font-bold text-white top-4 right-4"
                onClick={closeModal}
              >
                ✖
              </button>

              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="object-cover w-full h-64 rounded-2xl"
              />

              <h3 className="mt-4 text-3xl font-bold text-cyan-400">
                {selectedProject.title}
              </h3>
              <p className="mt-2 text-gray-300">{selectedProject.desc}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {selectedProject.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs font-semibold rounded-full bg-cyan-600/20 text-cyan-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mt-6">
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    className="px-4 py-2 text-white transition rounded-lg bg-cyan-600 hover:bg-cyan-500"
                  >
                    Live Demo
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    className="px-4 py-2 transition border rounded-lg border-cyan-400 text-cyan-400 hover:bg-cyan-700 hover:text-white"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
