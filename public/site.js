(function () {
  var root = document.documentElement;
  var key = 'theme';
  function read() { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(key, v); } catch (e) {} }

  var saved = read();
  var theme = saved === 'light' || saved === 'dark'
    ? saved
    : (window.matchMedia && matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  root.setAttribute('data-theme', theme);

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('theme');
    if (!btn) return;
    btn.setAttribute('aria-pressed', theme === 'light');
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      btn.setAttribute('aria-pressed', next === 'light');
      write(next);
    });
  });
})();

// "Descargar CV": the page itself is the CV. The print stylesheet in style.css
// turns it into a clean document; the title becomes the default PDF file name.
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('cv');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var original = document.title;
    document.title = btn.getAttribute('data-filename') || original;
    window.addEventListener('afterprint', function restore() {
      document.title = original;
      window.removeEventListener('afterprint', restore);
    });
    window.print();
  });
});
