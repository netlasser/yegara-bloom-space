import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, Coffee, Menu, Sparkles, Users, Wifi, X } from "lucide-react";
import { useState } from "react";

import heroVideo from "@/assets/yegara-hero.mp4.asset.json";
import desksAsset from "@/assets/yegara-desks.jpg.asset.json";
import officeOneAsset from "@/assets/yegara-office-one.jpg.asset.json";
import officeExecAsset from "@/assets/yegara-office-exec.jpg.asset.json";
import boardroomAsset from "@/assets/yegara-boardroom.jpg.asset.json";
import loungeAsset from "@/assets/yegara-lounge.jpg.asset.json";
import cafeAsset from "@/assets/yegara-cafe.jpg.asset.json";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    title: "Yegara Space — Premium Coworking in Addis Ababa",
    meta: [
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

const desks = desksAsset.url, officeOne = officeOneAsset.url, officeExec = officeExecAsset.url;
const boardroom = boardroomAsset.url, lounge = loungeAsset.url, cafe = cafeAsset.url;

const moreSpaces = [
  { n: "03", title: "Cubicles", note: "Quiet corners, real productivity.", image: desks, pos: "object-[20%_60%]" },
  { n: "04", title: "Hot Desks", note: "Drop in, plug in, get it done.", image: lounge, pos: "object-[60%_70%]" },
  { n: "05", title: "Phone Booths", note: "For the calls that need privacy.", image: null, pos: "" },
  { n: "06", title: "Meeting Rooms", note: "Where ideas get sharper.", image: null, pos: "" },
] as const;

function Photo({ src, alt, className = "", pos = "object-center" }: { src: string; alt: string; className?: string; pos?: string }) {
  return <div className={`group overflow-hidden bg-ink ${className}`}>
    <img src={src} alt={alt} width={778} height={400} loading="lazy" decoding="async" className={`h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04] ${pos}`} />
  </div>;
}

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
    <section className="relative min-h-[100svh] overflow-hidden bg-ink text-cream">
      <video className="absolute inset-0 h-full w-full object-cover" src={heroVideo.url} poster={lounge} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
      <div className="absolute inset-0 bg-ink/55" />
      <div className="section-shell relative flex min-h-[100svh] flex-col justify-end pb-10 pt-32">
        <div className="mb-7 flex items-center justify-between border-b border-cream/40 pb-4">
          <p className="eyebrow">Premium coworking · Kazanchis, Addis Ababa</p>
          <ArrowDownRight className="h-6 w-6 text-orange" />
        </div>
        <h1 className="display-title max-w-6xl">One space.<br/><span className="text-orange">Many possibilities.</span></h1>
        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-base leading-relaxed text-cream/85 md:text-lg">From your first solo sprint to your next big boardroom decision — Yegara Space moves with you.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="yegara" size="lg" className="h-12 px-7 font-bold uppercase"><a href="#visit">Book a visit <ArrowUpRight /></a></Button>
            <Button asChild variant="yegara-light" size="lg" className="h-12 px-7 font-bold uppercase"><a href="#spaces">Explore spaces <ArrowDownRight /></a></Button>
          </div>
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
        <p className="reveal mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:ml-[25%]">From focused solo work to boardroom decisions, there is a space for the way you work.</p>

        <div className="mt-16 grid gap-14 md:grid-cols-12 md:gap-8">
          <article className="md:col-span-7">
            <div className="relative">
              <Photo src={officeOne} alt="1-person private office with wood cabinetry at Yegara Space" className="aspect-[4/3]" pos="object-[50%_60%]" />
              <Photo src={officeExec} alt="Executive office with yellow lounge chairs at Yegara Space" className="absolute -bottom-10 right-4 hidden aspect-[4/3] w-[38%] border-4 border-cream md:block" />
            </div>
            <div className="mt-6 flex items-start gap-5 border-t border-ink/25 pt-5 md:mt-16 md:pr-[42%]">
              <span className="eyebrow text-orange">01</span>
              <div><h3 className="text-3xl font-bold uppercase md:text-5xl">Private Offices</h3><p className="mt-2 text-muted-foreground">Executive &amp; 1-Person, for focus that means business.</p></div>
            </div>
          </article>
          <article className="md:col-span-5 md:pt-32">
            <Photo src={desks} alt="Open workspace with rows of dedicated desks at Yegara Space" className="aspect-[4/5]" pos="object-[45%_50%]" />
            <div className="mt-6 flex items-start gap-5 border-t border-ink/25 pt-5">
              <span className="eyebrow text-orange">02</span>
              <div><h3 className="text-3xl font-bold uppercase md:text-5xl">Dedicated Desks</h3><p className="mt-2 text-muted-foreground">Your seat, every day.</p></div>
            </div>
          </article>
        </div>

        <div className="mt-20 border-t border-ink md:mt-28">
          {moreSpaces.map((item) => <article key={item.title} className="group grid items-center gap-4 border-b border-ink/25 py-6 md:grid-cols-12 md:gap-8 md:py-8">
            <span className="eyebrow text-orange md:col-span-1">{item.n}</span>
            <h3 className="text-4xl font-bold uppercase transition-colors group-hover:text-orange md:col-span-5 md:text-6xl">{item.title}</h3>
            <p className="text-muted-foreground md:col-span-3">{item.note}</p>
            <div className="md:col-span-3">{item.image
              ? <Photo src={item.image} alt={`${item.title} at Yegara Space`} className="aspect-[16/9]" pos={item.pos} />
              : <div className="hidden aspect-[16/9] items-center justify-center border border-ink/25 md:flex"><SunMark className="h-14 w-14 text-orange" /></div>}</div>
          </article>)}
        </div>

        <article className="mt-20 md:mt-28">
          <Photo src={boardroom} alt="Yegara Space boardroom with long table and leather chairs" className="aspect-[4/3] md:aspect-[21/9]" pos="object-[50%_55%]" />
          <div className="mt-6 grid gap-4 border-t border-ink/25 pt-5 md:grid-cols-12 md:gap-8">
            <span className="eyebrow text-orange md:col-span-1">07</span>
            <h3 className="text-4xl font-bold uppercase md:col-span-6 md:text-7xl">Boardroom</h3>
            <p className="text-lg text-muted-foreground md:col-span-5 md:pt-3">For the moments that matter most.</p>
          </div>
        </article>
      </div>
    </section>

    <section id="community" className="overflow-hidden bg-ink py-24 text-cream md:py-36">
      <div className="section-shell">
        <SectionIntro number="02" label="Community" title={<>Work. Connect. <span className="text-orange">Create.</span></>} />
        <div className="mt-16 grid items-start gap-10 md:grid-cols-12">
          <div className="group overflow-hidden md:col-span-8"><img src={lounge} alt="Yegara Space shared lounge with orange walls and an indoor tree" width={778} height={458} loading="lazy" className="aspect-[4/3] h-full w-full object-cover object-[45%_60%] transition duration-700 group-hover:scale-[1.025]" /></div>
          <div className="reveal md:col-span-4 md:pt-20">
            <SunMark className="mb-10 h-20 w-20 text-orange" />
            <p className="text-2xl leading-snug">Yegara isn’t just a place to rent a desk. It’s a professional home where people meet, collaborate and build together.</p>
            <p className="mt-8 border-t border-cream/25 pt-6 text-sm leading-relaxed text-cream/65">From a quick exchange in the lounge to a new partnership over coffee, the right connections happen naturally here.</p>
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
        <div className="reveal md:pr-10"><p className="eyebrow mb-8"><span className="text-orange">08</span> · In-house Café</p><h2 className="text-5xl font-bold uppercase leading-[0.9] md:text-7xl">Great work runs on <span className="text-orange">great coffee.</span></h2><p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">In-house Café — because great work runs on great coffee.</p>
          <Photo src={lounge} alt="Café seating with orange and yellow chairs" className="mt-10 hidden aspect-[16/10] w-2/3 md:block" pos="object-[70%_80%]" /></div>
        <div className="relative"><Photo src={cafe} alt="Yegara Space in-house café bar with wooden stools" className="aspect-[4/5]" pos="object-[45%_60%]" /><SunMark className="pointer-events-none absolute right-5 top-5 h-20 w-20 text-orange" /></div>
      </div>
    </section>

    <section id="visit" className="relative overflow-hidden bg-ink py-24 text-cream md:py-36">
      <div className="section-shell grid gap-14 md:grid-cols-[2fr_1fr] md:items-end">
        <div><p className="eyebrow mb-10 text-orange">Come see it for yourself</p><h2 className="display-title">Your next<br/><span className="text-orange">workday</span><br/>starts here.</h2></div>
        <div className="border-l border-cream/25 pl-6 md:pl-10">
          <p className="eyebrow text-cream/50">Find us</p><address className="mt-5 text-2xl font-bold not-italic leading-snug">Yegara Space<br/>Bloom Tower, 3rd Floor<br/>Kazanchis<br/>Addis Ababa, Ethiopia</address>
          <Button asChild variant="yegara" size="lg" className="mt-8 h-12 w-full font-bold uppercase"><a href="https://www.instagram.com/yegaraspace.et/" target="_blank" rel="noreferrer">Book a visit <ArrowUpRight /></a></Button>
        </div>
      </div>
      <SunMark className="absolute -bottom-40 -right-40 h-[34rem] w-[34rem] text-cream/5" />
    </section>

    <footer className="bg-ink pb-10 text-cream"><div className="section-shell border-t border-cream/20 pt-10"><div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between"><div><Logo light/><p className="mt-5 max-w-xs text-sm text-cream/55">One space, many possibilities.<br/>Made in Addis Ababa.</p></div><div className="flex flex-col gap-3 text-sm md:text-right"><a className="hover:text-orange" href="https://www.instagram.com/yegaraspace.et/" target="_blank" rel="noreferrer">Instagram @yegaraspace.et</a><a className="hover:text-orange" href="#top">Back to top ↑</a></div></div><p className="mt-16 text-[0.65rem] uppercase tracking-[0.16em] text-cream/35">© 2026 Yegara Space. All rights reserved.</p></div></footer>
  </main>;
}