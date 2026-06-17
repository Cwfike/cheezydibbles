(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scrollspy — highlight the nav link for the section in view
  const navMap = new Map();
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(a => {
    const sec = document.getElementById(a.getAttribute("href").slice(1));
    if (sec) navMap.set(sec, a);
  });

  if (navMap.size && "IntersectionObserver" in window) {
    const setActive = (link) => {
      navMap.forEach(a => a.classList.toggle("active", a === link));
    };

    const spy = new IntersectionObserver((entries) => {
      // Pick the most visible intersecting section
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(navMap.get(visible[0].target));
    }, { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] });

    navMap.forEach((_, sec) => spy.observe(sec));
  }

  // Scroll reveal animations
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll(
    ".hero-copy, .phone, .tablet, .section-head, .card, figure, .panel, .footer-cta"
  );

  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach(el => el.classList.add("reveal", "in"));
  } else {
    targets.forEach(el => el.classList.add("reveal"));

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // Stagger items within the same group (e.g. cards, gallery figures)
        const group = Array.from(el.parentElement.children).filter(c =>
          c.classList.contains("reveal")
        );
        const idx = group.indexOf(el);
        el.style.transitionDelay = (idx > 0 ? Math.min(idx * 70, 350) : 0) + "ms";
        el.classList.add("in");
        obs.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    targets.forEach(el => io.observe(el));
  }
})();
