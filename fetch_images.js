import https from 'https';

const fetchImg = (title) => new Promise(resolve => {
  https.get({
    hostname: 'en.wikipedia.org',
    path: `/w/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&format=json&pithumbsize=800`,
    headers: { 'User-Agent': 'AIStudioBot/1.0 (test@example.com)' }
  }, res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      try {
        const pages = JSON.parse(data).query.pages;
        const page = Object.values(pages)[0];
        resolve(page.thumbnail ? page.thumbnail.source : null);
      } catch(e) { resolve(null); }
    });
  });
});

(async () => {
  const items = ['Puri_(food)', 'Chana_masala', 'Imarti'];
  for (const item of items) {
    const url = await fetchImg(item);
    console.log(item + ': ' + url);
    await new Promise(r => setTimeout(r, 200));
  }
})();
