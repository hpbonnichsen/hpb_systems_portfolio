/* HPB_SYSTEMS — al interaktivitet på siden. Ingen afhængigheder. */

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Årstal i footer ────────────────────────────────────────────────── */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ── Boot-sekvens i profilkortet ────────────────────────────────────── */
  /* Rent dekorativ. Linjerne findes også som rigtig tekst i kortet nedenunder,
     så hverken skærmlæsere, søgemaskiner eller brugere uden JS mister noget. */
  var BOOT_LINES = [
    "> init candidate",
    "> loading profile ...",
    "",
    "NAME     Hans-Peter Bonnichsen",
    "BASE     København N",
    "EDU      Cand.mag. tysk + film- og medievidenskab",
    "         Master i informatik, undervejs",
    "WORK     12 år undervisning",
    "         AI-adoption, workshops, medieproduktion",
    "STATUS   ledig fra nu",
    "",
    "> profile loaded"
  ];

  var terminal = document.querySelector("[data-terminal]");
  var profileCard = document.querySelector(".card--profile");

  var seenBoot = false;
  try { seenBoot = sessionStorage.getItem("hpb-boot") === "1"; } catch (err) { seenBoot = true; }

  if (terminal && profileCard && !reduced && !seenBoot) {
    var out = terminal.querySelector(".terminal__out");
    var lineIndex = 0;
    var charIndex = 0;

    profileCard.classList.add("is-booting");

    var typeStep = function () {
      if (lineIndex >= BOOT_LINES.length) {
        /* Markøren slukkes først, så linjen står stille et øjeblik. Derefter
           krydsfader de to lag over i hinanden. */
        profileCard.classList.add("is-resolved");
        try { sessionStorage.setItem("hpb-boot", "1"); } catch (err) { /* privat tilstand */ }
        setTimeout(function () {
          profileCard.classList.remove("is-booting", "is-resolved");
        }, 450);
        return;
      }

      var line = BOOT_LINES[lineIndex];

      if (charIndex < line.length) {
        out.textContent += line.charAt(charIndex);
        charIndex += 1;
        setTimeout(typeStep, 9);
        return;
      }

      out.textContent += "\n";
      lineIndex += 1;
      charIndex = 0;
      setTimeout(typeStep, line === "" ? 40 : 70);
    };

    setTimeout(typeStep, 250);
  }

  /* ── Kort glider ind når de kommer i syne ───────────────────────────── */
  var items = document.querySelectorAll("[data-reveal]");

  if (reduced || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // let forskudt indtoning, så rækken ikke rammer på én gang
        setTimeout(function () { el.classList.add("is-visible"); }, i * 60);
        revealer.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    items.forEach(function (el) { revealer.observe(el); });
  }

  /* ── Nøgletal tæller op, første gang de ses ─────────────────────────── */
  var counters = document.querySelectorAll("[data-count]");

  var setValue = function (el, value) {
    el.textContent = value + (el.dataset.suffix || "");
  };

  if (reduced || !("IntersectionObserver" in window)) {
    counters.forEach(function (el) { setValue(el, Number(el.dataset.count)); });
  } else {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        counterObserver.unobserve(el);

        var target = Number(el.dataset.count);
        var duration = 900;
        var start = performance.now();

        var step = function (now) {
          var t = Math.min((now - start) / duration, 1);
          var eased = 1 - Math.pow(1 - t, 3); // ease-out-cubic
          setValue(el, Math.round(target * eased));
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { counterObserver.observe(el); });
  }
})();
