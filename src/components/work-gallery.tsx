"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/content";
const filters = ["All", "Living rooms", "Cabinets", "Whole home"];
export function WorkGallery() { const [filter,setFilter] = useState("All"); const visible = filter === "All" ? projects : projects.filter(project => project.type === filter); return <><div className="gallery-filter" role="group" aria-label="Filter projects">{filters.map(item => <button type="button" className={filter === item ? "pill active" : "pill"} aria-pressed={filter === item} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div><div className="work-gallery">{visible.map(project => <Link className="project-card" href={`/work/${project.slug}`} key={project.slug}><div className="project-image"><Image src={project.image} alt={project.summary} fill sizes="(max-width: 700px) 100vw, 50vw" /></div><div className="project-meta"><span>{project.type}</span><span>→</span></div><h3>{project.title}</h3><p>{project.summary}</p></Link>)}</div></>; }

