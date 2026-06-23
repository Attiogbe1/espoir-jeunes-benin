<script lang="ts">
  import { page } from '$app/stores';
  import type { Snippet } from 'svelte';

  let { children, data }: { children: Snippet; data: { unread: number } } = $props();

  let sidebarOpen = $state(false);

  const nav = [
    {
      href: '/admin',
      label: 'Tableau de bord',
      exact: true,
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>`,
    },
    {
      href: '/admin/evenements',
      label: 'Événements',
      exact: false,
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    },
    {
      href: '/admin/messages',
      label: 'Messages',
      exact: false,
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    },
  ];

  const sectionTitles: Record<string, string> = {
    '/admin': 'Tableau de bord',
    '/admin/evenements': 'Événements',
    '/admin/messages': 'Messages',
  };

  const pageTitle = $derived(
    Object.entries(sectionTitles)
      .sort((a, b) => b[0].length - a[0].length)
      .find(([k]) => $page.url.pathname === k || $page.url.pathname.startsWith(k + '/'))?.[1]
    ?? 'Admin'
  );

  function active(href: string, exact = false) {
    return exact ? $page.url.pathname === href : $page.url.pathname.startsWith(href);
  }

  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
</script>

<div class="shell">
  <div class="ambient" aria-hidden="true">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
  </div>

  <!-- Overlay mobile -->
  {#if sidebarOpen}
    <div class="overlay" onclick={() => sidebarOpen = false} aria-hidden="true"></div>
  {/if}

  <aside class="sidebar" class:sidebar--open={sidebarOpen}>
    <!-- Brand -->
    <div class="brand">
      <a href="/" class="brand-link" title="Voir le site public">
        <div class="brand-logo">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <circle cx="16" cy="16" r="14" stroke="#22C55E" stroke-width="2"/>
            <path d="M9 23 L16 9 L23 23" stroke="#22C55E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 18 L20 18" stroke="#22C55E" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="brand-text">
          <span class="brand-name">EJB</span>
          <span class="brand-tag">Admin</span>
        </div>
      </a>
      <div class="brand-live" aria-label="Site en ligne">
        <span class="live-dot"></span>
      </div>
    </div>

    <!-- Navigation principale -->
    <nav class="nav" aria-label="Menu admin">
      <p class="nav-section-label">Menu</p>
      {#each nav as item}
        {@const isActive = active(item.href, item.exact)}
        <a
          href={item.href}
          class="nav-link"
          class:nav-link--active={isActive}
          aria-current={isActive ? 'page' : undefined}
          onclick={() => sidebarOpen = false}
        >
          <span class="nav-icon" aria-hidden="true">{@html item.icon}</span>
          <span class="nav-label">{item.label}</span>
          {#if item.href === '/admin/messages' && data.unread > 0}
            <span class="nav-badge" aria-label="{data.unread} messages non lus">
              {data.unread > 99 ? '99+' : data.unread}
            </span>
          {:else if isActive}
            <span class="nav-active-chip" aria-hidden="true"></span>
          {/if}
        </a>
      {/each}
    </nav>

    <div class="sidebar-gap"></div>

    <!-- Liens secondaires -->
    <div class="sidebar-bottom">
      <p class="nav-section-label">Accès rapide</p>
      <a href="/" target="_blank" rel="noopener" class="nav-link nav-link--muted">
        <span class="nav-icon" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </span>
        <span class="nav-label">Voir le site</span>
      </a>
      <form method="POST" action="/admin?/logout">
        <button type="submit" class="nav-link nav-link--danger">
          <span class="nav-icon" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </span>
          <span class="nav-label">Déconnexion</span>
        </button>
      </form>
    </div>
  </aside>

  <main class="main">
    <!-- Top bar -->
    <header class="top-bar">
      <div class="top-bar-left">
        <button class="burger" onclick={() => sidebarOpen = !sidebarOpen} aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
        <div class="top-breadcrumb">
          <span class="breadcrumb-home">Admin</span>
          {#if pageTitle !== 'Admin'}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
            <span class="breadcrumb-current">{pageTitle}</span>
          {/if}
        </div>
      </div>
      <div class="top-bar-right">
        <span class="top-date">{today}</span>
        {#if data.unread > 0}
          <a href="/admin/messages" class="notif-btn" aria-label="{data.unread} messages non lus">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span class="notif-dot">{data.unread > 9 ? '9+' : data.unread}</span>
          </a>
        {/if}
      </div>
    </header>

    <div class="main-grid" aria-hidden="true"></div>
    <div class="main-inner">
      {@render children()}
    </div>
  </main>
</div>

<style>
/* ─── Shell ──────────────────────────────────────── */
.shell {
  display: flex;
  min-height: 100vh;
  background: #f0f5f2;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  position: relative;
  isolation: isolate;
}

/* ─── Ambient (désactivé en mode clair) ─────────── */
.ambient { display: none; }
.blob    { display: none; }

/* ─── Overlay mobile ─────────────────────────────── */
.overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  z-index: 20;
  backdrop-filter: blur(2px);
}

/* ─── Sidebar ────────────────────────────────────── */
.sidebar {
  width: 240px;
  flex-shrink: 0;
  background: #14532d;
  border-right: none;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
  z-index: 30;
  box-shadow: 4px 0 24px rgba(0,0,0,0.12);
}

/* Brand */
.brand {
  padding: 1.125rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.brand-link { display: flex; align-items: center; gap: 0.625rem; text-decoration: none; }
.brand-logo {
  width: 36px; height: 36px;
  border-radius: 10px;
  background: rgba(255,255,255,0.12);
  border: 1.5px solid rgba(255,255,255,0.2);
  display: flex; align-items: center; justify-content: center;
  transition: all 250ms ease;
}
.brand-link:hover .brand-logo { background: rgba(255,255,255,0.22); box-shadow: 0 0 16px rgba(255,255,255,0.12); }
.brand-name { display: block; font-size: 1rem; font-weight: 800; color: #fff; letter-spacing: -0.01em; line-height: 1; }
.brand-tag { display: block; font-size: 0.625rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.45); }
.brand-live { display: flex; align-items: center; }
.live-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #86efac;
  box-shadow: 0 0 0 3px rgba(134,239,172,0.25);
  animation: livePulse 2.2s ease-in-out infinite;
}
@keyframes livePulse {
  0%,100% { box-shadow: 0 0 0 3px rgba(134,239,172,0.25); }
  50%      { box-shadow: 0 0 0 6px rgba(134,239,172,0.08); }
}

/* Nav */
.nav { padding: 1rem 0.5rem 0.5rem; display: flex; flex-direction: column; gap: 2px; }
.nav-section-label {
  font-size: 0.625rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(255,255,255,0.3); padding: 0 0.75rem; margin-bottom: 0.25rem; margin-top: 0.25rem;
}

.nav-link {
  display: flex; align-items: center; gap: 0.625rem;
  padding: 0.5625rem 0.75rem; border-radius: 0.5rem;
  font-size: 0.875rem; font-weight: 500;
  color: rgba(255,255,255,0.55);
  text-decoration: none;
  transition: color 180ms, background 180ms;
  background: none; border: none; width: 100%; cursor: pointer;
  font-family: inherit; text-align: left; position: relative; overflow: hidden;
}
.nav-link::before {
  content: ''; position: absolute; left: 0; top: 50%;
  transform: translateY(-50%) scaleY(0); width: 3px; height: 60%;
  border-radius: 0 3px 3px 0; background: #86efac;
  box-shadow: 0 0 10px rgba(134,239,172,0.8);
  transition: transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.nav-link--active::before { transform: translateY(-50%) scaleY(1); }
.nav-link:hover { color: rgba(255,255,255,0.9); background: rgba(255,255,255,0.08); }
.nav-link--active { color: #fff; background: rgba(255,255,255,0.12); font-weight: 600; }
.nav-link--active .nav-icon { color: #86efac; }
.nav-link--muted { color: rgba(255,255,255,0.35); }
.nav-link--muted:hover { color: rgba(255,255,255,0.65); }
.nav-link--danger { color: rgba(252,165,165,0.55); }
.nav-link--danger:hover { color: #fca5a5; background: rgba(239,68,68,0.12); }

.nav-icon { display: flex; align-items: center; flex-shrink: 0; opacity: 0.65; transition: opacity 180ms, transform 180ms; }
.nav-link--active .nav-icon { opacity: 1; }
.nav-link:hover .nav-icon { opacity: 1; transform: scale(1.08); }

.nav-active-chip {
  margin-left: auto; width: 6px; height: 6px; border-radius: 50%;
  background: #86efac; box-shadow: 0 0 6px rgba(134,239,172,0.8);
  animation: chipPop 300ms cubic-bezier(0.34, 1.56, 0.64, 1) both; flex-shrink: 0;
}
@keyframes chipPop { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }

.nav-badge {
  margin-left: auto; min-width: 18px; height: 18px; padding: 0 5px;
  border-radius: 100px; background: #7c3aed; color: #fff;
  font-size: 0.625rem; font-weight: 800;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  box-shadow: 0 0 8px rgba(124,58,237,0.5);
  animation: chipPop 300ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.sidebar-gap { flex: 1; }
.sidebar-bottom {
  padding: 0.5rem; border-top: 1px solid rgba(255,255,255,0.08);
  display: flex; flex-direction: column; gap: 2px;
}

/* ─── Top Bar ────────────────────────────────────── */
.top-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 2rem; height: 58px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky; top: 0; z-index: 15; flex-shrink: 0;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.top-bar-left { display: flex; align-items: center; gap: 0.875rem; }
.top-bar-right { display: flex; align-items: center; gap: 1rem; }

.burger {
  display: none; flex-direction: column; gap: 4px;
  background: none; border: none; cursor: pointer;
  padding: 6px; border-radius: 6px; transition: background 150ms;
}
.burger:hover { background: #f3f4f6; }
.burger span { display: block; width: 18px; height: 2px; background: #6b7280; border-radius: 2px; transition: all 250ms; }

.top-breadcrumb { display: flex; align-items: center; gap: 0.375rem; font-size: 0.8125rem; }
.breadcrumb-home { color: #9ca3af; font-weight: 500; }
.breadcrumb-current { color: #111827; font-weight: 600; }
.top-breadcrumb svg { color: #d1d5db; }

.top-date { font-size: 0.75rem; color: #9ca3af; font-weight: 500; white-space: nowrap; }

.notif-btn {
  position: relative; width: 34px; height: 34px; border-radius: 0.5rem;
  background: #f3e8ff; border: 1px solid #e9d5ff;
  display: flex; align-items: center; justify-content: center;
  color: #7c3aed; text-decoration: none; transition: all 180ms;
}
.notif-btn:hover { background: #ede9fe; border-color: #c4b5fd; }
.notif-dot {
  position: absolute; top: -4px; right: -4px;
  min-width: 16px; height: 16px; padding: 0 4px;
  background: #7c3aed; color: #fff; font-size: 0.5625rem; font-weight: 800;
  border-radius: 100px; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 8px rgba(124,58,237,0.4);
  animation: chipPop 300ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

/* ─── Main ───────────────────────────────────────── */
.main {
  flex: 1; min-width: 0;
  display: flex; flex-direction: column;
  overflow-y: auto;
  background: #f0f5f2;
  position: relative; z-index: 5;
}
.main-grid { display: none; }
.main-inner {
  flex: 1;
  max-width: 1100px;
  width: 100%;
  padding: 2rem 2.5rem;
  color: #111827;
  position: relative; z-index: 1;
  animation: pageIn 0.4s ease-out both;
}
@keyframes pageIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

/* ─── Responsive ─────────────────────────────────── */
@media (max-width: 900px) {
  .overlay { display: block; }
  .sidebar {
    position: fixed;
    left: -260px;
    top: 0; bottom: 0;
    transition: left 280ms cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 40;
  }
  .sidebar--open { left: 0; }
  .burger { display: flex; }
  .top-bar { padding: 0 1.25rem; }
  .top-date { display: none; }
  .main { overflow-y: unset; }
  .main-inner { padding: 1.25rem; }
  .blob-2, .blob-3 { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .blob, .main-inner, .live-dot, .nav-active-chip { animation: none; }
}
</style>
