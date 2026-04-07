import https from 'https';

https.get('https://html.duckduckgo.com/html/?q=doiwala+port+blair+reviews', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const regex = /<a class="result__snippet[^>]*>(.*?)<\/a>/g;
    let match;
    while ((match = regex.exec(data)) !== null) {
      console.log(match[1].replace(/<\/?[^>]+(>|$)/g, ""));
    }
  });
});
