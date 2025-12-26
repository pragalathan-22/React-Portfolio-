import { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const experienceData = [
  {
    title: 'Full Stack Developer',
    company: 'AorBorC Technologies',
    location: 'Kundrathur, Chennai',
    period: '2024-2025',
description: [
  'Developed cross-platform mobile applications using React Native for construction worker maintenance, salon booking, and home service platforms',
  'Built and maintained scalable backend services using Node.js and Express, including REST APIs, authentication, and role-based access control',
  'Designed and integrated real-time booking, worker assignment, and service tracking features to improve operational efficiency',
  'Collaborated with designers and stakeholders to deliver user-friendly mobile experiences and business-driven solutions',
  'Optimized application performance and ensured secure data handling across frontend and backend systems',
],

  },
  {
    title: 'Software Developer',
    company: 'Newtonsky5 Technologies',
    location: 'Mahindra World City, Chennai',
    period: '2025 - 2026',
description: [
  'Developed and maintained React-based web applications including CRM and HRM systems with role-based access and dashboards',
  'Built and integrated IoT-based door unlock systems with backend services using Node.js, enabling real-time device control and monitoring',
  'Deployed, managed, and maintained applications on AWS servers, ensuring scalability, security, and high availability',
  'Designed and implemented RESTful APIs using Node.js and Express for IoT communication and enterprise applications',
  'Collaborated with cross-functional teams to deliver responsive UI/UX and reliable end-to-end solutions',
],
  },

];

export function Experience() {
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
      id="experience"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-linear-to-b from-black to-gray-900"
    >
      <div className="max-w-4xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl text-center mb-16 bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
        >
          Experience
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-purple-500 to-pink-500" />

          <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -100 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative pl-16"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="absolute left-3 top-0 w-6 h-6 rounded-full bg-linear-to-br from-purple-500 to-pink-500 border-4 border-black"
                />

                <motion.div
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="bg-linear-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6 hover:border-purple-500/50 transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0"
                    >
                      <Briefcase size={24} />
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="text-2xl text-purple-300 mb-1">{exp.title}</h3>
                      <p className="text-xl text-gray-300 mb-2">{exp.company}</p>
                      
                      <div className="flex flex-wrap gap-4 text-gray-400">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.2 + i * 0.1 }}
                        className="text-gray-400 flex items-start gap-2"
                      >
                        <span className="text-purple-400 mt-1">▹</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
