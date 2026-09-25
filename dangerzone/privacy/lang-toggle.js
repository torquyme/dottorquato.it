(function () {
  var btnEn = document.getElementById('btn-en');
  var btnIt = document.getElementById('btn-it');
  var en = document.getElementById('policy-en');
  var it = document.getElementById('policy-it');

  function show(lang) {
    var showEn = lang === 'en';
    en.hidden = !showEn;
    it.hidden = showEn;
    btnEn.setAttribute('aria-pressed', String(showEn));
    btnIt.setAttribute('aria-pressed', String(!showEn));
    document.documentElement.lang = lang;
  }

  btnEn.addEventListener('click', function () { show('en'); });
  btnIt.addEventListener('click', function () { show('it'); });
})();
