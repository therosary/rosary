// Shared navigation & footer injector
function injectNav(activePage) {
  const pages = [
    { href: 'index.html', label: 'Home' },
    { href: 'how-to-pray.html', label: 'How to Pray' },
    { href: 'mystery.html', label: 'Mystery of the Day' },
    { href: 'reading.html', label: 'Reading of the Day' },
    { href: 'prayer-request.html', label: 'Prayer Requests' },
    { href: 'shop.html', label: 'Recommended Items' },
  ];
  const links = pages.map(p =>
    `<li><a href="${p.href}"${p.href === activePage ? ' class="active"' : ''}>${p.label}</a></li>`
  ).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <div class="top-bar"></div>
    <header class="site-header">
      <div class="header-inner">
        <a class="site-logo" href="index.html">
          <span class="logo-main">✝ THE ROSARY</span>
          <span class="logo-sub">Pray · Reflect · Believe</span>
        </a>
        <button class="nav-toggle" onclick="document.getElementById('mainNav').classList.toggle('open')">☰ Menu</button>
        <ul class="main-nav" id="mainNav">${links}</ul>
      </div>
    </header>
  `);

  document.body.insertAdjacentHTML('beforeend', `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="logo-main">✝ THE ROSARY</span>
          <p>Pray. Reflect. Believe.<br/>A place of devotion for all the faithful.</p>
        </div>
        <div class="footer-links">
          <h4>Navigation</h4>
          <ul>${pages.map(p=>`<li><a href="${p.href}">${p.label}</a></li>`).join('')}</ul>
        </div>
       <div class="footer-social">
  <h4>Community</h4>

  <a href="https://www.facebook.com/Catholicholyrosary"
     class="fb-btn"
     target="_blank"
     rel="noopener"
     style="font-size:.58rem;padding:.6rem 1.2rem;">
     
    <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>

    Facebook Page
  </a>

  <!-- NEW BUTTON -->
  <a href="shop.html"
   class="btn-outline"
   style="display:inline-flex;align-items:center;gap:.6rem;margin-top:10px;font-size:.99rem;padding:.8rem 1.8rem;">
  🛍️ Recommended Items
</a>
  </a>

</div>
        
      </div>
      <div class="footer-bottom">
        <p>As an Amazon Associate, this site earns from qualifying purchases. · © 2025 The Rosary · All rights reserved.</p>
      </div>
    </footer>
  `);

  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);} });
  },{threshold:0.08});
  document.querySelectorAll('.reveal').forEach(r => obs.observe(r));
}
