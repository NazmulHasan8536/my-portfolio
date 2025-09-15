import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const posts = [
  {
    title: "Getting Started with React",
    date: "Sep 2025",
    desc: "Learn the basics of React step by step, including components, state, props, and hooks.",
    category: "React",
    content:
      "Full article content for React basics, practical tips, and examples.",
    image: "https://via.placeholder.com/600x400?text=React+Blog",
    link: "#",
  },
  {
    title: "Laravel Advanced Tips",
    date: "Aug 2025",
    desc: "Optimize your Laravel applications with caching, relationships, and efficient queries.",
    category: "Laravel",
    content:
      "Full article covering advanced Eloquent queries, middleware, events, and testing.",
    image: "https://via.placeholder.com/600x400?text=Laravel+Blog",
    link: "#",
  },
  {
    title: "MongoDB vs Oracle",
    date: "Jul 2025",
    desc: "Which database should you choose for your project? Pros and cons of MongoDB & Oracle.",
    category: "Database",
    content:
      "In-depth comparison with scalability, performance, use-cases, and recommendations.",
    image: "https://via.placeholder.com/600x400?text=Database+Blog",
    link: "#",
  },
];

function BlogCard({ post, index, openModal }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({ x: (y / rect.height) * 10, y: -(x / rect.width) * 10 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative group bg-gray-900 dark:bg-gray-800 rounded-3xl shadow-2xl p-6 cursor-pointer overflow-hidden transform hover:scale-105 hover:shadow-cyan-500/50 transition-all"
      onClick={() => openModal(post)}
    >
      <motion.img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover rounded-2xl mb-4"
        whileHover={{ scale: 1.05, rotate: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      />

      <h3 className="text-2xl font-bold text-white relative z-10">
        {post.title}
      </h3>
      <p className="text-sm text-gray-400 mt-1 relative z-10">{post.date}</p>
      <p className="text-gray-300 mt-3 relative z-10">{post.desc}</p>

      <span className="inline-block mt-4 px-3 py-1 bg-indigo-600/20 text-indigo-400 text-xs font-semibold rounded-full relative z-10">
        {post.category}
      </span>

      <a className="mt-6 inline-flex items-center gap-2 font-semibold text-cyan-400 relative z-10 group-hover:underline">
        Read More
        <motion.span
          className="inline-block"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          →
        </motion.span>
      </a>
    </motion.div>
  );
}

export default function Blog() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openModal = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <section
      id="blog"
      className="py-20 px-6 bg-gray-950 dark:bg-gray-900 relative overflow-hidden"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center text-cyan-400 mb-16 relative z-10"
      >
        Blog
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-12 relative z-10">
        {posts.map((post, i) => (
          <BlogCard key={i} post={post} index={i} openModal={openModal} />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 dark:bg-gray-800 rounded-3xl max-w-3xl w-full p-6 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                className="absolute top-4 right-4 text-white text-2xl font-bold"
                onClick={closeModal}
              >
                ✖
              </button>

              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-64 object-cover rounded-2xl"
              />

              <h3 className="text-3xl font-bold text-cyan-400 mt-4">
                {selectedPost.title}
              </h3>
              <p className="text-gray-300 mt-2">{selectedPost.content}</p>

              <span className="inline-block mt-4 px-3 py-1 bg-indigo-600/20 text-indigo-400 text-xs font-semibold rounded-full">
                {selectedPost.category}
              </span>

              <div className="mt-6 flex gap-4">
                <a
                  href={selectedPost.link}
                  target="_blank"
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition"
                >
                  Read Full
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
