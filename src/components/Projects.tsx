import { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import { ExternalLink, Github } from 'lucide-react';



const projectsData = [
  {
    title: "Pixlspace.in - Printing Kiosk",
    description:
      "Developed a self-service printing kiosk application with an interactive touchscreen interface, allowing users to upload documents, select printing options, preview files, and complete printing operations through an automated workflow.",
    technologies: ["React.js", "Node.js", "Touchscreen Kiosk", "Printing Automation"],
    image: "P",
    github: "https://github.com/pragalathan-22",
    demo: "https://pixlspace.in",
  },
  {
    title: "Daimler 3D Interactive Truck Website",
    description:
      "Developed an immersive 3D truck visualization website featuring interactive 3D truck rotation, clickable vehicle components, highlighted truck parts, and detailed feature information for each selected component.",
    technologies: ["React.js", "Three.js", "JavaScript", "GSAP", "3D Visualization", "WebGL"],
    image: "D",
    github: "https://github.com/pragalathan-22",
    demo: "#contact",
  },
  {
    title: "KFC Touchscreen Billing & Ordering Kiosk",
    description:
      "Developed a self-service restaurant ordering and billing kiosk with an interactive touchscreen interface, enabling customers to browse food menus, customize orders, manage cart items, and complete the ordering process.",
    technologies: ["React.js", "Node.js", "Touchscreen UI", "Billing System", "REST API"],
    image: "K",
    github: "https://github.com/pragalathan-22",
    demo: "#contact",
  },
  {
    title: "IoT Smart Mobile Charging Station",
    description:
      "Developed an IoT-enabled mobile charging station with password-protected solenoid door locks. Integrated Arduino, ESP32, relay modules, and backend services for real-time device control, session tracking, and access management.",
    technologies: ["Arduino", "ESP32", "Node.js", "Django REST API", "React Native", "IoT"],
    image: "I",
    github: "https://github.com/pragalathan-22",
    demo: "#contact",
  },
  {
    title: "VSignature - E-Commerce Platform",
    description:
      "Developed an e-commerce website providing an online shopping experience with product presentation, business information, and a user-friendly interface.",
    technologies: ["PHP", "Web Development", "E-Commerce", "Responsive Design"],
    image: "V",
    github: "https://github.com/pragalathan-22",
    demo: "https://vsignature.in/",
  },
  {
    title: "Taskro - Task Management Solution",
    description:
      "Developed a task management website designed to organize tasks, manage activities, and provide a structured digital workflow for productivity and task tracking.",
    technologies: ["PHP", "Task Management", "Web Development", "Responsive Design"],
    image: "T",
    github: "https://github.com/pragalathan-22",
    demo: "http://taskro.co.in/",
  },
  {
    title: "One Way Cab - Cab Booking Platform",
    description:
      "Developed a one-way cab booking website that provides an online platform for customers to explore cab services and access travel booking information.",
    technologies: ["PHP", "Cab Booking", "Web Development", "Responsive Design"],
    image: "C",
    github: "https://github.com/pragalathan-22",
    demo: "https://onewaycab.taxi/",
  },
  {
    title: "Urbanrise Madhavaram - Real Estate Website",
    description:
      "Developed a real estate project website to showcase property information, project details, and promotional content through a professional online interface.",
    technologies: ["PHP", "Real Estate", "Web Development", "Responsive Design"],
    image: "U",
    github: "https://github.com/pragalathan-22",
    demo: "https://urbanrisemadhavaram.site/",
  },
  {
    title: "MessageBox - Messaging Solution",
    description:
      "Developed a messaging solution website providing a digital interface for communication-related services and messaging functionality.",
    technologies: ["PHP", "Messaging System", "Web Development", "Responsive Design"],
    image: "M",
    github: "https://github.com/pragalathan-22",
    demo: "http://messagebox.in/parrypare.php",
  },
  {
    title: "Anjok Technologies - Company Website",
    description:
      "Designed and developed a professional, responsive company website showcasing business services, company information, projects, and digital solutions with a modern user interface.",
    technologies: ["React.js", "JavaScript", "Responsive Design", "Web Development"],
    image: "A",
    github: "https://github.com/pragalathan-22",
    demo: "https://anjoktechnologies.in",
  },
  {
    title: "Trinity Global Destination - Education & Travel Website",
    description:
      "Developed a global education and travel services website to showcase international education opportunities, travel-related services, and business information.",
    technologies: ["PHP", "Education Website", "Travel Services", "Responsive Design"],
    image: "G",
    github: "https://github.com/pragalathan-22",
    demo: "https://trinityglobaldestination.com/",
  },
  {
    title: "Texura Vaults - Textile & Business Website",
    description:
      "Developed a professional textile and business website to showcase company information, textile-related services, and business offerings through a responsive online platform.",
    technologies: ["PHP", "Business Website", "Textile Industry", "Responsive Design"],
    image: "X",
    github: "https://github.com/pragalathan-22",
    demo: "https://texuravaults.com/",
  },
  {
    title: "Kiosk Standee Advertisement",
    description:
      "Developed a digital advertising solution for touchscreen kiosk standees, featuring promotional content, interactive displays, and engaging visual experiences for customer-facing environments.",
    technologies: ["React.js", "Digital Signage", "Touchscreen Kiosk", "UI/UX"],
    image: "S",
    github: "https://github.com/pragalathan-22",
    demo: "#contact",
  },
  {
    title: "Face Recognition Attendance System",
    description:
      "Developed a face recognition-based attendance management system to automatically identify individuals, record attendance, and maintain attendance history with date and time tracking.",
    technologies: ["Python", "Face Recognition", "Django", "REST API", "Database"],
    image: "F",
    github: "https://github.com/pragalathan-22",
    demo: "#contact",
  },
  {
    title: "School Management & WhatsApp Bulk Messaging",
    description:
      "Developed a school management solution with student information management and WhatsApp integration for sending bulk messages, announcements, notifications, and important school updates.",
    technologies: ["React.js", "Node.js", "MongoDB", "WhatsApp API", "REST API"],
    image: "E",
    github: "https://github.com/pragalathan-22",
    demo: "#contact",
  },
  {
    title: "Ration Distribution Management Application",
    description:
      "Developed a digital ration management application to manage beneficiary information, ration distribution records, inventory details, and distribution tracking.",
    technologies: ["React Native", "Zoho Creator", "Database", "Workflow Automation"],
    image: "R",
    github: "https://github.com/pragalathan-22",
    demo: "#contact",
  },
  {
    title: "Recipe Management Application",
    description:
      "Developed a recipe application that allows users to explore recipes, browse food categories, view ingredients, and follow step-by-step cooking instructions.",
    technologies: ["React Native", "Node.js", "REST API", "MongoDB"],
    image: "C",
    github: "https://github.com/pragalathan-22",
    demo: "#contact",
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
          className="text-3xl sm:text-4xl text-center mb-10 sm:mb-16 bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
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
                className="w-[min(20rem,calc(100vw-3rem))] sm:w-96 shrink-0"
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
