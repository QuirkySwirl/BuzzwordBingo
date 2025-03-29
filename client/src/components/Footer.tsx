import { Link } from "wouter";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="glass-card bg-indigo-900/30 text-white py-6 mt-12 border-t border-indigo-500/20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div 
          className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-gradient-to-r from-indigo-600/10 to-purple-600/20"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(40px)", transform: "translate(20%, 40%)" }}
        />
        <motion.div 
          className="absolute top-0 left-0 w-20 h-20 rounded-full bg-gradient-to-r from-purple-600/10 to-pink-600/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ filter: "blur(30px)", transform: "translate(-30%, -30%)" }}
        />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">Corporate Buzzword Bingo</h3>
            <p className="text-indigo-200 text-sm">
              Making meetings bearable since the age of AI
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="/about">
              <span className="text-indigo-200 hover:text-white transition-colors cursor-pointer text-sm">About</span>
            </Link>
            <Link href="/privacy">
              <span className="text-indigo-200 hover:text-white transition-colors cursor-pointer text-sm">Privacy</span>
            </Link>
            <Link href="/terms">
              <span className="text-indigo-200 hover:text-white transition-colors cursor-pointer text-sm">Terms</span>
            </Link>
          </div>
        </div>
        
        <div className="mt-6 border-t border-indigo-800/30 pt-6 text-center text-xs text-indigo-300">
          <p>&copy; {new Date().getFullYear()} Corporate Buzzword Bingo | Vibe coded with AI for a common cause</p>
          <p className="mt-1 text-indigo-400/60 text-[10px]">No meetings were harmed in the making of this app.</p>
        </div>
      </div>
    </footer>
  );
}
