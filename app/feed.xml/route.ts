export async function GET() {
  const baseUrl = 'https://egas-viegas-advogados.vercel.app'

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Egas Viegas - Law Firm Insights</title>
    <link>${baseUrl}</link>
    <description>Legal insights and articles from Egas Viegas law firm in Angola</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <item>
      <title>Welcome to Egas Viegas</title>
      <link>${baseUrl}/conteudos</link>
      <description>Discover our legal expertise and services</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
