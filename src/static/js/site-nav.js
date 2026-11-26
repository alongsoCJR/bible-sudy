/**
 * 全站统一顶部导航：各页结构、文案、顺序保持一致。
 * 用法：页面引入 style.css 后放置 <div id="site-nav"></div>，再引入本脚本。
 * 也可不放挂载点，脚本会自动插到 body 最前。
 */
(function () {
  var path = (location.pathname || "").replace(/\\/g, "/");
  var inStatic = /\/static(?:\/|$)/.test(path);
  var file = (path.split("/").pop() || "").toLowerCase();
  var root = inStatic ? "../" : "";
  var st = inStatic ? "" : "static/";

  var items = [
    { id: "home", label: "首页", href: root + "index.html" },
    { id: "about", label: "关于我们", href: root + "index.html#about" },
    { id: "game", label: "启示录闯关", href: st + "revelation-game.html" },
    { id: "notes", label: "读者笔记", href: st + "notes.html" },
    { id: "audio", label: "有声频道", href: st + "audio-stories.html" },
    { id: "bible", label: "读圣经", href: st + "bible-online.html" },
    { id: "join", label: "加入我们", href: st + "join-us.html" }
  ];

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
    '<a href="' + root + 'index.html" class="nav-logo">' +
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
