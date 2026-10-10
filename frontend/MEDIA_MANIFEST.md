# Prototype media

All media illustrates fictional dishes and places. None was captured at the demo businesses.

| Use | Creator | Source | Licence |
| --- | --- | --- | --- |
| Biryani / Rice Radio | Shreyak Singh | https://unsplash.com/photos/0j4bisyPo3M | Unsplash License |
| Dosa / Dosa Social | Zoshua Colah | https://unsplash.com/photos/3qHDm3IQCUs | Unsplash License |
| Burger / Bun Theory | Ghaly Wedinly | https://unsplash.com/photos/Md54Ida-hiI | Unsplash License |

Licence: https://unsplash.com/license. Source and licence checked 29 September 2026. Images are served directly from images.unsplash.com; no local download was made. URLs are maintained in `src/mocks/places.ts`. Network access is required for photos. The listed prices, businesses, and sentiment figures are synthetic.

## Illustrative video clips

| Dish | Creator | Source | Licence | Notes |
| --- | --- | --- | --- | --- |
| Biryani | Subhrajyoti Paul | https://www.pexels.com/video/delicious-homemade-biryani-cooking-process-36886083/ | Pexels License | 9:16, 15 seconds; local 720 × 1280 demo encode |
| Dosa | aksinfo7 universe | https://www.pexels.com/video/dosa-preparation-on-hot-griddle-36747875/ | Pexels License | 16:9 clip cropped into portrait frame |
| Burger | Katerina Holmes | https://www.pexels.com/video/person-making-a-hamburger-5907166/ | Pexels License | 9:16, 10 seconds |

Licence: https://www.pexels.com/license/. Source and licence checked 8 October 2026. Allowlisted Pexels URLs are maintained in `src/mocks/video-clips.ts`. The dosa and burger clips stream through the same-origin demo route `src/app/api/demo-media/[placeId]/route.ts` with byte-range support. The biryani clip is served from `public/demo-media/rice-radio.mp4`, a local H.264, 720 × 1280, no-audio encode of the credited Pexels source. The original was 51,827,248 bytes; the optimized file is 1,245,509 bytes (about 98% smaller). It was encoded with `ffmpeg -vf scale=720:1280 -c:v libx264 -preset medium -crf 29 -pix_fmt yuv420p -an -movflags +faststart`. Only the visible clip receives a media URL. Posters remain available when media fails or the device is offline. The dosa and biryani files have no audio track, so the feed labels them “No audio”; the burger clip has an audio track and offers a sound toggle. Captions in the feed describe visual content; do not interpret these clips as footage of the fictional venues.
