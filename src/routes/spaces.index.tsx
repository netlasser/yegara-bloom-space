import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { Footer, Header, Photo, SunMark, SunPanel } from "@/components/site";
import { useInquiry } from "@/components/inquiry";
import { Button } from "@/components/ui/button";
import { getSpace, type Space } from "@/lib/spaces";

export const Route = createFileRoute("/spaces/")({
  head: () => ({
    meta: [
      { title: "Coworking Spaces in Addis Ababa | Yegara Space" },
      { name: "description", content: "Private offices, dedicated desks, cubicles, hot desks, phone booths, meeting rooms, a boardroom and an in-house café at Bloom Tower, Kazanchis." },
      { property: "og:title", content: "Spaces for the way you work | Yegara Space" },
      { property: "og:description", content: "Eight ways to work at Yegara Space, Bloom Tower, Kazanchis, Addis Ababa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SpacesPage,
});

const s = (slug: string) => getSpace(slug)!;

function Meta({ space, dark = false }: { space: Space; dark?: boolean }) {
  return (
    <div className={`reveal border-t pt-5 ${dark ? "border-cream/25" : "border-ink/25"}`}>
      <span className="eyebrow text-orange">{space.n} —</span>
      <h2 className="mt-3 text-4xl font-bold uppercase leading-[0.9] md:text-6xl">{space.name}</h2>
      <p className={`mt-4 max-w-md text-lg ${dark ? "text-cream/70" : "text-muted-foreground"}`}>{space.tagline}</p>
      <Link to="/spaces/$slug" params={{ slug: space.slug }} className="eyebrow mt-6 inline-flex items-center gap-2 border-b border-orange pb-1 transition-colors hover:text-orange">
        Explore {space.name} <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function BigNum({ n, dark = false }: { n: string; dark?: boolean }) {
  return <span aria-hidden="true" className={`pointer-events-none select-none font-display text-[7rem] font-bold leading-none md:text-[12rem] ${dark ? "text-cream/10" : "text-ink/10"}`}>{n}</span>;
}

function SpacesPage() {
  const { openInquiry } = useInquiry();
  const po = s("private-offices"), dd = s("dedicated-desks"), cu = s("cubicles"), hd = s("hot-desks"),
    pb = s("phone-booths"), mr = s("meeting-rooms"), br = s("boardroom"), cf = s("cafe");

  return (
    <main className="bg-background text-foreground">
      <Header />

      <section className="relative overflow-hidden bg-ink pb-20 pt-40 text-cream md:pb-32 md:pt-52">
        <div className="section-shell relative z-10">
          <p className="eyebrow mb-10 text-orange">Spaces · Bloom Tower, Kazanchis</p>
          <h1 className="display-title">Spaces for<br /><span className="text-orange">the way you work.</span></h1>
          <div className="mt-12 flex flex-col gap-8 border-t border-cream/25 pt-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-lg leading-relaxed text-cream/85 md:text-xl">From your first solo sprint to your next big boardroom decision — Yegara Space moves with you.</p>
            <Button variant="yegara" size="lg" className="h-14 px-8 font-bold uppercase tracking-widest" onClick={() => openInquiry()}>Book a visit <ArrowUpRight /></Button>
          </div>
        </div>
        <SunMark className="absolute -right-32 -top-20 h-[30rem] w-[30rem] text-cream/5" />
      </section>

      {/* 01 Private Offices */}
      <section className="bg-cream py-20 md:py-32">
        <div className="section-shell grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="relative min-w-0 md:col-span-8">
            <Photo src={po.images[0].src} alt={po.images[0].alt} pos={po.images[0].pos} className="aspect-[4/3]" eager />
            <Photo src={po.images[1].src} alt={po.images[1].alt} className="absolute -bottom-10 -right-2 hidden aspect-[4/3] w-[40%] border-4 border-cream md:block" />
          </div>
          <div className="min-w-0 md:col-span-4 md:flex md:flex-col md:justify-between">
            <BigNum n="01" />
            <Meta space={po} />
          </div>
        </div>
      </section>

      {/* 02 Dedicated Desks — reversed */}
      <section className="bg-cream pb-20 md:pb-32">
        <div className="section-shell grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="order-2 min-w-0 md:order-1 md:col-span-5 md:flex md:flex-col md:justify-end">
            <BigNum n="02" />
            <Meta space={dd} />
          </div>
          <div className="order-1 min-w-0 md:order-2 md:col-span-6 md:col-start-7">
            <Photo src={dd.images[0].src} alt={dd.images[0].alt} pos={dd.images[0].pos} className="aspect-[4/5]" />
          </div>
        </div>
      </section>

      {/* 03 Cubicles — wide editorial */}
      <section className="bg-ink py-20 text-cream md:py-32">
        <div className="section-shell">
          <Photo src={cu.images[0].src} alt={cu.images[0].alt} pos={cu.images[0].pos} className="aspect-[4/3] md:aspect-[21/9]" />
          <div className="mt-10 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3"><BigNum n="03" dark /></div>
            <div className="md:col-span-6 md:col-start-5"><Meta space={cu} dark /></div>
          </div>
        </div>
      </section>

      {/* 04 Hot Desks + 05 Phone Booths — asymmetric pair */}
      <section className="bg-cream py-20 md:py-32">
        <div className="section-shell grid gap-16 md:grid-cols-12 md:gap-8">
          <div className="min-w-0 md:col-span-7">
            <Photo src={hd.images[0].src} alt={hd.images[0].alt} pos={hd.images[0].pos} className="aspect-[16/11]" />
            <div className="mt-8 md:pr-[30%]"><Meta space={hd} /></div>
          </div>
          <div className="min-w-0 md:col-span-4 md:col-start-9 md:pt-48">
            <SunPanel label={pb.name} className="aspect-square" dark />
            <div className="mt-8"><Meta space={pb} /></div>
          </div>
        </div>
      </section>

      {/* 06 Meeting Rooms — typographic statement */}
      <section className="relative overflow-hidden bg-orange py-20 text-ink md:py-32">
        <div className="section-shell relative z-10 grid gap-10 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">{mr.n} — Meeting Rooms</p>
          <div className="md:col-span-9">
            <h2 className="text-5xl font-bold uppercase leading-[0.9] md:text-8xl">Where ideas<br /><span className="text-cream">get sharper.</span></h2>
            <div className="mt-10 flex flex-col gap-6 border-t border-ink/30 pt-6 md:flex-row md:items-center md:justify-between">
              <p className="max-w-md text-lg">{mr.intro}</p>
              <Link to="/spaces/$slug" params={{ slug: mr.slug }} className="eyebrow inline-flex items-center gap-2 border-b border-ink pb-1 hover:text-cream">Explore Meeting Rooms <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
        <SunMark className="absolute -bottom-24 -left-24 h-[26rem] w-[26rem] text-ink/10" />
      </section>

      {/* 07 Boardroom — formal, substantial */}
      <section className="bg-ink py-20 text-cream md:py-36">
        <div className="section-shell">
          <div className="grid gap-6 border-t border-cream/25 pt-6 md:grid-cols-12">
            <span className="eyebrow text-orange md:col-span-3">{br.n} — Boardroom</span>
            <h2 className="text-5xl font-bold uppercase leading-[0.9] md:col-span-9 md:text-8xl">For the moments<br /><span className="text-orange">that matter most.</span></h2>
          </div>
          <Photo src={br.images[0].src} alt={br.images[0].alt} pos={br.images[0].pos} className="mt-12 aspect-[4/3] md:aspect-[21/9]" />
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-lg text-lg text-cream/70">{br.intro}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="yegara" size="lg" className="h-12 px-6 font-bold uppercase" onClick={() => openInquiry(br.name)}>Book a visit <ArrowUpRight /></Button>
              <Button asChild variant="yegara-light" size="lg" className="h-12 px-6 font-bold uppercase"><Link to="/spaces/$slug" params={{ slug: br.slug }}>Explore Boardroom</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* 08 Café — lifestyle */}
      <section className="bg-cream py-20 md:py-32">
        <div className="section-shell grid items-center gap-12 md:grid-cols-12">
          <div className="relative min-w-0 md:col-span-6">
            <Photo src={cf.images[0].src} alt={cf.images[0].alt} pos={cf.images[0].pos} className="aspect-[4/5]" />
            <SunMark className="pointer-events-none absolute right-5 top-5 h-20 w-20 text-orange" />
          </div>
          <div className="min-w-0 md:col-span-5 md:col-start-8">
            <BigNum n="08" />
            <Meta space={cf} />
            <Photo src={cf.images[1].src} alt={cf.images[1].alt} pos={cf.images[1].pos} className="mt-10 hidden aspect-[16/10] w-2/3 md:block" />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 text-cream md:py-32">
        <div className="section-shell flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <h2 className="display-title">Not sure<br /><span className="text-orange">which space?</span></h2>
          <div className="max-w-sm">
            <p className="text-lg text-cream/75">Come see Yegara Space at Bloom Tower, 3rd Floor, Kazanchis — we'll help you find the right fit.</p>
            <Button variant="yegara" size="lg" className="mt-8 h-12 w-full font-bold uppercase" onClick={() => openInquiry()}>Book a visit <ArrowUpRight /></Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
