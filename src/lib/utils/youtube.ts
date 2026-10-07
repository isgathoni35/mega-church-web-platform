/**
 * YouTube Utility functions for parsing video IDs, generating thumbnails,
 * and creating privacy-enhanced embed URLs.
 */

export function getYouTubeId(url: string): string | null {
  if (!url) return null;

  // Handle standard URL, short URL, embed URL, live stream URL
  const regExp =
    /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|live\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

  const match = url.match(regExp);

  if (match && match[1] && match[1].length === 11) {
    return match[1];
  }

  // If the string itself is directly an 11-char video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }

  return null;
}

export function getYouTubeThumbnail(urlOrId: string): string {
  if (!urlOrId) return "";
  const id = getYouTubeId(urlOrId) || urlOrId;
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export function getYouTubeEmbedUrl(
  videoId: string,
  autoplay: boolean = false
): string {
  if (!videoId) return "";
  const autoPlayParam = autoplay ? "1" : "0";
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoPlayParam}&rel=0&modestbranding=1&enablejsapi=1`;
}
