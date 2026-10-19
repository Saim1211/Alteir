import type { Metadata } from "next";
import { EstimateWizard } from "@/components/estimate-wizard";
export const metadata: Metadata = { title: "Plan Your Project", description: "Configure rooms and finishes for an preliminary itemized painting estimate." };
export default function EstimatePage() { return <main><section className="page-hero"><div className="wrap"><p className="eyebrow">Project planner</p><h1>A clearer starting<br /><em>point for your space.</em></h1><p>Shape your project room by room and see how surfaces, finish choices, and preparation affect a preliminary estimate.</p></div></section><section className="section"><div className="wrap"><EstimateWizard /></div></section></main>; }
