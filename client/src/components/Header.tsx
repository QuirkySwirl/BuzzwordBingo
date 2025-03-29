import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Header() {
  const handleDonateClick = () => {
    window.open("https://donate.example.com", "_blank");
  };

  return (
    <header className="glass backdrop-blur-lg border-b border-indigo-500/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="animate-float"
            whileHover={{ rotate: 5 }}
          >
            <svg className="h-10 w-10 text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
              <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818CF8" />
                  <stop offset="100%" stopColor="#C084FC" />
                </linearGradient>
              </defs>
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15.5h-2V13h2v5.5zm0-7h-2v-2h2v2zm0-4h-2V5h2v2.5zm6 11.5h-4V13h4v5.5zm0-7h-4v-2h4v2zm0-4h-4V5h4v2.5z" fill="url(#logo-gradient)" />
            </svg>
          </motion.div>
          <div>
            <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              Corporate Buzzword Bingo
            </h1>
            <p className="ml-3 text-xs text-indigo-300 italic">Survive your next meeting with style!</p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Button 
            className="floating-button relative group"
            size="sm"
            onClick={handleDonateClick}
          >
            <span className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></span>
            <span className="relative flex items-center">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Support Us
            </span>
          </Button>
        </motion.div>
      </div>
      
      {/* Floating particles for decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="particle"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 6 + 4}s linear infinite`
            }}
          />
        ))}
      </div>
    </header>
  );
}
