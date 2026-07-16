/*
 * Shared site chrome for DAMASK Workflows.
 * One source of truth for the header, footer, use-case cards, the subpage CTA
 * band and the image lightbox. Injected into placeholder elements so the same
 * markup is not copy-pasted across pages.
 *
 * Per-page setup: set `window.SITE_BASE` before this script runs.
 *   ""    on the root index.html
 *   "../" on pages inside /pages
 *
 * Placeholders:
 *   <div data-include="header"></div>
 *   <div data-include="footer"></div>
 *   <div data-include="cta"></div>                         (subpage CTA band)
 *   <div class="uc-grid" data-cards="full"></div>          (landing cards)
 *   <div class="uc-grid" data-cards="compact"
 *        data-exclude="coupled-multiphysics"></div>        (related cards)
 */
(function () {
  var base = window.SITE_BASE || "";
  var anchor = function (hash) { return base ? base + "index.html" + hash : hash; };
  var asset = function (file) { return base + "assets/" + file; };
  var pageHref = function (slug) { return base ? slug + ".html" : "pages/" + slug + ".html"; };

  // ---------------------------------------------------------------------------
  // Shared copy. Single place to edit any label that appears on more than one
  // page. In HTML, drop it in with <... data-text="key"></...>. Values may
  // contain HTML entities (they are set via innerHTML).
  // ---------------------------------------------------------------------------
  var LABELS = {
    brand: "DAMASK Workflows",
    tagline: "Customized simulation pipelines for advanced materials teams.",
    scheduleCta: "Schedule a Consultation",
    navUseCases: "Use Cases", // header nav link (kept short)
    sectionUseCases: "Example Use Cases", // landing section + subpage breadcrumb
    useCaseKicker: "Example Use Case", // subpage hero kicker
    ctaHeading: "Bring us a materials challenge",
    ctaBody:
      "Tell us your material system, loading path, and available data. We&rsquo;ll identify where a custom DAMASK workflow could turn this use case into a result you can rely on.",
  };

  var NAV = [
    ["#capabilities", "Capabilities"],
    ["#services", "Services"],
    ["#use-cases", LABELS.navUseCases],
    ["#process", "Process"],
    ["#expertise", "Expertise"],
    ["#contact", "Contact"],
  ];

  var USE_CASES = [
    {
      slug: "micromechanics",
      kicker: "Micromechanics",
      title: "Deformation &amp; local fields",
      thumb: "thumb-micromechanics.jpg",
      alt: "Bainitic microstructure with resolved local fields.",
      desc: "EBSD-informed stress and strain fields that show how load partitions and where deformation localizes &mdash; down to complex packet structures.",
    },
    {
      slug: "texture-evolution",
      kicker: "Process studies",
      title: "Texture &amp; forming routes",
      thumb: "thumb-texture.jpg",
      alt: "Crystallographic texture bands after heavy rolling reduction.",
      desc: "Texture evolution followed across the full rolling and forming route &mdash; comparing routes and pinpointing the process window worth an experiment.",
    },
    {
      slug: "coupled-multiphysics",
      kicker: "Coupled physics",
      title: "Degradation &amp; fracture",
      thumb: "thumb-coupled.jpg",
      alt: "Stress field around a crack tip with a sharp stress concentration.",
      desc: "Hydrogen-assisted fracture and related degradation studied as coupled problems, so mechanics and chemistry inform the same interpretation.",
    },
    {
      slug: "damage-modeling",
      kicker: "Virtual testing",
      title: "Damage-sensitive cases",
      thumb: "thumb-damage.jpg",
      alt: "3D representative volume showing distributed damage indicators.",
      desc: "Damage workflows built up from benchmark validation to realistic microstructures and loading paths that approach component-relevant conditions.",
    },
  ];

  var ARROW =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>';

  function header() {
    var links = NAV.map(function (n) {
      return '<a class="transition hover:text-tealDark" href="' + anchor(n[0]) + '">' + n[1] + "</a>";
    }).join("");
    return (
      '<header class="sticky top-0 z-50 border-b border-line/80 bg-white/92 backdrop-blur">' +
      '<nav class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10" aria-label="Main navigation">' +
      '<a href="' + anchor("#top") + '" class="flex items-center gap-3" aria-label="DAMASK Workflows home">' +
      '<span class="grid h-9 w-9 place-items-center rounded border border-teal/25 bg-teal/10 text-sm font-semibold text-tealDark">DW</span>' +
      '<span class="text-sm font-semibold text-graphite sm:text-base">' + LABELS.brand + "</span>" +
      "</a>" +
      '<div class="hidden items-center gap-8 text-sm font-medium text-muted md:flex">' + links + "</div>" +
      '<a href="' + anchor("#contact") + '" class="hidden rounded border border-teal bg-teal px-4 py-2 text-sm font-semibold text-white transition hover:bg-tealDark sm:inline-flex">' + LABELS.scheduleCta + "</a>" +
      "</nav></header>"
    );
  }

  function footer() {
    return (
      '<footer class="border-t border-line py-8">' +
      '<div class="mx-auto flex max-w-7xl flex-col gap-3 px-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">' +
      "<p>" + LABELS.brand + "</p>" +
      "<p>" + LABELS.tagline + "</p>" +
      "</div></footer>"
    );
  }

  function cta() {
    return (
      '<section class="py-14 sm:py-16"><div class="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">' +
      '<div class="grid gap-8 rounded-lg border border-line bg-graphite p-8 text-white sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">' +
      "<div>" +
      '<h2 class="text-2xl font-semibold leading-tight sm:text-3xl">' + LABELS.ctaHeading + "</h2>" +
      '<p class="mt-4 max-w-2xl text-base leading-7 text-white/76">' + LABELS.ctaBody + "</p>" +
      "</div>" +
      '<a href="' + anchor("#contact") + '" class="inline-flex w-full items-center justify-center rounded border border-teal bg-teal px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-tealDark sm:w-auto">' + LABELS.scheduleCta + "</a>" +
      "</div></div></section>"
    );
  }

  function card(uc, variant) {
    var body =
      '<p class="uc-card__kicker">' + uc.kicker + "</p>" +
      '<h3 class="uc-card__title">' + uc.title + "</h3>" +
      (variant === "full" ? '<p class="uc-card__text">' + uc.desc + "</p>" : "") +
      '<span class="uc-card__more">Explore ' + ARROW + "</span>";
    return (
      '<a class="uc-card" href="' + pageHref(uc.slug) + '">' +
      '<div class="uc-card__media"><img src="' + asset(uc.thumb) + '" alt="' + uc.alt + '" loading="lazy" /></div>' +
      '<div class="uc-card__body">' + body + "</div></a>"
    );
  }

  function setupLightbox() {
    var zooms = document.querySelectorAll("[data-zoom-src]");
    if (!zooms.length) return;
    var lb = document.createElement("div");
    lb.className = "uc-lightbox";
    lb.hidden = true;
    lb.setAttribute("aria-hidden", "true");
    lb.innerHTML = '<button type="button" class="uc-lightbox__close" aria-label="Close">&times;</button><img alt="" />';
    document.body.appendChild(lb);
    var img = lb.querySelector("img");
    var open = function (src, alt) {
      img.src = src;
      img.alt = alt || "";
      lb.hidden = false;
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };
    var close = function () {
      lb.hidden = true;
      lb.setAttribute("aria-hidden", "true");
      img.src = "";
      document.body.style.overflow = "";
    };
    zooms.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var inner = btn.querySelector("img");
        open(btn.dataset.zoomSrc, inner ? inner.alt : "");
      });
    });
    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target.closest(".uc-lightbox__close")) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lb.hidden) close();
    });
  }

  function inject() {
    document.querySelectorAll('[data-include="header"]').forEach(function (el) { el.outerHTML = header(); });
    document.querySelectorAll('[data-include="footer"]').forEach(function (el) { el.outerHTML = footer(); });
    document.querySelectorAll('[data-include="cta"]').forEach(function (el) { el.outerHTML = cta(); });
    document.querySelectorAll("[data-cards]").forEach(function (el) {
      var variant = el.getAttribute("data-cards");
      var exclude = (el.getAttribute("data-exclude") || "").split(",").map(function (s) { return s.trim(); });
      el.innerHTML = USE_CASES.filter(function (u) { return exclude.indexOf(u.slug) === -1; })
        .map(function (u) { return card(u, variant); })
        .join("");
    });
    // Shared inline labels: <... data-text="key"></...> filled from LABELS.
    document.querySelectorAll("[data-text]").forEach(function (el) {
      var key = el.getAttribute("data-text");
      if (LABELS[key] != null) el.innerHTML = LABELS[key];
    });
    setupLightbox();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", inject);
  else inject();
})();
