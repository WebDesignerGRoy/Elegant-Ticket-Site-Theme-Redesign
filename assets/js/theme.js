/* Open Tickets theme — lightweight vanilla JS */
(function () {
  // Shrinking fixed nav
  var nav = document.querySelector(".ot-nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("is-shrunk", window.scrollY > 40); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    var burger = nav.querySelector(".ot-burger");
    if (burger) burger.addEventListener("click", function () { nav.classList.toggle("is-open"); });
  }

  // Hero thumbnails sync with Bootstrap carousel
  var hero = document.getElementById("otHero");
  if (hero && window.bootstrap) {
    var carousel = bootstrap.Carousel.getOrCreateInstance(hero);
    var thumbs = document.querySelectorAll(".ot-hero-thumbs button");
    thumbs.forEach(function (b, i) { b.addEventListener("click", function () { carousel.to(i); }); });
    hero.addEventListener("slid.bs.carousel", function (e) {
      thumbs.forEach(function (b, i) { b.classList.toggle("active", i === e.to); });
    });
  }

  // Isotope — same initialisation & filter behaviour as the live site
  var grid = document.querySelector(".ot-grid");
  if (grid && window.Isotope) {
    var iso = new Isotope(grid, { itemSelector: ".grid-item", layoutMode: "fitRows" });
    if (window.imagesLoaded) imagesLoaded(grid).on("progress", function () { iso.layout(); });
    var group = document.querySelector(".ot-filters");
    if (group) group.addEventListener("click", function (e) {
      var btn = e.target.closest("button"); if (!btn) return;
      iso.arrange({ filter: btn.getAttribute("data-filter") });
      group.querySelectorAll(".is-checked").forEach(function (b) { b.classList.remove("is-checked"); });
      btn.classList.add("is-checked");
    });
  }

  // Ticket quantity selectors (event detail)
  var rows = document.querySelectorAll("[data-price]");
  var totalEl = document.getElementById("otTotal");
  function recalc() {
    var t = 0;
    rows.forEach(function (r) { t += +r.dataset.price * +r.querySelector(".ot-qty span").textContent; });
    if (totalEl) totalEl.textContent = "R " + t.toFixed(2);
  }
  rows.forEach(function (r) {
    var out = r.querySelector(".ot-qty span");
    r.querySelectorAll(".ot-qty button").forEach(function (b) {
      b.addEventListener("click", function () {
        out.textContent = Math.max(0, Math.min(10, +out.textContent + (+b.dataset.step)));
        recalc();
      });
    });
  });
})();
