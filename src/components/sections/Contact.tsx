import { PROFILE, SOCIALS } from "@/data/portfolio";
import { MagneticLink, Reveal } from "@/components/ui-bits";

export function Contact() {
  return (
    <section id="contact" className="relative px-5 pt-28 pb-12 sm:px-8 sm:pt-40">
      <div className="mx-auto w-full max-w-[86rem]">
        <Reveal>
          <h2 className="display-xl">
            <span className="block">LET&apos;S BUILD</span>
            <span className="block text-signal-gradient">SOMETHING RELIABLE.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 max-w-xl">
          <p className="text-base leading-relaxed text-muted-foreground">
            Backend engineering, software engineering, cloud systems and practical technical
            challenges.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex flex-wrap items-center gap-4">
          <MagneticLink href={`mailto:${PROFILE.email}`} cursor="OPEN ↗">
            Start a conversation <span aria-hidden>→</span>
          </MagneticLink>
        </Reveal>

        <Reveal delay={0.2} className="mt-16">
          <ul className="flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-8">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  data-cursor={s.kind === "external" ? "OPEN ↗" : "OPEN"}
                  {...(s.kind === "external"
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group inline-flex min-h-11 items-center gap-2 text-sm tracking-tight text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="relative">
                    {s.label}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-400 group-hover:scale-x-100" />
                  </span>
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:rotate-45"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.25} className="mt-24">
          <p className="label !text-[10px] text-foreground/70">
            Designed as a system. Built with intention.
          </p>
        </Reveal>
      </div>

      <footer className="mx-auto mt-10 flex w-full max-w-[86rem] flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
        <span className="label !text-[10px]">© {new Date().getFullYear()} Abdulrahman Shamieh</span>
        <span className="label !text-[10px]">BUILD STATUS: STABLE</span>
      </footer>
    </section>
  );
}
