"use client";

import { useSyncExternalStore } from "react";
import { places } from "@/mocks/places";

const key = "food-discovery:saves:v1";
const eventName = "food-discovery:saves-changed";
let fallback = "[]";
let storageUnavailable = false;

function snapshot() {
  if (storageUnavailable) return fallback;
  try { return localStorage.getItem(key) ?? "[]"; }
  catch { return fallback; }
}

function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(eventName, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(eventName, listener);
  };
}

function parse(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value)
      ? [...new Set(value.filter((id): id is string => typeof id === "string" && places.some((place) => place.id === id)))]
      : [];
  } catch { return []; }
}

export function useSavedPlaces() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "[]");
  const saved = parse(raw);

  function toggle(id: string) {
    const current = parse(snapshot());
    const active = !current.includes(id);
    fallback = JSON.stringify(active ? [...current, id] : current.filter((item) => item !== id));
    let persistent = true;
    try { localStorage.setItem(key, fallback); storageUnavailable = false; }
    catch { persistent = false; storageUnavailable = true; }
    window.dispatchEvent(new Event(eventName));
    return { active, persistent };
  }

  return { saved, toggle };
}
