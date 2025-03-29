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

export function useBingoCard() {
  const [state, setState] = useState<BingoCardState>(initialBingoState);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Mark the free space (center) automatically
  useEffect(() => {
    if (state.words[12] === 'FREE SPACE' && !state.markedSquares[12]) {
      toggleSquare(12);
    }
  }, [state.words]);

  // Generate a new bingo card
  const generateCard = async (meetingType: string) => {
    setIsGenerating(true);
    
    try {
      const response = await apiRequest('POST', '/api/generate-card', { meetingType });
      const data = await response.json();
      
      setState({
        id: data.id,
        meetingType,
        words: data.words,
        markedSquares: Array(25).fill(false),
        hasBingo: false,
        bingoLines: [],
        squaresMarkedCount: 0,
        bingoProgress: 0
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate a bingo card. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Toggle a square's marked state
  const toggleSquare = (index: number) => {
    if (index === 12) return; // Don't allow toggling the free space
    
    const newMarkedSquares = [...state.markedSquares];
    newMarkedSquares[index] = !newMarkedSquares[index];
    
    // Count marked squares
    const markedCount = newMarkedSquares.filter(Boolean).length;
    
    // Check for bingo
    const { hasBingo, bingoLines } = checkForBingo(newMarkedSquares);
    
    // Calculate progress
    const bingoProgress = calculateBingoProgress(newMarkedSquares);
    
    setState({
      ...state,
      markedSquares: newMarkedSquares,
      hasBingo,
      bingoLines,
      squaresMarkedCount: markedCount,
      bingoProgress
    });
    
    // Show toast if bingo just achieved
    if (hasBingo && !state.hasBingo) {
      toast({
        title: "BINGO!",
        description: "Congratulations! You've achieved Corporate Buzzword Bingo.",
        variant: "success"
      });
    }
  };

  // Reset the card (unmark all squares except free space)
  const resetCard = () => {
    const newMarkedSquares = Array(25).fill(false);
    newMarkedSquares[12] = true; // Keep free space marked
    
    setState({
      ...state,
      markedSquares: newMarkedSquares,
      hasBingo: false,
      bingoLines: [],
      squaresMarkedCount: 1,
      bingoProgress: 4 // 1/25 = 4%
    });
  };

  // Get list of marked words
  const getMarkedWords = (): string[] => {
    return state.words.filter((word, index) => 
      state.markedSquares[index] && word !== 'FREE SPACE'
    );
  };

  return {
    ...state,
    isGenerating,
    generateCard,
    toggleSquare,
    resetCard,
    getMarkedWords
  };
}
