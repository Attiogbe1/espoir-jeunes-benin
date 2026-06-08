<script lang="ts">
  import { page } from '$app/stores';
  import type { Snippet } from 'svelte';

  let { children, data }: { children: Snippet; data: { unread: number } } = $props();

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

  function active(href: string, exact = false) {
    return exact ? $page.url.pathname === href : $page.url.pathname.startsWith(href);
  }
</script>

<div class="shell">
  <!-- Ambient lighting blobs -->
  <div class="ambient" aria-hidden="true">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
  </div>

  <aside class="sidebar">
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
      {#each nav as item}
        {@const isActive = active(item.href, item.exact)}
        <a
          href={item.href}
          class="nav-link"
          class:nav-link--active={isActive}
          aria-current={isActive ? 'page' : undefined}
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
  background: #0d2016;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  position: relative;
  isolation: isolate;
}

/* ─── Ambient Lighting ───────────────────────────── */
.ambient {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
.blob {
  position: absolute;
  border-radius: 50%;
}
.blob-1 {
  width: 750px;
  height: 750px;
  background: radial-gradient(circle at center, rgba(34,197,94,0.28) 0%, transparent 65%);
  top: -320px;
  left: -200px;
  animation: drift1 20s ease-in-out infinite alternate;
}
.blob-2 {
  width: 520px;
  height: 520px;
  background: radial-gradient(circle at center, rgba(56,189,248,0.16) 0%, transparent 65%);
  bottom: -230px;
  right: -80px;
  animation: drift2 25s ease-in-out infinite alternate;
}
.blob-3 {
  width: 380px;
  height: 380px;
  background: radial-gradient(circle at center, rgba(34,197,94,0.18) 0%, transparent 65%);
  top: 40%;
  right: 18%;
  animation: drift3 16s ease-in-out infinite alternate;
}
@keyframes drift1 {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(50px, 35px) scale(1.1); }
}
@keyframes drift2 {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(-40px, -50px) scale(1.07); }
}
@keyframes drift3 {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(25px, -30px) scale(0.92); }
}

/* ─── Sidebar ────────────────────────────────────── */
.sidebar {
  width: 240px;
  flex-shrink: 0;
  background: rgba(10,26,15,0.88);
  backdrop-filter: blur(28px) saturate(140%);
  -webkit-backdrop-filter: blur(28px) saturate(140%);
  border-right: 1px solid rgba(34,197,94,0.12);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 4px 0 32px rgba(0,0,0,0.3);
}

/* Brand */
.brand {
  padding: 1.125rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.brand-link {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  text-decoration: none;
}
.brand-logo {
  width: 36px; height: 36px;
  border-radius: 10px;
  background: rgba(34,197,94,0.1);
  border: 1.5px solid rgba(34,197,94,0.28);
  display: flex; align-items: center; justify-content: center;
  transition: all 250ms ease;
  position: relative;
}
.brand-logo::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 14px;
  background: radial-gradient(circle, rgba(34,197,94,0.18), transparent 70%);
  opacity: 0;
  transition: opacity 250ms ease;
}
.brand-link:hover .brand-logo {
  background: rgba(34,197,94,0.18);
  border-color: rgba(34,197,94,0.5);
  box-shadow: 0 0 18px rgba(34,197,94,0.25);
}
.brand-link:hover .brand-logo::after { opacity: 1; }

.brand-name {
  display: block;
  font-size: 1rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.01em;
  line-height: 1;
}
.brand-tag {
  display: block;
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.28);
}
.brand-live { display: flex; align-items: center; }
.live-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #22C55E;
  box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
  animation: livePulse 2.2s ease-in-out infinite;
}
@keyframes livePulse {
  0%,100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
  50%      { box-shadow: 0 0 0 7px rgba(34,197,94,0.04); }
}

/* Nav */
.nav {
  padding: 0.875rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5625rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255,255,255,0.38);
  text-decoration: none;
  transition: color 180ms ease, background 180ms ease;
  background: none;
  border: none;
  width: 100%;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  position: relative;
  overflow: hidden;
}

/* Glowing left bar indicator */
.nav-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%) scaleY(0);
  width: 3px;
  height: 60%;
  border-radius: 0 3px 3px 0;
  background: linear-gradient(180deg, #4ade80 0%, #16a34a 100%);
  box-shadow: 0 0 12px rgba(34,197,94,0.9), 0 0 4px rgba(34,197,94,0.6);
  transition: transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.nav-link--active::before {
  transform: translateY(-50%) scaleY(1);
}

/* Shimmer ripple on hover */
.nav-link::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%);
  transform: translateX(-100%);
  transition: transform 400ms ease;
}
.nav-link:not(.nav-link--active):hover::after {
  transform: translateX(100%);
}

.nav-link:hover {
  color: rgba(255,255,255,0.82);
  background: rgba(255,255,255,0.05);
}
.nav-link--active {
  color: #fff;
  background: linear-gradient(90deg, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.04) 100%);
  font-weight: 600;
}
.nav-link--active .nav-icon { color: #22C55E; }
.nav-link--muted { color: rgba(255,255,255,0.28); }
.nav-link--muted:hover { color: rgba(255,255,255,0.58); }
.nav-link--danger { color: rgba(248,113,113,0.42); }
.nav-link--danger:hover {
  color: #f87171;
  background: rgba(239,68,68,0.08);
}

.nav-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  opacity: 0.65;
  transition: opacity 180ms ease, transform 180ms ease;
}
.nav-link--active .nav-icon { opacity: 1; }
.nav-link:hover .nav-icon { opacity: 1; transform: scale(1.08); }

.nav-active-chip {
  margin-left: auto;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #22C55E;
  box-shadow: 0 0 6px rgba(34,197,94,0.8);
  animation: chipPop 300ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
  flex-shrink: 0;
}
@keyframes chipPop {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

.nav-badge {
  margin-left: auto;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 100px;
  background: #a855f7;
  color: #fff;
  font-size: 0.625rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 10px rgba(168,85,247,0.5);
  animation: chipPop 300ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
  letter-spacing: 0;
}

.sidebar-gap { flex: 1; }

.sidebar-bottom {
  padding: 0.5rem;
  border-top: 1px solid rgba(255,255,255,0.05);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* ─── Main ───────────────────────────────────────── */
.main {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  background: transparent;
  position: relative;
  z-index: 5;
}

/* Subtle dot grid texture */
.main-grid {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image: radial-gradient(rgba(255,255,255,0.028) 1px, transparent 1px);
  background-size: 28px 28px;
}

.main-inner {
  max-width: 1080px;
  padding: 2rem 2.5rem;
  color: rgba(255,255,255,0.85);
  position: relative;
  z-index: 1;
  animation: pageIn 0.45s ease-out both;
}
@keyframes pageIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .blob { animation: none; }
  .main-inner { animation: none; }
  .live-dot { animation: none; }
  .nav-active-chip { animation: none; }
}

@media (max-width: 900px) {
  .shell { flex-direction: column; }
  .sidebar {
    width: 100%;
    height: auto;
    position: static;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  }
  .main-inner { padding: 1.25rem; }
  .blob-2, .blob-3 { display: none; }
}
</style>
