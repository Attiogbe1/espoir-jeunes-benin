<script lang="ts">
  let {
    label,
    title,
    subtitle,
    breadcrumb,
  }: {
    label?: string;
    title: string;
    subtitle?: string;
    breadcrumb?: { label: string; href: string }[];
  } = $props();
</script>

<header class="page-header">
  <div class="page-header-bg" aria-hidden="true">
    <div class="ph-pattern"></div>
    <div class="ph-gradient"></div>
  </div>
  <div class="container">
    <div class="ph-content">
      {#if breadcrumb}
        <nav class="breadcrumb" aria-label="Fil d'Ariane">
          <a href="/">Accueil</a>
          {#each breadcrumb as crumb}
            <span aria-hidden="true">›</span>
            {#if crumb.href}
              <a href={crumb.href}>{crumb.label}</a>
            {:else}
              <span class="current">{crumb.label}</span>
            {/if}
          {/each}
        </nav>
      {/if}
      {#if label}
        <span class="label">{label}</span>
      {/if}
      <h1>{title}</h1>
      {#if subtitle}
        <p class="ph-subtitle">{subtitle}</p>
      {/if}
    </div>
  </div>
</header>

<style>
.page-header {
  position: relative;
  padding-top: calc(var(--nav-h) + var(--space-16));
  padding-bottom: var(--space-16);
  background: var(--clr-dark);
  overflow: hidden;
}

.page-header-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.ph-pattern {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M0 30 L30 0 L60 30 L30 60 Z' stroke='%231B6B45' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3Ccircle cx='30' cy='30' r='6' stroke='%231B6B45' stroke-width='0.5' fill='none' opacity='0.2'/%3E%3C/svg%3E");
  opacity: 0.4;
}

.ph-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(13,26,18,0.95) 0%, rgba(27,107,69,0.3) 100%);
}

.ph-content {
  position: relative;
  z-index: 1;
  max-width: 720px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
  font-size: var(--text-sm);
  color: rgba(255,255,255,0.5);
}

.breadcrumb a {
  color: rgba(255,255,255,0.6);
  transition: color var(--duration-fast);
}
.breadcrumb a:hover { color: var(--clr-accent); }
.breadcrumb .current { color: var(--clr-accent); }

.label {
  display: inline-block;
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--clr-primary-muted);
  margin-bottom: var(--space-3);
}

h1 {
  color: var(--clr-white);
  margin-bottom: var(--space-4);
}

.ph-subtitle {
  font-size: var(--text-lg);
  color: rgba(255,255,255,0.65);
  line-height: 1.6;
  max-width: 56ch;
}
</style>
