export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "URL parametresi eksik." });
  }

  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");

    res.setHeader("Content-Type", contentType || "application/vnd.apple.mpegurl");
    const data = await response.text();
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: "Akış yüklenemedi", details: error.message });
  }
}
