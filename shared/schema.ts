import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Bingo card model
export const bingoCards = pgTable("bingo_cards", {
  id: serial("id").primaryKey(),
  meetingType: text("meeting_type").notNull(),
  buzzwords: jsonb("buzzwords").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertBingoCardSchema = createInsertSchema(bingoCards).pick({
  meetingType: true,
  buzzwords: true,
  createdAt: true,
});

// Meeting type model
export const meetingTypes = pgTable("meeting_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  displayName: text("display_name").notNull(),
});

export const insertMeetingTypeSchema = createInsertSchema(meetingTypes).pick({
  name: true,
  displayName: true,
});

// Buzzwords model
export const buzzwords = pgTable("buzzwords", {
  id: serial("id").primaryKey(),
  meetingTypeId: integer("meeting_type_id").notNull(),
  word: text("word").notNull(),
});

export const insertBuzzwordSchema = createInsertSchema(buzzwords).pick({
  meetingTypeId: true,
  word: true,
});

export type InsertBingoCard = z.infer<typeof insertBingoCardSchema>;
export type BingoCard = typeof bingoCards.$inferSelect;

export type InsertMeetingType = z.infer<typeof insertMeetingTypeSchema>;
export type MeetingType = typeof meetingTypes.$inferSelect;

export type InsertBuzzword = z.infer<typeof insertBuzzwordSchema>;
export type Buzzword = typeof buzzwords.$inferSelect;
