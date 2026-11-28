import { useEffect, useRef } from "react";
export function HeroParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let frame = 0;
    let targetTime = 0;
    let active = false;

    const seekToTarget = () => {
      if (!active || video.seeking || video.readyState < HTMLMediaElement.HAVE_METADATA) return;

      const difference = targetTime - video.currentTime;
      if (Math.abs(difference) < 0.015) return;

      // fastSeek snaps to nearby keyframes. Precise seeking keeps the scroll
      // scrub from visibly jumping between frames on quick scrolls.
      video.currentTime = targetTime;
    };

    const runSeek = () => {
      frame = 0;
      seekToTarget();
    };

    const updateTarget = () => {
      const bounds = section.getBoundingClientRect();
      const travel = section.offsetHeight - window.innerHeight;
      const progress = travel > 0 ? Math.min(1, Math.max(0, -bounds.top / travel)) : 0;
      targetTime = progress * (video.duration || 0);
      active = bounds.bottom > 0 && bounds.top < window.innerHeight;
      if (active && !frame) frame = requestAnimationFrame(runSeek);
    };

    video.pause();
    video.addEventListener("loadedmetadata", updateTarget);
    video.addEventListener("seeked", runSeek);
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget);
    updateTarget();

    return () => {
      video.removeEventListener("loadedmetadata", updateTarget);
      video.removeEventListener("seeked", runSeek);
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="mountain-scroll-scene">
      <div className="mountain-scroll-stage">
        <video
          ref={videoRef}
          className="mountain-scroll-video"
          src="/mountains/mountain.mp4"
          muted
          playsInline
          preload="auto"
          aria-label="A mountain landscape that moves with the page scroll"
        />
      </div>
    </section>
  );
}
