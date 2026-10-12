/* =========================================================
   ParisMontages — interactions
   Vanilla JS, no dependencies
   ========================================================= */
(function () {
  'use strict';

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.prototype.slice.call((c || document).querySelectorAll(s));

  /* ---------- mobile nav ---------- */
  const burger = $('#burger');
  const nav = $('#nav');
  if (burger && nav) {
    const close = () => {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Ouvrir le menu');
    };
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });
    $$('a', nav).forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* ---------- sticky header state ---------- */
  const head = $('#siteHead');
  let lastY = -1;
  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    if ((y > 40) !== (lastY > 40) && head) head.classList.toggle('is-stuck', y > 40);
    lastY = y;
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- scroll reveal ---------- */
  const revealables = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealables.forEach(el => io.observe(el));
  } else {
    revealables.forEach(el => el.classList.add('in'));
  }

  /* ---------- capacity calculator ---------- */
  const calc = {
    len: $('#len'), hgt: $('#hgt'), kg: $('#kg'),
    lenOut: $('#lenOut'), hgtOut: $('#hgtOut'), kgOut: $('#kgOut'),
    rPal: $('#rPal'), rLvl: $('#rLvl'), rTon: $('#rTon')
  };
  if (calc.len) {
    const BAY = 2.7;      // m per bay (travée)
    const PER_LEVEL = 2;  // palettes Europe, double accès
    const LEVEL_H = 1.5;  // m per level (lisse + marge manutention)

    const run = () => {
      const L = +calc.len.value, H = +calc.hgt.value, KG = +calc.kg.value;
      calc.lenOut.textContent = L + ' m';
      calc.hgtOut.textContent = H + ' m';
      calc.kgOut.textContent = KG + ' kg';

      const bays  = Math.max(1, Math.floor(L / BAY));
      const levels = Math.max(1, Math.min(8, Math.floor(H / LEVEL_H)));
      const pallets = bays * levels * PER_LEVEL;
      const tonnes = pallets * KG / 1000;

      calc.rPal.textContent = pallets.toLocaleString('fr-FR');
      calc.rLvl.textContent = String(levels);
      calc.rTon.textContent = tonnes.toLocaleString('fr-FR', { maximumFractionDigits: 1 });
    };
    [calc.len, calc.hgt, calc.kg].forEach(el => el.addEventListener('input', run));
    run();
  }

  /* ---------- quote form ---------- */
  const form = $('#devisForm');
  const msg = $('#formMsg');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      msg.className = 'form__msg';

      // honeypot
      if (form._hp && form._hp.value) return;

      let bad = null;
      $$('.f', form).forEach(f => {
        const ctrl = $('input, textarea, select', f);
        if (!ctrl) return;
        const ok = ctrl.checkValidity() && ctrl.value.trim() !== '';
        f.classList.toggle('is-bad', !ok);
        if (!ok && !bad) bad = ctrl;
      });
      const rgpd = $('input[name="rgpd"]', form);
      if (rgpd && !rgpd.checked) {
        msg.classList.add('err');
        msg.textContent = 'Merci de cocher la case d’autorisation de contact.';
        if (!bad) bad = rgpd;
      }
      if (bad) {
        if (!msg.textContent || msg.classList.contains('ok')) {
          msg.classList.add('err');
          msg.textContent = 'Vérifiez les champs obligatoires signalés.';
        }
        bad.focus();
        return;
      }

      const get = (n) => {
        const el = form.querySelector('[name="' + n + '"]');
        return el ? el.value.trim() : '';
      };
      const body = [
        'Nom : ' + get('nom'),
        'Société : ' + get('societe'),
        'E-mail : ' + get('email'),
        'Téléphone : ' + get('tel'),
        'Type de projet : ' + get('projet'),
        'Surface : ' + get('surface') + ' m²',
        '',
        'Besoin :',
        get('message')
      ].join('\r\n');

      msg.classList.add('ok');
      msg.textContent = 'Merci — ouverture de votre messagerie pour finaliser l’envoi…';
      window.location.href = 'mailto:contact@parismontages.fr'
        + '?subject=' + encodeURIComponent('Demande de devis — rayonnage (' + (get('societe') || get('nom')) + ')')
        + '&body=' + encodeURIComponent(body);
    });

    $$('.f input, .f textarea', form).forEach(el => {
      el.addEventListener('input', () => el.closest('.f').classList.remove('is-bad'));
    });
  }

  /* ---------- year ---------- */
  const y = $('#year');
  if (y) y.textContent = String(new Date().getFullYear());
})();
