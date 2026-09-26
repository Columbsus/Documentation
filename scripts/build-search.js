const fs = require('fs')
const path = require('path')
const root = path.resolve(__dirname, '..', 'build', 'site')
const out = path.join(root, '_', 'js', 'search-index.js')

function walk (dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return entry.name === '_' ? [] : walk(full)
    return entry.name.endsWith('.html') ? [full] : []
  })
}
function decode (s) {
  return s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'")
}
function textOnly (html) {
  return decode(html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
}
const entries = walk(root).map((file) => {
  const html = fs.readFileSync(file, 'utf8')
  const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || html.match(/<title>([\s\S]*?)<\/title>/i)
  const articleMatch = html.match(/<article[^>]*class="doc"[^>]*>([\s\S]*?)<\/article>/i)
  const title = textOnly(titleMatch ? titleMatch[1] : path.basename(file, '.html'))
  const text = textOnly(articleMatch ? articleMatch[1] : '').slice(0, 5000)
  const url = '/' + path.relative(root, file).split(path.sep).join('/')
  return { title, text, url }
}).filter((x) => x.title && x.text)
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, 'window.PD3_SEARCH_INDEX=' + JSON.stringify(entries) + ';\n')
console.log(`Search index: ${entries.length} pages`)
