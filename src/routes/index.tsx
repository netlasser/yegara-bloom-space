import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, Coffee, Menu, Sparkles, Users, Wifi, X } from "lucide-react";
import { useState } from "react";

import heroImage from "@/assets/yegara-hero.jpg";
import officeImage from "@/assets/yegara-private-office.jpg";
import communityImage from "@/assets/yegara-community.jpg";
import cafeImage from "@/assets/yegara-cafe.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yegara Space — Premium Coworking in Addis Ababa" },
      { name: "description", content: "Private offices, dedicated desks, hot desks and meeting rooms at Bloom Tower in Kazanchis. One space, many possibilities." },
      { property: "og:title", content: "Yegara Space — One Space, Many Possibilities" },
      { property: "og:description", content: "Addis Ababa's premium coworking space for professionals, entrepreneurs and growing teams." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const navItems = [
  ["Spaces", "#spaces"], ["Amenities", "#amenities"], ["Community", "#community"], ["About", "#about"],
] as const;

const spaces = [
  { title: "Private Offices", note: "A space of your own", image: officeImage, pos: "object-center" },
  { title: "Dedicated Desks", note: "Your desk, every day", image: heroImage, pos: "object-left" },
  { title: "Hot Desks", note: "Drop in. Get going.", image: communityImage, pos: "object-center" },
  { title: "Meeting Rooms", note: "Meet with intention", image: heroImage, pos: "object-right" },
] as const;

function SunMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={`sun-turn ${className}`}>
      <circle cx="50" cy="50" r="14" fill="currentColor" />
      {Array.from({ length: 16 }).map((_, index) => (
        <line key={index} x1="50" y1="5" x2="50" y2="28" stroke="currentColor" strokeWidth="2" transform={`rotate(${index * 22.5} 50 50)`} />
      ))}
    </svg>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" aria-label="Yegara Space home" className={`flex items-center gap-2 text-2xl font-bold lowercase ${light ? "text-cream" : "text-ink"}`}>
      <SunMark className="h-7 w-7 text-orange" />
      <span>yegara<span className="text-orange">.</span></span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cream/15 bg-ink/95 text-cream backdrop-blur-sm">
      <div className="section-shell flex h-20 items-center justify-between">
        <Logo light />
        <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">
          {navItems.map(([label, href]) => <a key={href} href={href} className="eyebrow transition-colors hover:text-orange">{label}</a>)}
        </nav>
        <Button asChild variant="yegara" size="lg" className="hidden h-11 px-6 font-bold uppercase tracking-[0.12em] md:inline-flex">
          <a href="#visit">Book a visit <ArrowUpRight /></a>
        </Button>
        <Button variant="ghost" size="icon" className="text-cream hover:bg-cream/10 hover:text-orange md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && <nav aria-label="Mobile navigation" className="border-t border-cream/15 bg-ink px-4 py-7 md:hidden">
        <div className="flex flex-col gap-5">{navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="text-3xl font-bold uppercase">{label}</a>)}</div>
        <Button asChild variant="yegara" className="mt-7 h-12 w-full"><a href="#visit" onClick={() => setOpen(false)}>Book a visit <ArrowUpRight /></a></Button>
      </nav>}
    </header>
  );
}

function SectionIntro({ number, label, title }: { number: string; label: string; title: React.ReactNode }) {
  return <div className="reveal grid gap-6 border-t border-current/25 pt-5 md:grid-cols-[1fr_3fr]">
    <div className="eyebrow flex gap-3"><span>{number}</span><span>{label}</span></div>
    <h2 className="text-5xl font-bold uppercase leading-[0.92] md:text-7xl lg:text-8xl">{title}</h2>
  </div>;
}

function HomePage() {
  return <main id="top" className="bg-background text-foreground">
    <Header />
    <section className="relative min-h-[92svh] overflow-hidden bg-ink text-cream">
      <img src={heroImage} alt="Yegara's shared workspace overlooking Addis Ababa" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-ink/45" />
      <div className="section-shell relative flex min-h-[92svh] flex-col justify-end pb-10 pt-32">
        <div className="mb-7 flex items-center justify-between border-b border-cream/40 pb-4">
          <p className="eyebrow">Premium coworking · Addis Ababa</p>
          <ArrowDownRight className="h-6 w-6 text-orange" />
        </div>
        <h1 className="display-title max-w-6xl">One space.<br/><span className="text-orange">Many possibilities.</span></h1>
        <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-base leading-relaxed text-cream/80">A considered place to focus, collaborate and grow—made for Addis Ababa's professionals, entrepreneurs and teams.</p>
          <Button asChild variant="yegara-light" size="lg" className="h-12 px-7 font-bold uppercase"><a href="#spaces">Explore the space <ArrowDownRight /></a></Button>
        </div>
      </div>
    </section>

    <section id="about" className="relative overflow-hidden bg-orange py-24 md:py-36">
      <div className="section-shell relative z-10">
        <p className="eyebrow mb-14">Yegara means ours</p>
        <p className="reveal max-w-6xl font-display text-5xl font-bold uppercase leading-[0.94] md:text-7xl lg:text-8xl">Not just where you work. <span className="text-cream">Where ideas meet people,</span> ambition finds momentum, and work feels more human.</p>
      </div>
      <SunMark className="absolute -right-24 -top-24 h-[32rem] w-[32rem] text-ink/10" />
    </section>

    <section id="spaces" className="bg-cream py-24 md:py-36">
      <div className="section-shell">
        <SectionIntro number="01" label="Spaces" title={<>Find your <span className="text-orange">space.</span></>} />
        <div className="mt-14 grid gap-px bg-ink md:grid-cols-2">
          {spaces.map((space, index) => <article key={space.title} className="group relative aspect-[5/4] overflow-hidden bg-ink">
            <img src={space.image} alt={`${space.title} at Yegara Space`} width={index === 0 ? 1200 : 1400} height={index === 0 ? 1504 : 1104} loading="lazy" className={`h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-95 ${space.pos}`} />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-ink/82 p-6 text-cream md:p-9">
              <div><p className="eyebrow mb-2 text-orange">0{index + 1}</p><h3 className="text-3xl font-bold uppercase md:text-5xl">{space.title}</h3><p className="mt-2 text-sm text-cream/70">{space.note}</p></div>
              <span className="grid h-11 w-11 place-items-center border border-cream/50 text-orange transition group-hover:bg-orange group-hover:text-ink"><ArrowUpRight /></span>
            </div>
          </article>)}
        </div>
      </div>
    </section>

    <section id="community" className="overflow-hidden bg-ink py-24 text-cream md:py-36">
      <div className="section-shell">
        <SectionIntro number="02" label="Community" title={<>Work. Connect. <span className="text-orange">Create.</span></>} />
        <div className="mt-16 grid items-start gap-10 md:grid-cols-12">
          <div className="group overflow-hidden md:col-span-8"><img src={communityImage} alt="Yegara members working and connecting in the shared lounge" width={1408} height={1104} loading="lazy" className="aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" /></div>
          <div className="reveal md:col-span-4 md:pt-20">
            <SunMark className="mb-10 h-20 w-20 text-orange" />
            <p className="text-2xl leading-snug">The best work rarely happens in isolation. Yegara brings thoughtful people into one shared rhythm.</p>
            <p className="mt-8 border-t border-cream/25 pt-6 text-sm leading-relaxed text-cream/65">From a quick exchange over coffee to a room full of new perspectives, our community makes space for what comes next.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="amenities" className="bg-cream py-24 md:py-36">
      <div className="section-shell">
        <SectionIntro number="03" label="Amenities" title={<>Everything you need. <span className="text-orange">Nothing you don't.</span></>} />
        <div className="mt-16 grid border-y border-ink/25 md:grid-cols-2 lg:grid-cols-4">
          {[
            [Wifi, "Reliable connectivity", "Fast, dependable Wi-Fi throughout the space."],
            [Coffee, "In-house café", "Excellent coffee, lunch breaks and easy conversation."],
            [Users, "Meeting ready", "Considered rooms for focused conversations and presentations."],
            [Sparkles, "Everyday comfort", "Thoughtful interiors, natural light and practical support."],
          ].map(([Icon, title, text], index) => { const AmenityIcon = Icon as typeof Wifi; return <div key={String(title)} className="border-b border-ink/25 py-9 md:px-8 md:first:pl-0 md:[&:nth-child(2n+1)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0">
            <div className="mb-12 flex items-center justify-between"><AmenityIcon className="h-7 w-7 text-orange"/><span className="eyebrow">0{index + 1}</span></div><h3 className="text-2xl font-bold uppercase">{String(title)}</h3><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{String(text)}</p>
          </div>})}
        </div>
      </div>
    </section>

    <section className="bg-orange py-8"><div className="overflow-hidden whitespace-nowrap font-display text-5xl font-bold uppercase text-ink md:text-7xl">Ideas need room to grow · Ideas need room to grow · Ideas need room to grow ·</div></section>

    <section className="bg-cream py-24 md:py-36">
      <div className="section-shell grid items-center gap-12 md:grid-cols-2">
        <div className="reveal md:pr-10"><p className="eyebrow mb-8">Yegara Café</p><h2 className="text-6xl font-bold uppercase leading-[0.9] md:text-8xl">Good work starts with <span className="text-orange">good coffee.</span></h2><p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">Our in-house café keeps the day moving—whether you're resetting between meetings or continuing a conversation over a carefully made cup.</p></div>
        <div className="group relative overflow-hidden"><img src={cafeImage} alt="Ethiopian coffee served at Yegara Café" width={1200} height={1504} loading="lazy" className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.03]"/><SunMark className="absolute right-5 top-5 h-20 w-20 text-orange" /></div>
      </div>
    </section>

    <section id="visit" className="relative overflow-hidden bg-ink py-24 text-cream md:py-36">
      <div className="section-shell grid gap-14 md:grid-cols-[2fr_1fr] md:items-end">
        <div><p className="eyebrow mb-10 text-orange">Come see it for yourself</p><h2 className="display-title">Your next<br/><span className="text-orange">chapter</span><br/>starts here.</h2></div>
        <div className="border-l border-cream/25 pl-6 md:pl-10">
          <p className="eyebrow text-cream/50">Find us</p><address className="mt-5 text-2xl font-bold not-italic leading-snug">Bloom Tower<br/>3rd Floor<br/>Kazanchis, Addis Ababa</address>
          <Button asChild variant="yegara" size="lg" className="mt-8 h-12 w-full font-bold uppercase"><a href="https://www.instagram.com/yegaraspace.et/" target="_blank" rel="noreferrer">Book a visit <ArrowUpRight /></a></Button>
        </div>
      </div>
      <SunMark className="absolute -bottom-40 -right-40 h-[34rem] w-[34rem] text-cream/5" />
    </section>

    <footer className="bg-ink pb-10 text-cream"><div className="section-shell border-t border-cream/20 pt-10"><div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between"><div><Logo light/><p className="mt-5 max-w-xs text-sm text-cream/55">One space, many possibilities.<br/>Made in Addis Ababa.</p></div><div className="flex flex-col gap-3 text-sm md:text-right"><a className="hover:text-orange" href="https://www.instagram.com/yegaraspace.et/" target="_blank" rel="noreferrer">Instagram @yegaraspace.et</a><a className="hover:text-orange" href="#top">Back to top ↑</a></div></div><p className="mt-16 text-[0.65rem] uppercase tracking-[0.16em] text-cream/35">© 2026 Yegara Space. All rights reserved.</p></div></footer>
  </main>;
}