import { motion } from "framer-motion";
import { Heart, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black border-t border-purple-500/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-2xl mb-4 bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
            >
              Baktha pragalathan
            </motion.h3>
            <p className="text-gray-400">
              Building innovative solutions and crafting exceptional digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg text-purple-300 mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['Home', 'About', 'Projects', 'Contact'].map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  whileHover={{ x: 5, color: '#a855f7' }}
                  className="block text-gray-400 hover:text-purple-400 transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg text-purple-300 mb-4">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get notified about new projects and updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-gray-900/50 border border-purple-500/20 rounded-lg focus:border-purple-500/50 focus:outline-none text-white text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg text-sm"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-500/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-2">
            Made with <Heart size={16} className="text-pink-500 fill-pink-500" /> by Baktha pragalathan
 © {new Date().getFullYear()}
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <motion.a
              href="#"
              whileHover={{ color: '#a855f7' }}
              className="hover:text-purple-400 transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ color: '#a855f7' }}
              className="hover:text-purple-400 transition-colors"
            >
              Terms of Service
            </motion.a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-purple-500/50 transition-shadow"
      >
        <ArrowUp size={24} />
      </motion.button>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
      </div>
    </footer>
  );
}
