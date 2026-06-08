<script lang="ts">
  import { langStore } from '$lib/i18n/lang.svelte.js';
  const t = $derived(langStore.t);

  const year = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="footer-top">
    <div class="container footer-grid">
      <!-- Brand -->
      <div class="footer-brand">
        <a href="/" class="footer-logo">
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <circle cx="16" cy="16" r="15" stroke="currentColor" stroke-width="1.5"/>
            <path d="M8 22 L16 8 L24 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11 18 L21 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <div>
            <div class="footer-logo-name">Espoir Jeunes Bénin</div>
            <div class="footer-logo-sub">ONG Éducation · Aplahoué</div>
          </div>
        </a>
        <p class="footer-tagline">{t.footer.tagline}</p>
        <div class="footer-social">
          <a href="https://wa.me/229XXXXXXXX" aria-label="WhatsApp" target="_blank" rel="noopener">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.537 4.068 1.478 5.787L0 24l6.364-1.456A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.826 0-3.536-.494-5.006-1.352l-.36-.214-3.726.853.882-3.617-.234-.372A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
          </a>
          <a href="mailto:contact@espoirjeunesbenin.org" aria-label="Email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>
        </div>
      </div>

      <!-- Navigation -->
      <div class="footer-col">
        <h4>Navigation</h4>
        <ul>
          <li><a href="/">{t.nav.home}</a></li>
          <li><a href="/a-propos">{t.nav.about}</a></li>
          <li><a href="/nos-actions">{t.nav.actions}</a></li>
          <li><a href="/evenements">{t.nav.events}</a></li>
          <li><a href="/impact">{t.nav.impact}</a></li>
          <li><a href="/galerie">{t.nav.gallery}</a></li>
        </ul>
      </div>

      <!-- Programmes -->
      <div class="footer-col">
        <h4>Programmes</h4>
        <ul>
          <li><a href="/nos-actions#td-gratuits">TD Gratuits</a></li>
          <li><a href="/nos-actions#fournitures">Fournitures Scolaires</a></li>
          <li><a href="/nos-actions#formations">Formations</a></li>
          <li><a href="/partenaires">{t.nav.partners}</a></li>
          <li><a href="/actualites">{t.nav.news}</a></li>
        </ul>
      </div>

      <!-- Contact -->
      <div class="footer-col">
        <h4>Contact</h4>
        <ul class="contact-list">
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <a href="mailto:contact@espoirjeunesbenin.org">contact@espoirjeunesbenin.org</a>
          </li>
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>Aplahoué, Couffo, Bénin</span>
          </li>
        </ul>
        <a href="/contact" class="footer-cta">Devenir partenaire →</a>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="container footer-bottom-inner">
      <p>© {year} {t.footer.org}. {t.footer.rights}</p>
      <p class="footer-made">Fait au Bénin 🇧🇯 avec ❤️</p>
    </div>
  </div>
</footer>

<style>
.footer {
  background: var(--clr-dark);
  color: rgba(255,255,255,0.7);
}

.footer-top {
  padding-block: var(--space-16);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
  gap: var(--space-12);
}

@media (max-width: 1023px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8);
  }
  .footer-brand { grid-column: 1 / -1; }
}

@media (max-width: 640px) {
  .footer-grid { grid-template-columns: 1fr; }
}

/* Brand */
.footer-logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--clr-white);
  margin-bottom: var(--space-4);
  transition: opacity var(--duration-fast);
}
.footer-logo:hover { opacity: 0.8; }

.footer-logo-name {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--clr-white);
  line-height: 1.1;
}

.footer-logo-sub {
  font-size: var(--text-xs);
  color: var(--clr-primary-muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 500;
}

.footer-tagline {
  font-size: var(--text-sm);
  color: rgba(255,255,255,0.5);
  line-height: 1.6;
  max-width: 28ch;
  margin-bottom: var(--space-4);
}

.footer-social {
  display: flex;
  gap: var(--space-3);
}

.footer-social a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background: rgba(255,255,255,0.07);
  color: rgba(255,255,255,0.6);
  transition: all var(--duration-fast);
}
.footer-social a:hover {
  background: var(--clr-primary);
  color: var(--clr-white);
}

/* Columns */
.footer-col h4 {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--clr-white);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: var(--space-4);
}

.footer-col ul {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.footer-col a {
  font-size: var(--text-sm);
  color: rgba(255,255,255,0.55);
  transition: color var(--duration-fast);
}
.footer-col a:hover { color: var(--clr-accent); }

.contact-list li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: rgba(255,255,255,0.55);
  margin-bottom: var(--space-3);
}
.contact-list svg { flex-shrink: 0; margin-top: 2px; opacity: 0.6; }

.footer-cta {
  display: inline-block;
  margin-top: var(--space-4);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--clr-accent);
  transition: color var(--duration-fast);
}
.footer-cta:hover { color: var(--clr-accent-dim); }

/* Bottom */
.footer-bottom {
  padding-block: var(--space-4);
}

.footer-bottom-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.footer-bottom p {
  font-size: var(--text-xs);
  color: rgba(255,255,255,0.35);
}

.footer-made {
  font-size: var(--text-xs);
}
</style>
