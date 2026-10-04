"use client";
import Link from "next/link";
export default function RestaurantError({ reset }: { reset: () => void }) {
  return <main className="route-state"><h1>We couldn’t load this place.</h1><p>Please try again, or head back to discovery.</p><button onClick={reset}>Try again</button><Link href="/">Back to discovery</Link></main>;
}
