import { Link } from "wouter";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="mt-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/60 to-transparent"></div>
        
        {/* Particle effects */}
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-600/10 to-purple-600/20"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(80px)", transform: "translate(30%, 40%)" }}
        />
        <motion.div 
          className="absolute top-0 left-0 w-60 h-60 rounded-full bg-gradient-to-r from-purple-600/10 to-pink-600/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ filter: "blur(60px)", transform: "translate(-30%, -30%)" }}
        />
      </div>
      
      {/* Subtle divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
      
      {/* Footer content */}
      <div className="relative py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              className="mb-6 md:mb-0 text-center md:text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/">
                <a>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 text-transparent bg-clip-text">
                    Corporate Buzzword Bingo
                  </h3>
                </a>
              </Link>
              <p className="text-indigo-200 text-sm mt-1">
                Making meetings bearable since the age of AI
              </p>
              <div className="mt-4 flex items-center justify-center md:justify-start space-x-4">
                <motion.a 
                  href="https://twitter.com/example" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="w-8 h-8 rounded-full bg-indigo-800/30 flex items-center justify-center text-indigo-300 hover:text-white hover:bg-indigo-700/50 transition-colors border border-indigo-500/30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </motion.a>
                <motion.a 
                  href="https://github.com/example" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="w-8 h-8 rounded-full bg-indigo-800/30 flex items-center justify-center text-indigo-300 hover:text-white hover:bg-indigo-700/50 transition-colors border border-indigo-500/30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </motion.a>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h4 className="text-sm font-medium text-indigo-100 mb-2">Site</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/">
                      <a className="text-indigo-300 hover:text-white transition-colors text-sm">Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">
                      <a className="text-indigo-300 hover:text-white transition-colors text-sm">About</a>
                    </Link>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h4 className="text-sm font-medium text-indigo-100 mb-2">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/privacy">
                      <a className="text-indigo-300 hover:text-white transition-colors text-sm">Privacy</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms">
                      <a className="text-indigo-300 hover:text-white transition-colors text-sm">Terms</a>
                    </Link>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                className="space-y-2 col-span-2 md:col-span-1 mt-4 md:mt-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h4 className="text-sm font-medium text-indigo-100 mb-2">Meet Stats</h4>
                <p className="text-indigo-300 text-xs leading-relaxed">
                  There are 11 million meetings per day in the US alone.
                  That's a lot of buzzwords you can bingo with!
                </p>
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            className="mt-10 pt-6 text-center text-xs text-indigo-300 border-t border-indigo-800/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p>&copy; {new Date().getFullYear()} Corporate Buzzword Bingo | An open-source project</p>
            <p className="mt-1 text-indigo-400/60 text-[10px]">No meetings were harmed in the making of this app.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
