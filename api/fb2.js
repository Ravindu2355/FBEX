export default async function handler(req, res) {
  const fbUrl = req.query.url;

  if (!fbUrl) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  // Encode FB URL
  const apiUrl =
    "https://serverless-tooly-gateway-6n4h522y.ue.gateway.dev/facebook/video?url=" +
    encodeURIComponent(fbUrl);

  try {
    const response = await fetch(apiUrl, {
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

    const data = await response.json();

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({
      error: "FB proxy fetch failed",
      message: err.message,
    });
  }
      }
