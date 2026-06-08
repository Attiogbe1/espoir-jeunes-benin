<script lang="ts">
  import { langStore } from '$lib/i18n/lang.svelte.js';
  import ScrollReveal from '$lib/components/ui/ScrollReveal.svelte';
  import PageHeader from '$lib/components/ui/PageHeader.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  const t = $derived(langStore.t);

  const partnerLogos = [
    { name: 'Ministère de l\'Éducation Nationale', initials: 'MEN', color: '#1B6B45' },
    { name: 'Mairie d\'Aplahoué', initials: 'MA', color: '#E8A44A' },
    { name: 'Association Jeunesse Couffo', initials: 'AJC', color: '#2EAD6F' },
    { name: 'Diaspora Béninoise', initials: 'DB', color: '#14523A' },
    { name: 'Université d\'Abomey-Calavi', initials: 'UAC', color: '#CF8E35' },
    { name: 'Fondation Avenir', initials: 'FA', color: '#1B6B45' },
  ];
</script>

<svelte:head>
  <title>Partenaires — ESPOIR JEUNES BÉNIN</title>
  <meta name="description" content="Devenez partenaire d'ESPOIR JEUNES BÉNIN. Découvrez nos types de partenariat : institutionnel, financier et technique.">
</svelte:head>

<PageHeader
  label={t.partners.label}
  title={t.partners.title}
  subtitle={t.partners.subtitle}
  breadcrumb={[{ label: t.nav.partners, href: '' }]}
/>

<!-- Partenaires actuels -->
<section class="section partners-section">
  <div class="container">
    <ScrollReveal direction="up" delay={0}>
      <div class="section-header centered">
        <span class="label">Nos soutiens</span>
        <h2>Partenaires et soutiens</h2>
        <div class="divider"></div>
        <p>Ils croient en notre mission et nous accompagnent dans notre action.</p>
      </div>
    </ScrollReveal>

    <div class="partners-grid">
      {#each partnerLogos as partner, i}
        <ScrollReveal direction="up" delay={i * 60}>
          <div class="partner-card">
            <div class="pc-logo" style="background: {partner.color}15; color: {partner.color}; border: 2px solid {partner.color}30">
              <span>{partner.initials}</span>
            </div>
            <p>{partner.name}</p>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<!-- Types de partenariat -->
<section class="section types-section">
  <div class="container">
    <ScrollReveal direction="up" delay={0}>
      <div class="section-header centered">
        <span class="label">{t.partners.types_label}</span>
        <h2>Comment nous rejoindre</h2>
        <div class="divider"></div>
      </div>
    </ScrollReveal>

    <div class="types-grid">
      {#each t.partners.types as type, i}
        <ScrollReveal direction="up" delay={i * 100}>
          <div class="type-card">
            <div class="type-icon" aria-hidden="true">
              {#if i === 0}🏛️{:else if i === 1}💰{:else}🔧{/if}
            </div>
            <h3>{type.title}</h3>
            <p>{type.text}</p>
            <a href="/contact" class="type-link">Nous contacter →</a>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<!-- CTA devenir partenaire -->
<section class="partnership-cta">
  <div class="partnership-bg" aria-hidden="true">
    <svg width="100%" height="100%" aria-hidden="true">
      <defs>
        <pattern id="cta2-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M0 40 L40 0 L80 40 L40 80 Z" stroke="white" stroke-width="0.8" fill="none" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cta2-pattern)"/>
    </svg>
  </div>
  <div class="container text-center" style="position: relative; z-index: 1; padding-block: var(--space-24)">
    <ScrollReveal direction="up" delay={0}>
      <span class="label" style="color: rgba(255,255,255,0.6)">Prêt à agir ?</span>
      <h2 style="color: white; margin-block: 1rem">{t.partners.become}</h2>
      <p style="color: rgba(255,255,255,0.7); max-width: 52ch; margin-inline: auto; margin-bottom: 2rem; font-size: 1.125rem">
        Votre partenariat permettra à davantage d'élèves d'Aplahoué de bénéficier de nos programmes éducatifs.
      </p>
      <Button href="/contact" variant="accent" size="lg">
        Prendre contact →
      </Button>
    </ScrollReveal>
  </div>
</section>

<style>
.partners-section { background: var(--clr-bg); }

.partners-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}
@media (max-width: 768px) {
  .partners-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .partners-grid { grid-template-columns: 1fr 1fr; }
}

.partner-card {
  background: var(--clr-white);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  text-align: center;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--clr-border);
  transition: transform var(--duration-normal) var(--ease-out), box-shadow var(--duration-normal);
}
.partner-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.pc-logo {
  width: 72px;
  height: 72px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-family: var(--font-display);
  font-size: var(--text-xl);
  margin-inline: auto;
  margin-bottom: var(--space-3);
}

.partner-card p {
  font-size: var(--text-sm);
  color: var(--clr-muted);
  line-height: 1.4;
}

/* Types */
.types-section { background: var(--clr-surface); }

.types-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}
@media (max-width: 1023px) {
  .types-grid { grid-template-columns: 1fr; max-width: 520px; margin-inline: auto; }
}

.type-card {
  background: var(--clr-white);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-sm);
  transition: transform var(--duration-normal) var(--ease-out), box-shadow var(--duration-normal);
}
.type-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

.type-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: var(--space-4);
}

.type-card h3 { margin-bottom: var(--space-3); }

.type-card p {
  font-size: var(--text-sm);
  color: var(--clr-muted);
  line-height: 1.7;
  margin-bottom: var(--space-4);
}

.type-link {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--clr-primary);
  transition: color var(--duration-fast);
}
.type-link:hover { color: var(--clr-primary-muted); }

/* CTA */
.partnership-cta {
  position: relative;
  background: var(--clr-primary);
  overflow: hidden;
}
.partnership-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
</style>
