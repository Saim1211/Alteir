import { z } from "zod";

const safeText = (max: number) => z.string().trim().min(1).max(max);
export const roomSchema = z.object({
  id: z.string().uuid(), name: safeText(60),
  length: z.number().finite().min(1).max(100), width: z.number().finite().min(1).max(100),
  height: z.number().finite().min(6).max(30), openingsArea: z.number().finite().min(0).max(1000),
  paintWalls: z.boolean(), paintCeiling: z.boolean(), paintTrim: z.boolean(),
  trimLength: z.number().finite().min(0).max(1000), cabinetDoors: z.number().int().min(0).max(100),
  condition: z.enum(["good", "minor", "moderate", "extensive"]),
  coats: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  tier: z.enum(["essential", "signature", "mineral"]),
}).superRefine((room, context) => {
  if (!room.paintWalls && !room.paintCeiling && !room.paintTrim && room.cabinetDoors === 0) context.addIssue({ code: "custom", message: "Choose at least one surface." });
  if (room.openingsArea > 2 * (room.length + room.width) * room.height) context.addIssue({ code: "custom", path: ["openingsArea"], message: "Openings exceed wall area." });
});

export const contactSchema = z.object({
  name: safeText(100), email: z.email().max(200), phone: z.string().trim().max(30).optional().default(""),
  area: safeText(150), category: z.enum(["interior", "cabinets", "trim", "preparation", "consultation", "multiple"]),
  message: safeText(2000), preferredContact: z.enum(["email", "phone"]),
});

export const quoteSchema = z.object({
  projectType: z.enum(["house", "condo", "apartment"]), occupied: z.boolean(),
  rooms: z.array(roomSchema).min(1).max(20),
  contact: contactSchema.pick({ name: true, email: true, phone: true, area: true, preferredContact: true }),
  notes: z.string().trim().max(2000).default(""),
});

export type QuotePayload = z.infer<typeof quoteSchema>;
