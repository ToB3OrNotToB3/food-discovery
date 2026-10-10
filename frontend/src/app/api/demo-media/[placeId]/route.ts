import { videoClips } from "@/mocks/video-clips";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = { params: Promise<{ placeId: string }> };

export async function GET(request: Request, { params }: Context) {
  const { placeId } = await params;
  const clip = videoClips.find((item) => item.placeId === placeId);
  if (!clip || "optimizedSrc" in clip) return new Response("Clip not found", { status: 404 });

  const range = request.headers.get("range");
  const headers = new Headers();
  if (range && /^bytes=\d*-\d*$/.test(range)) headers.set("Range", range);

  try {
    const upstream = await fetch(clip.source, { headers, cache: "no-store" });
    if (!upstream.ok || !upstream.body) return new Response("Clip unavailable", { status: 502 });

    const responseHeaders = new Headers({
      "Content-Type": "video/mp4",
      "Cache-Control": "public, max-age=3600",
      "Accept-Ranges": "bytes",
    });
    for (const name of ["content-length", "content-range"]) {
      const value = upstream.headers.get(name);
      if (value) responseHeaders.set(name, value);
    }
    return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
  } catch {
    return new Response("Clip unavailable", { status: 502 });
  }
}
