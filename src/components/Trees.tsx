import { useMemo } from 'react';

export function Trees({ 
  scrollY, 
  maxScroll = 2500,
  startAt = 0.75,
  hideAt = 0.9 
}: { 
  scrollY: number;
  maxScroll?: number;
  startAt?: number;
  hideAt?: number;
}) {
  // Cache window height calculation
  const windowHeight = useMemo(() => {
    return typeof window !== 'undefined' ? window.innerHeight : 800;
  }, []);
  
  const { translateY, opacity, visible } = useMemo(() => {
    const scrollProgress = Math.min(scrollY / maxScroll, 1);
    
    // Trees move continuously from the start with parallax effect
    const translateY = scrollProgress * windowHeight * 1.2;
    
    // Calculate opacity - trees fade out between startAt and hideAt
    let opacityProgress = 1;
    
    if (scrollProgress >= startAt) {
      // Start fading when we reach startAt
      const fadeRange = hideAt - startAt;
      if (fadeRange > 0) {
        const fadeProgress = (scrollProgress - startAt) / fadeRange;
        opacityProgress = Math.max(0, 1 - fadeProgress);
      } else {
        // If startAt equals hideAt, hide immediately
        opacityProgress = 0;
      }
    }
    
    // Trees are visible until hideAt
    const opacity = opacityProgress;
    const visible = scrollProgress < hideAt;
    
    return { translateY, opacity, visible };
  }, [scrollY, maxScroll, startAt, hideAt, windowHeight]);
  
  return (
    <div
      className="fixed left-0 w-full z-40 will-change-transform pointer-events-none"
      style={{
        backgroundImage: `url(/mountains/trees.svg.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
        height: '130vh', // Extended height to ensure full coverage with no gaps
        bottom: '-10vh', // Start slightly below to cover any gaps
        transform: `translate3d(0, ${translateY}px, 0)`,
        opacity: visible ? Math.max(0, Math.min(1, opacity)) : 0,
        backfaceVisibility: 'hidden',
        perspective: 1000,
        transition: 'none', // No transitions for instant response
      }}
    />
  );
}
