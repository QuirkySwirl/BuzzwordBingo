import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ControlPanel } from "@/components/ControlPanel";
import { BingoCardContainer } from "@/components/BingoCardContainer";
import { BuzzwordList } from "@/components/BuzzwordList";
import { ShareModal } from "@/components/ShareModal";
import { useBingoCard } from "@/hooks/useBingoCard";
import { generateShareText } from "@/lib/bingo-utils";

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
    getMarkedWords
  } = useBingoCard();
  
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Generate share text
  const shareText = generateShareText(
    meetingType, 
    hasBingo, 
    getMarkedWords()
  );
  
  const handleShareCard = () => {
    setIsShareModalOpen(true);
  };
  
  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
  };

  return (
    <div className="bg-background font-sans text-textColor min-h-screen flex flex-col">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        {/* Ad Banner */}
        <div className="mb-6 p-3 bg-white rounded-md shadow-sm border border-gray-200 text-center text-secondary text-sm">
          <span>Tasteful Banner Advertisement</span>
        </div>
        
        <div className="md:flex md:space-x-8" ref={cardRef}>
          <ControlPanel
            onGenerateCard={generateCard}
            meetingType={meetingType}
            squaresMarked={squaresMarkedCount}
            bingoProgress={bingoProgress}
            isGenerating={isGenerating}
          />
          
          <div className="md:w-2/3 lg:w-3/4">
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
            
            <BuzzwordList meetingType={meetingType} />
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
    </div>
  );
}
