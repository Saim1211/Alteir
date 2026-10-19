import type { Metadata } from "next";
export const metadata:Metadata={title:"Photo Credits"};
const photos=[
  ["Living room hero","https://unsplash.com/photos/a-living-room-filled-with-furniture-and-a-white-table-Z9S8AuLvanU"],
  ["Kitchen","https://unsplash.com/photos/a-kitchen-with-a-wooden-table-and-white-cabinets-e3KwHnjVofg"],
  ["Light-filled living room","https://unsplash.com/photos/a-living-room-filled-with-furniture-and-a-window-r4WR3B0dMwo"],
  ["Neutral living room","https://unsplash.com/photos/living-room-with-sofa-and-coffee-table-qYQGXnm65vc"],
] as const;
export default function CreditsPage(){return <main><section className="page-hero"><div className="wrap"><p className="eyebrow">Photography</p><h1>Image credits.</h1><p>Interior imagery used for color and finish inspiration.</p></div></section><section className="section"><div className="wrap legal-copy"><p>Images were sourced from Unsplash under its free image license. Photographer information and the original image are available on each source page.</p><ul>{photos.map(([label,url])=><li key={url}><a className="text-link" href={url} target="_blank" rel="noopener noreferrer">{label} →</a></li>)}</ul><p><a className="text-link" href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer">Read the Unsplash license →</a></p></div></section></main>}
