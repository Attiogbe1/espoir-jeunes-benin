<script lang="ts">
  import { langStore } from '$lib/i18n/lang.svelte.js';
  import ScrollReveal from '$lib/components/ui/ScrollReveal.svelte';
  import PageHeader from '$lib/components/ui/PageHeader.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Counter from '$lib/components/ui/Counter.svelte';
  import { timeline, founder, teamMembers } from '$lib/data/team.js';
  import { impactCounters } from '$lib/data/impact.js';

  const t = $derived(langStore.t);
</script>

<svelte:head>
  <title>À Propos — ESPOIR JEUNES BÉNIN</title>
  <meta name="description" content="Découvrez l'histoire d'ESPOIR JEUNES BÉNIN, fondée en 2021 par ATTIOGBE K. Emile à Aplahoué. 4 ans d'engagement pour l'éducation des jeunes béninois.">
</svelte:head>

<PageHeader
  label={t.about.label}
  title={t.about.title}
  subtitle="Depuis 2021, nous transformons des vies à Aplahoué grâce à l'éducation et l'engagement bénévole."
  breadcrumb={[{ label: t.nav.about, href: '' }]}
/>

<!-- ===== HISTOIRE DE FONDATION ===== -->
<section class="section bg-white">
  <div class="container founding-grid">
    <ScrollReveal direction="left" delay={0}>
      <div class="founding-text">
        <span class="label">{t.about.label}</span>
        <h2>Une conviction, un acte</h2>
        <div class="divider"></div>
        <p>{t.about.founding_text}</p>
        <p style="margin-top: 1.25rem; color: var(--clr-muted)">
          Ce qui a commencé comme des séances informelles de soutien scolaire s'est progressivement transformé en une organisation structurée, avec des processus, des bénévoles formés et des programmes documentés. ESPOIR JEUNES BÉNIN est la preuve qu'une idée ancrée dans les réalités locales peut générer un impact profond et durable.
        </p>
        <div style="margin-top: 2rem">
          <Button href="/nos-actions" variant="primary" size="md">
            Découvrir nos programmes →
          </Button>
        </div>
      </div>
    </ScrollReveal>

    <ScrollReveal direction="right" delay={100}>
      <div class="founding-visual">
        <div class="fv-photo-wrap">
          <img
            class="fv-photo"
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=700&q=80&auto=format&fit=crop"
            alt="Bénévoles ESPOIR JEUNES BÉNIN"
            loading="lazy"
          />
          <div class="fv-photo-overlay" aria-hidden="true"></div>
        </div>
        <div class="fv-card">
          <div class="fv-header">
            <span class="fv-year">2021 — Aujourd'hui</span>
          </div>
          <div class="fv-stats">
            <div class="fv-stat">
              <span class="fv-num">600+</span>
              <span class="fv-label">Vies touchées</span>
            </div>
            <div class="fv-stat">
              <span class="fv-num">4</span>
              <span class="fv-label">Années d'action</span>
            </div>
            <div class="fv-stat">
              <span class="fv-num">3</span>
              <span class="fv-label">Programmes</span>
            </div>
          </div>
          <blockquote class="fv-quote">
            "Chaque élève accompagné est une victoire pour toute la communauté d'Aplahoué."
          </blockquote>
        </div>
      </div>
    </ScrollReveal>
  </div>
</section>

<!-- ===== TIMELINE ===== -->
<section class="section timeline-section">
  <div class="container">
    <ScrollReveal direction="up" delay={0}>
      <div class="section-header centered">
        <span class="label">{t.about.timeline_label}</span>
        <h2>Notre parcours</h2>
        <div class="divider"></div>
      </div>
    </ScrollReveal>

    <div class="timeline">
      {#each timeline as item, i}
        <ScrollReveal direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 80}>
          <div class="timeline-item" class:right={i % 2 !== 0}>
            <div class="tl-content">
              <div class="tl-year">{item.year}</div>
              <h3>{item.event}</h3>
              <p>{item.detail}</p>
            </div>
            <div class="tl-dot" aria-hidden="true">
              <div class="tl-dot-inner"></div>
            </div>
            <div class="tl-spacer"></div>
          </div>
        </ScrollReveal>
      {/each}
      <div class="timeline-line" aria-hidden="true"></div>
    </div>
  </div>
</section>

<!-- ===== FONDATEUR ===== -->
<section class="section founder-section">
  <div class="container">
    <ScrollReveal direction="up" delay={0}>
      <div class="section-header centered">
        <span class="label">{t.about.founder_label}</span>
        <h2>La vision derrière l'action</h2>
        <div class="divider"></div>
      </div>
    </ScrollReveal>

    <ScrollReveal direction="up" delay={100}>
      <div class="founder-card">
        <div class="founder-avatar" aria-hidden="true">
          <span>{founder.initials}</span>
        </div>
        <div class="founder-info">
          <div class="founder-meta">
            <strong>{founder.name}</strong>
            <span>{t.about.founder_role}</span>
          </div>
          <blockquote class="founder-quote">
            <span class="fq-mark" aria-hidden="true">"</span>
            {t.about.founder_quote}
          </blockquote>
          <p class="founder-bio">{t.about.founder_bio}</p>
        </div>
      </div>
    </ScrollReveal>
  </div>
</section>

<!-- ===== ÉQUIPE ===== -->
<section class="section team-section">
  <div class="container">
    <ScrollReveal direction="up" delay={0}>
      <div class="section-header centered">
        <span class="label">L'équipe</span>
        <h2>Ceux qui font bouger les choses</h2>
        <div class="divider"></div>
        <p>Une équipe de bénévoles engagés, tous issus de la région d'Aplahoué.</p>
      </div>
    </ScrollReveal>

    <div class="team-grid">
      {#each teamMembers as member, i}
        {@const avatarGradients = [
          'linear-gradient(135deg, #0F7A4A, #22C55E)',
          'linear-gradient(135deg, #EA580C, #F97316)',
          'linear-gradient(135deg, #0A5C37, #16A34A)',
          'linear-gradient(135deg, #EAB308, #F59E0B)',
          'linear-gradient(135deg, #7C3AED, #A78BFA)',
          'linear-gradient(135deg, #0891B2, #22D3EE)',
        ]}
        <ScrollReveal direction="up" delay={i * 80}>
          <div class="team-card">
            <div class="tc-photo-wrap">
              {#if member.photo}
                <img
                  class="tc-photo"
                  src={member.photo}
                  alt="Photo de {member.name}"
                  loading="lazy"
                  onerror={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    const fallback = (e.currentTarget as HTMLElement).nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div class="tc-avatar tc-avatar-fallback" style="background: {avatarGradients[i % avatarGradients.length]}; display: none">
                  {member.initials}
                </div>
              {:else}
                <div class="tc-avatar" style="background: {avatarGradients[i % avatarGradients.length]}">
                  {member.initials}
                </div>
              {/if}
            </div>
            <h4>{member.name}</h4>
            <span class="tc-role">{member.role}</span>
            <p class="tc-quote">"{member.quote}"</p>
            <a href="/a-propos/{member.slug}" class="tc-link">
              Voir le profil →
            </a>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<!-- ===== IMPACT (reprise) ===== -->
<section class="counters-section section-sm">
  <div class="container">
    <ScrollReveal direction="up" delay={0}>
      <div class="section-header centered" style="margin-bottom: 3rem">
        <span class="label" style="color: var(--clr-primary-muted)">Impact global</span>
        <h2 style="color: white">Quatre ans, des chiffres qui parlent</h2>
        <div class="divider" style="margin-inline: auto"></div>
      </div>
    </ScrollReveal>
    <div class="counters-grid">
      {#each impactCounters as counter, i}
        <ScrollReveal direction="up" delay={i * 80}>
          <div class="counter-item">
            <Counter
              value={counter.value}
              suffix={counter.suffix}
              label={langStore.t.counters[counter.labelKey.replace('counters.', '') as keyof typeof langStore.t.counters] as string}
            />
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<style>
.bg-white { background: var(--clr-white); }

/* Founding */
.founding-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: var(--space-16);
  align-items: center;
}
@media (max-width: 1023px) {
  .founding-grid { grid-template-columns: 1fr; }
}

.founding-text .label { display: block; margin-bottom: var(--space-3); }
.founding-text h2 { margin-bottom: var(--space-4); }
.founding-text p { color: var(--clr-body); line-height: 1.75; }

.founding-visual {
  position: relative;
}

.fv-photo-wrap {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  height: 260px;
  margin-bottom: var(--space-4);
  box-shadow: var(--shadow-xl);
}

.fv-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s var(--ease-out);
}
.fv-photo-wrap:hover .fv-photo { transform: scale(1.04); }

.fv-photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(15,122,74,0.4) 0%, rgba(5,46,22,0.6) 100%);
}

.fv-card {
  background: var(--clr-dark);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-xl);
  border: 1px solid rgba(34,197,94,0.12);
}
.fv-header {
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.fv-year {
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--clr-primary-muted);
}
.fv-stats {
  display: flex;
  gap: var(--space-6);
  margin-bottom: var(--space-6);
}
.fv-stat { display: flex; flex-direction: column; gap: 2px; }
.fv-num {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--clr-accent);
  line-height: 1;
}
.fv-label { font-size: var(--text-xs); color: rgba(255,255,255,0.4); }
.fv-quote {
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-style: italic;
  color: rgba(255,255,255,0.65);
  line-height: 1.6;
  border-left: 3px solid var(--clr-primary);
  padding-left: var(--space-4);
}

/* Timeline */
.timeline-section { background: var(--clr-surface); }

.timeline {
  position: relative;
  max-width: 800px;
  margin-inline: auto;
  padding-block: var(--space-4);
}
.timeline-line {
  position: absolute;
  top: 0; bottom: 0;
  left: 50%;
  width: 2px;
  background: linear-gradient(to bottom, var(--clr-primary), var(--clr-accent));
  transform: translateX(-50%);
}
@media (max-width: 640px) {
  .timeline-line { left: 22px; }
}

.timeline-item {
  display: grid;
  grid-template-columns: 1fr 40px 1fr;
  gap: var(--space-6);
  align-items: center;
  margin-bottom: var(--space-8);
  position: relative;
  z-index: 1;
}
.timeline-item.right .tl-content { order: 3; }
.timeline-item.right .tl-spacer { order: 1; }

.tl-content {
  background: var(--clr-white);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: transform var(--duration-normal) var(--ease-out), box-shadow var(--duration-normal);
}
.tl-content:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.tl-year {
  display: inline-block;
  background: var(--clr-primary);
  color: white;
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 3px 10px;
  border-radius: 100px;
  margin-bottom: var(--space-3);
}

.tl-content h3 {
  font-size: var(--text-base);
  margin-bottom: var(--space-2);
  color: var(--clr-dark);
}

.tl-content p {
  font-size: var(--text-sm);
  color: var(--clr-muted);
  line-height: 1.6;
}

.tl-dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--clr-white);
  border: 3px solid var(--clr-primary);
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  box-shadow: 0 0 0 6px rgba(15,122,74,0.12);
  transition: box-shadow var(--duration-normal), transform var(--duration-normal);
}
.tl-dot:hover, .timeline-item:hover .tl-dot {
  box-shadow: 0 0 0 10px rgba(15,122,74,0.18);
  transform: scale(1.1);
}
.tl-dot-inner {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--clr-primary), var(--clr-primary-muted));
}

@media (max-width: 640px) {
  .timeline-item {
    grid-template-columns: 44px 1fr;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }
  .timeline-item .tl-spacer { display: none; }
  /* Dot toujours en colonne 1, contenu en colonne 2 */
  .timeline-item .tl-dot    { order: 1; }
  .timeline-item .tl-content { order: 2; }
  /* Annuler les overrides desktop pour les items .right */
  .timeline-item.right .tl-content { order: 2; }
  .timeline-item.right .tl-dot    { order: 1; }
  .tl-content { padding: var(--space-4); }
}

/* Founder */
.founder-section { background: var(--clr-white); }

.founder-card {
  display: flex;
  gap: var(--space-12);
  align-items: flex-start;
  max-width: 900px;
  margin-inline: auto;
  background: var(--clr-surface);
  border-radius: var(--radius-xl);
  padding: var(--space-12);
}
@media (max-width: 768px) {
  .founder-card { flex-direction: column; align-items: center; text-align: center; padding: var(--space-8); gap: var(--space-6); }
}

.founder-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--clr-primary), var(--clr-primary-muted));
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 8px 32px rgba(27,107,69,0.3);
}

.founder-meta {
  margin-bottom: var(--space-4);
}
.founder-meta strong {
  display: block;
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--clr-dark);
  margin-bottom: 4px;
}
.founder-meta span {
  font-size: var(--text-sm);
  color: var(--clr-primary);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.founder-quote {
  font-family: var(--font-display);
  font-size: clamp(var(--text-xl), 2vw, var(--text-2xl));
  font-style: italic;
  color: var(--clr-dark);
  line-height: 1.45;
  margin-bottom: var(--space-4);
  position: relative;
}
.fq-mark {
  font-size: 4rem;
  line-height: 0;
  vertical-align: -1rem;
  color: var(--clr-primary);
  margin-right: 4px;
  opacity: 0.3;
}
.founder-bio {
  font-size: var(--text-base);
  color: var(--clr-muted);
  line-height: 1.7;
}

/* Team */
.team-section { background: var(--clr-bg); }

.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
}
@media (max-width: 1023px) {
  .team-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .team-grid { grid-template-columns: 1fr 1fr; }
}

.team-card {
  background: var(--clr-white);
  border-radius: var(--radius-lg);
  padding: var(--space-8) var(--space-6);
  text-align: center;
  box-shadow: var(--shadow-sm);
  border-top: 3px solid var(--clr-primary);
  transition: transform var(--duration-normal) var(--ease-spring), box-shadow var(--duration-normal);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.team-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(15,122,74,0.04), transparent);
  opacity: 0;
  transition: opacity var(--duration-normal);
}
.team-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
.team-card:hover::after { opacity: 1; }
.team-card:nth-child(2) { border-top-color: var(--clr-accent); }
.team-card:nth-child(3) { border-top-color: var(--clr-primary-muted); }
.team-card:nth-child(4) { border-top-color: var(--clr-gold); }
.team-card:nth-child(5) { border-top-color: #7C3AED; }
.team-card:nth-child(6) { border-top-color: #0891B2; }

.tc-photo-wrap {
  margin-inline: auto;
  margin-bottom: var(--space-4);
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}

.tc-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.tc-avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xl);
  font-weight: 700;
  color: white;
}

.tc-avatar-fallback {
  width: 100%;
  height: 100%;
}

.team-card h4 {
  font-size: var(--text-base);
  font-family: var(--font-body);
  margin-bottom: var(--space-1);
  color: var(--clr-dark);
}

.tc-role {
  font-size: var(--text-xs);
  color: var(--clr-primary);
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: var(--space-3);
  display: block;
}

.tc-quote {
  font-size: var(--text-sm);
  color: var(--clr-muted);
  font-style: italic;
  line-height: 1.55;
  margin-bottom: var(--space-5);
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tc-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--clr-primary);
  text-decoration: none;
  padding: var(--space-2) var(--space-4);
  border: 1.5px solid var(--clr-primary);
  border-radius: 100px;
  transition: background var(--duration-fast), color var(--duration-fast);
  position: relative;
  z-index: 1;
}
.tc-link:hover {
  background: var(--clr-primary);
  color: white;
}

/* Counters (reused) */
.counters-section {
  background: var(--clr-dark);
}
.counters-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
}
@media (max-width: 768px) {
  .counters-grid { grid-template-columns: repeat(2, 1fr); }
}
.counter-item {
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, rgba(15,122,74,0.12), rgba(34,197,94,0.06));
  border: 1px solid rgba(34,197,94,0.15);
  text-align: center;
  transition: border-color var(--duration-normal), transform var(--duration-normal) var(--ease-spring);
}
.counter-item:hover {
  border-color: rgba(34,197,94,0.35);
  transform: translateY(-4px);
}
</style>
