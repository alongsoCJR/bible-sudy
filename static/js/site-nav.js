/**
 * 全站统一顶部导航。
 * 策略：仅「加入我们」走业务服务器；其余页面一律走 GitHub Pages。
 */
(function () {
  var GH_SITE = "https://alongsocjr.github.io/bible-sudy";
  var SERVER_JOIN = "http://42.194.137.245/static/join-us.html";

  var path = (location.pathname || "").replace(/\\/g, "/");
  var file = (path.split("/").pop() || "").toLowerCase();
  var host = location.hostname || "";
  var inStatic = /\/static(?:\/|$)/.test(path);

  function isServerHost(h) {
    return (
      h === "42.194.137.245" ||
      h === "bible-join.duckdns.org" ||
      h.endsWith(".sslip.io") ||
      h.endsWith(".nip.io") ||
      h.endsWith(".duckdns.org")
    );
  }

  var onServer = isServerHost(host);
  var onGh = host.endsWith("github.io");
  var isLocal = host === "localhost" || host === "127.0.0.1" || host === "" || location.protocol === "file:";

  var homeHref;
  var staticBase;
  var joinHref;

  if (onServer) {
    // 报名页在服务器：其他入口全部回 GitHub Pages
    homeHref = GH_SITE + "/";
    staticBase = GH_SITE + "/static/";
    joinHref = "/static/join-us.html";
  } else if (onGh) {
    homeHref = GH_SITE + "/";
    staticBase = GH_SITE + "/static/";
    joinHref = SERVER_JOIN;
  } else {
    // 本地预览：站内相对路径，方便联调
    homeHref = inStatic ? "../index.html" : "index.html";
    staticBase = inStatic ? "" : "static/";
    joinHref = staticBase + "join-us.html";
  }

  var items = [
    { id: "home", label: "首页", href: homeHref },
    { id: "about", label: "关于我们", href: onServer || onGh ? GH_SITE + "/#about" : homeHref.replace(/index\.html$/, "") + (homeHref.indexOf("index.html") >= 0 ? "index.html#about" : "#about") },
    { id: "game", label: "启示录闯关", href: staticBase + "revelation-game.html" },
    { id: "notes", label: "读者笔记", href: staticBase + "notes.html" },
    { id: "audio", label: "有声频道", href: staticBase + "audio-stories.html" },
    { id: "bible", label: "读圣经", href: staticBase + "bible-online.html" },
    { id: "join", label: "加入我们", href: joinHref }
  ];

  if (isLocal) {
    items[1].href = inStatic ? "../index.html#about" : "index.html#about";
  }

  function activeId() {
    if (file === "notes.html") return "notes";
    if (file === "audio-stories.html") return "audio";
    if (file === "bible-online.html" || file === "reading-bible.html") return "bible";
    if (file === "revelation-game.html") return "game";
    if (file === "join-us.html") return "join";
    if (location.hash === "#about") return "about";
    if (!file || file === "index.html" || file === "") return "home";
    return "";
  }

  var current = activeId();
  var linksHtml = items
    .map(function (item) {
      var cls = item.id === current ? ' class="active"' : "";
      return "<li><a href=\"" + item.href + "\"" + cls + ">" + item.label + "</a></li>";
    })
    .join("");

  var html =
    '<nav class="navbar" id="navbar">' +
    '<a href="' + items[0].href + '" class="nav-logo">' +
    '<span class="logo-icon">✦</span><span>北京青年团契</span>' +
    "</a>" +
    '<ul class="nav-links" id="navLinks">' +
    linksHtml +
    "</ul>" +
    '<button class="nav-toggle" id="navToggle" aria-label="菜单">' +
    "<span></span><span></span><span></span>" +
    "</button>" +
    "</nav>";

  var mount = document.getElementById("site-nav");
  if (!mount) {
    mount = document.createElement("div");
    mount.id = "site-nav";
    document.body.insertBefore(mount, document.body.firstChild);
  }
  mount.innerHTML = html;
  document.body.classList.add("has-site-nav");
  if (
    document.body.getAttribute("data-nav-offset") === "1" ||
    document.documentElement.getAttribute("data-nav-offset") === "1"
  ) {
    document.body.classList.add("site-nav-offset");
  }

  var navbar = document.getElementById("navbar");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", function () {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 40);
  });

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("active");
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.classList.remove("active");
        navLinks.classList.remove("open");
      });
    });
  }
})();
