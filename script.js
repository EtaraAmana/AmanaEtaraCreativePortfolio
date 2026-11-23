(function () {
  const cfg = window.siteConfig || {};
  const labels = { web: "Web Design", uiux: "UI/UX", graphics: "Graphics" };
  const LIMIT = 5;
  const $ = (id) => document.getElementById(id);
  const grid = $("grid");
  let current = "all";
  let showAll = false;

  /* ---------- Fill in config values ---------- */
  const initials = (cfg.name || "YN")
    .split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
  document.querySelectorAll("[data-cfg]").forEach((el) => {
    const v = cfg[el.dataset.cfg];
    if (v !== undefined && v !== "") el.textContent = v;
  });
  document.querySelectorAll("[data-initials]").forEach((el) => (el.textContent = initials));
  document.querySelectorAll("[data-href]").forEach((el) => {
    el.href = el.dataset.href.replace(/\{(\w+)\}/g, (_, k) => encodeURIComponent(cfg[k] || ""));
  });
  document.title = (cfg.name || "Your Name") + " — Web, UI/UX & Graphic Designer";
  $("year").textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  const burger = $("burger");
  const links = $("navLinks");
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") { links.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
  });

  /* ---------- Helpers ---------- */
  function placeholder(title) {
    const d = document.createElement("div");
    d.className = "ph";
    d.textContent = (title || "?").trim().charAt(0).toUpperCase();
    return d;
  }
  function icon(id) {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("class", "i");
    const u = document.createElementNS("http://www.w3.org/2000/svg", "use");
    u.setAttribute("href", "#" + id);
    s.appendChild(u);
    return s;
  }
  function metaText(p) {
    return [labels[p.category] || p.category, p.year].filter(Boolean).join(" · ");
  }

  /* ---------- Featured project (hero) ---------- */
  if (projects.length) {
    const p = projects[0];
    const thumb = $("fThumb");
    if (p.image) {
      const img = document.createElement("img");
      img.src = p.image; img.alt = "";
      img.onerror = () => { img.remove(); thumb.textContent = p.title.charAt(0).toUpperCase(); };
      thumb.appendChild(img);
    } else thumb.textContent = p.title.charAt(0).toUpperCase();
    $("fTitle").textContent = p.title;
    $("fMeta").textContent = metaText(p);
    $("featured").addEventListener("click", () => openLightbox(p));
  }

  /* ---------- Filter counts ---------- */
  $("c-all").textContent = projects.length;
  ["web", "uiux", "graphics"].forEach((c) => {
    $("c-" + c).textContent = projects.filter((p) => p.category === c).length;
  });

  /* ---------- Project grid ---------- */
  function render() {
    grid.innerHTML = "";
    const list = projects.filter((p) => current === "all" || p.category === current);
    const visible = showAll ? list : list.slice(0, LIMIT);

    visible.forEach((p, i) => {
      const card = document.createElement("article");
      card.className = "card";
      card.style.animationDelay = i * 70 + "ms";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "Open project: " + p.title);

      const imgWrap = document.createElement("div");
      imgWrap.className = "card-img";
      if (p.image) {
        const img = document.createElement("img");
        img.src = p.image; img.alt = p.title; img.loading = "lazy";
        img.onerror = () => { img.remove(); imgWrap.appendChild(placeholder(p.title)); };
        imgWrap.appendChild(img);
      } else imgWrap.appendChild(placeholder(p.title));
      const tag = document.createElement("span");
      tag.className = "card-tag";
      const dot = document.createElement("i"); dot.className = "dot";
      tag.append(dot, document.createTextNode(labels[p.category] || p.category));
      imgWrap.appendChild(tag);

      const foot = document.createElement("div");
      foot.className = "card-foot";
      const txt = document.createElement("div");
      const h3 = document.createElement("h3"); h3.textContent = p.title;
      const small = document.createElement("small"); small.textContent = metaText(p);
      txt.append(h3, small);
      const arrow = document.createElement("b");
      arrow.className = "ico ring-ico";
      arrow.appendChild(icon("i-arrow"));
      foot.append(txt, arrow);

      card.append(imgWrap, foot);
      const open = () => openLightbox(p);
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
      grid.appendChild(card);
    });

    const btn = $("moreBtn");
    if (list.length > LIMIT) {
      btn.hidden = false;
      $("moreText").textContent = showAll ? "Show fewer projects" : "View all " + list.length + " projects";
    } else btn.hidden = true;
  }

  $("filters").addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    document.querySelectorAll("#filters .chip").forEach((c) => c.classList.remove("active"));
    b.classList.add("active");
    current = b.dataset.filter;
    showAll = false;
    render();
  });
  $("moreBtn").addEventListener("click", () => { showAll = !showAll; render(); });

  /* ---------- Lightbox ---------- */
  const lightbox = $("lightbox");
  function bigPlaceholder(media, title) {
    const ph = document.createElement("div");
    ph.className = "ph-big"; ph.textContent = title;
    media.appendChild(ph);
  }
  function openLightbox(p) {
    const media = $("lbMedia");
    media.innerHTML = "";
    const imgs = [p.image, ...(p.gallery || [])].filter(Boolean);
    if (!imgs.length) bigPlaceholder(media, p.title);
    imgs.forEach((src) => {
      const img = document.createElement("img");
      img.src = src; img.alt = p.title;
      img.onerror = () => { img.remove(); if (!media.children.length) bigPlaceholder(media, p.title); };
      media.appendChild(img);
    });
    $("lbTag").textContent = labels[p.category] || p.category;
    $("lbTitle").textContent = p.title;
    $("lbDesc").textContent = p.description || "";
    $("lbTools").textContent = p.tools ? "Tools: " + p.tools : "";
    const link = $("lbLink");
    if (p.link) { link.href = p.link; link.hidden = false; } else link.hidden = true;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  $("lbClose").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  /* ---------- FAQ accordion ---------- */
  $("faqList").addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const item = btn.parentElement;
    const wasOpen = item.classList.contains("open");
    document.querySelectorAll("#faqList .qa").forEach((q) => q.classList.remove("open"));
    if (!wasOpen) item.classList.add("open");
  });

  /* ---------- Contact form ---------- */
  const form = $("form");
  const note = $("formNote");
  function setNote(text, cls) {
    note.className = "muted s form-note " + (cls || "");
    note.lastChild.textContent = text;
  }
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.name || !data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
      setNote("Please add your name and a valid email.", "err");
      return;
    }
    if (cfg.formEndpoint) {
      try {
        const res = await fetch(cfg.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("bad response");
        form.reset();
        setNote("Thanks! Your message was sent. I'll reply within 24 working hours.", "ok");
      } catch (err) {
        setNote("Something went wrong. Please email me directly.", "err");
      }
    } else {
      const body = `Name: ${data.name}\nEmail: ${data.email}\nProject: ${data.type}\nBudget: ${data.budget}\n\n${data.message || ""}`;
      window.location.href = `mailto:${cfg.email || ""}?subject=${encodeURIComponent("Project enquiry from " + data.name)}&body=${encodeURIComponent(body)}`;
      setNote("Opening your email app to send the message...", "ok");
    }
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("show"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  } else revealEls.forEach((el) => el.classList.add("show"));

  render();
})();
