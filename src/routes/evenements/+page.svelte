<script lang="ts">
  import { langStore } from '$lib/i18n/lang.svelte.js';
  import ScrollReveal from '$lib/components/ui/ScrollReveal.svelte';
  import PageHeader from '$lib/components/ui/PageHeader.svelte';
  import type { PageData } from './$types';
  import { categoryLabels, categoryColors } from '$lib/data/categories.js';
  import type { EventCategory } from '$lib/data/categories.js';

  let { data }: { data: PageData } = $props();

  const t = $derived(langStore.t);

  type FilterKey = 'all' | EventCategory;
  let activeFilter = $state<FilterKey>('all');

  const filtered = $derived(
    activeFilter === 'all'
      ? data.events
      : data.events.filter(e => e.category === activeFilter)
  );

  const categories: { key: FilterKey; label: string }[] = [
    { key: 'all', label: 'Tous les événements' },
    { key: 'td', label: categoryLabels.td },
    { key: 'fournitures', label: categoryLabels.fournitures },
    { key: 'formations', label: categoryLabels.formations },
    { key: 'autre', label: categoryLabels.autre },
  ];
</script>

<svelte:head>
  <title>Événements — ESPOIR JEUNES BÉNIN</title>
  <meta name="description" content="Retrouvez tous les événements et activités d'ESPOIR JEUNES BÉNIN à Aplahoué : TD gratuits, distributions de fournitures et formations.">
</svelte:head>

<PageHeader
  label="Événements"
  title="Nos activités sur le terrain"
  subtitle="Découvrez les moments forts de l'action d'ESPOIR JEUNES BÉNIN à Aplahoué."
  breadcrumb={[{ label: 'Événements', href: '' }]}
/>

<section class="section events-section">
  <div class="container">

    <!-- Filtres -->
    <ScrollReveal direction="up" delay={0}>
      <div class="filters" role="group" aria-label="Filtrer par catégorie">
        {#each categories as cat}
          {@const count = cat.key === 'all' ? data.events.length : data.events.filter(e => e.category === cat.key).length}
          {#if count > 0 || cat.key === 'all'}
            <button
              class="filter-btn"
              class:active={activeFilter === cat.key}
              onclick={() => activeFilter = cat.key}
              aria-pressed={activeFilter === cat.key}
            >
              {cat.label}
              <span class="filter-count">{count}</span>
            </button>
          {/if}
        {/each}
      </div>
    </ScrollReveal>

    {#if filtered.length === 0}
      <ScrollReveal direction="up" delay={0}>
        <div class="empty-state">
          <span aria-hidden="true">📅</span>
          <h3>Aucun événement publié</h3>
          <p>Les prochains événements apparaîtront ici dès leur publication.</p>
        </div>
      </ScrollReveal>
    {:else}
      <div class="events-grid">
        {#each filtered as event, i}
          <ScrollReveal direction="up" delay={i * 60}>
            <article class="event-card">
              <!-- Images -->
              <a href="/evenements/{event.id}" class="ec-visual" aria-label="Voir {event.title}">
                {#if event.images.length > 0}
                  <img
                    src={event.images[0]}
                    alt={event.title}
                    loading={i < 4 ? 'eager' : 'lazy'}
                  />
                  {#if event.images.length > 1}
                    <div class="ec-img-count" aria-label="{event.images.length} photos">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      {event.images.length}
                    </div>
                  {/if}
                {:else}
                  <div class="ec-placeholder" aria-hidden="true">
                    <span>📷</span>
                  </div>
                {/if}
                <div class="ec-overlay" aria-hidden="true"></div>
              </a>

              <!-- Contenu -->
              <div class="ec-body">
                <div class="ec-meta">
                  <span
                    class="ec-cat"
                    style="color: {categoryColors[event.category]}; background: {categoryColors[event.category]}18"
                  >
                    {categoryLabels[event.category]}
                  </span>
                  <time datetime={event.date}>
                    {new Date(event.date).toLocaleDateString(langStore.current === 'fr' ? 'fr-FR' : 'en-GB', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </time>
                </div>

                <h2>
                  <a href="/evenements/{event.id}">{event.title}</a>
                </h2>

                <p>{event.excerpt}</p>

                <a href="/evenements/{event.id}" class="ec-readmore">
                  Voir les photos et détails
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
                </a>
              </div>
            </article>
          </ScrollReveal>
        {/each}
      </div>
    {/if}
  </div>
</section>

<style>
.events-section { background: var(--clr-bg); }

/* Filtres */
.filters {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  margin-bottom: var(--space-8);
}
.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-size: var(--text-sm);
  font-weight: 600;
  border: 1.5px solid var(--clr-border);
  color: var(--clr-muted);
  background: transparent;
  cursor: pointer;
  font-family: var(--font-body);
  transition: all var(--duration-normal) var(--ease-out);
}
.filter-btn:hover { border-color: var(--clr-primary); color: var(--clr-primary); }
.filter-btn.active { background: var(--clr-primary); border-color: var(--clr-primary); color: white; }
.filter-count {
  background: rgba(0,0,0,0.1);
  border-radius: 100px;
  padding: 1px 7px;
  font-size: var(--text-xs);
}
.filter-btn.active .filter-count { background: rgba(255,255,255,0.2); }

/* Grid */
.events-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}
@media (max-width: 1023px) {
  .events-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .events-grid { grid-template-columns: 1fr; }
}

/* Card */
.event-card {
  background: var(--clr-white);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--clr-border);
  transition: transform var(--duration-normal) var(--ease-out), box-shadow var(--duration-normal);
  display: flex;
  flex-direction: column;
}
.event-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-xl);
}

/* Visual */
.ec-visual {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 16/10;
  background: var(--clr-surface);
  flex-shrink: 0;
}
.ec-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s var(--ease-out);
}
.event-card:hover .ec-visual img { transform: scale(1.05); }

.ec-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  background: linear-gradient(135deg, var(--clr-surface), var(--clr-border));
}

.ec-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(13,26,18,0.4), transparent 60%);
}

.ec-img-count {
  position: absolute;
  bottom: var(--space-3);
  right: var(--space-3);
  background: rgba(0,0,0,0.55);
  color: white;
  border-radius: 100px;
  padding: 3px 9px;
  font-size: var(--text-xs);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  backdrop-filter: blur(4px);
}

/* Body */
.ec-body {
  padding: var(--space-5) var(--space-5) var(--space-6);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.ec-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.ec-cat {
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 100px;
}

.ec-meta time {
  font-size: var(--text-xs);
  color: var(--clr-muted);
}

.ec-body h2 {
  font-size: var(--text-xl);
  line-height: 1.25;
  margin: 0;
}
.ec-body h2 a {
  color: var(--clr-dark);
  text-decoration: none;
  transition: color var(--duration-fast);
}
.ec-body h2 a:hover { color: var(--clr-primary); }

.ec-body p {
  font-size: var(--text-sm);
  color: var(--clr-muted);
  line-height: 1.65;
  margin: 0;
  flex: 1;
}

.ec-readmore {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--clr-primary);
  margin-top: auto;
  transition: gap var(--duration-fast);
}
.ec-readmore:hover { gap: var(--space-2); }

/* Empty */
.empty-state {
  text-align: center;
  padding: var(--space-24) var(--space-8);
  background: var(--clr-surface);
  border-radius: var(--radius-xl);
  border: 1px dashed var(--clr-border);
}
.empty-state span { font-size: 3rem; display: block; margin-bottom: var(--space-4); }
.empty-state h3 { margin-bottom: var(--space-3); }
.empty-state p { color: var(--clr-muted); }
</style>
