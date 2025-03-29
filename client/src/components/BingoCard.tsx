import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface BingoCardProps {
  words: string[];
  markedSquares: boolean[];
  bingoLines: number[][];
  onToggleSquare: (index: number) => void;
}

export function BingoCard({ 
  words, 
  markedSquares, 
  bingoLines, 
  onToggleSquare 
}: BingoCardProps) {
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
                isMarked && !isFreeSpace && "glass border-indigo-300 text-white marked",
                isFreeSpace && "bg-gradient-to-br from-pink-500/40 to-purple-500/40 border-pink-300 text-white font-bold",
                isInBingoLine && "bingo-card-won font-bold border-green-300 bg-emerald-500/30 text-white",
                !isMarked && !isFreeSpace && "glass border-indigo-300/50 text-indigo-100 hover:border-indigo-300 cursor-pointer"
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

              <span className="relative z-10 px-1 text-[10px] xxs:text-xs sm:text-sm md:text-base line-clamp-2 break-words hyphens-auto">{word}</span>
              
              {isMarked && !isFreeSpace && (
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] z-10"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    className="w-full h-full drop-shadow-md"
                    style={{ filter: "drop-shadow(0 0 8px rgba(129, 140, 248, 0.5))" }}
                  >
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="url(#check-gradient)"/>
                    <defs>
                      <linearGradient id="check-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#818CF8" />
                        <stop offset="100%" stopColor="#34D399" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              )}

              {isFreeSpace && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center opacity-20 z-5"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <svg className="w-full h-full text-pink-100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="currentColor" />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
