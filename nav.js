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
    { href: 'about.html',                label: '✦ About',               desc: 'Our mission and story' },
    { href: 'contact.html',              label: '✉ Contact',             desc: 'Get in touch with us' },
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
          <a href="https://www.facebook.com/Catholicholyrosary" class="fb-btn" target="_blank" rel="noopener" style="font-size:.55rem;padding:.55rem 1rem;margin-top:1.2rem;display:inline-flex;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Follow on Facebook
          </a>
        </div>

        <div class="footer-links">
          <h4>Pages</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="how-to-pray.html">How to Pray the Rosary</a></li>
            <li><a href="mystery.html">Mystery of the Day</a></li>
            <li><a href="reading.html">Reading of the Day</a></li>
            <li><a href="power-of-the-rosary.html">Power of the Rosary</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="prayer-request.html">Prayer Requests</a></li>
            <li><a href="shop.html">Shop</a></li>
          </ul>
        </div>

        <div class="footer-links">
          <h4>Prayers</h4>
          <ul>
            <li><a href="prayers.html">All Prayers</a></li>
            <li><a href="prayers-rosary.html">Rosary Prayers</a></li>
            <li><a href="prayers-marian.html">Marian Prayers</a></li>
            <li><a href="prayers-morning.html">Morning Prayers</a></li>
            <li><a href="prayers-evening.html">Evening Prayers</a></li>
            <li><a href="prayers-bedtime.html">Bedtime Prayers</a></li>
            <li><a href="prayers-family.html">Family Prayers</a></li>
            <li><a href="prayers-meal.html">Meal Prayers</a></li>
            <li><a href="prayers-deceased.html">Prayers for the Deceased</a></li>
            <li><a href="prayers-saint-joseph.html">Saint Joseph Prayers</a></li>
            <li><a href="prayers-eucharistic.html">Eucharistic Prayers</a></li>
            <li><a href="prayers-traditional.html">Traditional Prayers</a></li>
            <li><a href="prayers-goingout.html">Prayers Before Going Out</a></li>
          </ul>
        </div>

        <div class="footer-links">
          <h4>Site</h4>
          <ul>
            <li><a href="about.html">About Us</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="privacy-policy.html">Privacy Policy</a></li>
          </ul>
        </div>

      </div>
      <div class="footer-bottom">
        <p>As an Amazon Associate, this site earns from qualifying purchases at no extra cost to you. &nbsp;·&nbsp; © ${new Date().getFullYear()} The Rosary &nbsp;·&nbsp; All rights reserved.</p>
      </div>
    </footer>
  `);

  // Load search on every page
  if (!document.getElementById('searchScript')) {
    const s = document.createElement('script');
    s.id = 'searchScript';
    s.src = 'search.js';
    document.head.appendChild(s);
  }

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

// ✝ RELATED PRAYERS — call injectRelated(currentPage) on any prayer page
const PRAYER_CATEGORIES = {
  'prayers-rosary.html': { label: 'Rosary Prayers', icon: '📿', prayers: [
    { href: 'prayer-the-apostles-creed.html', title: "The Apostles' Creed" },
    { href: 'prayer-the-our-father.html', title: "The Our Father" },
    { href: 'prayer-the-hail-mary.html', title: "The Hail Mary" },
    { href: 'prayer-the-glory-be.html', title: "The Glory Be" },
    { href: 'prayer-the-f-tima-prayer.html', title: "The Fátima Prayer" },
    { href: 'prayer-the-hail-holy-queen.html', title: "The Hail Holy Queen" },
    { href: 'prayer-closing-prayer-of-the-rosary.html', title: "Closing Prayer of the Rosary" },
    { href: 'prayer-the-memorare.html', title: "The Memorare" },
  ]},
  'prayers-marian.html': { label: 'Marian Prayers', icon: '🌹', prayers: [
    { href: 'prayer-the-hail-mary.html', title: "The Hail Mary" },
    { href: 'prayer-the-memorare.html', title: "The Memorare" },
    { href: 'prayer-the-magnificat.html', title: "The Magnificat" },
    { href: 'prayer-hail-holy-queen.html', title: "Hail Holy Queen" },
    { href: 'prayer-sub-tuum-praesidium.html', title: "Sub Tuum Praesidium" },
    { href: 'prayer-prayer-to-our-lady-of-fatima.html', title: "Prayer to Our Lady of Fatima" },
    { href: 'prayer-the-angelus.html', title: "The Angelus" },
    { href: 'prayer-prayer-for-mary-s-intercession.html', title: "Prayer for Mary's Intercession" },
  ]},
  'prayers-morning.html': { label: 'Morning Prayers', icon: '🌅', prayers: [
    { href: 'prayer-morning-offering.html', title: "Morning Offering" },
    { href: 'prayer-act-of-faith.html', title: "Act of Faith" },
    { href: 'prayer-act-of-hope.html', title: "Act of Hope" },
    { href: 'prayer-act-of-love.html', title: "Act of Love" },
    { href: 'prayer-act-of-contrition.html', title: "Act of Contrition" },
    { href: 'prayer-prayer-to-the-guardian-angel.html', title: "Prayer to the Guardian Angel" },
    { href: 'prayer-come-holy-spirit.html', title: "Come Holy Spirit" },
    { href: 'prayer-short-morning-prayer.html', title: "Short Morning Prayer" },
  ]},
  'prayers-evening.html': { label: 'Evening Prayers', icon: '🌙', prayers: [
    { href: 'prayer-evening-prayer.html', title: "Evening Prayer" },
    { href: 'prayer-examination-of-conscience.html', title: "Examination of Conscience" },
    { href: 'prayer-night-prayer.html', title: "Night Prayer" },
    { href: 'prayer-salve-regina-evening.html', title: "Salve Regina — Evening" },
    { href: 'prayer-litany-of-humility.html', title: "Litany of Humility" },
    { href: 'prayer-prayer-for-a-holy-death.html', title: "Prayer for a Holy Death" },
    { href: 'prayer-into-your-hands.html', title: "Into Your Hands" },
  ]},
  'prayers-bedtime.html': { label: 'Bedtime Prayers', icon: '✨', prayers: [
    { href: 'prayer-prayer-before-sleep.html', title: "Prayer Before Sleep" },
    { href: 'prayer-guardian-angel-prayer.html', title: "Guardian Angel Prayer" },
    { href: 'prayer-prayer-for-peaceful-sleep.html', title: "Prayer for Peaceful Sleep" },
    { href: 'prayer-act-of-surrender-before-sleep.html', title: "Act of Surrender Before Sleep" },
    { href: 'prayer-blessing-for-children-at-night.html', title: "Blessing for Children at Night" },
    { href: 'prayer-prayer-to-our-lady-before-sleep.html', title: "Prayer to Our Lady Before Sleep" },
    { href: 'prayer-into-your-hands-night.html', title: "Into Your Hands — Night" },
  ]},
  'prayers-family.html': { label: 'Family Prayers', icon: '🏠', prayers: [
    { href: 'prayer-family-prayer.html', title: "Family Prayer" },
    { href: 'prayer-prayer-for-parents.html', title: "Prayer for Parents" },
    { href: 'prayer-prayer-for-children.html', title: "Prayer for Children" },
    { href: 'prayer-prayer-for-a-marriage.html', title: "Prayer for a Marriage" },
    { href: 'prayer-family-consecration-to-the-sacred-heart.html', title: "Family Consecration to the Sacred Heart" },
    { href: 'prayer-prayer-for-a-family-in-difficulty.html', title: "Prayer for a Family in Difficulty" },
    { href: 'prayer-sunday-family-prayer.html', title: "Sunday Family Prayer" },
  ]},
  'prayers-meal.html': { label: 'Meal Prayers', icon: '🍞', prayers: [
    { href: 'prayer-bless-us-o-lord.html', title: "Bless Us, O Lord" },
    { href: 'prayer-family-meal-blessing.html', title: "Family Meal Blessing" },
    { href: 'prayer-prayer-of-gratitude-before-eating.html', title: "Prayer of Gratitude Before Eating" },
    { href: 'prayer-short-meal-prayer.html', title: "Short Meal Prayer" },
    { href: 'prayer-the-angelus-blessing.html', title: "The Angelus Blessing" },
    { href: 'prayer-thanksgiving-after-meals.html', title: "Thanksgiving After Meals" },
    { href: 'prayer-prayer-before-a-festive-meal.html', title: "Prayer Before a Festive Meal" },
  ]},
  'prayers-deceased.html': { label: 'Prayers for the Deceased', icon: '🕯️', prayers: [
    { href: 'prayer-eternal-rest.html', title: "Eternal Rest" },
    { href: 'prayer-psalm-130-de-profundis.html', title: "Psalm 130 — De Profundis" },
    { href: 'prayer-prayer-for-a-deceased-parent.html', title: "Prayer for a Deceased Parent" },
    { href: 'prayer-prayer-for-all-souls-in-purgatory.html', title: "Prayer for All Souls in Purgatory" },
    { href: 'prayer-prayer-after-a-funeral.html', title: "Prayer After a Funeral" },
    { href: 'prayer-rosary-for-the-deceased.html', title: "Rosary for the Deceased" },
    { href: 'prayer-lighting-a-candle-for-the-dead.html', title: "Lighting a Candle for the Dead" },
  ]},
  'prayers-saint-joseph.html': { label: 'Saint Joseph Prayers', icon: '⚒️', prayers: [
    { href: 'prayer-prayer-to-saint-joseph.html', title: "Prayer to Saint Joseph" },
    { href: 'prayer-prayer-to-saint-joseph-for-families.html', title: "Saint Joseph for Families" },
    { href: 'prayer-prayer-to-saint-joseph-for-work.html', title: "Saint Joseph for Work" },
    { href: 'prayer-memorare-to-saint-joseph.html', title: "Memorare to Saint Joseph" },
    { href: 'prayer-prayer-to-saint-joseph-for-a-happy-death.html', title: "Saint Joseph for a Happy Death" },
    { href: 'prayer-prayer-to-saint-joseph-for-fathers.html', title: "Saint Joseph for Fathers" },
    { href: 'prayer-litany-of-saint-joseph-short.html', title: "Litany of Saint Joseph" },
  ]},
  'prayers-eucharistic.html': { label: 'Eucharistic Prayers', icon: '✝', prayers: [
    { href: 'prayer-prayer-before-holy-communion.html', title: "Prayer Before Holy Communion" },
    { href: 'prayer-prayer-after-holy-communion-st-thomas-aquinas.html', title: "Prayer After Holy Communion" },
    { href: 'prayer-anima-christi.html', title: "Anima Christi" },
    { href: 'prayer-act-of-spiritual-communion.html', title: "Act of Spiritual Communion" },
    { href: 'prayer-prayer-of-adoration-before-the-blessed-sacrament.html', title: "Adoration Before the Blessed Sacrament" },
    { href: 'prayer-o-sacrament-most-holy.html', title: "O Sacrament Most Holy" },
    { href: 'prayer-tantum-ergo.html', title: "Tantum Ergo" },
  ]},
  'prayers-traditional.html': { label: 'Traditional Catholic Prayers', icon: '📖', prayers: [
    { href: 'prayer-the-sign-of-the-cross.html', title: "The Sign of the Cross" },
    { href: 'prayer-the-nicene-creed.html', title: "The Nicene Creed" },
    { href: 'prayer-the-confiteor.html', title: "The Confiteor" },
    { href: 'prayer-the-angelus.html', title: "The Angelus" },
    { href: 'prayer-te-deum.html', title: "Te Deum" },
    { href: 'prayer-divine-mercy-chaplet.html', title: "Divine Mercy Chaplet" },
    { href: 'prayer-the-lord-s-prayer.html', title: "The Lord's Prayer" },
  ]},
  'prayers-goingout.html': { label: 'Prayers Before Going Out', icon: '🛡️', prayers: [
    { href: 'prayer-prayer-for-protection.html', title: "Prayer for Protection" },
    { href: 'prayer-st-patrick-s-breastplate.html', title: "St. Patrick's Breastplate" },
    { href: 'prayer-traveler-s-prayer.html', title: "Traveler's Prayer" },
    { href: 'prayer-prayer-before-work.html', title: "Prayer Before Work" },
    { href: 'prayer-prayer-of-surrender-for-the-day.html', title: "Prayer of Surrender for the Day" },
    { href: 'prayer-prayer-to-st-christopher.html', title: "Prayer to St. Christopher" },
    { href: 'prayer-short-prayer-before-leaving-home.html', title: "Short Prayer Before Leaving Home" },
  ]},
};

// Build reverse lookup: prayer → category
const PRAYER_TO_CATEGORY = {};
Object.entries(PRAYER_CATEGORIES).forEach(([catPage, catData]) => {
  catData.prayers.forEach(p => {
    if (!PRAYER_TO_CATEGORY[p.href]) PRAYER_TO_CATEGORY[p.href] = [];
    PRAYER_TO_CATEGORY[p.href].push(catPage);
  });
});

function injectRelated(currentPage) {
  const cats = PRAYER_TO_CATEGORY[currentPage] || [];
  if (!cats.length) return;
  const catPage = cats[0];
  const cat = PRAYER_CATEGORIES[catPage];
  if (!cat) return;
  const others = cat.prayers.filter(p => p.href !== currentPage);
  if (!others.length) return;

  const html = `
    <div class="related-section" style="margin-top:2.5rem">
      <div class="related-header">
        <span class="related-icon">${cat.icon}</span>
        <div>
          <div class="related-eyebrow">More from this collection</div>
          <div class="related-cat-name">${cat.label}</div>
        </div>
      </div>
      <div class="related-grid">
        ${others.map(p => `
          <a href="${p.href}" class="related-card">
            <span class="rc-cross">✝</span>
            <span class="rc-title">${p.title}</span>
            <span class="rc-arrow">→</span>
          </a>`).join('')}
      </div>
      <div style="margin-top:1.5rem">
        <a href="${catPage}" class="btn btn-outline" style="font-size:.58rem">View All ${cat.label} →</a>
        <a href="prayers.html" class="btn btn-outline" style="font-size:.58rem;margin-left:.6rem">All Prayer Categories →</a>
      </div>
    </div>
    <style>
      .related-header{display:flex;align-items:center;gap:.9rem;margin-bottom:1.2rem;padding-bottom:1rem;border-bottom:1px solid var(--gold-dim)}
      .related-icon{font-size:1.4rem;flex-shrink:0}
      .related-eyebrow{font-family:'Cinzel',serif;font-size:.55rem;letter-spacing:.25em;color:var(--gold);text-transform:uppercase;margin-bottom:.2rem}
      .related-cat-name{font-family:'Cormorant Garamond',serif;font-size:1.1rem;color:var(--cream)}
      .related-grid{display:flex;flex-direction:column;gap:.4rem}
      .related-card{display:flex;align-items:center;gap:.8rem;padding:.75rem 1rem;text-decoration:none;border:1px solid rgba(201,168,76,.08);background:rgba(201,168,76,.02);transition:all .2s}
      .related-card:hover{border-color:var(--gold-dim);background:rgba(201,168,76,.06)}
      .rc-cross{color:var(--gold);opacity:.4;font-size:.6rem;flex-shrink:0}
      .rc-title{flex:1;font-family:'Cormorant Garamond',serif;font-size:1rem;color:var(--cream);line-height:1.3}
      .rc-arrow{color:var(--gold);opacity:.3;font-size:.75rem;flex-shrink:0;transition:opacity .2s}
      .related-card:hover .rc-arrow{opacity:1}
    </style>`;

  const shareSection = document.querySelector('.share-section');
  if (shareSection) shareSection.insertAdjacentHTML('beforebegin', html);
  else {
    const prayerPage = document.querySelector('.prayer-page');
    if (prayerPage) prayerPage.insertAdjacentHTML('beforeend', html);
  }
}
