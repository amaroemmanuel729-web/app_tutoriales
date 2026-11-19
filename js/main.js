/* Tutorial Desarrollo Móvil - JavaScript compartido */
(function () {
  'use strict';

  // ---------- Tema claro/oscuro ----------
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem('theme');
    if (saved) root.setAttribute('data-theme', saved);
  } catch (e) { /* almacenamiento no disponible */ }

  var themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // ---------- Menú lateral móvil ----------
  var menuBtn = document.getElementById('menuBtn');
  var sidebar = document.getElementById('sidebar');
  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', function () { sidebar.classList.toggle('open'); });
    sidebar.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') sidebar.classList.remove('open');
    });
  }

  // ---------- Botones "Copiar" en bloques de código ----------
  document.querySelectorAll('.code-wrap').forEach(function (wrap) {
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.textContent = 'Copiar';
    btn.addEventListener('click', function () {
      var text = wrap.querySelector('code').innerText;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = '¡Copiado!';
          setTimeout(function () { btn.textContent = 'Copiar'; }, 1500);
        });
      }
    });
    wrap.appendChild(btn);
  });

  // ---------- Pestañas ----------
  document.querySelectorAll('.tabs').forEach(function (tabs) {
    var group = tabs.parentElement;
    var buttons = tabs.querySelectorAll('.tab-btn');
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        buttons.forEach(function (x) { x.classList.remove('active'); });
        group.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
        b.classList.add('active');
        var panel = group.querySelector('#' + b.dataset.target);
        if (panel) panel.classList.add('active');
      });
    });
  });

  // ---------- Quiz de autoevaluación ----------
  document.querySelectorAll('.quiz .q').forEach(function (q) {
    var correct = q.dataset.correct;
    var fb = q.querySelector('.fb');
    q.querySelectorAll('button.opt').forEach(function (opt) {
      opt.addEventListener('click', function () {
        q.querySelectorAll('button.opt').forEach(function (o) { o.classList.remove('ok', 'bad'); });
        var good = opt.dataset.v === correct;
        opt.classList.add(good ? 'ok' : 'bad');
        if (fb) fb.textContent = good ? '¡Correcto!' : 'Inténtalo de nuevo.';
      });
    });
  });

  // ---------- Botón volver arriba ----------
  var toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', function () {
      toTop.style.display = window.scrollY > 400 ? 'block' : 'none';
    });
    toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  // ---------- Buscador de la página de inicio ----------
  var search = document.getElementById('search');
  if (search) {
    search.addEventListener('input', function () {
      var term = search.value.toLowerCase();
      document.querySelectorAll('.topic-card').forEach(function (c) {
        c.style.display = c.textContent.toLowerCase().indexOf(term) > -1 ? '' : 'none';
      });
    });
  }
})();
