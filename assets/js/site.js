(function () {
  'use strict';

  var CONTACT_EMAIL = 'info@esensible.ca';
  window.__siteReady = true;

  // Sticky nav border once the page scrolls
  var nav = document.querySelector('.nav');
  function onScroll() { nav.classList.toggle('is-scrolled', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  var toggle = document.querySelector('.nav__toggle');
  var links = document.getElementById('nav-links');
  function setMenu(open) {
    links.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () { setMenu(!links.classList.contains('is-open')); });
  links.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  // Reveal on scroll, plus active nav link
  if ('IntersectionObserver' in window) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el, i) {
      // Stagger siblings inside grids a little
      var idx = Array.prototype.indexOf.call(el.parentElement.children, el);
      el.style.transitionDelay = Math.min(idx, 5) * 70 + 'ms';
      revealIO.observe(el);
    });

    var navLinks = document.querySelectorAll('.nav__links a[href^="#"]:not(.btn)');
    var sectionIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { sectionIO.observe(s); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Cursor-following glow on service cards
  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // "Ask about training" pre-selects the topic in the form
  var form = document.getElementById('contact-form');
  document.querySelectorAll('[data-topic]').forEach(function (el) {
    el.addEventListener('click', function () { form.elements.topic.value = el.getAttribute('data-topic'); });
  });

  // Contact form: validate inline, then open the visitor's mail client addressed to Esensible.
  // Swap this for a form backend (Formspree, Netlify Forms, your own API) when one is available.
  var status = form.querySelector('.form__status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements;
    var invalid = [];
    [f.name, f.email, f.message].forEach(function (input) {
      var ok = input.value.trim() !== '' && (input.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()));
      input.closest('.field').classList.toggle('is-invalid', !ok);
      if (!ok) invalid.push(input);
    });

    if (invalid.length) {
      status.textContent = 'Please add your name, a valid email and a short message.';
      status.className = 'form__status is-error';
      invalid[0].focus();
      return;
    }

    var subject = 'Website enquiry: ' + f.topic.value + ' (' + f.name.value.trim() + ')';
    var body = [
      'Name: ' + f.name.value.trim(),
      'Email: ' + f.email.value.trim(),
      'Company: ' + (f.company.value.trim() || '-'),
      'Interested in: ' + f.topic.value,
      '',
      f.message.value.trim()
    ].join('\n');

    window.location.href = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    status.textContent = 'Opening your email app. If nothing happens, write to ' + CONTACT_EMAIL + '.';
    status.className = 'form__status is-ok';
  });

  form.addEventListener('input', function (e) {
    var field = e.target.closest('.field');
    if (field) field.classList.remove('is-invalid');
  });

  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
