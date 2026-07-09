/* ============================================================
   SONGRE — Frontend JavaScript
   Features: Navbar scroll, mobile menu, FAQ accordion,
             scroll reveal, count-up animation, contact form
   ============================================================ */

(function() {
  'use strict';

  // ── DOM Ready ─────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initScrollReveal();
    initFAQ();
    initCountUp();
    initContactForm();
    initSmoothScroll();
  });

  // ── Navbar ────────────────────────────────────────────────
  function initNavbar() {
    var navbar = document.getElementById('navbar');
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');
    if (!navbar) return;

    var lastScroll = 0;
    window.addEventListener('scroll', function() {
      var current = window.scrollY;
      if (current > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastScroll = current;
    }, { passive: true });

    if (toggle && menu) {
      toggle.addEventListener('click', function() {
        var isOpen = menu.classList.contains('open');
        menu.classList.toggle('open');
        toggle.classList.toggle('open');
        toggle.setAttribute('aria-expanded', !isOpen);
        document.body.style.overflow = isOpen ? '' : 'hidden';
      });

      document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && menu.classList.contains('open')) {
          menu.classList.remove('open');
          toggle.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });

      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu.classList.contains('open')) {
          menu.classList.remove('open');
          toggle.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    }
  }

  // ── Scroll Reveal ─────────────────────────────────────────
  function initScrollReveal() {
    if (!window.IntersectionObserver) return;
    var elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(function(el) { observer.observe(el); });
  }

  // ── FAQ Accordion ─────────────────────────────────────────
  function initFAQ() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(function(item) {
      var btn = item.querySelector('.faq-question');
      if (!btn) return;
      btn.addEventListener('click', function() {
        var isOpen = item.classList.contains('open');
        items.forEach(function(i) { i.classList.remove('open'); });
        if (!isOpen) item.classList.add('open');
      });
    });

    var catBtns = document.querySelectorAll('.faq-cat-btn');
    var groups = document.querySelectorAll('.faq-group');
    if (!catBtns.length) return;

    catBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        catBtns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.dataset.cat;
        groups.forEach(function(g) {
          if (cat === 'all' || g.dataset.cat === cat) {
            g.style.display = '';
          } else {
            g.style.display = 'none';
          }
        });
      });
    });
  }

  // ── Count-Up Animation ────────────────────────────────────
  function initCountUp() {
    if (!window.IntersectionObserver) return;
    var counters = document.querySelectorAll('.count-up');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(el) { observer.observe(el); });
  }

  function animateCounter(el) {
    var target = parseInt(el.dataset.target || el.textContent.replace(/\D/g, ''), 10);
    var duration = 2000;
    var startTime = null;
    var suffix = el.dataset.suffix || '';

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(ease * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ── Contact Form ──────────────────────────────────────────
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var alertSuccess = document.getElementById('alertSuccess');
    var alertError = document.getElementById('alertError');
    var submitBtn = form.querySelector('[type="submit"]');

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!validateForm(form)) return;

      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      }

      // ── Conversion FormData → objet JSON ────────────────────
      // Important : Vercel ne parse PAS automatiquement le body
      // en multipart/form-data (ce que produit un fetch() avec
      // un FormData brut). On envoie donc du JSON, que Vercel
      // sait parser nativement.
      var formData = new FormData(form);
      var payload = {};
      formData.forEach(function(value, key) {
        payload[key] = value;
      });

      var action = form.action || form.dataset.action;

      fetch(action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(function(res) {
        if (res.ok) {
          showAlert(alertSuccess, alertError);
          form.reset();
        } else {
          throw new Error('Server error');
        }
      })
      .catch(function() {
        showAlert(alertError, alertSuccess);
      })
      .finally(function() {
        if (submitBtn) {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }
      });
    });

    form.querySelectorAll('.form-control').forEach(function(input) {
      input.addEventListener('blur', function() { validateField(input); });
      input.addEventListener('input', function() {
        if (input.classList.contains('invalid')) validateField(input);
      });
    });
  }

  function validateForm(form) {
    var valid = true;
    form.querySelectorAll('.form-control[required]').forEach(function(input) {
      if (!validateField(input)) valid = false;
    });
    return valid;
  }

  function validateField(input) {
    var val = input.value.trim();
    var isValid = true;

    if (input.required && !val) {
      isValid = false;
    } else if (input.type === 'email' && val) {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    }

    if (isValid) {
      input.classList.remove('invalid');
      input.style.borderColor = '';
    } else {
      input.classList.add('invalid');
      input.style.borderColor = '#C81E3A';
    }
    return isValid;
  }

  function showAlert(show, hide) {
    if (show) { show.classList.add('show'); }
    if (hide) { hide.classList.remove('show'); }
    setTimeout(function() {
      if (show) show.classList.remove('show');
    }, 6000);
  }

  // ── Smooth Scroll ─────────────────────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
      a.addEventListener('click', function(e) {
        var href = a.getAttribute('href');
        if (href.length <= 1) return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

})();
