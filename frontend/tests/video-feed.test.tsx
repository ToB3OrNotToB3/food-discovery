import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import VideoFeed from "@/features/discovery/VideoFeed";

let onIntersection: IntersectionObserverCallback;
let played: HTMLMediaElement[];
let paused: HTMLMediaElement[];

beforeEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  played = [];
  paused = [];

  class MockIntersectionObserver {
    constructor(callback: IntersectionObserverCallback) { onIntersection = callback; }
    observe() {}
    disconnect() {}
  }
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: false })));
  vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(function (this: HTMLMediaElement) {
    played.push(this);
    return Promise.resolve();
  });
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(function (this: HTMLMediaElement) {
    paused.push(this);
  });
});

async function show(slide: Element) {
  await act(async () => {
    onIntersection([{ target: slide, isIntersecting: true, intersectionRatio: 0.75 } as IntersectionObserverEntry], {} as IntersectionObserver);
  });
}

describe("video feed", () => {
  it("autoplays muted and switches playback to the visible clip", async () => {
    const { container } = render(<VideoFeed />);
    const videos = [...container.querySelectorAll("video")];
    const slides = [...container.querySelectorAll(".watch-slide")];

    await waitFor(() => expect(played).toContain(videos[0]));
    expect(videos[0].muted).toBe(true);
    expect(played).not.toContain(videos[1]);

    await show(slides[1]);
    await waitFor(() => expect(played).toContain(videos[1]));
    expect(paused).toContain(videos[0]);
  });

  it("lets the viewer turn sound on for the active clip", async () => {
    const user = userEvent.setup();
    const { container } = render(<VideoFeed />);
    const firstSlide = container.querySelector(".watch-slide") as HTMLElement;
    const firstVideo = firstSlide.querySelector("video") as HTMLVideoElement;

    await user.click(within(firstSlide).getByRole("button", { name: "Unmute video" }));
    expect(firstVideo.muted).toBe(false);
    expect(within(firstSlide).getByRole("button", { name: "Mute video" })).toHaveAttribute("aria-pressed", "true");
  });

  it("offers a tap to play when the browser blocks autoplay", async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play");
    play.mockRejectedValueOnce(new DOMException("Autoplay blocked", "NotAllowedError"));
    const user = userEvent.setup();
    const { container } = render(<VideoFeed />);
    const firstSlide = container.querySelector(".watch-slide") as HTMLElement;

    expect(await screen.findByRole("status")).toHaveTextContent("Tap the video to start playback.");
    await user.click(within(firstSlide).getByRole("button", { name: "Play Ghee masala dosa video" }));
    expect(play).toHaveBeenCalledTimes(2);
  });

  it("supports keyboard movement and preserves the poster when a clip fails", async () => {
    const { container } = render(<VideoFeed />);
    const feed = screen.getByLabelText("Food video feed. Scroll or swipe for the next clip.");
    const firstSlide = container.querySelector(".watch-slide") as HTMLElement;
    const secondSlide = container.querySelectorAll(".watch-slide")[1] as HTMLElement;
    const scrollIntoView = vi.fn();
    secondSlide.scrollIntoView = scrollIntoView;

    feed.focus();
    fireEvent.keyDown(feed, { key: "ArrowDown" });
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });

    fireEvent.error(firstSlide.querySelector("video") as HTMLVideoElement);
    expect(screen.getByRole("status")).toHaveTextContent("Clip unavailable");
    expect(firstSlide.querySelector("video")).toBeNull();
    expect(firstSlide.querySelector("img")).not.toBeNull();
    expect(within(firstSlide).getByRole("link", { name: /Dosa Social/ })).toHaveAttribute("href", "/restaurants/dosa-social");
  });
});
