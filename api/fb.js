export default async function handler(req, res) {
  try {
    const videoUrl = req.query.url;

    if (!videoUrl || !videoUrl.includes("facebook.com")) {
      return res.status(400).json({ error: "Invalid Facebook video URL" });
    }

    // Fetch page like a real browser
    const html = await fetch(videoUrl, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        "Accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "sec-ch-ua":
          `"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"`,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": `"Windows"`,
        "Referer": "https://www.facebook.com/",
        "Upgrade-Insecure-Requests": "1"
        // 🔐 For private videos (optional)
        // "Cookie": "sb=xxx; datr=xxx;"
      }
    }).then(r => r.text());

    const result = extractFB(html);

    if (!result.sources.length) {
      return res.status(404).json({ error: "No streams found" });
    }

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json(result);

  } catch (e) {
    return res.status(500).json({ error: "Failed", message: e.message });
  }
}

/* ============================= */

function extractFB(html) {
  html = decode(html);

  // Thumbnail
  const thumb =
    html.match(/<img[^>]+src="([^"]+\.jpg[^"]*)"/i)?.[1] || null;

  // DASH representations
  const dashMatch = html.match(
    /"dash_prefetch_representations"\s*:\s*(\{[\s\S]*?\})\s*,\s*"support_device_volume_buttons"/
  );

  if (!dashMatch) return { thumb, sources: [] };

  const dash = JSON.parse(dashMatch[1]);

  const sources = (dash.representations || []).map(r => {
    const isVideo = r.mime_type.startsWith("video");

    return {
      label: isVideo ? `${r.width}p` : "Audio",
      src: r.base_url,
      type: r.mime_type,
      quality: isVideo ? `${r.width}p` : "audio"
    };
  });

  return { thumb, sources };
}

/* ============================= */

function decode(t) {
  return t
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
          }
