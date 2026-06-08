<script lang="ts">
  import { langStore } from '$lib/i18n/lang.svelte.js';
  import ScrollReveal from '$lib/components/ui/ScrollReveal.svelte';
  import PageHeader from '$lib/components/ui/PageHeader.svelte';
  import Counter from '$lib/components/ui/Counter.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { impactMetrics, beneficiaryEvolution } from '$lib/data/impact.js';

  const t = $derived(langStore.t);

  const maxCount = Math.max(...beneficiaryEvolution.map(d => d.count));
</script>

<svelte:head>
  <title>Impact — ESPOIR JEUNES BÉNIN</title>
  <meta name="description" content="Découvrez l'impact mesurable d'ESPOIR JEUNES BÉNIN : 600+ élèves, 4 ans d'action, 3 programmes actifs à Aplahoué, Bénin.">
</svelte:head>

<PageHeader
  label={t.impact.label}
  title={t.impact.title}
  subtitle={t.impact.subtitle}
  breadcrumb={[{ label: t.nav.impact, href: '' }]}
/>

<!-- ===== DASHBOARD MÉTRIQUES ===== -->
<section class="section metrics-section">
  <div class="container">
    <ScrollReveal direction="up" delay={0}>
      <div class="section-header centered">
        <span class="label">{t.impact.label}</span>
        <h2>Des résultats documentés</h2>
        <div class="divider"></div>
        <p>Chaque chiffre représente une vie touchée, une décision prise avec soin.</p>
      </div>
    </ScrollReveal>

    <div class="metrics-grid">
      {#each impactMetrics as metric, i}
        <ScrollReveal direction="up" delay={i * 60}>
          <div class="metric-card">
            <div class="mc-icon" aria-hidden="true">{metric.icon}</div>
            <div class="mc-value">
              <Counter value={metric.value} suffix={metric.suffix} label="" duration={2000} />
            </div>
            <h3 class="mc-label">{metric.label}</h3>
            <p class="mc-desc">{metric.description}</p>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<!-- ===== GRAPHIQUE ÉVOLUTION ===== -->
<section class="section chart-section">
  <div class="container">
    <ScrollReveal direction="up" delay={0}>
      <div class="section-header">
        <span class="label">{t.impact.evolution_label}</span>
        <h2>Croissance des bénéficiaires</h2>
        <div class="divider"></div>
        <p>Évolution du nombre d'élèves accompagnés depuis la création de l'ONG.</p>
      </div>
    </ScrollReveal>

    <ScrollReveal direction="up" delay={100}>
      <div class="chart-wrapper">
        <div class="bar-chart" role="img" aria-label="Graphique évolution bénéficiaires 2021-2024">
          {#each beneficiaryEvolution as item, i}
            <div class="bar-col">
              <div class="bar-value" aria-hidden="true">{item.count}</div>
              <div
                class="bar"
                style="height: {(item.count / maxCount) * 100}%; animation-delay: {i * 120}ms"
                title="{item.year}: {item.count} bénéficiaires"
              >
                <div class="bar-fill"></div>
              </div>
              <div class="bar-year">{item.year}</div>
            </div>
          {/each}
        </div>
        <div class="chart-note">
          <span>📈 ×{Math.round(beneficiaryEvolution[beneficiaryEvolution.length-1].count / beneficiaryEvolution[0].count)} croissance depuis 2021</span>
        </div>
      </div>
    </ScrollReveal>
  </div>
</section>

<!-- ===== CARTE APLAHOUÉ ===== -->
<section class="section map-section">
  <div class="container">
    <ScrollReveal direction="up" delay={0}>
      <div class="section-header centered">
        <span class="label">Zone d'action</span>
        <h2>Notre territoire d'impact</h2>
        <div class="divider"></div>
        <p>Aplahoué, commune du département du Couffo, au sud-ouest du Bénin.</p>
      </div>
    </ScrollReveal>

    <ScrollReveal direction="up" delay={100}>
      <div class="map-wrapper">
        <div class="map-card">
          <!-- Carte stylisée SVG du Bénin -->
          <div class="map-visual">
            <svg viewBox="0 0 300 420" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Carte stylisée du Bénin">
              <!-- Silhouette simplifiée du Bénin -->
              <path d="M 80 20 L 200 20 L 220 60 L 240 80 L 230 120 L 250 160 L 240 200 L 220 230 L 200 260 L 190 290 L 180 330 L 160 380 L 140 400 L 120 380 L 110 340 L 100 290 L 90 250 L 70 220 L 60 180 L 50 140 L 60 100 L 70 60 Z"
                fill="#EDF5EF" stroke="#C8DFCC" stroke-width="2"/>
              <!-- Regions -->
              <path d="M 80 20 L 200 20 L 210 40 L 180 80 L 120 80 L 90 60 Z"
                fill="#D4EDD8" stroke="#C8DFCC" stroke-width="1" opacity="0.5"/>
              <!-- Pin Aplahoué -->
              <g transform="translate(115, 310)">
                <circle cx="0" cy="0" r="18" fill="rgba(27,107,69,0.15)" />
                <circle cx="0" cy="0" r="10" fill="var(--clr-primary)" />
                <circle cx="0" cy="0" r="4" fill="white" />
                <!-- Pulse animation -->
                <circle cx="0" cy="0" r="18" fill="none" stroke="var(--clr-primary)" stroke-width="2" opacity="0.4">
                  <animate attributeName="r" from="10" to="28" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite"/>
                </circle>
              </g>
              <!-- Label -->
              <text x="140" y="330" fill="var(--clr-primary)" font-size="11" font-family="system-ui" font-weight="700">Aplahoué</text>
              <text x="135" y="344" fill="var(--clr-muted)" font-size="9" font-family="system-ui">Département du Couffo</text>
            </svg>
          </div>
          <div class="map-info">
            <h3>Aplahoué, Couffo</h3>
            <p>Commune rurale du sud-ouest du Bénin, Aplahoué compte environ 200 000 habitants. L'accès à l'éducation y est limité par les ressources économiques des familles.</p>
            <div class="map-stats">
              <div class="ms-item">
                <span class="ms-num">~200k</span>
                <span class="ms-label">Habitants</span>
              </div>
              <div class="ms-item">
                <span class="ms-num">600+</span>
                <span class="ms-label">Élèves aidés</span>
              </div>
              <div class="ms-item">
                <span class="ms-num">4 ans</span>
                <span class="ms-label">De présence</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  </div>
</section>

<!-- ===== DOWNLOAD RAPPORT ===== -->
<section class="section download-section">
  <div class="container text-center">
    <ScrollReveal direction="up" delay={0}>
      <div class="download-card">
        <div class="dl-icon" aria-hidden="true">📄</div>
        <h2>Rapport d'activité</h2>
        <p>Consultez le rapport complet de nos activités, résultats et perspectives pour l'année 2024.</p>
        <Button href="/rapport-activite-2024.pdf" variant="primary" size="lg">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          {t.impact.download_report}
        </Button>
        <p class="dl-note">PDF · 2.4 MB · Bénin, 2024</p>
      </div>
    </ScrollReveal>
  </div>
</section>

<style>
/* Metrics */
.metrics-section { background: var(--clr-bg); }

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}
@media (max-width: 1023px) {
  .metrics-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .metrics-grid { grid-template-columns: 1fr 1fr; }
}

.metric-card {
  background: var(--clr-white);
  border-radius: var(--radius-xl);
  padding: var(--space-8) var(--space-6);
  text-align: center;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--clr-border);
  border-top: 4px solid var(--clr-primary);
  transition: transform var(--duration-normal) var(--ease-spring), box-shadow var(--duration-normal);
  position: relative;
  overflow: hidden;
}
.metric-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 80px;
  background: linear-gradient(to bottom, rgba(15,122,74,0.06), transparent);
}
.metric-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--clr-primary);
}
.metric-card:nth-child(2) { border-top-color: var(--clr-accent); }
.metric-card:nth-child(2)::before { background: linear-gradient(to bottom, rgba(249,115,22,0.06), transparent); }
.metric-card:nth-child(3) { border-top-color: var(--clr-primary-muted); }
.metric-card:nth-child(4) { border-top-color: var(--clr-gold); }
.metric-card:nth-child(5) { border-top-color: #0891B2; }
.metric-card:nth-child(6) { border-top-color: #7C3AED; }

.mc-icon {
  font-size: 2.5rem;
  margin-bottom: var(--space-3);
  display: block;
  position: relative;
  animation: float 5s ease-in-out infinite;
}

.mc-value :global(.counter-value) {
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  color: var(--clr-primary) !important;
}

.mc-value :global(.counter-suffix) {
  font-size: clamp(2rem, 3vw, 2.5rem);
  color: var(--clr-primary) !important;
}

.mc-value :global(.counter-label) { display: none; }

.mc-label {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--clr-dark);
  margin-block: var(--space-2);
}

.mc-desc {
  font-size: var(--text-xs);
  color: var(--clr-muted);
  line-height: 1.5;
}

/* Chart */
.chart-section { background: var(--clr-surface); }

.chart-wrapper {
  background: var(--clr-white);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-sm);
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  gap: var(--space-6);
  height: 240px;
  padding-bottom: var(--space-4);
  border-bottom: 2px solid var(--clr-border);
}

.bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
  gap: var(--space-2);
}

.bar-value {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--clr-primary);
}

.bar {
  width: 100%;
  max-width: 120px;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  overflow: hidden;
  animation: barGrow var(--duration-slow) var(--ease-out) both;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(to top, var(--clr-primary-dim), var(--clr-primary-bright));
  border-radius: inherit;
  transition: all var(--duration-slow);
}

.bar-col:nth-child(2) .bar-fill { background: linear-gradient(to top, #0A5C37, #16A34A); }
.bar-col:nth-child(3) .bar-fill { background: linear-gradient(to top, #0F7A4A, #22C55E); }
.bar-col:nth-child(4) .bar-fill { background: linear-gradient(to top, #EA580C, #F97316); }
.bar:hover .bar-fill { filter: brightness(1.15); }

@keyframes barGrow {
  from { transform: scaleY(0); transform-origin: bottom; }
  to { transform: scaleY(1); }
}

.bar-year {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--clr-muted);
}

.chart-note {
  margin-top: var(--space-4);
  text-align: right;
  font-size: var(--text-sm);
  color: var(--clr-primary);
  font-weight: 600;
}

/* Map */
.map-section { background: var(--clr-white); }

.map-wrapper { max-width: 800px; margin-inline: auto; }

.map-card {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--space-12);
  align-items: center;
  background: var(--clr-surface);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
}
@media (max-width: 768px) {
  .map-card { grid-template-columns: 1fr; }
}

.map-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-visual svg {
  max-width: 240px;
  filter: drop-shadow(var(--shadow-md));
}

.map-info h3 { margin-bottom: var(--space-3); }
.map-info > p { color: var(--clr-muted); line-height: 1.7; margin-bottom: var(--space-6); }

.map-stats {
  display: flex;
  gap: var(--space-6);
}
.ms-item { display: flex; flex-direction: column; gap: 2px; }
.ms-num {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--clr-primary);
  line-height: 1;
}
.ms-label { font-size: var(--text-xs); color: var(--clr-muted); }

/* Download */
.download-section { background: var(--clr-surface); }

.download-card {
  max-width: 520px;
  margin-inline: auto;
  background: var(--clr-white);
  border-radius: var(--radius-xl);
  padding: var(--space-12) var(--space-8);
  box-shadow: var(--shadow-lg);
  border: 2px solid transparent;
  background-clip: padding-box;
  position: relative;
}
.download-card::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: linear-gradient(135deg, var(--clr-primary), var(--clr-accent), var(--clr-gold));
  z-index: -1;
}

.dl-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: var(--space-4);
}

.download-card h2 { margin-bottom: var(--space-4); }
.download-card > p { color: var(--clr-muted); margin-bottom: var(--space-6); }

.dl-note {
  font-size: var(--text-xs);
  color: var(--clr-muted);
  margin-top: var(--space-3);
}
</style>
