export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL parametresi eksik" });
  }

  try {
    // Kullanıcıdan gelen URL'i fetch et
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "*/*",
        "Origin": "https://maxpro-stream-bot.vercel.app"
      }
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Video alınamadı: " + response.status });
    }

    // İçerik türünü koruyarak stream et
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", response.headers.get("content-type") || "application/vnd.apple.mpegurl");

    // Veriyi doğrudan stream olarak gönder
    const data = await response.arrayBuffer();
    res.send(Buffer.from(data));
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası: " + err.message });
  }
}
