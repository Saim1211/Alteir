import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import { LightboxImage } from "@/components/lightbox-image";
export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const project = projects.find(item => item.slug === slug); if (!project) notFound(); return <main><section className="page-hero"><div className="wrap"><p className="eyebrow">{project.type} / Room inspiration</p><h1>{project.title}</h1><p>{project.summary}</p></div></section><div className="article-hero-image"><LightboxImage src={project.image} alt={project.summary} /></div><div className="wrap article-content"><div><p className="eyebrow">Finish ideas</p><Link className="text-link" href="/work">← Back to inspiration</Link></div><div><h2>A study in considered color.</h2><p>{project.summary} Preparation, color continuity, and the right sheen can help a room feel settled and lived in.</p><p><strong>Palette & finish direction:</strong> {project.materials}.</p><p className="fiction-note">Photography shown for color and finish inspiration.</p><Link href="/estimate" className="button button-dark">Plan a similar project →</Link></div></div></main>; }

