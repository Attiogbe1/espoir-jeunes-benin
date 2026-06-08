<script lang="ts">
  import { langStore } from '$lib/i18n/lang.svelte.js';
</script>

<div class="lang-switcher" role="group" aria-label="Changer de langue">
  <button
    class:active={langStore.current === 'fr'}
    onclick={() => langStore.set('fr')}
    aria-pressed={langStore.current === 'fr'}
    aria-label="Français"
  >
    FR
  </button>
  <span aria-hidden="true">|</span>
  <button
    class:active={langStore.current === 'en'}
    onclick={() => langStore.set('en')}
    aria-pressed={langStore.current === 'en'}
    aria-label="English"
  >
    EN
  </button>
</div>

<style>
.lang-switcher {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.08em;
}

.lang-switcher span {
  color: var(--clr-border);
  user-select: none;
}

.lang-switcher button {
  color: var(--clr-muted);
  transition: color var(--duration-fast);
  padding: 0.125rem 0.25rem;
  border-radius: var(--radius-sm);
}

.lang-switcher button:hover { color: var(--clr-primary); }
.lang-switcher button.active { color: var(--clr-primary); font-weight: 700; }

/* Dark variant (for use on dark backgrounds) */
:global(.dark-nav) .lang-switcher span { color: rgba(255,255,255,0.3); }
:global(.dark-nav) .lang-switcher button { color: rgba(255,255,255,0.5); }
:global(.dark-nav) .lang-switcher button:hover { color: var(--clr-accent); }
:global(.dark-nav) .lang-switcher button.active { color: var(--clr-accent); }
</style>
