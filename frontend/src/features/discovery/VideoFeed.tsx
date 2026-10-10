"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useSavedPlaces } from "@/features/saves/useSavedPlaces";
import { places, photoUrl } from "@/mocks/places";
import { videoClips } from "@/mocks/video-clips";

const reels = videoClips.map((clip) => ({ clip, place: places.find((place) => place.id === clip.placeId)! }));
type Playback = "loading" | "playing" | "paused" | "blocked" | "failed";
const LOAD_TIMEOUT_MS = 12000;
const subscribeOnline = (notify: () => void) => {
  window.addEventListener("online", notify);
  window.addEventListener("offline", notify);
  return () => {
    window.removeEventListener("online", notify);
    window.removeEventListener("offline", notify);
  };
};
const getOnline = () => navigator.onLine;
const getServerOnline = () => true;

export default function VideoFeed() {
  const [active, setActive] = useState(0);
  const [playback, setPlayback] = useState<Playback>("loading");
  const [muted, setMuted] = useState(true);
  const [failedClips, setFailedClips] = useState<string[]>([]);
  const online = useSyncExternalStore(subscribeOnline, getOnline, getServerOnline);
  const [retryRevision, setRetryRevision] = useState(0);
  const [message, setMessage] = useState("");
  const feedRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeRef = useRef(0);
  const previousActiveRef = useRef(-1);
  const pausedByUser = useRef(false);
  const { saved, toggle } = useSavedPlaces();

  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) return;
    function syncActiveClip() {
      if (!feed || !feed.clientHeight) return;
      const index = Math.max(0, Math.min(reels.length - 1, Math.round(feed.scrollTop / feed.clientHeight)));
      activeRef.current = index;
      setActive((previous) => previous === index ? previous : index);
    }
    feed.addEventListener("scroll", syncActiveClip, { passive: true });
    window.addEventListener("resize", syncActiveClip);
    syncActiveClip();
    return () => {
      feed.removeEventListener("scroll", syncActiveClip);
      window.removeEventListener("resize", syncActiveClip);
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video) => { if (video) video.muted = muted; });
  }, [muted]);

  useEffect(() => {
    activeRef.current = active;
    if (previousActiveRef.current !== active) pausedByUser.current = false;
    previousActiveRef.current = active;
    videoRefs.current.forEach((video, index) => { if (index !== active) video?.pause(); });
    const video = videoRefs.current[active];
    if (!video) return;
    let cancelled = false;
    function play() {
      if (!video || document.hidden || !online || pausedByUser.current || failedClips.includes(reels[active].clip.placeId)) return;
      setPlayback("loading");
      video.play().catch((error: DOMException) => {
        if (!cancelled && error.name !== "AbortError") setPlayback("blocked");
      });
    }
    function onVisibilityChange() {
      if (document.hidden) video?.pause();
      else if (!pausedByUser.current) play();
    }
    if (online) play();
    else video.pause();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => { cancelled = true; document.removeEventListener("visibilitychange", onVisibilityChange); video.pause(); };
    // Failed clips are not retried automatically; moving to another clip still plays it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, online, retryRevision]);

  useEffect(() => {
    if (!online || playback !== "loading" || failedClips.includes(reels[active].clip.placeId)) return;
    const timer = window.setTimeout(() => {
      const placeId = reels[active].clip.placeId;
      setFailedClips((previous) => previous.includes(placeId) ? previous : [...previous, placeId]);
      setPlayback("failed");
    }, LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [active, failedClips, online, playback]);

  function togglePlayback() {
    const video = videoRefs.current[active];
    if (!video || !online || failedClips.includes(reels[active].clip.placeId)) return;
    if (!video.paused) {
      pausedByUser.current = true;
      video.pause();
      setPlayback("paused");
    } else {
      pausedByUser.current = false;
      setPlayback("loading");
      video.play().catch((error: DOMException) => {
        if (activeRef.current === active && error.name !== "AbortError") setPlayback("blocked");
      });
    }
  }

  function retryClip(placeId: string) {
    if (!online) return;
    setFailedClips((previous) => previous.filter((id) => id !== placeId));
    setPlayback("loading");
    setRetryRevision((previous) => previous + 1);
  }

  function save(placeId: string, name: string) {
    const result = toggle(placeId);
    setMessage(result.persistent ? `${name} ${result.active ? "saved" : "removed from saved"}.` : "Saved for this visit. Device storage is unavailable.");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.target !== feedRef.current) return;
    const direction = event.key === "ArrowDown" || event.key === "PageDown" ? 1 : event.key === "ArrowUp" || event.key === "PageUp" ? -1 : 0;
    if (!direction && event.key !== "Home" && event.key !== "End") return;
    const next = event.key === "Home" ? 0 : event.key === "End" ? reels.length - 1 : active + direction;
    event.preventDefault();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    feedRef.current?.scrollTo({ top: Math.max(0, Math.min(reels.length - 1, next)) * feedRef.current.clientHeight, behavior: reducedMotion ? "auto" : "smooth" });
  }

  return <div className="watch-page">
    <header className="watch-header"><Link href="/" className="watch-back">← Discover</Link><span className="watch-logo">goodfind<span>.</span></span><span className="watch-demo">DEMO FOOTAGE</span></header>
    <div className="watch-feed" ref={feedRef} tabIndex={0} aria-label="Food video feed. Scroll or swipe for the next clip." onKeyDown={handleKeyDown}>
      {reels.map(({ clip, place }, index) => {
        const failed = failedClips.includes(clip.placeId);
        const current = index === active;
        return <article className="watch-slide" key={clip.placeId} aria-label={`${index + 1} of ${reels.length}: ${place.dish}`}>
          <div className="reel">
            <Image className="reel-poster" src={photoUrl(place.photo, 1000)} alt="" fill unoptimized priority={index === 0} sizes="(max-width: 650px) 100vw, 480px" />
            {!failed && <video ref={(node) => { videoRefs.current[index] = node; }} className={online ? "reel-video" : "reel-video reel-video-offline"} src={current && online ? ("optimizedSrc" in clip ? clip.optimizedSrc : `/api/demo-media/${clip.placeId}`) : undefined} playsInline muted={muted} loop preload={current && online ? "metadata" : "none"} onPlaying={() => { if (activeRef.current === index) setPlayback("playing"); }} onWaiting={() => { if (activeRef.current === index) setPlayback("loading"); }} onError={() => { setFailedClips((previous) => previous.includes(clip.placeId) ? previous : [...previous, clip.placeId]); if (activeRef.current === index) setPlayback("failed"); }} aria-label={clip.caption} />}
            <div className="reel-scrim" />
            {!failed && <button className="reel-tap" onClick={togglePlayback} aria-label={current && playback === "playing" ? `Pause ${place.dish} video` : `Play ${place.dish} video`} tabIndex={current ? 0 : -1} />}
            {current && (playback === "paused" || playback === "blocked") && <span className="reel-play-icon" aria-hidden="true">▶</span>}
            {current && online && playback === "loading" && !failed && <span className="reel-loading" role="status" aria-label="Loading video"><span className="reel-loading-ring" aria-hidden="true" /></span>}
            <div className="reel-topline"><span className="reel-demo">ILLUSTRATIVE STOCK FOOTAGE</span><span className="reel-count">{String(index + 1).padStart(2, "0")} / {String(reels.length).padStart(2, "0")}</span></div>
            <div className="reel-bottom"><div className="reel-copy"><span className="reel-area">{place.area} · ₹{place.price} sample price</span><h1>{place.dish}</h1><p>{clip.caption}</p><Link href={`/restaurants/${place.id}`} className="reel-place" tabIndex={current ? 0 : -1}>{place.name} <span aria-hidden="true">↗</span></Link><small>Stock clip by {clip.creator} on Pexels. Not filmed at this fictional venue.</small></div>
              <div className="reel-actions">{clip.hasAudio ? <button onClick={() => setMuted((value) => !value)} aria-label={muted ? "Unmute video" : "Mute video"} aria-pressed={!muted} tabIndex={current ? 0 : -1}><span aria-hidden="true">{muted ? "♩" : "♫"}</span><small>{muted ? "Sound off" : "Sound on"}</small></button> : <span className="reel-no-audio"><span aria-hidden="true">♩</span><small>No audio</small></span>}<button onClick={() => save(place.id, place.name)} aria-label={`${saved.includes(place.id) ? "Unsave" : "Save"} ${place.name}`} aria-pressed={saved.includes(place.id)} tabIndex={current ? 0 : -1}><span aria-hidden="true">{saved.includes(place.id) ? "♥" : "♡"}</span><small>Save</small></button></div>
            </div>
            {current && !online && <p className="reel-alert" role="status">You’re offline. The place preview is still here. Reconnect to play the clip.</p>}
            {current && online && failed && <div className="reel-alert" role="status"><p>Clip unavailable. The place preview is still here.</p><button type="button" onClick={() => retryClip(clip.placeId)}>Try video again</button></div>}
            {current && online && playback === "blocked" && !failed && <p className="reel-alert" role="status">Tap the video to start playback.</p>}
            {index === 0 && <span className="reel-scroll-hint" aria-hidden="true">SWIPE OR SCROLL FOR MORE ↓</span>}
          </div>
        </article>;
      })}
    </div>
    <div className="watch-position" aria-hidden="true">{reels.map(({ clip }, index) => <span key={clip.placeId} className={index === active ? "current" : ""} />)}</div>
    {message && <p className="watch-toast" role="status" onAnimationEnd={() => setMessage("")}>{message}</p>}
  </div>;
}
