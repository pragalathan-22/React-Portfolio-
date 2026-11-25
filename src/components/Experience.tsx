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
  'Developed cross-platform mobile applications using React Native for laundry booking, turf booking, and home service platforms, delivering user-friendly and responsive mobile experiences',
  'Built a construction workforce management application to track worker status, assign tasks, and monitor work progress efficiently',
  'Developed and maintained backend services using Node.js and Express.js, implementing RESTful APIs, authentication, and role-based access control',
  'Designed and implemented booking management, service tracking, worker assignment, and real-time status update functionalities',
  'Developed business applications using Zoho Creator, including blood bank management and ration distribution management systems',
  'Implemented application workflows, data management, and process automation to streamline operations across different business domains',
  'Collaborated with designers and stakeholders to understand business requirements and deliver scalable, reliable, and user-friendly applications',
  'Optimized application performance and ensured secure data handling across mobile, backend, and database systems',
],

  },
  {
    title: 'Software Developer',
    company: 'Newtonsky5 Technologies',
    location: 'Mahindra World City, Chennai',
    period: '2025 - Present',
description: [
  'Developed and maintained responsive web applications using React.js and the MERN stack, including enterprise HRM, CRM, and KFC touchscreen self-service ordering applications with billing, order processing, and management features',
  'Designed and developed interactive 3D websites, including a Daimler Truck website, featuring realistic 3D models, animations, and immersive user experiences',
  'Built and maintained touchscreen-based kiosk applications with responsive touch interactions, user-friendly interfaces, automated workflows, and real-time application support for self-service operations',
  'Developed and integrated IoT-based applications connecting web and mobile platforms with hardware devices using Arduino, ESP32, and Node.js for real-time monitoring, automation, and secure access control',
  'Developed IoT-enabled smart door lock and access control systems with real-time device communication, remote operations, and backend integration',
  'Implemented face recognition-based attendance management systems for automated employee identification and attendance tracking',
  'Developed an AI-powered virtual dress try-on kiosk with real-time outfit visualization, enabling customers to preview clothing digitally through an interactive touchscreen interface',
  'Designed and developed backend applications and RESTful APIs using Node.js, Express.js, Python (Django), and PHP, integrating databases, authentication, and third-party services',
  'Worked with MongoDB, MySQL, and other database technologies to design, manage, and integrate application data across different software solutions',
  'Deployed, hosted, and maintained web applications and backend services on AWS and Hostinger, including server configuration, application deployment, domain management, and performance optimization',
  'Built real-time responsive applications integrating frontend interfaces, backend services, and IoT hardware to deliver reliable end-to-end solutions',
  'Collaborated with cross-functional teams to understand business requirements, troubleshoot technical issues, and deliver scalable, secure, and maintainable software solutions'
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
          className="text-3xl sm:text-4xl text-center mb-10 sm:mb-16 bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
        >
          Experience
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-3 sm:left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-purple-500 to-pink-500" />

          <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -100 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative pl-10 sm:pl-16"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="absolute left-0 sm:left-3 top-0 w-6 h-6 rounded-full bg-linear-to-br from-purple-500 to-pink-500 border-4 border-black"
                />

                <motion.div
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="bg-linear-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4 sm:p-6 hover:border-purple-500/50 transition-all"
                >
                  <div className="flex items-start gap-3 sm:gap-4 mb-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0"
                    >
                      <Briefcase size={20} className="sm:hidden" />
                      <Briefcase size={24} className="hidden sm:block" />
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl leading-snug text-purple-300 mb-1">{exp.title}</h3>
                      <p className="text-base sm:text-xl text-gray-300 mb-2">{exp.company}</p>
                      
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
