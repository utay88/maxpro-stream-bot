export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing stream URL' });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    response.body.pipe(res);
  } catch (err) {
    res.status(500).json({ error: 'Stream fetch failed', details: err.message });
  }
}
