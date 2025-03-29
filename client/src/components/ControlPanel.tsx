import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MeetingType } from "@shared/schema";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [numCards, setNumCards] = useState(1);
  const [customMeetingType, setCustomMeetingType] = useState("");
  const [activeTab, setActiveTab] = useState("play");

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

  const handleAddCustomMeetingType = () => {
    // This would typically send a request to the backend to add a new meeting type
    // For now, we'll just show it in the UI
    setCustomMeetingType("");
    // Show toast notification
    console.log("Custom meeting type added:", customMeetingType);
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
              <TabsTrigger value="customize" className="data-[state=active]:bg-indigo-600/60 data-[state=active]:text-white">
                Customize
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
                        <SelectItem value="custom-meeting-1">Custom: Budget Meeting</SelectItem>
                        <SelectItem value="custom-meeting-2">Custom: Layoff Announcement</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="numCards" className="text-sm font-medium text-indigo-200 mb-2 block flex justify-between">
                    <span>Number of Cards</span>
                    <span className="text-indigo-300">{numCards}</span>
                  </Label>
                  <Slider 
                    id="numCards"
                    value={[numCards]} 
                    min={1} 
                    max={4} 
                    step={1} 
                    onValueChange={(value) => setNumCards(value[0])}
                    className="my-4"
                  />
                  <div className="grid grid-cols-4 gap-1 text-xs text-center text-indigo-300">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                  </div>
                </div>
                
                <Button 
                  className="w-full floating-button relative group"
                  onClick={handleGenerateClick}
                  disabled={isGenerating}
                >
                  <span className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></span>
                  <span className="relative flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24" fill="none" style={{ animationDuration: "2s", opacity: isGenerating ? 1 : 0 }}>
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{isGenerating ? "Generating..." : "Generate New Cards"}</span>
                  </span>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="customize" className="mt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customMeetingType" className="text-sm font-medium text-indigo-200 mb-2 block">
                    Add Custom Meeting Type
                  </Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="customMeetingType" 
                      placeholder="e.g., Quarterly Review"
                      value={customMeetingType}
                      onChange={(e) => setCustomMeetingType(e.target.value)}
                      className="bg-white/5 border-indigo-300/30 text-indigo-100 placeholder:text-indigo-300/50 flex-1"
                    />
                    <Button 
                      onClick={handleAddCustomMeetingType}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      disabled={!customMeetingType.trim()}
                    >
                      Add
                    </Button>
                  </div>
                  <p className="text-indigo-300 text-xs mt-2">
                    Create your own meeting type with custom buzzwords!
                  </p>
                </div>
                
                <div className="mt-4">
                  <Label className="text-sm font-medium text-indigo-200 mb-2 block">
                    Add Custom Buzzwords (Coming Soon)
                  </Label>
                  <div className="glass bg-white/5 p-3 rounded-lg border border-indigo-300/20 text-center">
                    <p className="text-indigo-200 text-sm italic">
                      Soon you'll be able to add your own buzzwords to spice up your bingo game!
                    </p>
                  </div>
                </div>
              </div>
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
              <li>Choose how many cards to play</li>
              <li>Generate your bingo cards</li>
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
