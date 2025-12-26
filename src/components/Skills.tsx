import { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import { Code, Database, Cloud, Palette, Terminal, Globe } from 'lucide-react';

const skillsData = [
  {
    category: 'Frontend',
    icon: Code,
    skills: [
      { name: 'React', level: 75 },
      { name: 'TypeScript', level: 50 },
      { name: 'Tailwind CSS', level: 62 },
      { name: 'Next.js', level: 65 },
      { name: 'Vue.js', level: 40 },
    ],
  },
  {
    category: 'Backend',
    icon: Terminal,
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Python', level: 85 },
      { name: 'Express', level: 75 },
      { name: 'REST APIs', level: 82 },
    ],
  },
  {
    category: 'Database',
    icon: Database,
    skills: [
      { name: 'PostgreSQL', level: 78 },
      { name: 'MongoDB', level: 75 },
      { name: 'Firebase', level: 75 },
    ],
  },
  {
    category: 'Cloud & DevOps',
    icon: Cloud,
    skills: [
      { name: 'AWS', level: 75 },
      { name: 'Docker', level: 62 },
      { name: 'Vercel', level: 70 },
    ],
  },
  {
    category: 'Design',
    icon: Palette,
    skills: [
      { name: 'Figma', level: 75 },
      { name: 'UI/UX', level: 60 },
      { name: 'Responsive Design', level: 80 },
    ],
  },
  {
    category: 'Others',
    icon: Globe,
    skills: [
      { name: 'Git', level: 82 },
      { name: 'Testing', level: 85 },
    ],
  },
];

export function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      id="skills"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-linear-to-b from-black to-gray-900"
    >
      <div className="max-w-6xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl text-center mb-16 bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
        >
          Skills & Technologies
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-linear-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6 hover:border-purple-500/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                >
                  <category.icon size={24} />
                </motion.div>
                <h3 className="text-xl text-purple-300">{category.category}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-purple-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isVisible ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + skillIndex * 0.1,
                          ease: 'easeOut',
                        }}
                        className="h-full bg-linear-to-r from-purple-500 to-pink-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
