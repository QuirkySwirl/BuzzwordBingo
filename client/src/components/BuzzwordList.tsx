import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface BuzzwordListProps {
  meetingType: string;
}

export function BuzzwordList({ meetingType }: BuzzwordListProps) {
  // Fetch buzzwords for the selected meeting type
  const { data: buzzwords, isLoading } = useQuery<string[]>({
    queryKey: [`/api/buzzwords/${meetingType}`],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Display a subset of the buzzwords (first 12)
  const displayBuzzwords = buzzwords?.slice(0, 12) || [];

  // Function to get random gradient for each buzzword
  const getRandomGradient = (index: number) => {
    const gradients = [
      'from-indigo-600/20 to-purple-600/20',
      'from-purple-600/20 to-pink-600/20',
      'from-indigo-600/20 to-emerald-600/20',
      'from-purple-600/20 to-amber-600/20',
      'from-emerald-600/20 to-cyan-600/20',
      'from-pink-600/20 to-rose-600/20',
    ];
    
    return gradients[index % gradients.length];
  };

  return (
    <motion.div 
      className="glass-card overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="p-6 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          {[...Array(3)].map((_, i) => (
            <motion.div 
              key={`buzzword-bg-${i}`}
              className="absolute rounded-full bg-gradient-to-br from-indigo-600/5 to-purple-600/5"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.5
              }}
              animate={{
                x: [0, 10, 0, -10, 0],
                y: [0, 15, 0, -15, 0],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      
        <div className="flex justify-between items-center mb-6">
          <motion.h2
            className="text-xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 text-transparent bg-clip-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Popular Buzzwords
          </motion.h2>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="relative inline-block bg-indigo-500/10 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium text-indigo-200 border border-indigo-400/30">
              {meetingType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Meeting
            </span>
          </motion.div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array(12).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {displayBuzzwords.map((word, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.2)'
                }}
                className={`glass relative backdrop-blur-sm rounded-lg border border-indigo-300/20 shadow-sm px-3 py-2.5 text-indigo-100 text-sm font-medium overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${getRandomGradient(index)} opacity-50 -z-10`} />
                <div className="relative z-10">{word}</div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Tip section */}
        <motion.div 
          className="mt-6 glass backdrop-blur-md rounded-lg p-4 border border-indigo-300/20 text-indigo-200 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-start">
            <svg className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <span className="font-medium">Pro Tip:</span> Listen for these common buzzwords in your meeting to increase your chances of winning. The more specific buzzwords for your meeting type will be on your bingo card!
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
