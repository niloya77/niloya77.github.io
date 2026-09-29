const S = window.SITE;
const I18N = window.I18N;
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover)").matches;

// localStorage bazı tarayıcılarda (gizli sekme vb.) hata verebilir
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/* ---------- dil ---------- */
let lang = store.get("lang");
if (lang !== "en" && lang !== "de") lang = (navigator.language || "").toLowerCase().startsWith("de") ? "de" : "en";

// { en, de } nesnesiyse aktif dili seç, değilse olduğu gibi döndür
const t = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] ?? v.en : v);
const ui = (k) => I18N[lang][k] ?? I18N.en[k] ?? k;
const pad = (n) => String(n).padStart(2, "0");

/* ---------- bir kez doldurulan içerik ---------- */
document.title = `${S.name} — Portfolio`;
$$("[data-name]").forEach((el) => (el.textContent = S.name));
$("[data-initials]").textContent = S.initials;
$("[data-cv]").href = S.cv;
$("[data-email]").textContent = S.email;
$("[data-year]").textContent = new Date().getFullYear();
$(".hero-name").innerHTML = [...S.name]
  .map((c, i, a) => (c === " " ? " " : `<span class="ch" style="--p:${(i / (a.length - 1)).toFixed(2)}">${esc(c)}</span>`))
  .join("");
const promptText = `${S.github}@portfolio:~$`;
$(".prompt").textContent = promptText;
$(".term-title").textContent = `${S.github}@portfolio: ~`;

/* ---------- görünme animasyonu ---------- */
let revealReady = false;
const revealObs = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      $$("[data-count]", e.target).forEach(countUp);
      revealObs.unobserve(e.target);
    }),
  { threshold: 0.15 }
);
function observeReveals() {
  if (!revealReady) return;
  $$(".reveal:not(.in)").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 90}ms`;
    revealObs.observe(el);
  });
}
function countUp(el) {
  const target = +el.dataset.count, suffix = el.dataset.suffix, start = performance.now();
  if (reduceMotion) return (el.textContent = target + suffix);
  (function frame(now) {
    const p = Math.min((now - start) / 1400, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(frame);
  })(start);
}

/* ---------- dile göre değişen her şey ---------- */
const timelineItem = (e) =>
  `<li class="reveal"><span class="mono">${esc(t(e.period))}</span><h3>${esc(t(e.title))}</h3><div class="place">${esc(t(e.place))}</div><p>${esc(t(e.detail))}</p></li>`;

const categories = ["all", ...new Set(S.projects.flatMap((p) => p.category || []))];
let filter = "all";

function render() {
  document.documentElement.lang = lang;
  $$("[data-i18n]").forEach((el) => (el.innerHTML = ui(el.dataset.i18n)));
  $$("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", ui(el.dataset.i18nAria)));
  $("[data-action=lang]").textContent = lang === "en" ? "DE" : "EN";
  $("[data-tagline]").textContent = t(S.tagline);
  $("[data-about]").textContent = t(S.about);

  $(".stats").innerHTML = S.stats
    .map((s) => `<div class="stat reveal"><b data-count="${s.value}" data-suffix="${esc(s.suffix)}">0</b><span>${esc(t(s.label))}</span></div>`)
    .join("");

  // marquee kesintisiz dönsün diye liste iki kez
  $(".marquee-track").innerHTML = [...S.skills, ...S.skills].map((s) => `<span>${esc(s)}</span>`).join("");

  const hasXp = (S.experience || []).length > 0;
  $("#experience").hidden = !hasXp;
  $('.nav-links a[href="#experience"]').hidden = !hasXp;
  $('[data-list="experience"]').innerHTML = (S.experience || []).map(timelineItem).join("");
  $('[data-list="education"]').innerHTML = S.education.map(timelineItem).join("");

  $(".filters").innerHTML = categories
    .map((c) => {
      const n = c === "all" ? S.projects.length : S.projects.filter((p) => (p.category || []).includes(c)).length;
      return `<button class="filter${c === filter ? " active" : ""}" data-filter="${c}">${ui("filter_" + c)}<sup>${n}</sup></button>`;
    })
    .join("");

  $(".carousel").innerHTML = S.projects
    .map(
      (p, i) => `
      <article class="card" style="--c:${p.color}" data-i="${i}" data-cats="${(p.category || []).join(" ")}">
        <span class="num">${pad(i + 1)} / ${pad(S.projects.length)}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(t(p.desc))}</p>
        <div class="tags">${p.tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>
        <div class="card-links">
          ${(p.links || []).map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}
          <button class="more" type="button">${ui("details")} →</button>
        </div>
      </article>`
    )
    .join("");

  $(".socials").innerHTML = S.socials
    .map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`)
    .join("");

  numberSections();
  $$(".dots button").forEach((b) => {
    const sec = document.getElementById(b.dataset.target);
    b.parentElement.hidden = sec.hidden;
    b.setAttribute("aria-label", $(".title", sec)?.textContent.trim() || b.dataset.target);
  });

  applyFilter(filter, false);
  bindCardTilt();
  renderGitHub();
  if (openIndex >= 0) fillPanel(openIndex);
  observeReveals();
  onScroll();
}

function numberSections() {
  $$(".section:not([hidden]) .title .num").forEach((el, i) => (el.textContent = `${pad(i + 1)}.`));
}

function setLang(l) {
  lang = l;
  store.set("lang", l);
  render();
}

/* ---------- tema ---------- */
const currentTheme = () => document.documentElement.dataset.theme || "dark";
function setTheme(th) {
  document.documentElement.dataset.theme = th;
  store.set("theme", th);
  net.refreshColors();
}

$("[data-action=lang]").addEventListener("click", () => setLang(lang === "en" ? "de" : "en"));
$("[data-action=theme]").addEventListener("click", () => setTheme(currentTheme() === "dark" ? "light" : "dark"));
$("[data-action=terminal]").addEventListener("click", () => openTerm());

/* ---------- yazı makinesi efekti ---------- */
(function typewriter() {
  const el = $(".typed");
  let role = 0, i = 0, deleting = false;
  if (reduceMotion) {
    el.textContent = t(S.roles)[0];
    return;
  }
  (function tick() {
    const roles = t(S.roles), word = roles[role % roles.length];
    i = Math.min(i, word.length);
    el.textContent = word.slice(0, i);
    if (!deleting && i === word.length) { deleting = true; return setTimeout(tick, 1600); }
    if (deleting && i === 0) { deleting = false; role = (role + 1) % roles.length; }
    i += deleting ? -1 : 1;
    setTimeout(tick, deleting ? 35 : 70);
  })();
})();

/* ---------- aktif bölüm: nav + yan noktalar ---------- */
const sections = $$(".section");
$(".dots").innerHTML = sections
  .map((s) => `<li><button data-target="${s.id}"></button></li>`)
  .join("");
$$(".dots button").forEach((b) =>
  b.addEventListener("click", () => document.getElementById(b.dataset.target).scrollIntoView())
);
const sectionObs = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      $$(".dots button").forEach((b) => b.classList.toggle("active", b.dataset.target === id));
      $$(".nav-links a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
    }),
  { threshold: 0.4 }
);
sections.forEach((s) => sectionObs.observe(s));

/* ---------- scroll: ilerleme çubuğu, nav gizleme, zaman çizelgesi ---------- */
const progress = $(".progress"), nav = $(".nav");
let lastY = 0;
function onScroll() {
  const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  nav.classList.toggle("hidden", y > lastY && y > 200);
  lastY = y;
  $$(".timeline").forEach((tl) => {
    const r = tl.getBoundingClientRect();
    if (!r.height) return;
    tl.style.setProperty("--grow", Math.min(Math.max((innerHeight * 0.8 - r.top) / r.height, 0), 1));
  });
}
addEventListener("scroll", () => requestAnimationFrame(onScroll), { passive: true });

/* ---------- carousel: sürükleme, oklar, klavye, ilerleme ---------- */
const carousel = $(".carousel"), bar = $(".carousel-bar span");
const step = () => ($(".card:not([hidden])")?.offsetWidth || 300) + 28;

$(".prev").addEventListener("click", () => carousel.scrollBy({ left: -step(), behavior: "smooth" }));
$(".next").addEventListener("click", () => carousel.scrollBy({ left: step(), behavior: "smooth" }));
carousel.addEventListener("keydown", (e) => {
  if (e.target !== carousel) return;
  if (e.key === "ArrowRight") carousel.scrollBy({ left: step(), behavior: "smooth" });
  if (e.key === "ArrowLeft") carousel.scrollBy({ left: -step(), behavior: "smooth" });
});

function updateBar() {
  const max = carousel.scrollWidth - carousel.clientWidth;
  const visible = carousel.scrollWidth ? carousel.clientWidth / carousel.scrollWidth : 1;
  bar.style.width = `${Math.min(1, visible + (1 - visible) * (max > 0 ? carousel.scrollLeft / max : 1)) * 100}%`;
}
carousel.addEventListener("scroll", updateBar, { passive: true });
addEventListener("resize", updateBar);

// mouse ile sürükle (dokunmatikte native swipe zaten çalışıyor), bırakınca momentum
let down = false, startX = 0, startLeft = 0, velocity = 0, lastX = 0, moved = false, suppressClick = false;
carousel.addEventListener("pointerdown", (e) => {
  if (e.pointerType !== "mouse" || e.button !== 0) return;
  down = true; moved = false;
  startX = lastX = e.clientX; startLeft = carousel.scrollLeft; velocity = 0;
});
addEventListener("pointermove", (e) => {
  if (!down) return;
  if (Math.abs(e.clientX - startX) > 5 && !moved) { moved = true; carousel.classList.add("dragging"); }
  if (!moved) return;
  velocity = e.clientX - lastX; lastX = e.clientX;
  carousel.scrollLeft = startLeft - (e.clientX - startX);
});
addEventListener("pointerup", () => {
  if (!down) return;
  down = false;
  if (!moved) return;
  suppressClick = true;
  setTimeout(() => (suppressClick = false), 60);
  let v = velocity * 1.5;
  (function glide() {
    carousel.scrollLeft -= v;
    v *= 0.92;
    if (Math.abs(v) > 0.5) requestAnimationFrame(glide);
    else carousel.classList.remove("dragging"); // snap geri gelince en yakın karta oturur
  })();
});

// karta tıklayınca detay paneli (linkler hariç)
carousel.addEventListener("click", (e) => {
  if (suppressClick || e.target.closest("a")) return;
  const card = e.target.closest(".card");
  if (card) openProject(+card.dataset.i);
});

/* ---------- filtreler ---------- */
let filterToken = 0;
$(".filters").addEventListener("click", (e) => {
  const b = e.target.closest(".filter");
  if (b && b.dataset.filter !== filter) applyFilter(b.dataset.filter);
});
function applyFilter(f, animate = true) {
  filter = f;
  const token = ++filterToken;
  $$(".filter").forEach((b) => b.classList.toggle("active", b.dataset.filter === f));
  const cards = $$(".card");
  const show = (c) => f === "all" || c.dataset.cats.split(" ").includes(f);

  if (!animate || reduceMotion) {
    cards.forEach((c) => { c.hidden = !show(c); c.classList.remove("out"); });
    carousel.scrollLeft = 0;
    return updateBar();
  }
  // 1) gidecek kartlar solar  2) gizlenir, gelecek kartlar sırayla belirir
  cards.forEach((c) => c.classList.toggle("out", !show(c) || c.hidden));
  setTimeout(() => {
    if (token !== filterToken) return;
    const entering = [];
    cards.forEach((c) => {
      if (show(c) && c.hidden) entering.push(c);
      c.hidden = !show(c);
    });
    carousel.scrollLeft = 0;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (token !== filterToken) return;
        entering.forEach((c, i) => {
          c.style.transitionDelay = `${i * 50}ms`;
          c.classList.remove("out");
          setTimeout(() => (c.style.transitionDelay = ""), 700);
        });
        updateBar();
      })
    );
  }, 260);
}

/* ---------- kart 3D tilt + ışık takibi ---------- */
function bindCardTilt() {
  if (!finePointer || reduceMotion) return;
  $$(".card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
      card.style.transform = `perspective(900px) rotateY(${(x - 0.5) * 10}deg) rotateX(${(0.5 - y) * 10}deg)`;
    });
    card.addEventListener("mouseleave", () => (card.style.transform = ""));
  });
}

/* ---------- proje detay paneli ---------- */
const modal = $(".modal"), panel = $(".panel");
let openIndex = -1, lastFocus = null, modalTimer;

function fillPanel(i) {
  const p = S.projects[i];
  panel.style.setProperty("--c", p.color);
  const paragraphs = String(t(p.details) || t(p.desc)).split(/\n\s*\n/).map((s) => `<p>${esc(s)}</p>`).join("");
  const role = t(p.role);
  $(".panel-body").innerHTML = `
    <div class="panel-hero">
      <span class="num">${pad(i + 1)} / ${pad(S.projects.length)}</span>
      <h2 id="panel-title">${esc(p.title)}</h2>
    </div>
    <div class="panel-content">
      ${paragraphs}
      ${role ? `<h4>${ui("role")}</h4><p>${esc(role)}</p>` : ""}
      <h4>${ui("stack")}</h4>
      <div class="tags">${p.tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>
      <div class="panel-links">
        ${(p.links || []).map((l) => `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}
      </div>
    </div>`;
  panel.scrollTop = 0;
}

function openProject(i) {
  clearTimeout(modalTimer);
  if (openIndex < 0) lastFocus = document.activeElement;
  openIndex = (i + S.projects.length) % S.projects.length;
  fillPanel(openIndex);
  modal.hidden = false;
  updateLock();
  requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add("open")));
  $(".panel-btn[data-close]").focus({ preventScroll: true });
}
function closeProject() {
  if (openIndex < 0) return;
  openIndex = -1;
  modal.classList.remove("open");
  updateLock();
  modalTimer = setTimeout(() => (modal.hidden = true), 500);
  lastFocus?.focus?.({ preventScroll: true });
}
modal.addEventListener("click", (e) => {
  if (e.target.closest("[data-close]")) return closeProject();
  const btn = e.target.closest("[data-panel]");
  if (btn) openProject(openIndex + (btn.dataset.panel === "next" ? 1 : -1));
});

// telefonda: paneli aşağı kaydırarak kapat, sağa/sola kaydırarak proje değiştir
let sx = null, sy = null, dx = 0, dy = 0, axis = null;
panel.addEventListener("touchstart", (e) => {
  sx = e.touches[0].clientX; sy = e.touches[0].clientY; dx = dy = 0; axis = null;
}, { passive: true });
panel.addEventListener("touchmove", (e) => {
  if (sx === null) return;
  dx = e.touches[0].clientX - sx; dy = e.touches[0].clientY - sy;
  if (!axis && Math.hypot(dx, dy) > 10) axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
  if (axis === "y" && dy > 0 && panel.scrollTop <= 0 && innerWidth <= 760) {
    panel.style.transition = "none";
    panel.style.transform = `translateY(${dy}px)`;
  }
}, { passive: true });
panel.addEventListener("touchend", () => {
  if (sx === null) return;
  panel.style.transition = "";
  panel.style.transform = "";
  if (axis === "y" && dy > 120 && innerWidth <= 760) closeProject();
  else if (axis === "x" && Math.abs(dx) > 80) openProject(openIndex + (dx < 0 ? 1 : -1));
  sx = sy = null;
});

/* ---------- terminal ---------- */
const term = $(".terminal"), out = $(".term-out"), input = $("#term-input");
const history = [];
let hIdx = 0, termOpen = false, termTimer;

function print(html) {
  const d = document.createElement("div");
  d.className = "tl";
  d.innerHTML = html;
  out.appendChild(d);
  out.scrollTop = out.scrollHeight;
}
function openTerm() {
  clearTimeout(termTimer);
  termOpen = true;
  term.hidden = false;
  updateLock();
  requestAnimationFrame(() => requestAnimationFrame(() => term.classList.add("open")));
  if (!out.childElementCount) print(ui("term_welcome"));
  setTimeout(() => input.focus(), 50);
}
function closeTerm() {
  if (!termOpen) return;
  termOpen = false;
  term.classList.remove("open");
  input.blur();
  updateLock();
  termTimer = setTimeout(() => (term.hidden = true), 350);
}
term.addEventListener("click", (e) => {
  if (e.target.closest("[data-term-close]")) closeTerm();
  else if (!e.target.closest("a") && !getSelection().toString()) input.focus();
});

const visibleSections = () => $$(".section:not([hidden])").map((s) => s.id);
const list = (items) =>
  items.map((e) => `<span class="c">${esc(t(e.period))}</span>  ${esc(t(e.title))} <span class="m">@ ${esc(t(e.place))}</span>`).join("\n");

const commands = {
  help: () => `<div class="help">${ui("term_help").map(([c, d]) => `<b>${c}</b><span class="m">${d}</span>`).join("")}</div>`,
  whoami: () => `${esc(S.name)} <span class="m">— ${esc(t(S.roles)[0])}</span>`,
  about: () => esc(t(S.about)),
  projects: () =>
    S.projects.map((p, i) => `<span class="c">[${i + 1}]</span> ${esc(p.title)} <span class="m">· ${esc(p.tags.join(", "))}</span>`).join("\n") +
    "\n\n" + ui("term_open_hint"),
  open: (n) => {
    const i = parseInt(n, 10) - 1;
    if (!S.projects[i]) return ui("term_bad_project");
    closeTerm();
    openProject(i);
  },
  skills: () => S.skills.map(esc).join(" · "),
  experience: () => list(S.experience || []),
  education: () => list(S.education),
  contact: () =>
    [
      `email    <a href="mailto:${esc(S.email)}">${esc(S.email)}</a>`,
      ...S.socials.map((s) => `${esc(s.label.toLowerCase()).padEnd(8)} <a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.url)}</a>`),
    ].join("\n"),
  github: () => {
    window.open(`https://github.com/${S.github}`, "_blank", "noopener");
    return ui("term_opening");
  },
  ls: () => visibleSections().map((s) => `<b>${s}/</b>`).join("  "),
  goto: (s = "") => {
    s = s.replace(/^#|\/$/g, "");
    if (!visibleSections().includes(s)) return ui("term_bad_section").replace("{list}", visibleSections().join(", "));
    closeTerm();
    document.getElementById(s).scrollIntoView();
  },
  cd: (s) => commands.goto(s),
  lang: (l) => {
    if (l !== "en" && l !== "de") return "usage: lang en|de";
    setLang(l);
    return `✓ ${l}`;
  },
  theme: (th) => {
    setTheme(th === "light" || th === "dark" ? th : currentTheme() === "dark" ? "light" : "dark");
    return `✓ ${currentTheme()}`;
  },
  date: () => new Date().toLocaleString(lang),
  echo: (...a) => esc(a.join(" ")),
  sudo: () => ui("term_sudo"),
  clear: () => { out.innerHTML = ""; },
  exit: () => closeTerm(),
};

$(".term-line").addEventListener("submit", (e) => {
  e.preventDefault();
  const raw = input.value.trim();
  input.value = "";
  print(`<span class="prompt">${esc(promptText)}</span> ${esc(raw)}`);
  if (!raw) return;
  history.push(raw);
  hIdx = history.length;
  const [cmd, ...args] = raw.split(/\s+/);
  const fn = Object.hasOwn(commands, cmd.toLowerCase()) ? commands[cmd.toLowerCase()] : null;
  const res = fn ? fn(...args) : ui("term_unknown").replace("{cmd}", esc(cmd));
  if (res) print(res);
});
input.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
    hIdx = Math.max(0, Math.min(history.length, hIdx + (e.key === "ArrowUp" ? -1 : 1)));
    input.value = history[hIdx] ?? "";
  } else if (e.key === "Tab") {
    e.preventDefault();
    const matches = Object.keys(commands).filter((c) => c.startsWith(input.value.trim().toLowerCase()));
    if (matches.length === 1) input.value = matches[0] + " ";
    else if (matches.length > 1) print(matches.join("  "));
  } else if (e.key === "l" && e.ctrlKey) {
    e.preventDefault();
    out.innerHTML = "";
  }
});

/* ---------- klavye kısayolları ---------- */
addEventListener("keydown", (e) => {
  const el = document.activeElement;
  const typing = el && el !== input && (/INPUT|TEXTAREA|SELECT/.test(el.tagName) || el.isContentEditable);
  // e.code = fiziksel tuş (1'in solundaki): US'te `, TR'de ", DE'de ^ — her klavyede çalışsın
  if (e.key === "Escape") {
    if (termOpen) closeTerm();
    else closeProject();
  } else if ((e.code === "Backquote" || e.key === "`") && !typing && !e.metaKey && !e.ctrlKey) {
    e.preventDefault();
    termOpen ? closeTerm() : openTerm();
  } else if (openIndex >= 0 && !termOpen && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
    openProject(openIndex + (e.key === "ArrowRight" ? 1 : -1));
  }
});

let introRunning = false;
function updateLock() {
  document.body.classList.toggle("locked", termOpen || openIndex >= 0 || introRunning);
}

/* ---------- github ---------- */
const LANG_COLORS = {
  TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572a5", Java: "#b07219",
  "Jupyter Notebook": "#da5b0b", "C++": "#f34b7d", C: "#555555", CSS: "#663399",
  HTML: "#e34c26", TeX: "#3d6117", Shell: "#89e051", Dockerfile: "#384d54", PLpgSQL: "#336790",
  Batchfile: "#c1f12e", Other: "#9a9aa8",
};
const GH_KEY = "gh-cache-v1", GH_TTL = 60 * 60 * 1000;
let gh = null, ghState = "loading";

const repoOf = (url) => (url.match(/github\.com\/([^/]+\/[^/#?]+)/) || [])[1];
const projectRepos = [...new Set(S.projects.flatMap((p) => (p.links || []).map((l) => repoOf(l.url)).filter(Boolean)))];

async function loadGitHub() {
  try {
    const c = JSON.parse(store.get(GH_KEY));
    if (c && Date.now() - c.at < GH_TTL) {
      gh = c.data; ghState = "ok";
      return renderGitHub();
    }
  } catch {}
  const api = (p) => fetch(`https://api.github.com/${p}`).then((r) => (r.ok ? r.json() : Promise.reject(r.status)));
  try {
    const [user, ...rest] = await Promise.all([
      api(`users/${S.github}`),
      ...projectRepos.map((r) => api(`repos/${r}`).catch(() => null)),
      ...projectRepos.map((r) => api(`repos/${r}/languages`).catch(() => ({}))),
    ]);
    const repos = rest.slice(0, projectRepos.length).filter(Boolean);
    const langs = rest.slice(projectRepos.length);

    // her repo eşit ağırlıkta: büyük bir notebook tüm grafiği kaplamasın
    const totals = {};
    langs.forEach((l) => {
      const sum = Object.values(l).reduce((a, b) => a + b, 0);
      if (sum) for (const [k, v] of Object.entries(l)) totals[k] = (totals[k] || 0) + v / sum;
    });
    const all = Object.values(totals).reduce((a, b) => a + b, 0) || 1;
    const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]).map(([k, v]) => [k, v / all]);
    const top = sorted.slice(0, 6);
    const other = sorted.slice(6).reduce((a, [, v]) => a + v, 0);
    if (other > 0.001) top.push(["Other", other]);

    gh = {
      since: user.created_at,
      url: user.html_url,
      langCount: sorted.length,
      langs: top,
      recent: repos
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
        .slice(0, 5)
        .map((r) => ({ name: r.name, owner: r.owner.login, url: r.html_url, at: r.pushed_at })),
    };
    ghState = "ok";
    store.set(GH_KEY, JSON.stringify({ at: Date.now(), data: gh }));
  } catch {
    ghState = "error";
  }
  renderGitHub();
}

function timeAgo(iso) {
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  const s = (new Date(iso) - Date.now()) / 1000;
  const units = [["year", 31536000], ["month", 2592000], ["week", 604800], ["day", 86400], ["hour", 3600], ["minute", 60]];
  for (const [u, sec] of units) if (Math.abs(s) >= sec) return rtf.format(Math.round(s / sec), u);
  return rtf.format(0, "minute");
}

function renderGitHub() {
  const box = $(".gh");
  if (ghState !== "ok") {
    box.innerHTML = `<p class="gh-note">${ui(ghState === "error" ? "gh_error" : "gh_loading")}</p>
      <a class="btn ghost gh-profile" href="https://github.com/${esc(S.github)}" target="_blank" rel="noopener">${ui("gh_profile")}</a>`;
    return;
  }
  const color = (n) => LANG_COLORS[n] || LANG_COLORS.Other;
  box.innerHTML = `
    <div class="stat reveal"><b data-count="${projectRepos.length}" data-suffix="">0</b><span>${ui("gh_contrib")}</span></div>
    <div class="stat reveal"><b data-count="${gh.langCount}" data-suffix="">0</b><span>${ui("gh_langs_count")}</span></div>
    <div class="stat reveal"><b>${new Date(gh.since).getFullYear()}</b><span>${ui("gh_since")}</span></div>
    <div class="gh-box reveal">
      <h3>${ui("gh_langs")}</h3>
      <div class="langbar reveal">${gh.langs
        .map(([n, v]) => `<span style="--w:${(v * 100).toFixed(1)}%;background:${color(n)}" title="${esc(n)}"></span>`)
        .join("")}</div>
      <div class="legend">${gh.langs
        .map(([n, v]) => `<span><i style="background:${color(n)}"></i>${esc(n)}<em>${(v * 100).toFixed(1)}%</em></span>`)
        .join("")}</div>
    </div>
    <div class="gh-box reveal">
      <h3>${ui("gh_recent")}</h3>
      <ul class="recent">${gh.recent
        .map((r) => `<li><a href="${esc(r.url)}" target="_blank" rel="noopener"><span class="owner">${esc(r.owner)}/</span>${esc(r.name)}</a><time datetime="${esc(r.at)}">${timeAgo(r.at)}</time></li>`)
        .join("")}</ul>
    </div>
    <a class="btn ghost gh-profile reveal" href="${esc(gh.url)}" target="_blank" rel="noopener">${ui("gh_profile")}</a>`;
  observeReveals();
}

/* ---------- nöral ağ / devre arka planı ---------- */
const net = (function initNet() {
  const canvas = $(".net"), hero = $(".hero"), ctx = canvas.getContext("2d");
  let w = 0, h = 0, nodes = [], pulses = [], colors = {}, running = false;
  const mouse = { x: -9999, y: -9999 };
  const LINK = 140, MOUSE = 170;

  function refreshColors() {
    const cs = getComputedStyle(document.documentElement);
    colors = {
      a: cs.getPropertyValue("--accent").trim(),
      b: cs.getPropertyValue("--accent-2").trim(),
      line: cs.getPropertyValue("--net-line").trim(),
    };
    if (!running) draw();
  }
  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(90, Math.max(30, (w * h) / 15000)));
    nodes = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 1,
    }));
    pulses = [];
    if (!running) draw();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const edges = [];
    ctx.lineWidth = 1;
    ctx.strokeStyle = colors.line;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d > LINK) continue;
        edges.push([i, j]);
        ctx.globalAlpha = 1 - d / LINK;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
    // mouse'a yakın düğümler ona bağlanır
    ctx.strokeStyle = colors.a;
    for (const n of nodes) {
      const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
      if (d > MOUSE) continue;
      ctx.globalAlpha = (1 - d / MOUSE) * 0.8;
      ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
    }
    // sinyaller: kenarlar boyunca ilerleyen ışık noktaları
    if (running && edges.length && pulses.length < 14 && Math.random() < 0.08) {
      const [i, j] = edges[(Math.random() * edges.length) | 0];
      pulses.push(Math.random() < 0.5 ? { a: i, b: j, t: 0 } : { a: j, b: i, t: 0 });
    }
    ctx.fillStyle = colors.b;
    ctx.shadowColor = colors.b;
    pulses = pulses.filter((p) => {
      const a = nodes[p.a], b = nodes[p.b];
      if (!a || !b || p.t >= 1 || Math.hypot(a.x - b.x, a.y - b.y) > LINK * 1.2) return false;
      const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
      ctx.globalAlpha = Math.sin(p.t * Math.PI);
      ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.arc(x, y, 2.4, 0, Math.PI * 2); ctx.fill();
      p.t += 0.018;
      return true;
    });
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.fillStyle = colors.a;
    for (const n of nodes) {
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
    }
  }

  function step() {
    for (const n of nodes) {
      const dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < 90 && d > 0) { n.x += (dx / d) * 1.2; n.y += (dy / d) * 1.2; }
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      n.x = Math.max(0, Math.min(w, n.x)); n.y = Math.max(0, Math.min(h, n.y));
    }
  }
  function loop() {
    if (!running) return;
    step(); draw();
    requestAnimationFrame(loop);
  }

  hero.addEventListener("mousemove", (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  hero.addEventListener("mouseleave", () => { mouse.x = mouse.y = -9999; });

  let rt;
  addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 150); });

  refreshColors();
  resize();
  if (!reduceMotion) {
    // sadece hero ekrandayken çalış (pil / işlemci dostu)
    new IntersectionObserver(([e]) => {
      const was = running;
      running = e.isIntersecting;
      if (running && !was) loop();
    }).observe(hero);
  }
  return { refreshColors };
})();

/* ---------- özel imleç + arka plan ışığı + manyetik butonlar ---------- */
if (finePointer && !reduceMotion) {
  const cursor = $(".cursor"), glow = $(".glow");
  let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, gx = mx, gy = my;
  addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
  (function loop() {
    cx += (mx - cx) * 0.25; cy += (my - cy) * 0.25;
    gx += (mx - gx) * 0.06; gy += (my - gy) * 0.06;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();

  document.addEventListener("mouseover", (e) =>
    cursor.classList.toggle("hover", !!e.target.closest("a, button, .card"))
  );

  $$(".magnetic").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
      el.style.transition = "transform .15s";
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transition = "";
      el.style.transform = "";
    });
  });
} else {
  $(".cursor").remove();
  $(".glow").remove();
}

/* ---------- e-postayı kopyala ---------- */
const toast = $(".toast");
$("[data-email]").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(S.email);
  } catch {
    location.href = `mailto:${S.email}`;
    return;
  }
  toast.textContent = ui("copied");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
});

/* ---------- açılış: selamlaşma → terminal açılışı ---------- */
const GREETINGS = ["Hello", "Merhaba", "Hallo", "Bonjour", "Hola", "Ciao", "안녕하세요"];

function runIntro(done) {
  const el = $(".intro");
  if (reduceMotion) { el.remove(); return done(); }

  let finished = false;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const onKey = (e) => {
    if (!["Escape", "Enter", " "].includes(e.key)) return;
    e.preventDefault();
    e.stopPropagation();
    finish();
  };
  function finish() {
    if (finished) return;
    finished = true;
    removeEventListener("keydown", onKey, true);
    el.classList.add("done");
    introRunning = false;
    updateLock();
    done();
    setTimeout(() => el.remove(), 1000);
  }

  introRunning = true;
  updateLock();
  addEventListener("keydown", onKey, true);
  $(".intro-skip").addEventListener("click", finish);

  (async () => {
    // 1) selamlaşma
    const word = $(".intro-hello .word");
    for (let i = 0; i < GREETINGS.length; i++) {
      if (finished) return;
      word.textContent = GREETINGS[i];
      await sleep(i === 0 ? 500 : 160);
    }
    $(".intro-hello").classList.add("gone");
    await sleep(380);

    // 2) terminal açılışı
    const box = $(".intro-boot");
    box.classList.add("show");
    const firstName = S.name.split(" ").slice(0, -1).join(" ") || S.name;
    for (const [tpl, ok] of ui("intro_boot")) {
      if (finished) return;
      const text = tpl.replace("{n}", S.projects.length).replace("{name}", firstName);
      const row = document.createElement("div");
      box.appendChild(row);
      for (let c = 1; c <= text.length; c++) {
        if (finished) return;
        row.innerHTML = `<span class="p">&gt;</span>${esc(text.slice(0, c))}<span class="cur"></span>`;
        await sleep(ok ? 14 : 45);
      }
      if (ok) {
        await sleep(200);
        row.innerHTML = `<span class="p">&gt;</span>${esc(text)}<span class="ok">✓</span>`;
        await sleep(120);
      } else {
        row.innerHTML = `<span class="p">&gt;</span><b>${esc(text)}</b><span class="cur"></span>`;
      }
    }
    await sleep(700);
    finish();
  })();
}

render();
loadGitHub();
runIntro(() => {
  revealReady = true;
  observeReveals();
});
