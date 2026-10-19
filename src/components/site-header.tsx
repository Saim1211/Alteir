"use client";
import Link from "next/link";
import { useState } from "react";

const links = [["Services", "/services"], ["Inspiration", "/work"], ["About", "/about"], ["Process", "/#process"], ["Contact", "/contact"]] as const;
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="announcement">Considered color <span>·</span> Careful craft <span>·</span> Thoughtful rooms begin here</div>
    <div className="nav-shell wrap">
      <Link className="brand" href="/" onClick={() => setOpen(false)} aria-label="Atelier Paint Co. home"><span className="brand-mark">A<span>·</span></span><span className="brand-copy"><strong>ATELIER</strong><small>PAINT CO.</small></span></Link>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}<span aria-hidden="true">{open ? "×" : "☰"}</span></button>
      <nav id="main-nav" className={open ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">{links.map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link className="button button-dark nav-cta" href="/estimate" onClick={() => setOpen(false)}>Get an Estimate <span aria-hidden="true">→</span></Link></nav>
    </div>
  </header>;
}

