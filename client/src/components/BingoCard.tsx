import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface BingoCardProps {
  words: string[];
  markedSquares: boolean[];
  bingoLines: number[][];
  onToggleSquare: (index: number) => void;
  meetingType?: string; // Optional meeting type for themed cards
}

export function BingoCard({ 
  words, 
  markedSquares, 
  bingoLines, 
  onToggleSquare,
  meetingType = 'all-hands' // Default meeting type
}: BingoCardProps) {
  
  // Theme configurations for different meeting types
  const themeConfig: Record<string, {
    freeSpaceClasses: string, 
    markedClasses: string,
    bingoLineClasses: string,
    normalClasses: string,
    stampColor: string,
    stampText: string,
    icons: string[]
  }> = {
    'all-hands': {
      freeSpaceClasses: "bg-gradient-to-br from-pink-500/40 to-purple-500/40 border-pink-300",
      markedClasses: "border-indigo-300 bg-indigo-600/30",
      bingoLineClasses: "border-green-300 bg-emerald-500/30",
      normalClasses: "border-indigo-300/50 hover:border-indigo-300",
      stampColor: "radial-gradient(circle, rgba(220,38,38,0.8) 0%, rgba(185,28,28,0.9) 100%)",
      stampText: "HEARD",
      icons: ["📊", "🗣️", "💼", "📈"]
    },
    'product': {
      freeSpaceClasses: "bg-gradient-to-br from-blue-500/40 to-cyan-500/40 border-blue-300",
      markedClasses: "border-blue-300 bg-blue-600/30",
      bingoLineClasses: "border-emerald-300 bg-emerald-500/30",
      normalClasses: "border-blue-300/50 hover:border-blue-300",
      stampColor: "radial-gradient(circle, rgba(37,99,235,0.8) 0%, rgba(29,78,216,0.9) 100%)",
      stampText: "NOTED",
      icons: ["💡", "🚀", "🧩", "⚙️"]
    },
    'strategy': {
      freeSpaceClasses: "bg-gradient-to-br from-amber-500/40 to-orange-500/40 border-amber-300",
      markedClasses: "border-amber-300 bg-amber-600/30",
      bingoLineClasses: "border-emerald-300 bg-emerald-500/30",
      normalClasses: "border-amber-300/50 hover:border-amber-300",
      stampColor: "radial-gradient(circle, rgba(245,158,11,0.8) 0%, rgba(217,119,6,0.9) 100%)",
      stampText: "ALIGN",
      icons: ["🎯", "🧠", "🔍", "🧮"]
    },
    'layoff': {
      freeSpaceClasses: "bg-gradient-to-br from-red-500/40 to-pink-500/40 border-red-300",
      markedClasses: "border-red-300 bg-red-600/30",
      bingoLineClasses: "border-violet-300 bg-violet-500/30",
      normalClasses: "border-red-300/50 hover:border-red-300",
      stampColor: "radial-gradient(circle, rgba(220,38,38,0.8) 0%, rgba(185,28,28,0.9) 100%)",
      stampText: "PIVOT",
      icons: ["⚡", "📉", "🧯", "💸"]
    },
    'investor': {
      freeSpaceClasses: "bg-gradient-to-br from-emerald-500/40 to-green-500/40 border-emerald-300",
      markedClasses: "border-emerald-300 bg-emerald-600/30",
      bingoLineClasses: "border-blue-300 bg-blue-500/30",
      normalClasses: "border-emerald-300/50 hover:border-emerald-300",
      stampColor: "radial-gradient(circle, rgba(16,185,129,0.8) 0%, rgba(4,120,87,0.9) 100%)",
      stampText: "FUNDED",
      icons: ["💰", "📊", "💎", "📈"]
    }
  };
  
  // Get theme configuration or default to all-hands
  const theme = themeConfig[meetingType] || themeConfig['all-hands'];
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  const [confetti, setConfetti] = useState<{x: number, y: number, color: string}[]>([]);

  // Create confetti effect when a square is marked
  useEffect(() => {
    if (animatingIndex === null) return;
    
    // Create random confetti pieces
    const newConfetti = Array.from({ length: 15 }, () => ({
      x: Math.random() * 100 - 50, // random offset
      y: Math.random() * 100 - 50, // random offset
      color: ['#818CF8', '#C084FC', '#F472B6', '#34D399', '#FBBF24'][Math.floor(Math.random() * 5)]
    }));
    
    setConfetti(newConfetti);
    
    // Clean up confetti after animation
    const timer = setTimeout(() => {
      setConfetti([]);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [animatingIndex]);

  const handleSquareClick = (index: number) => {
    // Don't allow clicking FREE SPACE (index 12)
    if (index === 12) return;
    
    // Animate the square
    setAnimatingIndex(index);
    
    // After animation completes, reset the animating state
    setTimeout(() => {
      setAnimatingIndex(null);
    }, 300);
    
    onToggleSquare(index);
  };

  const isBingoLine = (index: number) => {
    return bingoLines.some(line => line.includes(index));
  };

  // Generate random rotation for each square for a more playful look
  const getRandomRotation = (index: number) => {
    // Use the index to create a consistent rotation
    const seed = index * 263 % 10; // Pseudorandom but consistent
    return seed - 5; // Range from -5 to +5 degrees
  };

  return (
    <div className="relative">
      {/* Confetti animation */}
      <AnimatePresence>
        {confetti.map((piece, i) => (
          <motion.div
            key={`confetti-${i}-${animatingIndex}`}
            initial={{ 
              opacity: 1,
              scale: 0,
              x: 0, 
              y: 0,
              rotate: 0
            }}
            animate={{ 
              opacity: 0,
              scale: 1,
              x: piece.x, 
              y: piece.y,
              rotate: Math.random() * 360
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '8px',
              height: '8px',
              backgroundColor: piece.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
              zIndex: 10
            }}
          />
        ))}
      </AnimatePresence>

      <div className="grid grid-cols-5 gap-2 md:gap-3 mb-6">
        {words.map((word, index) => {
          const isMarked = markedSquares[index];
          const isFreeSpace = index === 12;
          const isInBingoLine = isBingoLine(index);
          
          return (
            <motion.div
              key={`${index}-${word}`}
              initial={{ opacity: 0, scale: 0.8, rotate: getRandomRotation(index) }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: isInBingoLine ? [getRandomRotation(index), getRandomRotation(index) + 5, getRandomRotation(index)] : getRandomRotation(index)
              }}
              transition={{ 
                delay: index * 0.02, 
                duration: 0.3,
                rotate: {
                  repeat: isInBingoLine ? Infinity : 0,
                  duration: 1.5
                }
              }}
              whileHover={!isMarked && !isFreeSpace ? { scale: 1.05, rotate: 0 } : {}}
              whileTap={!isMarked && !isFreeSpace ? { scale: 0.95 } : {}}
              className={cn(
                "bingo-square relative aspect-square flex items-center justify-center p-2 text-center text-sm md:text-base font-medium",
                "backdrop-blur-sm shadow-lg border",
                isMarked && !isFreeSpace && `glass ${theme.markedClasses} text-white marked`,
                isFreeSpace && `${theme.freeSpaceClasses} text-white font-bold`,
                isInBingoLine && `bingo-card-won font-bold ${theme.bingoLineClasses} text-white`,
                !isMarked && !isFreeSpace && `glass ${theme.normalClasses} text-indigo-100 cursor-pointer`
              )}
              onClick={() => handleSquareClick(index)}
            >
              <div className={cn(
                "absolute inset-0 rounded-lg overflow-hidden",
                isMarked && !isFreeSpace && "bg-indigo-600/30",
                isInBingoLine && "bg-emerald-600/30"
              )}>
                {/* Background decorative elements */}
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={`decoration-${index}-${i}`} 
                    className="absolute rounded-full bg-white/10"
                    style={{
                      width: `${Math.random() * 30 + 10}px`,
                      height: `${Math.random() * 30 + 10}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: 0.1 + Math.random() * 0.2
                    }}
                  />
                ))}
              </div>

              <span className="relative z-10 px-1 text-[10px] xxs:text-xs sm:text-sm md:text-base line-clamp-3 text-center font-medium" style={{ wordBreak: "normal", hyphens: "none" }}>{word}</span>
              
              {isMarked && !isFreeSpace && (
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] z-10"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  {/* Red stamp effect */}
                  <div className="relative w-full h-full">
                    {/* Circular stamp background */}
                    <div className="absolute inset-0 rounded-full bg-red-500/70 flex items-center justify-center" 
                      style={{ 
                        transform: "rotate(-5deg)",
                        boxShadow: "inset 0 0 10px rgba(0,0,0,0.3)",
                        border: "2px solid rgba(255,255,255,0.2)"
                      }}
                    >
                      {/* Inner text shadow for depth */}
                      <div className="absolute inset-0 rounded-full" 
                        style={{ 
                          boxShadow: "inset 0 0 15px rgba(0,0,0,0.4)",
                          background: theme.stampColor
                        }}
                      />
                    </div>
                    
                    {/* Stamp text */}
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                      <span className="text-2xl" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>{theme.stampText}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {isFreeSpace && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center opacity-20 z-5"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {/* Theme-specific icon or shape */}
                  {theme.icons && theme.icons.length > 0 ? (
                    <div className="text-6xl opacity-30">{theme.icons[Math.floor(Math.random() * theme.icons.length)]}</div>
                  ) : (
                    <svg className="w-full h-full text-pink-100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="currentColor" />
                    </svg>
                  )}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
