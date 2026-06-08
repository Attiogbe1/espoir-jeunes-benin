<script lang="ts">
  import { enhance } from '$app/forms';
  import { langStore } from '$lib/i18n/lang.svelte.js';
  import ScrollReveal from '$lib/components/ui/ScrollReveal.svelte';
  import PageHeader from '$lib/components/ui/PageHeader.svelte';

  const t = $derived(langStore.t);

  let { form }: { form: { success?: boolean; errors?: Record<string, string>; values?: Record<string, string> } | null } = $props();

  let submitting = $state(false);
</script>

<svelte:head>
  <title>Contact — ESPOIR JEUNES BÉNIN</title>
  <meta name="description" content="Contactez ESPOIR JEUNES BÉNIN pour un partenariat, un financement ou du bénévolat. Email : contact@espoirjeunesbenin.org">
</svelte:head>

<PageHeader
  label={t.contact.label}
  title={t.contact.title}
  subtitle={t.contact.subtitle}
  breadcrumb={[{ label: t.nav.contact, href: '' }]}
/>

<section class="section contact-section">
  <div class="container contact-grid">

    <!-- ===== FORM ===== -->
    <ScrollReveal direction="left" delay={0}>
      <div class="form-wrapper">
        {#if form?.success}
          <div class="success-msg" role="alert">
            <div class="success-icon" aria-hidden="true">✅</div>
            <h3>Message envoyé !</h3>
            <p>{t.contact.form.success}</p>
          </div>
        {:else}
          <form
            method="POST"
            use:enhance={() => {
              submitting = true;
              return async ({ update }) => {
                await update();
                submitting = false;
              };
            }}
            novalidate
          >
            <div class="form-row">
              <div class="field" class:error={form?.errors?.name}>
                <label for="name">{t.contact.form.name} <span class="required" aria-hidden="true">*</span></label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autocomplete="name"
                  value={form?.values?.name ?? ''}
                  aria-required="true"
                  aria-describedby={form?.errors?.name ? 'name-error' : undefined}
                  placeholder="Votre nom et prénom"
                />
                {#if form?.errors?.name}
                  <span class="field-error" id="name-error" role="alert">{form.errors.name}</span>
                {/if}
              </div>

              <div class="field">
                <label for="org">{t.contact.form.org}</label>
                <input
                  id="org"
                  name="org"
                  type="text"
                  value={form?.values?.org ?? ''}
                  placeholder="Ministère, ONG, Entreprise..."
                />
              </div>
            </div>

            <div class="form-row">
              <div class="field" class:error={form?.errors?.email}>
                <label for="email">{t.contact.form.email} <span class="required" aria-hidden="true">*</span></label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  value={form?.values?.email ?? ''}
                  aria-required="true"
                  aria-describedby={form?.errors?.email ? 'email-error' : undefined}
                  placeholder="votre@email.com"
                />
                {#if form?.errors?.email}
                  <span class="field-error" id="email-error" role="alert">{form.errors.email}</span>
                {/if}
              </div>

              <div class="field">
                <label for="phone">{t.contact.form.phone}</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autocomplete="tel"
                  value={form?.values?.phone ?? ''}
                  placeholder="+229 XX XX XX XX"
                />
              </div>
            </div>

            <div class="field" class:error={form?.errors?.type}>
              <label for="type">{t.contact.form.type} <span class="required" aria-hidden="true">*</span></label>
              <select
                id="type"
                name="type"
                aria-required="true"
                aria-describedby={form?.errors?.type ? 'type-error' : undefined}
              >
                <option value="">— Sélectionner —</option>
                {#each t.contact.form.types as option}
                  <option value={option} selected={form?.values?.type === option}>{option}</option>
                {/each}
              </select>
              {#if form?.errors?.type}
                <span class="field-error" id="type-error" role="alert">{form.errors.type}</span>
              {/if}
            </div>

            <div class="field" class:error={form?.errors?.message}>
              <label for="message">{t.contact.form.message} <span class="required" aria-hidden="true">*</span></label>
              <textarea
                id="message"
                name="message"
                rows="5"
                aria-required="true"
                aria-describedby={form?.errors?.message ? 'message-error' : undefined}
                placeholder="Décrivez votre demande ou projet de collaboration..."
              >{form?.values?.message ?? ''}</textarea>
              {#if form?.errors?.message}
                <span class="field-error" id="message-error" role="alert">{form.errors.message}</span>
              {/if}
            </div>

            <button type="submit" class="submit-btn" disabled={submitting} aria-busy={submitting}>
              {#if submitting}
                <span class="spinner" aria-hidden="true"></span>
                Envoi en cours...
              {:else}
                {t.contact.form.submit}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                  <path d="m22 2-7 20-4-9-9-4 20-7z"/>
                </svg>
              {/if}
            </button>

            <p class="form-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Vos données sont traitées de manière confidentielle.
            </p>
          </form>
        {/if}
      </div>
    </ScrollReveal>

    <!-- ===== INFO CONTACT ===== -->
    <ScrollReveal direction="right" delay={100}>
      <div class="contact-info">
        <!-- Photo de présence terrain -->
        <div class="ci-photo-wrap">
          <img
            src="https://images.unsplash.com/photo-1434030216411-0b5816ebe5bf?w=700&q=80&auto=format&fit=crop"
            alt="Équipe ESPOIR JEUNES BÉNIN sur le terrain"
            loading="lazy"
          />
          <div class="ci-photo-badge">🇧🇯 Aplahoué, Bénin · Depuis 2021</div>
        </div>

        <h3>Nos coordonnées</h3>
        <p class="ci-intro">Disponibles du lundi au vendredi, nous vous répondons dans les 48 heures ouvrables.</p>

        <div class="ci-items">
          <a href="mailto:{t.contact.info.email}" class="ci-item">
            <div class="ci-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <div>
              <span class="ci-label">Email</span>
              <span class="ci-value">{t.contact.info.email}</span>
            </div>
          </a>

          <a href="tel:{t.contact.info.phone}" class="ci-item">
            <div class="ci-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.65 5 2 2 0 0 1 3.63 3h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 5.99 5.99l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <span class="ci-label">Téléphone</span>
              <span class="ci-value">{t.contact.info.phone}</span>
            </div>
          </a>

          <a href="https://wa.me/229XXXXXXXX" class="ci-item whatsapp" target="_blank" rel="noopener">
            <div class="ci-icon wa-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.537 4.068 1.478 5.787L0 24l6.364-1.456A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.826 0-3.536-.494-5.006-1.352l-.36-.214-3.726.853.882-3.617-.234-.372A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            </div>
            <div>
              <span class="ci-label">WhatsApp</span>
              <span class="ci-value">{t.contact.info.whatsapp}</span>
            </div>
          </a>

          <div class="ci-item no-link">
            <div class="ci-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <span class="ci-label">Adresse</span>
              <span class="ci-value">{t.contact.info.address}</span>
            </div>
          </div>
        </div>

        <!-- Types de partenariat -->
        <div class="partnership-types">
          <h4>Vous souhaitez...</h4>
          <ul>
            <li>🤝 <span>Établir un partenariat institutionnel</span></li>
            <li>💰 <span>Soutenir financièrement nos programmes</span></li>
            <li>🙋 <span>Devenir bénévole encadreur</span></li>
            <li>📰 <span>Réaliser un reportage sur nos actions</span></li>
          </ul>
        </div>
      </div>
    </ScrollReveal>
  </div>
</section>

<style>
.contact-section { background: var(--clr-bg); }

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: var(--space-16);
  align-items: start;
}

@media (max-width: 1023px) {
  .contact-grid { grid-template-columns: 1fr; }
}

/* Form */
.form-wrapper {
  background: var(--clr-white);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-md);
}

form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}
@media (max-width: 640px) {
  .form-row { grid-template-columns: 1fr; }
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.field label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--clr-body);
}

.required { color: var(--clr-accent-dim); }

.field input,
.field select,
.field textarea {
  padding: 0.75rem 1rem;
  border: 2px solid var(--clr-border);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--clr-body);
  background: var(--clr-bg);
  transition: border-color var(--duration-fast), box-shadow var(--duration-fast);
  appearance: none;
}

.field select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7E6E' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
  cursor: pointer;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--clr-primary);
  box-shadow: 0 0 0 3px rgba(27,107,69,0.1);
}

.field.error input,
.field.error select,
.field.error textarea {
  border-color: #e53e3e;
}

.field-error {
  font-size: var(--text-xs);
  color: #e53e3e;
  font-weight: 500;
}

.field textarea { resize: vertical; min-height: 120px; }

.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: 0.9375rem 2rem;
  background: var(--clr-primary);
  color: white;
  font-size: var(--text-base);
  font-weight: 700;
  font-family: var(--font-body);
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-out);
  position: relative;
  overflow: hidden;
}
.submit-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.1);
  transform: translateX(-101%);
  transition: transform var(--duration-normal) var(--ease-out);
}
.submit-btn:hover::before { transform: translateX(0); }
.submit-btn:hover:not(:disabled) {
  background: var(--clr-primary-dim);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.form-note {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--clr-muted);
  margin-top: calc(-1 * var(--space-2));
}

/* Success */
.success-msg {
  text-align: center;
  padding: var(--space-12) var(--space-8);
}
.success-icon { font-size: 3rem; margin-bottom: var(--space-4); }
.success-msg h3 { margin-bottom: var(--space-3); }
.success-msg p { color: var(--clr-muted); }

/* Contact Info */
.contact-info {
  position: sticky;
  top: calc(var(--nav-h) + var(--space-6));
}

/* Photo terrain */
.ci-photo-wrap {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  height: 200px;
  margin-bottom: var(--space-6);
  box-shadow: var(--shadow-lg);
}
.ci-photo-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease-out;
}
.ci-photo-wrap:hover img { transform: scale(1.04); }
.ci-photo-badge {
  position: absolute;
  bottom: var(--space-3);
  left: var(--space-3);
  right: var(--space-3);
  background: rgba(5,46,22,0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(34,197,94,0.2);
  border-radius: var(--radius-md);
  padding: 0.5rem 0.875rem;
  font-size: var(--text-xs);
  font-weight: 600;
  color: rgba(255,255,255,0.85);
  letter-spacing: 0.04em;
}

.contact-info h3 { margin-bottom: var(--space-2); }
.ci-intro {
  font-size: var(--text-sm);
  color: var(--clr-muted);
  line-height: 1.6;
  margin-bottom: var(--space-6);
}

.ci-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
}

.ci-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--clr-white);
  border: 1px solid var(--clr-border);
  transition: all var(--duration-normal);
  text-decoration: none;
}

a.ci-item:hover {
  border-color: var(--clr-primary);
  transform: translateX(4px);
  box-shadow: var(--shadow-sm);
}

.ci-item.no-link { cursor: default; }

.ci-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: var(--clr-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--clr-primary);
  flex-shrink: 0;
}

.wa-icon {
  background: rgba(37,211,102,0.12);
  color: #25D366;
}

.ci-item > div:last-child {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ci-label {
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--clr-muted);
}

.ci-value {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--clr-body);
}

/* Partnership types */
.partnership-types {
  background: var(--clr-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  border-left: 4px solid var(--clr-primary);
}

.partnership-types h4 {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--clr-dark);
  margin-bottom: var(--space-4);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-family: var(--font-body);
}

.partnership-types ul {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.partnership-types li {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: var(--clr-body);
}

.partnership-types span {
  line-height: 1.4;
}
</style>
