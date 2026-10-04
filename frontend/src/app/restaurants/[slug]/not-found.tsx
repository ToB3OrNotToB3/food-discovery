import Link from "next/link";
export default function RestaurantNotFound() {
  return <main className="route-state"><span className="eyebrow">PLACE NOT FOUND</span><h1>This spot isn’t on our map.</h1><p>The link may be incorrect, or the listing is no longer available.</p><Link href="/">Find something else →</Link></main>;
}
