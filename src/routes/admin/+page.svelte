<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { categoryLabels, categoryColors } from '$lib/data/categories.js';

  let { data }: { data: PageData } = $props();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bonjour' : hour < 19 ? 'Bon après-midi' : 'Bonsoir';

  /* ── Counter animation ── */
  let displayTotal     = $state(0);
  let displayPublished = $state(0);
  let displayDrafts    = $state(0);
  let displayMessages  = $state(0);

  function countUp(target: number, setter: (v: number) => void, duration = 900, delay = 0) {
    setTimeout(() => {
      if (target === 0) { setter(0); return; }
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setter(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
  }

  onMount(() => {
    countUp(data.total,          v => { displayTotal     = v; }, 900, 350);
    countUp(data.published,      v => { displayPublished = v; }, 900, 480);
    countUp(data.drafts,         v => { displayDrafts    = v; }, 900, 610);
    countUp(data.unreadMessages, v => { displayMessages  = v; }, 900, 740);
  });
</script>

<svelte:head><title>Tableau de bord — Admin EJB</title></svelte:head>

<!-- ── En-tête ──────────────────────────────────────── -->
<div class="page-top">
  <div class="top-left">
    <p class="top-greeting">{greeting} 👋</p>
    <h1 class="top-title">Tableau de bord</h1>
    <div class="title-line" aria-hidden="true"></div>
  </div>
  <a href="/admin/evenements/nouveau" class="cta-btn">
    <span class="cta-icon" aria-hidden="true">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    </span>
    Nouvel événement
  </a>
</div>

<!-- ── KPI cards ─────────────────────────────────────── -->
<div class="kpi-row">
  <div class="kpi-card kpi-card--green">
    <div class="kpi-glow kpi-glow--green" aria-hidden="true"></div>
    <div class="kpi-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    </div>
    <div class="kpi-body">
      <span class="kpi-num">{displayTotal}</span>
      <span class="kpi-label">Événements</span>
    </div>
    <div class="kpi-spark" aria-hidden="true">
      <svg width="52" height="30" viewBox="0 0 52 30" fill="none">
        <polyline class="spark-fill" points="0,26 10,20 20,15 32,9 52,2 52,30 0,30" fill="rgba(34,197,94,0.08)"/>
        <polyline class="spark-line" points="0,26 10,20 20,15 32,9 52,2" stroke="#22C55E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </svg>
    </div>
  </div>

  <div class="kpi-card kpi-card--blue">
    <div class="kpi-glow kpi-glow--blue" aria-hidden="true"></div>
    <div class="kpi-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    </div>
    <div class="kpi-body">
      <span class="kpi-num">{displayPublished}</span>
      <span class="kpi-label">En ligne</span>
    </div>
    <span class="kpi-chip">Actif</span>
  </div>

  <div class="kpi-card kpi-card--amber">
    <div class="kpi-glow kpi-glow--amber" aria-hidden="true"></div>
    <div class="kpi-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
    </div>
    <div class="kpi-body">
      <span class="kpi-num">{displayDrafts}</span>
      <span class="kpi-label">Brouillons</span>
    </div>
  </div>

  <a href="/admin/messages" class="kpi-card kpi-card--purple" style="text-decoration:none">
    <div class="kpi-glow kpi-glow--purple" aria-hidden="true"></div>
    <div class="kpi-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    </div>
    <div class="kpi-body">
      <span class="kpi-num">{displayMessages}</span>
      <span class="kpi-label">Non lus</span>
    </div>
    {#if data.unreadMessages > 0}
      <span class="kpi-chip kpi-chip--purple">Nouveau</span>
    {/if}
  </a>
</div>

<!-- ── Feed événements récents ──────────────────────── -->
<div class="card">
  <div class="card-head">
    <div class="card-head-left">
      <span class="card-dot" aria-hidden="true"></span>
      <h2 class="card-title">Événements récents</h2>
    </div>
    <a href="/admin/evenements" class="card-link">
      Voir tout
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
    </a>
  </div>

  {#if data.recent.length === 0}
    <div class="empty">
      <div class="empty-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      </div>
      <p>Aucun événement pour l'instant.</p>
      <a href="/admin/evenements/nouveau" class="empty-cta">Créer le premier →</a>
    </div>
  {:else}
    {#each data.recent as ev, i}
      <div class="ev-row" style="--delay:{i * 60}ms">
        <div class="ev-thumb">
          {#if ev.images.length > 0}
            <img src={ev.images[0]} alt="" />
          {:else}
            <div class="ev-thumb-ph" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </div>
          {/if}
        </div>
        <div class="ev-info">
          <a href="/admin/evenements/{ev.id}" class="ev-title">{ev.title}</a>
          <div class="ev-meta">
            <span style="color:{categoryColors[ev.category]}">{categoryLabels[ev.category]}</span>
            <span class="sep">·</span>
            <time datetime={ev.date}>{new Date(ev.date).toLocaleDateString('fr-FR',{day:'numeric',month:'short',year:'numeric'})}</time>
            <span class="sep">·</span>
            <span>{ev.images.length} img</span>
          </div>
        </div>
        <span class="ev-badge" class:ev-badge--live={ev.published}>
          {#if ev.published}<span class="badge-dot" aria-hidden="true"></span>{/if}
          {ev.published ? 'Publié' : 'Brouillon'}
        </span>
        <div class="ev-actions">
          <a href="/admin/evenements/{ev.id}" class="icon-btn" aria-label="Modifier">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </a>
          {#if ev.published}
            <a href="/evenements/{ev.id}" target="_blank" class="icon-btn icon-btn--green" aria-label="Voir en ligne">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          {/if}
        </div>
      </div>
    {/each}
  {/if}
</div>

<!-- ── Raccourcis ───────────────────────────────────── -->
<div class="shortcuts">
  <a href="/admin/evenements/nouveau" class="shortcut shortcut--primary">
    <div class="shortcut-icon">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
    </div>
    <div class="shortcut-text">
      <strong>Créer un événement</strong>
      <span>Avec photos + description</span>
    </div>
    <svg class="shortcut-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
  </a>

  <a href="/evenements" target="_blank" rel="noopener" class="shortcut">
    <div class="shortcut-icon shortcut-icon--blue">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    </div>
    <div class="shortcut-text">
      <strong>Page publique</strong>
      <span>Événements en ligne</span>
    </div>
    <svg class="shortcut-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
  </a>

  <a href="/" target="_blank" rel="noopener" class="shortcut">
    <div class="shortcut-icon shortcut-icon--amber">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    </div>
    <div class="shortcut-text">
      <strong>Site principal</strong>
      <span>Accueil EJB</span>
    </div>
    <svg class="shortcut-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
  </a>
</div>

<style>
/* ── Animations ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes sparkDraw {
  from { stroke-dashoffset: 200; }
  to   { stroke-dashoffset: 0; }
}
@keyframes sparkFill {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes kpiGlowPulse {
  0%,100% { opacity: 0.3; transform: scale(1); }
  50%     { opacity: 0.55; transform: scale(1.12); }
}

/* ── Top ── */
.page-top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  animation: fadeUp 0.45s ease-out both;
  animation-delay: 0.05s;
}
.top-greeting {
  font-size: 0.8125rem;
  color: rgba(255,255,255,0.35);
  margin-bottom: 0.3rem;
  font-weight: 500;
}
.top-title {
  font-size: 1.875rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.025em;
  line-height: 1;
  margin-bottom: 0.5rem;
}
.title-line {
  width: 40px;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, #22C55E, transparent);
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.65rem 1.3rem;
  background: #22C55E;
  color: #052e16;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 200ms ease;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}
.cta-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 200ms;
}
.cta-btn:hover {
  background: #16a34a;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(34,197,94,0.38), 0 2px 8px rgba(0,0,0,0.3);
}
.cta-btn:hover::before { opacity: 1; }
.cta-btn:active { transform: translateY(0); }
.cta-icon { display: flex; align-items: center; }

/* ── KPI ── */
.kpi-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.875rem;
  margin-bottom: 1.5rem;
}

.kpi-card {
  background: rgba(22,42,28,0.97);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 1rem;
  padding: 1.375rem;
  display: flex;
  align-items: center;
  gap: 0.875rem;
  position: relative;
  overflow: hidden;
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
  animation: fadeUp 0.45s ease-out both;
}
.kpi-card:nth-child(1) { animation-delay: 0.18s; }
.kpi-card:nth-child(2) { animation-delay: 0.26s; }
.kpi-card:nth-child(3) { animation-delay: 0.34s; }

.kpi-card:hover {
  transform: translateY(-3px);
}
.kpi-card--green  { border-top: 2px solid rgba(34,197,94,0.7); }
.kpi-card--blue   { border-top: 2px solid rgba(56,189,248,0.7); }
.kpi-card--amber  { border-top: 2px solid rgba(251,191,36,0.7); }
.kpi-card--purple { border-top: 2px solid rgba(168,85,247,0.7); cursor: pointer; }

.kpi-card--green:hover  { box-shadow: 0 8px 32px rgba(34,197,94,0.18), 0 0 0 1px rgba(34,197,94,0.15); border-top-color: #22C55E; }
.kpi-card--blue:hover   { box-shadow: 0 8px 32px rgba(56,189,248,0.15), 0 0 0 1px rgba(56,189,248,0.12); border-top-color: #38BDF8; }
.kpi-card--amber:hover  { box-shadow: 0 8px 32px rgba(251,191,36,0.15), 0 0 0 1px rgba(251,191,36,0.12); border-top-color: #FBBF24; }
.kpi-card--purple:hover { box-shadow: 0 8px 32px rgba(168,85,247,0.18), 0 0 0 1px rgba(168,85,247,0.15); border-top-color: #a855f7; }

/* Inner ambient glow */
.kpi-glow {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  top: -40px;
  right: -20px;
  pointer-events: none;
  animation: kpiGlowPulse 4s ease-in-out infinite;
}
.kpi-glow--green  { background: radial-gradient(circle, rgba(34,197,94,0.18), transparent 70%); }
.kpi-glow--blue   { background: radial-gradient(circle, rgba(56,189,248,0.15), transparent 70%); }
.kpi-glow--amber  { background: radial-gradient(circle, rgba(251,191,36,0.14), transparent 70%); }
.kpi-glow--purple { background: radial-gradient(circle, rgba(168,85,247,0.18), transparent 70%); }

.kpi-icon {
  width: 44px; height: 44px;
  border-radius: 0.75rem;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}
.kpi-card--green  .kpi-icon { background: rgba(34,197,94,0.12);  color: #22C55E; box-shadow: 0 0 0 1px rgba(34,197,94,0.2); }
.kpi-card--blue   .kpi-icon { background: rgba(56,189,248,0.12);  color: #38BDF8; box-shadow: 0 0 0 1px rgba(56,189,248,0.2); }
.kpi-card--amber  .kpi-icon { background: rgba(251,191,36,0.12);  color: #FBBF24; box-shadow: 0 0 0 1px rgba(251,191,36,0.2); }
.kpi-card--purple .kpi-icon { background: rgba(168,85,247,0.12);  color: #c084fc; box-shadow: 0 0 0 1px rgba(168,85,247,0.2); }

.kpi-num {
  display: block;
  font-size: 2.375rem;
  font-weight: 800;
  color: #fff;
  line-height: 1;
  letter-spacing: -0.04em;
  font-family: 'Cormorant Garamond', Georgia, serif;
  position: relative;
  z-index: 1;
}
.kpi-label {
  display: block;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.35);
  margin-top: 4px;
  font-weight: 500;
  position: relative;
  z-index: 1;
}

.kpi-spark {
  margin-left: auto;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}
.spark-line {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: sparkDraw 1.2s ease-out 0.7s both;
}
.spark-fill {
  animation: sparkFill 0.8s ease-out 1.2s both;
  opacity: 0;
}

.kpi-chip {
  margin-left: auto;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #22C55E;
  background: rgba(34,197,94,0.1);
  border: 1px solid rgba(34,197,94,0.22);
  border-radius: 100px;
  padding: 3px 10px;
  position: relative;
  z-index: 1;
}
.kpi-chip--purple {
  color: #d8b4fe;
  background: rgba(168,85,247,0.12);
  border-color: rgba(168,85,247,0.28);
  animation: chipPulse 2s ease-in-out infinite;
}
@keyframes chipPulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(168,85,247,0.3); }
  50%     { box-shadow: 0 0 0 4px rgba(168,85,247,0.05); }
}

/* ── Card ── */
.card {
  background: rgba(22,42,28,0.97);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
  animation: fadeUp 0.45s ease-out 0.42s both;
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.375rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.card-head-left { display: flex; align-items: center; gap: 0.5rem; }
.card-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #22C55E;
  box-shadow: 0 0 6px rgba(34,197,94,0.7);
  animation: livePulse 2.2s ease-in-out infinite;
}
@keyframes livePulse {
  0%,100% { box-shadow: 0 0 6px rgba(34,197,94,0.7); }
  50%     { box-shadow: 0 0 12px rgba(34,197,94,0.3); }
}
.card-title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #fff;
}
.card-link {
  font-size: 0.8125rem;
  color: #22C55E;
  text-decoration: none;
  opacity: 0.75;
  transition: opacity 150ms, gap 150ms;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}
.card-link:hover { opacity: 1; gap: 0.4rem; }

/* Empty */
.empty {
  padding: 3.5rem 1.5rem;
  text-align: center;
  color: rgba(255,255,255,0.28);
}
.empty-icon {
  width: 64px; height: 64px;
  border-radius: 50%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1rem;
  animation: emptyPulse 3s ease-in-out infinite;
}
@keyframes emptyPulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.04); }
  50%     { box-shadow: 0 0 0 8px rgba(255,255,255,0.01); }
}
.empty p { font-size: 0.875rem; margin-bottom: 1rem; }
.empty-cta {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #22C55E;
  text-decoration: none;
  transition: opacity 150ms;
}
.empty-cta:hover { opacity: 0.8; }

/* Rows */
.ev-row {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.875rem 1.375rem;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  transition: background 150ms ease;
  animation: fadeUp 0.4s ease-out both;
  animation-delay: calc(0.5s + var(--delay, 0ms));
  position: relative;
}
.ev-row::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #22C55E;
  transform: scaleY(0);
  transform-origin: center;
  transition: transform 200ms ease;
  border-radius: 0 2px 2px 0;
}
.ev-row:last-child { border-bottom: none; }
.ev-row:hover { background: rgba(255,255,255,0.028); }
.ev-row:hover::before { transform: scaleY(0.7); }

.ev-thumb {
  width: 50px; height: 42px;
  border-radius: 0.5rem;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
.ev-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform 300ms ease; }
.ev-row:hover .ev-thumb img { transform: scale(1.06); }
.ev-thumb-ph {
  width: 100%; height: 100%;
  background: rgba(255,255,255,0.04);
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.2);
}

.ev-info { flex: 1; min-width: 0; }
.ev-title {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 3px;
  transition: color 140ms;
}
.ev-title:hover { color: #22C55E; }
.ev-meta {
  font-size: 0.6875rem;
  color: rgba(255,255,255,0.28);
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
.sep { opacity: 0.3; }

.ev-badge {
  flex-shrink: 0;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 3px 9px;
  border-radius: 100px;
  background: rgba(251,191,36,0.08);
  color: #FBBF24;
  border: 1px solid rgba(251,191,36,0.18);
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
.ev-badge--live {
  background: rgba(34,197,94,0.08);
  color: #22C55E;
  border-color: rgba(34,197,94,0.2);
}
.badge-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #22C55E;
  box-shadow: 0 0 5px rgba(34,197,94,0.7);
  animation: livePulse 2s ease-in-out infinite;
}

.ev-actions { display: flex; gap: 4px; flex-shrink: 0; }
.icon-btn {
  width: 30px; height: 30px;
  border-radius: 0.375rem;
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.28);
  text-decoration: none;
  transition: all 150ms ease;
}
.icon-btn:hover { background: rgba(255,255,255,0.08); color: #fff; }
.icon-btn--green { color: rgba(34,197,94,0.4); }
.icon-btn--green:hover { background: rgba(34,197,94,0.1); color: #22C55E; }

/* ── Shortcuts ── */
.shortcuts {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: fadeUp 0.45s ease-out 0.6s both;
}

.shortcut {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: rgba(22,42,28,0.97);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 0.875rem;
  text-decoration: none;
  transition: all 220ms ease;
  position: relative;
  overflow: hidden;
}
.shortcut::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
  transform: translateX(-100%);
  transition: transform 450ms ease;
}
.shortcut:hover::after { transform: translateX(100%); }
.shortcut:hover {
  background: rgba(26,50,32,0.99);
  border-color: rgba(255,255,255,0.12);
  transform: translateX(5px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.25);
}
.shortcut--primary { border-color: rgba(34,197,94,0.18); }
.shortcut--primary:hover {
  background: rgba(34,197,94,0.06);
  border-color: rgba(34,197,94,0.32);
  box-shadow: 0 4px 20px rgba(34,197,94,0.1);
}

.shortcut-icon {
  width: 42px; height: 42px;
  border-radius: 0.75rem;
  background: rgba(34,197,94,0.1);
  color: #22C55E;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 0 1px rgba(34,197,94,0.18);
  transition: transform 220ms ease, box-shadow 220ms ease;
}
.shortcut:hover .shortcut-icon { transform: scale(1.08); box-shadow: 0 0 12px rgba(34,197,94,0.25); }

.shortcut-icon--blue  { background: rgba(56,189,248,0.1);  color: #38BDF8; box-shadow: 0 0 0 1px rgba(56,189,248,0.18); }
.shortcut:hover .shortcut-icon--blue  { box-shadow: 0 0 12px rgba(56,189,248,0.22); }
.shortcut-icon--amber { background: rgba(251,191,36,0.1);  color: #FBBF24; box-shadow: 0 0 0 1px rgba(251,191,36,0.18); }
.shortcut:hover .shortcut-icon--amber { box-shadow: 0 0 12px rgba(251,191,36,0.2); }

.shortcut-text strong {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 2px;
}
.shortcut-text span {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.32);
}

.shortcut-arrow {
  margin-left: auto;
  color: rgba(255,255,255,0.18);
  flex-shrink: 0;
  transition: color 200ms ease, transform 200ms ease;
}
.shortcut:hover .shortcut-arrow {
  color: rgba(255,255,255,0.55);
  transform: translateX(4px);
}

@media (prefers-reduced-motion: reduce) {
  .kpi-card, .page-top, .card, .shortcuts, .ev-row { animation: none; }
  .spark-line { animation: none; stroke-dashoffset: 0; }
  .spark-fill { animation: none; opacity: 1; }
  .kpi-glow { animation: none; }
  .card-dot, .badge-dot { animation: none; }
}

@media (max-width: 900px) {
  .kpi-row { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 400px) {
  .kpi-row { grid-template-columns: 1fr; }
}
</style>
