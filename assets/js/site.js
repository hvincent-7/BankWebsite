const DOJO_BOOKING_URL = 'https://web.dojo.app/create_booking/vendor/0XYLokEoeff77KUU00p7ex68kXi4SF8dCobxdAlAkQ0_restaurant';

const LOGO_IMG = `<img src="assets/images/Bank Logo Transparent.png" alt="The Bank" class="brand-logo">`;

const escapeHtml = (str = '') => str
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const injectLayout = () => {
  const nav = document.getElementById('app-nav');
  const footer = document.getElementById('app-footer');
  const current = document.body.dataset.page || 'home';

  if (nav) {
    nav.setAttribute('aria-label', 'Primary navigation');
    nav.innerHTML = `
      <div class="site-nav-inner container">
        <a class="brand" href="index.html" aria-label="The Bank home">
          ${LOGO_IMG}
        </a>
        ${current === 'book' ? '' : '<a class="nav-reserve-top" href="book.html">Reserve</a>'}
        <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="nav-primary" aria-label="Open navigation">
          <span class="nav-toggle-label">Menu</span>
          <span class="nav-toggle-lines" aria-hidden="true"><span></span><span></span><span></span></span>
        </button>
        <div id="nav-primary" class="nav-primary">
          <ul class="nav-links">
            <li><a href="index.html" class="${current === 'home' ? 'active' : ''}" ${current === 'home' ? 'aria-current="page"' : ''}>Home</a></li>
            <li><a href="menus.html" class="${current === 'menus' ? 'active' : ''}" ${current === 'menus' ? 'aria-current="page"' : ''}>Menus</a></li>
            <li><a href="drinks.html" class="${current === 'drinks' ? 'active' : ''}" ${current === 'drinks' ? 'aria-current="page"' : ''}>Drinks</a></li>
            <li><a href="private-hire.html" class="${current === 'private-hire' ? 'active' : ''}" ${current === 'private-hire' ? 'aria-current="page"' : ''}>Private Hire</a></li>
            <li><a href="visit.html" class="${current === 'visit' ? 'active' : ''}" ${current === 'visit' ? 'aria-current="page"' : ''}>Visit</a></li>
          </ul>
          <a class="nav-cta" href="book.html" ${current === 'book' ? 'aria-current="page"' : ''}>Reserve</a>
          <a class="nav-phone" href="tel:+441914879038">0191 487 9038</a>
        </div>
      </div>
    `;
  }

  if (footer) {
    footer.setAttribute('role', 'contentinfo');
    footer.setAttribute('aria-label', 'Site footer');
    footer.innerHTML = `
      <div class="container">
        <div class="footer-social">
          <a href="https://www.facebook.com/TheBankLowFell" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://www.instagram.com/thebank_lowfell/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://www.tripadvisor.co.uk/Restaurant_Review-g186394-d8090498-Reviews-The_Bank_Restaurant_Bar-Gateshead_Tyne_and_Wear_England.html" target="_blank" rel="noopener noreferrer" aria-label="Tripadvisor">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.432 5.976 5.976 0 0 0 4.075-1.6L12 19.5l1.922-1.886a5.976 5.976 0 0 0 4.075 1.6 5.997 5.997 0 0 0 4.04-10.432L24 6.647h-4.35a13.573 13.573 0 0 0-7.644-2.353zM6.003 17.215a3.997 3.997 0 1 1 0-7.994 3.997 3.997 0 0 1 0 7.994zm5.997-4.806a6.034 6.034 0 0 0-1.19-2.357 10.552 10.552 0 0 1 2.38-.273c.82 0 1.62.097 2.38.273a6.034 6.034 0 0 0-1.19 2.357c-.4-.166-.85-.26-1.38-.26s-.98.094-1.38.26h.38zm5.997 4.806a3.997 3.997 0 1 1 0-7.994 3.997 3.997 0 0 1 0 7.994zm0-5.997a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-11.994 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>
          </a>
        </div>

        <!-- Live Open/Closed Status -->
        <div class="open-status" id="open-status"></div>

        <div class="footer-grid">
          <div class="footer-col">
            <h4 class="footer-col-heading">Opening Hours</h4>
            <div class="footer-hours-list" id="footer-hours-list"></div>
          </div>
          <div class="footer-col">
            <h4 class="footer-col-heading">Find Us</h4>
            <address class="footer-address">
              <p>516 Durham Road<br>Low Fell, Gateshead<br>NE9 6HU</p>
              <p><a href="tel:+441914879038">0191 487 9038</a></p>
              <p><span id="footer-email"></span></p>
              <p><a href="https://what3words.com/those.taken.taker" target="_blank" rel="noopener noreferrer" aria-label="What Three Words location: those dot taken dot taker"><span class="w3w-mark">///</span>those.taken.taker</a></p>
            </address>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© 2026 The Bank Bar. All rights reserved.</p>
          <p class="footer-legal">Opening hours and events may vary subject to availability and licensing requirements. Challenge 25 policy in operation. Please inform staff of any allergies or dietary requirements.</p>
          <div class="footer-legal-links">
            <a href="privacy.html">Privacy Policy</a>
            <a href="terms.html">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    `;
  }
};

const injectEmail = () => {
  const u = 'info', d = 'thebanklowfell', t = '.co.uk';
  const e = u + '@' + d + t;
  const el = document.getElementById('footer-email');
  if (el) {
    const a = document.createElement('a');
    a.href = 'mailto:' + e;
    a.textContent = e;
    el.appendChild(a);
  }
};

const initMobileNav = () => {
  const nav = document.querySelector('.site-nav');
  const toggle = nav?.querySelector('.nav-toggle');
  const links = nav?.querySelectorAll('.nav-links a, .nav-cta, .nav-phone');
  if (!nav || !toggle) return;

  let closingTimer = null;
  const setOpen = (open) => {
    // Keep the full-screen overlay (.closing) until the collapse transition
    // has finished, otherwise the fading menu shows inside the normal bar
    clearTimeout(closingTimer);
    nav.classList.remove('closing');
    if (!open && nav.classList.contains('open')) {
      nav.classList.add('closing');
      closingTimer = setTimeout(() => nav.classList.remove('closing'), 260);
    }
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    document.body.style.overflow = open ? 'hidden' : '';
    document.documentElement.style.overflow = open ? 'hidden' : '';
  };

  toggle.addEventListener('click', () => {
    setOpen(!nav.classList.contains('open'));
  });

  links?.forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
};

const initStickyNav = () => {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
};

/* ---------------------------------------------------------------------------
   Seasonal nav: decorative shapes drifting behind the bar and a short closable
   message under it. Each season is just data: a name, a dates(year) function
   returning its [first, last] day (inclusive, visitor's local time), the shapes
   to drop and the note to show. Preview any season with ?season=<name>, or
   switch the effect off with ?season=off.
   --------------------------------------------------------------------------- */
const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const onDay = (y, m, d) => new Date(y, m - 1, d);
const addDays = (date, n) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);
const weekEnding = (sunday) => [addDays(sunday, -6), sunday];
const sundayOnOrAfter = (date) => addDays(date, (7 - date.getDay()) % 7);

// Western Easter Sunday (anonymous Gregorian algorithm)
const easterSunday = (y) => {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100;
  const h = (19 * a + b - Math.floor(b / 4) - Math.floor((b - Math.floor((b + 8) / 25) + 1) / 3) + 15) % 30;
  const l = (32 + 2 * (b % 4) + 2 * Math.floor(c / 4) - h - (c % 4)) % 7;
  const n = h + l - 7 * Math.floor((a + 11 * h + 22 * l) / 451) + 114;
  return onDay(y, Math.floor(n / 31), (n % 31) + 1);
};

const thirdSundayOfJune = (y) => {
  const first = onDay(y, 6, 1);
  return addDays(first, (7 - first.getDay()) % 7 + 14);
};

const SEASONS = [
  { name: 'valentines', dates: (y) => [onDay(y, 2, 7), onDay(y, 2, 14)],
    shapes: ['heart', 'petal', 'petal', 'heart'],
    note: { text: "Happy Valentine's Day from all of us at The&nbsp;Bank.", link: { href: 'book.html', label: 'Reserve a table' } } },
  { name: 'mothers-day', dates: (y) => weekEnding(addDays(easterSunday(y), -21)),
    shapes: ['tulip', 'tulip', 'heart'],
    note: { text: 'Treat Mum this Mothering Sunday.', link: { href: 'book.html', label: 'Reserve a table' } } },
  { name: 'fathers-day', dates: (y) => weekEnding(thirdSundayOfJune(y)),
    shapes: ['tie', 'moustache'],
    note: { text: "Treat Dad this Father's Day.", link: { href: 'book.html', label: 'Reserve a table' } } },
  { name: 'halloween', dates: (y) => [onDay(y, 10, 20), onDay(y, 10, 31)],
    shapes: ['pumpkin', 'pumpkin', 'bat'],
    note: { text: 'Happy Halloween from all of us at The&nbsp;Bank.' } },
  // Fireworks from the 1st until the Sunday on or after Bonfire Night
  { name: 'bonfire-night', dates: (y) => [onDay(y, 11, 1), sundayOnOrAfter(onDay(y, 11, 5))],
    shapes: ['burst', 'burst', 'spark'],
    note: { text: 'Happy Bonfire Night from all of us at The&nbsp;Bank.' } },
  { name: 'christmas', dates: (y) => [onDay(y, 11, 15), onDay(y, 12, 30)],
    shapes: ['flake', 'flake', 'tree'],
    note: { text: 'Merry Christmas from all of us at The&nbsp;Bank.', link: { href: 'private-hire.html', label: 'Book your festive party' } } },
  // Crosses the year boundary: currentSeason() also checks last year's range
  { name: 'new-year', dates: (y) => [onDay(y, 12, 31), onDay(y + 1, 1, 2)],
    shapes: ['burst', 'spark', 'spark'],
    note: { text: 'Happy New Year from all of us at The&nbsp;Bank.' } }
];

// Wide shapes are drawn larger so they read at the same weight
const SHAPE_SCALE = { bat: 1.4, moustache: 1.4, tie: 1.5, tulip: 1.35 };

// All shapes use currentColor so the CSS decides the colour (gold / cream)
const SEASON_SHAPES = {
  heart:
    '<svg viewBox="0 0 24 24"><path d="M12 20.5s-7.4-4.4-9.1-9.2C1.8 8 3.8 4.6 7.1 4.6c2.1 0 3.8 1.1 4.9 2.9 1.1-1.8 2.8-2.9 4.9-2.9 3.3 0 5.3 3.4 4.2 6.7-1.7 4.8-9.1 9.2-9.1 9.2z" fill="currentColor"/></svg>',
  petal:
    '<svg viewBox="0 0 24 24"><path d="M5.5 19.5C3 14.5 5 7 11.5 4.3 17 2 21 5 20 9.5 19 14.5 12.5 20.5 5.5 19.5z" fill="currentColor"/>' +
    '<path d="M6.5 18c1.5-4.6 5-8.6 10.5-11" fill="none" stroke="#0D0C0A" stroke-width="1.1" stroke-linecap="round" opacity=".45"/></svg>',
  tulip:
    '<svg viewBox="0 0 24 24">' +
    '<path d="M12 14v8" stroke="currentColor" stroke-width="1.4" opacity=".6"/>' +
    '<path d="M12 20.5Q8 20.2 6.6 16.2Q10.6 16.4 12 20.5z" fill="currentColor" opacity=".6"/>' +
    '<path d="M7 4.2Q8.8 5.4 9.8 7.4Q10.6 4.6 12 3Q13.4 4.6 14.2 7.4Q15.2 5.4 17 4.2Q18 9 16 11.8Q14.4 14 12 14.2Q9.6 14 8 11.8Q6 9 7 4.2z" fill="currentColor"/>' +
    '</svg>',
  tie:
    '<svg viewBox="0 0 24 24">' +
    '<path d="M9.8 3h4.4l-.9 2.8h-2.6z" fill="currentColor" opacity=".7"/>' +
    '<path d="M10.7 5.8h2.6l1.9 10.4L12 21l-3.2-4.8z" fill="currentColor"/>' +
    '<g fill="#0D0C0A" opacity=".55"><circle cx="12" cy="9" r=".8"/><circle cx="10.9" cy="12.5" r=".8"/><circle cx="13.1" cy="12.5" r=".8"/><circle cx="12" cy="16" r=".8"/></g>' +
    '</svg>',
  moustache:
    '<svg viewBox="0 0 24 24"><path d="M12 11.4C10.8 9.8 8.6 9.2 6.8 10 5.3 10.7 4.6 12.2 3.7 13.3 3.2 13.9 2.4 14 1.8 13.6 2.2 15.4 3.9 16.5 5.8 16.4 8.3 16.2 10.4 14.9 12 13.4 13.6 14.9 15.7 16.2 18.2 16.4 20.1 16.5 21.8 15.4 22.2 13.6 21.6 14 20.8 13.9 20.3 13.3 19.4 12.2 18.7 10.7 17.2 10 15.4 9.2 13.2 9.8 12 11.4z" fill="currentColor"/></svg>',
  burst:
    '<svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">' +
    '<path d="M12 7.5V2M16.5 12H22M12 16.5V22M7.5 12H2"/>' +
    '<path d="M15.2 8.8 18 6M15.2 15.2 18 18M8.8 15.2 6 18M8.8 8.8 6 6" opacity=".6"/>' +
    '</g><circle cx="12" cy="12" r="1.8" fill="currentColor"/></svg>',
  spark:
    '<svg viewBox="0 0 24 24"><path d="M12 3l1.8 7.2L21 12l-7.2 1.8L12 21l-1.8-7.2L3 12l7.2-1.8z" fill="currentColor"/></svg>',
  flake:
    '<svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">' +
    '<path d="M12 2v20M12 6 9.5 3.8M12 6l2.5-2.2M12 18l-2.5 2.2M12 18l2.5 2.2"/>' +
    '<path transform="rotate(60 12 12)" d="M12 2v20M12 6 9.5 3.8M12 6l2.5-2.2M12 18l-2.5 2.2M12 18l2.5 2.2"/>' +
    '<path transform="rotate(120 12 12)" d="M12 2v20M12 6 9.5 3.8M12 6l2.5-2.2M12 18l-2.5 2.2M12 18l2.5 2.2"/>' +
    '</g></svg>',
  tree:
    '<svg viewBox="0 0 24 24">' +
    '<path d="M12 2 7 9h2.5l-4 6h3L4 21h16l-4.5-6h3l-4-6H17z" fill="currentColor"/>' +
    '<rect x="10.5" y="21" width="3" height="2.5" fill="currentColor" opacity=".6"/>' +
    '<circle cx="12" cy="2.4" r="1.7" fill="currentColor"/>' +
    '</svg>',
  pumpkin:
    '<svg viewBox="0 0 24 24">' +
    '<path d="M12 6.8c-1.2-.9-2.8-1.2-4.4-.8C4.3 6.8 2.5 9.9 2.5 13.7c0 4 2.4 6.8 5.4 6.8 1.5 0 2.9-.5 4.1-1.4 1.2.9 2.6 1.4 4.1 1.4 3 0 5.4-2.8 5.4-6.8 0-3.8-1.8-6.9-5.1-7.7-1.6-.4-3.2-.1-4.4.8z" fill="currentColor"/>' +
    '<path d="M12 7.3c-1.6 2.2-1.6 9.8 0 12M12 7.3c1.6 2.2 1.6 9.8 0 12" fill="none" stroke="#0D0C0A" stroke-width="1" opacity=".45"/>' +
    '<path d="M11.2 7c0-2 .5-3.5 2-4.4l1 1.1c-1 .7-1.4 1.8-1.4 3.3z" fill="currentColor" opacity=".7"/>' +
    '</svg>',
  bat:
    '<svg viewBox="0 0 24 24">' +
    '<path d="M12 8.6 13.3 6.4l.4 2.8.5.2Q19 7 23 8l-1.5 4.8Q20 11.4 18.6 13.4Q17 12.4 15.6 15.2Q14.2 13.6 13 16l-1 1.4-1-1.4Q9.8 13.6 8.4 15.2Q7 12.4 5.4 13.4Q4 11.4 2.5 12.8L1 8Q5 7 9.8 9.4l.5-.2.4-2.8z" fill="currentColor"/>' +
    '</svg>'
};

const currentSeason = () => {
  const forced = /[?&]season=([a-z-]+)/.exec(window.location.search);
  if (forced) {
    return SEASONS.find((s) => s.name === forced[1]) || null;
  }
  const now = new Date();
  const today = onDay(now.getFullYear(), now.getMonth() + 1, now.getDate());
  const inRange = ([first, last]) => today >= first && today <= last;
  // Check this year's and last year's ranges so a season that spans New Year matches in January too
  return SEASONS.find((s) => inRange(s.dates(today.getFullYear())) || inRange(s.dates(today.getFullYear() - 1))) || null;
};

const addSeasonShapes = (nav, season) => {
  const count = window.innerWidth < 700 ? 8 : 16;
  let drops = '';
  for (let i = 0; i < count; i++) {
    const shape = season.shapes[Math.floor(Math.random() * season.shapes.length)];
    const fall = 6 + Math.random() * 4;
    const sway = 2.5 + Math.random() * 2;
    drops +=
      `<span class="nav-season-drop" style="left:${((i + Math.random()) * 100 / count).toFixed(1)}%;` +
      `--size:${Math.round((11 + Math.random() * 7) * (SHAPE_SCALE[shape] || 1))}px;` +
      `animation-duration:${fall.toFixed(2)}s;animation-delay:-${(Math.random() * fall).toFixed(2)}s">` +
      `<span class="nav-season-shape" style="animation-duration:${sway.toFixed(2)}s;animation-delay:-${(Math.random() * sway).toFixed(2)}s">` +
      SEASON_SHAPES[shape] +
      '</span></span>';
  }

  const layer = document.createElement('div');
  layer.className = `nav-season nav-season--${season.name}`;
  layer.setAttribute('aria-hidden', 'true');
  layer.innerHTML = drops;
  nav.appendChild(layer);
  nav.classList.add('has-season');
};

// A short message under the bar, shown at the top of the page only. Once
// closed it stays closed for the rest of that season on this device.
const SEASON_NOTE_KEY = 'bankSeasonNote';

const addSeasonNote = (nav, season) => {
  const note = season.note;
  if (!note) return;
  const key = `${season.name}:${new Date().getFullYear()}`;
  const previewing = /[?&]season=/.test(window.location.search);
  try {
    if (!previewing && window.localStorage.getItem(SEASON_NOTE_KEY) === key) return;
  } catch (e) { /* storage blocked: show the note */ }

  const remember = () => {
    try { window.localStorage.setItem(SEASON_NOTE_KEY, key); } catch (e) { /* not remembered */ }
  };

  const link = note.link
    ? ` <a class="nav-season-note-link" href="${note.link.href}">${note.link.label}</a>`
    : '';

  const el = document.createElement('div');
  el.className = `nav-season-note nav-season-note--${season.name}`;
  el.innerHTML =
    `<span class="nav-season-note-icon" aria-hidden="true">${SEASON_SHAPES[season.shapes[0]]}</span>` +
    `<p>${note.text}${link}</p>` +
    '<button class="nav-season-note-close" type="button" aria-label="Close message">' +
    '<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" focusable="false">' +
    '<path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>' +
    '</button>';
  nav.appendChild(el);

  el.querySelector('.nav-season-note-close').addEventListener('click', () => {
    el.remove();
    remember();
  });
  el.querySelector('.nav-season-note-link')?.addEventListener('click', remember);
  window.setTimeout(() => el.classList.add('is-in'), 600);
};

const initSeasonalNav = () => {
  const nav = document.getElementById('app-nav');
  if (!nav?.classList.contains('site-nav')) return;
  const season = currentSeason();
  if (!season) return;
  if (!prefersReducedMotion()) addSeasonShapes(nav, season);
  addSeasonNote(nav, season);
};

const initReveal = () => {
  const nodes = [...document.querySelectorAll('.reveal')];
  if (!nodes.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nodes.forEach((node) => node.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  nodes.forEach((node) => observer.observe(node));
};

const initAccessibility = () => {
  const main = document.querySelector('main');
  if (main && !main.id) {
    main.id = 'main-content';
  }

  if (!document.querySelector('.skip-link') && main) {
    const skip = document.createElement('a');
    skip.className = 'skip-link';
    skip.href = '#main-content';
    skip.textContent = 'Skip to main content';
    document.body.prepend(skip);
  }
};

const renderMenus = (siteData) => {
  const tabsEl = document.getElementById('menu-tabs');
  const panelsEl = document.getElementById('menu-panels');
  if (!tabsEl || !panelsEl) return;

  const renderMenuItem = (item) => `
    <div class="menu-item">
      <div>
        <div class="menu-item-name">${escapeHtml(item.name)}</div>
        <div class="menu-item-desc">${escapeHtml(item.desc || '')}</div>
      </div>
      <div class="menu-item-price">${escapeHtml(item.price || '')}</div>
    </div>
  `;

  const renderDeliveryTab = (options) => options.map(opt => `
    <div class="delivery-option">
      <div class="delivery-option-header">
        <h3 class="delivery-option-name">${escapeHtml(opt.name)}</h3>
        ${opt.note ? `<span class="delivery-option-badge">${escapeHtml(opt.note)}</span>` : ''}
      </div>
      <p class="delivery-option-desc">${escapeHtml(opt.description)}</p>
      <a class="btn btn-primary mt-08" href="${escapeHtml(opt.url)}" target="_blank" rel="noopener noreferrer">Order on ${escapeHtml(opt.name)}</a>
    </div>
  `).join('');

  const renderMenuColumn = (col) => {
    return `
      <div class="menu-section">
        ${col.sections.map((section, sectionIndex) => `
          <div class="menu-section-title${sectionIndex > 0 ? ' mt-12' : ''}">${escapeHtml(section.title)}</div>
          ${section.items.map(renderMenuItem).join('')}
        `).join('')}
      </div>
    `;
  };

  tabsEl.setAttribute('role', 'tablist');
  tabsEl.setAttribute('aria-label', 'Menu categories');
  tabsEl.setAttribute('aria-orientation', 'horizontal');

  tabsEl.innerHTML = siteData.menuTabs
    .map((tab, i) => {
      const tabId = `tab-${tab.id}`;
      const panelId = `panel-${tab.id}`;
      const selected = i === 0;
      return `<button class="menu-tab${selected ? ' active' : ''}" id="${tabId}" role="tab" aria-selected="${selected}" aria-controls="${panelId}" tabindex="${selected ? '0' : '-1'}" data-panel="${tab.id}" type="button">${escapeHtml(tab.label)}</button>`;
    })
    .join('');

  panelsEl.innerHTML = siteData.menuTabs
    .map((tab, i) => {
      const tabId = `tab-${tab.id}`;
      const panelId = `panel-${tab.id}`;
      const active = i === 0;
      return `
      <div id="${panelId}" class="menu-panel${active ? ' active' : ''}" role="tabpanel" aria-labelledby="${tabId}" ${active ? '' : 'hidden'}>
        <div class="menu-cols">${(tab.columns || tab.menu?.columns || []).map(renderMenuColumn).join('')}</div>
        ${tab.type === 'delivery' && tab.options?.length
          ? `<div class="delivery-order-section">
              <h3 class="delivery-order-heading">Order for Delivery</h3>
              <div class="delivery-options">${renderDeliveryTab(tab.options)}</div>
            </div>`
          : ''}
        ${tab.note ? `<p class="menu-note">${escapeHtml(tab.note)}</p>` : ''}
        ${tab.drinkNote ? `<p class="menu-note">${escapeHtml(tab.drinkNote)}</p>` : ''}
      </div>
    `;
    })
    .join('');

  const tabs = [...tabsEl.querySelectorAll('.menu-tab')];
  const panels = [...panelsEl.querySelectorAll('.menu-panel')];

  const setActiveTab = (tab, moveFocus = false) => {
    if (!tab) return;
    const panelSuffix = tab.dataset.panel;
    const panelId = `panel-${panelSuffix}`;

    tabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', String(isActive));
      item.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel.id === panelId;
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
    });

    if (moveFocus) tab.focus();
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => setActiveTab(tab));
    tab.addEventListener('keydown', (event) => {
      const index = tabs.indexOf(tab);
      let targetIndex = -1;

      if (event.key === 'ArrowRight') targetIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') targetIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') targetIndex = 0;
      if (event.key === 'End') targetIndex = tabs.length - 1;

      if (targetIndex >= 0) {
        event.preventDefault();
        setActiveTab(tabs[targetIndex], true);
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setActiveTab(tab);
      }
    });
  });
};

const renderPrivateHirePackages = (siteData) => {
  const packagesEl = document.getElementById('private-hire-packages');
  if (!packagesEl || !siteData.privateHirePackages?.length) return;

  packagesEl.innerHTML = siteData.privateHirePackages.map((pkg) => `
    <article class="card private-hire-package">
      <div class="private-hire-package-header">
        <div>
          <p class="eyebrow">Private Hire</p>
          <h3>${escapeHtml(pkg.name)}</h3>
        </div>
        <div class="private-hire-package-price">${escapeHtml(pkg.price)}</div>
      </div>
      ${pkg.note ? `<p class="menu-note">${escapeHtml(pkg.note)}</p>` : ''}
      <div class="private-hire-package-block">
        <h4>Food Included</h4>
        <ul class="private-hire-package-list">
          ${pkg.foodIncluded.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
      </div>
      <div class="private-hire-package-block">
        <h4>Included</h4>
        <p>${escapeHtml(pkg.included.join(', '))}</p>
      </div>
      <div class="private-hire-package-block">
        <h4>Extras</h4>
        <p>${escapeHtml(pkg.extras.join(', '))}</p>
      </div>
    </article>
  `).join('');
};

const renderCocktails = (siteData) => {
  const el = document.getElementById('cocktails-grid');
  if (!el) return;
  
  el.innerHTML = siteData.cocktails.map((c) => {
    const nameLower = c.name.toLowerCase();
    const img = nameLower.includes('espresso martini')
      ? 'assets/images/drinks/espresso-martini.png'
      : nameLower.includes('pornstar')
        ? 'assets/images/drinks/Cocktail-Pornstar-Martini.JPG'
        : nameLower.includes('bloody mary')
          ? 'assets/images/drinks/Cocktail-Bloody-Mary.jpeg'
        : nameLower.includes('dark') && nameLower.includes('storm')
          ? 'assets/images/drinks/Cocktail-Dark-Stormy.jpeg'
        : nameLower.includes('pina colada')
          ? 'assets/images/drinks/Cocktail-Pina-Colada.jpeg'
        : nameLower.includes('aperol spritz')
          ? 'assets/images/drinks/aperol-spritz.webp'
        : nameLower.includes('limoncello spritz')
          ? 'assets/images/drinks/cocktail-limoncello-spritz.jpg'
        : nameLower.includes('ice lolly')
          ? 'assets/images/drinks/Cocktail-Ice-Lolly.jpeg'
        : nameLower.includes('very berry')
          ? 'assets/images/drinks/cocktail-very-berry.jpg'
        : nameLower.includes('cosmopolitan') || nameLower.includes('cosmo')
          ? 'assets/images/drinks/cocktail-cosmopolitan.jpg'
        : nameLower.includes('margarita')
          ? 'assets/images/drinks/cocktail-margarita.jpeg'
        : nameLower.includes('french martini')
          ? 'assets/images/drinks/cocktail-french-martini.jpeg'
        : nameLower.includes('tom collins')
          ? 'assets/images/drinks/cocktail-tom-collins.jpeg'
        : nameLower.includes('mojito')
          ? 'assets/images/drinks/cocktail-mojito.jpeg'
        : nameLower.includes('old fashioned')
          ? 'assets/images/drinks/Cocktail-Old-Fashioned.jpeg'
        : nameLower.includes('long island')
          ? 'assets/images/drinks/Cocktail-Long-Island-Iced-Tea.jpeg'
        : nameLower.includes('sour')
          ? 'assets/images/drinks/Cocktail-Sours.jpeg'
        : 'assets/images/drinks/cocktail-2-very-berry-pornstar-martini.jpg';
    return `
    <div class="cocktail-card${c.happyHour ? ' happy-hour' : ''}">
      <div class="cocktail-card-image">
        <img src="${img}" alt="${escapeHtml(c.name)}" loading="lazy">
      </div>
      <div class="cocktail-card-content">
        <div class="cocktail-name">
          ${escapeHtml(c.name)}
          ${c.happyHour ? '<span class="happy-hour-badge" title="Happy Hour Cocktail">🍸</span>' : ''}
        </div>
        <div class="cocktail-desc">${escapeHtml(c.desc)}</div>
        <div class="cocktail-price">${escapeHtml(c.price)}</div>
      </div>
    </div>
  `;
  }).join('');
};

const renderHappyHour = (siteData) => {
  const timesEl = document.getElementById('happy-hour-times');
  const priceEl = document.getElementById('happy-hour-price');
  if (!timesEl || !priceEl) return;

  const { happyHour } = siteData;
  if (happyHour) {
    timesEl.textContent = happyHour.times || 'Check with staff for times';
    priceEl.textContent = happyHour.price || '';
  }
};

const renderHours = (siteData) => {
  const el = document.getElementById('hours-grid');
  if (!el) return;

  const dayOrder = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6
  };

  el.innerHTML = [...siteData.openingHours]
  .sort((a, b) => (dayOrder[a.day] ?? 999) - (dayOrder[b.day] ?? 999))
  .map((h) => `
    <div class="hours-row">
      <span>${escapeHtml(h.day)}</span>
      <span class="${h.closed ? 'closed' : 'time'}">${escapeHtml(h.time)}</span>
    </div>
  `).join('');
};

const parseTimeLabelTo24Hour = (label) => {
  const match = (label || '').trim().toLowerCase().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/);
  if (!match) return null;

  let hour = Number(match[1]);
  const minute = Number(match[2] || 0);
  const meridiem = match[3];

  if (meridiem === 'pm' && hour !== 12) hour += 12;
  if (meridiem === 'am' && hour === 12) hour = 0;

  return hour + minute / 60;
};

const format12Hour = (time24) => {
  const hour24 = Math.floor(time24);
  const minutes = Math.round((time24 % 1) * 60);
  const suffix = hour24 >= 12 ? 'pm' : 'am';
  const hour12 = hour24 % 12 || 12;
  return `${hour12}${minutes ? `:${String(minutes).padStart(2, '0')}` : ''}${suffix}`;
};

const buildHoursMap = (openingHours = []) => {
  const dayIndexMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
  };

  return openingHours.reduce((map, row) => {
    const dayIndex = dayIndexMap[row.day];
    if (dayIndex === undefined) return map;

    if (row.closed || !row.time || row.time.toLowerCase() === 'closed') {
      map[dayIndex] = null;
      return map;
    }

    const normalizedTime = row.time.replace(/approx\.?/gi, '').trim();
    const parts = normalizedTime.split(/\s*[-–]\s*/);
    if (parts.length !== 2) {
      map[dayIndex] = null;
      return map;
    }

    const open = parseTimeLabelTo24Hour(parts[0]);
    const close = parseTimeLabelTo24Hour(parts[1]);
    if (open === null || close === null) {
      map[dayIndex] = null;
      return map;
    }

    map[dayIndex] = { open, close };
    return map;
  }, {});
};

// Drinks page tabs and rendering
const DRINKS_TABS = [
  { id: 'cocktails', label: 'Cocktails' },
  { id: 'white', label: 'White Wines' },
  { id: 'red', label: 'Red Wines' },
  { id: 'rose', label: 'Rosé' },
  { id: 'sparkling', label: 'Fizz & Champagne' },
  { id: 'hot', label: 'Hot Drinks' }
];

const renderDrinksTabs = () => {
  const tabsEl = document.getElementById('drinks-tabs');
  if (!tabsEl) return;

  tabsEl.innerHTML = DRINKS_TABS.map((tab, i) => {
    const selected = i === 0;
    return `<button class="menu-tab${selected ? ' active' : ''}" id="tab-${tab.id}" role="tab" aria-selected="${selected}" aria-controls="panel-${tab.id}" tabindex="${selected ? '0' : '-1'}" data-panel="${tab.id}" type="button">${escapeHtml(tab.label)}</button>`;
  }).join('');
};

const renderWineCard = (wine) => {
  const prices = [];
  if (wine.glass125ml) prices.push(`125ml: ${wine.glass125ml}`);
  if (wine.glass175ml) prices.push(`175ml: ${wine.glass175ml}`);
  if (wine.glass250ml) prices.push(`250ml: ${wine.glass250ml}`);
  if (wine.bottle) prices.push(`Bottle: ${wine.bottle}`);

  return `
    <div class="wine-card">
      <div class="wine-header">
        <div class="wine-name">${escapeHtml(wine.name)}</div>
        <div class="wine-origin">${escapeHtml(wine.origin)}</div>
      </div>
      <div class="wine-prices">${prices.join(' · ')}</div>
    </div>
  `;
};

const renderWines = (siteData) => {
  if (!siteData.wines || siteData.wines.length === 0) return;

  const winesByType = {
    White: [],
    Red: [],
    'Rosé': [],
    Sparkling: [],
    Champagne: []
  };

  siteData.wines.forEach(wine => {
    const type = wine.type || 'White';
    if (winesByType[type]) {
      winesByType[type].push(wine);
    }
  });

  // White wines
  const whiteGrid = document.getElementById('wines-white-grid');
  if (whiteGrid) {
    whiteGrid.innerHTML = winesByType.White.map(renderWineCard).join('') || '<p>No white wines available</p>';
  }

  // Red wines
  const redGrid = document.getElementById('wines-red-grid');
  if (redGrid) {
    redGrid.innerHTML = winesByType.Red.map(renderWineCard).join('') || '<p>No red wines available</p>';
  }

  // Rosé wines
  const roseGrid = document.getElementById('wines-rose-grid');
  if (roseGrid) {
    roseGrid.innerHTML = winesByType['Rosé'].map(renderWineCard).join('') || '<p>No rosé wines available</p>';
  }

  // Sparkling & Champagne
  const sparklingGrid = document.getElementById('wines-sparkling-grid');
  if (sparklingGrid) {
    const sparkling = [...winesByType.Sparkling, ...winesByType.Champagne];
    sparklingGrid.innerHTML = sparkling.map(renderWineCard).join('') || '<p>No sparkling wines available</p>';
  }
};

const renderHotDrinks = (siteData) => {
  const el = document.getElementById('hot-drinks-grid');
  if (!el || !siteData.hotBeverages) return;

  el.innerHTML = siteData.hotBeverages.map(drink => `
    <div class="wine-card">
      <div class="wine-header">
        <div class="wine-name">${escapeHtml(drink.name)}</div>
        <div class="wine-origin">${escapeHtml(drink.price)}</div>
      </div>
      ${drink.description ? `<div class="wine-prices">${escapeHtml(drink.description)}</div>` : ''}
    </div>
  `).join('');
};

const initDrinksTabs = () => {
  const tabsEl = document.getElementById('drinks-tabs');
  const panelsEl = document.getElementById('drinks-panels');
  if (!tabsEl || !panelsEl) return;

  const tabs = [...tabsEl.querySelectorAll('.menu-tab')];
  const panels = [...panelsEl.querySelectorAll('.drinks-panel')];

  const setActiveTab = (tab, moveFocus = false) => {
    if (!tab) return;
    const panelId = `panel-${tab.dataset.panel}`;

    tabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', String(isActive));
      item.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel.id === panelId;
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
    });

    if (moveFocus) tab.focus();
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => setActiveTab(tab));
    tab.addEventListener('keydown', (event) => {
      const index = tabs.indexOf(tab);
      let targetIndex = -1;

      if (event.key === 'ArrowRight') targetIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') targetIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') targetIndex = 0;
      if (event.key === 'End') targetIndex = tabs.length - 1;

      if (targetIndex >= 0) {
        event.preventDefault();
        setActiveTab(tabs[targetIndex], true);
      }
    });
  });
};

const wireDojoLinks = () => {
  document.querySelectorAll('[data-dojo-link="true"]').forEach((link) => {
    if (link instanceof HTMLAnchorElement) {
      link.href = DOJO_BOOKING_URL;
    }
  });
};

// Sunday notice on book.html. The Dojo widget is a cross-origin iframe, so we
// cannot see which date a guest picks inside it; instead the notice is shown
// before they start, once per browser session.
const SUNDAY_NOTICE_KEY = 'bank-sunday-notice-seen';

const initSundayNotice = () => {
  const dialog = document.getElementById('sunday-dialog');
  if (!(dialog instanceof HTMLDialogElement) || typeof dialog.showModal !== 'function') return;

  let seen = false;
  try { seen = sessionStorage.getItem(SUNDAY_NOTICE_KEY) === '1'; } catch (e) { /* storage blocked */ }
  if (seen) return;

  dialog.addEventListener('close', () => {
    try { sessionStorage.setItem(SUNDAY_NOTICE_KEY, '1'); } catch (e) { /* storage blocked */ }
  });
  // Clicking the backdrop (outside the dialog box) also dismisses it.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.showModal();
};

const renderSundayNote = (siteData) => {
  if (!siteData.sundayNote) return;
  document.querySelectorAll('[data-sunday-note]').forEach((el) => {
    el.textContent = siteData.sundayNote;
  });
};

const wirePrivateHireForm = () => {
  const form = document.getElementById('private-hire-form');
  if (!form) return;
  const status = document.getElementById('private-hire-status');

  if (status) {
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const packageInterest = String(formData.get('packageInterest') || '').trim();
    const eventDate = String(formData.get('eventDate') || '').trim();
    const guestCount = String(formData.get('guestCount') || '').trim();
    const details = String(formData.get('details') || '').trim();

    const subject = `Private Hire Enquiry - ${name || 'The Bank Website'}`;
    const body = [
      'Private Hire Enquiry',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Package: ${packageInterest}`,
      `Event Date: ${eventDate}`,
      `Number of Guests: ${guestCount}`,
      '',
      'Details:',
      details
    ].join('\n');

    window.location.href = `mailto:info@thebanklowfell.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (status) status.textContent = 'Your email app should open now.';
  });
};

// Fetch with retry logic
const fetchWithRetry = async (url, retries = 2, delay = 1000) => {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      if (response.status >= 500 && i < retries) {
        await new Promise(r => setTimeout(r, delay * (i + 1)));
        continue;
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (err) {
      if (i === retries) throw err;
      await new Promise(r => setTimeout(r, delay * (i + 1)));
    }
  }
};

// Show loading state
const setLoadingState = (loading) => {
  const containers = ['#cocktails-grid', '#menu-panels', '#hours-grid'];
  containers.forEach(selector => {
    const el = document.querySelector(selector);
    if (el && loading && !el.innerHTML.includes('menu-item')) {
      el.innerHTML = '<div class="loading-state">Loading...</div>';
    }
  });
};

const init = async () => {
  injectLayout();
  injectEmail();
  initAccessibility();
  initMobileNav();
  initStickyNav();
  initSeasonalNav();
  initReveal();
  wireDojoLinks();
  initSundayNotice();
  wirePrivateHireForm();
  initParallax();
  initFloatingButton();

  setLoadingState(true);

  try {
    // Content is served directly from the bundled snapshot (data/site-data.json).
    // To update the site, edit that file and redeploy. (Airtable is no longer
    // queried on each visit; see scripts/build-from-csv.js to regenerate the
    // snapshot from CSV exports.)
    const response = await fetchWithRetry('./data/site-data.json');
    if (!response.ok) throw new Error('Could not load data');
    const siteData = await response.json();

    renderMenus(siteData);
    renderCocktails(siteData);
    renderHappyHour(siteData);
    renderHours(siteData);
    renderFooterHours(siteData);
    renderReviews(siteData);
    renderPrivateHirePackages(siteData);
    renderSundayNote(siteData);
    initOpenStatus(siteData);
    
    // Drinks page
    renderDrinksTabs();
    renderWines(siteData);
    renderHotDrinks(siteData);
    initDrinksTabs();
  } catch (error) {
    console.error('Error loading menu data:', error);
    // Show error state
    const cocktailsGrid = document.getElementById('cocktails-grid');
    if (cocktailsGrid) {
      cocktailsGrid.innerHTML = '<p class="error-state">Unable to load cocktails. Please refresh or try again later.</p>';
    }
  }
};

// Reviews
const renderReviews = (siteData) => {
  const grid = document.getElementById('reviews-grid');
  const summary = document.getElementById('reviews-summary');
  if (!grid) return;

  const reviews = siteData.reviews || [];
  if (!reviews.length) return;

  const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

  const sourceIcon = (source) => {
    const s = (source || '').toLowerCase();
    if (s.includes('google')) return '<span class="review-source-badge review-source-google">Google</span>';
    if (s.includes('tripadvisor')) return '<span class="review-source-badge review-source-tripadvisor">TripAdvisor</span>';
    if (s.includes('facebook')) return '<span class="review-source-badge review-source-facebook">Facebook</span>';
    return `<span class="review-source-badge">${escapeHtml(source)}</span>`;
  };

  grid.innerHTML = reviews.map((r, i) => `
    <div class="review-card${i === 0 ? ' active' : ''}">
      <div class="review-stars" aria-label="${r.rating} out of 5 stars">${stars(r.rating)}</div>
      <blockquote class="review-quote">"${escapeHtml(r.quote)}"</blockquote>
      <div class="review-footer">
        <span class="review-author">- ${escapeHtml(r.author)}</span>
        ${sourceIcon(r.source)}
      </div>
    </div>
  `).join('');

  // Carousel
  const cards = [...grid.querySelectorAll('.review-card')];
  const dotsEl = document.getElementById('reviews-dots');
  const prevBtn = document.querySelector('.reviews-prev');
  const nextBtn = document.querySelector('.reviews-next');
  let current = 0;

  const goTo = (index) => {
    cards[current].classList.remove('active');
    if (dotsEl) dotsEl.children[current]?.classList.remove('active');
    current = (index + cards.length) % cards.length;
    cards[current].classList.add('active');
    if (dotsEl) dotsEl.children[current]?.classList.add('active');
  };

  if (dotsEl) {
    dotsEl.innerHTML = cards.map((_, i) =>
      `<button class="reviews-dot${i === 0 ? ' active' : ''}" aria-label="Review ${i + 1}"></button>`
    ).join('');
    [...dotsEl.children].forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  // Auto-advance every 6 seconds
  setInterval(() => goTo(current + 1), 6000);

  // Overall rating summary
  if (summary && reviews.length) {
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    const rounded = Math.round(avg * 10) / 10;
    summary.innerHTML = `
      <div class="reviews-overall">
        <span class="reviews-overall-score">${rounded}</span>
        <div>
          <div class="reviews-overall-stars" aria-label="${rounded} out of 5">${stars(Math.round(avg))}</div>
          <span class="reviews-overall-count">Based on ${reviews.length} review${reviews.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
    `;
  }
};

// Newsletter Form
// Footer Hours
const renderFooterHours = (siteData) => {
  const el = document.getElementById('footer-hours-list');
  if (!el || !siteData?.openingHours) return;

  const dayOrder = { Monday:0, Tuesday:1, Wednesday:2, Thursday:3, Friday:4, Saturday:5, Sunday:6 };
  const dayAbbr  = { Monday:'Mon', Tuesday:'Tue', Wednesday:'Wed', Thursday:'Thu', Friday:'Fri', Saturday:'Sat', Sunday:'Sun' };
  const todayName = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date().getDay()];

  el.innerHTML = [...siteData.openingHours]
    .sort((a, b) => (dayOrder[a.day] ?? 99) - (dayOrder[b.day] ?? 99))
    .map(h => `
      <div class="footer-hour-row${h.day === todayName ? ' today' : ''}">
        <span class="fh-day">${dayAbbr[h.day] || h.day}</span>
        <span class="fh-time${h.closed ? ' fh-closed' : ''}">${escapeHtml(h.time)}</span>
      </div>
    `).join('');
};

// Open/Closed Status
const initOpenStatus = (siteData) => {
  const statusEl = document.getElementById('open-status');
  if (!statusEl) return;
  const hours = buildHoursMap(siteData?.openingHours || []);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const updateStatus = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours() + now.getMinutes() / 60;
    const todayHours = hours[day];

    let isOpen = false;
    let message = '';

    if (todayHours && hour >= todayHours.open && hour < todayHours.close) {
      isOpen = true;
      message = `Open now · Closes around ${format12Hour(todayHours.close)}`;
    } else if (todayHours && hour < todayHours.open) {
      message = `Closed · Opens today at ${format12Hour(todayHours.open)}`;
    } else {
      // Find next opening
      let nextDay = day;
      for (let i = 1; i <= 7; i++) {
        nextDay = (day + i) % 7;
        if (hours[nextDay]) {
          message = `Closed · Opens ${i === 1 ? 'tomorrow' : days[nextDay]} at ${format12Hour(hours[nextDay].open)}`;
          break;
        }
      }
    }

    statusEl.innerHTML = `<span class="status-dot ${isOpen ? 'open' : 'closed'}"></span>${message}`;
  };

  updateStatus();
  setInterval(updateStatus, 60000); // Update every minute
};

// Parallax Effect (disabled)
const initParallax = () => {
  // Zoom effect disabled per preference
  return;
};

// Floating Book Button
const initFloatingButton = () => {
  const btn = document.querySelector('.floating-book-btn');
  if (!btn) return;

  let lastScroll = 0;
  const threshold = 300;

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > threshold) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
};

// Scroll Reveal Animation
const initScrollReveal = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
};

// Scroll to Top Button
const initScrollToTop = () => {
  // Create button if not exists
  if (document.querySelector('.scroll-to-top')) return;
  
  const btn = document.createElement('button');
  btn.className = 'scroll-to-top';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
  document.body.appendChild(btn);

  const handleScroll = () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
};

// Auto-add reveal classes to common sections
const autoAddRevealClasses = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Add reveal to sections
  document.querySelectorAll('section > .container, .hero-tagline, .featured-cocktail, .footer-newsletter').forEach(el => {
    if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right')) {
      el.classList.add('reveal');
    }
  });

  // Add stagger to grids
  document.querySelectorAll('.gallery-grid, .wines-grid').forEach(el => {
    if (!el.classList.contains('reveal-stagger')) {
      el.classList.add('reveal-stagger');
    }
  });
};

// Initialize all visual enhancements
const initVisualEnhancements = () => {
  autoAddRevealClasses();
  initScrollReveal();
  initScrollToTop();
};

// Call after DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVisualEnhancements);
} else {
  initVisualEnhancements();
}

// Auto-refresh when a new deployment is detected.
// Polls the current page's ETag (set by Vercel to a content hash) every 5 minutes.
// Skips reload if the user is actively typing in a form field.
const initAutoRefresh = () => {
  const INTERVAL = 5 * 60 * 1000;
  let knownEtag = null;

  const fetchEtag = async () => {
    try {
      const res = await fetch(window.location.pathname, { method: 'HEAD', cache: 'no-store' });
      return res.headers.get('etag') || res.headers.get('last-modified') || null;
    } catch {
      return null;
    }
  };

  fetchEtag().then(etag => { knownEtag = etag; });

  setInterval(async () => {
    const etag = await fetchEtag();
    if (!etag || !knownEtag || etag === knownEtag) return;
    const active = document.activeElement;
    const inForm = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT');
    if (!inForm) window.location.reload(true);
  }, INTERVAL);
};

initAutoRefresh();
init();
