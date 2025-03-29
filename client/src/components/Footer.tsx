import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative z-10 mt-auto pt-4">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/60 to-transparent"></div>
        <motion.div 
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-600/10 to-purple-600/10"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(60px)" }}
        />
      </div>
      
      {/* Divider with glow */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
      
      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 order-2 md:order-1">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20 flex items-center justify-center border border-indigo-500/20">
              <svg className="h-3 w-3 text-indigo-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15.5h-2V13h2v5.5zm0-7h-2v-2h2v2zm0-4h-2V5h2v2.5zm6 11.5h-4V13h4v5.5zm0-7h-4v-2h4v2zm0-4h-4V5h4v2.5z" />
              </svg>
            </div>
            <p className="text-indigo-300 text-sm">Making meetings bearable since the age of AI</p>
          </div>
          
          <div className="flex items-center gap-6 order-1 md:order-2">
            <button
              onClick={() => window.location.href = "/about"}
              className="text-indigo-300 hover:text-white text-sm transition flex items-center"
            >
              About
            </button>
            <button
              onClick={() => window.location.href = "/privacy"}
              className="text-indigo-300 hover:text-white text-sm transition flex items-center"
            >
              Privacy
            </button>
            <button
              onClick={() => window.location.href = "/terms"}
              className="text-indigo-300 hover:text-white text-sm transition flex items-center"
            >
              Terms
            </button>
          </div>
        </div>
        
        <div className="mt-6 pt-4 text-center text-xs text-indigo-400/60 border-t border-indigo-800/30">
          <p>&copy; {new Date().getFullYear()} Corporate Buzzword Bingo | No meetings were harmed in the making of this app</p>
        </div>
      </div>
    </footer>
  );
}
