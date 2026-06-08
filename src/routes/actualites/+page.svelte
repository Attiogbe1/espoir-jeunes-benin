<script lang="ts">
  import { langStore } from '$lib/i18n/lang.svelte.js';
  import ScrollReveal from '$lib/components/ui/ScrollReveal.svelte';
  import PageHeader from '$lib/components/ui/PageHeader.svelte';
  import { newsArticles } from '$lib/data/actions.js';

  const t = $derived(langStore.t);

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString(langStore.current === 'fr' ? 'fr-FR' : 'en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
</script>

<svelte:head>
  <title>Actualités — ESPOIR JEUNES BÉNIN</title>
  <meta name="description" content="Dernières nouvelles et actualités d'ESPOIR JEUNES BÉNIN : événements, distributions de fournitures, formations à Aplahoué.">
</svelte:head>

<PageHeader
  label={t.news.label}
  title={t.news.title}
  subtitle={t.news.subtitle}
  breadcrumb={[{ label: t.nav.news, href: '' }]}
/>

<section class="section news-section">
  <div class="container">
    <!-- Featured article -->
    <ScrollReveal direction="up" delay={0}>
      <article class="featured-article">
        <div class="fa-visual" aria-hidden="true">
          <div class="fa-pattern"></div>
          <span class="fa-emoji">📰</span>
        </div>
        <div class="fa-content">
          <div class="fa-meta">
            <span class="badge">{newsArticles[0].category}</span>
            <time datetime={newsArticles[0].date}>{formatDate(newsArticles[0].date)}</time>
            <span class="read-time">⏱ {newsArticles[0].readTime} de lecture</span>
          </div>
          <h2>{newsArticles[0].title}</h2>
          <p>{newsArticles[0].excerpt}</p>
          <a href="#article-{newsArticles[0].id}" class="read-link">
            {t.news.read_more}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
          </a>
        </div>
      </article>
    </ScrollReveal>

    <!-- Article grid -->
    <div class="articles-grid">
      {#each newsArticles.slice(1) as article, i}
        <ScrollReveal direction="up" delay={i * 100}>
          <article class="article-card" id="article-{article.id}">
            <div class="ac-visual" style="background: hsl({i * 60 + 140}, 40%, 25%)" aria-hidden="true">
              <div class="ac-pattern"></div>
              <span class="ac-emoji">{i === 0 ? '🎒' : '🏅'}</span>
            </div>
            <div class="ac-content">
              <div class="ac-meta">
                <span class="badge">{article.category}</span>
                <time datetime={article.date}>{formatDate(article.date)}</time>
              </div>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <div class="ac-footer">
                <span class="read-time">⏱ {article.readTime} de lecture</span>
                <a href="#article-{article.id}" class="read-link">
                  {t.news.read_more} →
                </a>
              </div>
            </div>
          </article>
        </ScrollReveal>
      {/each}
    </div>

    <!-- Newsletter CTA -->
    <ScrollReveal direction="up" delay={0}>
      <div class="newsletter-cta">
        <div class="nl-content">
          <h3>Restez informé</h3>
          <p>Suivez nos activités et recevez les dernières nouvelles de l'ONG directement dans votre boîte mail.</p>
        </div>
        <a href="/contact" class="nl-btn">
          Nous contacter pour les actualités →
        </a>
      </div>
    </ScrollReveal>
  </div>
</section>

<style>
.news-section { background: var(--clr-bg); }

/* Featured */
.featured-article {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: center;
  background: var(--clr-white);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  margin-bottom: var(--space-12);
}
@media (max-width: 768px) {
  .featured-article { grid-template-columns: 1fr; }
}

.fa-visual {
  position: relative;
  min-height: 300px;
  background: linear-gradient(135deg, var(--clr-dark), var(--clr-primary));
  display: flex;
  align-items: center;
  justify-content: center;
}

.fa-pattern {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Cpath d='M0 25L25 0L50 25L25 50Z' stroke='white' stroke-width='0.4' fill='none' opacity='0.08'/%3E%3C/svg%3E");
}

.fa-emoji {
  font-size: 4rem;
  position: relative;
  filter: drop-shadow(0 4px 16px rgba(0,0,0,0.3));
}

.fa-content {
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.fa-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.fa-meta time, .fa-meta .read-time {
  font-size: var(--text-xs);
  color: var(--clr-muted);
}

.fa-content h2 { font-size: clamp(var(--text-xl), 2.5vw, var(--text-3xl)); }

.fa-content p {
  color: var(--clr-muted);
  line-height: 1.7;
}

/* Articles grid */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-12);
}
@media (max-width: 768px) {
  .articles-grid { grid-template-columns: 1fr; }
}

.article-card {
  background: var(--clr-white);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--clr-border);
  transition: transform var(--duration-normal) var(--ease-out), box-shadow var(--duration-normal);
}
.article-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.ac-visual {
  position: relative;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ac-pattern {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0 20L20 0L40 20L20 40Z' stroke='white' stroke-width='0.3' fill='none' opacity='0.08'/%3E%3C/svg%3E");
}

.ac-emoji {
  font-size: 2.5rem;
  position: relative;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));
}

.ac-content {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.ac-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
}
.ac-meta time { font-size: var(--text-xs); color: var(--clr-muted); }

.ac-content h3 { font-size: var(--text-xl); }

.ac-content p {
  font-size: var(--text-sm);
  color: var(--clr-muted);
  line-height: 1.65;
}

.ac-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-3);
  border-top: 1px solid var(--clr-border);
}

.read-time { font-size: var(--text-xs); color: var(--clr-muted); }

.read-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--clr-primary);
  transition: gap var(--duration-fast);
}
.read-link:hover { gap: var(--space-2); }

/* Newsletter CTA */
.newsletter-cta {
  background: var(--clr-surface);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
  flex-wrap: wrap;
}

.nl-content h3 { margin-bottom: var(--space-2); }
.nl-content p { color: var(--clr-muted); font-size: var(--text-base); max-width: 44ch; }

.nl-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: var(--clr-primary);
  color: white;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: 600;
  white-space: nowrap;
  transition: all var(--duration-normal) var(--ease-out);
  flex-shrink: 0;
}
.nl-btn:hover {
  background: var(--clr-primary-dim);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

@media (max-width: 640px) {
  .newsletter-cta {
    flex-direction: column;
    align-items: stretch;
    padding: var(--space-6);
  }
  .nl-btn {
    white-space: normal;
    text-align: center;
    justify-content: center;
    width: 100%;
  }
  .fa-visual { min-height: 200px; }
  .fa-content { padding: var(--space-6); }
}
</style>
