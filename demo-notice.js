// Demo notice (top bar sync + first-visit dialog) for sub-pages
(function () {
  var KEY = 'demoNoticeSeen';
  var bar = document.getElementById('demoBar');
  function sync() {
    if (bar) document.documentElement.style.setProperty('--demo-h', bar.offsetHeight + 'px');
  }
  if (bar) {
    sync();
    window.addEventListener('resize', sync);
    if (window.ResizeObserver) new ResizeObserver(sync).observe(bar);
  }
  var modal = document.getElementById('demoModal');
  if (!modal) return;
  var okBtn = document.getElementById('demoOk');
  var lastFocus = null;
  function seen() { try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function mark() { try { sessionStorage.setItem(KEY, '1'); } catch (e) {} }
  function openModal() {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    okBtn.focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    mark();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  okBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key === 'Tab') {
      var items = modal.querySelectorAll('a[href], button');
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  var openers = document.querySelectorAll('[data-demo-open]');
  for (var i = 0; i < openers.length; i++) {
    openers[i].addEventListener('click', function (e) { e.preventDefault(); openModal(); });
  }
  if (!seen()) openModal();
})();
