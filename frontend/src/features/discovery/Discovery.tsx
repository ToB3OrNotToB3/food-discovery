"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { places, photoUrl, type Place } from "@/mocks/places";

const storageKey = "food-discovery:saves:v1";
const categories = [{ name: "Everything", icon: "🍽️" }, { name: "South Indian", icon: "🥞" }, { name: "Biryani", icon: "🍚" }, { name: "Burgers", icon: "🍔" }];
function Icon({ name, size = 20 }: { name: "search" | "bookmark" | "compass" | "pin" | "arrow" | "close" | "sliders"; size?: number }) {
  const paths = { search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>, bookmark: <path d="M6 3h12v18l-6-4-6 4z" />, compass: <><circle cx="12" cy="12" r="9" /><path d="m16 8-2.5 5.5L8 16l2.5-5.5z" /></>, pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>, arrow: <path d="M4 12h16m-6-6 6 6-6 6" />, close: <path d="m6 6 12 12M6 18 18 6" />, sliders: <><path d="M4 7h16M4 17h16" /><circle cx="9" cy="7" r="2" /><circle cx="15" cy="17" r="2" /></> };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
export default function Discovery() {
  const [view, setView] = useState<"discover" | "saved">("discover");
  const [category, setCategory] = useState("Everything");
  const [area, setArea] = useState("All Bengaluru");
  const [query, setQuery] = useState("");
  const [budget, setBudget] = useState(false);
  const [veg, setVeg] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [selected, setSelected] = useState<Place | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    function readSaves() {
      try { const parsed: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]"); if (Array.isArray(parsed)) setSaved(parsed.filter((id): id is string => typeof id === "string" && places.some((place) => place.id === id))); }
      catch { setNotice("Device storage is unavailable. Saves will last for this visit."); }
    }
    readSaves(); window.addEventListener("storage", readSaves); return () => window.removeEventListener("storage", readSaves);
  }, []);
  useEffect(() => { if (!notice) return; const timer = setTimeout(() => setNotice(""), 3500); return () => clearTimeout(timer); }, [notice]);
  function save(place: Place) {
    const next = saved.includes(place.id) ? saved.filter((id) => id !== place.id) : [...saved, place.id]; setSaved(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); setNotice(next.includes(place.id) ? `${place.name} saved to your shortlist.` : `${place.name} removed from saved.`); }
    catch { setNotice("Saved for this visit. Device storage is unavailable."); }
  }
  function openPlace(place: Place) { setSelected(place); dialogRef.current?.showModal(); }
  function clearFilters() { setCategory("Everything"); setArea("All Bengaluru"); setQuery(""); setBudget(false); setVeg(false); }
  function navigate(next: "discover" | "saved") { setView(next); clearFilters(); }
  const words = query.toLowerCase().split(/\s+/).filter((word) => word && !["in", "near", "at"].includes(word));
  const visible = places.filter((place) => (view !== "saved" || saved.includes(place.id)) && (category === "Everything" || place.cuisine === category) && (area === "All Bengaluru" || place.area === area) && (!budget || place.price <= 200) && (!veg || place.vegetarian) && words.every((word) => `${place.name} ${place.dish} ${place.area} ${place.cuisine}`.toLowerCase().includes(word)));
  return <div className="app">
    <a href="#main" className="skip-link">Skip to food</a>
    <aside className="sidebar">
      <button className="brand" onClick={() => navigate("discover")} aria-label="Goodfind home"><span className="brand-symbol">g.</span><span>goodfind<span className="orange">.</span></span></button>
      <p className="sidebar-caption">YOUR NEXT GOOD MEAL</p>
      <nav aria-label="Main navigation"><button className={view === "discover" ? "nav-item active" : "nav-item"} onClick={() => navigate("discover")} aria-current={view === "discover" ? "page" : undefined}><Icon name="compass" /> Discover <span className="nav-dot" /></button><button className={view === "saved" ? "nav-item active" : "nav-item"} onClick={() => navigate("saved")} aria-current={view === "saved" ? "page" : undefined}><Icon name="bookmark" /> Saved places <span className="count">{saved.length}</span></button></nav>
      <div className="sidebar-note"><span className="note-star">✳</span><h3>Your city.<br />Your appetite.</h3><p>Start with a craving.<br />See where it takes you.</p><span className="city-tag">BENGALURU ↗</span></div>
      <div className="sidebar-bottom"><span className="avatar">☺</span><div>Hey, food explorer<small>No account needed</small></div></div>
    </aside>
    <div className="workspace">
      <header className="topbar"><div className="location"><span className="location-icon"><Icon name="pin" /></span><label htmlFor="area"><small>EXPLORING</small><select id="area" value={area} onChange={(event) => setArea(event.target.value)}><option>All Bengaluru</option><option>Koramangala</option><option>Indiranagar</option></select></label></div><div className="search"><Icon name="search" /><label className="sr-only" htmlFor="search">Search dishes, places or areas</label><input ref={searchRef} id="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Dosa, biryani, your next obsession…" />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><Icon name="close" size={16} /></button>}</div><span className="demo-badge"><span /> DEMO MODE</span></header>
      <main id="main">
        <div className="page-heading"><div><p className="eyebrow">BENGALURU, ONE BITE AT A TIME</p><h1>{view === "saved" ? "Your food shortlist." : "Okay, what’s the craving?"}</h1><p>{view === "saved" ? "The places you’re keeping for later. Saved on this device." : "Find something that makes the group chat say “let’s go”."}</p></div><span className="heading-stamp" aria-hidden="true">GOOD FOOD<br /><b>GOOD MOOD</b><span>☺</span></span></div>
        {view === "discover" && !query && <section className="feature-banner" aria-label="Featured dish"><Image src={photoUrl(places[0].photo, 1400)} alt="A bowl of biryani with fragrant rice and spices" fill unoptimized priority sizes="(max-width: 700px) 100vw, 75vw" /><div className="feature-shade" /><div className="feature-copy"><span className="feature-label">THE LUNCH FIX ↗</span><h2>Big cravings.<br />Small budget.</h2><p>Your next biryani break starts at ₹180.</p><button onClick={() => openPlace(places[0])}>Meet your lunch <Icon name="arrow" size={18} /></button></div><span className="feature-sticker">LUNCH<br /><b>SORTED.</b><span>✳</span></span><span className="stock-label">Sample dish · stock photo</span></section>}
        <section className="discovery" aria-labelledby="results-heading">
          <div className="category-row" role="group" aria-label="Cuisine">{categories.map((item) => <button key={item.name} onClick={() => setCategory(item.name)} aria-pressed={category === item.name} className={category === item.name ? "category selected" : "category"}><span aria-hidden="true">{item.icon}</span>{item.name}</button>)}</div>
          <div className="results-bar"><div><h2 id="results-heading">{view === "saved" ? "Saved for the next craving" : query ? "Here’s what we found" : "On the menu today"}<span className="result-count">{visible.length}</span></h2><p>{view === "saved" ? "A little less “where should we eat?”" : "A few places to get your appetite going."}</p></div><div className="quick-filters"><span className="filter-icon"><Icon name="sliders" size={18} /></span><button aria-pressed={budget} className={budget ? "filter on" : "filter"} onClick={() => setBudget(!budget)}>Under ₹200 {budget && "✓"}</button><button aria-pressed={veg} className={veg ? "filter on" : "filter"} onClick={() => setVeg(!veg)}><span className="veg-symbol" /> Veg {veg && "✓"}</button></div></div>
          <div className="food-grid">{visible.map((place, index) => <article className="food-card" key={place.id} style={{ animationDelay: `${index * 70}ms` }}><div className="food-photo"><button className="photo-open" onClick={() => openPlace(place)} aria-label={`View ${place.dish} at ${place.name}`}><Image src={photoUrl(place.photo)} alt={place.dish} fill unoptimized sizes="(max-width: 600px) 90vw, (max-width: 1100px) 45vw, 28vw" /></button><span className="dish-label">{place.tag}</span><button className={saved.includes(place.id) ? "save-button saved" : "save-button"} onClick={() => save(place)} aria-label={`${saved.includes(place.id) ? "Unsave" : "Save"} ${place.name}`} aria-pressed={saved.includes(place.id)}><Icon name="bookmark" /></button><div className="photo-bottom"><span>{place.cuisine}</span><span>₹{place.price}<small> / dish</small></span></div></div><div className="card-body"><div className="card-title"><button onClick={() => openPlace(place)}><h3>{place.name}</h3></button><span className={place.vegetarian ? "diet vegetarian" : "diet"} aria-label={place.vegetarian ? "Vegetarian" : "Non-vegetarian"}><span /></span></div><p>{place.dish}</p><div className="card-foot"><span><Icon name="pin" size={14} /> {place.area}</span><button onClick={() => openPlace(place)} aria-label={`Details for ${place.name}`}><Icon name="arrow" size={18} /></button></div></div></article>)}</div>
          {visible.length === 0 && <div className="empty"><span aria-hidden="true">{view === "saved" && !saved.length ? "♡" : "⌕"}</span><h3>{view === "saved" && !saved.length ? "Your next favourite belongs here." : "Nothing matches this craving. Yet."}</h3><p>{view === "saved" && !saved.length ? "Tap the bookmark on a place to keep it for later." : "Try another area, dish, or remove a filter."}</p><button onClick={() => view === "saved" && !saved.length ? navigate("discover") : clearFilters()}>{view === "saved" && !saved.length ? "Find something good" : "Clear filters"}<Icon name="arrow" size={18} /></button></div>}
          <div className="demo-note"><span>DEMO</span><p>Made-up places. Real appetite. Listings, prices and Vibe Checks are samples; photos are illustrative.</p></div>
        </section>
      </main><footer><span>good food, no endless scrolling.</span><span>Made for Bengaluru <span className="orange">↗</span></span></footer>
    </div>
    <nav className="mobile-nav" aria-label="Mobile navigation"><button onClick={() => navigate("discover")} className={view === "discover" ? "current" : ""}><Icon name="compass" />Discover</button><button onClick={() => searchRef.current?.focus()}><Icon name="search" />Search</button><button onClick={() => navigate("saved")} className={view === "saved" ? "current" : ""}><Icon name="bookmark" />Saved ({saved.length})</button></nav>
    <div className={notice ? "toast visible" : "toast"} role="status">{notice}</div>
    <dialog ref={dialogRef} className="detail-dialog" aria-labelledby="detail-title" onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>{selected && <><div className="detail-photo"><Image src={photoUrl(selected.photo)} alt={selected.dish} fill unoptimized sizes="600px" /><button className="dialog-close" onClick={() => dialogRef.current?.close()} aria-label="Close details" autoFocus><Icon name="close" /></button><span className="stock-label">Illustrative stock photo</span></div><div className="detail-body"><span className="detail-kicker">FICTIONAL DEMO PLACE · {selected.area}</span><h2 id="detail-title">{selected.name}</h2><p>{selected.description}</p><div className="dish-line"><div><strong>{selected.dish}</strong><small>{selected.vegetarian ? "Vegetarian" : "Non-vegetarian"} · Sample menu</small></div><strong>₹{selected.price}</strong></div><div className="vibe"><div><span className="vibe-number">{selected.positive}%</span><div><strong>Vibe Check</strong><small>Positive · {selected.reviews} synthetic reviews</small></div><span className="demo-badge">DEMO</span></div><p>The percentage of sample reviews classified as positive. Automatically estimated sentiment can be imperfect. This is synthetic data, not a real restaurant rating.</p></div><button className="detail-save" onClick={() => save(selected)}><Icon name="bookmark" />{saved.includes(selected.id) ? "Saved — remove from shortlist" : "Save this place"}</button></div></>}</dialog>
  </div>;
}
