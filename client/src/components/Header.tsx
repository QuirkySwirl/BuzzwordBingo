import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";
import { ShareModal } from "./ShareModal";

export function Header() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const shareText = "I'm using Corporate Buzzword Bingo to survive meetings! 73% of people do other work during meetings - mine is playing bingo 😂";

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
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="self-end sm:self-auto"
          >
            <Button 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-3 py-2 rounded-lg transition-all"
              onClick={() => setIsShareModalOpen(true)}
              aria-label="Share app"
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 sm:mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 6l-4-4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="hidden sm:inline">share</span> 
              </span>
            </Button>
          </motion.div>
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

      {/* Share Modal */}
      <ShareModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shareText={shareText}
        cardRef={{current: null}} // We're just sharing the app, not a specific card
      />
    </header>
  );
}
