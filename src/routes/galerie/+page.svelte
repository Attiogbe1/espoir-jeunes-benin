<script lang="ts">
  import { langStore } from '$lib/i18n/lang.svelte.js';
  import ScrollReveal from '$lib/components/ui/ScrollReveal.svelte';
  import PageHeader from '$lib/components/ui/PageHeader.svelte';
  import { galleryItems } from '$lib/data/actions.js';

  const t = $derived(langStore.t);

  type FilterKey = 'all' | 'td' | 'supplies' | 'training';
  let activeFilter = $state<FilterKey>('all');
  let lightboxItem = $state<typeof galleryItems[number] | null>(null);
  let lightboxIndex = $state(0);

  const filtered = $derived(
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter(item => item.category === activeFilter)
  );

  function openLightbox(item: typeof galleryItems[number]) {
    lightboxItem = item;
    lightboxIndex = filtered.indexOf(item);
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxItem = null;
    document.body.style.overflow = '';
  }

  function prevImage() {
    lightboxIndex = (lightboxIndex - 1 + filtered.length) % filtered.length;
    lightboxItem = filtered[lightboxIndex];
  }

  function nextImage() {
    lightboxIndex = (lightboxIndex + 1) % filtered.length;
    lightboxItem = filtered[lightboxIndex];
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!lightboxItem) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  }

  const filters: { key: FilterKey; label: string }[] = $derived([
    { key: 'all', label: t.gallery.filters.all },
    { key: 'td', label: t.gallery.filters.td },
    { key: 'supplies', label: t.gallery.filters.supplies },
    { key: 'training', label: t.gallery.filters.training },
  ]);
</script>

<svelte:head>
  <title>Galerie — ESPOIR JEUNES BÉNIN</title>
  <meta name="description" content="Galerie photos des actions d'ESPOIR JEUNES BÉNIN : TD gratuits, distribution de fournitures et formations à Aplahoué.">
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<PageHeader
  label={t.gallery.label}
  title={t.gallery.title}
  subtitle={t.gallery.subtitle}
  breadcrumb={[{ label: t.nav.gallery, href: '' }]}
/>

<section class="section gallery-section">
  <div class="container">
    <!-- Filtres -->
    <ScrollReveal direction="up" delay={0}>
      <div class="filters" role="group" aria-label="Filtrer les photos">
        {#each filters as filter}
          <button
            class="filter-btn"
            class:active={activeFilter === filter.key}
            onclick={() => activeFilter = filter.key}
            aria-pressed={activeFilter === filter.key}
          >
            {filter.label}
          </button>
        {/each}
      </div>
    </ScrollReveal>

    <!-- Grille masonry -->
    <div class="masonry-grid">
      {#each filtered as item, i}
        <ScrollReveal direction="fade" delay={i * 40}>
          <button
            class="gallery-item"
            onclick={() => openLightbox(item)}
            aria-label="Ouvrir la photo : {item.label}"
          >
            <div class="gi-visual" style="background: {item.color}; height: {180 + (i % 3) * 90}px">
              {#if item.img}
                <img src={item.img} alt={item.label} loading="lazy" />
              {:else}
                <div class="gi-pattern" aria-hidden="true"></div>
              {/if}
              <div class="gi-overlay" aria-hidden="true">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </div>
            </div>
            <div class="gi-caption">
              <span class="gi-cat" style="color:{item.color}">{filters.find(f => f.key === item.category)?.label}</span>
              <span class="gi-label">{item.label}</span>
            </div>
          </button>
        </ScrollReveal>
      {/each}
    </div>

    {#if filtered.length === 0}
      <p class="no-results text-muted text-center">Aucune photo pour ce filtre.</p>
    {/if}
  </div>
</section>

<!-- Lightbox -->
{#if lightboxItem}
  <dialog
    class="lightbox"
    open
    aria-label="Visionneuse de photo"
    aria-modal="true"
  >
    <!-- eslint-disable-next-line svelte/a11y-click-events-have-key-events svelte/a11y-no-static-element-interactions -->
    <div class="lightbox-backdrop" onclick={closeLightbox} aria-hidden="true"></div>

    <div class="lightbox-content">
      <button class="lb-close" onclick={closeLightbox} aria-label="Fermer">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path d="m18 6-12 12M6 6l12 12"/>
        </svg>
      </button>

      <div class="lb-visual" style="background: {lightboxItem.color}">
        {#if lightboxItem.img}
          <img src={lightboxItem.img} alt={lightboxItem.label} />
        {:else}
          <div class="lb-pattern" aria-hidden="true"></div>
          <div class="lb-emoji" aria-hidden="true">📸</div>
        {/if}
      </div>

      <div class="lb-info">
        <span class="label">{filters.find(f => f.key === lightboxItem?.category)?.label}</span>
        <h3>{lightboxItem.label}</h3>
        <p class="lb-count">{lightboxIndex + 1} / {filtered.length}</p>
      </div>

      <div class="lb-nav">
        <button onclick={prevImage} aria-label="Image précédente" class="lb-nav-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button onclick={nextImage} aria-label="Image suivante" class="lb-nav-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  </dialog>
{/if}

<style>
.gallery-section { background: var(--clr-bg); }

/* Filters */
.filters {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  margin-bottom: var(--space-8);
}

.filter-btn {
  padding: 0.5rem 1.25rem;
  border-radius: 100px;
  font-size: var(--text-sm);
  font-weight: 600;
  border: 2px solid var(--clr-border);
  color: var(--clr-muted);
  background: transparent;
  transition: all var(--duration-normal) var(--ease-out);
}
.filter-btn:hover {
  border-color: var(--clr-primary);
  color: var(--clr-primary);
}
.filter-btn.active {
  background: var(--clr-primary);
  border-color: var(--clr-primary);
  color: white;
}

/* Masonry grid */
.masonry-grid {
  columns: 3 280px;
  column-gap: var(--space-4);
}

.gallery-item {
  display: block;
  width: 100%;
  margin-bottom: var(--space-4);
  break-inside: avoid;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: transform var(--duration-normal) var(--ease-out), box-shadow var(--duration-normal);
  box-shadow: var(--shadow-sm);
}
.gallery-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.gallery-item:hover .gi-overlay { opacity: 1; }
.gallery-item:hover .gi-visual { transform: scale(1.02); }

.gi-visual {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: transform 0.5s var(--ease-out);
}
.gi-visual img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s var(--ease-out);
}
.gallery-item:hover .gi-visual img { transform: scale(1.07); }

.gi-pattern {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0 20L20 0L40 20L20 40Z' stroke='white' stroke-width='0.4' fill='none' opacity='0.1'/%3E%3C/svg%3E");
}

.gi-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--duration-normal);
}

.gi-caption {
  background: var(--clr-white);
  padding: var(--space-3) var(--space-4);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.gi-cat {
  font-size: var(--text-xs);
  color: var(--clr-primary);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.gi-label {
  font-size: var(--text-sm);
  color: var(--clr-body);
  font-weight: 500;
}

.no-results {
  padding: var(--space-12);
  font-size: var(--text-lg);
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(13,26,18,0.92);
  cursor: pointer;
}

.lightbox-content {
  position: relative;
  z-index: 1;
  background: var(--clr-white);
  border-radius: var(--radius-xl);
  overflow: hidden;
  max-width: 700px;
  width: 90%;
  box-shadow: 0 32px 80px rgba(0,0,0,0.6);
}

.lb-close {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  z-index: 2;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--duration-fast);
}
.lb-close:hover { background: rgba(255,255,255,0.3); }

.lb-visual {
  position: relative;
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.lb-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.lb-pattern {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Cpath d='M0 25L25 0L50 25L25 50Z' stroke='white' stroke-width='0.5' fill='none' opacity='0.12'/%3E%3C/svg%3E");
}

.lb-emoji {
  font-size: 4rem;
  position: relative;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
}

.lb-info {
  padding: var(--space-6) var(--space-8);
}

.lb-info h3 { margin-block: var(--space-2); }

.lb-count {
  font-size: var(--text-sm);
  color: var(--clr-muted);
  margin-top: var(--space-1);
}

.lb-nav {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding-inline: var(--space-4);
  transform: translateY(-50%);
  pointer-events: none;
}

.lb-nav-btn {
  pointer-events: auto;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--duration-fast);
  backdrop-filter: blur(4px);
}
.lb-nav-btn:hover { background: rgba(255,255,255,0.3); }

@media (max-width: 640px) {
  .masonry-grid { columns: 2; column-gap: var(--space-3); }
}

@media (max-width: 400px) {
  .masonry-grid { columns: 1; }
}

@media (max-width: 640px) {
  .lb-visual { height: 220px; }
  .lb-info { padding: var(--space-4) var(--space-5); }
  .lightbox-content { width: 95%; border-radius: var(--radius-lg); }
  .filters { gap: var(--space-2); }
  .filter-btn { padding: 0.4rem 0.875rem; font-size: var(--text-xs); }
}
</style>
