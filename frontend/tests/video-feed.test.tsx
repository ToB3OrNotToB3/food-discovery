import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import VideoFeed from "@/features/discovery/VideoFeed";

let played: HTMLMediaElement[];
let paused: HTMLMediaElement[];

beforeEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  played = [];
  paused = [];

  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: false })));
  vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(function (this: HTMLMediaElement) {
    played.push(this);
    return Promise.resolve();
  });
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(function (this: HTMLMediaElement) {
    paused.push(this);
  });
});

async function show(index: number) {
  const feed = screen.getByLabelText("Food video feed. Scroll or swipe for the next clip.");
  Object.defineProperty(feed, "clientHeight", { configurable: true, value: 600 });
  Object.defineProperty(feed, "scrollTop", { configurable: true, value: index * 600 });
  await act(async () => {
    fireEvent.scroll(feed);
  });
}

describe("video feed", () => {
  it("autoplays muted and switches playback to the visible clip", async () => {
    const { container } = render(<VideoFeed />);
    const videos = [...container.querySelectorAll("video")];
    await waitFor(() => expect(played).toContain(videos[0]));
    expect(videos[0].getAttribute("src")).toBe("/api/demo-media/dosa-social");
    expect(videos[0].muted).toBe(true);
    expect(played).not.toContain(videos[1]);

    await show(1);
    await waitFor(() => expect(played).toContain(videos[1]));
    expect(paused).toContain(videos[0]);
  });

  it("lets the viewer turn sound on for the active clip", async () => {
    const user = userEvent.setup();
    const { container } = render(<VideoFeed />);
    await show(1);
    const secondSlide = container.querySelectorAll(".watch-slide")[1] as HTMLElement;
    const secondVideo = secondSlide.querySelector("video") as HTMLVideoElement;

    expect(within(container.querySelector(".watch-slide") as HTMLElement).getByText("No audio")).toBeInTheDocument();
    await user.click(within(secondSlide).getByRole("button", { name: "Unmute video" }));
    expect(secondVideo.muted).toBe(false);
    expect(within(secondSlide).getByRole("button", { name: "Mute video" })).toHaveAttribute("aria-pressed", "true");
  });

  it("offers a tap to play when the browser blocks autoplay", async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play");
    play.mockRejectedValueOnce(new DOMException("Autoplay blocked", "NotAllowedError"));
    const user = userEvent.setup();
    const { container } = render(<VideoFeed />);
    const firstSlide = container.querySelector(".watch-slide") as HTMLElement;

    await waitFor(() => expect(screen.getByText("Tap the video to start playback.")).toBeInTheDocument());
    await user.click(within(firstSlide).getByRole("button", { name: "Play Ghee masala dosa video" }));
    expect(play).toHaveBeenCalledTimes(2);
  });

  it("supports keyboard movement and preserves the poster when a clip fails", async () => {
    const { container } = render(<VideoFeed />);
    const feed = screen.getByLabelText("Food video feed. Scroll or swipe for the next clip.");
    const firstSlide = container.querySelector(".watch-slide") as HTMLElement;
    const scrollTo = vi.fn();
    Object.defineProperty(feed, "clientHeight", { configurable: true, value: 600 });
    feed.scrollTo = scrollTo;

    feed.focus();
    fireEvent.keyDown(feed, { key: "ArrowDown" });
    expect(scrollTo).toHaveBeenCalledWith({ top: 600, behavior: "smooth" });

    fireEvent.error(firstSlide.querySelector("video") as HTMLVideoElement);
    expect(screen.getByRole("status")).toHaveTextContent("Clip unavailable");
    expect(firstSlide.querySelector("video")).toBeNull();
    expect(firstSlide.querySelector("img")).not.toBeNull();
    expect(within(firstSlide).getByRole("link", { name: /Dosa Social/ })).toHaveAttribute("href", "/restaurants/dosa-social");
  });
});
