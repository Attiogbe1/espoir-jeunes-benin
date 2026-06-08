<script lang="ts">
  import { langStore } from '$lib/i18n/lang.svelte.js';
  import ScrollReveal from '$lib/components/ui/ScrollReveal.svelte';
  import Counter from '$lib/components/ui/Counter.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { impactCounters } from '$lib/data/impact.js';
  import { testimonials } from '$lib/data/testimonials.js';
  import { programs } from '$lib/data/actions.js';

  const t = $derived(langStore.t);

  let currentTestimonial = $state(0);
  let heroVisible = $state(false);

  import { onMount } from 'svelte';
  onMount(() => {
    setTimeout(() => heroVisible = true, 50);
  });

  function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  }
  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  }
</script>

<svelte:head>
  <title>ESPOIR JEUNES BÉNIN — ONG Éducation Aplahoué</title>
  <meta name="description" content="ONG ESPOIR JEUNES BÉNIN — Depuis 2021, nous soutenons plus de 600 élèves à Aplahoué par des TD gratuits, des fournitures scolaires et des formations pratiques.">
  <meta property="og:title" content="ESPOIR JEUNES BÉNIN — ONG Éducation">
  <meta property="og:description" content="600+ élèves bénéficiaires · 4 ans d'action · Aplahoué, Bénin">
</svelte:head>

<!-- ============================================================ HERO -->
<section class="hero" aria-label="Section principale">
  <div class="hero-bg" aria-hidden="true">
    <div class="hero-visual">
      <div class="hero-visual-inner">
        <!-- Photo de fond Unsplash -->
        <img
          class="hero-photo"
          src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1920&q=80&auto=format&fit=crop"
          alt=""
          fetchpriority="high"
        />
        <div class="hero-overlay"></div>
        <!-- Blobs lumineux -->
        <div class="hero-blob blob-a"></div>
        <div class="hero-blob blob-b"></div>
        <div class="hero-blob blob-c"></div>
      </div>
    </div>
  </div>

  <div class="container hero-inner">
    <!-- Left: text content -->
    <div class="hero-content" class:visible={heroVisible}>
      <div class="hero-badge-row" style="transition-delay: 0ms">
        <span class="badge">{t.hero.badge}</span>
      </div>

      <h1 class="hero-title" style="transition-delay: 120ms">
        {#each t.hero.title.split('\n') as line, i}
          <span class="hero-title-line" style="transition-delay: {120 + i * 80}ms">{line}</span>
        {/each}
      </h1>

      <p class="hero-subtitle" style="transition-delay: 360ms">
        {t.hero.subtitle}
      </p>

      <div class="hero-btns" style="transition-delay: 460ms">
        <Button href="/nos-actions" variant="accent" size="lg">
          {t.hero.cta_actions}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
        </Button>
        <Button href="/contact" variant="white" size="lg">
          {t.hero.cta_partner}
        </Button>
      </div>

      <div class="hero-proof" style="transition-delay: 540ms">
        <div class="proof-item">
          <strong>600+</strong>
          <span>élèves accompagnés</span>
        </div>
        <div class="proof-sep" aria-hidden="true"></div>
        <div class="proof-item">
          <strong>4 ans</strong>
          <span>d'action terrain</span>
        </div>
        <div class="proof-sep" aria-hidden="true"></div>
        <div class="proof-item">
          <strong>🇧🇯</strong>
          <span>Aplahoué, Bénin</span>
        </div>
      </div>
    </div>

    <!-- Right: decorative card -->
    <div class="hero-card-col" class:visible={heroVisible} style="transition-delay: 300ms" aria-hidden="true">
      <div class="hero-card">
        <div class="hc-header">
          <div class="hc-dots">
            <span></span><span></span><span></span>
          </div>
          <span class="hc-label">Impact 2024</span>
        </div>
        <div class="hc-body">
          <div class="hc-stat">
            <span class="hc-num">600+</span>
            <span class="hc-desc">Élèves bénéficiaires</span>
          </div>
          <div class="hc-bar-row">
            <span class="hc-bar-label">TD Gratuits</span>
            <div class="hc-bar"><div class="hc-fill" style="width: 88%"></div></div>
          </div>
          <div class="hc-bar-row">
            <span class="hc-bar-label">Fournitures</span>
            <div class="hc-bar"><div class="hc-fill" style="width: 72%; background: var(--clr-accent)"></div></div>
          </div>
          <div class="hc-bar-row">
            <span class="hc-bar-label">Formations</span>
            <div class="hc-bar"><div class="hc-fill" style="width: 55%; background: var(--clr-primary-muted)"></div></div>
          </div>
          <div class="hc-footer">
            <span>🇧🇯 Aplahoué, Couffo</span>
            <span class="hc-badge-active">Actif</span>
          </div>
        </div>
      </div>

      <!-- Floating chips -->
      <div class="hero-chip chip-a">🎓 TD Gratuits</div>
      <div class="hero-chip chip-b">📚 600+ élèves</div>
      <div class="hero-chip chip-c">🌱 Depuis 2021</div>
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="scroll-indicator" aria-hidden="true">
    <div class="scroll-line"></div>
    <span>{t.hero.scroll}</span>
  </div>
</section>


<!-- ============================================================ COMPTEURS -->
<section class="counters-section" aria-label="Chiffres clés">
  <div class="container">
    <ScrollReveal direction="up" delay={0}>
      <div class="counters-header">
        <span class="label" style="color: var(--clr-primary-muted)">{t.counters.headline}</span>
        <p class="counters-subtitle">{t.counters.subtitle}</p>
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


<!-- ============================================================ MISSION & VALEURS -->
<section class="section mission-section" aria-label="Mission et valeurs">
  <div class="container">
    <ScrollReveal direction="up" delay={0}>
      <div class="section-header centered">
        <span class="label">{t.mission.label}</span>
        <h2>{t.mission.title}</h2>
        <div class="divider"></div>
        <p>{t.mission.subtitle}</p>
      </div>
    </ScrollReveal>

    <div class="values-grid">
      {#each t.mission.cards as card, i}
        <ScrollReveal direction="up" delay={i * 80}>
          <div class="value-card">
            <div class="vc-icon" aria-hidden="true">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>


<!-- ============================================================ ACTIONS PHARES -->
<section class="section actions-section" aria-label="Programmes">
  <div class="container">
    <ScrollReveal direction="up" delay={0}>
      <div class="section-header centered">
        <span class="label">{t.actions.label}</span>
        <h2>{t.actions.title}</h2>
        <div class="divider"></div>
        <p>{t.actions.subtitle}</p>
      </div>
    </ScrollReveal>

    <div class="programs-grid">
      {#each programs as program, i}
        <ScrollReveal direction="up" delay={i * 100}>
          <article class="program-card">
            <div class="pc-visual" style="background: {program.bgGradient}" aria-hidden="true">
              <img src={program.img} alt="" class="pc-img" />
              <div class="pc-img-overlay"></div>
              <span class="pc-icon">{program.icon}</span>
            </div>
            <div class="pc-body">
              <span class="label" style="color: {program.color}">{program.subtitle}</span>
              <h3>{t.actions.programs[i].title}</h3>
              <p>{t.actions.programs[i].text}</p>
              <a href="/nos-actions#{program.slug}" class="pc-link" style="color: {program.color}">
                {t.actions.learn_more}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
              </a>
            </div>
          </article>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>


<!-- ============================================================ TÉMOIGNAGES -->
<section class="section testimonials-section" aria-label="Témoignages">
  <div class="container">
    <ScrollReveal direction="up" delay={0}>
      <div class="section-header centered">
        <span class="label">{t.testimonials.label}</span>
        <h2>{t.testimonials.title}</h2>
        <div class="divider"></div>
        <p>{t.testimonials.subtitle}</p>
      </div>
    </ScrollReveal>

    <ScrollReveal direction="up" delay={100}>
      <div class="testimonials-wrapper">
        <div class="testimonial-slide" aria-live="polite">
          <div class="ts-quote" aria-hidden="true">"</div>
          <blockquote class="ts-text">
            {testimonials[currentTestimonial].text}
          </blockquote>
          <div class="ts-author">
            <div
              class="ts-avatar"
              style="background: {testimonials[currentTestimonial].color}"
              aria-hidden="true"
            >
              {testimonials[currentTestimonial].initials}
            </div>
            <div class="ts-info">
              <strong>{testimonials[currentTestimonial].name}</strong>
              <span>{testimonials[currentTestimonial].role}</span>
            </div>
            <div class="ts-stars" aria-label="{testimonials[currentTestimonial].stars} étoiles sur 5">
              {#each Array(testimonials[currentTestimonial].stars) as _}
                <span aria-hidden="true">★</span>
              {/each}
            </div>
          </div>
        </div>

        <div class="ts-controls">
          <button
            onclick={prevTestimonial}
            class="ts-btn"
            aria-label="Témoignage précédent"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          <div class="ts-dots" role="tablist" aria-label="Sélection du témoignage">
            {#each testimonials as _, i}
              <button
                class="ts-dot"
                class:active={i === currentTestimonial}
                onclick={() => currentTestimonial = i}
                role="tab"
                aria-selected={i === currentTestimonial}
                aria-label="Témoignage {i + 1}"
              ></button>
            {/each}
          </div>

          <button
            onclick={nextTestimonial}
            class="ts-btn"
            aria-label="Témoignage suivant"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </ScrollReveal>
  </div>
</section>


<!-- ============================================================ CTA PARTENARIAT -->
<section class="partnership-cta" aria-label="Devenir partenaire">
  <!-- Photo de fond percutante -->
  <img
    class="cta-photo"
    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80&auto=format&fit=crop"
    alt=""
    loading="lazy"
    aria-hidden="true"
  />
  <div class="partnership-bg" aria-hidden="true"></div>

  <div class="container cta-inner">
    <ScrollReveal direction="up" delay={0}>
      <div class="cta-badge-row">
        <span class="badge accent">{t.partnership_cta.label}</span>
      </div>
      <h2 class="cta-title">{t.partnership_cta.title}</h2>
      <p class="cta-subtitle">{t.partnership_cta.subtitle}</p>
      <div class="cta-btns">
        <Button href="/contact" variant="accent" size="lg">
          {t.partnership_cta.cta}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
        </Button>
        <Button href="/impact" variant="white" size="lg">
          Voir notre impact
        </Button>
      </div>
      <!-- Social proof mini -->
      <div class="cta-proof">
        <div class="cp-avatars" aria-hidden="true">
          {#each ['#1B6B45','#E8A44A','#2EAD6F','#0F7A4A'] as c}
            <div class="cp-av" style="background:{c}"></div>
          {/each}
        </div>
        <span>+{t.counters.students ?? '600'} élèves déjà accompagnés</span>
      </div>
    </ScrollReveal>
  </div>
</section>


<style>
/* ===== HERO ===== */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--clr-dark);
}

.hero-bg {
  position: absolute;
  inset: 0;
}

.hero-visual, .hero-visual-inner {
  position: absolute;
  inset: 0;
}

.hero-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  animation: heroZoom 20s ease-in-out infinite alternate;
}
@keyframes heroZoom {
  from { transform: scale(1); }
  to   { transform: scale(1.06); }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to right, rgba(5,46,22,0.93) 0%, rgba(5,46,22,0.70) 55%, rgba(15,122,74,0.25) 100%),
    linear-gradient(to top, rgba(5,46,22,0.5) 0%, transparent 50%);
}

.hero-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
}
.blob-a {
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(15,122,74,0.30), transparent 65%);
  top: -150px; right: -100px;
  animation: floatSlow 12s ease-in-out infinite;
}
.blob-b {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(249,115,22,0.15), transparent 65%);
  bottom: -80px; left: -80px;
  animation: floatSlow 16s ease-in-out infinite reverse;
}
.blob-c {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(234,179,8,0.12), transparent 65%);
  top: 40%; left: 40%;
  animation: floatSlow 9s ease-in-out infinite 2s;
}

.hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 460px;
  gap: var(--space-16);
  align-items: center;
  padding-top: calc(var(--nav-h) + var(--space-16));
  padding-bottom: var(--space-24);
}

@media (max-width: 1023px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: var(--space-12);
  }
}

@media (max-width: 640px) {
  .hero-inner {
    padding-top: calc(var(--nav-h) + var(--space-8));
    padding-bottom: var(--space-14);
    gap: var(--space-8);
  }
  .hero-title {
    font-size: clamp(2.2rem, 9vw, 3rem);
  }
  .hero-btns {
    flex-direction: column;
    align-items: stretch;
  }
  .hero-proof {
    gap: var(--space-3);
  }
  .proof-item strong {
    font-size: var(--text-xl);
  }
}

/* Hero content */
.hero-content {
  max-width: 640px;
}

.hero-content > * {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
}

.hero-content.visible > * {
  opacity: 1;
  transform: none;
}

.hero-badge-row { margin-bottom: var(--space-6); }

.hero-title {
  display: flex;
  flex-direction: column;
  font-family: var(--font-display);
  font-size: clamp(3rem, 6.5vw, 5.5rem);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.025em;
  color: var(--clr-white);
  margin-bottom: var(--space-6);
}

.hero-title-line:last-child {
  background: linear-gradient(135deg, var(--clr-accent), var(--clr-primary-muted));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: clamp(var(--text-base), 1.6vw, var(--text-lg));
  color: rgba(255,255,255,0.7);
  line-height: 1.7;
  max-width: 52ch;
  margin-bottom: var(--space-8);
}

.hero-btns {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-bottom: var(--space-10);
}

.hero-proof {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  flex-wrap: wrap;
}

.proof-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.proof-item strong {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--clr-accent);
  line-height: 1;
}
.proof-item span {
  font-size: var(--text-xs);
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.proof-sep {
  width: 1px;
  height: 32px;
  background: rgba(255,255,255,0.15);
}

/* Hero card column */
.hero-card-col {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 0.8s var(--ease-out) 0.3s, transform 0.8s var(--ease-out) 0.3s;
}
.hero-card-col.visible {
  opacity: 1;
  transform: none;
}

@media (max-width: 1023px) {
  .hero-card-col { display: none; }
}

.hero-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  width: 320px;
  backdrop-filter: blur(12px);
  box-shadow: 0 24px 64px rgba(0,0,0,0.4);
}

.hc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-6);
}
.hc-dots {
  display: flex;
  gap: 5px;
}
.hc-dots span {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
}
.hc-dots span:first-child { background: #ff5f57; }
.hc-dots span:nth-child(2) { background: #ffbd2e; }
.hc-dots span:last-child { background: #28c840; }

.hc-label {
  font-size: var(--text-xs);
  font-weight: 600;
  color: rgba(255,255,255,0.4);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hc-stat {
  margin-bottom: var(--space-6);
}
.hc-num {
  display: block;
  font-family: var(--font-display);
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1;
  color: var(--clr-accent);
}
.hc-desc {
  font-size: var(--text-sm);
  color: rgba(255,255,255,0.5);
}

.hc-bar-row {
  display: grid;
  grid-template-columns: 90px 1fr;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}
.hc-bar-label {
  font-size: var(--text-xs);
  color: rgba(255,255,255,0.5);
}
.hc-bar {
  height: 6px;
  background: rgba(255,255,255,0.08);
  border-radius: 3px;
  overflow: hidden;
}
.hc-fill {
  height: 100%;
  background: var(--clr-primary-muted);
  border-radius: 3px;
  transition: width 1.5s var(--ease-out);
}

.hc-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid rgba(255,255,255,0.08);
  font-size: var(--text-xs);
  color: rgba(255,255,255,0.4);
}

.hc-badge-active {
  background: rgba(46,173,111,0.2);
  color: var(--clr-primary-muted);
  border: 1px solid rgba(46,173,111,0.3);
  border-radius: 100px;
  padding: 2px 8px;
  font-weight: 600;
}

/* Floating chips */
.hero-chip {
  position: absolute;
  border-radius: 100px;
  padding: 8px 16px;
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--clr-white);
  backdrop-filter: blur(10px);
  white-space: nowrap;
  animation: float 5s ease-in-out infinite;
  letter-spacing: 0.04em;
}
.chip-a {
  top: 20px; left: -40px;
  background: linear-gradient(135deg, rgba(15,122,74,0.7), rgba(34,197,94,0.5));
  border: 1px solid rgba(34,197,94,0.4);
  animation-delay: 0s;
}
.chip-b {
  bottom: 100px; right: -30px;
  background: linear-gradient(135deg, rgba(249,115,22,0.7), rgba(234,88,12,0.5));
  border: 1px solid rgba(249,115,22,0.4);
  animation-delay: 1.8s;
}
.chip-c {
  bottom: 30px; left: -20px;
  background: linear-gradient(135deg, rgba(234,179,8,0.65), rgba(202,138,4,0.5));
  border: 1px solid rgba(234,179,8,0.4);
  animation-delay: 3.4s;
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  animation: fadeInUp 1s 1.5s both;
}
.scroll-line {
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, var(--clr-accent), transparent);
  animation: scrollAnim 2s ease-in-out infinite;
}
@keyframes scrollAnim {
  0%, 100% { opacity: 0.3; transform: scaleY(0.8); transform-origin: top; }
  50% { opacity: 1; transform: scaleY(1); }
}
.scroll-indicator span {
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateX(-50%) translateY(16px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}


/* ===== COUNTERS ===== */
.counters-section {
  padding-block: var(--space-16);
  background: var(--clr-dark);
  position: relative;
  overflow: hidden;
}

.counters-section::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(27,107,69,0.4), transparent);
}

.counters-header {
  text-align: center;
  margin-bottom: var(--space-12);
}

.counters-subtitle {
  font-size: var(--text-base);
  color: rgba(255,255,255,0.5);
  margin-top: var(--space-2);
}

.counters-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-8);
  position: relative;
}

.counters-grid::before {
  content: '';
  position: absolute;
  inset: -var(--space-8) 0;
}

.counter-item {
  padding: var(--space-8) var(--space-6);
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, rgba(15,122,74,0.12), rgba(34,197,94,0.06));
  border: 1px solid rgba(34,197,94,0.2);
  text-align: center;
  transition: transform var(--duration-normal) var(--ease-out),
              border-color var(--duration-normal),
              box-shadow var(--duration-normal);
  position: relative;
  overflow: hidden;
}
.counter-item::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
  transition: left 0.6s var(--ease-out);
}
.counter-item:hover::before { left: 150%; }
.counter-item:hover {
  transform: translateY(-6px);
  border-color: rgba(34,197,94,0.4);
  box-shadow: 0 12px 36px rgba(15,122,74,0.3);
}

@media (max-width: 768px) {
  .counters-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .counters-grid { grid-template-columns: 1fr 1fr; gap: var(--space-4); }
}


/* ===== MISSION & VALEURS ===== */
.mission-section {
  background: var(--clr-bg);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
  margin-top: var(--space-2);
}

@media (max-width: 1023px) {
  .values-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .values-grid { grid-template-columns: 1fr; }
}

.value-card {
  background: var(--clr-white);
  border-radius: var(--radius-lg);
  padding: var(--space-8) var(--space-6);
  border-top: 4px solid var(--clr-primary);
  box-shadow: var(--shadow-sm);
  transition: transform var(--duration-normal) var(--ease-spring),
              box-shadow var(--duration-normal);
  position: relative;
  overflow: hidden;
}
.value-card::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--clr-primary), var(--clr-accent));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--duration-slow) var(--ease-out);
}
.value-card:hover::after { transform: scaleX(1); }
.value-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}
.value-card:nth-child(2) { border-top-color: var(--clr-accent); }
.value-card:nth-child(3) { border-top-color: var(--clr-primary-muted); }
.value-card:nth-child(4) { border-top-color: var(--clr-gold); }

.vc-icon {
  font-size: 2rem;
  margin-bottom: var(--space-4);
  display: block;
}

.value-card h3 {
  margin-bottom: var(--space-3);
  font-size: var(--text-lg);
}

.value-card p {
  font-size: var(--text-sm);
  color: var(--clr-muted);
  line-height: 1.6;
}


/* ===== PROGRAMMES ===== */
.actions-section {
  background: var(--clr-surface);
}

.programs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

@media (max-width: 1023px) {
  .programs-grid { grid-template-columns: 1fr; max-width: 520px; margin-inline: auto; }
}

.program-card {
  background: var(--clr-white);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform var(--duration-normal) var(--ease-out), box-shadow var(--duration-normal);
}
.program-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-xl);
}
.program-card:hover .pc-visual { transform: scale(1.04); }

.pc-visual {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.5s var(--ease-out);
}
.pc-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out);
}
.program-card:hover .pc-img { transform: scale(1.08); }
.pc-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(5,46,22,0.45), rgba(5,46,22,0.7));
}
.pc-icon {
  font-size: 3rem;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 4px 16px rgba(0,0,0,0.5));
  animation: float 6s ease-in-out infinite;
}

.pc-body {
  padding: var(--space-6);
}

.pc-body h3 {
  margin-bottom: var(--space-3);
  font-size: var(--text-xl);
}

.pc-body p {
  font-size: var(--text-sm);
  color: var(--clr-muted);
  line-height: 1.65;
  margin-bottom: var(--space-4);
}

.pc-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-sm);
  font-weight: 600;
  transition: gap var(--duration-fast);
}
.pc-link:hover { gap: var(--space-2); }


/* ===== TÉMOIGNAGES ===== */
.testimonials-section {
  background: var(--clr-bg);
}

.testimonials-wrapper {
  max-width: 720px;
  margin-inline: auto;
}

@media (max-width: 640px) {
  .testimonial-slide {
    padding: var(--space-8) var(--space-5);
    min-height: auto;
  }
  .ts-text {
    font-size: var(--text-base);
  }
  .ts-author {
    gap: var(--space-3);
  }
  .ts-stars {
    margin-left: 0;
    width: 100%;
  }
}

.testimonial-slide {
  background: var(--clr-white);
  border-radius: var(--radius-xl);
  padding: var(--space-12) var(--space-8);
  box-shadow: var(--shadow-md);
  position: relative;
  min-height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: var(--space-8);
}

.ts-quote {
  position: absolute;
  top: var(--space-6);
  left: var(--space-8);
  font-family: var(--font-display);
  font-size: 6rem;
  line-height: 1;
  color: var(--clr-primary);
  opacity: 0.12;
  font-weight: 700;
  pointer-events: none;
}

.ts-text {
  font-family: var(--font-display);
  font-size: clamp(var(--text-lg), 2vw, var(--text-2xl));
  font-style: italic;
  color: var(--clr-dark);
  line-height: 1.5;
  margin-bottom: var(--space-6);
  position: relative;
}

.ts-author {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.ts-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-sm);
  font-weight: 700;
  color: white;
  flex-shrink: 0;
}

.ts-info strong {
  display: block;
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--clr-dark);
}

.ts-info span {
  font-size: var(--text-sm);
  color: var(--clr-muted);
}

.ts-stars {
  margin-left: auto;
  color: var(--clr-accent);
  font-size: var(--text-lg);
  letter-spacing: 2px;
}

.ts-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
}

.ts-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid var(--clr-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--clr-muted);
  transition: all var(--duration-fast);
}
.ts-btn:hover {
  border-color: var(--clr-primary);
  color: var(--clr-primary);
  background: rgba(27,107,69,0.05);
}

.ts-dots {
  display: flex;
  gap: var(--space-2);
}

.ts-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--clr-border);
  transition: all var(--duration-normal);
}
.ts-dot.active {
  background: var(--clr-primary);
  width: 24px;
  border-radius: 4px;
}


/* ===== CTA PARTENARIAT ===== */
.partnership-cta {
  position: relative;
  padding-block: var(--space-24);
  background: var(--clr-dark);
  overflow: hidden;
  text-align: center;
}

.cta-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
  animation: heroZoom 18s ease-in-out infinite alternate;
}

.partnership-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg,
    rgba(5,46,22,0.93) 0%,
    rgba(15,122,74,0.75) 40%,
    rgba(5,46,22,0.9) 100%
  );
}

.cta-inner {
  position: relative;
  z-index: 1;
}

.cta-badge-row {
  margin-bottom: var(--space-4);
}

.cta-title {
  color: var(--clr-white);
  margin-block: var(--space-4);
  font-size: clamp(var(--text-3xl), 4vw, var(--text-5xl));
  text-shadow: 0 2px 20px rgba(0,0,0,0.3);
}

.cta-subtitle {
  color: rgba(255,255,255,0.75);
  max-width: 52ch;
  margin-inline: auto;
  margin-bottom: var(--space-8);
  font-size: var(--text-lg);
}

.cta-btns {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

.cta-proof {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  justify-content: center;
  margin-top: var(--space-8);
  font-size: var(--text-sm);
  color: rgba(255,255,255,0.55);
}

.cp-avatars {
  display: flex;
}
.cp-av {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.3);
  margin-left: -8px;
}
.cp-av:first-child { margin-left: 0; }
</style>
