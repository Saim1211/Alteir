"use client";
import Image from "next/image";
import { useRef } from "react";
export function LightboxImage({src,alt}:{src:string,alt:string}){const ref=useRef<HTMLDialogElement>(null);return <><button type="button" className="lightbox-trigger" onClick={()=>ref.current?.showModal()} aria-label={`Enlarge image: ${alt}`}><Image src={src} alt={alt} fill sizes="100vw" priority/><span>View image +</span></button><dialog className="lightbox" ref={ref} onClick={event=>{if(event.target===ref.current)ref.current.close()}}><button type="button" onClick={()=>ref.current?.close()} aria-label="Close image">Close ×</button><Image src={src} alt={alt} width={1600} height={1000} sizes="100vw"/></dialog></>}
