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
      // These are humorous global meeting statistics for the ticker banner
      const stats = [
        { id: 1, text: "📊 55 million meetings are held each day worldwide. Bingo opportunities are endless!" },
        { id: 2, text: "⏱️ The average employee globally spends 31 hours per month in meetings. That's prime bingo time!" },
        { id: 3, text: "🔄 Companies in Europe waste €33 billion annually on unnecessary meetings. Play bingo to reclaim value!" },
        { id: 4, text: "💬 In Asia-Pacific, 37% of meeting time is spent discussing buzzwords. Make it count with bingo!" },
        { id: 5, text: "📱 73% of people globally do other work during virtual meetings. What better work than playing bingo?" },
        { id: 6, text: "🗓️ The average worker attends 62 meetings monthly worldwide. That's 62 chances to win at bingo!" },
        { id: 7, text: "💤 Over 39% of meeting attendees globally admit to dozing off. Bingo will keep you awake!" },
        { id: 8, text: "📉 45% of executives worldwide think meetings are a waste of time. Make them fun with bingo!" },
        { id: 9, text: "📊 25 million PowerPoint presentations are made daily around the world. Each slide is a bingo opportunity!" },
        { id: 10, text: "🕒 The average meeting globally lasts 1 hour 42 minutes. Perfect length for a full bingo card!" },
        { id: 11, text: "⭐ Meetings increased by 12.9% globally post-pandemic. More opportunities for buzzword bingo!" },
        { id: 12, text: "🔄 Executives in France spend 40% more time in meetings than their German counterparts. Vive le bingo!" },
        { id: 13, text: "📈 Companies with agile methodologies have 25% more meetings. More agile, more bingo!" },
        { id: 14, text: "🌐 Remote workers attend 29% more meetings than office workers. Remote bingo is still bingo!" },
        { id: 15, text: "🇨🇳 Chinese tech companies average 9 hours of meetings weekly. Plenty of time for buzzword bingo!" },
        { id: 16, text: "🇮🇳 Indian professionals rank highest in meeting multitasking at 67%. They're playing bingo, guaranteed!" },
        { id: 17, text: "🇧🇷 Brazilian companies hold the longest meetings averaging 2h12m. Double bingo potential!" },
        { id: 18, text: "🚀 Startup CEOs spend 40% of their workweek in meetings. Start-up bingo should be a thing!" },
        { id: 19, text: "🌍 Businesses worldwide spend 15% of collective time in meetings. Time well spent with bingo!" },
        { id: 20, text: "💼 71% of meetings are considered unproductive globally. But bingo makes them productive!" }
      ];
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch meeting statistics" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
