<script lang="ts">
  import { teamMembers } from '$lib/data/team.js';
  import ScrollReveal from '$lib/components/ui/ScrollReveal.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import type { PageData } from './$types.js';

  const { data }: { data: PageData } = $props();
  const member = $derived(data.member);

  const avatarGradients: Record<string, string> = {
    'attiogbe-emile': 'linear-gradient(135deg, #0F7A4A, #22C55E)',
    'adjoua-marie':   'linear-gradient(135deg, #EA580C, #F97316)',
    'kossi-bernard':  'linear-gradient(135deg, #0A5C37, #16A34A)',
    'fifonsi-grace':  'linear-gradient(135deg, #EAB308, #F59E0B)',
  };

  const borderColors: Record<string, string> = {
    'attiogbe-emile': 'var(--clr-primary)',
    'adjoua-marie':   'var(--clr-accent)',
    'kossi-bernard':  'var(--clr-primary-muted)',
    'fifonsi-grace':  'var(--clr-gold)',
  };

  let photoError = $state(false);

  const currentIndex = $derived(teamMembers.findIndex((m) => m.slug === member.slug));
  const prevMember = $derived(currentIndex > 0 ? teamMembers[currentIndex - 1] : null);
  const nextMember = $derived(currentIndex < teamMembers.length - 1 ? teamMembers[currentIndex + 1] : null);
</script>

<svelte:head>
  <title>{member.name} — ESPOIR JEUNES BÉNIN</title>
  <meta name="description" content="{member.role} au sein d'ESPOIR JEUNES BÉNIN. {member.bio.slice(0, 120)}...">
</svelte:head>

<!-- ===== HERO MEMBRE ===== -->
<section class="member-hero">
  <div class="container hero-inner">
    <ScrollReveal direction="up" delay={0}>
      <a href="/a-propos" class="back-link">← Retour à l'équipe</a>
    </ScrollReveal>

    <div class="hero-layout">
      <!-- Photo / Avatar -->
      <ScrollReveal direction="left" delay={80}>
        <div class="photo-block">
          <div class="photo-wrap" style="border-color: {borderColors[member.slug] ?? 'var(--clr-primary)'}">
            {#if member.photo && !photoError}
              <img
                class="member-photo"
                src={member.photo}
                alt="Photo de {member.name}"
                onerror={() => (photoError = true)}
              />
            {:else}
              <div
                class="member-avatar"
                style="background: {avatarGradients[member.slug] ?? 'linear-gradient(135deg,#0F7A4A,#22C55E)'}"
              >
                {member.initials}
              </div>
            {/if}
          </div>
          <div class="photo-badge">Membre depuis {member.joinedYear}</div>
        </div>
      </ScrollReveal>

      <!-- Identité + citation -->
      <ScrollReveal direction="right" delay={120}>
        <div class="hero-info">
          <span class="role-tag" style="color: {borderColors[member.slug] ?? 'var(--clr-primary)'}; border-color: {borderColors[member.slug] ?? 'var(--clr-primary)'}">
            {member.role}
          </span>
          <h1>{member.name}</h1>
          <blockquote class="hero-quote">
            <span class="quote-mark" aria-hidden="true">"</span>
            {member.quote}
          </blockquote>
          <div class="hero-actions">
            <Button href="/contact" variant="primary" size="md">Nous contacter</Button>
            <Button href="/a-propos" variant="outline" size="md">Voir toute l'équipe</Button>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>

<!-- ===== BIOGRAPHIE ===== -->
<section class="section bg-white">
  <div class="container content-grid">
    <ScrollReveal direction="left" delay={0}>
      <div class="content-block">
        <span class="label">Biographie</span>
        <h2>Qui est {member.name.split(' ')[0]} ?</h2>
        <div class="divider"></div>
        <p class="bio-text">{member.bio}</p>
      </div>
    </ScrollReveal>

    <ScrollReveal direction="right" delay={100}>
      <div class="role-block">
        <div class="role-card">
          <div class="role-card-header" style="background: {borderColors[member.slug] ?? 'var(--clr-primary)'}">
            <span>Son rôle</span>
          </div>
          <div class="role-card-body">
            <p>{member.roleDescription}</p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  </div>
</section>

<!-- ===== RESPONSABILITÉS ===== -->
<section class="section responsibilities-section">
  <div class="container">
    <ScrollReveal direction="up" delay={0}>
      <div class="section-header centered">
        <span class="label">Missions</span>
        <h2>Ses responsabilités clés</h2>
        <div class="divider"></div>
      </div>
    </ScrollReveal>

    <div class="resp-grid">
      {#each member.responsibilities as item, i}
        <ScrollReveal direction="up" delay={i * 60}>
          <div class="resp-card">
            <div class="resp-icon" style="background: {borderColors[member.slug] ?? 'var(--clr-primary)'}">
              {i + 1}
            </div>
            <p>{item}</p>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<!-- ===== NAVIGATION ENTRE MEMBRES ===== -->
<section class="section bg-white member-nav-section">
  <div class="container">
    <div class="member-nav">
      {#if prevMember}
        <a href="/a-propos/{prevMember.slug}" class="mnav-card mnav-prev">
          <span class="mnav-dir">← Précédent</span>
          <strong>{prevMember.name}</strong>
          <span class="mnav-role">{prevMember.role}</span>
        </a>
      {:else}
        <div></div>
      {/if}

      {#if nextMember}
        <a href="/a-propos/{nextMember.slug}" class="mnav-card mnav-next">
          <span class="mnav-dir">Suivant →</span>
          <strong>{nextMember.name}</strong>
          <span class="mnav-role">{nextMember.role}</span>
        </a>
      {:else}
        <div></div>
      {/if}
    </div>
  </div>
</section>

<style>
/* Hero */
.member-hero {
  background: linear-gradient(160deg, var(--clr-dark) 0%, #052e16 100%);
  padding: var(--space-16) 0 var(--space-20);
  position: relative;
  overflow: hidden;
}
.member-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 60% at 70% 40%, rgba(15,122,74,0.18) 0%, transparent 70%);
  pointer-events: none;
}

.hero-inner { position: relative; z-index: 1; }

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: rgba(255,255,255,0.55);
  text-decoration: none;
  margin-bottom: var(--space-10);
  transition: color var(--duration-fast);
}
.back-link:hover { color: white; }

.hero-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--space-16);
  align-items: center;
}
@media (max-width: 768px) {
  .hero-layout {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

/* Photo */
.photo-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.photo-wrap {
  width: 240px;
  height: 240px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid var(--clr-primary);
  box-shadow: 0 0 0 12px rgba(15,122,74,0.15), 0 24px 60px rgba(0,0,0,0.4);
  flex-shrink: 0;
}

.member-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.member-avatar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 5rem;
  font-weight: 700;
  color: white;
}

.photo-badge {
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  background: rgba(255,255,255,0.07);
  padding: var(--space-1) var(--space-3);
  border-radius: 100px;
  border: 1px solid rgba(255,255,255,0.12);
}

/* Hero info */
.hero-info { color: white; }

.role-tag {
  display: inline-block;
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 1.5px solid;
  border-radius: 100px;
  padding: 4px 14px;
  margin-bottom: var(--space-4);
}

.hero-info h1 {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: white;
  line-height: 1.1;
  margin-bottom: var(--space-6);
}

.hero-quote {
  font-family: var(--font-display);
  font-size: clamp(var(--text-lg), 2.2vw, var(--text-2xl));
  font-style: italic;
  color: rgba(255,255,255,0.75);
  line-height: 1.5;
  border-left: 3px solid var(--clr-accent);
  padding-left: var(--space-5);
  margin-bottom: var(--space-8);
}
@media (max-width: 768px) {
  .hero-quote { border-left: none; padding-left: 0; border-top: 3px solid var(--clr-accent); padding-top: var(--space-4); }
}

.quote-mark {
  font-size: 3rem;
  line-height: 0;
  vertical-align: -0.8rem;
  color: var(--clr-accent);
  margin-right: 4px;
  opacity: 0.5;
}

.hero-actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}
@media (max-width: 768px) {
  .hero-actions { justify-content: center; }
}

/* Biographie */
.bg-white { background: var(--clr-white); }

.content-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: var(--space-16);
  align-items: start;
}
@media (max-width: 1023px) {
  .content-grid { grid-template-columns: 1fr; }
}

.content-block .label { display: block; margin-bottom: var(--space-3); }
.content-block h2 { margin-bottom: var(--space-4); }
.bio-text {
  font-size: var(--text-base);
  color: var(--clr-body);
  line-height: 1.8;
}

.role-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}
.role-card-header {
  padding: var(--space-4) var(--space-6);
  color: white;
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.role-card-body {
  background: var(--clr-surface);
  padding: var(--space-6);
}
.role-card-body p {
  font-size: var(--text-base);
  color: var(--clr-body);
  line-height: 1.75;
}

/* Responsabilités */
.responsibilities-section { background: var(--clr-surface); }

.resp-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5);
}
@media (max-width: 1023px) {
  .resp-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .resp-grid { grid-template-columns: 1fr; }
}

.resp-card {
  background: var(--clr-white);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
  box-shadow: var(--shadow-sm);
  transition: transform var(--duration-normal) var(--ease-spring), box-shadow var(--duration-normal);
}
.resp-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }

.resp-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--text-sm);
  font-weight: 700;
  flex-shrink: 0;
}

.resp-card p {
  font-size: var(--text-sm);
  color: var(--clr-body);
  line-height: 1.6;
  margin: 0;
}

/* Navigation membres */
.member-nav-section { padding-block: var(--space-10); }

.member-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
}
@media (max-width: 640px) {
  .member-nav { grid-template-columns: 1fr; }
}

.mnav-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-5) var(--space-6);
  border: 1.5px solid var(--clr-border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: border-color var(--duration-fast), box-shadow var(--duration-fast), transform var(--duration-fast);
}
.mnav-card:hover {
  border-color: var(--clr-primary);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
.mnav-next { text-align: right; }

.mnav-dir {
  font-size: var(--text-xs);
  color: var(--clr-muted);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.mnav-card strong {
  font-size: var(--text-base);
  color: var(--clr-dark);
  font-family: var(--font-display);
}
.mnav-role {
  font-size: var(--text-xs);
  color: var(--clr-primary);
}
</style>
