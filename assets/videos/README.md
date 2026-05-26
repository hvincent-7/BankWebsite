# Video Assets

Place video files here.

## Expected files

| Filename | Used on | Notes |
|---|---|---|
| `ice-lolly.mp4` | `cocktails.html` — Ice Lolly signature feature | Convert from .mov with: `ffmpeg -i input.mov -vcodec h264 -acodec aac ice-lolly.mp4` |

## Tips

- **Format**: MP4 (H.264) is best for browser compatibility.
- **Size**: Compress to < 10 MB where possible. Use [HandBrake](https://handbrake.fr/) or `ffmpeg`.
- **Orientation**: Portrait (9:16) or landscape both work — the video player adapts.
- **Audio**: The video autoplays muted, so audio is not critical.
