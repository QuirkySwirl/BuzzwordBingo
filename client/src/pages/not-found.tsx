import { motion } from "framer-motion";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="font-sans text-textColor min-h-screen flex flex-col relative overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full opacity-50"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, rgba(0, 0, 0, 0) 50%)',
              'radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.1) 0%, rgba(0, 0, 0, 0) 50%)',
              'radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, rgba(0, 0, 0, 0) 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <Header />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-lg w-full mx-auto px-4">
          <motion.div
            className="glass-card relative overflow-hidden p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-indigo-900/80 opacity-80" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
            
            <div className="relative z-10 text-white">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-indigo-900/50 flex items-center justify-center border border-indigo-500/30">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-purple-300"
                >
                  404
                </motion.div>
              </div>
              
              <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200">
                Page Not Found
              </h1>
              
              <motion.p 
                className="text-indigo-200 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Oops! Looks like you wandered into a meeting that doesn't exist. Let's get you back to where the buzzwords are flowing freely.
              </motion.p>
              
              <Button 
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-6"
              >
                Return to Bingo Game
              </Button>
              
              <motion.div 
                className="mt-6 text-indigo-300 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                "I'll circle back on this page later." - Corporate Promise
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
