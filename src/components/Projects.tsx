import { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import { ExternalLink, Github } from 'lucide-react';

const projectsData = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include shopping cart, payment integration, and admin dashboard.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: '🛒',
    github: '#',
    demo: '#',
  },
  {
    title: 'AI Chat Application',
    description: 'Real-time chat application with AI-powered responses using OpenAI API. Includes user authentication and message history.',
    technologies: ['React', 'Socket.io', 'OpenAI', 'PostgreSQL'],
    image: '💬',
    github: '#',
    demo: '#',
  },
  {
    title: 'Task Management System',
    description: 'Collaborative task management tool with drag-and-drop interface, team collaboration features, and real-time updates.',
    technologies: ['React', 'Firebase', 'Tailwind CSS', 'React DnD'],
    image: '✅',
    github: '#',
    demo: '#',
  },
  {
    title: 'Weather Dashboard',
    description: 'Interactive weather dashboard with maps, forecasts, and historical data visualization using various weather APIs.',
    technologies: ['React', 'Chart.js', 'Weather API', 'Mapbox'],
    image: '🌤️',
    github: '#',
    demo: '#',
  },
  {
    title: 'Portfolio Generator',
    description: 'SaaS platform for creating developer portfolios with customizable templates and one-click deployment.',
    technologies: ['Next.js', 'Tailwind CSS', 'Vercel', 'Supabase'],
    image: '🎨',
    github: '#',
    demo: '#',
  },
  {
    title: 'Fitness Tracker',
    description: 'Mobile-responsive fitness tracking app with workout plans, progress charts, and social sharing features.',
    technologies: ['React', 'Express', 'MongoDB', 'Chart.js'],
    image: '💪',
    github: '#',
    demo: '#',
  },
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
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-colors"
                      >
                        <Github size={18} />
                        <span>Code</span>
                      </motion.a>
                      <motion.a
                        href={project.demo}
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                      >
                        <ExternalLink size={18} />
                        <span>Demo</span>
                      </motion.a>
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
          ← Scroll horizontally to see more projects →
        </motion.p>
      </div>
    </section>
  );
}
