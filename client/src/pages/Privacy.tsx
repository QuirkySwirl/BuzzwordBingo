import { motion } from "framer-motion";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Privacy() {
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
              <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-200 to-purple-200 text-transparent bg-clip-text">
                Privacy Policy
              </h1>
              
              <div className="space-y-6 text-indigo-100">
                <p className="italic text-indigo-300 border-l-4 border-indigo-500/50 pl-4">
                  Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="mb-2 text-xl text-indigo-200 font-medium">Welcome to Corporate Buzzword Bingo!</p>
                  <p>
                    This Privacy Policy describes how we collect, use, and handle your information when you use our Corporate Buzzword Bingo application. We've tried to make it fun to read, but it's still a privacy policy—so bear with us!
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-indigo-900/30 p-6 rounded-lg border border-indigo-500/20"
                >
                  <h2 className="text-xl font-medium mb-4 text-indigo-200">Information We Don't Collect</h2>
                  <p className="mb-3">
                    Corporate Buzzword Bingo is designed with privacy in mind. Unlike many other applications:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-indigo-200">
                    <li>We <span className="font-bold text-purple-300">do not</span> collect personal information</li>
                    <li>We <span className="font-bold text-purple-300">do not</span> require you to create an account</li>
                    <li>We <span className="font-bold text-purple-300">do not</span> track your individual usage patterns</li>
                    <li>We <span className="font-bold text-purple-300">do not</span> sell your data to third parties (we couldn't even if we wanted to, since we don't have it!)</li>
                  </ul>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-xl font-medium mb-4 text-indigo-200">Client-Side Only</h2>
                  <p>
                    The bingo cards you generate and play with are stored locally in your browser's memory during your session. When you close the tab or browser, this information is deleted. We do not maintain a database of your bingo games or wins.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-xl font-medium mb-4 text-indigo-200">Anonymous Analytics</h2>
                  <p>
                    We may collect anonymous, aggregated data for the purpose of improving the application. This includes information like:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 my-3 text-indigo-200">
                    <li>Which meeting types are most popular</li>
                    <li>How many bingo cards are generated</li>
                    <li>How frequently the application is used</li>
                  </ul>
                  <p>
                    This data cannot be traced back to individual users and is only used to help us make Corporate Buzzword Bingo more entertaining.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h2 className="text-xl font-medium mb-4 text-indigo-200">Sharing Features</h2>
                  <p>
                    When you use our sharing features (like sharing a screenshot or text of your bingo card):
                  </p>
                  <ul className="list-disc pl-5 space-y-2 my-3 text-indigo-200">
                    <li>You are initiating the sharing action through your own device</li>
                    <li>The data is shared directly from your device to the platform you choose (Twitter, LinkedIn, etc.)</li>
                    <li>We do not intercept or store any data related to your sharing activities</li>
                    <li>Please be aware that third-party platforms have their own privacy policies</li>
                  </ul>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h2 className="text-xl font-medium mb-4 text-indigo-200">Cookies & Local Storage</h2>
                  <p>
                    We use local storage to save your preferences and current game state while you use the application. This data remains on your device and is not transmitted to our servers.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <h2 className="text-xl font-medium mb-4 text-indigo-200">Changes to This Policy</h2>
                  <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <h2 className="text-xl font-medium mb-4 text-indigo-200">Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us by visiting our About page and using the provided contact information.
                  </p>
                </motion.div>
                
                <div className="pt-6 border-t border-indigo-800/30 mt-8">
                  <p className="text-indigo-300 italic mb-4">
                    Remember: Corporate Buzzword Bingo is meant to be fun! We take privacy seriously, but we take making boring meetings entertaining even more seriously.
                  </p>
                  
                  <Link href="/">
                    <a className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium transition-all transform hover:scale-105">
                      Return to the Game
                    </a>
                  </Link>
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