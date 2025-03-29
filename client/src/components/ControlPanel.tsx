import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { MeetingType } from "@shared/schema";

interface ControlPanelProps {
  onGenerateCard: (meetingType: string) => void;
  meetingType: string;
  squaresMarked: number;
  bingoProgress: number;
  isGenerating: boolean;
}

export function ControlPanel({
  onGenerateCard,
  meetingType,
  squaresMarked,
  bingoProgress,
  isGenerating
}: ControlPanelProps) {
  const [selectedMeetingType, setSelectedMeetingType] = useState(meetingType);

  // Fetch meeting types from API
  const { data: meetingTypes, isLoading } = useQuery<MeetingType[]>({
    queryKey: ['/api/meeting-types'],
  });

  // Update selected meeting type when prop changes
  useEffect(() => {
    setSelectedMeetingType(meetingType);
  }, [meetingType]);

  const handleMeetingTypeChange = (value: string) => {
    setSelectedMeetingType(value);
  };

  const handleGenerateClick = () => {
    onGenerateCard(selectedMeetingType);
  };

  return (
    <div className="md:w-1/3 lg:w-1/4 mb-6 md:mb-0">
      <Card className="sticky top-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-primary">Game Settings</h2>
          
          <div className="mb-6">
            <Label htmlFor="meetingType" className="text-sm font-medium text-secondary mb-2 block">
              Meeting Type
            </Label>
            
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select 
                value={selectedMeetingType} 
                onValueChange={handleMeetingTypeChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select meeting type" />
                </SelectTrigger>
                <SelectContent>
                  {meetingTypes?.map((type) => (
                    <SelectItem key={type.id} value={type.name}>
                      {type.displayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white mb-4"
            onClick={handleGenerateClick}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate New Card"}
          </Button>
          
          <div className="bg-background rounded-md p-4 mb-4">
            <h3 className="font-medium text-primary mb-2">How to Play</h3>
            <ol className="text-sm text-secondary space-y-1 list-decimal pl-4">
              <li>Select your meeting type</li>
              <li>Generate your bingo card</li>
              <li>Click squares when you hear buzzwords</li>
              <li>Complete a row, column, or diagonal to win</li>
              <li>Share your victory!</li>
            </ol>
          </div>
          
          <div className="bg-background rounded-md p-4">
            <h3 className="font-medium text-primary mb-2">Game Stats</h3>
            <div className="text-sm text-secondary space-y-1">
              <p><span className="font-medium">Squares Marked:</span> <span>{squaresMarked}</span>/25</p>
              <p><span className="font-medium">Progress to Bingo:</span> <span>{bingoProgress}</span>%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
