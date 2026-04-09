import { XMLParser } from "fast-xml-parser";
import type { VideoParams } from "../types";

export async function getLatestYoutubeVideo(channelId: string): Promise<VideoParams | null> {
  const res = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
  );

  if (!res.ok) return null;

  const xml = await res.text();
  const parser = new XMLParser();
  const data = parser.parse(xml);

  const entry = data.feed.entry?.[0];
  if (!entry) return null;

  return {
    videoId: entry["yt:videoId"],
    title: entry.title,
  };
}
