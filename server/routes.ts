import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

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
      const { meetingType } = req.body;
      
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
      
      // Shuffle and select 24 buzzwords for the card
      const shuffled = [...buzzwords].sort(() => 0.5 - Math.random());
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
        words: cardWords
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate bingo card" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
