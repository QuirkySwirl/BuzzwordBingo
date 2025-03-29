import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BingoCard } from "./BingoCard";
import { MeetingType } from "@shared/schema";
import confetti from "canvas-confetti";

interface BingoCardContainerProps {
  meetingType: string;
  words: string[];
  markedSquares: boolean[];
  bingoLines: number[][];
  hasBingo: boolean;
  onToggleSquare: (index: number) => void;
  onResetCard: () => void;
  onShareCard: () => void;
}

export function BingoCardContainer({
  meetingType,
  words,
  markedSquares,
  bingoLines,
  hasBingo,
  onToggleSquare,
  onResetCard,
  onShareCard
}: BingoCardContainerProps) {
  const [displayName, setDisplayName] = useState("Meeting");
  const [showVictoryAnimation, setShowVictoryAnimation] = useState(false);

  // Query to fetch meeting type data
  const { data: meetingTypes } = useQuery<MeetingType[]>({
    queryKey: ['/api/meeting-types'],
  });

  // Update display name when meeting type or data changes
  useEffect(() => {
    if (meetingTypes) {
      const currentType = meetingTypes.find(type => type.name === meetingType);
      if (currentType) {
        setDisplayName(currentType.displayName);
      }
    }
  }, [meetingType, meetingTypes]);

  // Show victory animation when bingo is achieved
  useEffect(() => {
    if (hasBingo) {
      setShowVictoryAnimation(true);
      
      // Play celebration sound effect (could add this functionality)
      // const audio = new Audio('/victory.mp3');
      // audio.play();
      
      // Generate victory confetti
      generateConfetti();
    }
  }, [hasBingo]);

  const generateConfetti = () => {
    console.log("Generating confetti celebration!");
    
    // Create intense confetti burst
    const count = 300;
    const defaults = { 
      origin: { y: 0.7 },
      spread: 90,
      startVelocity: 30,
      gravity: 0.5,
      ticks: 300,
      zIndex: 9999,
      disableForReducedMotion: true
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    // Launch multiple bursts for a richer effect
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      origin: { x: 0.2, y: 0.7 },
      colors: ['#5D5FEF', '#8B5CF6', '#EC4899', '#22C55E']
    });
    fire(0.25, {
      spread: 30,
      origin: { x: 0.8, y: 0.7 },
      colors: ['#3B82F6', '#22D3EE', '#10B981', '#6366F1']
    });
    
    // Central burst
    fire(0.3, {
      spread: 120,
      origin: { x: 0.5, y: 0.7 },
      startVelocity: 30,
      decay: 0.95,
      colors: ['#6366F1', '#EC4899', '#22C55E', '#EAB308', '#F97316']
    });

    // Add a delayed secondary burst for continued celebration
    setTimeout(() => {
      fire(0.2, {
        spread: 70,
        decay: 0.92,
        origin: { x: 0.5, y: 0.7 },
        colors: ['#6366F1', '#8B5CF6', '#D946EF', '#EC4899']
      });
    }, 600);
  };

  return (
    <div className="md:w-2/3 lg:w-3/4 relative">
      {/* Background glow effects */}
      <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/5 to-pink-500/20 rounded-3xl blur-xl -z-10"></div>
      
      <motion.div 
        className="glass-card overflow-hidden mb-6 relative"
        animate={hasBingo ? {
          boxShadow: ["0 0 20px 0px rgba(129, 140, 248, 0.3)", "0 0 30px 5px rgba(129, 140, 248, 0.7)", "0 0 20px 0px rgba(129, 140, 248, 0.3)"],
        } : {}}
        transition={{
          duration: 2,
          repeat: hasBingo ? Infinity : 0,
          repeatType: "reverse"
        }}
      >
        <div className="p-6 relative">
          <div className="flex justify-between items-center mb-6">
            <motion.h2 
              className="text-2xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 text-transparent bg-clip-text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Your Bingo Card
            </motion.h2>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="relative inline-block bg-gradient-to-r from-indigo-600/30 to-purple-600/30 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium text-white border border-indigo-400/30 shadow-inner">
                <span className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/50 to-purple-500/50 rounded-full blur opacity-30"></span>
                <span className="relative">{displayName}</span>
              </span>
            </motion.div>
          </div>
          
          <motion.div
            animate={hasBingo ? {
              rotate: [0, 2, 0, -2, 0],
              transition: { 
                duration: 0.5, 
                repeat: 3,
                repeatType: "mirror",
                ease: "easeInOut"
              }
            } : {}}
          >
            <BingoCard
              words={words}
              markedSquares={markedSquares}
              bingoLines={bingoLines}
              onToggleSquare={onToggleSquare}
            />
          </motion.div>
          
          <AnimatePresence>
            {hasBingo && (
              <motion.div
                key="bingo-victory"
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.5 }}
                className="glass rounded-xl p-6 mb-6 text-center relative overflow-hidden"
              >
                {/* Background animated patterns */}
                <div className="absolute inset-0 z-0 opacity-10">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={`celebration-${i}`}
                      className="absolute rounded-full"
                      style={{
                        width: `${Math.random() * 100 + 50}px`,
                        height: `${Math.random() * 100 + 50}px`,
                        left: `${Math.random() * 100}%`, 
                        top: `${Math.random() * 100}%`,
                        background: `radial-gradient(circle, rgba(129, 140, 248, 0.8) 0%, rgba(192, 132, 252, 0) 70%)`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  ))}
                </div>
                
                <motion.div 
                  className="relative z-10"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: [0.9, 1.1, 1] }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <h3 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-emerald-300 via-green-300 to-emerald-400 text-transparent bg-clip-text drop-shadow-md">BINGO!</h3>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <p className="text-indigo-100 mb-4 font-medium">You're officially a corporate jargon master! Share your victory!</p>
                  </motion.div>
                  <Button 
                    className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium shadow-lg shadow-emerald-700/20"
                    onClick={onShareCard}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37061L8.08639 9.32951C7.54905 8.80452 6.80667 8.5 6 8.5C4.34315 8.5 3 9.84315 3 11.5C3 13.1569 4.34315 14.5 6 14.5C6.80667 14.5 7.54905 14.1955 8.08639 13.6705L15.0227 17.6294C15.0077 17.7508 15 17.8745 15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C17.1933 15 16.451 15.3045 15.9136 15.8295L8.97733 11.8706C8.99229 11.7492 9 11.6255 9 11.5C9 11.3745 8.99229 11.2508 8.97733 11.1294L15.9136 7.17049C16.451 7.69548 17.1933 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Share Your Victory
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline"
              onClick={() => {
                onResetCard();
                // Show a refreshing animation
                const button = document.activeElement as HTMLButtonElement;
                if (button) {
                  button.classList.add('animate-spin');
                  setTimeout(() => {
                    button.classList.remove('animate-spin');
                  }, 500);
                }
                // Scroll to the top of the card
                setTimeout(() => {
                  document.querySelector('.glass-card')?.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center'
                  });
                }, 100);
              }}
              className="backdrop-blur-md bg-white/5 border-indigo-300/30 hover:bg-white/10 text-indigo-100 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-0 bg-indigo-500/20 transition-all duration-300 ease-out group-hover:w-full"></span>
              <span className="relative flex items-center">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C7.13 19 4 15.87 4 12C4 8.13 7.13 5 11 5C13.55 5 15.84 6.4 17.2 8.5L15 9L18.88 12.88L19 13L22 8L20.12 8.3L18.56 5.3C16.55 3.3 13.85 2 11 2C6.03 2 2 6.03 2 12Z" fill="currentColor"/>
                </svg>
                Reset & Generate New Card
              </span>
            </Button>
            <Button 
              className="floating-button relative group"
              onClick={onShareCard}
            >
              <span className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></span>
              <span className="relative flex items-center">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37061L8.08639 9.32951C7.54905 8.80452 6.80667 8.5 6 8.5C4.34315 8.5 3 9.84315 3 11.5C3 13.1569 4.34315 14.5 6 14.5C6.80667 14.5 7.54905 14.1955 8.08639 13.6705L15.0227 17.6294C15.0077 17.7508 15 17.8745 15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C17.1933 15 16.451 15.3045 15.9136 15.8295L8.97733 11.8706C8.99229 11.7492 9 11.6255 9 11.5C9 11.3745 8.99229 11.2508 8.97733 11.1294L15.9136 7.17049C16.451 7.69548 17.1933 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Share Card
              </span>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
