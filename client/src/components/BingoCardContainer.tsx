import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BingoCard } from "./BingoCard";
import { MeetingType } from "@shared/schema";

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

  return (
    <div className="md:w-2/3 lg:w-3/4">
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-primary">Your Bingo Card</h2>
            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
              {displayName}
            </span>
          </div>
          
          <motion.div
            animate={hasBingo ? {
              scale: [1, 1.05, 0.95, 1.02, 1],
              transition: { duration: 1 }
            } : {}}
          >
            <BingoCard
              words={words}
              markedSquares={markedSquares}
              bingoLines={bingoLines}
              onToggleSquare={onToggleSquare}
            />
          </motion.div>
          
          {hasBingo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6 text-center"
            >
              <h3 className="text-success text-xl font-bold mb-2">BINGO!</h3>
              <p className="text-primary mb-4">Congratulations! You've achieved Corporate Buzzword Bingo.</p>
              <Button 
                className="bg-success hover:bg-success/90 text-white"
                onClick={onShareCard}
              >
                Share Your Victory
              </Button>
            </motion.div>
          )}
          
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="secondary"
              onClick={onResetCard}
            >
              Reset Card
            </Button>
            <Button 
              className="bg-accent hover:bg-accent/90 text-white"
              onClick={onShareCard}
            >
              Share Card
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
