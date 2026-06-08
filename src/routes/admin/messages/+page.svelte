<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let filter = $state<'all' | 'unread' | 'read'>('all');
  let expanded = $state<Set<string>>(new Set());
  let confirmDeleteId = $state<string | null>(null);

  const filtered = $derived(
    filter === 'all'    ? data.messages :
    filter === 'unread' ? data.messages.filter(m => !m.read) :
                          data.messages.filter(m => m.read)
  );

  const unreadCount = $derived(data.messages.filter(m => !m.read).length);

  function toggle(id: string) {
    const s = new Set(expanded);
    s.has(id) ? s.delete(id) : s.add(id);
    expanded = s;
  }

  function formatDate(iso: string) {
    const d = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins  = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days  = Math.floor(diff / 86400000);
    if (mins < 1)  return "À l'instant";
    if (mins < 60) return `Il y a ${mins} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days < 7)  return `Il y a ${days}j`;
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  const typeColors: Record<string, string> = {
    'Partenariat': '#22C55E',
    'Financement': '#FBBF24',
    'Bénévolat':   '#38BDF8',
    'Presse':      '#f472b6',
  };

  function typeColor(type: string): string {
    for (const [k, v] of Object.entries(typeColors)) {
      if (type.toLowerCase().includes(k.toLowerCase())) return v;
    }
    return '#a855f7';
  }
</script>

<svelte:head><title>Messages — Admin EJB</title></svelte:head>

<!-- En-tête -->
<div class="page-top">
  <div>
    <h1 class="page-title">Messages</h1>
    <p class="page-sub">
      <span class="sub-total">{data.messages.length}</span>
      message{data.messages.length !== 1 ? 's' : ''}
      {#if unreadCount > 0}
        · <span class="sub-unread">{unreadCount} non lu{unreadCount > 1 ? 's' : ''}</span>
      {/if}
    </p>
  </div>

  {#if unreadCount > 0}
    <form method="POST" action="?/markAllRead" use:enhance>
      <button type="submit" class="mark-all-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
        Tout marquer comme lu
      </button>
    </form>
  {/if}
</div>

<!-- Filtres -->
<div class="filters" role="group" aria-label="Filtrer les messages">
  {#each ([['all','Tous'], ['unread','Non lus'], ['read','Lus']] as const) as [k, label]}
    {@const count = k==='all' ? data.messages.length : k==='unread' ? unreadCount : data.messages.length - unreadCount}
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

<!-- Liste des messages -->
{#if filtered.length === 0}
  <div class="empty">
    <div class="empty-icon">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    </div>
    <p>Aucun message dans cette catégorie.</p>
  </div>
{:else}
  <div class="msg-list">
    {#each filtered as msg, i (msg.id)}
      <div class="msg-card" class:msg-card--unread={!msg.read} style="--i:{i}">

        <!-- Indicateur non-lu -->
        {#if !msg.read}
          <span class="unread-dot" aria-label="Non lu"></span>
        {/if}

        <!-- En-tête cliquable -->
        <button class="msg-header" onclick={() => toggle(msg.id)} type="button" aria-expanded={expanded.has(msg.id)}>
          <div class="msg-avatar" aria-hidden="true">
            {msg.name.charAt(0).toUpperCase()}
          </div>
          <div class="msg-from">
            <span class="msg-name">{msg.name}</span>
            {#if msg.org}<span class="msg-org">{msg.org}</span>{/if}
          </div>
          <span class="msg-type-badge" style="color:{typeColor(msg.type)};background:{typeColor(msg.type)}18;border-color:{typeColor(msg.type)}30">
            {msg.type}
          </span>
          <time class="msg-time" datetime={msg.createdAt}>{formatDate(msg.createdAt)}</time>
          <span class="msg-chevron" class:msg-chevron--open={expanded.has(msg.id)} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
          </span>
        </button>

        <!-- Aperçu (toujours visible) -->
        {#if !expanded.has(msg.id)}
          <p class="msg-preview">{msg.message.length > 120 ? msg.message.slice(0, 120) + '…' : msg.message}</p>
        {/if}

        <!-- Corps étendu -->
        {#if expanded.has(msg.id)}
          <div class="msg-body">
            <div class="msg-contacts">
              <a href="mailto:{msg.email}" class="msg-contact-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                {msg.email}
              </a>
              {#if msg.phone}
                <a href="tel:{msg.phone}" class="msg-contact-item">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.65 5 2 2 0 0 1 3.63 3h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 5.99 5.99l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {msg.phone}
                </a>
              {/if}
            </div>
            <div class="msg-text">{msg.message}</div>
            <div class="msg-footer-actions">
              {#if !msg.read}
                <form method="POST" action="?/markRead" use:enhance>
                  <input type="hidden" name="id" value={msg.id} />
                  <button type="submit" class="action-btn action-btn--read">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
                    Marquer comme lu
                  </button>
                </form>
              {/if}
              <a href="mailto:{msg.email}?subject=Re: {encodeURIComponent(msg.type)}" class="action-btn action-btn--reply">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 17-5-5 5-5"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
                Répondre par email
              </a>
              <button type="button" class="action-btn action-btn--delete" onclick={() => confirmDeleteId = msg.id}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                Supprimer
              </button>
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
{/if}

<!-- Modal suppression -->
{#if confirmDeleteId}
  {@const msg = data.messages.find(m => m.id === confirmDeleteId)}
  <div
    class="modal-bg"
    role="dialog"
    aria-modal="true"
    aria-label="Confirmer la suppression"
    onclick={(e) => { if (e.target === e.currentTarget) confirmDeleteId = null; }}
  >
    <div class="modal">
      <div class="modal-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
      </div>
      <h3>Supprimer ce message ?</h3>
      <p>Le message de <strong>{msg?.name}</strong> sera définitivement supprimé.</p>
      <div class="modal-actions">
        <button class="modal-cancel" onclick={() => confirmDeleteId = null}>Annuler</button>
        <form
          method="POST"
          action="?/delete"
          use:enhance={() => { return async ({ update }) => { await update(); confirmDeleteId = null; }; }}
        >
          <input type="hidden" name="id" value={confirmDeleteId} />
          <button type="submit" class="modal-delete">Supprimer</button>
        </form>
      </div>
    </div>
  </div>
{/if}

<style>
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes cardIn {
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes modalBounce {
  0%   { opacity: 0; transform: scale(0.9) translateY(8px); }
  60%  { transform: scale(1.02) translateY(-2px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes dotPulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(168,85,247,0.5); }
  50%     { box-shadow: 0 0 0 4px rgba(168,85,247,0.08); }
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
.sub-total  { color: rgba(255,255,255,0.6); font-weight: 600; }
.sub-unread { color: #a855f7; font-weight: 600; }

.mark-all-btn {
  display: inline-flex; align-items: center; gap: 0.375rem;
  padding: 0.5625rem 1.125rem; border-radius: 0.5rem;
  font-size: 0.8125rem; font-weight: 600;
  background: rgba(168,85,247,0.12);
  border: 1.5px solid rgba(168,85,247,0.28);
  color: #c084fc; cursor: pointer; font-family: inherit;
  transition: all 180ms ease;
}
.mark-all-btn:hover {
  background: rgba(168,85,247,0.2);
  border-color: rgba(168,85,247,0.5);
  color: #e9d5ff;
}

/* ── Filtres ── */
.filters {
  display: flex; gap: 0.375rem; margin-bottom: 1.375rem;
  animation: fadeUp 0.4s ease-out 0.08s both;
}
.filter-btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.4375rem 1rem; border-radius: 100px;
  font-size: 0.8125rem; font-weight: 600;
  border: 1.5px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.38); background: transparent;
  cursor: pointer; font-family: inherit; transition: all 180ms;
}
.filter-btn:hover { border-color: rgba(255,255,255,0.16); color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.04); }
.filter-btn--active { background: rgba(168,85,247,0.12); border-color: rgba(168,85,247,0.32); color: #c084fc; }
.filter-n { background: rgba(255,255,255,0.08); border-radius: 100px; padding: 1px 7px; font-size: 0.6875rem; transition: all 180ms; }
.filter-n--active { background: rgba(168,85,247,0.18); color: #d8b4fe; }

/* ── Empty ── */
.empty {
  padding: 5rem 2rem; text-align: center; color: rgba(255,255,255,0.28);
  background: rgba(22,42,28,0.97); border: 1px solid rgba(255,255,255,0.07); border-radius: 1rem;
}
.empty-icon {
  width: 64px; height: 64px; border-radius: 50%;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1rem;
}
.empty p { font-size: 0.875rem; }

/* ── Message list ── */
.msg-list { display: flex; flex-direction: column; gap: 0.625rem; }

.msg-card {
  background: rgba(22,42,28,0.97);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 0.875rem;
  overflow: hidden;
  position: relative;
  transition: border-color 200ms, box-shadow 200ms;
  animation: cardIn 0.35s ease-out both;
  animation-delay: calc(0.1s + var(--i, 0) * 50ms);
}
.msg-card--unread {
  border-left: 3px solid #a855f7;
  box-shadow: 0 0 0 0 rgba(168,85,247,0);
}
.msg-card--unread:hover {
  border-color: rgba(168,85,247,0.4);
  box-shadow: 0 4px 24px rgba(168,85,247,0.1);
}
.msg-card:not(.msg-card--unread):hover {
  border-color: rgba(255,255,255,0.12);
}

/* Unread dot */
.unread-dot {
  position: absolute;
  top: 1.1rem; right: 3.2rem;
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #a855f7;
  animation: dotPulse 2.5s ease-in-out infinite;
}

/* Message header */
.msg-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.125rem;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  transition: background 150ms;
}
.msg-header:hover { background: rgba(255,255,255,0.03); }

.msg-avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(168,85,247,0.3), rgba(168,85,247,0.1));
  border: 1.5px solid rgba(168,85,247,0.3);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.875rem; font-weight: 700; color: #d8b4fe;
  flex-shrink: 0;
}

.msg-from { flex: 1; min-width: 0; }
.msg-name { display: block; font-size: 0.875rem; font-weight: 600; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.msg-org  { display: block; font-size: 0.6875rem; color: rgba(255,255,255,0.35); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 1px; }

.msg-type-badge {
  flex-shrink: 0;
  font-size: 0.625rem; font-weight: 700; letter-spacing: 0.06em;
  text-transform: uppercase; padding: 3px 9px; border-radius: 100px;
  border: 1px solid transparent; white-space: nowrap;
}

.msg-time {
  flex-shrink: 0;
  font-size: 0.6875rem; color: rgba(255,255,255,0.28); white-space: nowrap;
}

.msg-chevron { flex-shrink: 0; color: rgba(255,255,255,0.28); transition: transform 220ms ease; }
.msg-chevron--open { transform: rotate(180deg); }

/* Preview */
.msg-preview {
  padding: 0 1.125rem 0.875rem calc(1.125rem + 36px + 0.75rem);
  font-size: 0.8125rem; color: rgba(255,255,255,0.4);
  line-height: 1.5; margin: 0;
}

/* Body étendu */
.msg-body {
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: 1rem 1.125rem;
}

.msg-contacts {
  display: flex; flex-wrap: wrap; gap: 0.5rem;
  margin-bottom: 1rem;
}
.msg-contact-item {
  display: inline-flex; align-items: center; gap: 0.35rem;
  font-size: 0.8125rem; color: rgba(255,255,255,0.55);
  text-decoration: none; padding: 4px 10px;
  background: rgba(255,255,255,0.05); border-radius: 100px;
  border: 1px solid rgba(255,255,255,0.08);
  transition: all 150ms;
}
.msg-contact-item:hover { color: #fff; background: rgba(255,255,255,0.09); border-color: rgba(255,255,255,0.15); }

.msg-text {
  font-size: 0.9rem; color: rgba(255,255,255,0.75);
  line-height: 1.65; white-space: pre-wrap;
  background: rgba(0,0,0,0.2); border-radius: 0.625rem;
  padding: 1rem 1.125rem; margin-bottom: 1rem;
  border: 1px solid rgba(255,255,255,0.05);
}

.msg-footer-actions {
  display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;
}

.action-btn {
  display: inline-flex; align-items: center; gap: 0.35rem;
  padding: 0.4375rem 0.875rem; border-radius: 0.375rem;
  font-size: 0.8125rem; font-weight: 600;
  cursor: pointer; font-family: inherit; border: 1.5px solid;
  transition: all 150ms; text-decoration: none;
}
.action-btn--read {
  background: rgba(34,197,94,0.1); border-color: rgba(34,197,94,0.25); color: #4ade80;
}
.action-btn--read:hover { background: rgba(34,197,94,0.18); border-color: rgba(34,197,94,0.4); }
.action-btn--reply {
  background: rgba(56,189,248,0.08); border-color: rgba(56,189,248,0.22); color: #7dd3fc;
}
.action-btn--reply:hover { background: rgba(56,189,248,0.16); border-color: rgba(56,189,248,0.4); }
.action-btn--delete {
  background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.2); color: #fca5a5;
  margin-left: auto;
}
.action-btn--delete:hover { background: rgba(239,68,68,0.16); border-color: rgba(239,68,68,0.38); }

/* ── Modal ── */
.modal-bg {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,0.78); backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center; padding: 1rem;
}
.modal {
  background: rgba(18,34,22,0.99); border: 1px solid rgba(239,68,68,0.18);
  border-radius: 1.125rem; padding: 2rem; max-width: 380px; width: 100%;
  box-shadow: 0 24px 64px rgba(0,0,0,0.7);
  animation: modalBounce 300ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.modal-icon {
  width: 48px; height: 48px; border-radius: 50%;
  background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.22);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1rem; box-shadow: 0 0 14px rgba(239,68,68,0.15);
}
.modal h3 { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; }
.modal p { font-size: 0.875rem; color: rgba(255,255,255,0.45); margin-bottom: 1.5rem; line-height: 1.5; }
.modal p strong { color: rgba(255,255,255,0.8); }
.modal-actions { display: flex; gap: 0.75rem; justify-content: flex-end; }
.modal-cancel {
  padding: 0.5625rem 1.125rem; border-radius: 0.5rem;
  font-size: 0.875rem; font-weight: 600;
  background: transparent; border: 1.5px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.5); cursor: pointer; font-family: inherit;
  transition: all 150ms;
}
.modal-cancel:hover { background: rgba(255,255,255,0.06); color: #fff; }
.modal-delete {
  padding: 0.5625rem 1.25rem; border-radius: 0.5rem;
  font-size: 0.875rem; font-weight: 700;
  background: #dc2626; border: none; color: #fff;
  cursor: pointer; font-family: inherit; transition: all 150ms;
}
.modal-delete:hover { background: #b91c1c; box-shadow: 0 4px 16px rgba(220,38,38,0.4); }

@media (prefers-reduced-motion: reduce) {
  .msg-card, .page-top, .filters { animation: none; }
  .unread-dot { animation: none; }
}
</style>
