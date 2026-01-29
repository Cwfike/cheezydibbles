(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const menuBtn = document.querySelector(".menu");
  const mobile = document.getElementById("mobileMenu");

  if (menuBtn && mobile) {
    const close = () => {
      mobile.hidden = true;
      menuBtn.setAttribute("aria-expanded", "false");
    };

    menuBtn.addEventListener("click", () => {
      const open = mobile.hidden;
      mobile.hidden = !open;
      menuBtn.setAttribute("aria-expanded", String(open));
    });

    mobile.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", close);
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }
})();
