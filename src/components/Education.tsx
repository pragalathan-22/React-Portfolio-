import { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import { GraduationCap, Calendar } from 'lucide-react';

const educationData = [
  {
    degree: 'Master of Computer Applications',
    institution: 'Madras University',
    period: '2024 - Present',
    description: 'Specialized in C# and Cloud Computing',
    gpa: '-',
  },
  {
    degree: 'Bachelor of Computer Applications',
    institution: 'Hindustan University',
    period: '2020 - 2023',
    description: 'Focus on Software Engineering and Systems Design',
    gpa: '3.8',
  },
];

export function Education() {
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
      id="education"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-linear-to-b from-gray-900 to-black"
    >
      <div className="max-w-4xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl text-center mb-16 bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
        >
          Education
        </motion.h2>

        <div className="space-y-8">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, x: 10 }}
              className="relative"
            >
              <div className="bg-linear-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6 hover:border-purple-500/50 transition-all">
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0"
                  >
                    <GraduationCap size={24} />
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-2xl text-purple-300 mb-1">{edu.degree}</h3>
                    <p className="text-xl text-gray-300 mb-2">{edu.institution}</p>
                    
                    <div className="flex items-center gap-2 text-gray-400 mb-3">
                      <Calendar size={16} />
                      <span>{edu.period}</span>
                    </div>

                    <p className="text-gray-400 mb-2">{edu.description}</p>
                    <p className="text-purple-400">GPA: {edu.gpa}</p>
                  </div>
                </div>

                <motion.div
                  className="absolute inset-0 rounded-lg bg-linear-to-r from-purple-600/0 via-purple-600/10 to-pink-600/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
