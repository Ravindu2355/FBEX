export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const url = req.query.url;

    if (!url) {
      return res.status(400).json({ error: "Missing url parameter" });
    }

    const html = await fetch(url, {
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
        "Upgrade-Insecure-Requests": "1",
        "Referer": "https://www.facebook.com/",
        "Connection": "keep-alive",
        "Cookie": "UID=299877271; X-CSRF-TOKEN=NMTTBWd_Gwg4KqivZEFsJteMQI4psVi3"
                // Optional cookies
        // "Cookie": "sb=xxx; datr=xxx;"
      }
    }).then(r => r.text());

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");

    res.status(200).send(html);

  } catch (e) {
    res.status(500).json({
      error: "Fetch failed",
      message: e.message
    });
  }
}
