<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { categoryLabels, categoryColors } from '$lib/data/categories.js';

  let { data }: { data: PageData } = $props();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bonjour' : hour < 19 ? 'Bon après-midi' : 'Bonsoir';

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
        setter(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
  }

  onMount(() => {
    countUp(data.total,          v => { displayTotal     = v; }, 900, 300);
    countUp(data.published,      v => { displayPublished = v; }, 900, 420);
    countUp(data.drafts,         v => { displayDrafts    = v; }, 900, 540);
    countUp(data.unreadMessages, v => { displayMessages  = v; }, 900, 660);
  });

  const typeLabels: Record<string, string> = {
    partenariat: 'Partenariat',
    benevole:    'Bénévolat',
    don:         'Don',
    presse:      'Presse',
    autre:       'Autre',
  };

  const pubRate = $derived(data.total > 0 ? Math.round((data.published / data.total) * 100) : 0);
</script>

<svelte:head><title>Tableau de bord — Admin EJB</title></svelte:head>

<!-- ── En-tête ──────────────────────────────────── -->
<div class="page-top">
  <div>
    <p class="greeting">{greeting} 👋</p>
    <h1 class="title">Tableau de bord</h1>
    <div class="title-bar"></div>
  </div>
  <a href="/admin/evenements/nouveau" class="cta-btn">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    Nouvel événement
  </a>
</div>

<!-- ── KPI ───────────────────────────────────────── -->
<div class="kpi-row">
  <div class="kpi kpi--green">
    <div class="kpi-glow kpi-glow--green"></div>
    <div class="kpi-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    </div>
    <div class="kpi-body">
      <span class="kpi-num">{displayTotal}</span>
      <span class="kpi-lbl">Total événements</span>
    </div>
    <svg class="kpi-spark" width="56" height="28" viewBox="0 0 56 28" fill="none">
      <polyline class="spark-fill" points="0,24 12,18 24,13 36,7 56,1 56,28 0,28" fill="rgba(34,197,94,0.08)"/>
      <polyline class="spark-line" points="0,24 12,18 24,13 36,7 56,1" stroke="#22C55E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>
  </div>

  <div class="kpi kpi--blue">
    <div class="kpi-glow kpi-glow--blue"></div>
    <div class="kpi-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    </div>
    <div class="kpi-body">
      <span class="kpi-num">{displayPublished}</span>
      <span class="kpi-lbl">Publiés en ligne</span>
    </div>
    <span class="kpi-chip kpi-chip--blue">Actif</span>
  </div>

  <div class="kpi kpi--amber">
    <div class="kpi-glow kpi-glow--amber"></div>
    <div class="kpi-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
    </div>
    <div class="kpi-body">
      <span class="kpi-num">{displayDrafts}</span>
      <span class="kpi-lbl">Brouillons</span>
    </div>
    {#if data.drafts > 0}
      <span class="kpi-chip kpi-chip--amber">À publier</span>
    {/if}
  </div>

  <a href="/admin/messages" class="kpi kpi--purple" style="text-decoration:none">
    <div class="kpi-glow kpi-glow--purple"></div>
    <div class="kpi-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    </div>
    <div class="kpi-body">
      <span class="kpi-num">{displayMessages}</span>
      <span class="kpi-lbl">Messages non lus</span>
    </div>
    {#if data.unreadMessages > 0}
      <span class="kpi-chip kpi-chip--purple">Nouveau</span>
    {/if}
  </a>
</div>

<!-- ── Grille principale ─────────────────────────── -->
<div class="content-grid">

  <!-- Colonne gauche : Événements récents -->
  <section class="card">
    <div class="card-head">
      <div class="card-head-left">
        <span class="card-dot"></span>
        <h2 class="card-title">Événements récents</h2>
        <span class="card-count">{data.total}</span>
      </div>
      <a href="/admin/evenements" class="card-link">
        Voir tout
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
      </a>
    </div>

    {#if data.recent.length === 0}
      <div class="empty">
        <div class="empty-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </div>
        <p>Aucun événement pour l'instant.</p>
        <a href="/admin/evenements/nouveau" class="empty-cta">Créer le premier →</a>
      </div>
    {:else}
      {#each data.recent as ev, i}
        <div class="ev-row" style="--d:{i * 55}ms">
          <div class="ev-thumb">
            {#if ev.images.length > 0}
              <img src={ev.images[0]} alt="" />
            {:else}
              <div class="ev-thumb-ph">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </div>
            {/if}
          </div>
          <div class="ev-info">
            <a href="/admin/evenements/{ev.id}" class="ev-title">{ev.title}</a>
            <div class="ev-meta">
              <span style="color:{categoryColors[ev.category]}">{categoryLabels[ev.category]}</span>
              <span class="sep">·</span>
              <time datetime={ev.date}>{new Date(ev.date).toLocaleDateString('fr-FR', { day:'numeric', month:'short', year:'numeric' })}</time>
            </div>
          </div>
          <span class="ev-badge" class:ev-badge--live={ev.published}>
            {#if ev.published}<span class="badge-dot"></span>{/if}
            {ev.published ? 'Publié' : 'Brouillon'}
          </span>
          <div class="ev-actions">
            <a href="/admin/evenements/{ev.id}" class="icon-btn" aria-label="Modifier">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </a>
            {#if ev.published}
              <a href="/evenements/{ev.id}" target="_blank" class="icon-btn icon-btn--green" aria-label="Voir en ligne">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            {/if}
          </div>
        </div>
      {/each}
    {/if}
  </section>

  <!-- Colonne droite -->
  <div class="right-col">

    <!-- Actions rapides -->
    <section class="card card--compact">
      <div class="card-head">
        <div class="card-head-left">
          <span class="card-dot card-dot--blue"></span>
          <h2 class="card-title">Actions rapides</h2>
        </div>
      </div>
      <div class="actions-grid">
        <a href="/admin/evenements/nouveau" class="action-card action-card--primary">
          <div class="action-icon action-icon--green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
          <span class="action-lbl">Créer un événement</span>
          <svg class="action-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        </a>
        <a href="/admin/evenements" class="action-card">
          <div class="action-icon action-icon--amber">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <span class="action-lbl">Gérer les événements</span>
          <svg class="action-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        </a>
        <a href="/admin/messages" class="action-card">
          <div class="action-icon action-icon--purple">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <span class="action-lbl">Voir les messages</span>
          {#if data.unreadMessages > 0}
            <span class="action-badge">{data.unreadMessages}</span>
          {:else}
            <svg class="action-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
          {/if}
        </a>
        <a href="/" target="_blank" rel="noopener" class="action-card">
          <div class="action-icon action-icon--blue">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </div>
          <span class="action-lbl">Voir le site public</span>
          <svg class="action-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      </div>
    </section>

    <!-- Derniers messages -->
    <section class="card card--compact">
      <div class="card-head">
        <div class="card-head-left">
          <span class="card-dot card-dot--purple"></span>
          <h2 class="card-title">Derniers messages</h2>
          {#if data.unreadMessages > 0}
            <span class="card-count card-count--purple">{data.unreadMessages} non lus</span>
          {/if}
        </div>
        <a href="/admin/messages" class="card-link">
          Voir tout
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
        </a>
      </div>

      {#if data.recentMessages.length === 0}
        <div class="empty empty--sm">
          <p>Aucun message reçu.</p>
        </div>
      {:else}
        {#each data.recentMessages as msg}
          <a href="/admin/messages" class="msg-row" class:msg-row--unread={!msg.read}>
            <div class="msg-avatar">{msg.name.charAt(0).toUpperCase()}</div>
            <div class="msg-info">
              <div class="msg-name">
                {msg.name}
                {#if !msg.read}<span class="msg-unread-dot"></span>{/if}
              </div>
              <div class="msg-sub">
                <span class="msg-type">{typeLabels[msg.type] ?? msg.type}</span>
                <span class="sep">·</span>
                <time>{new Date(msg.createdAt).toLocaleDateString('fr-FR', { day:'numeric', month:'short' })}</time>
              </div>
            </div>
            <svg class="msg-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
          </a>
        {/each}
      {/if}
    </section>

    <!-- Taux de publication -->
    <section class="card card--compact">
      <div class="card-head">
        <div class="card-head-left">
          <span class="card-dot card-dot--green"></span>
          <h2 class="card-title">Taux de publication</h2>
        </div>
      </div>
      <div class="stat-block">
        <div class="stat-row">
          <span class="stat-lbl">Publiés</span>
          <span class="stat-val stat-val--green">{data.published}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill progress-fill--green" style="width:{pubRate}%"></div>
        </div>
        <div class="stat-row" style="margin-top:0.75rem">
          <span class="stat-lbl">Brouillons</span>
          <span class="stat-val stat-val--amber">{data.drafts}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill progress-fill--amber" style="width:{data.total > 0 ? 100 - pubRate : 0}%"></div>
        </div>
        <p class="stat-note">{pubRate}% des événements sont en ligne</p>
      </div>
    </section>

  </div>
</div>

<style>
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes sparkDraw { from { stroke-dashoffset: 200; } to { stroke-dashoffset: 0; } }
@keyframes sparkFadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes glowPulse { 0%,100% { opacity: .3; transform: scale(1); } 50% { opacity: .5; transform: scale(1.1); } }
@keyframes livePulse { 0%,100% { box-shadow: 0 0 6px rgba(34,197,94,.7); } 50% { box-shadow: 0 0 12px rgba(34,197,94,.3); } }
@keyframes progressIn { from { width: 0 !important; } }

/* ── Page top ── */
.page-top {
  display: flex; align-items: flex-end; justify-content: space-between;
  gap: 1rem; margin-bottom: 1.75rem; flex-wrap: wrap;
  animation: fadeUp .4s ease-out both .05s;
}
.greeting { font-size: .8125rem; color: #6b7280; margin-bottom: .25rem; font-weight: 500; }
.title { font-size: 1.75rem; font-weight: 800; color: #111827; letter-spacing: -.025em; line-height: 1; margin-bottom: .4rem; }
.title-bar { width: 36px; height: 3px; border-radius: 2px; background: linear-gradient(90deg,#22C55E,transparent); }

.cta-btn {
  display: inline-flex; align-items: center; gap: .4rem;
  padding: .6rem 1.2rem;
  background: #22C55E; color: #052e16;
  border-radius: .5rem; font-size: .875rem; font-weight: 700;
  text-decoration: none; transition: all 200ms; white-space: nowrap;
}
.cta-btn:hover { background: #16a34a; color: #fff; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(34,197,94,.35); }
.cta-btn svg { flex-shrink: 0; }

/* ── KPI ── */
.kpi-row {
  display: grid; grid-template-columns: repeat(4,1fr);
  gap: .75rem; margin-bottom: 1.5rem;
}
.kpi {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: .875rem;
  padding: 1.125rem 1.25rem;
  display: flex; align-items: center; gap: .75rem;
  position: relative; overflow: hidden;
  transition: transform 220ms, box-shadow 220ms;
  animation: fadeUp .4s ease-out both;
  text-decoration: none;
}
.kpi:nth-child(1) { animation-delay: .15s; }
.kpi:nth-child(2) { animation-delay: .22s; }
.kpi:nth-child(3) { animation-delay: .29s; }
.kpi:nth-child(4) { animation-delay: .36s; }
.kpi:hover { transform: translateY(-3px); }

.kpi--green  { border-top: 2px solid rgba(34,197,94,.65); }
.kpi--blue   { border-top: 2px solid rgba(56,189,248,.65); }
.kpi--amber  { border-top: 2px solid rgba(251,191,36,.65); }
.kpi--purple { border-top: 2px solid rgba(168,85,247,.65); cursor: pointer; }
.kpi--green:hover  { box-shadow: 0 8px 28px rgba(34,197,94,.16); }
.kpi--blue:hover   { box-shadow: 0 8px 28px rgba(56,189,248,.14); }
.kpi--amber:hover  { box-shadow: 0 8px 28px rgba(251,191,36,.14); }
.kpi--purple:hover { box-shadow: 0 8px 28px rgba(168,85,247,.16); }

.kpi-glow {
  position: absolute; width: 110px; height: 110px; border-radius: 50%;
  top: -35px; right: -18px; pointer-events: none;
  animation: glowPulse 4s ease-in-out infinite;
}
.kpi-glow--green  { background: radial-gradient(circle,rgba(34,197,94,.16),transparent 70%); }
.kpi-glow--blue   { background: radial-gradient(circle,rgba(56,189,248,.14),transparent 70%); }
.kpi-glow--amber  { background: radial-gradient(circle,rgba(251,191,36,.13),transparent 70%); }
.kpi-glow--purple { background: radial-gradient(circle,rgba(168,85,247,.16),transparent 70%); }

.kpi-icon {
  width: 40px; height: 40px; border-radius: .625rem;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0; position: relative; z-index: 1;
}
.kpi--green  .kpi-icon { background: rgba(34,197,94,.1);  color: #22C55E; box-shadow: 0 0 0 1px rgba(34,197,94,.2); }
.kpi--blue   .kpi-icon { background: rgba(56,189,248,.1);  color: #38BDF8; box-shadow: 0 0 0 1px rgba(56,189,248,.2); }
.kpi--amber  .kpi-icon { background: rgba(251,191,36,.1);  color: #FBBF24; box-shadow: 0 0 0 1px rgba(251,191,36,.2); }
.kpi--purple .kpi-icon { background: rgba(168,85,247,.1);  color: #c084fc; box-shadow: 0 0 0 1px rgba(168,85,247,.2); }

.kpi-body { flex: 1; min-width: 0; position: relative; z-index: 1; }
.kpi-num { display: block; font-size: 2.25rem; font-weight: 800; color: #111827; line-height: 1; letter-spacing: -.04em; font-family: 'Cormorant Garamond',Georgia,serif; }
.kpi-lbl { display: block; font-size: .6875rem; color: #6b7280; margin-top: 3px; font-weight: 500; }

.kpi-spark { flex-shrink: 0; position: relative; z-index: 1; }
.spark-line { stroke-dasharray: 200; stroke-dashoffset: 200; animation: sparkDraw 1.2s ease-out .7s both; }
.spark-fill { animation: sparkFadeIn .8s ease-out 1.2s both; opacity: 0; }

.kpi-chip {
  flex-shrink: 0; font-size: .5625rem; font-weight: 700; letter-spacing: .1em;
  text-transform: uppercase; border-radius: 100px; padding: 3px 9px;
  position: relative; z-index: 1;
}
.kpi-chip--blue   { color: #38BDF8; background: rgba(56,189,248,.1);  border: 1px solid rgba(56,189,248,.22); }
.kpi-chip--amber  { color: #FBBF24; background: rgba(251,191,36,.1);  border: 1px solid rgba(251,191,36,.22); }
.kpi-chip--purple { color: #d8b4fe; background: rgba(168,85,247,.12); border: 1px solid rgba(168,85,247,.28); }

/* ── Content grid ── */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 1rem;
  align-items: start;
}

/* ── Card ── */
.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: .875rem; overflow: hidden;
  animation: fadeUp .4s ease-out .38s both;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}
.card--compact { animation-delay: .44s; }
.card + .card { margin-top: 1rem; }

.card-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: .875rem 1.25rem;
  border-bottom: 1px solid #f3f4f6;
}
.card-head-left { display: flex; align-items: center; gap: .4rem; }

.card-dot {
  width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
  background: #16a34a; box-shadow: 0 0 6px rgba(22,163,74,.5);
  animation: livePulse 2.2s ease-in-out infinite;
}
.card-dot--blue   { background: #0ea5e9; box-shadow: 0 0 5px rgba(14,165,233,.4); animation: none; }
.card-dot--purple { background: #7c3aed; box-shadow: 0 0 5px rgba(124,58,237,.4); animation: none; }
.card-dot--green  { background: #16a34a; }

.card-title { font-size: .875rem; font-weight: 700; color: #111827; }
.card-count {
  font-size: .6875rem; font-weight: 700; padding: 2px 8px;
  border-radius: 100px; background: #dcfce7;
  color: #16a34a; border: 1px solid #bbf7d0;
}
.card-count--purple { background: #f3e8ff; color: #7c3aed; border-color: #e9d5ff; }

.card-link {
  font-size: .75rem; color: #16a34a; text-decoration: none; opacity: .8;
  display: inline-flex; align-items: center; gap: .25rem;
  transition: opacity 150ms, gap 150ms;
}
.card-link:hover { opacity: 1; gap: .375rem; }

/* Empty */
.empty { padding: 2.5rem 1.25rem; text-align: center; color: #9ca3af; }
.empty--sm { padding: 1.25rem; }
.empty-icon {
  width: 52px; height: 52px; border-radius: 50%;
  background: #f3f4f6; border: 1px solid #e5e7eb;
  display: flex; align-items: center; justify-content: center; margin: 0 auto .75rem;
}
.empty p { font-size: .8125rem; margin-bottom: .75rem; }
.empty-cta { font-size: .75rem; font-weight: 600; color: #16a34a; text-decoration: none; }

/* Event rows */
.ev-row {
  display: flex; align-items: center; gap: .75rem;
  padding: .75rem 1.25rem;
  border-bottom: 1px solid #f3f4f6;
  transition: background 140ms;
  animation: fadeUp .35s ease-out both;
  animation-delay: calc(.48s + var(--d, 0ms));
  position: relative;
}
.ev-row::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0;
  width: 2px; background: #16a34a; transform: scaleY(0);
  transform-origin: center; transition: transform 180ms;
  border-radius: 0 2px 2px 0;
}
.ev-row:last-child { border-bottom: none; }
.ev-row:hover { background: #f9fafb; }
.ev-row:hover::before { transform: scaleY(.65); }

.ev-thumb { width: 46px; height: 38px; border-radius: .4rem; overflow: hidden; flex-shrink: 0; box-shadow: 0 1px 4px rgba(0,0,0,.12); }
.ev-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform 280ms; }
.ev-row:hover .ev-thumb img { transform: scale(1.07); }
.ev-thumb-ph { width: 100%; height: 100%; background: #f3f4f6; display: flex; align-items: center; justify-content: center; color: #9ca3af; }

.ev-info { flex: 1; min-width: 0; }
.ev-title { display: block; font-size: .8125rem; font-weight: 600; color: #111827; text-decoration: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 2px; transition: color 130ms; }
.ev-title:hover { color: #16a34a; }
.ev-meta { font-size: .625rem; color: #9ca3af; display: flex; align-items: center; gap: .25rem; }
.sep { opacity: .5; }

.ev-badge { flex-shrink: 0; font-size: .5625rem; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; padding: 2px 8px; border-radius: 100px; background: #fef9c3; color: #a16207; border: 1px solid #fde68a; display: inline-flex; align-items: center; gap: 4px; }
.ev-badge--live { background: #dcfce7; color: #16a34a; border-color: #bbf7d0; }
.badge-dot { width: 5px; height: 5px; border-radius: 50%; background: #16a34a; box-shadow: 0 0 5px rgba(22,163,74,.5); animation: livePulse 2s ease-in-out infinite; }

.ev-actions { display: flex; gap: 3px; flex-shrink: 0; }
.icon-btn { width: 28px; height: 28px; border-radius: .325rem; display: flex; align-items: center; justify-content: center; color: #9ca3af; text-decoration: none; transition: all 140ms; }
.icon-btn:hover { background: #f3f4f6; color: #374151; }
.icon-btn--green { color: #4ade80; }
.icon-btn--green:hover { background: #dcfce7; color: #16a34a; }

/* ── Actions rapides ── */
.actions-grid { display: flex; flex-direction: column; }
.action-card {
  display: flex; align-items: center; gap: .75rem;
  padding: .75rem 1.25rem; text-decoration: none;
  border-bottom: 1px solid #f3f4f6; transition: background 140ms;
}
.action-card:last-child { border-bottom: none; }
.action-card:hover { background: #f9fafb; }
.action-card--primary:hover { background: #f0fdf4; }

.action-icon { width: 34px; height: 34px; border-radius: .5rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.action-icon--green  { background: #dcfce7; color: #16a34a; box-shadow: 0 0 0 1px #bbf7d0; }
.action-icon--amber  { background: #fef9c3; color: #a16207; box-shadow: 0 0 0 1px #fde68a; }
.action-icon--purple { background: #f3e8ff; color: #7c3aed; box-shadow: 0 0 0 1px #e9d5ff; }
.action-icon--blue   { background: #e0f2fe; color: #0284c7; box-shadow: 0 0 0 1px #bae6fd; }

.action-lbl { flex: 1; font-size: .8125rem; font-weight: 500; color: #374151; transition: color 140ms; }
.action-card:hover .action-lbl { color: #111827; }

.action-arrow { color: #d1d5db; flex-shrink: 0; transition: transform 150ms, color 150ms; }
.action-card:hover .action-arrow { color: #6b7280; transform: translateX(3px); }

.action-badge { flex-shrink: 0; min-width: 20px; height: 20px; padding: 0 6px; border-radius: 100px; background: #7c3aed; color: #fff; font-size: .625rem; font-weight: 800; display: flex; align-items: center; justify-content: center; }

/* ── Messages ── */
.msg-row {
  display: flex; align-items: center; gap: .75rem;
  padding: .75rem 1.25rem; border-bottom: 1px solid #f3f4f6;
  text-decoration: none; transition: background 140ms;
}
.msg-row:last-child { border-bottom: none; }
.msg-row:hover { background: #f9fafb; }
.msg-row--unread { background: #faf5ff; }

.msg-avatar {
  width: 34px; height: 34px; border-radius: 50%;
  background: #f3e8ff; color: #7c3aed;
  font-size: .875rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  box-shadow: 0 0 0 1.5px #e9d5ff;
}
.msg-info { flex: 1; min-width: 0; }
.msg-name { font-size: .8125rem; font-weight: 600; color: #111827; display: flex; align-items: center; gap: .3rem; margin-bottom: 2px; }
.msg-unread-dot { width: 6px; height: 6px; border-radius: 50%; background: #7c3aed; flex-shrink: 0; }
.msg-sub { font-size: .625rem; color: #9ca3af; display: flex; align-items: center; gap: .25rem; }
.msg-type { color: #7c3aed; font-weight: 600; }
.msg-arrow { color: #d1d5db; flex-shrink: 0; transition: transform 150ms, color 150ms; }
.msg-row:hover .msg-arrow { color: #6b7280; transform: translateX(2px); }

/* ── Stat block ── */
.stat-block { padding: .875rem 1.25rem 1rem; }
.stat-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: .375rem; }
.stat-lbl { font-size: .75rem; color: #6b7280; font-weight: 500; }
.stat-val { font-size: .875rem; font-weight: 700; }
.stat-val--green { color: #16a34a; }
.stat-val--amber { color: #d97706; }

.progress-bar { height: 6px; background: #f3f4f6; border-radius: 100px; overflow: hidden; margin-bottom: .25rem; }
.progress-fill { height: 100%; border-radius: 100px; animation: progressIn .9s cubic-bezier(.4,0,.2,1) .6s both; }
.progress-fill--green { background: linear-gradient(90deg,#16a34a,#4ade80); }
.progress-fill--amber { background: linear-gradient(90deg,#d97706,#fbbf24); }

.stat-note { font-size: .6875rem; color: #9ca3af; margin-top: .875rem; text-align: center; }

/* ── Responsive ── */
@media (max-width: 1050px) {
  .content-grid { grid-template-columns: 1fr; }
  .right-col { display: grid; grid-template-columns: repeat(2,1fr); gap: 1rem; }
  .right-col .card + .card { margin-top: 0; }
}
@media (max-width: 700px) {
  .kpi-row { grid-template-columns: repeat(2,1fr); }
  .right-col { grid-template-columns: 1fr; }
}
@media (max-width: 400px) {
  .kpi-row { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .kpi, .page-top, .card, .ev-row { animation: none; }
  .spark-line { stroke-dashoffset: 0; animation: none; }
  .spark-fill { opacity: 1; animation: none; }
  .kpi-glow, .card-dot, .badge-dot { animation: none; }
  .progress-fill { animation: none; }
}
</style>
