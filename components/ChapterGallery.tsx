"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Chapter } from "../data/community";

export default function ChapterGallery({ photos }: { photos: NonNullable<Chapter["gallery"]> }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPlaying(!preference.matches);
    const update = () => setPlaying(!preference.matches);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!playing || hovered || focused || photos.length < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(index => (index + 1) % photos.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [playing, hovered, focused, photos.length]);

  function goTo(index: number) {
    setPlaying(false);
    setActive((index + photos.length) % photos.length);
  }

  if (!photos.length) return null;

  return (
    <div className="chapter-slideshow" role="region" aria-roledescription="carousel" aria-label="Foto kegiatan chapter"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          goTo(active + (event.key === "ArrowLeft" ? -1 : 1));
        }
      }}>
      <div className="chapter-slide-stage"
        onTouchStart={event => { touchStart.current = event.touches[0].clientX; }}
        onTouchCancel={() => { touchStart.current = null; }}
        onTouchEnd={event => {
          if (touchStart.current !== null) {
            const distance = event.changedTouches[0].clientX - touchStart.current;
            if (Math.abs(distance) > 50) goTo(active + (distance < 0 ? 1 : -1));
          }
          touchStart.current = null;
        }}>
        {photos.map((photo, index) => (
          <div key={photo.src} hidden={index !== active} role="group" aria-roledescription="slide" aria-label={`${index + 1} dari ${photos.length}`}>
            <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 1100px) 88vw, 1100px" />
          </div>
        ))}
      </div>
      {photos.length > 1 && <div className="chapter-slide-controls">
        <button type="button" onClick={() => goTo(active - 1)} aria-label="Foto sebelumnya">←</button>
        <div className="chapter-slide-dots">{photos.map((photo, index) => <button key={photo.src} type="button" onClick={() => goTo(index)} aria-label={`Tampilkan foto ${index + 1}`} aria-current={index === active ? "true" : undefined}><span /></button>)}</div>
        <span className="chapter-slide-count" aria-live={playing && !hovered && !focused ? "off" : "polite"}>{active + 1} / {photos.length}</span>
        <button type="button" className="chapter-slide-play" onClick={() => setPlaying(value => !value)} aria-label={playing ? "Jeda slideshow otomatis" : "Putar slideshow otomatis"}>{playing ? "Jeda" : "Putar"}</button>
        <button type="button" onClick={() => goTo(active + 1)} aria-label="Foto berikutnya">→</button>
      </div>}
    </div>
  );
}
