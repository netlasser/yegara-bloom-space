import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import heroVideo from "@/assets/yegara-hero.mp4.asset.json";
import loungeAsset from "@/assets/yegara-lounge.jpg.asset.json";
import { Button } from "@/components/ui/button";

/**
 * Helper to resolve asset URLs from the project's metadata files.
 * Handles both development and production environments.
 */
function resolveAsset(asset: any): string {
  if (!asset) return "";
  if (typeof asset === 'string') return asset;
  return asset.url || "";
}

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  const videoUrl = resolveAsset(heroVideo);
  const posterUrl = resolveAsset(loungeAsset);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoError || !videoUrl) return undefined;

    video.defaultMuted = true;
    video.muted = true;

    const handleCanPlay = () => {
      video.play().catch(() => undefined);
    };

    video.addEventListener("canplay", handleCanPlay);
    return () => video.removeEventListener("canplay", handleCanPlay);
  }, [videoUrl, videoError]);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-ink text-cream">
      {/* Background Media Container */}
      <div className="absolute inset-0 z-0 h-full w-full">
        {!videoError && videoUrl ? (
          <video 
            ref={videoRef}
            className="h-full w-full object-cover" 
            autoPlay 
            muted 
            loop 
            playsInline 
            poster={posterUrl || undefined}
            aria-hidden="true"
            preload="metadata"
            onError={() => setVideoError(true)}
          >
            <source src={videoUrl} type="video/mp4" />
            {/* Native browser fallback if source tag fails */}
            {posterUrl && (
              <img 
                src={posterUrl} 
                alt="Yegara Space Hero Fallback" 
                className="h-full w-full object-cover" 
              />
            )}
          </video>
        ) : (
          posterUrl && (
            <img 
              src={posterUrl} 
              alt="Yegara Space Hero" 
              className="h-full w-full object-cover" 
            />
          )
        )}
        {/* Dark Overlay for Text Legibility */}
        <div className="absolute inset-0 z-[1] bg-ink/50" aria-hidden="true" />
      </div>

      {/* Hero Content */}
      <div className="section-shell relative z-10 flex h-full flex-col justify-end pb-16 pt-32">
        <div className="mb-8 flex items-center justify-between border-b border-cream/30 pb-4">
          <p className="eyebrow text-orange/90 font-bold">Premium Coworking · Kazanchis, Addis Ababa</p>
          <ArrowDownRight className="h-6 w-6 text-orange" />
        </div>
        
        <div className="max-w-7xl">
          <h1 className="display-title mb-8">
            ONE SPACE.<br />
            <span className="text-orange font-black">MANY POSSIBILITIES.</span>
          </h1>
          
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-lg leading-relaxed text-cream/95 md:text-xl font-medium">
              From your first solo sprint to your next big boardroom decision — Yegara Space moves with you.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild variant="yegara" size="lg" className="h-14 px-8 text-sm font-bold uppercase tracking-widest">
                <a href="#visit">Book a visit <ArrowUpRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button asChild variant="yegara-light" size="lg" className="h-14 px-8 text-sm font-bold uppercase tracking-widest border-2">
                <a href="#spaces">Explore spaces <ArrowDownRight className="ml-2 h-4 w-4" /></a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

