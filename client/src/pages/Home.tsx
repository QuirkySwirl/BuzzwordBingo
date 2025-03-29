import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ControlPanel } from "@/components/ControlPanel";
import { BingoCardContainer } from "@/components/BingoCardContainer";
import { BuzzwordList } from "@/components/BuzzwordList";
import { ShareModal } from "@/components/ShareModal";
import { useBingoCard } from "@/hooks/useBingoCard";
import { generateShareText } from "@/lib/bingo-utils";

// Define type for meeting statistics
interface MeetingStat {
  id: number;
  text: string;
}

export default function Home() {
  const {
    meetingType,
    words,
    markedSquares,
    bingoLines,
    hasBingo,
    squaresMarkedCount,
    bingoProgress,
    isGenerating,
    generateCard,
    toggleSquare,
    resetCard,
    getMarkedWords,
    cardSet,
    activeCardIndex,
    switchToCard
  } = useBingoCard();
  
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; speed: number; color: string }>>([]);
  
  // Fetch meeting statistics for ticker
  const { data: meetingStats } = useQuery<MeetingStat[]>({
    queryKey: ['/api/meeting-stats'],
  });
  
  // Track current banner stat
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  
  // Rotate through stats
  useEffect(() => {
    if (!meetingStats?.length) return;
    
    const interval = setInterval(() => {
      setCurrentStatIndex((prevIndex) => 
        prevIndex === meetingStats.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);
    
    return () => clearInterval(interval);
  }, [meetingStats]);
  
  // Generate share text
  const shareText = generateShareText(
    meetingType, 
    hasBingo, 
    getMarkedWords()
  );
  
  // Generate background particles
  useEffect(() => {
    const newParticles = Array.from({ length: 40 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 3,
      speed: Math.random() * 2 + 0.5,
      color: [
        "rgba(129, 140, 248, 0.3)", // indigo
        "rgba(192, 132, 252, 0.3)", // purple
        "rgba(244, 114, 182, 0.2)", // pink
        "rgba(52, 211, 153, 0.2)",  // emerald
        "rgba(251, 191, 36, 0.2)"   // amber
      ][Math.floor(Math.random() * 5)]
    }));
    
    setParticles(newParticles);
  }, []);
  
  const handleShareCard = () => {
    setIsShareModalOpen(true);
  };
  
  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
  };
  
  // Modified function to handle multi-card generation
  const handleGenerateCards = (meetingType: string, numCards: number = 5) => {
    generateCard(meetingType, numCards);
  };

  return (
    <div className="font-sans text-textColor min-h-screen flex flex-col relative overflow-hidden">
      {/* Background particles */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {particles.map((particle, i) => (
          <motion.div
            key={`bg-particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              top: `${particle.y}%`,
              left: `${particle.x}%`,
              filter: "blur(1px)"
            }}
            animate={{
              y: [`${particle.y}%`, `${(particle.y + particle.speed * 10) % 100}%`],
              x: [`${particle.x}%`, `${(particle.x + (Math.random() > 0.5 ? 1 : -1) * particle.speed * 5) % 100}%`],
            }}
            transition={{
              duration: 10 / particle.speed,
              repeat: Infinity,
              ease: "linear",
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
      
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow relative">
        {/* Stats Ticker */}
        <motion.div 
          className="mb-6 glass rounded-xl overflow-hidden text-center text-white relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-pink-600/30"></div>
          <div className="relative p-4 backdrop-blur-lg">
            {meetingStats && meetingStats.length > 0 ? (
              <motion.div
                className="text-sm md:text-base font-medium h-6"
                key={currentStatIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-indigo-100">
                  {meetingStats[currentStatIndex]?.text || "Loading meeting statistics..."}
                </span>
              </motion.div>
            ) : (
              <div className="text-sm md:text-base font-medium text-indigo-200 animate-pulse">
                <span>Loading corporate meeting statistics...</span>
              </div>
            )}
          </div>
        </motion.div>
        
        <div className="md:flex md:space-x-8">
          <ControlPanel
            onGenerateCard={handleGenerateCards}
            meetingType={meetingType}
            squaresMarked={squaresMarkedCount}
            bingoProgress={bingoProgress}
            isGenerating={isGenerating}
            cardSet={cardSet}
            onSwitchCard={switchToCard}
          />
          
          <div className="md:w-2/3 lg:w-3/4">
            <div ref={cardRef}>
              <BingoCardContainer
                meetingType={meetingType}
                words={words}
                markedSquares={markedSquares}
                bingoLines={bingoLines}
                hasBingo={hasBingo}
                onToggleSquare={toggleSquare}
                onResetCard={resetCard}
                onShareCard={handleShareCard}
              />
            </div>
            
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <BuzzwordList meetingType={meetingType} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={handleCloseShareModal}
        shareText={shareText}
        cardRef={cardRef}
      />
      
      {/* Radial gradient for the background */}
      <div 
        className="fixed inset-0 -z-20 opacity-80"
        style={{
          background: 'radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.15) 0%, rgba(67, 56, 202, 0.05) 50%, rgba(17, 24, 39, 0) 100%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, rgba(67, 56, 202, 0.05) 50%, rgba(17, 24, 39, 0) 100%)',
        }}
      />
    </div>
  );
}
