import { useState } from "react";
import { motion } from "framer-motion";
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

  return (
    <div className="grid grid-cols-5 gap-2 md:gap-3 mb-6">
      {words.map((word, index) => {
        const isMarked = markedSquares[index];
        const isFreeSpace = index === 12;
        const isInBingoLine = isBingoLine(index);
        
        return (
          <motion.div
            key={`${index}-${word}`}
            animate={animatingIndex === index ? {
              scale: [1, 1.2, 1],
              transition: { duration: 0.3 }
            } : {}}
            className={cn(
              "bingo-square relative aspect-square flex items-center justify-center p-2 rounded-md shadow-sm text-center text-sm md:text-base font-medium border border-gray-200",
              isMarked && "bg-accent/15",
              isFreeSpace && "bg-success/15",
              isInBingoLine && "bg-success/30",
              !isMarked && !isFreeSpace && "bg-background hover:bg-accent/5 cursor-pointer"
            )}
            onClick={() => handleSquareClick(index)}
          >
            {word}
            
            {isMarked && !isFreeSpace && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] opacity-80 z-10">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="#4299E1" 
                  className="w-full h-full"
                >
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
