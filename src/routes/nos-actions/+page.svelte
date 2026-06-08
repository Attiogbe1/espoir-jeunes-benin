<script lang="ts">
  import { langStore } from '$lib/i18n/lang.svelte.js';
  import ScrollReveal from '$lib/components/ui/ScrollReveal.svelte';
  import PageHeader from '$lib/components/ui/PageHeader.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { programs } from '$lib/data/actions.js';

  const t = $derived(langStore.t);
</script>

<svelte:head>
  <title>Nos Actions — ESPOIR JEUNES BÉNIN</title>
  <meta name="description" content="TD gratuits, distribution de fournitures scolaires et formations pratiques — les 3 programmes phares d'ESPOIR JEUNES BÉNIN à Aplahoué.">
</svelte:head>

<PageHeader
  label={t.actions.label}
  title={t.actions.title}
  subtitle={t.actions.subtitle}
  breadcrumb={[{ label: t.nav.actions, href: '' }]}
/>

{#each programs as program, i}
  <section
    class="program-section section"
    id={program.slug}
    class:alt={i % 2 !== 0}
    aria-label={program.title}
  >
    <div class="container program-grid" class:reverse={i % 2 !== 0}>
      <!-- Visual -->
      <ScrollReveal direction={i % 2 !== 0 ? 'right' : 'left'} delay={0}>
        <div class="prog-visual" style="background: {program.bgGradient}">
          {#if program.img}
            <img class="prog-img" src={program.img} alt={program.title} loading="lazy" />
            <div class="prog-img-overlay" style="background: linear-gradient(160deg, {program.color}cc 0%, rgba(0,0,0,0.55) 100%)"></div>
          {/if}
          <div class="prog-icon" aria-hidden="true">{program.icon}</div>
          <div class="prog-stats-overlay">
            {#each program.stats as stat}
              <div class="po-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            {/each}
          </div>
          <svg class="prog-pattern" width="100%" height="100%" aria-hidden="true">
            <defs>
              <pattern id="prog-pattern-{i}" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M0 25L25 0L50 25L25 50Z" stroke="white" stroke-width="0.4" fill="none"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#prog-pattern-{i})" opacity="0.06"/>
          </svg>
        </div>
      </ScrollReveal>

      <!-- Text -->
      <ScrollReveal direction={i % 2 !== 0 ? 'left' : 'right'} delay={100}>
        <div class="prog-text">
          <span class="prog-num" style="color: {program.color}" aria-hidden="true">0{i + 1}</span>
          <span class="label" style="color: {program.color}">{program.subtitle}</span>
          <h2>{program.title}</h2>
          <div class="divider" style="background: linear-gradient(90deg, {program.color}, transparent)"></div>

          {#each t.actions.programs[i].text.split('\n\n') as paragraph}
            <p>{paragraph}</p>
          {/each}

          <div class="prog-stats-grid">
            {#each program.stats as stat}
              <div class="ps-item" style="border-color: {program.color}20">
                <strong style="color: {program.color}">{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            {/each}
          </div>

          <Button href="/contact" variant="primary" size="md">
            En savoir plus / Nous contacter →
          </Button>
        </div>
      </ScrollReveal>
    </div>
  </section>
{/each}

<!-- CTA final -->
<section class="section cta-final" aria-label="Soutenir nos programmes">
  <div class="container text-center">
    <ScrollReveal direction="up" delay={0}>
      <span class="label">Impliquez-vous</span>
      <h2>Vous souhaitez contribuer ?</h2>
      <div class="divider" style="margin-inline: auto"></div>
      <p style="max-width: 52ch; margin-inline: auto; color: var(--clr-muted); margin-bottom: 2rem">
        Que vous soyez bénévole, partenaire ou donateur, votre soutien fait une différence concrète pour les élèves d'Aplahoué.
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap">
        <Button href="/contact" variant="primary" size="lg">
          Devenir partenaire →
        </Button>
        <Button href="/impact" variant="outline" size="lg">
          Voir notre impact
        </Button>
      </div>
    </ScrollReveal>
  </div>
</section>

<style>
.program-section { background: var(--clr-bg); }
.program-section.alt { background: var(--clr-white); }

.program-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

.program-grid.reverse > :first-child { order: 2; }
.program-grid.reverse > :last-child { order: 1; }

@media (max-width: 1023px) {
  .program-grid { grid-template-columns: 1fr; }
  .program-grid.reverse > :first-child { order: 1; }
  .program-grid.reverse > :last-child { order: 2; }
}

@media (max-width: 640px) {
  .program-grid { gap: var(--space-8); }
  .prog-visual { min-height: 260px; }
  .prog-num { font-size: 2.5rem; }
  .prog-icon { font-size: 3.5rem; }
  .prog-stats-grid { grid-template-columns: 1fr 1fr; }
}

/* Visual */
.prog-visual {
  position: relative;
  border-radius: var(--radius-xl);
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  transition: transform var(--duration-slow) var(--ease-out);
}
.prog-visual:hover { transform: scale(1.01); }

.prog-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s var(--ease-out);
}
.prog-visual:hover .prog-img { transform: scale(1.06); }

.prog-img-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.prog-icon {
  font-size: 5rem;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 8px 24px rgba(0,0,0,0.5));
  animation: float 5s ease-in-out infinite;
}

.prog-pattern {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

.prog-stats-overlay {
  position: absolute;
  bottom: var(--space-6);
  left: var(--space-6);
  right: var(--space-6);
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  z-index: 3;
}

.po-stat {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: var(--radius-md);
  padding: 8px 14px;
  backdrop-filter: blur(8px);
}
.po-stat strong {
  display: block;
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
  color: white;
  line-height: 1;
}
.po-stat span {
  font-size: var(--text-xs);
  color: rgba(255,255,255,0.6);
}

/* Text */
.prog-text { display: flex; flex-direction: column; gap: var(--space-3); }

.prog-num {
  font-family: var(--font-display);
  font-size: 4rem;
  font-weight: 700;
  line-height: 1;
  opacity: 0.15;
  display: block;
  margin-bottom: -0.5rem;
}

.prog-text h2 { margin-block: var(--space-2); }

.prog-text p {
  color: var(--clr-muted);
  line-height: 1.75;
}

.prog-stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
  margin-block: var(--space-4);
}
.ps-item {
  padding: var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid var(--clr-border);
  background: var(--clr-surface);
  transition: border-color var(--duration-fast);
}
.ps-item:hover { border-color: currentColor; }
.ps-item strong {
  display: block;
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  line-height: 1;
  margin-bottom: 4px;
}
.ps-item span {
  font-size: var(--text-xs);
  color: var(--clr-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

/* CTA final */
.cta-final { background: var(--clr-surface); }
</style>
