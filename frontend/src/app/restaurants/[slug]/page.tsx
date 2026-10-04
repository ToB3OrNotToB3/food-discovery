import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RestaurantActions from "@/features/restaurants/RestaurantActions";
import { places, photoUrl } from "@/mocks/places";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return places.map((place) => ({ slug: place.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const place = places.find((item) => item.id === slug);
  return {
    title: place ? `${place.name} · ${place.area} | GoodFind` : "Place not found | GoodFind",
    description: place ? `Fictional demo: ${place.dish} at ${place.name}, ${place.area}.` : "This demo place could not be found.",
    robots: { index: false, follow: false },
  };
}

export default async function RestaurantPage({ params }: Props) {
  const { slug } = await params;
  const place = places.find((item) => item.id === slug);
  if (!place) notFound();

  return <div className="restaurant-page">
    <header className="restaurant-top"><Link href="/" className="restaurant-back">← Back to discovery</Link><span className="demo-badge">FICTIONAL DEMO PLACE</span></header>
    <main className="restaurant-content">
      <div className="restaurant-hero"><Image src={photoUrl(place.photo, 1400)} alt={place.dish} fill unoptimized priority sizes="(max-width: 700px) 100vw, 1000px" /><span className="stock-label">Illustrative stock photo</span><span className="restaurant-tag">{place.tag}</span></div>
      <div className="restaurant-columns">
        <section className="restaurant-info" aria-labelledby="restaurant-name"><p className="eyebrow">{place.area} · BENGALURU</p><h1 id="restaurant-name">{place.name}</h1><p className="restaurant-category">{place.cuisine} · {place.vegetarian ? "Vegetarian dish" : "Non-vegetarian dish"}</p><p className="restaurant-description">{place.description}</p>
          <h2>Start with this</h2><div className="dish-line"><div><strong>{place.dish}</strong><small>Sample menu · illustrative price</small></div><strong>₹{place.price}</strong></div>
          <section className="vibe" aria-labelledby="vibe-title"><div><span className="vibe-number">{place.positive}%</span><div><h2 id="vibe-title">Vibe Check</h2><small>Positive · {place.reviews} synthetic reviews</small></div><span className="demo-badge">DEMO</span></div><p>The percentage of sample reviews classified as positive. Automatically estimated sentiment can be imperfect. These figures demonstrate the interface; they are not a real restaurant rating.</p></section>
        </section>
        <aside className="restaurant-plan"><span className="note-star">✳</span><h2>Keep this one<br />for later.</h2><p>Build a shortlist for the next time someone asks where to eat.</p><RestaurantActions id={place.id} name={place.name} /><div className="demo-note"><span>DEMO</span><p>This place is fictional. A verified address, opening hours, contact details and real menu will appear when partner listings are available.</p></div></aside>
      </div>
      <section className="more-places" aria-labelledby="more-title"><h2 id="more-title">Another craving?</h2><div>{places.filter((item) => item.id !== place.id).map((item) => <Link key={item.id} href={`/restaurants/${item.id}`}><span><strong>{item.name}</strong><small>{item.dish} · {item.area}</small></span><span aria-hidden="true">↗</span></Link>)}</div></section>
    </main>
  </div>;
}
