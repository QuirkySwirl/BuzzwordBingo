import { bingoCards, meetingTypes, buzzwords, type BingoCard, type InsertBingoCard, type MeetingType, type InsertMeetingType, type Buzzword, type InsertBuzzword } from "@shared/schema";
import { buzzwordData, meetingTypeData } from "./data/buzzwords";

// Interface for storage operations
export interface IStorage {
  // Bingo card operations
  getBingoCard(id: number): Promise<BingoCard | undefined>;
  createBingoCard(card: InsertBingoCard): Promise<BingoCard>;
  
  // Meeting type operations
  getAllMeetingTypes(): Promise<MeetingType[]>;
  getMeetingType(id: number): Promise<MeetingType | undefined>;
  getMeetingTypeByName(name: string): Promise<MeetingType | undefined>;
  
  // Buzzword operations
  getBuzzwordsByMeetingType(meetingTypeId: number): Promise<Buzzword[]>;
  getBuzzwords(): Promise<Buzzword[]>;
}

export class MemStorage implements IStorage {
  private bingoCards: Map<number, BingoCard>;
  private meetingTypes: Map<number, MeetingType>;
  private buzzwords: Map<number, Buzzword>;
  
  private bingoCardCurrentId: number;
  private meetingTypeCurrentId: number;
  private buzzwordCurrentId: number;

  constructor() {
    this.bingoCards = new Map();
    this.meetingTypes = new Map();
    this.buzzwords = new Map();
    
    this.bingoCardCurrentId = 1;
    this.meetingTypeCurrentId = 1;
    this.buzzwordCurrentId = 1;
    
    // Initialize with meeting types data
    this.initializeMeetingTypes();
    
    // Initialize with buzzwords data
    this.initializeBuzzwords();
  }

  private initializeMeetingTypes() {
    meetingTypeData.forEach(mt => {
      const meetingType: MeetingType = {
        id: this.meetingTypeCurrentId++,
        name: mt.name,
        displayName: mt.displayName
      };
      this.meetingTypes.set(meetingType.id, meetingType);
    });
  }

  private initializeBuzzwords() {
    for (const [mtName, words] of Object.entries(buzzwordData)) {
      const meetingType = Array.from(this.meetingTypes.values()).find(
        mt => mt.name === mtName
      );
      
      if (meetingType) {
        words.forEach(word => {
          const buzzword: Buzzword = {
            id: this.buzzwordCurrentId++,
            meetingTypeId: meetingType.id,
            word
          };
          this.buzzwords.set(buzzword.id, buzzword);
        });
      }
    }
  }

  // Bingo card operations
  async getBingoCard(id: number): Promise<BingoCard | undefined> {
    return this.bingoCards.get(id);
  }

  async createBingoCard(insertCard: InsertBingoCard): Promise<BingoCard> {
    const id = this.bingoCardCurrentId++;
    const card: BingoCard = { ...insertCard, id };
    this.bingoCards.set(id, card);
    return card;
  }

  // Meeting type operations
  async getAllMeetingTypes(): Promise<MeetingType[]> {
    return Array.from(this.meetingTypes.values());
  }

  async getMeetingType(id: number): Promise<MeetingType | undefined> {
    return this.meetingTypes.get(id);
  }

  async getMeetingTypeByName(name: string): Promise<MeetingType | undefined> {
    return Array.from(this.meetingTypes.values()).find(
      mt => mt.name === name
    );
  }

  // Buzzword operations
  async getBuzzwordsByMeetingType(meetingTypeId: number): Promise<Buzzword[]> {
    return Array.from(this.buzzwords.values()).filter(
      b => b.meetingTypeId === meetingTypeId
    );
  }

  async getBuzzwords(): Promise<Buzzword[]> {
    return Array.from(this.buzzwords.values());
  }
}

export const storage = new MemStorage();
