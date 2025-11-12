export default async function handler(req, res) {
  const channels = {
    trgoals_main: {
      url: "https://eight.04bf112a615942b28.sbs/yayin1.m3u8",
      headers: {
        Referer: "https://trgoalsgiris.xyz/",
        Origin: "https://trgoalsgiris.xyz/",
        "User-Agent": "ExoPlayer"
      }
    },
    inattv_main: {
      url: "https://eight.04bf112a615942b28.sbs/yayinzirve.m3u8",
      headers: {
        Referer: "https://inattv.xyz/",
        Origin: "https://inattv.xyz/",
        "User-Agent": "ExoPlayer"
      }
    }
  };

  const ch = req.query.ch;
  if (!ch || !channels[ch]) return res.status(404).send("Kanal bulunamadı");

  try {
    const target = channels[ch].url;
    const headers = channels[ch].headers;

    const response = await fetch(target, { headers });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", response.headers.get("content-type") || "application/vnd.apple.mpegurl");
    const data = await response.arrayBuffer();
    res.status(response.status).send(Buffer.from(data));
  } catch (e) {
    res.status(500).send
