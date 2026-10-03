import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useInquiry } from "@/components/inquiry";

export function SunMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={`sun-turn ${className}`}>
      <circle cx="50" cy="50" r="14" fill="currentColor" />
      {Array.from({ length: 16 }).map((_, index) => (
        <line key={index} x1="50" y1="5" x2="50" y2="28" stroke="currentColor" strokeWidth="2" transform={`rotate(${index * 22.5} 50 50)`} />
      ))}
    </svg>
  );
}

export function Photo({ src, alt, className = "", pos = "object-center", eager = false }: { src: string; alt: string; className?: string; pos?: string; eager?: boolean }) {
  return (
    <div className={`group overflow-hidden bg-ink ${className}`}>
      <img src={src} alt={alt} width={1200} height={800} loading={eager ? "eager" : "lazy"} decoding="async"
        className={`h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.05] ${pos}`} />
    </div>
  );
}

/** Typographic stand-in for spaces without real photography yet. */
export function SunPanel({ label, className = "", dark = false }: { label: string; className?: string; dark?: boolean }) {
  return (
    <div className={`relative flex items-end overflow-hidden border p-6 ${dark ? "border-cream/25 bg-ink text-cream" : "border-ink/25 bg-cream text-ink"} ${className}`}>
      <SunMark className="absolute -right-10 -top-10 h-56 w-56 text-orange" />
      <span className="relative text-4xl font-bold uppercase leading-[0.9] md:text-5xl">{label}</span>
    </div>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" aria-label="Yegara Space home" className={`flex items-center gap-2 text-2xl font-bold lowercase ${light ? "text-cream" : "text-ink"}`}>
      <SunMark className="h-7 w-7 text-orange" />
      <span>yegara<span className="text-orange">.</span></span>
    </Link>
  );
}

const anchors = [["Amenities", "/#amenities"], ["Community", "/#community"], ["About", "/#about"]] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { openInquiry } = useInquiry();
  const linkCls = "eyebrow transition-colors hover:text-orange";
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cream/15 bg-ink/95 text-cream backdrop-blur-sm">
      <div className="section-shell flex h-20 items-center justify-between">
        <Logo light />
        <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">
          <Link to="/spaces" className={linkCls} activeProps={{ className: "text-orange" }}>Spaces</Link>
          {anchors.map(([label, href]) => <a key={href} href={href} className={linkCls}>{label}</a>)}
        </nav>
        <Button variant="yegara" size="lg" className="hidden h-11 px-6 font-bold uppercase tracking-[0.12em] md:inline-flex" onClick={() => openInquiry()}>
          Book a visit <ArrowUpRight />
        </Button>
        <Button variant="ghost" size="icon" className="text-cream hover:bg-cream/10 hover:text-orange md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && <nav aria-label="Mobile navigation" className="border-t border-cream/15 bg-ink px-4 py-7 md:hidden">
        <div className="flex flex-col gap-5">
          <Link to="/spaces" onClick={() => setOpen(false)} className="text-3xl font-bold uppercase">Spaces</Link>
          {anchors.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="text-3xl font-bold uppercase">{label}</a>)}
        </div>
        <Button variant="yegara" className="mt-7 h-12 w-full" onClick={() => { setOpen(false); openInquiry(); }}>Book a visit <ArrowUpRight /></Button>
      </nav>}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink pb-10 text-cream">
      <div className="section-shell border-t border-cream/20 pt-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm text-cream/55">One space, many possibilities.<br />Made in Addis Ababa.</p>
          </div>
          <div className="flex flex-col gap-3 text-sm md:text-right">
            <Link className="hover:text-orange" to="/spaces">All spaces</Link>
            <a className="hover:text-orange" href="https://www.instagram.com/yegaraspace.et/" target="_blank" rel="noreferrer">Instagram @yegaraspace.et</a>
          </div>
        </div>
        <p className="mt-16 text-[0.65rem] uppercase tracking-[0.16em] text-cream/35">© 2026 Yegara Space. All rights reserved.</p>
      </div>
    </footer>
  );
}
