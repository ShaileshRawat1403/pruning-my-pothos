import type { Metadata } from "next";
import { allSystems } from "content-collections";
import { constructMetadata } from "../../lib/seo/metadata";
import Hero from "../../components/home/Hero";
import StartHere from "../../components/home/StartHere";
import Projects from "../../components/home/Projects";
import Tools from "../../components/home/Tools";
import Methodology from "../../components/home/Methodology";

export const metadata: Metadata = constructMetadata({
  title: "Editorial Preview",
  path: "/editorial-preview",
  noindex: true,
});

export default function EditorialPreviewPage() {
  const systemsCount = allSystems.length;
  const toolsCount = 22;

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
      <Hero systemsCount={systemsCount} toolsCount={toolsCount} />
      <StartHere />
      <Projects />
      <Tools />
      <Methodology systemsCount={systemsCount} />
    </div>
  );
}
