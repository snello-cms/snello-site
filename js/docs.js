(function () {
  var docsPages = [
    { href: 'documentation-metadata.html', title: 'Metadata' },
    { href: 'documentation-field-definitions.html', title: 'Field Definitions' },
    { href: 'documentation-select-query.html', title: 'Select Query' },
    { href: 'documentation-document-management.html', title: 'Document Management' },
    { href: 'documentation-rest-query-params.html', title: 'REST Query Params' },
    { href: 'documentation-ai-agent.html', title: 'AI Agent' },
    { href: 'documentation-ai-tools-schema.html', title: 'AI Tools Schema' },
    { href: 'documentation-ai-tooling.html', title: 'AI Dynamic Tooling' },
    { href: 'documentation-ai-security-streaming.html', title: 'AI Security and Streaming' },
    { href: 'documentation-db-guide.html', title: 'Database Notes' },
    { href: 'documentation-logs-guide.html', title: 'Logs Notes' }
  ];

  function basename(path) {
    return path.split('/').pop() || path;
  }

  function makeBreadcrumb() {
    var main = document.querySelector('main');
    if (!main) return;

    var current = basename(window.location.pathname);
    var currentItem = docsPages.find(function (p) { return p.href === current; });
    var title = currentItem ? currentItem.title : 'Documentation';

    var wrap = document.createElement('div');
    wrap.className = 'container docs-breadcrumb';
    wrap.innerHTML = '<a href="index.html">Home</a><span>/</span><a href="documentation.html">Documentation</a><span>/</span><strong>' + title + '</strong>';

    main.insertBefore(wrap, main.firstChild);
  }

  function enhanceSidebar() {
    var nav = document.querySelector('.docs-nav');
    if (!nav) return;

    var current = basename(window.location.pathname);
    var linksHtml = docsPages.map(function (p) {
      var active = p.href === current ? ' class="is-active"' : '';
      return '<a' + active + ' href="' + p.href + '">' + p.title + '</a>';
    }).join('');

    nav.innerHTML = [
      '<p>Documentation Pages</p>',
      '<div class="docs-search">',
      '<input id="docsSearchInput" type="search" placeholder="Search documentation..." aria-label="Search documentation">',
      '</div>',
      '<div class="docs-links">' + linksHtml + '</div>'
    ].join('');

    var input = document.getElementById('docsSearchInput');
    var links = Array.prototype.slice.call(nav.querySelectorAll('.docs-links a'));

    if (!input) return;

    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      links.forEach(function (a) {
        var hit = a.textContent.toLowerCase().indexOf(q) !== -1;
        a.style.display = hit ? '' : 'none';
      });
    });
  }

  function enhanceHubSearch() {
    if (basename(window.location.pathname) !== 'documentation.html') return;

    var heading = document.querySelector('.section--docs-hub .section__heading');
    var cards = Array.prototype.slice.call(document.querySelectorAll('.docs-card'));
    if (!heading || !cards.length) return;

    var search = document.createElement('div');
    search.className = 'docs-hub-search';
    search.innerHTML = '<input id="docsHubSearchInput" type="search" placeholder="Search guides, APIs, AI topics..." aria-label="Search guides">';
    heading.appendChild(search);

    var input = document.getElementById('docsHubSearchInput');
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      cards.forEach(function (card) {
        var text = card.textContent.toLowerCase();
        card.style.display = text.indexOf(q) !== -1 ? '' : 'none';
      });
    });
  }

  makeBreadcrumb();
  enhanceSidebar();
  enhanceHubSearch();
})();
