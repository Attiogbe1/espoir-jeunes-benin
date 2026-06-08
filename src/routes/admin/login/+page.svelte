<script lang="ts">
  import { enhance } from '$app/forms';
  let { form }: { form: { error?: string } | null } = $props();
  let loading = $state(false);
  let showPwd = $state(false);
</script>

<svelte:head><title>Connexion — Admin EJB</title></svelte:head>

<div class="login-root">
  <!-- Panneau visuel gauche -->
  <div class="panel-left" aria-hidden="true">
    <img
      class="panel-bg"
      src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1400&q=85&auto=format&fit=crop"
      alt=""
    />
    <div class="panel-overlay"></div>
    <div class="panel-content">
      <div class="panel-logo">
        <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke="#22C55E" stroke-width="2"/>
          <path d="M9 23 L16 9 L23 23" stroke="#22C55E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 18 L20 18" stroke="#22C55E" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span>ESPOIR JEUNES BÉNIN</span>
      </div>
      <h2 class="panel-quote">
        "Éduquer un enfant,<br>c'est bâtir l'avenir<br>d'une communauté."
      </h2>
      <div class="panel-stats">
        <div><strong>600+</strong><span>Élèves</span></div>
        <div><strong>4 ans</strong><span>D'action</span></div>
        <div><strong>3</strong><span>Programmes</span></div>
      </div>
    </div>
  </div>

  <!-- Panneau formulaire droit -->
  <div class="panel-right">
    <div class="form-box">
      <div class="form-logo">
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke="#22C55E" stroke-width="2"/>
          <path d="M9 23 L16 9 L23 23" stroke="#22C55E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 18 L20 18" stroke="#22C55E" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>

      <h1>Connexion</h1>
      <p class="form-sub">Espace réservé à l'administrateur.</p>

      {#if form?.error}
        <div class="error-box" role="alert">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {form.error}
        </div>
      {/if}

      <form
        method="POST"
        use:enhance={() => {
          loading = true;
          return async ({ update }) => { await update(); loading = false; };
        }}
      >
        <label class="field-label" for="password">Mot de passe</label>
        <div class="pwd-wrap">
          <svg class="pwd-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <input
            id="password"
            name="password"
            type={showPwd ? 'text' : 'password'}
            autocomplete="current-password"
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            class="pwd-eye"
            onclick={() => showPwd = !showPwd}
            aria-label={showPwd ? 'Masquer' : 'Afficher'}
          >
            {#if showPwd}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            {:else}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            {/if}
          </button>
        </div>

        <button type="submit" class="submit" disabled={loading} aria-busy={loading}>
          {#if loading}
            <span class="spin" aria-hidden="true"></span>Connexion…
          {:else}
            Se connecter
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
          {/if}
        </button>
      </form>

      <a href="/" class="back">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
        Retour au site
      </a>
    </div>
  </div>
</div>

<style>
.login-root {
  min-height: 100vh;
  display: flex;
  background: #08100a;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

/* ── Panneau gauche ── */
.panel-left {
  flex: 1;
  position: relative;
  overflow: hidden;
  display: none;
}
@media (min-width: 860px) { .panel-left { display: block; } }

.panel-bg {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  animation: bgZoom 20s ease-in-out infinite alternate;
}
@keyframes bgZoom { from { transform: scale(1); } to { transform: scale(1.07); } }

.panel-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    155deg,
    rgba(5,46,22,0.95) 0%,
    rgba(15,122,74,0.65) 55%,
    rgba(0,0,0,0.75) 100%
  );
}

.panel-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2.5rem;
}
.panel-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: rgba(255,255,255,0.85);
  letter-spacing: 0.04em;
}
.panel-quote {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.5rem, 3vw, 2.125rem);
  font-weight: 600;
  font-style: italic;
  color: rgba(255,255,255,0.92);
  line-height: 1.45;
  max-width: 380px;
  border-left: 3px solid #22C55E;
  padding-left: 1.25rem;
}
.panel-stats {
  display: flex;
  gap: 2.5rem;
}
.panel-stats > div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.panel-stats strong {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.875rem;
  font-weight: 700;
  color: #22C55E;
  line-height: 1;
}
.panel-stats span {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255,255,255,0.4);
}

/* ── Panneau droit ── */
.panel-right {
  width: 100%;
  max-width: 440px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  background: #0d1610;
}
@media (max-width: 860px) {
  .panel-right { max-width: 100%; }
}

.form-box {
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
}

.form-logo {
  width: 60px; height: 60px;
  border-radius: 1rem;
  background: rgba(34,197,94,0.08);
  border: 1.5px solid rgba(34,197,94,0.2);
  display: flex; align-items: center; justify-content: center;
}

h1 {
  font-size: 1.875rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.02em;
  line-height: 1;
  margin: 0;
}
.form-sub {
  font-size: 0.8125rem;
  color: rgba(255,255,255,0.38);
  margin: 0;
}

.error-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(239,68,68,0.1);
  border: 1px solid rgba(239,68,68,0.25);
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  color: #fca5a5;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.field-label {
  display: block;
  font-size: 0.8125rem;
  font-weight: 600;
  color: rgba(255,255,255,0.55);
  margin-bottom: -0.25rem;
}

.pwd-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.pwd-icon {
  position: absolute;
  left: 0.875rem;
  color: rgba(255,255,255,0.25);
  pointer-events: none;
}
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 0.8125rem 2.75rem;
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.09);
  border-radius: 0.625rem;
  color: #fff;
  font-size: 0.9375rem;
  font-family: inherit;
  transition: border-color 180ms, box-shadow 180ms;
}
input:focus {
  outline: none;
  border-color: #22C55E;
  box-shadow: 0 0 0 3px rgba(34,197,94,0.12);
}
input::placeholder { color: rgba(255,255,255,0.18); }

.pwd-eye {
  position: absolute;
  right: 0.75rem;
  color: rgba(255,255,255,0.3);
  display: flex;
  transition: color 130ms;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.pwd-eye:hover { color: rgba(255,255,255,0.7); }

.submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.9375rem;
  background: #22C55E;
  color: #052e16;
  border: none;
  border-radius: 0.625rem;
  font-size: 0.9375rem;
  font-weight: 800;
  font-family: inherit;
  cursor: pointer;
  transition: all 180ms;
  letter-spacing: 0.01em;
}
.submit:hover:not(:disabled) {
  background: #16a34a;
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(34,197,94,0.4);
}
.submit:disabled { opacity: 0.5; cursor: not-allowed; }

.spin {
  width: 16px; height: 16px;
  border: 2px solid rgba(5,46,22,0.3);
  border-top-color: #052e16;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.back {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  justify-content: center;
  font-size: 0.8125rem;
  color: rgba(255,255,255,0.28);
  text-decoration: none;
  transition: color 130ms;
}
.back:hover { color: rgba(255,255,255,0.6); }
</style>
