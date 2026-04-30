// ✝ THE ROSARY — Site-Wide Search Engine

const PRAYER_INDEX = [
  // ROSARY PRAYERS
  { title: "The Apostles' Creed", href: "prayer-the-apostles-creed.html", category: "Rosary Prayers", keywords: "creed believe god father almighty creator heaven earth jesus christ holy spirit" },
  { title: "The Our Father", href: "prayer-the-our-father.html", category: "Rosary Prayers", keywords: "our father who art heaven hallowed thy name kingdom come will done bread forgive trespasses" },
  { title: "The Hail Mary", href: "prayer-the-hail-mary.html", category: "Rosary Prayers", keywords: "hail mary full grace lord thee blessed women fruit womb jesus holy mary mother god sinners" },
  { title: "The Glory Be", href: "prayer-the-glory-be.html", category: "Rosary Prayers", keywords: "glory be father son holy spirit beginning now ever shall be world without end amen" },
  { title: "The Fátima Prayer", href: "prayer-the-f-tima-prayer.html", category: "Rosary Prayers", keywords: "fatima prayer jesus forgive sins save fires hell lead souls heaven especially most need thy mercy" },
  { title: "The Hail Holy Queen", href: "prayer-the-hail-holy-queen.html", category: "Rosary Prayers", keywords: "hail holy queen mother mercy life sweetness hope salve regina" },
  { title: "Closing Prayer of the Rosary", href: "prayer-closing-prayer-of-the-rosary.html", category: "Rosary Prayers", keywords: "closing prayer rosary god only begotten son life death resurrection reward life everlasting" },
  { title: "The Memorare", href: "prayer-the-memorare.html", category: "Rosary Prayers", keywords: "memorare remember gracious virgin mary never known anyone fled thy protection implored help left unaided" },

  // MORNING PRAYERS
  { title: "Morning Offering", href: "prayer-morning-offering.html", category: "Morning Prayers", keywords: "morning offering jesus heart sacred offering prayers works joys sufferings day" },
  { title: "Short Morning Prayer", href: "prayer-short-morning-prayer.html", category: "Morning Prayers", keywords: "short morning prayer wake start day bless guide protect" },
  { title: "Act of Faith", href: "prayer-act-of-faith.html", category: "Morning Prayers", keywords: "act faith believe god revealed holy catholic church" },
  { title: "Act of Hope", href: "prayer-act-of-hope.html", category: "Morning Prayers", keywords: "act hope trust god mercy heaven eternal life" },
  { title: "Act of Love", href: "prayer-act-of-love.html", category: "Morning Prayers", keywords: "act love charity love god above all things neighbor myself" },
  { title: "Act of Contrition", href: "prayer-act-of-contrition.html", category: "Morning Prayers", keywords: "act contrition sorry sins detest offended offend penance amend life" },
  { title: "Come Holy Spirit", href: "prayer-come-holy-spirit.html", category: "Morning Prayers", keywords: "come holy spirit fill hearts faithful kindle fire love veni sancte spiritus" },
  { title: "Prayer Before Work", href: "prayer-prayer-before-work.html", category: "Morning Prayers", keywords: "prayer before work bless work guide hands labor day job" },

  // EVENING PRAYERS
  { title: "Evening Prayer", href: "prayer-evening-prayer.html", category: "Evening Prayers", keywords: "evening prayer end day thanksgiving bless protect night" },
  { title: "Examination of Conscience", href: "prayer-examination-of-conscience.html", category: "Evening Prayers", keywords: "examination conscience review day sins faults wrongs before bed night" },
  { title: "Night Prayer", href: "prayer-night-prayer.html", category: "Evening Prayers", keywords: "night prayer before sleep rest protect guardian angel" },
  { title: "The Angelus", href: "prayer-the-angelus.html", category: "Evening Prayers", keywords: "angelus angel lord declared mary conceived holy spirit angel annunciation noon" },
  { title: "The Angelus Blessing", href: "prayer-the-angelus-blessing.html", category: "Evening Prayers", keywords: "angelus blessing evening devotion mary angel" },
  { title: "Salve Regina — Evening", href: "prayer-salve-regina-evening.html", category: "Evening Prayers", keywords: "salve regina hail holy queen evening prayer merciful loving sweetness hope" },
  { title: "Into Your Hands", href: "prayer-into-your-hands.html", category: "Evening Prayers", keywords: "into your hands commend spirit night before sleep father" },
  { title: "Into Your Hands — Night", href: "prayer-into-your-hands-night.html", category: "Evening Prayers", keywords: "into your hands night prayer sleep rest commend spirit" },

  // BEDTIME PRAYERS
  { title: "Prayer Before Sleep", href: "prayer-prayer-before-sleep.html", category: "Bedtime Prayers", keywords: "prayer before sleep bed rest night protect guardian" },
  { title: "Guardian Angel Prayer", href: "prayer-guardian-angel-prayer.html", category: "Bedtime Prayers", keywords: "guardian angel prayer angel god light rule enlighten guard rule govern night" },
  { title: "Prayer to the Guardian Angel", href: "prayer-prayer-to-the-guardian-angel.html", category: "Bedtime Prayers", keywords: "guardian angel protect watch over sleep night children" },
  { title: "Prayer for Peaceful Sleep", href: "prayer-prayer-for-peaceful-sleep.html", category: "Bedtime Prayers", keywords: "prayer peaceful sleep rest calm quiet night anxiety worry" },
  { title: "Blessing for Children at Night", href: "prayer-blessing-for-children-at-night.html", category: "Bedtime Prayers", keywords: "blessing children night bedtime bless protect child sleep" },
  { title: "Act of Surrender Before Sleep", href: "prayer-act-of-surrender-before-sleep.html", category: "Bedtime Prayers", keywords: "act surrender before sleep trust god rest night peace" },
  { title: "Prayer to Our Lady Before Sleep", href: "prayer-prayer-to-our-lady-before-sleep.html", category: "Bedtime Prayers", keywords: "prayer our lady mary before sleep night rest protect virgin mother" },

  // MEAL PRAYERS
  { title: "Bless Us, O Lord", href: "prayer-bless-us-o-lord.html", category: "Prayers Before Meals", keywords: "bless us lord gifts about receive bounty christ our lord grace before meals" },
  { title: "Family Meal Blessing", href: "prayer-family-meal-blessing.html", category: "Prayers Before Meals", keywords: "family meal blessing grace before meals table food together" },
  { title: "Short Meal Prayer", href: "prayer-short-meal-prayer.html", category: "Prayers Before Meals", keywords: "short meal prayer grace before meals quick bless food" },
  { title: "Prayer Before a Festive Meal", href: "prayer-prayer-before-a-festive-meal.html", category: "Prayers Before Meals", keywords: "prayer festive meal celebration thanksgiving special occasion food together" },
  { title: "Prayer of Gratitude Before Eating", href: "prayer-prayer-of-gratitude-before-eating.html", category: "Prayers Before Meals", keywords: "gratitude before eating thankful food nourishment blessings" },
  { title: "Thanksgiving After Meals", href: "prayer-thanksgiving-after-meals.html", category: "Prayers Before Meals", keywords: "thanksgiving after meals grace after food gratitude done eating" },
  { title: "Sunday Family Prayer", href: "prayer-sunday-family-prayer.html", category: "Prayers Before Meals", keywords: "sunday family prayer weekly together lord day rest" },

  // GOING OUT PRAYERS
  { title: "Short Prayer Before Leaving Home", href: "prayer-short-prayer-before-leaving-home.html", category: "Prayers Before Going Out", keywords: "prayer leaving home before going out door bless protect day journey" },
  { title: "Prayer for Protection", href: "prayer-prayer-for-protection.html", category: "Prayers Before Going Out", keywords: "prayer protection shield guard keep safe travel journey danger" },
  { title: "St. Patrick's Breastplate", href: "prayer-st-patrick-s-breastplate.html", category: "Prayers Before Going Out", keywords: "st patrick breastplate arise shield protection christ before behind beside above below" },
  { title: "Traveler's Prayer", href: "prayer-traveler-s-prayer.html", category: "Prayers Before Going Out", keywords: "traveler prayer journey travel road safe trip saint christopher" },
  { title: "Prayer to St. Christopher", href: "prayer-prayer-to-st-christopher.html", category: "Prayers Before Going Out", keywords: "st christopher saint travel car journey road protection patron travelers" },
  { title: "Sub Tuum Praesidium", href: "prayer-sub-tuum-praesidium.html", category: "Prayers Before Going Out", keywords: "sub tuum praesidium under thy protection flee mary oldest marian prayer" },
  { title: "Prayer of Surrender for the Day", href: "prayer-prayer-of-surrender-for-the-day.html", category: "Prayers Before Going Out", keywords: "surrender day trust god morning going out plans will" },

  // TRADITIONAL CATHOLIC PRAYERS
  { title: "The Sign of the Cross", href: "prayer-the-sign-of-the-cross.html", category: "Traditional Catholic Prayers", keywords: "sign cross father son holy spirit amen in nomine patris" },
  { title: "The Nicene Creed", href: "prayer-the-nicene-creed.html", category: "Traditional Catholic Prayers", keywords: "nicene creed believe one god almighty maker heaven earth visible invisible jesus christ" },
  { title: "The Confiteor", href: "prayer-the-confiteor.html", category: "Traditional Catholic Prayers", keywords: "confiteor confess almighty god fault fault most grievous fault mary brethren mass penitential rite" },
  { title: "The Magnificat", href: "prayer-the-magnificat.html", category: "Traditional Catholic Prayers", keywords: "magnificat my soul magnifies lord spirit rejoiced god savior mary canticle" },
  { title: "Te Deum", href: "prayer-te-deum.html", category: "Traditional Catholic Prayers", keywords: "te deum laudamus praise god hymn traditional latin praise thanksgiving" },
  { title: "Tantum Ergo", href: "prayer-tantum-ergo.html", category: "Traditional Catholic Prayers", keywords: "tantum ergo sacramentum benediction blessed sacrament saint thomas aquinas latin hymn" },
  { title: "Anima Christi", href: "prayer-anima-christi.html", category: "Traditional Catholic Prayers", keywords: "anima christi soul christ sanctify body blood water passion strengthen after communion" },

  // SAINT JOSEPH PRAYERS
  { title: "Prayer to Saint Joseph", href: "prayer-prayer-to-saint-joseph.html", category: "Saint Joseph Prayers", keywords: "prayer saint joseph patron intercession help protect guide foster father jesus" },
  { title: "Memorare to Saint Joseph", href: "prayer-memorare-to-saint-joseph.html", category: "Saint Joseph Prayers", keywords: "memorare saint joseph remember never known anyone invoked thy patronage left unaided" },
  { title: "Litany of Saint Joseph — Short", href: "prayer-litany-of-saint-joseph-short.html", category: "Saint Joseph Prayers", keywords: "litany saint joseph short pray us patron workers families" },
  { title: "Prayer to Saint Joseph for Work", href: "prayer-prayer-to-saint-joseph-for-work.html", category: "Saint Joseph Prayers", keywords: "saint joseph work job labor carpenter patron workers employment" },
  { title: "Prayer to Saint Joseph for Fathers", href: "prayer-prayer-to-saint-joseph-for-fathers.html", category: "Saint Joseph Prayers", keywords: "saint joseph fathers father dad family husband husband patron fathers" },
  { title: "Prayer to Saint Joseph for Families", href: "prayer-prayer-to-saint-joseph-for-families.html", category: "Saint Joseph Prayers", keywords: "saint joseph families protect holy family home children father husband" },
  { title: "Prayer to Saint Joseph for a Happy Death", href: "prayer-prayer-to-saint-joseph-for-a-happy-death.html", category: "Saint Joseph Prayers", keywords: "saint joseph happy death patron dying last breath patron good death" },

  // MARIAN PRAYERS
  { title: "The Hail Holy Queen", href: "prayer-the-hail-holy-queen.html", category: "Marian Prayers", keywords: "hail holy queen salve regina marian mother mercy life sweetness hope" },
  { title: "Hail Holy Queen", href: "prayer-hail-holy-queen.html", category: "Marian Prayers", keywords: "hail holy queen salve regina mother mercy" },
  { title: "The Memorare", href: "prayer-the-memorare.html", category: "Marian Prayers", keywords: "memorare remember gracious virgin mary protection help unaided" },
  { title: "The Magnificat", href: "prayer-the-magnificat.html", category: "Marian Prayers", keywords: "magnificat soul magnifies lord spirit god savior mary humble handmaid" },
  { title: "Prayer to Our Lady of Fatima", href: "prayer-prayer-to-our-lady-of-fatima.html", category: "Marian Prayers", keywords: "our lady fatima portugal apparition rosary peace world requests" },
  { title: "Prayer for Mary's Intercession", href: "prayer-prayer-for-mary-s-intercession.html", category: "Marian Prayers", keywords: "mary intercession mother pray us sinners intercede petition" },
  { title: "Sub Tuum Praesidium", href: "prayer-sub-tuum-praesidium.html", category: "Marian Prayers", keywords: "sub tuum praesidium under thy protection flee mary oldest marian prayer ancient" },
  { title: "Salve Regina — Evening", href: "prayer-salve-regina-evening.html", category: "Marian Prayers", keywords: "salve regina hail holy queen mother mercy evening devotion" },

  // EUCHARISTIC PRAYERS
  { title: "Prayer Before Holy Communion", href: "prayer-prayer-before-holy-communion.html", category: "Eucharistic Prayers", keywords: "before holy communion preparation receive eucharist body blood lord worthy" },
  { title: "Prayer After Holy Communion — St. Thomas Aquinas", href: "prayer-prayer-after-holy-communion-st-thomas-aquinas.html", category: "Eucharistic Prayers", keywords: "after holy communion st thomas aquinas thanksgiving received eucharist body blood" },
  { title: "Act of Spiritual Communion", href: "prayer-act-of-spiritual-communion.html", category: "Eucharistic Prayers", keywords: "act spiritual communion desire receive jesus eucharist cannot physically union heart" },
  { title: "O Sacrament Most Holy", href: "prayer-o-sacrament-most-holy.html", category: "Eucharistic Prayers", keywords: "o sacrament most holy all praise thanksgiving be every moment to the most holy eucharist" },
  { title: "Anima Christi", href: "prayer-anima-christi.html", category: "Eucharistic Prayers", keywords: "anima christi soul christ sanctify me body blood water passion strengthen" },
  { title: "Prayer of Adoration Before the Blessed Sacrament", href: "prayer-prayer-of-adoration-before-the-blessed-sacrament.html", category: "Eucharistic Prayers", keywords: "adoration blessed sacrament tabernacle adore worship presence real jesus" },
  { title: "Tantum Ergo", href: "prayer-tantum-ergo.html", category: "Eucharistic Prayers", keywords: "tantum ergo benediction blessed sacrament hymn thomas aquinas worship" },

  // FAMILY PRAYERS
  { title: "Family Prayer", href: "prayer-family-prayer.html", category: "Family Prayers", keywords: "family prayer together home children parents bless protect guide" },
  { title: "Sunday Family Prayer", href: "prayer-sunday-family-prayer.html", category: "Family Prayers", keywords: "sunday family prayer weekly rest lord day together home" },
  { title: "Family Consecration to the Sacred Heart", href: "prayer-family-consecration-to-the-sacred-heart.html", category: "Family Prayers", keywords: "family consecration sacred heart jesus dedicate home family protection love" },
  { title: "Prayer for Parents", href: "prayer-prayer-for-parents.html", category: "Family Prayers", keywords: "prayer parents mother father bless guide wisdom strength family" },
  { title: "Prayer for Children", href: "prayer-prayer-for-children.html", category: "Family Prayers", keywords: "prayer children bless protect guide grow faith school future" },
  { title: "Prayer for a Family in Difficulty", href: "prayer-prayer-for-a-family-in-difficulty.html", category: "Family Prayers", keywords: "prayer family difficulty trouble hardship crisis help strength unity" },
  { title: "Prayer for a Marriage", href: "prayer-prayer-for-a-marriage.html", category: "Family Prayers", keywords: "prayer marriage husband wife couple love unity bless wedding sacrament" },

  // PRAYERS FOR THE DECEASED
  { title: "Eternal Rest", href: "prayer-eternal-rest.html", category: "Prayers for the Deceased", keywords: "eternal rest grant them lord perpetual light shine upon them rest in peace requiem" },
  { title: "Psalm 130 — De Profundis", href: "prayer-psalm-130-de-profundis.html", category: "Prayers for the Deceased", keywords: "psalm 130 de profundis out of the depths cry to you lord dead purgatory" },
  { title: "Prayer for a Deceased Parent", href: "prayer-prayer-for-a-deceased-parent.html", category: "Prayers for the Deceased", keywords: "prayer deceased parent mother father death died passed away funeral" },
  { title: "Prayer After a Funeral", href: "prayer-prayer-after-a-funeral.html", category: "Prayers for the Deceased", keywords: "prayer after funeral burial grief loss death comfort peace mourning" },
  { title: "Prayer for All Souls in Purgatory", href: "prayer-prayer-for-all-souls-in-purgatory.html", category: "Prayers for the Deceased", keywords: "all souls purgatory november pray dead departed eternal rest mercy" },
  { title: "Lighting a Candle for the Dead", href: "prayer-lighting-a-candle-for-the-dead.html", category: "Prayers for the Deceased", keywords: "lighting candle dead remember memorial intention deceased loved one" },
  { title: "Rosary for the Deceased", href: "prayer-rosary-for-the-deceased.html", category: "Prayers for the Deceased", keywords: "rosary deceased dead funeral purgatory pray departed soul" },

  // OTHER IMPORTANT PRAYERS
  { title: "Divine Mercy Chaplet", href: "prayer-divine-mercy-chaplet.html", category: "Special Devotions", keywords: "divine mercy chaplet faustina eternal father offer body blood soul divinity jesus expiation sins" },
  { title: "Litany of Humility", href: "prayer-litany-of-humility.html", category: "Special Devotions", keywords: "litany humility deliver me desire praised loved honored distinguished praised preferred" },
  { title: "Prayer for a Holy Death", href: "prayer-prayer-for-a-holy-death.html", category: "Special Devotions", keywords: "prayer holy death last moment dying grace final hour good death" },
  { title: "The Glory Be", href: "prayer-the-glory-be.html", category: "Special Devotions", keywords: "glory be doxology praise trinity father son holy spirit" },
  { title: "Te Deum", href: "prayer-te-deum.html", category: "Special Devotions", keywords: "te deum thanksgiving praise god hymn ancient traditional" },
  { title: "St. Patrick's Breastplate", href: "prayer-st-patrick-s-breastplate.html", category: "Special Devotions", keywords: "st patrick breastplate lorica ireland protection powerful prayer" },

  // CATEGORY PAGES
  { title: "All Prayers — Full Library", href: "prayers.html", category: "Browse", keywords: "all prayers library browse categories full collection" },
  { title: "Rosary Prayers — Category", href: "prayers-rosary.html", category: "Browse", keywords: "rosary prayers category collection all rosary" },
  { title: "Morning Prayers — Category", href: "prayers-morning.html", category: "Browse", keywords: "morning prayers category collection start day" },
  { title: "Evening Prayers — Category", href: "prayers-evening.html", category: "Browse", keywords: "evening prayers category collection end day" },
  { title: "Bedtime Prayers — Category", href: "prayers-bedtime.html", category: "Browse", keywords: "bedtime prayers category collection sleep night" },
  { title: "Meal Prayers — Category", href: "prayers-meal.html", category: "Browse", keywords: "meal prayers grace before meals category" },
  { title: "Family Prayers — Category", href: "prayers-family.html", category: "Browse", keywords: "family prayers category home children parents" },
  { title: "Marian Prayers — Category", href: "prayers-marian.html", category: "Browse", keywords: "marian prayers mary mother god category" },
  { title: "Saint Joseph Prayers — Category", href: "prayers-saint-joseph.html", category: "Browse", keywords: "saint joseph prayers category patron workers fathers" },
  { title: "Eucharistic Prayers — Category", href: "prayers-eucharistic.html", category: "Browse", keywords: "eucharistic prayers communion mass category" },
  { title: "Traditional Prayers — Category", href: "prayers-traditional.html", category: "Browse", keywords: "traditional catholic prayers category classic" },
  { title: "Prayers Before Going Out — Category", href: "prayers-goingout.html", category: "Browse", keywords: "going out travel prayers protection category" },
  { title: "Prayers for the Deceased — Category", href: "prayers-deceased.html", category: "Browse", keywords: "deceased dead prayers purgatory funeral category" },

  // MAIN PAGES
  { title: "How to Pray the Rosary", href: "how-to-pray.html", category: "Guide", keywords: "how to pray rosary steps guide beginners beads decades mysteries" },
  { title: "Mystery of the Day", href: "mystery.html", category: "Daily", keywords: "mystery day today joyful sorrowful glorious luminous meditate" },
  { title: "Reading of the Day", href: "reading.html", category: "Daily", keywords: "reading day scripture daily mass gospel bible reflection" },
  { title: "Prayer Requests", href: "prayer-request.html", category: "Community", keywords: "prayer request intention submit community pray for me" },
  { title: "Power of the Rosary", href: "power-of-the-rosary.html", category: "Guide", keywords: "power rosary 15 promises saint dominic blessed alan promises graces" },
  { title: "Gallery", href: "gallery.html", category: "Gallery", keywords: "gallery images photos rosary pictures mysteries" },
  { title: "About", href: "about.html", category: "Site", keywords: "about us mission story who we are" },
  { title: "Contact", href: "contact.html", category: "Site", keywords: "contact us get in touch message" },
];

function searchPrayers(query) {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const words = q.split(/\s+/);

  return PRAYER_INDEX
    .map(item => {
      const haystack = (item.title + ' ' + item.category + ' ' + item.keywords).toLowerCase();
      let score = 0;
      words.forEach(word => {
        if (item.title.toLowerCase().includes(word)) score += 10;
        if (item.category.toLowerCase().includes(word)) score += 5;
        if (item.keywords.toLowerCase().includes(word)) score += 2;
      });
      // Bonus: full phrase match in title
      if (item.title.toLowerCase().includes(q)) score += 20;
      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
}

// Inject search bar into the header after nav is loaded
function injectSearchBar() {
  const header = document.querySelector('.site-header .header-inner');
  if (!header) return;

  const searchHTML = `
    <div class="search-wrap" id="searchWrap">
      <button class="search-toggle" id="searchToggle" aria-label="Search prayers" title="Search prayers">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </button>
      <div class="search-dropdown" id="searchDropdown">
        <div class="search-input-wrap">
          <svg class="search-icon-inner" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" id="searchInput" class="search-input" placeholder="Search prayers, mysteries, guides…" autocomplete="off" autocorrect="off" spellcheck="false"/>
          <button class="search-clear" id="searchClear" style="display:none">✕</button>
        </div>
        <div class="search-results" id="searchResults">
          <div class="search-hint">
            <span class="search-hint-icon">✝</span>
            <span>Type to search all prayers and guides</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Insert before the nav toggle button
  const navToggle = header.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.insertAdjacentHTML('beforebegin', searchHTML);
  } else {
    header.insertAdjacentHTML('beforeend', searchHTML);
  }

  // Inject search styles
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .search-wrap{position:relative;display:flex;align-items:center}
      .search-toggle{background:none;border:1px solid var(--gold-dim);color:var(--gold);padding:.45rem .6rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .25s;flex-shrink:0}
      .search-toggle:hover{border-color:var(--gold);background:rgba(201,168,76,.08)}
      .search-dropdown{display:none;position:fixed;top:70px;left:50%;transform:translateX(-50%);width:min(460px,calc(100vw - 2rem));background:var(--deep);border:1px solid var(--gold-dim);border-top:2px solid var(--gold);z-index:9999;box-shadow:0 12px 40px rgba(0,0,0,.7)}
      .search-dropdown.open{display:block}
      .search-input-wrap{display:flex;align-items:center;padding:.7rem 1rem;border-bottom:1px solid var(--gold-dim);gap:.6rem}
      .search-icon-inner{color:var(--gold);flex-shrink:0;opacity:.6}
      .search-input{flex:1;background:none;border:none;outline:none;font-family:'EB Garamond',serif;font-size:1rem;color:var(--cream);min-width:0}
      .search-input::placeholder{color:var(--faint)}
      .search-clear{background:none;border:none;color:var(--faint);cursor:pointer;font-size:.75rem;padding:.2rem .4rem;transition:color .2s;flex-shrink:0}
      .search-clear:hover{color:var(--gold)}
      .search-results{max-height:380px;overflow-y:auto}
      .search-results::-webkit-scrollbar{width:4px}
      .search-results::-webkit-scrollbar-track{background:var(--deep)}
      .search-results::-webkit-scrollbar-thumb{background:var(--gold-dim)}
      .search-hint{display:flex;align-items:center;gap:.7rem;padding:1.2rem 1rem;color:var(--faint);font-family:'Cormorant Garamond',serif;font-style:italic;font-size:.9rem}
      .search-hint-icon{color:var(--gold);opacity:.4;font-size:.8rem}
      .search-no-results{padding:1.5rem 1rem;text-align:center;color:var(--faint);font-family:'Cormorant Garamond',serif;font-style:italic;font-size:.95rem}
      .search-result-item{display:flex;align-items:center;gap:.8rem;padding:.85rem 1rem;text-decoration:none;border-bottom:1px solid rgba(201,168,76,.05);transition:background .2s}
      .search-result-item:last-child{border-bottom:none}
      .search-result-item:hover{background:rgba(201,168,76,.06)}
      .search-result-icon{color:var(--gold);opacity:.4;font-size:.7rem;flex-shrink:0;width:14px;text-align:center}
      .search-result-body{flex:1;min-width:0}
      .search-result-title{font-family:'Cormorant Garamond',serif;font-size:1rem;color:var(--cream);line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .search-result-title mark{background:none;color:var(--gold);font-weight:600}
      .search-result-cat{font-family:'Cinzel',serif;font-size:.52rem;letter-spacing:.15em;color:var(--faint);text-transform:uppercase;margin-top:.15rem}
      .search-result-arrow{color:var(--gold);opacity:.3;font-size:.8rem;flex-shrink:0}
      .search-result-item:hover .search-result-arrow{opacity:1}
      .search-group-label{font-family:'Cinzel',serif;font-size:.52rem;letter-spacing:.25em;color:var(--gold);text-transform:uppercase;padding:.6rem 1rem .3rem;background:rgba(201,168,76,.04);border-bottom:1px solid rgba(201,168,76,.06)}
      @media(max-width:480px){.search-dropdown{top:60px}}
    </style>
  `);

  // Bind events
  const toggle = document.getElementById('searchToggle');
  const dropdown = document.getElementById('searchDropdown');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  const clearBtn = document.getElementById('searchClear');

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
    if (dropdown.classList.contains('open')) {
      setTimeout(() => input.focus(), 50);
    }
  });

  input.addEventListener('input', () => {
    const q = input.value.trim();
    clearBtn.style.display = q ? 'block' : 'none';
    renderResults(q);
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.style.display = 'none';
    renderResults('');
    input.focus();
  });

  document.addEventListener('click', (e) => {
    if (!document.getElementById('searchWrap').contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdown.classList.remove('open');
      toggle.focus();
    }
  });

  function highlightMatch(text, query) {
    if (!query) return text;
    const words = query.trim().toLowerCase().split(/\s+/);
    let result = text;
    words.forEach(word => {
      if (word.length < 2) return;
      const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      result = result.replace(regex, '<mark>$1</mark>');
    });
    return result;
  }

  function renderResults(q) {
    if (!q || q.length < 2) {
      results.innerHTML = `<div class="search-hint"><span class="search-hint-icon">✝</span><span>Type to search all prayers and guides</span></div>`;
      return;
    }
    const found = searchPrayers(q);
    if (found.length === 0) {
      results.innerHTML = `<div class="search-no-results">No prayers found for "<em>${q}</em>"<br/><small style="font-size:.8rem;color:var(--faint);display:block;margin-top:.4rem">Try: hail mary, morning, rosary, joseph…</small></div>`;
      return;
    }
    results.innerHTML = found.map(item => `
      <a class="search-result-item" href="${item.href}">
        <div class="search-result-icon">✝</div>
        <div class="search-result-body">
          <div class="search-result-title">${highlightMatch(item.title, q)}</div>
          <div class="search-result-cat">${item.category}</div>
        </div>
        <div class="search-result-arrow">→</div>
      </a>
    `).join('');
  }
}

// Auto-run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(injectSearchBar, 0));
} else {
  setTimeout(injectSearchBar, 0);
}
