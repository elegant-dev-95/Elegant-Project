/*
 * Elegant Group IT Asset Control – front-end logic (no framework, no build step).
 * Each page sets <body data-page="..."> and the matching init function runs.
 */
(function () {
  'use strict';

  const D = window.DATA;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const taka = (n) => '৳' + Number(n).toLocaleString('en-IN');
  const num = (n) => Number(n).toLocaleString('en-IN');
  const levelClass = { High: 'pill-high', Medium: 'pill-med', Low: 'pill-low' };
  const daysClass = (d) => (d <= 15 ? 'pill-high' : d <= 30 ? 'pill-med' : 'pill-low');

  /* ---------- App shell: sidebar + mobile menu ---------- */
  const NAV = [
    { id: 'dashboard', label: 'Dashboard', href: 'index.html', d: 'M3 13h8V3H3zM13 21h8V11h-8zM3 21h8v-6H3zM13 3v6h8V3z' },
    { id: 'assets', label: 'Assets', href: 'assets.html', d: 'M4 7l8-4 8 4-8 4zM4 7v10l8 4 8-4V7M12 11v10' },
    { id: 'assignments', label: 'Assignments', href: '#', d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.9' },
    { id: 'service', label: 'Service tickets', href: '#', d: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z' },
    { id: 'expenses', label: 'Expenses', href: '#', d: 'M4 4h16v16H4zM8 9h8M8 13h8M8 17h5' },
    { id: 'subscriptions', label: 'Subscriptions', href: 'subscriptions.html', d: 'M21 12a9 9 0 1 1-3-6.7M21 4v5h-5' },
    { id: 'vendors', label: 'Vendors', href: '#', d: 'M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6' },
    { id: 'budget', label: 'Budget', href: '#', d: 'M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
    { id: 'onboarding', label: 'Onboarding', href: '#', d: 'M16 11l2 2 4-4M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M2 21v-2a4 4 0 0 1 4-4h6' },
    { id: 'reports', label: 'Reports', href: '#', d: 'M4 20V10M10 20V4M16 20v-7M22 20H2' },
    { id: 'settings', label: 'Settings', href: '#', d: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z' }
  ];
  const icon = (d, size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;

  function renderShell() {
    const sidebar = $('#sidebar');
    if (!sidebar) return;
    const active = document.body.dataset.nav;
    sidebar.innerHTML = `
      <div class="brand"><div class="brand-mark">EG</div><div><span class="brand-name">Elegant Group</span><span class="brand-sub">IT Asset Control</span></div></div>
      <nav class="nav" aria-label="Main">
        ${NAV.map((n) => `<a href="${n.href}" class="${n.id === active ? 'active' : ''}"${n.id === active ? ' aria-current="page"' : ''}>${icon(n.d)}<span>${n.label}</span></a>`).join('')}
      </nav>
      <div class="user-box">Signed in as<strong>IT Manager, Head Office</strong></div>`;

    const bar = document.createElement('div');
    bar.className = 'mobile-bar';
    bar.innerHTML = `<div class="brand"><div class="brand-mark">EG</div><span class="brand-name">IT Asset Control</span></div>
      <button type="button" aria-label="Open menu" aria-expanded="false" aria-controls="sidebar">${icon('M3 6h18M3 12h18M3 18h18', 22)}</button>`;
    const scrim = document.createElement('div');
    scrim.className = 'scrim';
    document.body.prepend(scrim);
    document.body.prepend(bar);
    const btn = $('button', bar);
    const toggle = (open) => {
      sidebar.classList.toggle('open', open);
      scrim.classList.toggle('show', open);
      btn.setAttribute('aria-expanded', String(open));
    };
    btn.addEventListener('click', () => toggle(!sidebar.classList.contains('open')));
    scrim.addEventListener('click', () => toggle(false));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggle(false); });
  }

  /* ---------- Charts (plain SVG) ---------- */
  function lineChart(el, { labels, values, budget }) {
    const W = 600, H = 220, pl = 36, pr = 16, pt = 16, pb = 28, n = values.length;
    const lo = Math.floor(Math.min(...values, budget) / 2) * 2 - 2;
    const hi = Math.ceil(Math.max(...values, budget) / 2) * 2 + 1;
    const x = (i) => pl + (i * (W - pl - pr)) / (n - 1);
    const y = (v) => pt + (H - pt - pb) * (1 - (v - lo) / (hi - lo));
    const ticks = 4;
    let grid = '';
    for (let k = 0; k <= ticks; k++) {
      const v = lo + ((hi - lo) * k) / ticks;
      grid += `<line x1="${pl}" x2="${W - pr}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}" stroke="#E2E6ED"/>
        <text x="${pl - 8}" y="${(y(v) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#5A6478">${v.toFixed(0)}</text>`;
    }
    const pts = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`);
    const area = `M${x(0)},${y(lo)} L${pts.join(' L')} L${x(n - 1)},${y(lo)} Z`;
    const dots = values.map((v, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="${v > budget ? 4.5 : 3.5}" fill="${v > budget ? '#B42318' : '#1E5AA8'}"><title>${labels[i]}: ৳${v} L</title></circle>`).join('');
    const xl = labels.map((l, i) => `<text x="${x(i).toFixed(1)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="#5A6478">${l}</text>`).join('');
    const last = values[n - 1];
    el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Monthly IT spend from ৳${values[0]} L to ৳${last} L against a ৳${budget} L budget">
      ${grid}
      <path d="${area}" fill="#1E5AA8" opacity="0.1"/>
      <line x1="${pl}" x2="${W - pr}" y1="${y(budget)}" y2="${y(budget)}" stroke="#B26A00" stroke-width="1.5" stroke-dasharray="6 4"/>
      <text x="${W - pr}" y="${y(budget) - 6}" text-anchor="end" font-size="11" fill="#8A5200">Budget ৳${budget} L</text>
      <polyline points="${pts.join(' ')}" fill="none" stroke="#1E5AA8" stroke-width="2.5" stroke-linejoin="round"/>
      ${dots}${xl}
      <text x="${x(n - 1) - 10}" y="${y(last) - 10}" text-anchor="end" font-size="12" font-weight="600" fill="#172033">৳${last} L</text>
    </svg>`;
  }

  function donut(el, items, centerLabel, subLabel) {
    const total = items.reduce((s, r) => s + r[1], 0);
    const r = 52, C = 2 * Math.PI * r;
    let acc = 0;
    const segs = items.map(([label, v, color]) => {
      const len = (v / total) * C;
      const s = `<circle cx="70" cy="70" r="${r}" stroke="${color}" stroke-dasharray="${len.toFixed(2)} ${(C - len).toFixed(2)}" stroke-dashoffset="${(-acc).toFixed(2)}"><title>${esc(label)}: ${num(v)}</title></circle>`;
      acc += len;
      return s;
    }).join('');
    el.innerHTML = `<div class="donut-wrap">
      <svg viewBox="0 0 140 140" role="img" aria-label="${num(total)} ${subLabel} by category">
        <g transform="rotate(-90 70 70)" fill="none" stroke-width="18">${segs}</g>
        <text x="70" y="70" text-anchor="middle" font-size="20" font-weight="600" fill="#172033">${centerLabel || num(total)}</text>
        <text x="70" y="88" text-anchor="middle" font-size="11" fill="#5A6478">${subLabel}</text>
      </svg>
      <ul class="legend">${items.map(([label, v, color]) => `<li><span class="swatch" style="background:${color}"></span><span>${esc(label)}</span><b>${num(v)}</b><em>${Math.round((v / total) * 100)}%</em></li>`).join('')}</ul>
    </div>`;
  }

  function hbars(el, items, fmt) {
    const max = Math.max(...items.map((r) => r[1]));
    el.innerHTML = items.map(([label, v]) => `<div class="hbar"><span class="label" title="${esc(label)}">${esc(label)}</span><span class="track"><span style="width:${((v / max) * 100).toFixed(1)}%"></span></span><span class="value">${fmt(v)}</span></div>`).join('');
  }

  function stackBar(el, legendEl, items) {
    const total = items.reduce((s, r) => s + r[1], 0);
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', items.map(([l, v]) => `${l} ${Math.round((v / total) * 100)}%`).join(', '));
    el.innerHTML = items.map(([label, v, color]) => `<span style="width:${((v / total) * 100).toFixed(2)}%;background:${color}" title="${esc(label)}: ${num(v)}"></span>`).join('');
    legendEl.innerHTML = items.map(([label, v, color]) => `<span><span class="swatch" style="background:${color}"></span>${esc(label)} <b>${num(v)}</b></span>`).join('');
  }

  function gauge(el, { value, target }) {
    const r = 70, cx = 90, cy = 92, L = Math.PI * r;
    const th = Math.PI * (1 - target / 100);
    const p = (rad) => [(cx + rad * Math.cos(th)).toFixed(1), (cy - rad * Math.sin(th)).toFixed(1)];
    const [x1, y1] = p(r - 10), [x2, y2] = p(r + 10);
    const color = value >= target ? '#1F8A7A' : value >= target - 15 ? '#C98A1B' : '#B42318';
    el.innerHTML = `<svg viewBox="0 0 180 110" role="img" aria-label="${value}% verified on schedule, target ${target}%">
      <path d="M20 92 A70 70 0 0 1 160 92" fill="none" stroke="#EEF1F5" stroke-width="16" stroke-linecap="round"/>
      <path d="M20 92 A70 70 0 0 1 160 92" fill="none" stroke="${color}" stroke-width="16" stroke-linecap="round" stroke-dasharray="${((L * value) / 100).toFixed(1)} 400"/>
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#172033" stroke-width="2"/>
      <text x="90" y="84" text-anchor="middle" font-size="28" font-weight="600" fill="#172033">${value}%</text>
      <text x="90" y="104" text-anchor="middle" font-size="11" fill="#5A6478">Target ${target}%</text>
    </svg>`;
  }

  function depreciationChart(el, { cost, bookValue, startYear, lifeYears, elapsedYears }) {
    const W = 320, H = 160, pl = 30, pr = 10, top = 20, bottom = 130;
    const x = (yrs) => pl + ((W - pl - pr) * yrs) / lifeYears;
    const y = (v) => bottom - ((bottom - top) * v) / cost;
    const nx = x(elapsedYears), ny = y(bookValue);
    const mid = startYear + lifeYears / 2;
    el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Straight-line depreciation from ${taka(cost)} in ${startYear} to zero in ${startYear + lifeYears}; ${taka(bookValue)} today">
      <g stroke="#EEF1F5"><line x1="${pl}" x2="${W - pr}" y1="${top}" y2="${top}"/><line x1="${pl}" x2="${W - pr}" y1="${(top + bottom) / 2}" y2="${(top + bottom) / 2}"/><line x1="${pl}" x2="${W - pr}" y1="${bottom}" y2="${bottom}"/></g>
      <line x1="${pl}" y1="${top}" x2="${nx.toFixed(1)}" y2="${ny.toFixed(1)}" stroke="#1E5AA8" stroke-width="2.5"/>
      <line x1="${nx.toFixed(1)}" y1="${ny.toFixed(1)}" x2="${W - pr}" y2="${bottom}" stroke="#1E5AA8" stroke-width="2" stroke-dasharray="5 4" opacity="0.6"/>
      <circle cx="${nx.toFixed(1)}" cy="${ny.toFixed(1)}" r="5" fill="#1E5AA8"/>
      <text x="${nx.toFixed(1)}" y="${(ny - 10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="#172033">Today</text>
      <g font-size="11" fill="#5A6478"><text x="${pl}" y="150" text-anchor="middle">${startYear}</text><text x="${x(lifeYears / 2)}" y="150" text-anchor="middle">${mid}</text><text x="${W - pr}" y="150" text-anchor="end">${startYear + lifeYears}</text></g>
    </svg>`;
  }

  /* ---------- Pages ---------- */
  const pages = {
    dashboard() {
      const d = D.dashboard;
      $('#kpis').innerHTML = d.kpis.map((k) => `<div class="kpi"><span class="kpi-label">${esc(k.label)}</span><span class="kpi-value">${esc(k.value)}</span><span class="kpi-note ${k.tone}">${esc(k.note)}</span></div>`).join('');
      lineChart($('#spendChart'), d.monthlySpend);
      hbars($('#concernBars'), d.spendByConcern, (v) => `৳${v.toFixed(1)} L`);
      donut($('#categoryDonut'), d.assetsByCategory, null, 'assets');
      stackBar($('#lifecycleBar'), $('#lifecycleLegend'), d.lifecycle);
      gauge($('#verificationGauge'), d.verification);
      $('#verificationNote').textContent = `${num(d.verification.verified)} of ${num(d.verification.total)} assets verified on schedule. Garments factory 2 is furthest behind.`;
      $('#alertCount').textContent = `${d.alerts.length} items`;
      $('#alerts').innerHTML = d.alerts.map((a) => `<li class="alert-item"><span class="pill ${levelClass[a.level]}">${a.level}</span><span class="alert-text"><strong>${esc(a.title)}</strong><span>${esc(a.detail)}</span></span><a href="${a.href}">${esc(a.action)}</a></li>`).join('');
      $('#renewals').innerHTML = d.renewals.map((r) => `<li class="renewal-item"><span><strong>${esc(r.name)}</strong><span class="sub">${esc(r.company)}</span></span><span class="num" style="font-weight:500">${esc(r.cost)}</span><span class="pill ${daysClass(r.days)}">${r.days} days</span></li>`).join('');
    },

    assets() {
      const state = { chip: new URLSearchParams(location.search).get('filter') || 'all', q: '', company: '', category: '', site: '' };
      const chips = [['all', 'All'], ['Assigned', 'Assigned'], ['In stock', 'In stock'], ['Under repair', 'Under repair'], ['warranty', 'Warranty ends in 30 days']];
      const statusClass = { Assigned: 'pill-ok', 'In stock': 'pill-low', 'Under repair': 'pill-med', Retired: 'pill-grey' };

      // Fill filter dropdowns from the data
      const fill = (sel, key) => {
        const values = [...new Set(D.assets.map((a) => a[key]))].sort();
        sel.insertAdjacentHTML('beforeend', values.map((v) => `<option>${esc(v)}</option>`).join(''));
      };
      fill($('#fCompany'), 'company');
      fill($('#fCategory'), 'category');
      fill($('#fSite'), 'site');

      const renderChips = () => {
        $('#chips').innerHTML = chips.map(([key, label]) => `<button type="button" class="chip" data-key="${key}" aria-pressed="${state.chip === key}">${label} <span class="count">${num(D.assetCounts[key])}</span></button>`).join('');
      };

      const matches = (a) => {
        if (state.chip === 'warranty' && !(a.warrantyDays >= 0 && a.warrantyDays <= 30)) return false;
        if (state.chip !== 'all' && state.chip !== 'warranty' && a.status !== state.chip) return false;
        if (state.company && a.company !== state.company) return false;
        if (state.category && a.category !== state.category) return false;
        if (state.site && a.site !== state.site) return false;
        if (state.q) {
          const hay = [a.tag, a.model, a.serial, a.person, a.dept].join(' ').toLowerCase();
          if (!hay.includes(state.q)) return false;
        }
        return true;
      };

      const warrantyCell = (a) => {
        if (a.warrantyDays < 0) return `<span class="bad-text">Expired</span>`;
        if (a.warrantyDays <= 30) return `<span class="warn-text">${esc(a.warranty)}, ${a.warrantyDays} days</span>`;
        return esc(a.warranty);
      };

      const renderTable = () => {
        const rows = D.assets.filter(matches);
        $('#assetRows').innerHTML = rows.map((a) => `<tr>
          <td><input type="checkbox" aria-label="Select ${a.tag}"></td>
          <td class="nowrap"><a href="asset-detail.html?tag=${encodeURIComponent(a.tag)}" class="num" style="font-weight:500">${a.tag}</a></td>
          <td><span class="cell-main">${esc(a.model)}</span><span class="cell-sub">${esc(a.category)}, SN ${esc(a.serial)}</span></td>
          <td>${esc(a.company)}</td>
          <td><span class="cell-main" style="font-weight:400">${esc(a.person)}</span><span class="cell-sub">${esc(a.dept)}</span></td>
          <td>${esc(a.site)}</td>
          <td><span class="pill ${statusClass[a.status] || 'pill-grey'}">${esc(a.status)}</span></td>
          <td class="nowrap">${warrantyCell(a)}</td>
          <td class="right num nowrap">${taka(a.value)}</td>
        </tr>`).join('');
        $('#emptyState').hidden = rows.length > 0;
        $('#resultCount').textContent = `Showing ${rows.length} of ${D.assets.length} sample assets (${num(D.assetCounts.all)} in the full register)`;
      };

      $('#chips').addEventListener('click', (e) => {
        const b = e.target.closest('.chip');
        if (!b) return;
        state.chip = b.dataset.key;
        renderChips();
        renderTable();
      });
      $('#fSearch').addEventListener('input', (e) => { state.q = e.target.value.trim().toLowerCase(); renderTable(); });
      $('#fCompany').addEventListener('change', (e) => { state.company = e.target.value; renderTable(); });
      $('#fCategory').addEventListener('change', (e) => { state.category = e.target.value; renderTable(); });
      $('#fSite').addEventListener('change', (e) => { state.site = e.target.value; renderTable(); });
      $('#selectAll').addEventListener('change', (e) => $$('#assetRows input[type=checkbox]').forEach((c) => { c.checked = e.target.checked; }));

      renderChips();
      renderTable();
    },

    assetDetail() {
      const d = D.assetDetail;
      $('#fieldGroups').innerHTML = d.groups.map((g) => `<section class="card"><h2 class="small">${esc(g.title)}</h2><dl class="fields">${g.items.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></section>`).join('');
      depreciationChart($('#deprChart'), d.depreciation);

      const total = d.tickets.reduce((s, t) => s + t.cost, 0);
      $('#ticketRows').innerHTML = d.tickets.map((t) => `<tr>
        <td class="nowrap" style="font-weight:500">${t.id}</td>
        <td class="nowrap">${t.date}</td>
        <td><span class="cell-main">${esc(t.issue)}</span><span class="cell-sub">Root cause: ${esc(t.cause)}</span></td>
        <td>${esc(t.vendor)}</td>
        <td>${esc(t.downtime)}</td>
        <td><span class="pill ${t.status === 'Completed' ? 'pill-ok' : 'pill-med'}">${esc(t.status)}</span></td>
        <td class="right num">${taka(t.cost)}</td></tr>`).join('');
      $('#ticketTotal').textContent = taka(total);

      $('#assignList').innerHTML = d.assignments.map((a) => `<li class="item"><span class="when">${esc(a.when)}</span><span class="what"><strong style="font-weight:500">${esc(a.who)}</strong><small>${esc(a.note)}</small></span></li>`).join('');
      $('#docList').innerHTML = d.documents.map((doc) => `<li class="doc-item">${icon('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6', 20)}<span class="name"><strong style="font-weight:500">${esc(doc.name)}</strong><small>${esc(doc.meta)}</small></span><a href="#">Download</a></li>`).join('');
      $('#logList').innerHTML = d.log.map((l) => `<li class="item"><span class="when">${esc(l.when)}</span><span class="what"><strong style="font-weight:500">${esc(l.who)}</strong> ${esc(l.what)}</span></li>`).join('');

      // Accessible tabs
      const tabs = $$('[role="tab"]');
      const select = (tab) => {
        tabs.forEach((t) => {
          const on = t === tab;
          t.setAttribute('aria-selected', String(on));
          t.tabIndex = on ? 0 : -1;
          $('#' + t.getAttribute('aria-controls')).hidden = !on;
        });
      };
      tabs.forEach((t, i) => {
        t.addEventListener('click', () => select(t));
        t.addEventListener('keydown', (e) => {
          if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
          const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
          select(next);
          next.focus();
        });
      });
      select(tabs[0]);
    },

    subscriptions() {
      const s = D.subscriptions;
      $('#windows').innerHTML = s.windows.map((w) => `<div class="window"><div class="window-head ${w.tone}"><span>${w.label}</span><span>${w.total}</span></div><ul>${w.items.map((i) => `<li><span><strong style="font-weight:500">${esc(i.name)}</strong><small>${esc(i.when)}</small></span><span class="nowrap" style="font-weight:500">${esc(i.cost)}</span></li>`).join('')}</ul></div>`).join('');

      let filter = 'all';
      const chips = [['all', 'All'], ['soon', 'Renewing in 30 days'], ['unused', 'Has unused seats']];
      const renderChips = () => {
        $('#subChips').innerHTML = chips.map(([k, l]) => `<button type="button" class="chip" data-key="${k}" aria-pressed="${filter === k}">${l}</button>`).join('');
      };
      const seatCell = (r) => {
        if (!r.seats) return '<span class="muted">Not seat-based</span>';
        const unused = r.seats - r.used, pct = (r.used / r.seats) * 100;
        return `<div class="seat"><div class="seat-top"><span>${num(r.used)} of ${num(r.seats)}</span><span class="${unused ? 'bad-text' : 'good-text'}">${unused ? unused + ' unused' : 'Fully used'}</span></div><span class="track"><span style="width:${pct.toFixed(1)}%;background:${pct < 90 ? '#C98A1B' : '#1F8A7A'}"></span></span></div>`;
      };
      const renderTable = () => {
        const rows = s.list.filter((r) => filter === 'all' || (filter === 'soon' ? r.days <= 30 : r.seats && r.seats > r.used));
        $('#subRows').innerHTML = rows.map((r) => `<tr>
          <td><span class="cell-main">${esc(r.name)}</span><span class="cell-sub">${esc(r.plan)}</span></td>
          <td>${esc(r.company)}</td>
          <td>${seatCell(r)}</td>
          <td>${esc(r.billing)}</td>
          <td class="right num">${taka(r.annual)}</td>
          <td class="nowrap"><span class="cell-main" style="font-weight:400">${esc(r.renews)}</span><span class="pill ${daysClass(r.days)}" style="margin-top:2px">in ${r.days} days</span></td>
          <td>${esc(r.auto)}</td></tr>`).join('');
      };
      $('#subChips').addEventListener('click', (e) => {
        const b = e.target.closest('.chip');
        if (!b) return;
        filter = b.dataset.key;
        renderChips();
        renderTable();
      });
      renderChips();
      renderTable();
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    renderShell();
    const page = document.body.dataset.page;
    if (pages[page]) pages[page]();
  });
})();
