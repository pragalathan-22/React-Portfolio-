import { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar } from 'lucide-react';

const certificatesData = [
  {
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: 'December 2023',
    credentialId: 'AWS-123456789',
    link: '#',
  },
  {
    title: 'Google Cloud Professional Developer',
    issuer: 'Google Cloud',
    date: 'October 2023',
    credentialId: 'GCP-987654321',
    link: '#',
  },
  {
    title: 'Meta Front-End Developer Professional',
    issuer: 'Meta',
    date: 'August 2023',
    credentialId: 'META-456789123',
    link: '#',
  },
];

export function Certificates() {
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
      id="certificates"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-linear-to-b from-gray-900 to-black"
    >
      <div className="max-w-6xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl text-center mb-16 bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
        >
          Certificates & Achievements
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificatesData.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={isVisible ? { opacity: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
              className="perspective-1000"
            >
              <div className="bg-linear-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6 hover:border-purple-500/50 transition-all h-full relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4"
                  >
                    <Award size={32} />
                  </motion.div>

                  <h3 className="text-xl text-purple-300 mb-2">{cert.title}</h3>
                  <p className="text-gray-400 mb-3">{cert.issuer}</p>

                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Calendar size={14} />
                    <span>{cert.date}</span>
                  </div>

                  <p className="text-sm text-gray-500 mb-4">
                    ID: {cert.credentialId}
                  </p>

                  <motion.a
                    href={cert.link}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg text-sm hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                  >
                    <span>View Certificate</span>
                    <ExternalLink size={14} />
                  </motion.a>
                </div>

                {/* Shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%', rotate: 45 }}
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
