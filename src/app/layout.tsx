import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
export const metadata: Metadata = { title: { default: "Atelier Paint Co. | Thoughtful Interior Painting", template: "%s | Atelier Paint Co." }, description: "Explore thoughtful interior painting services, room inspiration, and a detailed preliminary estimate.", openGraph: { title: "Atelier Paint Co.", description: "Considered color. Careful craft.", type: "website" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${serif.variable} ${sans.variable}`}><div role="note" style={{background:"#24352f",color:"#fff",padding:"8px 16px",textAlign:"center",fontSize:12}}>Portfolio concept for a fictional painting business. Estimates are illustrative; requests are disabled.</div><SiteHeader />{children}<SiteFooter /></body></html>; }
