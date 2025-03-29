import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Fisher-Yates shuffle algorithm
function fisherYatesShuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Get all meeting types
  app.get("/api/meeting-types", async (req, res) => {
    try {
      const meetingTypes = await storage.getAllMeetingTypes();
      res.json(meetingTypes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch meeting types" });
    }
  });

  // Get buzzwords by meeting type
  app.get("/api/buzzwords/:meetingType", async (req, res) => {
    try {
      const meetingType = await storage.getMeetingTypeByName(req.params.meetingType);
      
      if (!meetingType) {
        return res.status(404).json({ message: "Meeting type not found" });
      }
      
      const buzzwords = await storage.getBuzzwordsByMeetingType(meetingType.id);
      
      res.json(buzzwords.map(b => b.word));
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch buzzwords" });
    }
  });

  // Generate a bingo card
  app.post("/api/generate-card", async (req, res) => {
    try {
      const { meetingType, numCards = 1 } = req.body;
      
      if (!meetingType) {
        return res.status(400).json({ message: "Meeting type is required" });
      }
      
      const mtRecord = await storage.getMeetingTypeByName(meetingType);
      
      if (!mtRecord) {
        return res.status(404).json({ message: "Meeting type not found" });
      }
      
      const buzzwords = await storage.getBuzzwordsByMeetingType(mtRecord.id);
      
      if (buzzwords.length < 24) {
        return res.status(500).json({ message: "Not enough buzzwords for this meeting type" });
      }
      
      // Shuffle the buzzwords using Fisher-Yates algorithm
      const shuffled = fisherYatesShuffle(buzzwords);
      const selectedWords = shuffled.slice(0, 24).map(b => b.word);
      
      // Insert FREE SPACE in the middle (12th position)
      const cardWords = [...selectedWords.slice(0, 12), "FREE SPACE", ...selectedWords.slice(12)];
      
      // Create and store the bingo card
      const bingoCard = await storage.createBingoCard({
        meetingType,
        buzzwords: cardWords,
        createdAt: new Date().toISOString()
      });
      
      res.json({
        id: bingoCard.id,
        meetingType,
        words: cardWords,
        numCards: numCards
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate bingo card" });
    }
  });
  
  // Get meeting statistics
  app.get("/api/meeting-stats", async (req, res) => {
    try {
      // These are humorous fictional statistics for the ticker banner
      const stats = [
        { id: 1, text: "55 million meetings are held each day worldwide. Bingo opportunities are endless!" },
        { id: 2, text: "The average employee spends 31 hours per month in unproductive meetings. That's prime bingo time!" },
        { id: 3, text: "37% of meeting time is spent discussing buzzwords. Make it count with buzzword bingo!" },
        { id: 4, text: "Professionals attend an average of 62 meetings per month. That's 62 chances to win at bingo!" },
        { id: 5, text: "73% of people do other work during meetings. What better work than playing bingo?" },
        { id: 6, text: "11 million meetings occur daily in the US alone. So many bingo cards waiting to be filled!" },
        { id: 7, text: "Over 39% of meeting attendees fall asleep. Bingo will keep you awake!" },
        { id: 8, text: "45% of senior managers think meetings are a waste of time. Make them fun with bingo!" },
        { id: 9, text: "Approximately 25 million PowerPoint presentations are made daily. Each slide is a bingo opportunity!" },
        { id: 10, text: "The average meeting lasts 1 hour 42 minutes. Perfect length for a full bingo card!" },
        { id: 11, text: "Business professionals attend over 15 million meetings daily. How many bingo cards is that?" },
        { id: 12, text: "Nearly 1/3 of all meetings are considered unnecessary. But bingo makes them necessary!" }
      ];
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch meeting statistics" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
