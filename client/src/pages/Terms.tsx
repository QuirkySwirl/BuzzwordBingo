import { motion } from "framer-motion";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Terms() {
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
                Terms of Service
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
                    These Terms of Service ("Terms") govern your use of the Corporate Buzzword Bingo application ("the App"). By using the App, you agree to these Terms, so please read them carefully. We tried to make them more engaging than your average corporate meeting!
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-indigo-900/30 p-6 rounded-lg border border-indigo-500/20"
                >
                  <h2 className="text-xl font-medium mb-4 text-indigo-200">1. What You Can Do (User License)</h2>
                  <p className="mb-3">
                    We grant you a personal, non-exclusive, non-transferable license to use the App for your personal entertainment. Go ahead and:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-indigo-200">
                    <li>Create bingo cards for various meeting types</li>
                    <li>Play the game during meetings (we won't tell your boss)</li>
                    <li>Share your completed cards with friends and colleagues</li>
                    <li>Have fun and spot corporate buzzwords in their natural habitat</li>
                  </ul>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-xl font-medium mb-4 text-indigo-200">2. The "Please Don'ts" (Restrictions)</h2>
                  <p className="mb-3">
                    Please don't:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-indigo-200">
                    <li>Use the App for any illegal purposes</li>
                    <li>Attempt to reverse engineer or modify the App</li>
                    <li>Remove any copyright or other proprietary notices</li>
                    <li>Transfer your rights to use the App to anyone else</li>
                    <li>Use the App in a way that disrupts meetings so much that you get fired (we can't be held responsible for excessive giggling)</li>
                  </ul>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-xl font-medium mb-4 text-indigo-200">3. Intellectual Property</h2>
                  <p>
                    The App, including all content, features, and functionality, is owned by us and is protected by intellectual property laws. The buzzwords, however, are generously contributed by corporate cultures worldwide.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h2 className="text-xl font-medium mb-4 text-indigo-200">4. Disclaimer of Warranties</h2>
                  <p className="mb-3">
                    The App is provided "as is" and "as available" without any warranties of any kind. We don't guarantee that:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-indigo-200">
                    <li>You'll win every bingo game</li>
                    <li>The App will make your meetings shorter (we wish we could)</li>
                    <li>The App will always be error-free (though we try our best)</li>
                    <li>The buzzwords will always be up-to-date with the latest corporate lingo (new buzzwords emerge faster than we can track them!)</li>
                  </ul>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h2 className="text-xl font-medium mb-4 text-indigo-200">5. Limitation of Liability</h2>
                  <p>
                    We're not liable for any damages that might occur from your use of the App. This includes, but is not limited to, being caught playing Buzzword Bingo during an important presentation, accidentally shouting "BINGO!" during a silent moment in a meeting, or any productivity lost due to excessive focus on buzzword spotting.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <h2 className="text-xl font-medium mb-4 text-indigo-200">6. Changes to the App and Terms</h2>
                  <p>
                    We may update the App and these Terms from time to time. We'll notify you of any significant changes when you next use the App. Continued use after such changes means you accept the new Terms.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <h2 className="text-xl font-medium mb-4 text-indigo-200">7. Governing Law</h2>
                  <p>
                    These Terms are governed by the laws of the country in which we operate, without regard to its conflict of law principles. Any legal action arising out of these Terms shall be brought exclusively in the courts located in that country.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <h2 className="text-xl font-medium mb-4 text-indigo-200">8. Fun Clause</h2>
                  <p>
                    By using this App, you agree to have fun, not take meetings too seriously, and occasionally share a knowing smile with fellow bingo players in your meetings.
                  </p>
                </motion.div>
                
                <div className="pt-6 border-t border-indigo-800/30 mt-8">
                  <p className="text-indigo-300 italic mb-4">
                    If you have any questions about these Terms, please contact us through the About page. Now, let's get back to making meetings bearable!
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