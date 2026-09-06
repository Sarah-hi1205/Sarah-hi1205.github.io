/* 案例导航栏：从 cases/index.json 动态渲染，新增访谈无需改动历史页面 */
(function () {
  var nav = document.getElementById('caseNav');
  if (!nav) return;
  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  fetch('index.json').then(function (r) { return r.json(); }).then(function (idx) {
    var cur = nav.getAttribute('data-current');
    var html = '';
    idx.cases.forEach(function (c) {
      if (c.file === cur) html += '<span class="nav-link current">' + esc(c.name) + '</span>';
      else html += '<a class="nav-link" href="' + encodeURI(c.file) + '">' + esc(c.name) + '</a>';
    });
    nav.innerHTML = html;
  }).catch(function () { nav.innerHTML = ''; });
})();
