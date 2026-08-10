/* Feel Your Soul — Footsouls bundle page (mockup)
   All commerce logic is front-end only; on Shopify this maps to a
   cart-transform / bundle function that zeroes the cheapest line item. */

const UNIT = 34.95;

/* Countdown window. Rolling deadline OFFER_DAYS from now, ending at midnight.
   0 = tonight, 3 = three days out. Set OFFER_END to an ISO date string
   ('2026-08-31T23:59:59') to pin the countdown to a fixed campaign end instead. */
const OFFER_DAYS = 3;
const OFFER_END = null;

const TIERS = {
  1: { paid: 1, free: 0, price: 34.95,  label: '1 Pair' },
  2: { paid: 2, free: 0, price: 64.95,  label: '2 Pairs' },
  4: { paid: 3, free: 1, price: 104.85, label: '3 Pairs + 1 FREE' },
  8: { paid: 6, free: 2, price: 199.00, label: '6 Pairs + 2 FREE' }
};

const SIZES = [
  "Men's 6 / Women's 7.5", "Men's 7 / Women's 8.5", "Men's 8 / Women's 9.5",
  "Men's 9 / Women's 10.5", "Men's 10 / Women's 11.5", "Men's 11 / Women's 12.5",
  "Men's 12 / Women's 13.5", "Men's 13 / Women's 14.5"
];

const money = n => '$' + n.toFixed(2);
const $ = id => document.getElementById(id);

let selected = 4;

/* ---------------- Tier selection ---------------- */
const tierEls = [...document.querySelectorAll('.tier')];

tierEls.forEach(el => {
  el.addEventListener('click', () => selectTier(Number(el.dataset.tier)));
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectTier(Number(el.dataset.tier)); }
  });
});

function selectTier(t) {
  selected = t;
  tierEls.forEach(el => {
    const on = Number(el.dataset.tier) === t;
    el.classList.toggle('is-selected', on);
    el.querySelector('input').checked = on;
  });
  renderSlots();
  render();
}

/* ---------------- Size slots ---------------- */
function renderSlots() {
  const { paid, free } = TIERS[selected];
  const total = paid + free;
  const wrap = $('slots');
  const previous = [...wrap.querySelectorAll('select')].map(s => s.value);

  wrap.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const isFree = i >= paid;
    const row = document.createElement('div');
    row.className = 'slot' + (isFree ? ' slot--free' : '');
    row.innerHTML = `
      <span class="slot__n">${isFree ? '★' : i + 1}</span>
      <span class="slot__label">
        ${isFree ? 'Free pair' : 'Pair ' + (i + 1)}
        <small>${isFree ? 'Added at $0.00 — pick any size' : 'Footsouls for Converse &amp; Vans'}</small>
      </span>
      <select aria-label="Size for pair ${i + 1}">
        ${SIZES.map(s => `<option>${s}</option>`).join('')}
      </select>`;
    const sel = row.querySelector('select');
    sel.value = previous[i] || SIZES[3];
    wrap.appendChild(row);
  }
}

/* ---------------- Pricing + progress ---------------- */
function render() {
  const t = TIERS[selected];
  const units = t.paid + t.free;
  const was = units * UNIT;
  const save = was - t.price;

  $('sumWas').textContent = money(was);
  $('sumWas').classList.toggle('strike', save > 0);
  $('sumSave').textContent = '−' + money(save);
  $('sumSave').parentElement.style.display = save > 0 ? '' : 'none';
  $('sumTotal').textContent = money(t.price);
  $('atcLabel').textContent = `ADD ${units} PAIR${units > 1 ? 'S' : ''} — ${money(t.price)}`;
  $('stickyTitle').textContent = t.label;
  $('stickyTotal').textContent = money(t.price);
  $('stickyWas').textContent = money(was);
  $('stickyWas').style.display = save > 0 ? '' : 'none';

  $('microCopy').textContent = t.price >= 40
    ? 'Free US shipping unlocked · 30-day comfort guarantee · Ships in 24h'
    : `Add ${money(40 - t.price)} more for free US shipping · 30-day comfort guarantee`;

  // progress toward the free pair
  const paid = t.paid;
  const pct = Math.min(paid / 3, 1) * 100;
  $('progressFill').style.width = pct + '%';

  const label = $('progressLabel');
  if (paid >= 6) {
    label.innerHTML = `<span class="win">Maxed out — 2 free pairs unlocked, ${money(save)} saved.</span>`;
  } else if (paid >= 3) {
    label.innerHTML = `<span class="win">Free pair unlocked — you're saving ${money(save)}.</span>`;
  } else {
    const need = 3 - paid;
    label.innerHTML = `You're <strong>${need} pair${need > 1 ? 's' : ''}</strong> away from a <strong>free pair</strong> (worth ${money(UNIT)}).`;
  }
}

/* ---------------- Countdown ---------------- */
(function countdown() {
  const el = $('countdown');

  function deadline() {
    if (OFFER_END) return new Date(OFFER_END);
    const d = new Date();
    d.setDate(d.getDate() + OFFER_DAYS);
    d.setHours(23, 59, 59, 999);
    return d;
  }

  let end = deadline();
  const tick = () => {
    let s = Math.floor((end - Date.now()) / 1000);
    if (s <= 0) {
      // rolling offer: reset to the next window rather than sitting at zero
      if (!OFFER_END) { end = deadline(); s = Math.floor((end - Date.now()) / 1000); }
      else s = 0;
    }
    const d = Math.floor(s / 86400);
    const h = String(Math.floor((s % 86400) / 3600)).padStart(2, '0');
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    el.textContent = d > 0 ? `${d}d ${h}:${m}:${sec}` : `${h}:${m}:${sec}`;
  };
  tick();
  setInterval(tick, 1000);
})();

/* ---------------- Gallery ---------------- */
document.querySelectorAll('.thumb').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.thumb').forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');
    $('galleryMain').src = btn.dataset.src;
  });
});

/* ---------------- Sticky bar ---------------- */
const sticky = $('stickybar');
const atc = $('atc');
const io = new IntersectionObserver(
  ([entry]) => sticky.classList.toggle('is-visible', !entry.isIntersecting),
  { threshold: 0 }
);
io.observe(atc);

/* ---------------- Add to cart ---------------- */
let cart = 0;
function addToCart() {
  const t = TIERS[selected];
  cart += t.paid + t.free;
  $('cartCount').textContent = cart;
  $('toastTitle').textContent = `${t.paid + t.free} pairs added — ${money(t.price)}`;
  $('toastSub').textContent = t.free
    ? `${t.free} free pair${t.free > 1 ? 's' : ''} applied automatically. No code needed.`
    : 'Add 2 more pairs to unlock a free pair.';
  const toast = $('toast');
  toast.classList.add('is-visible');
  clearTimeout(addToCart._t);
  addToCart._t = setTimeout(() => toast.classList.remove('is-visible'), 4000);

  // scarcity ticks down as social proof of demand
  const left = $('stockLeft');
  const n = Math.max(7, Number(left.textContent) - (t.paid + t.free));
  left.textContent = n;
}
atc.addEventListener('click', addToCart);
$('stickyAtc').addEventListener('click', addToCart);

/* ---------------- Init ---------------- */
renderSlots();
render();
