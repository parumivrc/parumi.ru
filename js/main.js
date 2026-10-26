/* =========================================================
   parumi.ru — логика сайта
   ---------------------------------------------------------
   1. Настройки
   2. Почта: ссылки и кнопка «Скопировать адрес»
   3. Кабели схемы: рисуются от каждого контакта к портрету
   4. Переключение языка (тексты — в translations.js)
   5. Запуск
   ========================================================= */

(function () {

  /* ---------- 1. Настройки ---------- */

  var EMAIL = 'killerkirz@yandex.ru';   // единственное место, где задаётся почта
  var STORAGE_KEY = 'parumi-lang';
  var t = TRANSLATIONS;
  var currentLang = 'ru';


  /* ---------- 2. Почта ---------- */

  function setupEmail() {
    document.querySelectorAll('.js-mail').forEach(function (link) {
      link.href = 'mailto:' + EMAIL;
    });
    document.querySelectorAll('.js-mail-text').forEach(function (el) {
      el.textContent = EMAIL;
    });

    var copyBtn = document.querySelector('.js-copy');
    if (!copyBtn) return;
    copyBtn.addEventListener('click', function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(EMAIL).then(function () {
        copyBtn.textContent = t.copied[currentLang];
        setTimeout(function () { copyBtn.textContent = t.copy[currentLang]; }, 2000);
      }, function () {});
    });
  }


  /* ---------- 3. Кабели схемы ---------- */

  var topo  = document.getElementById('topo');
  var svg   = document.getElementById('cables');
  var host  = document.querySelector('.host-frame');
  var nodes = Array.prototype.slice.call(document.querySelectorAll('.topo .node'));
  var firstDraw = true;

  // Строит ломаную линию «узел → середина → портрет» для каждого контакта
  function drawCables() {
    if (getComputedStyle(svg).display === 'none') return;   // на телефоне схемы нет

    var box = topo.getBoundingClientRect();
    var hostBox = host.getBoundingClientRect();
    var cx = hostBox.left + hostBox.width / 2 - box.left;
    var cy = hostBox.top + hostBox.height / 2 - box.top;
    var r  = hostBox.width / 2;

    svg.setAttribute('viewBox', '0 0 ' + box.width + ' ' + box.height);
    svg.innerHTML = '';
    var countBySide = { left: 0, right: 0 };

    nodes.forEach(function (node, index) {
      var nb = node.getBoundingClientRect();
      var isLeft = nb.left + nb.width / 2 < hostBox.left;
      var i = countBySide[isLeft ? 'left' : 'right']++;

      // Начало: край узла, ближний к портрету
      var x0 = (isLeft ? nb.right : nb.left) - box.left;
      var y0 = nb.top + nb.height / 2 - box.top;

      // Конец: точка на окружности портрета (кабели входят веером)
      var dy = (i - 1) * 22;
      var y1 = cy + dy;
      var x1 = cx + (isLeft ? -1 : 1) * Math.sqrt(Math.max(r * r - dy * dy, 0));

      // Вертикальный участок — между узлом и портретом
      var midX = x0 + (x1 - x0) * (0.45 + i * 0.12);

      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M' + x0 + ',' + y0 + ' H' + midX + ' V' + y1 + ' H' + x1);
      svg.appendChild(path);

      var len = path.getTotalLength();
      path.style.strokeDasharray = len;
      path.style.setProperty('--len', len);
      path.style.animationDelay = (index * 0.12) + 's';
      node._cable = path;
    });

    // Анимация прорисовки — только при первой отрисовке
    if (firstDraw) { svg.classList.add('draw'); firstDraw = false; }
    else { svg.querySelectorAll('path').forEach(function (p) { p.style.animation = 'none'; }); }
  }

  // Подсветка кабеля при наведении или фокусе на контакт
  function setupCableHighlight() {
    nodes.forEach(function (node) {
      ['mouseenter', 'focus'].forEach(function (ev) {
        node.addEventListener(ev, function () { if (node._cable) node._cable.classList.add('on'); });
      });
      ['mouseleave', 'blur'].forEach(function (ev) {
        node.addEventListener(ev, function () { if (node._cable) node._cable.classList.remove('on'); });
      });
    });
  }


  /* ---------- 4. Язык ---------- */

  function setLang(lang) {
    currentLang = (lang === 'en') ? 'en' : 'ru';
    document.documentElement.lang = currentLang;
    document.title = t.page_title[currentLang];

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var entry = t[el.getAttribute('data-i18n')];
      if (entry) el.innerHTML = entry[currentLang];
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var entry = t[el.getAttribute('data-i18n-alt')];
      if (entry) el.alt = entry[currentLang];
    });
    document.querySelectorAll('.lang button').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.dataset.lang === currentLang ? 'true' : 'false');
    });

    try { localStorage.setItem(STORAGE_KEY, currentLang); } catch (e) {}
    requestAnimationFrame(drawCables);   // длина текста поменялась — перерисовать кабели
  }

  function detectLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved) return saved;
    return (navigator.language || 'ru').toLowerCase().indexOf('ru') === 0 ? 'ru' : 'en';
  }

  function setupLangSwitch() {
    document.querySelectorAll('.lang button').forEach(function (btn) {
      btn.addEventListener('click', function () { setLang(btn.dataset.lang); });
    });
  }


  /* ---------- 5. Запуск ---------- */

  setupEmail();
  setupCableHighlight();
  setupLangSwitch();
  setLang(detectLang());
  document.querySelector('.js-year').textContent = new Date().getFullYear();

  window.addEventListener('resize', drawCables);
  if (document.fonts) document.fonts.ready.then(drawCables);   // после загрузки шрифта размеры меняются

})();
