"use client";

import { useState } from "react";
import { useSavedPlaces } from "@/features/saves/useSavedPlaces";

export default function RestaurantActions({ id, name }: { id: string; name: string }) {
  const { saved, toggle } = useSavedPlaces();
  const [message, setMessage] = useState("");
  const [manualLink, setManualLink] = useState("");

  function save() {
    const result = toggle(id);
    setMessage(result.persistent
      ? `${name} ${result.active ? "saved to" : "removed from"} your shortlist.`
      : "Device storage is unavailable. This change will last for this visit.");
  }

  async function copyLink() {
    const url = window.location.origin + `/restaurants/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setManualLink("");
      setMessage("Link copied. This local preview link works on this computer only.");
    } catch {
      setManualLink(url);
      setMessage("Select and copy the link below. Local preview links work on this computer only.");
    }
  }

  return <div className="restaurant-actions">
    <div className="restaurant-action-row">
      <button className="detail-save" onClick={save} aria-pressed={saved.includes(id)}>{saved.includes(id) ? "✓ Saved to your shortlist" : "+ Save this place"}</button>
      <button className="copy-link" onClick={copyLink}>Copy link ↗</button>
    </div>
    <p className="action-status" role="status">{message}</p>
    {manualLink && <label className="manual-link">Restaurant link<input readOnly value={manualLink} onFocus={(event) => event.currentTarget.select()} /></label>}
  </div>;
}
