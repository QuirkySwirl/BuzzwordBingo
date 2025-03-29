import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";

export function Header() {
  const handleDonateClick = () => {
    window.open("https://donate.example.com", "_blank");
  };

  return (
    <header className="relative z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 to-transparent opacity-80"></div>
      
      <div className="relative">
        <motion.div 
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div 
            onClick={() => window.location.href="/"}
            className="flex items-center group cursor-pointer"
          >
            <motion.div
              className="relative"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-70 blur-sm group-hover:opacity-100 transition duration-200"></div>
              <div className="relative bg-gradient-to-br from-indigo-600/30 to-purple-600/30 p-2 rounded-full backdrop-blur-md border border-indigo-500/30">
                <svg className="h-8 w-8 text-indigo-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <defs>
                    <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#818CF8" />
                      <stop offset="100%" stopColor="#C084FC" />
                    </linearGradient>
                  </defs>
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15.5h-2V13h2v5.5zm0-7h-2v-2h2v2zm0-4h-2V5h2v2.5zm6 11.5h-4V13h4v5.5zm0-7h-4v-2h4v2zm0-4h-4V5h4v2.5z" stroke="url(#logo-gradient)" fill="none" />
                </svg>
              </div>
            </motion.div>
            
            <div className="ml-3">
              <motion.h1 
                className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 text-transparent bg-clip-text"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Corporate Buzzword Bingo
              </motion.h1>
              <motion.p 
                className="text-xs text-indigo-300 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Survive your next meeting with style!
              </motion.p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <motion.div
              className="hidden sm:flex gap-6 mr-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span 
                onClick={() => window.location.href = "/about"} 
                className="text-indigo-200 hover:text-white transition-colors hover:underline underline-offset-4 text-sm font-medium cursor-pointer"
              >
                About
              </span>
              <span 
                onClick={() => window.location.href = "/privacy"} 
                className="text-indigo-200 hover:text-white transition-colors hover:underline underline-offset-4 text-sm font-medium cursor-pointer"
              >
                Privacy
              </span>
              <span 
                onClick={() => window.location.href = "/terms"} 
                className="text-indigo-200 hover:text-white transition-colors hover:underline underline-offset-4 text-sm font-medium cursor-pointer"
              >
                Terms
              </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Button 
                className="relative group overflow-hidden"
                size="sm"
                onClick={handleDonateClick}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                <span className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-md blur opacity-30 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></span>
                
                <span className="relative z-10 flex items-center">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Support Us
                </span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Subtle divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
      </div>
      
      {/* Animated particle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -20, 0],
              x: [0, Math.random() * 20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </header>
  );
}
