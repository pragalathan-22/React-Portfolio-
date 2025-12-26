interface ParallaxLayerProps {
  src: string;
  scrollY: number;
  speed: number;
  zIndex: number;
  baseOpacity?: number;
  startAt?: number; // Scroll progress (0-1) at which this layer starts moving
  hideAt?: number; // Scroll progress (0-1) at which this layer should be fully hidden
}

export function ParallaxLayer({
  src,
  scrollY,
  speed,
  zIndex,
  baseOpacity = 1,
  startAt = 0,
  hideAt = 1,
}: ParallaxLayerProps) {
  const maxScroll = 2500;
  const scrollProgress = Math.min(scrollY / maxScroll, 1);
  
  // Only move if scroll progress is past the start point
  let translateY = 0;
  if (scrollProgress >= startAt) {
    // Calculate how much of the movement range we've progressed through
    const movementRange = hideAt - startAt;
    if (movementRange > 0) {
      const movementProgress = (scrollProgress - startAt) / movementRange;
      // Move down based on movement progress (0 to window height)
      const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
      translateY = movementProgress * windowHeight * speed;
    }
  }
  
  // Calculate opacity - starts fading when we reach hideAt threshold
  const fadeStart = hideAt * 0.8; // Start fading 80% before hideAt
  let opacityProgress = 1;
  
  if (scrollProgress > fadeStart && hideAt > fadeStart) {
    const fadeRange = hideAt - fadeStart;
    opacityProgress = Math.max(0, 1 - (scrollProgress - fadeStart) / fadeRange);
  }
  
  // Layer should be visible only when it should start moving
  const opacity = scrollProgress >= startAt ? baseOpacity * opacityProgress : baseOpacity;
  const visible = scrollProgress < hideAt;

  return (
    <div
      className="fixed bottom-0 left-0 w-full will-change-transform pointer-events-none"
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
        height: '130vh', // Extended height to ensure full coverage with no gaps
        bottom: '-10vh', // Start slightly below to cover any gaps
        transform: `translateY(${translateY}px)`,
        zIndex,
        opacity: visible ? (opacity > 0 ? opacity : 0) : 0,
        transition: 'opacity 0.3s ease-out',
      }}
    />
  );
}
