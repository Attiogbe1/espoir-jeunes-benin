<script lang="ts">
  import { page } from '$app/stores';
  import { langStore } from '$lib/i18n/lang.svelte.js';
  import LanguageSwitcher from './LanguageSwitcher.svelte';

  let scrolled = $state(false);
  let menuOpen = $state(false);

  $effect(() => {
    function onScroll() {
      scrolled = window.scrollY > 60;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  });

  // Close menu on route change
  $effect(() => {
    $page.url.pathname;
    menuOpen = false;
  });

  const t = $derived(langStore.t);

  const navLinks = $derived([
    { href: '/',            label: t.nav.home },
    { href: '/a-propos',   label: t.nav.about },
    { href: '/nos-actions', label: t.nav.actions },
    { href: '/evenements',  label: t.nav.events },
    { href: '/impact',     label: t.nav.impact },
    { href: '/galerie',    label: t.nav.gallery },
    { href: '/partenaires', label: t.nav.partners },
    { href: '/contact',    label: t.nav.contact },
  ]);

  function isActive(href: string): boolean {
    if (href === '/') return $page.url.pathname === '/';
    return $page.url.pathname.startsWith(href);
  }
</script>

<header class="navbar" class:scrolled class:dark-nav={!scrolled}>
  <div class="container nav-inner">
    <!-- Logo -->
    <a href="/" class="logo" aria-label="ESPOIR JEUNES BÉNIN — Accueil">
      <div class="logo-icon" aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="15" stroke="currentColor" stroke-width="1.5"/>
          <path d="M8 22 L16 8 L24 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11 18 L21 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="logo-text">
        <span class="logo-name">Espoir Jeunes</span>
        <span class="logo-country">Bénin</span>
      </div>
    </a>

    <!-- Desktop nav -->
    <nav class="nav-links" aria-label="Navigation principale">
      {#each navLinks as link}
        <a
          href={link.href}
          class:active={isActive(link.href)}
          aria-current={isActive(link.href) ? 'page' : undefined}
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <!-- Right side -->
    <div class="nav-right">
      <LanguageSwitcher />
      <a href="/contact" class="nav-cta">{t.nav.contact}</a>

      <!-- Mobile toggle -->
      <button
        class="hamburger"
        onclick={() => menuOpen = !menuOpen}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </div>

  <!-- Mobile menu -->
  <div id="mobile-menu" class="mobile-menu" class:open={menuOpen} aria-hidden={!menuOpen}>
    <nav>
      {#each navLinks as link}
        <a
          href={link.href}
          class:active={isActive(link.href)}
          onclick={() => menuOpen = false}
        >
          {link.label}
        </a>
      {/each}
      <div class="mobile-lang">
        <LanguageSwitcher />
      </div>
    </nav>
  </div>
</header>

<style>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 900;
  height: var(--nav-h);
  transition: background var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out);
}

.navbar.scrolled {
  background: rgba(248, 253, 249, 0.97);
  backdrop-filter: blur(12px);
  box-shadow: var(--shadow-sm);
  border-bottom: 1px solid var(--clr-border);
}

.navbar.dark-nav {
  background: transparent;
}

.nav-inner {
  height: var(--nav-h);
  display: flex;
  align-items: center;
  gap: var(--space-8);
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--clr-white);
  transition: opacity var(--duration-fast);
  flex-shrink: 0;
}
.scrolled .logo { color: var(--clr-primary); }
.logo:hover { opacity: 0.85; }

.logo-icon {
  color: currentColor;
  display: flex;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.logo-name {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.logo-country {
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.7;
}

/* Desktop links */
.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  margin-left: auto;
}

.nav-links a {
  padding: 0.375rem 0.75rem;
  font-size: var(--text-sm);
  font-weight: 500;
  border-radius: var(--radius-sm);
  color: rgba(255,255,255,0.8);
  transition: color var(--duration-fast), background var(--duration-fast);
  position: relative;
}

.scrolled .nav-links a {
  color: var(--clr-muted);
}

.nav-links a:hover {
  color: var(--clr-white);
  background: rgba(255,255,255,0.08);
}

.scrolled .nav-links a:hover {
  color: var(--clr-primary);
  background: rgba(27,107,69,0.07);
}

.nav-links a.active {
  color: var(--clr-accent);
  font-weight: 600;
}

.scrolled .nav-links a.active {
  color: var(--clr-primary);
}

/* Right side */
.nav-right {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-shrink: 0;
}

/* CTA button */
.nav-cta {
  display: none;
  padding: 0.5rem 1.25rem;
  background: var(--clr-accent);
  color: var(--clr-dark);
  font-size: var(--text-sm);
  font-weight: 700;
  border-radius: var(--radius-md);
  transition: all var(--duration-normal) var(--ease-out);
}
.nav-cta:hover {
  background: var(--clr-accent-dim);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(232,164,74,0.3);
}

@media (min-width: 1024px) {
  .nav-cta { display: inline-flex; }
}

/* Hamburger */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  padding: 6px;
  border-radius: var(--radius-sm);
}

.hamburger span {
  display: block;
  height: 2px;
  background: var(--clr-white);
  border-radius: 2px;
  transition: all var(--duration-normal) var(--ease-out);
  transform-origin: center;
}

.scrolled .hamburger span { background: var(--clr-body); }

@media (min-width: 1024px) {
  .hamburger { display: none; }
}

/* Mobile menu */
.mobile-menu {
  position: absolute;
  top: var(--nav-h);
  left: 0;
  right: 0;
  background: var(--clr-dark);
  border-top: 1px solid rgba(255,255,255,0.1);
  overflow: hidden;
  max-height: 0;
  transition: max-height var(--duration-slow) var(--ease-out);
}

.mobile-menu.open {
  max-height: 480px;
}

.mobile-menu nav {
  display: flex;
  flex-direction: column;
  padding: var(--space-4) 0 var(--space-6);
}

.mobile-menu a {
  padding: var(--space-3) var(--container-pad);
  font-size: var(--text-base);
  font-weight: 500;
  color: rgba(255,255,255,0.75);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  transition: color var(--duration-fast), background var(--duration-fast);
}

.mobile-menu a:hover,
.mobile-menu a.active {
  color: var(--clr-accent);
  background: rgba(255,255,255,0.04);
}

.mobile-lang {
  padding: var(--space-4) var(--container-pad);
}

@media (min-width: 1024px) {
  .mobile-menu { display: none; }
}

@media (max-width: 1023px) {
  .nav-links { display: none; }
}
</style>
