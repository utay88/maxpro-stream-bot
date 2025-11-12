import fetch from "node-fetch";

export default async function handler(req, res) {
  const streamUrl = req.query.url;

  if (!streamUrl) {
    return res.status(400).json({ error: "URL parametresi eksik." });
  }

  try {
    const response = await fetch(streamUrl);
    if (!response.ok) {
      throw new Error("Yayın alınamadı.");
    }

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    const data = await response.text();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
