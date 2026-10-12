/* ═══════════════════════════════════════════════════════
   App — Navigation, Rendering & Interactivity
   ═══════════════════════════════════════════════════════ */

const BASE_URL = "https://api.buku.cloudapp.web.id";

/* ── Init ──────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  buildSidebar();
  routeTo(window.location.hash || "#welcome");
  window.addEventListener("hashchange", () => routeTo(window.location.hash));
});

/* ── Routing ───────────────────────────────────────── */
function routeTo(hash) {
  const id = hash.replace("#", "") || "welcome";

  // Update sidebar active
  document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
  const navEl = document.querySelector(`[data-nav="${id}"]`);
  if (navEl) navEl.classList.add("active");

  // Show relevant section
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));

  if (id === "welcome")       renderWelcome();
  else if (id === "glossary") renderGlossary();
  else {
    const ep = ENDPOINTS.find(e => e.id === id);
    if (ep) renderEndpoint(ep);
  }
}

/* ── Sidebar ───────────────────────────────────────── */
function buildSidebar() {
  const nav = document.getElementById("sidebarNav");

  // Group endpoints by category
  const groups = {};
  ENDPOINTS.forEach(ep => {
    if (!groups[ep.category]) groups[ep.category] = [];
    groups[ep.category].push(ep);
  });

  let html = "";

  // Welcome
  html += `<div class="nav-section">Dokumentasi</div>`;
  html += `<a class="nav-item active" href="#welcome" data-nav="welcome"><i class="fa-solid fa-book-open"></i> Overview</a>`;

  for (const [cat, eps] of Object.entries(groups)) {
    html += `<div class="nav-section">${cat}</div>`;
    eps.forEach(ep => {
      html += `<a class="nav-item" href="#${ep.id}" data-nav="${ep.id}">
        <span class="method">${ep.method}</span> ${ep.title}
      </a>`;
    });
  }

  // Glossary
  html += `<div class="nav-section">Referensi</div>`;
  html += `<a class="nav-item" href="#glossary" data-nav="glossary"><i class="fa-solid fa-clipboard-list"></i> Glosarium Field</a>`;

  nav.innerHTML = html;

  // Handle clicks for data-nav links inside ep-body too
  document.addEventListener("click", e => {
    const link = e.target.closest("[data-nav]");
    if (link) {
      e.preventDefault();
      window.location.hash = link.getAttribute("data-nav");
    }
  });
}

/* ── Welcome / Overview ────────────────────────────── */
function renderWelcome() {
  const main = document.getElementById("mainContent");
  let html = `
    <h2 class="page-title"><i class="fa-solid fa-book"></i> SIBI Catalogue API</h2>
    <p class="page-subtitle">
      Dokumentasi lengkap API katalog buku SIBI (Sistem Informasi Buku Indonesia).
      Base URL: <code>${BASE_URL}</code>
    </p>

    <div class="callout">
      <strong>Protokol:</strong> Semua endpoint menggunakan metode <code>GET</code>.
      Tidak diperlukan <em>authentication header</em> — API ini bersifat <strong>publik (read-only)</strong>.
    </div>

    <h3 style="margin-top:24px;">Daftar Endpoint</h3>
    <div class="overview-grid">
  `;

  ENDPOINTS.forEach(ep => {
    html += `
      <a class="overview-card" href="#${ep.id}">
        <div class="ov-method">${ep.method}</div>
        <div class="ov-title">${ep.title}</div>
        <div class="ov-desc">${ep.desc.replace(/<[^>]*>/g, "").substring(0, 80)}…</div>
      </a>
    `;
  });

  html += `</div>`;
  main.innerHTML = html;

  const section = document.getElementById("welcomeSection");
  section.classList.add("active");
}

/* ── Endpoint Detail ───────────────────────────────── */
function renderEndpoint(ep) {
  const main = document.getElementById("mainContent");

  let paramsHtml = "";
  if (ep.params.length > 0) {
    paramsHtml = `
      <h3>Parameter</h3>
      <table>
        <thead><tr><th>Nama</th><th>Tipe</th><th>Wajib</th><th>Deskripsi</th></tr></thead>
        <tbody>
          ${ep.params.map(p => `
            <tr>
              <td><code>${p.name}</code></td>
              <td><span class="tag tag-${p.type}">${p.type}</span></td>
              <td>${p.required
                ? '<span class="tag tag-required">Wajib</span>'
                : '<span class="tag tag-optional">Opsional</span>'}</td>
              <td>${p.desc}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  let notesHtml = ep.notes ? `<div class="callout"><i class="fa-solid fa-lightbulb"></i> ${ep.notes}</div>` : "";

  let exampleHtml = ep.example ? `
    <h3>Contoh Request</h3>
    <pre><code>GET ${BASE_URL}${ep.example}</code></pre>
  ` : "";

  // Special note for endpoints that support all boolean filters
  const filterEndpoints = ["getBooks", "getTextBooks", "getPenggerakTextBooks", "getNonTextBooks"];
  let filterNote = "";
  if (filterEndpoints.includes(ep.id)) {
    filterNote = `
      <div class="callout" style="margin-top:12px;">
        <strong>Filter Boolean Tersedia:</strong>
        ${buildFilterSummary()}
      </div>
    `;
  }

  let html = `
    <h2 class="page-title">${ep.title}</h2>
    <p class="page-subtitle"><code>${ep.method} ${ep.path}</code></p>

    <div class="endpoint-card">
      <div class="ep-head">
        <span class="ep-method">${ep.method}</span>
        <span class="ep-url"><span class="base">${BASE_URL}</span><span class="path">${ep.path}</span></span>
      </div>
      <div class="ep-body">
        <p>${ep.desc}</p>
        ${notesHtml}
        ${paramsHtml}
        ${filterNote}
        ${exampleHtml}
      </div>
    </div>

    ${buildSimulatorHtml(ep)}
  `;

  main.innerHTML = html;

  // Attach simulator events
  attachSimulatorEvents(ep);

  const section = document.getElementById("welcomeSection");
  section.classList.add("active");
}

/* ── API Simulator ──────────────────────────────────── */
function buildSimulatorHtml(ep) {
  let paramInputsHtml = "";
  if (ep.params.length > 0) {
    paramInputsHtml = `
      <div class="sim-params">
        <div class="sim-params-title">Parameter</div>
        <div class="sim-params-grid">
          ${ep.params.map(p => `
            <div class="sim-field">
              <label for="sim-${p.name}">
                <code>${p.name}</code>
                ${p.required ? '<span class="tag tag-required" style="font-size:.6rem;">Wajib</span>' : '<span class="tag tag-optional" style="font-size:.6rem;">Opsional</span>'}
              </label>
              <input
                type="${p.type === 'number' ? 'number' : 'text'}"
                id="sim-${p.name}"
                placeholder="${p.desc.replace(/<[^>]*>/g, '').substring(0, 50)}"
                value="${p.default || ''}"
                data-param="${p.name}"
                data-required="${p.required}"
              />
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  // Build initial URL from param defaults
  const initParams = new URLSearchParams();
  ep.params.forEach(p => {
    if (p.default) initParams.append(p.name, p.default);
  });
  const initQs = initParams.toString();
  const initialUrl = `${BASE_URL}${ep.path}${initQs ? '?' + initQs : ''}`;

  return `
    <div class="simulator-card" id="simulatorCard">
      <div class="sim-head">
        <i class="fa-solid fa-play"></i> API Simulator — Coba Langsung
      </div>
      <div class="sim-body">
        ${paramInputsHtml}
        <div class="sim-url-section">
          <div class="sim-url-label">Request URL</div>
          <div class="sim-url-bar">
            <span class="sim-method-badge">${ep.method}</span>
            <code class="sim-url-preview" id="simUrlPreview">${initialUrl}</code>
          </div>
          <button class="sim-send-btn" id="simSendBtn">
            <i class="fa-solid fa-paper-plane"></i> Send Request
          </button>
        </div>
        <div class="sim-response" id="simResponse" style="display:none;">
          <div class="sim-response-header">
            <span class="sim-status" id="simStatus"></span>
            <span class="sim-duration" id="simDuration"></span>
            <button class="sim-copy-btn" id="simCopyBtn" title="Salin response">
              <i class="fa-solid fa-copy"></i>
            </button>
          </div>
          <pre class="sim-response-body"><code id="simResponseBody"></code></pre>
        </div>
      </div>
    </div>
  `;
}

function attachSimulatorEvents(ep) {
  const urlPreview = document.getElementById("simUrlPreview");
  const sendBtn = document.getElementById("simSendBtn");
  const responseDiv = document.getElementById("simResponse");
  const statusEl = document.getElementById("simStatus");
  const durationEl = document.getElementById("simDuration");
  const bodyEl = document.getElementById("simResponseBody");
  const copyBtn = document.getElementById("simCopyBtn");

  if (!sendBtn) return;

  // Build URL helper
  function buildUrl() {
    const params = new URLSearchParams();
    document.querySelectorAll(".sim-field input").forEach(input => {
      const val = input.value.trim();
      if (val) params.append(input.dataset.param, val);
    });
    const qs = params.toString();
    return `${BASE_URL}${ep.path}${qs ? '?' + qs : ''}`;
  }

  // Update URL preview on any input change
  document.querySelectorAll(".sim-field input").forEach(input => {
    input.addEventListener("input", () => {
      urlPreview.textContent = buildUrl();
    });
  });

  // Send button
  sendBtn.addEventListener("click", async () => {
    const url = buildUrl();
    urlPreview.textContent = url;

    // Show loading
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';
    responseDiv.style.display = "block";
    statusEl.innerHTML = '<span style="color:var(--text-muted);">Menghubungi server...</span>';
    durationEl.textContent = "";
    bodyEl.textContent = "";

    const startTime = performance.now();

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { "Accept": "application/json" },
      });

      const elapsed = (performance.now() - startTime).toFixed(0);

      let body;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        body = await res.json();
      } else {
        body = await res.text();
      }

      // Status badge
      const ok = res.ok;
      statusEl.innerHTML = `
        <span class="sim-status-code ${ok ? 'sim-ok' : 'sim-err'}">${res.status} ${res.statusText}</span>
      `;
      durationEl.textContent = `${elapsed}ms`;

      // Format response
      if (typeof body === "object") {
        bodyEl.textContent = JSON.stringify(body, null, 2);
      } else {
        bodyEl.textContent = body;
      }

    } catch (err) {
      const elapsed = (performance.now() - startTime).toFixed(0);
      statusEl.innerHTML = `<span class="sim-status-code sim-err">Error</span>`;
      durationEl.textContent = `${elapsed}ms`;
      bodyEl.textContent = `Gagal mengirim request:\n${err.message}\n\nKemungkinan penyebab:\n• Koneksi jaringan bermasalah\n• CORS tidak diizinkan oleh server\n• URL tidak valid`;
    } finally {
      sendBtn.disabled = false;
      sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Request';
    }
  });

  // Copy button
  copyBtn.addEventListener("click", () => {
    const text = bodyEl.textContent;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
      setTimeout(() => { copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i>'; }, 1500);
    }).catch(() => {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
      setTimeout(() => { copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i>'; }, 1500);
    });
  });
}
function buildFilterSummary() {
  const groups = [
    ["Tipe Buku",    ["type_pdf", "type_audio", "type_interactive"]],
    ["Jenjang",      ["level_sd", "level_smp", "level_sma", "level_sdlb"]],
    ["Kelas",        Array.from({length:12}, (_,i) => `class_${i+1}`)],
    ["Mata Pelajaran", ["subject_ipa","subject_ips","subject_ipas","subject_indonesia","subject_inggris","subject_matematika","subject_informatika","subject_pjok","subject_ppkn","subject_agama","subject_sejarah","subject_seni_rupa","subject_seni_tari","subject_seni_musik","subject_seni_teater"]],
  ];

  return groups.map(([title, fields]) => {
    const pills = fields.map(f => `<code style="font-size:.75rem">${f}</code>`).join(" ");
    return `<div style="margin-top:4px;"><strong>${title}:</strong> ${pills}</div>`;
  }).join("");
}

/* ── Glossary ──────────────────────────────────────── */
function renderGlossary() {
  const main = document.getElementById("mainContent");
  let html = `
    <h2 class="page-title"><i class="fa-solid fa-clipboard-list"></i> Glosarium Field</h2>
    <p class="page-subtitle">Penjelasan setiap field/parameter yang digunakan di API ini.</p>
  `;

  FIELD_GLOSSARY.forEach(group => {
    html += `
      <h3 style="margin-top:20px;">${group.group}</h3>
      <div class="glossary-grid">
        ${group.fields.map(f => `
          <div class="glossary-card">
            <div class="field-name">${f.name}</div>
            <span class="tag tag-${f.type}" style="margin-bottom:4px;">${f.type}</span>
            <div class="field-desc">${f.desc}</div>
          </div>
        `).join("")}
      </div>
    `;
  });

  main.innerHTML = html;

  const section = document.getElementById("welcomeSection");
  section.classList.add("active");
}
