import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { PROFILE } from "@/data/portfolio";
import { AmbientMotion } from "@/components/AmbientMotion";
import { PortfolioLoader } from "@/components/loading/PortfolioLoader";
import { SiteNav } from "@/components/SiteNav";
import { CommandPalette } from "@/components/CommandPalette";
import { PointerLayer } from "@/components/PointerLayer";
import { useActiveSection } from "@/hooks/use-active-section";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { StackToolbox } from "@/components/sections/StackToolbox";
import { Process } from "@/components/sections/Process";
import { EducationLeadership } from "@/components/sections/EducationLeadership";
import { Contact } from "@/components/sections/Contact";

const TITLE = "Abdulrahman Shamieh — Backend & Cloud Engineer";
const DESC =
  "Backend engineer building reliable systems behind the interface: REST APIs, AWS serverless architecture, observability pipelines and multi-account CI/CD.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "Abdulrahman Shamieh, Backend Engineer, Software Engineer, Node.js Developer, TypeScript Developer, Python Developer, AWS Developer, Cloud Engineer, Serverless Engineer",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Abdulrahman Shamieh",
          jobTitle: "Backend / Software Engineer",
          description: DESC,
          email: `mailto:${PROFILE.email}`,
          telephone: PROFILE.phone,
          alumniOf: { "@type": "CollegeOrUniversity", name: "Computer Science" },
          knowsAbout: [
            "Backend Engineering",
            "TypeScript",
            "Node.js",
            "Express",
            "Python",
            "AWS Lambda",
            "API Gateway",
            "Amazon Cognito",
            "CloudWatch",
            "Amazon Data Firehose",
            "Amazon S3",
            "IAM",
            "GitHub Actions",
            "CI/CD",
            "Serverless Architecture",
            "Observability",
          ],
          sameAs: [PROFILE.github, PROFILE.linkedin],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [revealed, setRevealed] = useState(false);
  const [palette, setPalette] = useState(false);
  const active = useActiveSection();

  const onReveal = useCallback(() => {
    setRevealed(true);
  }, []);

  const onComplete = useCallback(() => setRevealed(true), []);

  return (
    <>
      <PortfolioLoader onReveal={onReveal} onComplete={onComplete} />
      <PointerLayer />

      {/*
        #site is the gate the intro CSS toggles. Everything the visitor
        eventually interacts with lives inside it; the loader and the custom
        cursor deliberately do not.
      */}
      <div id="site">
        <a
          href="#about"
          className="bg-signal text-primary-foreground sr-only rounded-full px-4 py-2 text-sm focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[130]"
        >
          Skip to content
        </a>

        {/* Ambient layer only starts once it can actually be seen. */}
        {revealed ? <AmbientMotion /> : null}
        <SiteNav active={active} onOpenPalette={() => setPalette(true)} />
        <CommandPalette open={palette} setOpen={setPalette} />

        <main className="relative z-10">
          <Hero reveal={revealed} />
          <About />
          <Experience />
          <ProjectGallery />
          <StackToolbox />
          <Process />
          <EducationLeadership />
          <Contact />
        </main>
      </div>
    </>
  );
}
