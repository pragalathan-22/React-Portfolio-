import { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import { ExternalLink, Github } from 'lucide-react';

const projectsData = [
  { title: "Pixlspace.in - Printing Kiosk", description: "A self-service printing kiosk experience designed to make document and photo printing simple, quick, and accessible.", technologies: ["Printing kiosk", "Web", "User experience"], image: "P", github: "https://github.com/pragalathan-22", demo: "https://pixlspace.in" },
  { title: "Anjok Technologies - Company Website", description: "A polished company website presenting Anjok Technologies, its services, and its work to prospective clients.", technologies: ["Company website", "Responsive design", "Web"], image: "A", github: "https://github.com/pragalathan-22", demo: "https://anjoktechnologies.in" },
  { title: "Kiosk Standee Advertisement", description: "A digital advertising concept for kiosk standees, designed to capture attention and communicate promotions at a glance.", technologies: ["Digital signage", "Kiosk", "Advertising"], image: "S", github: "https://github.com/pragalathan-22", demo: "#contact" },
  { title: "KFC Touch Billing Kiosk", description: "A touchscreen self-order and billing flow built to help customers browse a menu, place an order, and move through checkout.", technologies: ["Touch kiosk", "Ordering", "Billing"], image: "K", github: "https://github.com/pragalathan-22", demo: "#contact" },
  { title: "Face Attendance System", description: "A face recognition attendance project built to identify users and streamline attendance recording.", technologies: ["Face recognition", "Attendance", "Automation"], image: "F", github: "https://github.com/pragalathan-22", demo: "#contact" },
];


export function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-linear-to-b from-gray-900 to-black"
    >
      <div className="max-w-7xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl text-center mb-16 bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
        >
          Projects
        </motion.h2>

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#a855f7 #1f2937',
          }}
        >
          <div className="flex gap-6 min-w-max px-4">
            {projectsData.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="w-96 shrink-0"
              >
                <div className="bg-linear-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-lg overflow-hidden hover:border-purple-500/50 transition-all h-full">
                  {/* Project Image/Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="h-48 bg-linear-to-br from-purple-800/30 to-pink-800/30 flex items-center justify-center text-7xl"
                  >
                    {project.image}
                  </motion.div>

                  <div className="p-6">
                    <h3 className="text-2xl text-purple-300 mb-3">{project.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-colors"
                      >
                        <Github size={18} />
                        <span>Code</span>
                      </motion.a>
                      {project.demo.startsWith("https://") && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <ExternalLink size={18} />
                          <span>Visit</span>
                        </motion.a>
                      )}
                      {/* <motion.a
                        href={project.demo}
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                      >
                        <ExternalLink size={18} />
                        <span>Demo</span>
                      </motion.a> */}
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-purple-600/0 via-purple-600/5 to-pink-600/0 pointer-events-none"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-500 mt-8"
        >
          â† Scroll horizontally to see more projects â†’
        </motion.p>
      </div>
    </section>
  );
}
