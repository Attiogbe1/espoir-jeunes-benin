<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';
  import { categoryLabels, categoryColors } from '$lib/data/categories.js';

  let { data }: { data: PageData } = $props();
  let confirmDeleteId = $state<string | null>(null);
  let filter = $state<'all' | 'published' | 'draft'>('all');

  const filtered = $derived(
    filter === 'all' ? data.events :
    filter === 'published' ? data.events.filter(e => e.published) :
    data.events.filter(e => !e.published)
  );
</script>

<svelte:head><title>Événements — Admin EJB</title></svelte:head>

<!-- En-tête -->
<div class="page-top">
  <div>
    <h1 class="page-title">Événements</h1>
    <p class="page-sub">
      <span class="sub-total">{data.events.length}</span>
      événement{data.events.length !== 1 ? 's' : ''} ·
      <span class="sub-live">{data.events.filter(e=>e.published).length} publiés</span>
    </p>
  </div>
  <a href="/admin/evenements/nouveau" class="cta-btn">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    Nouvel événement
  </a>
</div>

<!-- Filtres -->
<div class="filters" role="group" aria-label="Filtrer les événements">
  {#each ([['all','Tous'], ['published','Publiés'], ['draft','Brouillons']] as const) as [k, label]}
    {@const count = k==='all' ? data.events.length : k==='published' ? data.events.filter(e=>e.published).length : data.events.filter(e=>!e.published).length}
    <button
      class="filter-btn"
      class:filter-btn--active={filter === k}
      onclick={() => filter = k}
      type="button"
    >
      {label}
      <span class="filter-n" class:filter-n--active={filter === k}>{count}</span>
    </button>
  {/each}
</div>

<!-- Contenu -->
{#if filtered.length === 0}
  <div class="empty-wrap">
    <div class="empty-icon">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    </div>
    <p>Aucun événement dans cette catégorie.</p>
    <a href="/admin/evenements/nouveau" class="empty-cta">Créer un événement →</a>
  </div>
{:else}
  <div class="table-card">
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Événement</th>
            <th>Catégorie</th>
            <th>Date</th>
            <th>Photos</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each filtered as ev, i (ev.id)}
            <tr style="--row-delay:{i * 45}ms">
              <!-- Événement -->
              <td>
                <div class="ev-cell">
                  <div class="ev-thumb">
                    {#if ev.images.length > 0}
                      <img src={ev.images[0]} alt="" />
                    {:else}
                      <div class="ev-thumb-ph">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      </div>
                    {/if}
                  </div>
                  <div class="ev-text">
                    <a href="/admin/evenements/{ev.id}" class="ev-title">{ev.title}</a>
                    <p class="ev-excerpt">{ev.excerpt}</p>
                  </div>
                </div>
              </td>
              <!-- Catégorie -->
              <td>
                <span class="cat-tag" style="color:{categoryColors[ev.category]};background:{categoryColors[ev.category]}18;border-color:{categoryColors[ev.category]}35">
                  {categoryLabels[ev.category]}
                </span>
              </td>
              <!-- Date -->
              <td class="td-date">
                <time datetime={ev.date}>
                  {new Date(ev.date).toLocaleDateString('fr-FR',{day:'numeric',month:'short',year:'numeric'})}
                </time>
              </td>
              <!-- Photos -->
              <td>
                <span class="photo-count">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  {ev.images.length}
                </span>
              </td>
              <!-- Statut -->
              <td>
                <form method="POST" action="?/togglePublish" use:enhance>
                  <input type="hidden" name="id" value={ev.id} />
                  <button type="submit" class="status-btn" class:status-btn--live={ev.published}>
                    <span class="status-dot" class:status-dot--live={ev.published}></span>
                    {ev.published ? 'Publié' : 'Brouillon'}
                  </button>
                </form>
              </td>
              <!-- Actions -->
              <td>
                <div class="row-actions">
                  <a href="/admin/evenements/{ev.id}" class="icon-btn" title="Modifier" aria-label="Modifier">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </a>
                  {#if ev.published}
                    <a href="/evenements/{ev.id}" target="_blank" class="icon-btn icon-btn--green" title="Voir en ligne" aria-label="Voir en ligne">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </a>
                  {/if}
                  <button
                    type="button"
                    class="icon-btn icon-btn--red"
                    onclick={() => confirmDeleteId = ev.id}
                    title="Supprimer"
                    aria-label="Supprimer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
{/if}

<!-- Modal suppression -->
{#if confirmDeleteId}
  {@const ev = data.events.find(e => e.id === confirmDeleteId)}
  <div
    class="modal-bg"
    role="dialog"
    aria-modal="true"
    aria-label="Confirmer la suppression"
    onclick={(e) => { if (e.target === e.currentTarget) confirmDeleteId = null; }}
  >
    <div class="modal">
      <div class="modal-glow" aria-hidden="true"></div>
      <div class="modal-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
      </div>
      <h3>Supprimer cet événement ?</h3>
      <p>« {ev?.title} » sera définitivement supprimé avec toutes ses images.</p>
      <div class="modal-actions">
        <button class="modal-cancel" onclick={() => confirmDeleteId = null}>Annuler</button>
        <form method="POST" action="?/delete" use:enhance={() => { return async ({ update }) => { await update(); confirmDeleteId = null; }; }}>
          <input type="hidden" name="id" value={confirmDeleteId} />
          <button type="submit" class="modal-delete">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            Supprimer
          </button>
        </form>
      </div>
    </div>
  </div>
{/if}

<style>
/* ── Animations ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes rowIn {
  from { opacity: 0; transform: translateX(-6px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes modalBounce {
  0%   { opacity: 0; transform: scale(0.9) translateY(10px); }
  60%  { opacity: 1; transform: scale(1.02) translateY(-2px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

/* ── Top ── */
.page-top {
  display: flex; align-items: flex-end; justify-content: space-between;
  gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;
  animation: fadeUp 0.4s ease-out both;
}
.page-title {
  font-size: 1.875rem; font-weight: 800; color: #fff;
  letter-spacing: -0.025em; line-height: 1; margin-bottom: 0.3rem;
}
.page-sub { font-size: 0.8125rem; color: rgba(255,255,255,0.35); }
.sub-total { color: rgba(255,255,255,0.6); font-weight: 600; }
.sub-live  { color: #22C55E; font-weight: 600; }

.cta-btn {
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.65rem 1.3rem;
  background: #22C55E; color: #052e16;
  border-radius: 0.5rem; font-size: 0.875rem; font-weight: 700;
  text-decoration: none; transition: all 200ms ease; white-space: nowrap;
  position: relative; overflow: hidden;
}
.cta-btn::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent 55%);
  opacity: 0; transition: opacity 200ms;
}
.cta-btn:hover { background: #16a34a; color: #fff; transform: translateY(-2px); box-shadow: 0 6px 22px rgba(34,197,94,0.36); }
.cta-btn:hover::before { opacity: 1; }
.cta-btn:active { transform: translateY(0); }

/* ── Filtres ── */
.filters {
  display: flex; gap: 0.375rem; margin-bottom: 1.375rem; flex-wrap: wrap;
  animation: fadeUp 0.4s ease-out 0.08s both;
}
.filter-btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.4375rem 1rem; border-radius: 100px;
  font-size: 0.8125rem; font-weight: 600;
  border: 1.5px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.38); background: transparent;
  cursor: pointer; font-family: inherit;
  transition: all 180ms ease;
}
.filter-btn:hover { border-color: rgba(255,255,255,0.16); color: rgba(255,255,255,0.75); background: rgba(255,255,255,0.04); }
.filter-btn--active {
  background: rgba(34,197,94,0.12);
  border-color: rgba(34,197,94,0.32);
  color: #22C55E;
  box-shadow: 0 0 12px rgba(34,197,94,0.12);
}
.filter-n {
  background: rgba(255,255,255,0.08); border-radius: 100px;
  padding: 1px 7px; font-size: 0.6875rem; transition: all 180ms;
}
.filter-n--active {
  background: rgba(34,197,94,0.18);
  color: #4ade80;
}

/* ── Empty ── */
.empty-wrap {
  padding: 5rem 2rem; text-align: center; color: rgba(255,255,255,0.28);
  background: rgba(22,42,28,0.97); border: 1px solid rgba(255,255,255,0.07); border-radius: 1rem;
  animation: fadeUp 0.4s ease-out 0.16s both;
}
.empty-icon {
  width: 64px; height: 64px; border-radius: 50%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1rem;
}
.empty-wrap p { font-size: 0.875rem; margin-bottom: 1rem; }
.empty-cta { font-size: 0.8125rem; font-weight: 600; color: #22C55E; text-decoration: none; transition: opacity 150ms; }
.empty-cta:hover { opacity: 0.75; }

/* ── Table ── */
.table-card {
  background: rgba(22,42,28,0.97);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 1rem;
  overflow: hidden;
  animation: fadeUp 0.4s ease-out 0.16s both;
}
.table-wrap { overflow-x: auto; }

table { width: 100%; border-collapse: collapse; min-width: 760px; }

thead tr { border-bottom: 1px solid rgba(255,255,255,0.06); }
th {
  padding: 0.75rem 1rem; text-align: left;
  font-size: 0.6875rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.08em; color: rgba(255,255,255,0.25);
}
th:first-child { padding-left: 1.25rem; }

tbody tr {
  border-bottom: 1px solid rgba(255,255,255,0.04);
  transition: background 140ms ease;
  animation: rowIn 0.35s ease-out both;
  animation-delay: calc(0.2s + var(--row-delay, 0ms));
}
tbody tr:last-child { border-bottom: none; }
tbody tr:hover { background: rgba(34,197,94,0.035); }

td {
  padding: 0.875rem 1rem; vertical-align: middle;
  font-size: 0.875rem; color: rgba(255,255,255,0.62);
}
td:first-child { padding-left: 1.25rem; }

.ev-cell { display: flex; align-items: center; gap: 0.75rem; }
.ev-thumb {
  width: 56px; height: 46px; border-radius: 0.5rem;
  overflow: hidden; flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
.ev-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform 300ms ease; }
tbody tr:hover .ev-thumb img { transform: scale(1.06); }
.ev-thumb-ph {
  width: 100%; height: 100%;
  background: rgba(255,255,255,0.04);
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.16);
}
.ev-title {
  display: block; font-size: 0.875rem; font-weight: 600; color: #fff;
  text-decoration: none; white-space: nowrap; overflow: hidden;
  text-overflow: ellipsis; max-width: 220px; margin-bottom: 2px;
  transition: color 140ms;
}
.ev-title:hover { color: #22C55E; }
.ev-excerpt {
  font-size: 0.6875rem; color: rgba(255,255,255,0.25);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  max-width: 220px; margin: 0;
}

.cat-tag {
  display: inline-block; padding: 3px 10px; border-radius: 100px;
  font-size: 0.6875rem; font-weight: 600; white-space: nowrap;
  border: 1px solid transparent;
}

.td-date { font-size: 0.8125rem; white-space: nowrap; color: rgba(255,255,255,0.45); }

.photo-count {
  display: inline-flex; align-items: center; gap: 0.3rem;
  font-size: 0.8125rem; color: rgba(255,255,255,0.35);
}

.status-btn {
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 4px 11px; border-radius: 100px;
  font-size: 0.6875rem; font-weight: 700;
  background: rgba(251,191,36,0.08);
  color: #FBBF24; border: 1px solid rgba(251,191,36,0.2);
  cursor: pointer; font-family: inherit;
  transition: all 180ms ease;
  white-space: nowrap;
}
.status-btn--live {
  background: rgba(34,197,94,0.08);
  color: #22C55E; border-color: rgba(34,197,94,0.22);
}
.status-btn:hover { opacity: 0.75; transform: scale(0.97); }
.status-btn:active { transform: scale(0.93); }

.status-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: #FBBF24; flex-shrink: 0;
}
.status-dot--live {
  background: #22C55E;
  box-shadow: 0 0 5px rgba(34,197,94,0.8);
  animation: dotPulse 2s ease-in-out infinite;
}
@keyframes dotPulse {
  0%,100% { box-shadow: 0 0 5px rgba(34,197,94,0.8); }
  50%      { box-shadow: 0 0 10px rgba(34,197,94,0.3); }
}

.row-actions { display: flex; gap: 3px; }
.icon-btn {
  width: 30px; height: 30px; border-radius: 0.375rem;
  display: inline-flex; align-items: center; justify-content: center;
  text-decoration: none; background: none; border: none;
  cursor: pointer; transition: all 150ms ease; color: rgba(255,255,255,0.28);
}
.icon-btn:hover { background: rgba(255,255,255,0.08); color: #fff; transform: scale(1.1); }
.icon-btn--green { color: rgba(34,197,94,0.38); }
.icon-btn--green:hover { background: rgba(34,197,94,0.1); color: #22C55E; }
.icon-btn--red { color: rgba(248,113,113,0.38); }
.icon-btn--red:hover { background: rgba(239,68,68,0.1); color: #f87171; }

/* ── Modal ── */
.modal-bg {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,0.78); backdrop-filter: blur(6px) saturate(80%);
  -webkit-backdrop-filter: blur(6px) saturate(80%);
  display: flex; align-items: center; justify-content: center; padding: 1rem;
}
.modal {
  background: rgba(18,34,22,0.99);
  border: 1px solid rgba(239,68,68,0.18);
  border-radius: 1.125rem; padding: 2rem; max-width: 390px; width: 100%;
  box-shadow: 0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05);
  animation: modalBounce 300ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
  position: relative;
  overflow: hidden;
}
.modal-glow {
  position: absolute;
  width: 300px; height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(239,68,68,0.1), transparent 65%);
  top: -100px; right: -80px;
  pointer-events: none;
}
.modal-icon {
  width: 52px; height: 52px; border-radius: 50%;
  background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.22);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1.125rem;
  box-shadow: 0 0 16px rgba(239,68,68,0.15);
  position: relative; z-index: 1;
}
.modal h3 {
  font-size: 1.0625rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;
  position: relative; z-index: 1;
}
.modal p {
  font-size: 0.875rem; color: rgba(255,255,255,0.48); margin-bottom: 1.625rem;
  line-height: 1.55; position: relative; z-index: 1;
}
.modal-actions {
  display: flex; gap: 0.75rem; justify-content: flex-end;
  position: relative; z-index: 1;
}
.modal-cancel {
  padding: 0.5625rem 1.125rem; border-radius: 0.5rem;
  font-size: 0.875rem; font-weight: 600;
  background: transparent; border: 1.5px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.5); cursor: pointer; font-family: inherit;
  transition: all 160ms ease;
}
.modal-cancel:hover { background: rgba(255,255,255,0.06); color: #fff; border-color: rgba(255,255,255,0.22); }
.modal-delete {
  display: inline-flex; align-items: center; gap: 0.375rem;
  padding: 0.5625rem 1.25rem; border-radius: 0.5rem;
  font-size: 0.875rem; font-weight: 700;
  background: #dc2626; border: none; color: #fff;
  cursor: pointer; font-family: inherit;
  transition: all 160ms ease;
  box-shadow: 0 0 0 0 rgba(220,38,38,0);
}
.modal-delete:hover {
  background: #b91c1c;
  box-shadow: 0 4px 18px rgba(220,38,38,0.4);
  transform: translateY(-1px);
}
.modal-delete:active { transform: translateY(0); }

@media (prefers-reduced-motion: reduce) {
  .page-top, .filters, .table-card, .empty-wrap { animation: none; }
  tbody tr { animation: none; }
  .modal { animation: none; }
  .status-dot--live { animation: none; }
  .icon-btn:hover { transform: none; }
}
</style>
