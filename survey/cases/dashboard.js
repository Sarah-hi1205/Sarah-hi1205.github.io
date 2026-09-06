/* 看板卡片列表：从 cases/index.json 动态渲染，并自动更新顶部统计 */
(function () {
  var list = document.getElementById('caseList');
  if (!list) return;
  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  fetch('cases/index.json').then(function (r) { return r.json(); }).then(function (idx) {
    var cases = idx.cases || [];
    var nums = document.querySelectorAll('.stat-num');
    if (nums.length >= 2) { nums[0].textContent = cases.length; nums[1].textContent = cases.length; }
    if (nums.length >= 3) {
      var langs = {};
      cases.forEach(function (c) { if (c.lang) langs[c.lang] = 1; });
      nums[2].textContent = Object.keys(langs).length;
    }
    var html = '';
    cases.forEach(function (c) {
      var tags = '';
      if (c.lang) tags += '<span class="tag tag-lang">' + esc(c.lang) + '</span>';
      tags += '<span class="tag tag-done">✅ 完成</span>';
      (c.tags || []).forEach(function (t) { tags += '<span class="tag tag-style">' + esc(t) + '</span>'; });
      html += '<a class="card" href="cases/' + encodeURI(c.file) + '">'
        + '<div class="card-top"><div class="card-name">' + esc(c.name) + '</div>'
        + '<div class="card-date">' + esc(c.date) + '</div></div>'
        + (c.meta ? '<div class="card-meta">' + esc(c.meta) + '</div>' : '')
        + '<div class="tags">' + tags + '</div>'
        + (c.preview ? '<div class="card-preview">' + esc(c.preview) + '</div>' : '')
        + '<div class="card-cta">查看完整案例 →</div></a>';
    });
    list.innerHTML = html;
  }).catch(function (e) { list.innerHTML = '<p style="color:#8895a7">案例索引加载失败</p>'; });
})();
