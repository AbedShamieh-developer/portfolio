"use client";

import { useEffect } from "react";
import { Command } from "cmdk";
import { PROFILE, SECTIONS } from "@/data/portfolio";

export function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  useEffect(() => {
    let gPressed = 0;
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && /input|textarea/i.test(el.tagName)) return;

      if (e.key === "/" && !open) {
        e.preventDefault();
        setOpen(true);
        return;
      }
      if (e.key === "Escape") setOpen(false);
      if (open) return;

      if (e.key.toLowerCase() === "g") {
        gPressed = Date.now();
        return;
      }
      if (e.key.toLowerCase() === "h" && Date.now() - gPressed < 900) {
        window.open(PROFILE.github, "_blank", "noopener");
      }
      if (e.key.toLowerCase() === "e") {
        window.location.href = `mailto:${PROFILE.email}`;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const jump = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-start justify-center bg-obsidian/70 px-4 pt-[18vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <Command
        label="Command palette"
        loop
        className="surface w-full max-w-lg overflow-hidden rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <span className="label text-signal">CMD</span>
          <Command.Input
            autoFocus
            placeholder="Navigate the system…"
            className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <Command.List className="max-h-72 overflow-y-auto p-2">
          <Command.Empty className="label px-3 py-6">No matching route</Command.Empty>
          <Command.Group heading="Sections" className="label px-2 py-1">
            {SECTIONS.map((s) => (
              <Command.Item
                key={s.id}
                value={s.label}
                onSelect={() => jump(s.id)}
                className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 font-sans text-sm tracking-tight text-foreground normal-case data-[selected=true]:bg-accent"
              >
                <span className="label !text-[10px] text-signal">{s.num}</span>
                {s.label}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Projects" className="label px-2 py-1">
            <Command.Item
              value="Projects"
              onSelect={() => jump("projects")}
              className="cursor-pointer rounded-md px-2 py-2 font-sans text-sm tracking-tight text-foreground normal-case data-[selected=true]:bg-accent"
            >
              Selected Projects
            </Command.Item>
          </Command.Group>
          <Command.Group heading="Links" className="label px-2 py-1">
            <Command.Item
              value="GitHub"
              onSelect={() => window.open(PROFILE.github, "_blank", "noopener")}
              className="cursor-pointer rounded-md px-2 py-2 font-sans text-sm tracking-tight text-foreground normal-case data-[selected=true]:bg-accent"
            >
              GitHub <span className="label ml-2 !text-[10px]">G then H</span>
            </Command.Item>
            <Command.Item
              value="Email"
              onSelect={() => {
                window.location.href = `mailto:${PROFILE.email}`;
              }}
              className="cursor-pointer rounded-md px-2 py-2 font-sans text-sm tracking-tight text-foreground normal-case data-[selected=true]:bg-accent"
            >
              Email <span className="label ml-2 !text-[10px]">E</span>
            </Command.Item>
            <Command.Item
              value="Phone"
              onSelect={() => {
                window.location.href = `tel:${PROFILE.phone.replace(/\s/g, "")}`;
              }}
              className="cursor-pointer rounded-md px-2 py-2 font-sans text-sm tracking-tight text-foreground normal-case data-[selected=true]:bg-accent"
            >
              Phone
            </Command.Item>
          </Command.Group>
        </Command.List>
        <div className="flex items-center justify-between border-t border-border px-4 py-2">
          <span className="label !text-[10px]">BUILD STATUS: STABLE</span>
          <span className="label !text-[10px]">ESC to close</span>
        </div>
      </Command>
    </div>
  );
}
