import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { Label } from "../components/ui/label";
import { MeetingType } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";

interface ControlPanelProps {
  onGenerateCard: (meetingType: string, numCards: number) => void;
  meetingType: string;
  squaresMarked: number;
  bingoProgress: number;
  isGenerating: boolean;
  cardSet?: {
    cards: any[];
    activeCardIndex: number;
    numCards: number;
  };
  onSwitchCard?: (index: number) => void;
}

export function ControlPanel({
  onGenerateCard,
  meetingType,
  squaresMarked,
  bingoProgress,
  isGenerating,
  cardSet,
  onSwitchCard
}: ControlPanelProps) {
  const [selectedMeetingType, setSelectedMeetingType] = useState(meetingType);
  // Fixed number of cards to 5
  const [activeTab, setActiveTab] = useState("play");

  // Meeting type quirky descriptions
  const meetingTypeQuips: Record<string, string> = {
    "all-hands": "Where synergy meets circle-back in perfect harmony!",
    "strategy": "Strategic pillars and blue oceans, guaranteed to impress!",
    "budget": "Bottom lines, top lines, and everything in-between!",
    "product": "Where roadmaps lead to the land of MVP and user stories!",
    "quarterly": "KPIs, OKRs, and all the numbers that matter (or not)!",
    "offsite": "Team building in fancy locations with fancy buzzwords!",
    "board": "Impress the suits with governance and stakeholder value!",
    "layoff": "Restructuring and right-sizing for optimal resource allocation!",
    "performance": "Growth mindsets and stretch goals for everyone!",
    "kickoff": "The beginning of endless scope creep and action items!",
  };

  // Fetch meeting types from API
  const { data: meetingTypes, isLoading } = useQuery<MeetingType[]>({
    queryKey: ['/api/meeting-types'],
  });

  // Fetch meeting statistics for ticker
  const { data: meetingStats } = useQuery({
    queryKey: ['/api/meeting-stats'],
  });

  // Update selected meeting type when prop changes
  useEffect(() => {
    setSelectedMeetingType(meetingType);
  }, [meetingType]);

  const handleMeetingTypeChange = (value: string) => {
    setSelectedMeetingType(value);
  };

  const handleGenerateClick = () => {
    // Always generate 5 cards
    onGenerateCard(selectedMeetingType, 5);
    
    // Scroll to bingo card after a small delay to ensure it's rendered
    setTimeout(() => {
      // On mobile, scroll to the bingo card container specifically
      if (window.innerWidth < 768) {
        document.querySelector('.bingo-card-container')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
      } else {
        // On desktop, the current behavior works fine
        document.querySelector('.glass-card')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center'
        });
      }
    }, 400);
  };

  return (
    <div className="md:w-1/3 lg:w-1/4 mb-6 md:mb-0">
      <motion.div 
        className="glass-card sticky top-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 relative">
          {/* Floating background elements */}
          <div className="absolute inset-0 overflow-hidden rounded-xl -z-10">
            {[...Array(3)].map((_, i) => (
              <motion.div 
                key={`control-bg-${i}`}
                className="absolute rounded-full bg-gradient-to-br from-indigo-600/10 to-purple-600/5"
                style={{
                  width: `${Math.random() * 200 + 50}px`,
                  height: `${Math.random() * 200 + 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.4
                }}
                animate={{
                  x: [0, 10, 0, -10, 0],
                  y: [0, 15, 0, -15, 0],
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 text-transparent bg-clip-text mb-4">Game Settings</h2>
          
          <Tabs defaultValue="play" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-2 glass backdrop-blur-sm">
              <TabsTrigger value="play" className="data-[state=active]:bg-indigo-600/60 data-[state=active]:text-white">
                Play
              </TabsTrigger>
              <TabsTrigger value="cards" className="data-[state=active]:bg-indigo-600/60 data-[state=active]:text-white">
                My Cards
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="play" className="mt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="meetingType" className="text-sm font-medium text-indigo-200 mb-2 block">
                    Meeting Type
                  </Label>
                  
                  {isLoading ? (
                    <Skeleton className="h-10 w-full bg-white/10" />
                  ) : (
                    <Select 
                      value={selectedMeetingType} 
                      onValueChange={handleMeetingTypeChange}
                    >
                      <SelectTrigger className="w-full bg-white/5 border-indigo-300/30 text-indigo-100">
                        <SelectValue placeholder="Select meeting type" />
                      </SelectTrigger>
                      <SelectContent className="glass border-indigo-300/30 text-indigo-100">
                        {meetingTypes?.map((type) => (
                          <SelectItem key={type.id} value={type.name}>
                            {type.displayName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
                
                {/* Meeting type description */}
                <div className="mt-2 mb-2">
                  {selectedMeetingType && meetingTypeQuips[selectedMeetingType] && (
                    <p className="text-xs text-indigo-300 italic glass bg-white/5 rounded-lg p-3 border border-indigo-300/10">
                      {meetingTypeQuips[selectedMeetingType]}
                    </p>
                  )}
                </div>
                
                <Button 
                  className="w-full floating-button relative group mt-4"
                  onClick={handleGenerateClick}
                  disabled={isGenerating}
                >
                  <span className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></span>
                  <span className="relative flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24" fill="none" style={{ animationDuration: "2s", opacity: isGenerating ? 1 : 0 }}>
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{isGenerating ? "Generating..." : "Generate Bingo Card"}</span>
                  </span>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="cards" className="mt-4">
              {cardSet && cardSet.cards.length > 0 ? (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-indigo-200 mb-2 block">
                      Card Navigation
                    </Label>
                    <div className="glass bg-white/5 rounded-lg p-3 border border-indigo-300/20">
                      <div className="flex justify-between items-center mb-3">
                        <Badge variant="outline" className="bg-indigo-800/30 text-indigo-200 border-indigo-500/30">
                          Active: Card {cardSet.activeCardIndex + 1} of {cardSet.cards.length}
                        </Badge>
                        
                        <Badge variant="outline" className="bg-indigo-800/30 text-indigo-200 border-indigo-500/30">
                          {meetingTypes?.find(m => m.name === meetingType)?.displayName || meetingType}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-5 gap-1">
                        {Array.from({ length: cardSet.cards.length }).map((_, index) => {
                          const cardNumber = index + 1;
                          const isActive = index === cardSet.activeCardIndex;
                          const hasBingo = cardSet.cards[index]?.hasBingo;
                          
                          return (
                            <Button 
                              key={index}
                              variant={isActive ? "default" : "outline"}
                              size="sm"
                              className={`
                                p-0 h-9
                                ${isActive 
                                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-none' 
                                  : hasBingo
                                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-300'
                                    : 'bg-white/5 border-indigo-300/30 text-indigo-100'
                                }
                              `}
                              onClick={() => onSwitchCard && onSwitchCard(index)}
                            >
                              {cardNumber}
                              {hasBingo && (
                                <span className="ml-1 text-xs">✓</span>
                              )}
                            </Button>
                          );
                        })}
                      </div>
                      
                      <p className="text-indigo-300 text-xs mt-3 text-center">
                        Click a card number to switch between cards
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-indigo-200 mb-2 block">
                      Active Card Stats
                    </Label>
                    <div className="glass bg-white/5 rounded-lg p-3 border border-indigo-300/20 text-sm text-indigo-200">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <p className="font-medium">Squares Marked</p>
                          <p className="text-xl font-bold text-indigo-100">
                            {squaresMarked}<span className="text-indigo-400 text-sm">/25</span>
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium">Bingo Progress</p>
                          <p className="text-xl font-bold text-indigo-100">{bingoProgress}<span className="text-indigo-400 text-sm">%</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600 mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="mb-2">No bingo cards generated yet</p>
                  <p className="text-sm opacity-80">Generate cards first to manage them</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <motion.div 
            className="glass bg-gradient-to-br from-indigo-800/20 to-purple-800/20 backdrop-blur-sm rounded-lg p-4 mb-4 border border-indigo-300/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-medium text-indigo-200 mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              How to Play
            </h3>
            <ol className="text-sm text-indigo-200 space-y-1 list-decimal pl-4">
              <li>Select your meeting type</li>
              <li>Generate your bingo card</li>
              <li>Click squares when you hear buzzwords</li>
              <li>Complete a row, column, or diagonal to win</li>
              <li className="text-indigo-300 font-medium">Don't get caught playing!</li>
            </ol>
          </motion.div>
          
          <motion.div 
            className="glass bg-gradient-to-br from-indigo-600/10 to-purple-600/10 backdrop-blur-sm rounded-lg p-4 border border-indigo-300/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-medium text-indigo-200 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 22V18.13C16.0375 17.6532 15.9731 17.1738 15.811 16.7238C15.6489 16.2738 15.3929 15.8634 15.06 15.52C18.2 15.17 21.5 13.98 21.5 8.52C21.4997 7.12383 20.9627 5.7812 20 4.77C20.4559 3.54851 20.4236 2.19835 19.91 0.999999C19.91 0.999999 18.73 0.649999 16 2.48C13.708 1.85882 11.292 1.85882 9 2.48C6.27 0.649999 5.09 0.999999 5.09 0.999999C4.57638 2.19835 4.54414 3.54851 5 4.77C4.03013 5.7887 3.49252 7.14346 3.5 8.55C3.5 13.97 6.8 15.16 9.94 15.55C9.611 15.89 9.35726 16.2954 9.19531 16.7399C9.03335 17.1844 8.96681 17.658 9 18.13V22M9 19C4.5 20.5 4.5 16.5 2 16L9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Game Stats
            </h3>
            
            <div className="text-sm space-y-3">
              <div>
                <div className="flex justify-between text-indigo-200 mb-1">
                  <span className="font-medium">Squares Marked:</span>
                  <span>{squaresMarked}/25</span>
                </div>
                <div className="w-full bg-indigo-900/30 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(squaresMarked / 25) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-indigo-200 mb-1">
                  <span className="font-medium">Progress to Bingo:</span>
                  <span>{bingoProgress}%</span>
                </div>
                <div className="w-full bg-indigo-900/30 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-emerald-500 to-green-500 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${bingoProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
