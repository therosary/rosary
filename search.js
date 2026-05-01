// ✝ THE ROSARY — Full Site Crawler Search Engine
// Automatically reads every HTML page and builds a live search index

(function () {

  // ── ALL PAGES ON THE SITE ──────────────────────────────────────────────────
  const ALL_PAGES = [
    "index.html","how-to-pray.html","mystery.html","reading.html",
    "prayer-request.html","prayers.html","gallery.html",
    "power-of-the-rosary.html","shop.html","about.html","contact.html",
    "prayers-rosary.html","prayers-marian.html","prayers-morning.html",
    "prayers-evening.html","prayers-bedtime.html","prayers-family.html",
    "prayers-meal.html","prayers-deceased.html","prayers-saint-joseph.html",
    "prayers-eucharistic.html","prayers-traditional.html","prayers-goingout.html",
    "prayer-the-hail-mary.html","prayer-the-our-father.html",
    "prayer-the-glory-be.html","prayer-the-apostles-creed.html",
    "prayer-the-nicene-creed.html","prayer-the-hail-holy-queen.html",
    "prayer-hail-holy-queen.html","prayer-the-memorare.html",
    "prayer-the-magnificat.html","prayer-the-angelus.html",
    "prayer-the-angelus-blessing.html","prayer-the-sign-of-the-cross.html",
    "prayer-the-confiteor.html","prayer-the-f-tima-prayer.html",
    "prayer-act-of-contrition.html","prayer-act-of-faith.html",
    "prayer-act-of-hope.html","prayer-act-of-love.html",
    "prayer-act-of-spiritual-communion.html",
    "prayer-act-of-surrender-before-sleep.html",
    "prayer-anima-christi.html","prayer-divine-mercy-chaplet.html",
    "prayer-rosary-for-the-deceased.html",
    "prayer-closing-prayer-of-the-rosary.html",
    "prayer-litany-of-humility.html",
    "prayer-litany-of-saint-joseph-short.html",
    "prayer-sub-tuum-praesidium.html","prayer-salve-regina-evening.html",
    "prayer-te-deum.html","prayer-tantum-ergo.html",
    "prayer-st-patrick-s-breastplate.html",
    "prayer-psalm-130-de-profundis.html",
    "prayer-o-sacrament-most-holy.html","prayer-morning-offering.html",
    "prayer-short-morning-prayer.html","prayer-come-holy-spirit.html",
    "prayer-prayer-before-work.html","prayer-prayer-before-sleep.html",
    "prayer-prayer-before-holy-communion.html",
    "prayer-prayer-before-a-festive-meal.html",
    "prayer-prayer-after-holy-communion-st-thomas-aquinas.html",
    "prayer-prayer-after-a-funeral.html",
    "prayer-prayer-for-a-holy-death.html",
    "prayer-prayer-for-a-marriage.html",
    "prayer-prayer-for-a-deceased-parent.html",
    "prayer-prayer-for-a-family-in-difficulty.html",
    "prayer-prayer-for-all-souls-in-purgatory.html",
    "prayer-prayer-for-children.html","prayer-prayer-for-parents.html",
    "prayer-prayer-for-mary-s-intercession.html",
    "prayer-prayer-for-peaceful-sleep.html",
    "prayer-prayer-for-protection.html",
    "prayer-prayer-of-adoration-before-the-blessed-sacrament.html",
    "prayer-prayer-of-gratitude-before-eating.html",
    "prayer-prayer-of-surrender-for-the-day.html",
    "prayer-prayer-to-our-lady-before-sleep.html",
    "prayer-prayer-to-our-lady-of-fatima.html",
    "prayer-prayer-to-saint-joseph.html",
    "prayer-prayer-to-saint-joseph-for-a-happy-death.html",
    "prayer-prayer-to-saint-joseph-for-families.html",
    "prayer-prayer-to-saint-joseph-for-fathers.html",
    "prayer-prayer-to-saint-joseph-for-work.html",
    "prayer-prayer-to-st-christopher.html",
    "prayer-prayer-to-the-guardian-angel.html",
    "prayer-guardian-angel-prayer.html",
    "prayer-memorare-to-saint-joseph.html",
    "prayer-examination-of-conscience.html","prayer-eternal-rest.html",
    "prayer-lighting-a-candle-for-the-dead.html",
    "prayer-family-prayer.html","prayer-family-meal-blessing.html",
    "prayer-family-consecration-to-the-sacred-heart.html",
    "prayer-sunday-family-prayer.html","prayer-bless-us-o-lord.html",
    "prayer-short-meal-prayer.html","prayer-thanksgiving-after-meals.html",
    "prayer-night-prayer.html","prayer-evening-prayer.html",
    "prayer-blessing-for-children-at-night.html",
    "prayer-into-your-hands.html","prayer-into-your-hands-night.html",
    "prayer-short-prayer-before-leaving-home.html",
    "prayer-traveler-s-prayer.html",
  ];

  const CACHE_KEY = 'rosary_search_index_v3';
  const CACHE_TTL = 1000 * 60 * 60 * 6; // 6 hours

  let searchIndex = [];
  let indexReady = false;
  let indexBuilding = false;

  // ── EXTRACT CONTENT FROM HTML ──────────────────────────────────────────────
  function extractFromHTML(html, filename) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const rawTitle = doc.querySelector('title')?.textContent || '';
    const title = rawTitle.replace(/\s*[—–-]\s*The Rosary\s*$/i, '').trim();
    const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const bannerLabel = doc.querySelector('.banner-label')?.textContent?.trim() || '';

    // Remove nav/footer/share noise
    ['nav','.site-header','.site-footer','.share-section','.related-section',
     '.search-wrap','script','style','.nav-list','.footer-links'].forEach(sel => {
      doc.querySelectorAll(sel).forEach(el => el.remove());
    });

    const bodyText = (doc.body?.innerText || doc.body?.textContent || '')
      .replace(/\s+/g, ' ').trim().substring(0, 3000);

    return {
      href: filename,
      title: title || filename.replace('.html','').replace(/-/g,' '),
      description,
      category: bannerLabel,
      body: bodyText,
      searchText: (title+' '+description+' '+bannerLabel+' '+bodyText).toLowerCase()
    };
  }

  // ── BUILD INDEX ────────────────────────────────────────────────────────────
  async function buildIndex() {
    if (indexBuilding) return;
    indexBuilding = true;

    // Try session cache
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { ts, data } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL && data.length > 10) {
          searchIndex = data;
          indexReady = true;
          updateStatus('ready');
          return;
        }
      }
    } catch(e) {}

    updateStatus('building');

    const results = [];
    const batchSize = 10;
    for (let i = 0; i < ALL_PAGES.length; i += batchSize) {
      const batch = ALL_PAGES.slice(i, i + batchSize);
      const settled = await Promise.allSettled(
        batch.map(async page => {
          try {
            const res = await fetch(page, { cache: 'force-cache' });
            if (!res.ok) return null;
            const html = await res.text();
            return extractFromHTML(html, page);
          } catch(e) { return null; }
        })
      );
      settled.forEach(r => { if (r.status === 'fulfilled' && r.value) results.push(r.value); });
    }

    searchIndex = results;
    indexReady = true;

    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: results }));
    } catch(e) {}

    updateStatus('ready');

    // Re-render if user already typed something
    const input = document.getElementById('searchInput');
    if (input && input.value.trim().length >= 2) renderResults(input.value.trim());
  }

  // ── SEARCH ─────────────────────────────────────────────────────────────────
  function searchSite(query) {
    if (!query || query.trim().length < 2) return [];
    const q = query.toLowerCase().trim();
    const words = q.split(/\s+/).filter(w => w.length > 1);

    return searchIndex.map(item => {
      let score = 0;
      words.forEach(w => {
        if (item.title.toLowerCase().includes(w)) score += 20;
        if (item.category.toLowerCase().includes(w)) score += 10;
        if (item.description.toLowerCase().includes(w)) score += 8;
        if (item.body.toLowerCase().includes(w)) score += 3;
      });
      if (item.title.toLowerCase().includes(q)) score += 30;
      if (item.body.toLowerCase().includes(q)) score += 10;
      return { ...item, score };
    })
    .filter(i => i.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
  }

  function highlight(text, query) {
    if (!query || !text) return text || '';
    const words = query.trim().toLowerCase().split(/\s+/);
    let r = text;
    words.forEach(w => {
      if (w.length < 2) return;
      r = r.replace(new RegExp(`(${w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi'), '<mark>$1</mark>');
    });
    return r;
  }

  function getExcerpt(item, query) {
    if (!item.body || !query) return '';
    const q = query.toLowerCase();
    const firstWord = q.split(' ')[0];
    const idx = item.body.toLowerCase().indexOf(firstWord);
    if (idx === -1) return '';
    const start = Math.max(0, idx - 40);
    const end = Math.min(item.body.length, idx + 130);
    const excerpt = (start > 0 ? '…' : '') + item.body.slice(start, end) + (end < item.body.length ? '…' : '');
    return highlight(excerpt, query);
  }

  // ── STATUS ─────────────────────────────────────────────────────────────────
  function updateStatus(status) {
    const hint = document.getElementById('searchHint');
    const input = document.getElementById('searchInput');
    if (!hint) return;
    if (status === 'building') {
      hint.innerHTML = `<span class="shi">⏳</span><span>Building search index…</span>`;
      if (input) input.placeholder = 'Indexing pages, please wait…';
    } else {
      hint.innerHTML = `<span class="shi">✝</span><span>Search across all ${searchIndex.length} pages</span>`;
      if (input) input.placeholder = 'Search prayers, mysteries, guides…';
    }
  }

  // ── RENDER ─────────────────────────────────────────────────────────────────
  function renderResults(q) {
    const container = document.getElementById('searchResults');
    if (!container) return;

    if (!q || q.length < 2) {
      container.innerHTML = `<div class="search-hint" id="searchHint">
        <span class="shi">${indexReady ? '✝' : '⏳'}</span>
        <span>${indexReady ? 'Search across all '+searchIndex.length+' pages' : 'Preparing search…'}</span>
      </div>`;
      return;
    }

    if (!indexReady) {
      container.innerHTML = `<div class="search-hint" id="searchHint"><span class="shi">⏳</span><span>Still indexing, please wait…</span></div>`;
      return;
    }

    const found = searchSite(q);

    if (!found.length) {
      container.innerHTML = `<div class="search-no-results">
        No results for "<em>${q}</em>"<br/>
        <small>Try: hail mary · rosary · morning · joseph · deceased</small>
      </div>`;
      return;
    }

    container.innerHTML = found.map(item => {
      const excerpt = getExcerpt(item, q);
      return `<a class="sri" href="${item.href}">
        <div class="sri-icon">✝</div>
        <div class="sri-body">
          <div class="sri-title">${highlight(item.title, q)}</div>
          ${item.category ? `<div class="sri-cat">${item.category}</div>` : ''}
          ${excerpt ? `<div class="sri-excerpt">${excerpt}</div>` : ''}
        </div>
        <div class="sri-arrow">→</div>
      </a>`;
    }).join('');
  }

  // ── INJECT UI ──────────────────────────────────────────────────────────────
  function injectSearchBar() {
    const header = document.querySelector('.site-header .header-inner');
    if (!header || document.getElementById('searchWrap')) return;

    // Insert before nav toggle if it exists
    const navToggle = header.querySelector('.nav-toggle');
    const searchHTML = `<div class="search-wrap" id="searchWrap">
      <button class="search-toggle" id="searchToggle" aria-label="Search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </button>
      <div class="search-dropdown" id="searchDropdown">
        <div class="search-input-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--gold);opacity:.6;flex-shrink:0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="searchInput" class="search-input" placeholder="Search prayers, mysteries, guides…" autocomplete="off" spellcheck="false"/>
          <button class="search-clear" id="searchClear" style="display:none" aria-label="Clear">✕</button>
        </div>
        <div class="search-results" id="searchResults">
          <div class="search-hint" id="searchHint">
            <span class="shi">⏳</span><span>Preparing search…</span>
          </div>
        </div>
      </div>
    </div>`;

    if (navToggle) navToggle.insertAdjacentHTML('beforebegin', searchHTML);
    else header.insertAdjacentHTML('beforeend', searchHTML);

    document.head.insertAdjacentHTML('beforeend', `<style>
      .search-wrap{position:relative;display:flex;align-items:center}
      .search-toggle{background:none;border:1px solid var(--gold-dim);color:var(--gold);padding:.45rem .55rem;cursor:pointer;display:flex;align-items:center;transition:all .25s;flex-shrink:0}
      .search-toggle:hover{border-color:var(--gold);background:rgba(201,168,76,.08)}
      .search-dropdown{display:none;position:fixed;top:70px;left:50%;transform:translateX(-50%);width:min(520px,calc(100vw - 1.5rem));background:var(--deep);border:1px solid var(--gold-dim);border-top:2px solid var(--gold);z-index:9999;box-shadow:0 16px 50px rgba(0,0,0,.75)}
      .search-dropdown.open{display:block}
      .search-input-wrap{display:flex;align-items:center;padding:.75rem 1rem;border-bottom:1px solid var(--gold-dim);gap:.6rem}
      .search-input{flex:1;background:none;border:none;outline:none;font-family:'EB Garamond',serif;font-size:1.05rem;color:var(--cream);min-width:0}
      .search-input::placeholder{color:var(--faint)}
      .search-clear{background:none;border:none;color:var(--faint);cursor:pointer;font-size:.75rem;padding:.2rem .4rem;transition:color .2s;flex-shrink:0}
      .search-clear:hover{color:var(--gold)}
      .search-results{max-height:440px;overflow-y:auto}
      .search-results::-webkit-scrollbar{width:3px}
      .search-results::-webkit-scrollbar-thumb{background:var(--gold-dim)}
      .search-hint{display:flex;align-items:center;gap:.7rem;padding:1.2rem 1rem;color:var(--faint);font-family:'Cormorant Garamond',serif;font-style:italic;font-size:.9rem}
      .shi{color:var(--gold);opacity:.5;font-size:.85rem}
      .search-no-results{padding:1.5rem 1rem;text-align:center;color:var(--faint);font-family:'Cormorant Garamond',serif;font-style:italic;font-size:.95rem}
      .search-no-results small{font-size:.78rem;color:var(--faint);display:block;margin-top:.5rem;font-style:normal}
      .sri{display:flex;align-items:flex-start;gap:.8rem;padding:.9rem 1rem;text-decoration:none;border-bottom:1px solid rgba(201,168,76,.06);transition:background .2s}
      .sri:last-child{border-bottom:none}
      .sri:hover{background:rgba(201,168,76,.06)}
      .sri-icon{color:var(--gold);opacity:.3;font-size:.6rem;flex-shrink:0;margin-top:.35rem}
      .sri-body{flex:1;min-width:0}
      .sri-title{font-family:'Cormorant Garamond',serif;font-size:1.05rem;color:var(--cream);line-height:1.3}
      .sri-title mark{background:none;color:var(--gold);font-weight:600}
      .sri-cat{font-family:'Cinzel',serif;font-size:.5rem;letter-spacing:.15em;color:var(--faint);text-transform:uppercase;margin-top:.15rem}
      .sri-excerpt{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:.85rem;color:var(--muted);line-height:1.6;margin-top:.3rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
      .sri-excerpt mark{background:none;color:var(--gold-light);font-style:normal}
      .sri-arrow{color:var(--gold);opacity:.2;font-size:.8rem;flex-shrink:0;margin-top:.2rem;transition:opacity .2s}
      .sri:hover .sri-arrow{opacity:1}
      @media(max-width:480px){.search-dropdown{top:58px}}
    </style>`);

    // Events
    const toggle = document.getElementById('searchToggle');
    const dropdown = document.getElementById('searchDropdown');
    const input = document.getElementById('searchInput');
    const clearBtn = document.getElementById('searchClear');
    let debounce;

    toggle.addEventListener('click', e => {
      e.stopPropagation();
      const opening = !dropdown.classList.contains('open');
      dropdown.classList.toggle('open');
      if (opening) setTimeout(() => input.focus(), 60);
    });

    input.addEventListener('input', () => {
      clearTimeout(debounce);
      const q = input.value.trim();
      clearBtn.style.display = q ? 'block' : 'none';
      debounce = setTimeout(() => renderResults(q), 200);
    });

    clearBtn.addEventListener('click', () => {
      input.value = '';
      clearBtn.style.display = 'none';
      renderResults('');
      input.focus();
    });

    input.addEventListener('keydown', e => {
      if (e.key === 'Escape') { dropdown.classList.remove('open'); toggle.focus(); }
    });

    document.addEventListener('click', e => {
      if (!document.getElementById('searchWrap').contains(e.target))
        dropdown.classList.remove('open');
    });

    // Start building immediately in background
    buildIndex();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(injectSearchBar, 100));
  } else {
    setTimeout(injectSearchBar, 100);
  }

})();
