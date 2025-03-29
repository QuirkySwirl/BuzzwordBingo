import { motion } from "framer-motion";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function About() {
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
        <motion.div 
          className="absolute bottom-0 right-0 w-full h-full opacity-50"
          animate={{
            background: [
              'radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.15) 0%, rgba(0, 0, 0, 0) 50%)',
              'radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.1) 0%, rgba(0, 0, 0, 0) 50%)',
              'radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.15) 0%, rgba(0, 0, 0, 0) 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <Header />
      
      <main className="flex-grow">
        <motion.div 
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass-card p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-indigo-900/80 opacity-80" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
            
            <div className="relative z-10 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-200 to-purple-200 text-transparent bg-clip-text flex items-center gap-3">
                About Corporate Buzzword Bingo
                <motion.div 
                  className="w-8 h-8 rounded-full bg-indigo-500/30"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </h1>
              
              <div className="space-y-6 text-indigo-100">
                <p className="text-lg">
                  <span className="text-xl font-semibold bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">
                    Making meetings bearable since the age of AI
                  </span>
                </p>
                
                <p>
                  Corporate Buzzword Bingo was born out of the countless hours we've all spent in meetings where certain phrases and buzzwords are repeated so often they begin to lose all meaning.
                </p>
                
                <div className="my-6 rounded-lg overflow-hidden shadow-lg border border-indigo-500/30">
                  <img 
                    src="/assets/images/app-screenshot.png" 
                    alt="Corporate Buzzword Bingo application interface showing a bingo card with buzzwords" 
                    className="w-full"
                  />
                  <div className="p-3 bg-indigo-900/50 text-indigo-200 text-sm italic text-center">
                    The application interface with buzzword-filled bingo card
                  </div>
                </div>
                
                <p>
                  We set out to create a fun, satirical game that brings a bit of joy to those long meetings filled with "synergy," "circle back," and "deep dives." Our mission is simple: to help you stay engaged while subtly poking fun at corporate speak.
                </p>
                
                <motion.div
                  className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-6 rounded-lg border border-indigo-500/20 my-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold mb-4 text-indigo-200">Our Philosophy</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs mr-3 mt-0.5">
                        1
                      </div>
                      <p>Work meetings shouldn't be boring - they should be <span className="italic">secretly entertaining</span>.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs mr-3 mt-0.5">
                        2
                      </div>
                      <p>Corporate jargon deserves to be celebrated for its absurdity.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs mr-3 mt-0.5">
                        3
                      </div>
                      <p>Great design and humor can make even the most mundane activities fun.</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-6 rounded-lg border border-indigo-500/20 my-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold mb-4 text-indigo-200">App Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white mr-3 mt-0.5">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p>7 meeting types with unique buzzword sets</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white mr-3 mt-0.5">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p>Generate up to 20 unique bingo cards at once</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white mr-3 mt-0.5">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p>Animated bingo detection with multiple patterns</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white mr-3 mt-0.5">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p>Social media sharing and image download</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white mr-3 mt-0.5">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p>Visual bingo progress tracking</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white mr-3 mt-0.5">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p>Global meeting statistics ticker banner</p>
                    </div>
                  </div>
                </motion.div>
                
                <p>
                  Corporate Buzzword Bingo was created with the help of AI in 2023, proving that even artificial intelligence can appreciate the humor in our corporate communication quirks. The app uses real meeting statistics and a carefully curated collection of the most commonly overused corporate phrases.
                </p>
                
                <p>
                  We've designed this app to be mobile-responsive, allowing you to discreetly play during virtual meetings or in-person gatherings. Just remember - don't get caught!
                </p>
                
                <div className="pt-6 border-t border-indigo-800/30 mt-8">
                  <h2 className="text-xl font-semibold mb-4 text-indigo-200">Ready to play?</h2>
                  <button
                    onClick={() => window.location.href = "/"}
                    className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium transition-all transform hover:scale-105"
                  >
                    Return to the Game
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}