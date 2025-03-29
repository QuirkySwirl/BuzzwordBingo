import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { checkForBingo, calculateBingoProgress } from '@/lib/bingo-utils';

interface BingoCardState {
  id: number | null;
  meetingType: string;
  words: string[];
  markedSquares: boolean[];
  hasBingo: boolean;
  bingoLines: number[][];
  squaresMarkedCount: number;
  bingoProgress: number;
}

interface CardSet {
  cards: BingoCardState[];
  meetingType: string;
  numCards: number;
  activeCardIndex: number;
}

const initialBingoState: BingoCardState = {
  id: null,
  meetingType: 'all-hands',
  words: Array(25).fill(''),
  markedSquares: Array(25).fill(false),
  hasBingo: false,
  bingoLines: [],
  squaresMarkedCount: 0,
  bingoProgress: 0
};

const initialCardSet: CardSet = {
  cards: [initialBingoState],
  meetingType: 'all-hands',
  numCards: 1,
  activeCardIndex: 0
};

export function useBingoCard() {
  const [cardSet, setCardSet] = useState<CardSet>(initialCardSet);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Get the active card
  const activeCard = cardSet.cards[cardSet.activeCardIndex];

  // Mark the free space (center) automatically for all cards when they're created
  useEffect(() => {
    cardSet.cards.forEach((card, cardIndex) => {
      if (card.words[12] === 'FREE SPACE' && !card.markedSquares[12]) {
        toggleSquare(12, cardIndex);
      }
    });
  }, [cardSet.cards]);

  // Fisher-Yates shuffle for client-side card generation
  const fisherYatesShuffle = (array: string[]): string[] => {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };

  // Generate multiple bingo cards
  const generateCard = async (meetingType: string, numCards: number = 5) => {
    setIsGenerating(true);
    
    try {
      const response = await apiRequest('POST', '/api/generate-card', { 
        meetingType, 
        numCards 
      });
      const data = await response.json();
      
      // For the first card, use the data from the API
      const firstCard: BingoCardState = {
        id: data.id,
        meetingType,
        words: data.words,
        markedSquares: Array(25).fill(false),
        hasBingo: false,
        bingoLines: [],
        squaresMarkedCount: 0,
        bingoProgress: 0
      };
      
      // Create additional cards using the buzzwords for this meeting type
      const buzzwordsResponse = await apiRequest('GET', `/api/buzzwords/${meetingType}`);
      const allBuzzwords = await buzzwordsResponse.json();
      
      if (allBuzzwords.length < 24) {
        throw new Error("Not enough buzzwords for additional cards");
      }
      
      // Generate additional cards
      const additionalCards: BingoCardState[] = [];
      
      for (let i = 1; i < numCards; i++) {
        // Shuffle the buzzwords for each card to ensure uniqueness
        const shuffledWords = fisherYatesShuffle(allBuzzwords);
        const selectedWords = shuffledWords.slice(0, 24);
        
        // Insert FREE SPACE in the middle (12th position)
        const cardWords = [
          ...selectedWords.slice(0, 12), 
          "FREE SPACE", 
          ...selectedWords.slice(12, 24)
        ];
        
        additionalCards.push({
          id: data.id + i, // Use a pseudo-ID
          meetingType,
          words: cardWords,
          markedSquares: Array(25).fill(false),
          hasBingo: false,
          bingoLines: [],
          squaresMarkedCount: 0,
          bingoProgress: 0
        });
      }
      
      setCardSet({
        cards: [firstCard, ...additionalCards],
        meetingType,
        numCards,
        activeCardIndex: 0
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate bingo cards. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Toggle a square's marked state
  const toggleSquare = (index: number, cardIndex: number = cardSet.activeCardIndex) => {
    if (index === 12) return; // Don't allow toggling the free space
    
    const updatedCards = [...cardSet.cards];
    const card = updatedCards[cardIndex];
    
    const newMarkedSquares = [...card.markedSquares];
    newMarkedSquares[index] = !newMarkedSquares[index];
    
    // Count marked squares
    const markedCount = newMarkedSquares.filter(Boolean).length;
    
    // Check for bingo
    const { hasBingo, bingoLines } = checkForBingo(newMarkedSquares);
    
    // Calculate progress
    const bingoProgress = calculateBingoProgress(newMarkedSquares);
    
    updatedCards[cardIndex] = {
      ...card,
      markedSquares: newMarkedSquares,
      hasBingo,
      bingoLines,
      squaresMarkedCount: markedCount,
      bingoProgress
    };
    
    setCardSet({
      ...cardSet,
      cards: updatedCards
    });
    
    // Show toast if bingo just achieved
    if (hasBingo && !card.hasBingo) {
      toast({
        title: "BINGO!",
        description: "Congratulations! You've achieved Corporate Buzzword Bingo.",
        variant: "default"
      });
    }
  };

  // Reset the active card (unmark all squares except free space)
  const resetCard = (cardIndex: number = cardSet.activeCardIndex) => {
    const updatedCards = [...cardSet.cards];
    const card = updatedCards[cardIndex];
    
    const newMarkedSquares = Array(25).fill(false);
    newMarkedSquares[12] = true; // Keep free space marked
    
    updatedCards[cardIndex] = {
      ...card,
      markedSquares: newMarkedSquares,
      hasBingo: false,
      bingoLines: [],
      squaresMarkedCount: 1,
      bingoProgress: 4 // 1/25 = 4%
    };
    
    setCardSet({
      ...cardSet,
      cards: updatedCards
    });
  };

  // Get list of marked words for active card
  const getMarkedWords = (cardIndex: number = cardSet.activeCardIndex): string[] => {
    const card = cardSet.cards[cardIndex];
    return card.words.filter((word, index) => 
      card.markedSquares[index] && word !== 'FREE SPACE'
    );
  };
  
  // Switch to different card
  const switchToCard = (cardIndex: number) => {
    if (cardIndex >= 0 && cardIndex < cardSet.cards.length) {
      setCardSet({
        ...cardSet,
        activeCardIndex: cardIndex
      });
    }
  };

  return {
    ...activeCard,
    isGenerating,
    cardSet,
    activeCardIndex: cardSet.activeCardIndex,
    generateCard,
    toggleSquare,
    resetCard,
    getMarkedWords,
    switchToCard
  };
}
