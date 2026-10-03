import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Footer, Header, Photo, SunMark, SunPanel } from "@/components/site";
import { useInquiry } from "@/components/inquiry";
import { Button } from "@/components/ui/button";
import { getSpace } from "@/lib/spaces";

export const Route = createFileRoute("/spaces/$slug")({
  loader: ({ params }) => {
    const space = getSpace(params.slug);
    if (!space) throw notFound();
    return { slug: space.slug };
  },
  head: ({ loaderData }) => {
    const space = loaderData ? getSpace(loaderData.slug) : undefined;
    if (!space) return { meta: [{ title: "Space not found | Yegara Space" }, { name: "robots", content: "noindex" }] };
    const title = `${space.name} in Addis Ababa | Yegara Space`;
    const desc = `${space.name} at Yegara Space — ${space.tagline} Bloom Tower, 3rd Floor, Kazanchis.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: SpaceNotFound,
  component: SpaceDetail,
});

function SpaceNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ink px-4 text-center text-cream">
      <h1 className="display-title">Space<br /><span className="text-orange">not found.</span></h1>
      <Link to="/spaces" className="eyebrow border-b border-orange pb-1 hover:text-orange">See all spaces</Link>
    </main>
  );
}

function SpaceDetail() {
  const { slug } = Route.useLoaderData();
  const space = getSpace(slug)!;
  const { openInquiry } = useInquiry();
  const [hero, ...gallery] = space.images;
  const related = space.related.map(getSpace).filter((x) => x !== undefined);

  return (
    <main className="bg-background text-foreground">
      <Header />

      <section className="relative overflow-hidden bg-ink pb-16 pt-36 text-cream md:pb-24 md:pt-44">
        <div className="section-shell relative z-10">
          <Link to="/spaces" className="eyebrow inline-flex items-center gap-2 text-cream/70 hover:text-orange"><ArrowLeft className="h-4 w-4" /> All spaces</Link>
          <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="eyebrow text-orange">{space.n} — Yegara Space</p>
              <h1 className="display-title mt-6">{space.name}</h1>
            </div>
            <p className="text-lg leading-relaxed text-cream/80 md:col-span-4">{space.tagline}</p>
          </div>
          <div className="mt-12">
            {hero
              ? <Photo src={hero.src} alt={hero.alt} pos={hero.pos} className="aspect-[4/3] md:aspect-[21/9]" eager />
              : <SunPanel label={space.name} className="aspect-[4/3] md:aspect-[21/9]" dark />}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="section-shell grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="reveal text-3xl font-bold uppercase leading-[1] md:text-5xl">{space.intro}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button variant="yegara" size="lg" className="h-12 px-8 font-bold uppercase tracking-[0.12em]" onClick={() => openInquiry(space.name)}>Book a visit <ArrowUpRight /></Button>
              <Button variant="yegara-outline" size="lg" className="h-12 px-8 font-bold uppercase tracking-[0.12em]" onClick={() => openInquiry(space.name)}>Ask about this space</Button>
            </div>
          </div>
          <dl className="border-t border-ink md:col-span-4 md:col-start-9">
            {space.facts.map((f) => (
              <div key={f.label} className="border-b border-ink/25 py-5">
                <dt className="eyebrow text-orange">{f.label}</dt>
                <dd className="mt-2 text-lg font-bold">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="bg-cream pb-20 md:pb-28">
          <div className="section-shell grid gap-6 md:grid-cols-12">
            {gallery.map((img) => (
              <Photo key={img.src} src={img.src} alt={img.alt} pos={img.pos} className="aspect-[4/3] md:col-span-8 md:col-start-5" />
            ))}
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-orange py-16 text-ink md:py-24">
        <div className="section-shell relative z-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="text-5xl font-bold uppercase leading-[0.9] md:text-7xl">Talk to us about<br /><span className="text-cream">availability.</span></h2>
          <Button variant="yegara-outline" size="lg" className="h-12 border-ink px-8 font-bold uppercase" onClick={() => openInquiry(space.name)}>Ask about this space <ArrowUpRight /></Button>
        </div>
        <SunMark className="absolute -right-20 -top-20 h-80 w-80 text-ink/10" />
      </section>

      {related.length > 0 && (
        <section className="bg-cream py-20 md:py-28">
          <div className="section-shell">
            <p className="eyebrow border-t border-ink/25 pt-5">Explore more spaces</p>
            <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
              {related.map((r) => (
                <Link key={r.slug} to="/spaces/$slug" params={{ slug: r.slug }} className="group block">
                  {r.images[0]
                    ? <Photo src={r.images[0].src} alt={r.images[0].alt} pos={r.images[0].pos} className="aspect-[4/3]" />
                    : <SunPanel label={r.name} className="aspect-[4/3]" dark />}
                  <div className="mt-5 flex items-start gap-4 border-t border-ink/25 pt-4">
                    <span className="eyebrow text-orange">{r.n}</span>
                    <div>
                      <h3 className="text-2xl font-bold uppercase transition-colors group-hover:text-orange md:text-3xl">{r.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{r.tagline}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </main>
  );
}
