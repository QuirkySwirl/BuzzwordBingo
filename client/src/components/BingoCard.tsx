import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

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
      freeSpaceClasses: "bg-gradient-to-br from-pink-900 to-purple-900 border-pink-300 text-white",
      markedClasses: "border-indigo-300 bg-indigo-900 text-white",
      bingoLineClasses: "border-green-300 bg-emerald-900 text-white",
      normalClasses: "border-indigo-300/50 hover:border-indigo-300 bg-slate-900 text-white",
      stampColor: "radial-gradient(circle, rgba(220,38,38,0.8) 0%, rgba(185,28,28,0.9) 100%)",
      stampText: "HEARD",
      icons: ["📊", "🗣️", "💼", "📈"]
    },
    'product': {
      freeSpaceClasses: "bg-gradient-to-br from-blue-900 to-indigo-900 border-blue-300 text-white",
      markedClasses: "border-blue-300 bg-blue-900 text-white",
      bingoLineClasses: "border-emerald-300 bg-emerald-900 text-white",
      normalClasses: "border-blue-300/50 hover:border-blue-300 bg-slate-900 text-white",
      stampColor: "radial-gradient(circle, rgba(37,99,235,0.8) 0%, rgba(29,78,216,0.9) 100%)",
      stampText: "NOTED",
      icons: ["💡", "🚀", "🧩", "⚙️"]
    },
    'strategy': {
      freeSpaceClasses: "bg-gradient-to-br from-amber-900 to-yellow-900 border-amber-300 text-white",
      markedClasses: "border-amber-300 bg-amber-900 text-white",
      bingoLineClasses: "border-emerald-300 bg-emerald-900 text-white",
      normalClasses: "border-amber-300/50 hover:border-amber-300 bg-slate-900 text-white",
      stampColor: "radial-gradient(circle, rgba(245,158,11,0.8) 0%, rgba(217,119,6,0.9) 100%)",
      stampText: "ALIGN",
      icons: ["🎯", "🧠", "🔍", "🧮"]
    },
    'layoff': {
      freeSpaceClasses: "bg-gradient-to-br from-red-900 to-pink-900 border-red-300 text-white",
      markedClasses: "border-red-300 bg-red-900 text-white",
      bingoLineClasses: "border-violet-300 bg-violet-900 text-white",
      normalClasses: "border-red-300/50 hover:border-red-300 bg-slate-900 text-white",
      stampColor: "radial-gradient(circle, rgba(220,38,38,0.8) 0%, rgba(185,28,28,0.9) 100%)",
      stampText: "PIVOT",
      icons: ["⚡", "📉", "🧯", "💸"]
    },
    'investor': {
      freeSpaceClasses: "bg-gradient-to-br from-emerald-900 to-green-900 border-emerald-300 text-white",
      markedClasses: "border-emerald-300 bg-emerald-900 text-white",
      bingoLineClasses: "border-blue-300 bg-blue-900 text-white",
      normalClasses: "border-emerald-300/50 hover:border-emerald-300 bg-slate-900 text-white",
      stampColor: "radial-gradient(circle, rgba(16,185,129,0.8) 0%, rgba(4,120,87,0.9) 100%)",
      stampText: "FUNDED",
      icons: ["💰", "📊", "💎", "📈"]
    }
  };
  
  // Get theme configuration or default to all-hands
  const theme = themeConfig[meetingType] || themeConfig['all-hands'];
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  const [confetti, setConfetti] = useState<{x: number, y: number, color: string}[]>([]);

  // Create confetti effect when a square is marked - optimized to prevent flickering
  useEffect(() => {
    if (animatingIndex === null) return;
    
    // Create fewer confetti pieces to prevent performance issues
    const newConfetti = Array.from({ length: 10 }, () => ({
      x: Math.random() * 80 - 40, // Smaller range to keep particles more contained
      y: Math.random() * 80 - 40, // Smaller range
      color: ['#818CF8', '#C084FC', '#F472B6', '#34D399', '#FBBF24'][Math.floor(Math.random() * 5)]
    }));
    
    setConfetti(newConfetti);
    
    // Clean up confetti faster
    const timer = setTimeout(() => {
      setConfetti([]);
    }, 1000); // Reduced from 2000ms
    
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

  // Remove random rotation for a cleaner, more uniform look
  const getRandomRotation = (index: number) => {
    // Always return 0 for a clean, aligned grid
    return 0;
  };

  return (
    <div className="relative">
      {/* Confetti animation - optimized for performance */}
      <AnimatePresence mode="wait">
        {confetti.length > 0 && (
          <div className="confetti-container">
            {confetti.map((piece, i) => (
              <motion.div
                key={`confetti-${i}-${animatingIndex || 0}`}
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
                transition={{ 
                  duration: 0.8, // Faster animation
                  ease: "easeOut" // Smoother easing function
                }}
                style={{ 
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '6px', // Smaller particles
                  height: '6px',
                  backgroundColor: piece.color,
                  borderRadius: Math.random() > 0.5 ? '50%' : '2px', // More efficient rendering
                  zIndex: 5, // Lower z-index to prevent layering issues
                  willChange: 'transform, opacity' // Performance optimization
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-5 gap-0.5 xs:gap-1 sm:gap-2 md:gap-3 mb-6">
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
                // No rotation for cleaner look
                rotate: 0
              }}
              transition={{ 
                delay: index * 0.01, // Reduced delay
                duration: 0.2, // Faster initial animation
                rotate: {
                  repeat: isInBingoLine ? 3 : 0, // Limited repeats instead of infinite
                  duration: 2.5, // Slower rotation for less CPU usage
                  ease: "easeInOut" // Smoother animation
                }
              }}
              // Simpler hover effects
              whileHover={!isMarked && !isFreeSpace ? { scale: 1.03 } : {}}
              whileTap={!isMarked && !isFreeSpace ? { scale: 0.95 } : {}}
              className={cn(
                "bingo-square relative aspect-square flex items-center justify-center p-1 xs:p-1.5 sm:p-2 text-center text-sm md:text-base font-medium",
                "backdrop-blur-sm shadow-md border text-slate-50", /* Force light text */
                isMarked && !isFreeSpace && `glass ${theme.markedClasses} text-slate-50 marked`,
                isFreeSpace && `${theme.freeSpaceClasses} text-slate-50 font-bold`,
                isInBingoLine && `bingo-card-won font-bold ${theme.bingoLineClasses} text-slate-50`,
                !isMarked && !isFreeSpace && `glass ${theme.normalClasses} text-slate-50 cursor-pointer`
              )}
              onClick={() => handleSquareClick(index)}
            >
              <div className={cn(
                "absolute inset-0 rounded-lg overflow-hidden",
                isMarked && !isFreeSpace && "bg-indigo-600/30",
                isInBingoLine && "bg-emerald-600/30"
              )}>
                {/* Simplified background decorative elements */}
                {[...Array(1)].map((_, i) => (
                  <div 
                    key={`decoration-${index}-${i}`} 
                    className="absolute rounded-full bg-white/10"
                    style={{
                      width: '20px',
                      height: '20px',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      opacity: 0.1
                    }}
                  />
                ))}
              </div>

              <span className="relative z-10 px-0.5 xs:px-1 text-[9px] xxs:text-[10px] xs:text-xs sm:text-sm md:text-base line-clamp-2 text-center font-medium text-slate-50" style={{ wordBreak: "normal", hyphens: "manual", color: "#f8fafc" }}>{word}</span>
              
              {isMarked && !isFreeSpace && (
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] sm:w-[80%] sm:h-[80%] z-10"
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
                      <span className="text-lg xs:text-xl sm:text-2xl" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>{theme.stampText}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {isFreeSpace && (
                <div 
                  className="absolute inset-0 flex items-center justify-center opacity-20 z-5 free-space-icon"
                >
                  {/* Theme-specific icon or shape - static to prevent flickering */}
                  {theme.icons && theme.icons.length > 0 ? (
                    <div className="text-6xl opacity-30">{theme.icons[Math.floor((index * 263) % theme.icons.length)]}</div>
                  ) : (
                    <svg className="w-full h-full text-pink-100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="currentColor" />
                    </svg>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
