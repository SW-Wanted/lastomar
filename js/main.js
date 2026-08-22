/* ==========================================================================
   LASTOMAR BUSINESS CORPORATION — main.js
   Vanilla JS, no dependencies.
   ========================================================================== */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     1. NAVBAR — solid state on scroll
     ------------------------------------------------------------------------ */
  var navbar = document.getElementById('navbar');
  var SCROLL_THRESHOLD = 24;

  function updateNavbarState() {
    if (!navbar) return;
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }

  updateNavbarState();
  window.addEventListener('scroll', updateNavbarState, { passive: true });

  /* ------------------------------------------------------------------------
     2. MOBILE DRAWER
     ------------------------------------------------------------------------ */
  var menuToggle = document.getElementById('menuToggle');
  var drawer = document.getElementById('mobileDrawer');
  var closeTriggers = document.querySelectorAll('[data-close-drawer]');
  var lastFocusedEl = null;

  function openDrawer() {
    if (!drawer) return;
    lastFocusedEl = document.activeElement;
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    menuToggle.setAttribute('aria-expanded', 'true');
    var firstLink = drawer.querySelector('.mobile-drawer__link');
    if (firstLink) firstLink.focus();
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
    menuToggle.setAttribute('aria-expanded', 'false');
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      var isOpen = drawer.classList.contains('is-open');
      if (isOpen) { closeDrawer(); } else { openDrawer(); }
    });
  }

  closeTriggers.forEach(function (el) {
    el.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  /* Close mobile drawer automatically after clicking an anchor link inside it */
  var drawerLinks = document.querySelectorAll('.mobile-drawer__link');
  drawerLinks.forEach(function (link) {
    link.addEventListener('click', closeDrawer);
  });

  /* ------------------------------------------------------------------------
     3. SERVICE ACCORDIONS (Áreas de Atuação)
     ------------------------------------------------------------------------ */
  var serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(function (card) {
    var head = card.querySelector('[data-toggle]');
    var toggleBtn = card.querySelector('.service-card__toggle');

    function toggleCard() {
      var isOpen = card.getAttribute('data-open') === 'true';
      card.setAttribute('data-open', String(!isOpen));
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', String(!isOpen));
    }

    /* The real <button> inside the head already provides native keyboard
       support (Enter/Space fire a click event that bubbles up to this
       listener), so only one handler is needed for both mouse and
       keyboard users — no extra tabindex/role on the wrapping div. */
    if (head) {
      head.addEventListener('click', toggleCard);
    }
  });

  /* ------------------------------------------------------------------------
     4. SCROLL REVEAL
     ------------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll('[data-reveal]');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ------------------------------------------------------------------------
     5. SMOOTH ANCHOR SCROLL (fallback for browsers without CSS support,
        and keeps focus management accessible for keyboard users)
     ------------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      var targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      targetEl.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });

      /* Move focus for keyboard/screen-reader users once scroll settles */
      window.setTimeout(function () {
        targetEl.setAttribute('tabindex', '-1');
        targetEl.focus({ preventScroll: true });
      }, prefersReducedMotion ? 0 : 500);
    });
  });

})();
