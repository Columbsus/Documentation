;(function () {
  var input = document.getElementById('search-input')
  var results = document.getElementById('search-results')
  if (!input || !results) return

  var index = window.PD3_SEARCH_INDEX || []
  var script = document.currentScript
  var src = script && script.src ? script.src : ''
  var siteRoot = src.replace(/_\/js\/docs-search\.js(?:\?.*)?$/, '')

  function escapeHtml (value) {
    return String(value).replace(/[&<>'"]/g, function (ch) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[ch]
    })
  }

  function close () {
    results.hidden = true
    results.innerHTML = ''
  }

  function search (query) {
    var terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
    if (!terms.length) return []
    return index.map(function (entry) {
      var title = (entry.title || '').toLowerCase()
      var text = (entry.text || '').toLowerCase()
      var score = 0
      for (var i = 0; i < terms.length; i++) {
        var term = terms[i]
        if (title.indexOf(term) !== -1) score += 8
        if (text.indexOf(term) !== -1) score += 2
        else if (title.indexOf(term) === -1) return null
      }
      return { entry: entry, score: score }
    }).filter(Boolean).sort(function (a, b) { return b.score - a.score }).slice(0, 8)
  }

  function render () {
    var query = input.value.trim()
    if (query.length < 2) return close()
    var matches = search(query)
    if (!matches.length) {
      results.innerHTML = '<div class="pd3-search-empty">No results found</div>'
      results.hidden = false
      return
    }
    results.innerHTML = matches.map(function (match) {
      var entry = match.entry
      var snippet = entry.text || ''
      if (snippet.length > 150) snippet = snippet.slice(0, 147) + '...'
      return '<a class="pd3-search-result" href="' + siteRoot + entry.url + '">' +
        '<span class="pd3-search-result-title">' + escapeHtml(entry.title) + '</span>' +
        '<span class="pd3-search-result-snippet">' + escapeHtml(snippet) + '</span></a>'
    }).join('')
    results.hidden = false
  }

  input.addEventListener('input', render)
  input.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') { input.blur(); close() }
  })
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.pd3-search-field')) close()
  })
})()
