import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { WorkGallery } from "./work-gallery";
vi.mock("next/image",()=>({default:({alt}:{alt:string})=><span role="img" aria-label={alt} />}));
afterEach(cleanup);
describe("project gallery",()=>{it("filters by project type and can restore all projects",()=>{render(<WorkGallery/>);expect(screen.getAllByRole("link")).toHaveLength(4);fireEvent.click(screen.getByRole("button",{name:"Cabinets"}));expect(screen.getAllByRole("link")).toHaveLength(1);expect(screen.getByText("Oak House Kitchen")).toBeTruthy();fireEvent.click(screen.getByRole("button",{name:"All"}));expect(screen.getAllByRole("link")).toHaveLength(4)})});
