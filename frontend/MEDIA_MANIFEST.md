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
| Biryani | Subhrajyoti Paul | https://www.pexels.com/video/delicious-homemade-biryani-cooking-process-36886083/ | Pexels License | 9:16, 15 seconds; high resolution |
| Dosa | aksinfo7 universe | https://www.pexels.com/video/dosa-preparation-on-hot-griddle-36747875/ | Pexels License | 16:9 clip cropped into portrait frame |
| Burger | Katerina Holmes | https://www.pexels.com/video/person-making-a-hamburger-5907166/ | Pexels License | 9:16, 10 seconds |

Licence: https://www.pexels.com/license/. Source and licence checked 4 October 2026. Direct media URLs are maintained in `src/mocks/video-clips.ts`. Each URL returned HTTP 200 with `video/mp4` and byte-range support during a HEAD check; this does not prove in-browser playback. The app requests only the active clip after a user presses play; posters appear first. The opening dosa clip is about 4.4 MB, the burger clip about 5.7 MB, and the biryani clip about 52 MB. Replace the high-resolution biryani clip with an optimized version before a public launch. Captions in the feed describe visual content; do not interpret these clips as footage of the fictional venues. No video files are stored in the repository.
