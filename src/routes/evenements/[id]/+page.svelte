<script lang="ts">
  import { langStore } from '$lib/i18n/lang.svelte.js';
  import ScrollReveal from '$lib/components/ui/ScrollReveal.svelte';
  import type { PageData } from './$types';
  import { categoryLabels, categoryColors } from '$lib/data/categories.js';

  let { data }: { data: PageData } = $props();

  // Lightbox state
  let lightboxOpen = $state(false);
  let lightboxIndex = $state(0);
  let dialogEl = $state<HTMLDialogElement | null>(null);

  function openLightbox(index: number) {
    lightboxIndex = index;
    lightboxOpen = true;
    dialogEl?.showModal();
  }

  function closeLightbox() {
    lightboxOpen = false;
    dialogEl?.close();
  }

  function prevImage() {
    lightboxIndex = (lightboxIndex - 1 + data.event.images.length) % data.event.images.length;
  }

  function nextImage() {
    lightboxIndex = (lightboxIndex + 1) % data.event.images.length;
  }

  function handleDialogKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  }

  function handleDialogClick(e: MouseEvent) {
    if (e.target === dialogEl) closeLightbox();
  }

  const formattedDate = $derived(
    new Date(data.event.date).toLocaleDateString(
      langStore.current === 'fr' ? 'fr-FR' : 'en-GB',
      { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    )
  );

  // Gallery layout: first image is hero, rest are grid
  const heroImage = $derived(data.event.images[0] ?? null);
  const gridImages = $derived(data.event.images.slice(1));
</script>

<svelte:head>
  <title>{data.event.title} — ESPOIR JEUNES BÉNIN</title>
  <meta name="description" content={data.event.excerpt}>
  {#if heroImage}
    <meta property="og:image" content={heroImage}>
  {/if}
</svelte:head>

<!-- Breadcrumb bar -->
<nav class="breadcrumb-bar" aria-label="Fil d'Ariane">
  <div class="container">
    <ol>
      <li><a href="/">Accueil</a></li>
      <li aria-hidden="true">›</li>
      <li><a href="/evenements">Événements</a></li>
      <li aria-hidden="true">›</li>
      <li aria-current="page">{data.event.title}</li>
    </ol>
  </div>
</nav>

<article class="event-detail">
  <div class="container">
    <div class="detail-layout">

      <!-- ─── CONTENU PRINCIPAL ─── -->
      <div class="detail-main">

        <!-- Header -->
        <ScrollReveal direction="up" delay={0}>
          <header class="detail-header">
            <div class="detail-meta">
              <span
                class="detail-cat"
                style="color: {categoryColors[data.event.category]}; background: {categoryColors[data.event.category]}18"
              >
                {categoryLabels[data.event.category]}
              </span>
              <time datetime={data.event.date}>{formattedDate}</time>
            </div>

            <h1>{data.event.title}</h1>
            <p class="detail-excerpt">{data.event.excerpt}</p>
          </header>
        </ScrollReveal>

        <!-- Hero image -->
        {#if heroImage}
          <ScrollReveal direction="up" delay={60}>
            <button
              class="hero-img-wrap"
              onclick={() => openLightbox(0)}
              aria-label="Agrandir la photo principale"
            >
              <img src={heroImage} alt={data.event.title} loading="eager" />
              <div class="hero-zoom-hint" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                Agrandir
              </div>
            </button>
          </ScrollReveal>
        {/if}

        <!-- Description -->
        <ScrollReveal direction="up" delay={80}>
          <div class="detail-description">
            {#each data.event.description.split('\n') as para}
              {#if para.trim()}
                <p>{para}</p>
              {/if}
            {/each}
          </div>
        </ScrollReveal>

        <!-- Gallery grid (images 2-N) -->
        {#if gridImages.length > 0}
          <ScrollReveal direction="up" delay={100}>
            <section class="gallery-section" aria-label="Photos de l'événement">
              <h2>Galerie photos</h2>
              <div class="gallery-grid" class:grid-2={gridImages.length === 1} class:grid-3={gridImages.length >= 2}>
                {#each gridImages as img, i}
                  <button
                    class="gallery-item"
                    onclick={() => openLightbox(i + 1)}
                    aria-label="Voir photo {i + 2}"
                  >
                    <img src={img} alt="Photo {i + 2} — {data.event.title}" loading="lazy" />
                    <div class="gallery-zoom" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    </div>
                  </button>
                {/each}
              </div>
            </section>
          </ScrollReveal>
        {/if}

        <!-- Back link -->
        <div class="back-link-wrap">
          <a href="/evenements" class="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
            Retour aux événements
          </a>
        </div>
      </div>

      <!-- ─── SIDEBAR ─── -->
      <aside class="detail-sidebar">

        <!-- Info card -->
        <ScrollReveal direction="right" delay={120}>
          <div class="info-card">
            <h3>Informations</h3>
            <dl>
              <div>
                <dt>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Date
                </dt>
                <dd><time datetime={data.event.date}>{formattedDate}</time></dd>
              </div>
              <div>
                <dt>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                  Catégorie
                </dt>
                <dd>
                  <span
                    class="sidebar-cat"
                    style="color: {categoryColors[data.event.category]}; background: {categoryColors[data.event.category]}18"
                  >
                    {categoryLabels[data.event.category]}
                  </span>
                </dd>
              </div>
              {#if data.event.images.length > 0}
                <div>
                  <dt>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    Photos
                  </dt>
                  <dd>{data.event.images.length} photo{data.event.images.length > 1 ? 's' : ''}</dd>
                </div>
              {/if}
              <div>
                <dt>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Lieu
                </dt>
                <dd>Aplahoué, Bénin</dd>
              </div>
            </dl>
          </div>
        </ScrollReveal>

        <!-- Share -->
        <ScrollReveal direction="right" delay={160}>
          <div class="share-card">
            <h3>Partager</h3>
            <div class="share-btns">
              <a
                href="https://wa.me/?text={encodeURIComponent(data.event.title + ' — ESPOIR JEUNES BÉNIN')}"
                target="_blank"
                rel="noopener noreferrer"
                class="share-btn whatsapp"
                aria-label="Partager sur WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u={encodeURIComponent('https://espoirjeunesbenin.org/evenements/' + data.event.id)}"
                target="_blank"
                rel="noopener noreferrer"
                class="share-btn facebook"
                aria-label="Partager sur Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </a>
            </div>
          </div>
        </ScrollReveal>

        <!-- CTA don -->
        <ScrollReveal direction="right" delay={200}>
          <div class="cta-card">
            <div class="cta-icon" aria-hidden="true">🤝</div>
            <h3>Soutenir notre action</h3>
            <p>Chaque contribution aide à multiplier ces événements et à toucher plus de jeunes.</p>
            <a href="/partenaires" class="cta-btn">Devenir partenaire</a>
          </div>
        </ScrollReveal>
      </aside>
    </div>

    <!-- Autres événements -->
    {#if data.related.length > 0}
      <section class="related-section" aria-label="Autres événements">
        <ScrollReveal direction="up" delay={0}>
          <h2>Autres événements</h2>
        </ScrollReveal>
        <div class="related-grid">
          {#each data.related as ev, i}
            <ScrollReveal direction="up" delay={i * 60}>
              <article class="related-card">
                <a href="/evenements/{ev.id}" class="related-visual" aria-label="Voir {ev.title}">
                  {#if ev.images.length > 0}
                    <img src={ev.images[0]} alt={ev.title} loading="lazy" />
                  {:else}
                    <div class="related-placeholder" aria-hidden="true">📷</div>
                  {/if}
                </a>
                <div class="related-body">
                  <span
                    class="related-cat"
                    style="color: {categoryColors[ev.category]}; background: {categoryColors[ev.category]}18"
                  >
                    {categoryLabels[ev.category]}
                  </span>
                  <h3><a href="/evenements/{ev.id}">{ev.title}</a></h3>
                  <time datetime={ev.date}>
                    {new Date(ev.date).toLocaleDateString(langStore.current === 'fr' ? 'fr-FR' : 'en-GB', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </time>
                </div>
              </article>
            </ScrollReveal>
          {/each}
        </div>
      </section>
    {/if}
  </div>
</article>

<!-- ─── LIGHTBOX ─── -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
  bind:this={dialogEl}
  class="lightbox"
  onkeydown={handleDialogKeydown}
  onclick={handleDialogClick}
  aria-label="Galerie photos — {data.event.title}"
>
  {#if data.event.images.length > 0}
    <div class="lb-inner" role="presentation">
      <!-- Fermer -->
      <button class="lb-close" onclick={closeLightbox} aria-label="Fermer la galerie">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      <!-- Image principale -->
      <div class="lb-img-wrap">
        <img
          src={data.event.images[lightboxIndex]}
          alt="Photo {lightboxIndex + 1} sur {data.event.images.length}"
        />
      </div>

      <!-- Navigation -->
      {#if data.event.images.length > 1}
        <button class="lb-nav lb-prev" onclick={prevImage} aria-label="Photo précédente">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button class="lb-nav lb-next" onclick={nextImage} aria-label="Photo suivante">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
        </button>

        <!-- Compteur + thumbnails -->
        <div class="lb-footer">
          <span class="lb-counter">{lightboxIndex + 1} / {data.event.images.length}</span>
          <div class="lb-thumbs" role="list">
            {#each data.event.images as img, i}
              <button
                class="lb-thumb"
                class:active={i === lightboxIndex}
                onclick={() => lightboxIndex = i}
                aria-label="Photo {i + 1}"
                aria-current={i === lightboxIndex}
              >
                <img src={img} alt="Miniature {i + 1}" />
              </button>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  {/if}
</dialog>

<style>
/* ── Breadcrumb ── */
.breadcrumb-bar {
  background: var(--clr-surface);
  border-bottom: 1px solid var(--clr-border);
  padding: var(--space-3) 0;
}
.breadcrumb-bar ol {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: var(--text-sm);
  color: var(--clr-muted);
  flex-wrap: wrap;
}
.breadcrumb-bar a {
  color: var(--clr-primary);
  text-decoration: none;
  font-weight: 500;
}
.breadcrumb-bar a:hover { text-decoration: underline; }

/* ── Layout ── */
.event-detail {
  padding: var(--space-12) 0 var(--space-20);
  background: var(--clr-bg);
}

.detail-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--space-12);
  align-items: start;
}
@media (max-width: 1023px) {
  .detail-layout { grid-template-columns: 1fr; }
  .detail-sidebar { order: -1; }
}

/* ── Header ── */
.detail-header { margin-bottom: var(--space-8); }
.detail-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
  flex-wrap: wrap;
}
.detail-cat {
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 3px 12px;
  border-radius: 100px;
}
.detail-meta time {
  font-size: var(--text-sm);
  color: var(--clr-muted);
  text-transform: capitalize;
}
.detail-header h1 {
  font-size: clamp(var(--text-2xl), 4vw, var(--text-4xl));
  color: var(--clr-dark);
  line-height: 1.15;
  margin-bottom: var(--space-4);
}
.detail-excerpt {
  font-size: var(--text-lg);
  color: var(--clr-muted);
  line-height: 1.6;
  border-left: 3px solid var(--clr-accent);
  padding-left: var(--space-5);
  margin: 0;
}

/* ── Hero image ── */
.hero-img-wrap {
  display: block;
  width: 100%;
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-bottom: var(--space-8);
  cursor: zoom-in;
  position: relative;
  background: none;
  border: none;
  padding: 0;
}
.hero-img-wrap img {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  display: block;
  transition: transform 0.5s var(--ease-out);
}
.hero-img-wrap:hover img { transform: scale(1.02); }
.hero-zoom-hint {
  position: absolute;
  bottom: var(--space-4);
  right: var(--space-4);
  background: rgba(0,0,0,0.6);
  color: white;
  border-radius: 100px;
  padding: 6px 14px;
  font-size: var(--text-xs);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
  opacity: 0;
  transition: opacity var(--duration-normal);
  backdrop-filter: blur(4px);
}
.hero-img-wrap:hover .hero-zoom-hint { opacity: 1; }

/* ── Description ── */
.detail-description {
  margin-bottom: var(--space-10);
}
.detail-description p {
  font-size: var(--text-base);
  line-height: 1.8;
  color: var(--clr-body);
  margin-bottom: var(--space-4);
}

/* ── Gallery ── */
.gallery-section { margin-bottom: var(--space-10); }
.gallery-section h2 {
  font-size: var(--text-2xl);
  margin-bottom: var(--space-6);
  color: var(--clr-dark);
}

.gallery-grid {
  display: grid;
  gap: var(--space-3);
}
.gallery-grid.grid-2 { grid-template-columns: 1fr; }
.gallery-grid.grid-3 { grid-template-columns: repeat(3, 1fr); }
@media (max-width: 640px) {
  .gallery-grid.grid-3 { grid-template-columns: repeat(2, 1fr); }
}

.gallery-item {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--clr-surface);
  cursor: zoom-in;
  border: none;
  padding: 0;
  aspect-ratio: 4/3;
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s var(--ease-out);
}
.gallery-item:hover img { transform: scale(1.06); }
.gallery-zoom {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(13,26,18,0.45);
  color: white;
  opacity: 0;
  transition: opacity var(--duration-normal);
}
.gallery-item:hover .gallery-zoom { opacity: 1; }

/* ── Back link ── */
.back-link-wrap { margin-top: var(--space-6); }
.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--clr-primary);
  transition: gap var(--duration-fast);
}
.back-link:hover { gap: var(--space-3); }

/* ── Sidebar ── */
.detail-sidebar {
  position: sticky;
  top: calc(var(--nav-h) + var(--space-6));
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}
@media (max-width: 1023px) {
  .detail-sidebar { position: static; }
}

.info-card, .share-card, .cta-card {
  background: white;
  border-radius: var(--radius-xl);
  border: 1px solid var(--clr-border);
  padding: var(--space-6);
}
.info-card h3, .share-card h3, .cta-card h3 {
  font-size: var(--text-base);
  font-weight: 700;
  margin-bottom: var(--space-4);
  color: var(--clr-dark);
}

.info-card dl { display: flex; flex-direction: column; gap: var(--space-4); }
.info-card dl > div { display: flex; flex-direction: column; gap: var(--space-1); }
.info-card dt {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--clr-muted);
}
.info-card dd {
  font-size: var(--text-sm);
  color: var(--clr-body);
  margin: 0;
  font-weight: 500;
  text-transform: capitalize;
}
.sidebar-cat {
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 2px 10px;
  border-radius: 100px;
}

.share-btns { display: flex; flex-direction: column; gap: var(--space-3); }
.share-btn {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 0.625rem 1rem;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: 600;
  transition: opacity var(--duration-fast);
}
.share-btn:hover { opacity: 0.85; }
.share-btn.whatsapp { background: #25D366; color: white; }
.share-btn.facebook { background: #1877F2; color: white; }

.cta-card { background: var(--clr-primary); border-color: transparent; text-align: center; }
.cta-card .cta-icon { font-size: 2rem; display: block; margin-bottom: var(--space-3); }
.cta-card h3 { color: white; }
.cta-card p { font-size: var(--text-sm); color: rgba(255,255,255,0.8); line-height: 1.6; margin-bottom: var(--space-4); }
.cta-btn {
  display: inline-block;
  background: var(--clr-accent);
  color: white;
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: 700;
  transition: background var(--duration-fast);
}
.cta-btn:hover { background: var(--clr-accent-dim); }

/* ── Related ── */
.related-section {
  margin-top: var(--space-16);
  padding-top: var(--space-12);
  border-top: 1px solid var(--clr-border);
}
.related-section > h2 {
  font-size: var(--text-2xl);
  margin-bottom: var(--space-8);
  color: var(--clr-dark);
}
.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}
@media (max-width: 768px) {
  .related-grid { grid-template-columns: 1fr; }
}

.related-card {
  background: white;
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--clr-border);
  transition: transform var(--duration-normal), box-shadow var(--duration-normal);
}
.related-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }

.related-visual {
  display: block;
  overflow: hidden;
  aspect-ratio: 16/10;
  background: var(--clr-surface);
}
.related-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s var(--ease-out);
}
.related-card:hover .related-visual img { transform: scale(1.05); }
.related-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  background: linear-gradient(135deg, var(--clr-surface), var(--clr-border));
}

.related-body { padding: var(--space-4) var(--space-5) var(--space-5); }
.related-cat {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 100px;
  margin-bottom: var(--space-2);
}
.related-body h3 {
  font-size: var(--text-base);
  line-height: 1.3;
  margin-bottom: var(--space-2);
}
.related-body h3 a {
  color: var(--clr-dark);
  text-decoration: none;
  transition: color var(--duration-fast);
}
.related-body h3 a:hover { color: var(--clr-primary); }
.related-body time {
  font-size: var(--text-xs);
  color: var(--clr-muted);
}

/* ── Lightbox ── */
.lightbox {
  position: fixed;
  inset: 0;
  margin: 0;
  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
  background: rgba(6, 15, 9, 0.96);
  border: none;
  padding: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
}
.lightbox::backdrop { background: transparent; }

.lb-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
  padding: var(--space-10) var(--space-16);
  box-sizing: border-box;
}

.lb-close {
  position: absolute;
  top: var(--space-5);
  right: var(--space-5);
  background: rgba(255,255,255,0.1);
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--duration-fast);
  z-index: 1;
}
.lb-close:hover { background: rgba(255,255,255,0.2); }

.lb-img-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 0;
}
.lb-img-wrap img {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}

.lb-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.1);
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--duration-fast);
  z-index: 1;
}
.lb-nav:hover { background: rgba(255,255,255,0.2); }
.lb-prev { left: var(--space-4); }
.lb-next { right: var(--space-4); }

.lb-footer {
  padding-top: var(--space-4);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
}
.lb-counter {
  font-size: var(--text-sm);
  color: rgba(255,255,255,0.6);
  font-weight: 600;
}
.lb-thumbs {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  justify-content: center;
  max-width: 600px;
}
.lb-thumb {
  width: 60px;
  height: 45px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color var(--duration-fast), opacity var(--duration-fast);
  opacity: 0.6;
  padding: 0;
  background: none;
}
.lb-thumb.active { border-color: var(--clr-accent); opacity: 1; }
.lb-thumb:hover { opacity: 0.9; }
.lb-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 640px) {
  .lb-inner { padding: var(--space-8) var(--space-10); }
  .lb-img-wrap img { max-height: 55vh; }
  .lb-thumb { width: 48px; height: 36px; }
}
</style>
