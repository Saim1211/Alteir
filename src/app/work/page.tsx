import type { Metadata } from "next";
import { WorkGallery } from "@/components/work-gallery";
export const metadata: Metadata = { title: "Inspiration", description: "Room inspiration for color, preparation, and finish choices." };
export default function WorkPage() { return <main><section className="page-hero"><div className="wrap"><p className="eyebrow">Room inspiration</p><h1>Spaces shaped by<br /><em>thoughtful finishes.</em></h1><p>Explore color palettes, room moods, and finish ideas for the spaces you call home.</p></div></section><section className="section"><div className="wrap"><WorkGallery /></div></section></main>; }
