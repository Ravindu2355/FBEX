export default async function handler(req, res) {
    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "*");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {
        const url = req.query.url;

        if (!url) {
            return res.status(400).json({
                error: "Missing url parameter"
            });
        }

        // Fetch original file as binary
        const response = await fetch(url, {
            redirect: "follow",
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/121.0.0.0 Safari/537.36",

                "Accept":
                    "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",

                "Accept-Language":
                    "en-US,en;q=0.9",

                "Referer":
                    "https://www.facebook.com/"
            }
        });

        if (!response.ok) {
            return res.status(response.status).send(
                `Upstream HTTP ${response.status}`
            );
        }

        // Keep the response binary
        const buffer = Buffer.from(await response.arrayBuffer());

        // Preserve original content type
        const contentType =
            response.headers.get("content-type") || "image/jpeg";

        res.setHeader("Content-Type", contentType);
        res.setHeader("Content-Length", buffer.length);
        res.setHeader("Cache-Control", "no-store");

        return res.status(200).send(buffer);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Fetch failed",
            message: error.message
        });
    }
          }
