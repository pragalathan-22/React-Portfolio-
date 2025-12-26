import { useMemo } from "react";
import { ParallaxLayer } from "./ParallaxLayer";
import { Trees } from "./Trees";

interface HeroParallaxProps {
  scrollY: number;
}

export function HeroParallax({ scrollY }: HeroParallaxProps) {
  const maxScroll = 2500; // Total scroll distance needed to hide all elements
  
  const { scrollProgress, bgOpacity } = useMemo(() => {
    const progress = Math.min(scrollY / maxScroll, 1);
    const opacity = progress < 0.95 ? 1 : Math.max(0, 1 - (progress - 0.95) * 20);
    return { scrollProgress: progress, bgOpacity: opacity };
  }, [scrollY, maxScroll]);

  return (
    <>
      {/* Solid background that covers content below - stays until all layers finish */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #f7b199, #a8b3c5, #2c3e50, #2c3e50)',
          opacity: bgOpacity,
          willChange: 'opacity',
        }}
      />
      
      <section className="relative w-full overflow-hidden" style={{ height: '400vh' }}>
        {/* Sky gradient - visible during parallax */}
        <div className="fixed inset-0 bg-linear-to-b from-[#f7b199] via-[#a8b3c5] to-[#2c3e50] z-0" />

      {/* BACK - First to move and hide */}
      <ParallaxLayer
        src="/mountains/Mountain-back.svg.png"
        scrollY={scrollY}
        speed={1.2}
        zIndex={1}
        baseOpacity={0.4}
        startAt={0}
        hideAt={0.15}
      />

      {/* FAR - Second to move and hide */}
      <ParallaxLayer
        src="/mountains/mountain-far.svg.png"
        scrollY={scrollY}
        speed={1.2}
        zIndex={2}
        baseOpacity={0.6}
        startAt={0.15}
        hideAt={0.3}
      />

      {/* MID - Third to move and hide */}
      <ParallaxLayer
        src="/mountains/mountain-mid.svg.png"
        scrollY={scrollY}
        speed={1.2}
        zIndex={3}
        baseOpacity={1}
        startAt={0.3}
        hideAt={0.45}
      />

      {/* FRONT - Fourth to move and hide */}
      <ParallaxLayer
        src="/mountains/mountain-front.svg.png"
        scrollY={scrollY}
        speed={1.2}
        zIndex={4}
        baseOpacity={1}
        startAt={0.45}
        hideAt={0.6}
      />

      {/* FOREGROUND - Fifth to move and hide */}
      <ParallaxLayer
        src="/mountains/mountain-foreground.svg.png"
        scrollY={scrollY}
        speed={1.2}
        zIndex={5}
        baseOpacity={1}
        startAt={0.6}
        hideAt={0.75}
      />

      {/* TREES - Last to move and hide */}
      <Trees scrollY={scrollY} maxScroll={maxScroll} startAt={0.75} hideAt={0.9} />

      {/* HERO TEXT */}
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        style={{
          opacity: 1 - scrollProgress * 1.5,
        }}
      >

      </div>
      </section>
    </>
  );
}
