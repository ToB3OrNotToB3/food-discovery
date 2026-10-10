import type { Metadata } from "next";
import VideoFeed from "@/features/discovery/VideoFeed";
import "./watch.css";

export const metadata: Metadata = {
  title: "Clips | GoodFind",
  description: "Illustrative food clips for the fictional GoodFind discovery prototype.",
  robots: { index: false, follow: false },
};

export default function WatchPage() { return <VideoFeed />; }
