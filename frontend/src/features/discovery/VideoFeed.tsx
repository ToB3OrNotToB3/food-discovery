"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSavedPlaces } from "@/features/saves/useSavedPlaces";
import { places, photoUrl } from "@/mocks/places";
import { videoClips } from "@/mocks/video-clips";

export default function VideoFeed() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStart = useRef<number | null>(null);
  const { saved, toggle } = useSavedPlaces();
  const clip = videoClips[active];
  const place = places.find((item) => item.id === clip.placeId)!;

  useEffect(() => {
    if (!playing) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
    video.play().catch(() => { setPlaying(false); setLoading(false); setFailed(true); });
  }, [active, playing, muted]);

  useEffect(() => {
    const pauseWhenHidden = () => {
      if (document.hidden) { videoRef.current?.pause(); setPlaying(false); }
    };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => document.removeEventListener("visibilitychange", pauseWhenHidden);
  }, []);

  function goTo(index: number) {
    if (index < 0 || index >= videoClips.length) return;
    videoRef.current?.pause();
    setPlaying(false); setLoading(false); setFailed(false); setMessage(""); setActive(index);
  }

  function togglePlay() {
    if (failed) { setFailed(false); }
    if (playing) { videoRef.current?.pause(); setPlaying(false); setLoading(false); }
    else { setLoading(true); setPlaying(true); }
  }

  function save() {
    const result = toggle(place.id);
    setMessage(result.persistent
      ? `${place.name} ${result.active ? "saved" : "removed from saved"}.`
      : "Saved for this visit. Device storage is unavailable.");
  }

  return <div className="watch-page">
    <header className="watch-header"><Link href="/" className="watch-back">← Discover</Link><span className="watch-logo">goodfind<span>.</span></span><span className="watch-demo">DEMO FOOTAGE</span></header>
    <main className="watch-main">
      <div className="watch-intro"><p className="eyebrow">FOOD IN MOTION</p><h1>One craving at a time.</h1><p>Short looks at the dishes. The footage is illustrative and was not filmed at these fictional places.</p></div>
      <div className="watch-stage" onKeyDown={(event) => {
        if (event.key === "ArrowDown") { event.preventDefault(); goTo(active + 1); }
        if (event.key === "ArrowUp") { event.preventDefault(); goTo(active - 1); }
      }} onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientY ?? null; }} onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const delta = touchStart.current - (event.changedTouches[0]?.clientY ?? touchStart.current);
        if (Math.abs(delta) > 60) goTo(active + (delta > 0 ? 1 : -1));
        touchStart.current = null;
      }}>
        <div className="watch-progress" aria-label={`Clip ${active + 1} of ${videoClips.length}`}>{videoClips.map((item, index) => <button key={item.placeId} aria-label={`Go to clip ${index + 1}: ${places.find((entry) => entry.id === item.placeId)?.dish}`} aria-current={active === index ? "true" : undefined} onClick={() => goTo(index)} className={active === index ? "current" : ""} />)}</div>
        <div className="reel" aria-label={`${place.dish} video preview`}>
          <Image className="reel-poster" src={photoUrl(place.photo, 1000)} alt="" fill unoptimized priority sizes="(max-width: 650px) 100vw, 420px" />
          {playing && !failed && <video key={clip.placeId} ref={videoRef} className="reel-video" src={clip.source} playsInline muted={muted} loop preload="none" onCanPlay={() => setLoading(false)} onPlaying={() => setLoading(false)} onError={() => { setFailed(true); setPlaying(false); setLoading(false); }} aria-label={clip.caption} />}
          <div className="reel-scrim" />
          <span className="reel-demo">ILLUSTRATIVE STOCK FOOTAGE</span>
          <button className="reel-play" onClick={togglePlay} aria-label={playing ? `Pause ${place.dish} video` : `Play ${place.dish} video`}>{loading ? "…" : playing ? "Ⅱ" : "▶"}</button>
          <div className="reel-copy"><span className="reel-counter">{String(active + 1).padStart(2, "0")} / {String(videoClips.length).padStart(2, "0")}</span><h2>{place.dish}</h2><p>{clip.caption}</p><div className="reel-place"><span>{place.name} · {place.area}</span><strong>₹{place.price} <small>sample price</small></strong></div></div>
        </div>
        <div className="watch-controls"><button onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous clip">↑</button><button onClick={() => goTo(active + 1)} disabled={active === videoClips.length - 1} aria-label="Next clip">↓</button><button onClick={() => setMuted(!muted)} aria-label={muted ? "Unmute video" : "Mute video"} aria-pressed={!muted}>{muted ? "♫̸" : "♫"}</button><button onClick={save} aria-label={`${saved.includes(place.id) ? "Unsave" : "Save"} ${place.name}`} aria-pressed={saved.includes(place.id)}>{saved.includes(place.id) ? "♥" : "♡"}</button></div>
      </div>
      {failed && <p className="reel-alert" role="status">This stock clip isn’t available right now. You can still view the photo and restaurant details.</p>}
      {message && <p className="reel-alert" role="status">{message}</p>}
      <div className="watch-details"><p>Footage by {clip.creator} on Pexels. {clip.caption} The pictured food and its location are unrelated to this fictional listing.</p><Link href={`/restaurants/${place.id}`}>Open {place.name} details →</Link></div>
      <p className="watch-hint">Swipe or use ↑ ↓ to move between clips. Playback starts when you press play.</p>
    </main>
  </div>;
}
