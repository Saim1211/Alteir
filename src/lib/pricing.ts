export type PaintTier = "essential" | "signature" | "mineral";
export type WallCondition = "good" | "minor" | "moderate" | "extensive";
export type RoomInput = {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  openingsArea: number;
  paintWalls: boolean;
  paintCeiling: boolean;
  paintTrim: boolean;
  trimLength: number;
  cabinetDoors: number;
  condition: WallCondition;
  coats: 1 | 2 | 3;
  tier: PaintTier;
};

export type Pricing = {
  version: string;
  wallLaborCentsPerSqFt: number;
  ceilingLaborCentsPerSqFt: number;
  trimLaborCentsPerFt: number;
  trimMaterialCentsPerFt: number;
  cabinetLaborCentsPerDoor: number;
  cabinetMaterialCentsPerDoor: number;
  materialCentsPerSqFt: Record<PaintTier, number>;
  prepCentsPerSqFt: Record<WallCondition, number>;
  additionalCoatLaborPercent: number;
  additionalCoatMaterialPercent: number;
  occupiedLaborPercent: number;
};

export const demoPricing: Pricing = {
  version: "demo-2026-10-v1",
  wallLaborCentsPerSqFt: 180,
  ceilingLaborCentsPerSqFt: 210,
  trimLaborCentsPerFt: 260,
  trimMaterialCentsPerFt: 55,
  cabinetLaborCentsPerDoor: 10500,
  cabinetMaterialCentsPerDoor: 2500,
  materialCentsPerSqFt: { essential: 42, signature: 68, mineral: 95 },
  prepCentsPerSqFt: { good: 0, minor: 32, moderate: 72, extensive: 125 },
  additionalCoatLaborPercent: 45,
  additionalCoatMaterialPercent: 55,
  occupiedLaborPercent: 5,
};

export type RoomEstimate = {
  id: string;
  name: string;
  wallArea: number;
  ceilingArea: number;
  paintedArea: number;
  laborCents: number;
  materialsCents: number;
  preparationCents: number;
  servicesCents: number;
  totalCents: number;
};

const roundArea = (value: number) => Math.round(value * 100) / 100;
const money = (value: number) => Math.round(value);

export function calculateRoom(room: RoomInput, pricing: Pricing = demoPricing, occupied = false): RoomEstimate {
  if (!Number.isFinite(room.length) || !Number.isFinite(room.width) || !Number.isFinite(room.height) ||
      room.length <= 0 || room.width <= 0 || room.height <= 0 ||
      room.length > 100 || room.width > 100 || room.height > 30 ||
      !Number.isFinite(room.openingsArea) || room.openingsArea < 0 ||
      !Number.isFinite(room.trimLength) || room.trimLength < 0 || room.trimLength > 1000 ||
      !Number.isInteger(room.cabinetDoors) || room.cabinetDoors < 0 || room.cabinetDoors > 100 ||
      ![1, 2, 3].includes(room.coats)) throw new Error("Invalid room dimensions or options.");

  const grossWall = 2 * (room.length + room.width) * room.height;
  if (room.openingsArea > grossWall) throw new Error("Openings cannot exceed wall area.");
  const wallArea = room.paintWalls ? roundArea(grossWall - room.openingsArea) : 0;
  const ceilingArea = room.paintCeiling ? roundArea(room.length * room.width) : 0;
  const paintedArea = roundArea(wallArea + ceilingArea);
  const extraCoats = room.coats - 2;
  const laborFactor = 1 + extraCoats * pricing.additionalCoatLaborPercent / 100;
  const materialFactor = 1 + extraCoats * pricing.additionalCoatMaterialPercent / 100;
  const baseLabor = wallArea * pricing.wallLaborCentsPerSqFt + ceilingArea * pricing.ceilingLaborCentsPerSqFt;
  const laborCents = money(baseLabor * laborFactor * (occupied ? 1 + pricing.occupiedLaborPercent / 100 : 1));
  const materialsCents = money(paintedArea * pricing.materialCentsPerSqFt[room.tier] * materialFactor + (room.paintTrim ? room.trimLength * pricing.trimMaterialCentsPerFt : 0) + room.cabinetDoors * pricing.cabinetMaterialCentsPerDoor);
  const preparationCents = money(wallArea * pricing.prepCentsPerSqFt[room.condition]);
  const servicesCents = money((room.paintTrim ? room.trimLength * pricing.trimLaborCentsPerFt : 0) + room.cabinetDoors * pricing.cabinetLaborCentsPerDoor);
  const totalCents = laborCents + materialsCents + preparationCents + servicesCents;
  if (!Number.isSafeInteger(totalCents)) throw new Error("Estimate exceeds supported range.");
  return { id: room.id, name: room.name, wallArea, ceilingArea, paintedArea, laborCents, materialsCents, preparationCents, servicesCents, totalCents };
}

export function calculateEstimate(rooms: RoomInput[], pricing: Pricing = demoPricing, occupied = false) {
  if (rooms.length < 1 || rooms.length > 20) throw new Error("Add between one and twenty rooms.");
  const ids = new Set(rooms.map(room => room.id));
  if (ids.size !== rooms.length) throw new Error("Duplicate rooms are not allowed.");
  const items = rooms.map(room => calculateRoom(room, pricing, occupied));
  const sum = (key: keyof Pick<RoomEstimate, "laborCents" | "materialsCents" | "preparationCents" | "servicesCents" | "totalCents">) => items.reduce((total, item) => total + item[key], 0);
  const result = { rooms: items, paintedArea: roundArea(items.reduce((total, item) => total + item.paintedArea, 0)), laborCents: sum("laborCents"), materialsCents: sum("materialsCents"), preparationCents: sum("preparationCents"), servicesCents: sum("servicesCents"), subtotalCents: sum("totalCents") };
  if (!Number.isSafeInteger(result.subtotalCents)) throw new Error("Estimate exceeds supported range.");
  return result;
}

export const formatMoney = (cents: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(cents / 100);
