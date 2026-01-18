export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "sec-ch-ua": "\"Not-A.Brand\";v=\"99\", \"Chromium\";v=\"124\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"Android\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "referer": "https://chative.io/",
        "referrer-policy": "strict-origin-when-cross-origin",
        "user-agent":
          "Mozilla/5.0 (Linux; Android 13; SM-M045F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
      },
    });

    const contentType = response.headers.get("content-type");

    // If JSON
    if (contentType?.includes("application/json")) {
      const json = await response.json();
      return res.status(200).json(json);
    }

    // Else return text/html
    const text = await response.text();
    return res.status(200).send(text);

  } catch (err) {
    return res.status(500).json({
      error: "Fetch failed",
      message: err.message,
    });
  }
  }
