import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

export function ProfileSummary() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      id="profile"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-linear-to-b from-black to-gray-900"
    >
      <div className="max-w-6xl w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* PROFILE IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <div className="w-72 h-72 rounded-full bg-linear-to-br from-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                  {/* Replace emoji with image if needed */}
                  <span className="text-8xl">👨‍💻</span>
                </div>
              </div>

              <motion.div
                className="absolute -inset-4 rounded-full bg-linear-to-r from-purple-600 to-pink-600 opacity-20 blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* PROFILE INFO */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-5xl font-bold mb-2 bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Baktha Pragalathan
              </h1>
              <p className="text-2xl text-purple-400">
                Software Developer
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2 text-gray-400"
            >
              <MapPin size={20} />
              <span>chengalpattu</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="text-gray-300 leading-relaxed"
            >
              Full-Stack Software Developer with 2+ years of experience in building scalable web applications using Python (Django) and the MERN stack.
Strong expertise in developing RESTful APIs, secure authentication systems, and responsive user interfaces.
Experienced in end-to-end application development, from database design to deployment.
Adept at solving complex problems and translating business requirements into efficient technical solutions.
Passionate about writing clean, maintainable code and continuously learning modern technologies.
            </motion.p>

            {/* SOCIAL LINKS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
              className="flex gap-4"
            >
              {[
                {
                  icon: Github,
                  href: "https://github.com/",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com/",
                  label: "LinkedIn",
                },
                {
                  icon: Mail,
                  href: "mailto:john@example.com",
                  label: "Email",
                },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:shadow-lg hover:shadow-purple-500/50"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>

            {/* RESUME BUTTON */}
            <motion.a
              href="/resume.pdf"
              download
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 bg-linear-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50"
            >
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
