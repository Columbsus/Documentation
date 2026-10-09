// Static redirects (including the site root) need metadata for crawlers that
// do not follow JavaScript or meta-refresh redirects. Reuse the target page's
// rendered tags so aliases always share the same preview as their destination.
module.exports.register = function () {
  this.on('redirectsProduced', ({ contentCatalog }) => {
    for (const alias of contentCatalog.findBy({ family: 'alias' })) {
      if (!alias.out || !alias.contents || !alias.rel?.contents) continue
      const targetHead = alias.rel.contents.toString().match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1]
      if (!targetHead) continue
      const tags = targetHead.match(/<meta\b[^>]*(?:property="og:[^"]+"|name="twitter:[^"]+")[^>]*>/g)
      if (!tags?.length) continue
      const html = alias.contents.toString()
      if (html.includes('property="og:')) continue
      alias.contents = Buffer.from(html.replace(/<meta charset="utf-8">/, (charset) => `${charset}\n${tags.join('\n')}`))
    }
  })
}
