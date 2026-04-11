// ✝ THE ROSARY — Shared Navigation, Footer & SEO Injector

function injectNav(activePage) {

  // Main nav items (shown directly on desktop)
  const mainPages = [
    { href: 'index.html',          label: 'Home' },
    { href: 'how-to-pray.html',    label: 'How to Pray' },
    { href: 'mystery.html',        label: 'Mystery of the Day' },
    { href: 'reading.html',        label: 'Reading of the Day' },
    { href: 'prayer-request.html', label: 'Prayer Requests' },
    { href: 'shop.html',           label: 'Shop' },
  ];

  // Grouped under "More ▾" dropdown on desktop
  const morePages = [
    { href: 'gallery.html',              label: '📿 Gallery',            desc: 'The mysteries in pictures' },
    { href: 'power-of-the-rosary.html',  label: '✝ Power of the Rosary', desc: 'The 15 promises & more' },
    { href: 'prayers.html',              label: '🙏 Prayers',             desc: 'Full Catholic prayer library' },
  ];

  // All pages (for footer + mobile menu)
  const allPages = [...mainPages, ...morePages];

  // Check if active page is inside the "More" group
  const moreIsActive = morePages.some(p => p.href === activePage);

  // Build main nav links
  const mainLinks = mainPages.map(p =>
    `<li><a href="${p.href}"${p.href === activePage ? ' class="active"' : ''}>${p.label}</a></li>`
  ).join('');

  // Build "More" dropdown items
  const moreDropItems = morePages.map(p => `
    <li>
      <a href="${p.href}" class="dropdown-item${p.href === activePage ? ' active' : ''}">
        <span class="di-label">${p.label}</span>
        <span class="di-desc">${p.desc}</span>
      </a>
    </li>`).join('');

  // Build mobile-only extra links (shown after Shop in ☰ menu)
  const moreLinksForMobile = morePages.map(p =>
    `<li class="mobile-only"><a href="${p.href}"${p.href === activePage ? ' class="active"' : ''}>${p.label}</a></li>`
  ).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <style>
      /* ── Dropdown styles ── */
      .nav-more{position:relative}
      .nav-more-btn{display:flex;align-items:center;height:100%;padding:0 1rem;font-family:'Cinzel',serif;font-size:0.62rem;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;color:var(--warm);background:none;border:none;cursor:pointer;border-bottom:2px solid transparent;transition:color .25s,border-color .25s;white-space:nowrap;gap:.35rem}
      .nav-more-btn:hover,.nav-more-btn.active{color:var(--gold);border-bottom-color:var(--gold)}
      .nav-more-btn .caret{font-size:.5rem;transition:transform .25s;display:inline-block}
      .nav-more:hover .caret,.nav-more.open .caret{transform:rotate(180deg)}
      .dropdown-menu{display:none;position:absolute;top:100%;right:0;background:var(--deep);border:1px solid var(--gold-dim);border-top:2px solid var(--gold);min-width:230px;z-index:300;list-style:none;padding:.5rem 0}
      .nav-more:hover .dropdown-menu,.nav-more.open .dropdown-menu{display:block}
      .dropdown-item{display:block;padding:.8rem 1.4rem;text-decoration:none;transition:background .2s;border-bottom:1px solid rgba(201,168,76,.06)}
      .dropdown-item:last-child{border-bottom:none}
      .dropdown-item:hover{background:rgba(201,168,76,.06)}
      .dropdown-item.active .di-label{color:var(--gold)}
      .di-label{display:block;font-family:'Cinzel',serif;font-size:.62rem;letter-spacing:.16em;text-transform:uppercase;color:var(--warm);margin-bottom:.15rem}
      .di-desc{display:block;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:.82rem;color:var(--faint)}
      .dropdown-item:hover .di-label{color:var(--gold)}
      /* Mobile only items hidden on desktop */
      @media(min-width:769px){.mobile-only{display:none!important}}
      /* Mobile: show all flat, no dropdown button */
      @media(max-width:768px){
        .nav-more-btn{display:none!important}
        .dropdown-menu{display:none!important}
      }
    </style>
    <div class="top-bar"></div>
    <header class="site-header">
      <div class="header-inner">
        <a class="site-logo" href="index.html">
          <span class="logo-main">✝ THE ROSARY</span>
          <span class="logo-sub">Pray · Reflect · Believe</span>
        </a>
        <button class="nav-toggle" aria-label="Toggle navigation" onclick="document.getElementById('mainNav').classList.toggle('open')">☰ Menu</button>
        <ul class="main-nav" id="mainNav">
          ${mainLinks}
          ${moreLinksForMobile}
          <li class="nav-more" id="navMore">
            <button class="nav-more-btn${moreIsActive ? ' active' : ''}" onclick="document.getElementById('navMore').classList.toggle('open')">
              More <span class="caret">▼</span>
            </button>
            <ul class="dropdown-menu">
              ${moreDropItems}
            </ul>
          </li>
        </ul>
      </div>
    </header>
  `);

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    const nm = document.getElementById('navMore');
    if (nm && !nm.contains(e.target)) nm.classList.remove('open');
  });

  document.body.insertAdjacentHTML('beforeend', `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="logo-main">✝ THE ROSARY</span>
          <p>Pray. Reflect. Believe.<br/>A place of devotion for all the faithful.</p>
        </div>
        <div class="footer-links">
          <h4>Navigation</h4>
          <ul>
            ${mainPages.map(p=>`<li><a href="${p.href}">${p.label}</a></li>`).join('')}
          </ul>
        </div>
        <div class="footer-links">
          <h4>More</h4>
          <ul>
            ${morePages.map(p=>`<li><a href="${p.href}">${p.label}</a></li>`).join('')}
            <li><a href="about.html">About Us</a></li>
            <li><a href="privacy-policy.html">Privacy Policy</a></li>
          </ul>
        </div>
        <div class="footer-social">
          <h4>Community</h4>
          <a href="https://www.facebook.com/YOUR-PAGE-LINK" class="fb-btn" target="_blank" rel="noopener" style="font-size:.58rem;padding:.6rem 1.2rem;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Facebook Page
          </a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>As an Amazon Associate, this site earns from qualifying purchases at no extra cost to you. &nbsp;·&nbsp; © ${new Date().getFullYear()} The Rosary &nbsp;·&nbsp; All rights reserved. &nbsp;·&nbsp;
        <a href="about.html" style="color:var(--faint);text-decoration:none">About</a> &nbsp;·&nbsp;
        <a href="privacy-policy.html" style="color:var(--faint);text-decoration:none">Privacy Policy</a></p>
      </div>
    </footer>
  `);

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(r => obs.observe(r));
}


// SEO: WebSite schema for homepage
function injectSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Rosary",
    "url": "https://www.therosary.site",
    "description": "A Catholic devotional website for praying the Rosary, reading daily Mass readings, and growing in faith."
  };
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.text = JSON.stringify(schema);
  document.head.appendChild(s);
}
