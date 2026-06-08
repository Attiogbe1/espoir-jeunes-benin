<script lang="ts">
  import { enhance } from '$app/forms';

  let { form }: { form: { errors?: Record<string, string>; values?: Record<string, string> } | null } = $props();

  let loading = $state(false);

  // Prévisualisation des images sélectionnées
  let previewUrls = $state<{ url: string; name: string; size: number }[]>([]);
  let dragOver = $state(false);
  const MAX_IMAGES = 8;
  const MAX_MB = 5;

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    addFiles(input.files ? Array.from(input.files) : []);
  }

  function addFiles(newFiles: File[]) {
    for (const file of newFiles) {
      if (previewUrls.length >= MAX_IMAGES) break;
      if (file.size > MAX_MB * 1024 * 1024) continue;
      const url = URL.createObjectURL(file);
      previewUrls = [...previewUrls, { url, name: file.name, size: file.size }];
    }
  }

  function removePreview(index: number) {
    URL.revokeObjectURL(previewUrls[index].url);
    previewUrls = previewUrls.filter((_, i) => i !== index);
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    dragOver = false;
    const files = Array.from(event.dataTransfer?.files ?? []).filter(f => f.type.startsWith('image/'));
    addFiles(files);
  }

  function formatSize(bytes: number): string {
    return (bytes / 1024 / 1024).toFixed(1) + ' Mo';
  }

  let fileInput: HTMLInputElement | undefined = $state();
</script>

<svelte:head><title>Nouvel événement — Admin EJB</title></svelte:head>

<div class="new-event">
  <div class="page-header">
    <a href="/admin/evenements" class="back-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
      Retour
    </a>
    <h1>Nouvel événement</h1>
  </div>

  <form
    method="POST"
    enctype="multipart/form-data"
    use:enhance={() => {
      loading = true;
      return async ({ update }) => { await update(); loading = false; };
    }}
  >
    <div class="form-layout">
      <!-- Colonne principale -->
      <div class="col-main">

        <!-- Titre -->
        <div class="card">
          <h2>Informations générales</h2>

          <div class="field" class:error={form?.errors?.title}>
            <label for="title">Titre de l'événement <span class="req">*</span></label>
            <input id="title" name="title" type="text" value={form?.values?.title ?? ''} placeholder="Ex : Remise de fournitures scolaires 2024" required />
            {#if form?.errors?.title}<span class="err">{form.errors.title}</span>{/if}
          </div>

          <div class="field" class:error={form?.errors?.excerpt}>
            <label for="excerpt">Résumé court <span class="req">*</span></label>
            <input id="excerpt" name="excerpt" type="text" value={form?.values?.excerpt ?? ''} placeholder="Une phrase qui résume l'événement (utilisée dans les listings)" maxlength="180" required />
            {#if form?.errors?.excerpt}<span class="err">{form.errors.excerpt}</span>{/if}
          </div>

          <div class="field" class:error={form?.errors?.description}>
            <label for="description">Description complète <span class="req">*</span></label>
            <textarea id="description" name="description" rows="7" placeholder="Décrivez l'événement en détail : contexte, déroulement, bénéficiaires, résultats..." required>{form?.values?.description ?? ''}</textarea>
            {#if form?.errors?.description}<span class="err">{form.errors.description}</span>{/if}
          </div>
        </div>

        <!-- Upload images -->
        <div class="card" class:error-card={form?.errors?.images}>
          <h2>
            Photos de l'événement
            <span class="img-counter">{previewUrls.length}/{MAX_IMAGES}</span>
          </h2>
          <p class="card-hint">Ajoutez jusqu'à {MAX_IMAGES} photos · JPG, PNG ou WebP · max {MAX_MB} Mo chacune</p>

          <!-- Zone de drop -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div
            class="drop-zone"
            class:drag-over={dragOver}
            class:has-files={previewUrls.length > 0}
            ondragover={(e) => { e.preventDefault(); dragOver = true; }}
            ondragleave={() => dragOver = false}
            ondrop={handleDrop}
            role="button"
            tabindex="0"
            aria-label="Zone de dépôt pour les images"
            onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInput?.click(); }}
            onclick={() => fileInput?.click()}
          >
            {#if previewUrls.length === 0}
              <div class="dz-empty">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <p><strong>Cliquez</strong> ou glissez vos photos ici</p>
                <span>Sélection multiple supportée</span>
              </div>
            {:else}
              <div class="dz-add-more">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Ajouter d'autres photos
              </div>
            {/if}
          </div>

          <!-- Input file caché — multiple -->
          <input
            bind:this={fileInput}
            type="file"
            name="images"
            id="images"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            onchange={handleFileChange}
            class="sr-only"
          />

          {#if form?.errors?.images}
            <p class="err" style="margin-top: 0.5rem">{form.errors.images}</p>
          {/if}

          <!-- Prévisualisation -->
          {#if previewUrls.length > 0}
            <div class="preview-grid">
              {#each previewUrls as preview, i}
                <div class="preview-item">
                  <img src={preview.url} alt="Aperçu {i + 1}" />
                  <div class="preview-overlay">
                    <div class="preview-info">
                      <span class="preview-name">{preview.name}</span>
                      <span class="preview-size">{formatSize(preview.size)}</span>
                    </div>
                    <button
                      type="button"
                      class="preview-remove"
                      onclick={() => removePreview(i)}
                      aria-label="Retirer {preview.name}"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m18 6-12 12M6 6l12 12"/></svg>
                    </button>
                  </div>
                  {#if i === 0}
                    <div class="preview-main-badge">Principale</div>
                  {/if}
                </div>
              {/each}
            </div>
            <p class="preview-tip">La première image est utilisée comme vignette principale.</p>
          {/if}
        </div>
      </div>

      <!-- Colonne latérale -->
      <div class="col-side">
        <!-- Publication -->
        <div class="card">
          <h2>Publication</h2>

          <div class="field" class:error={form?.errors?.date}>
            <label for="date">Date de l'événement <span class="req">*</span></label>
            <input id="date" name="date" type="date" value={form?.values?.date ?? ''} required />
            {#if form?.errors?.date}<span class="err">{form.errors.date}</span>{/if}
          </div>

          <div class="field" class:error={form?.errors?.category}>
            <label for="category">Catégorie <span class="req">*</span></label>
            <select id="category" name="category" required>
              <option value="">— Choisir —</option>
              <option value="td"           selected={form?.values?.category === 'td'}>TD Gratuits</option>
              <option value="fournitures"  selected={form?.values?.category === 'fournitures'}>Fournitures Scolaires</option>
              <option value="formations"   selected={form?.values?.category === 'formations'}>Formations</option>
              <option value="autre"        selected={form?.values?.category === 'autre'}>Autre</option>
            </select>
            {#if form?.errors?.category}<span class="err">{form.errors.category}</span>{/if}
          </div>

          <div class="toggle-field">
            <label for="published" class="toggle-label">
              <div class="toggle-info">
                <span>Publier immédiatement</span>
                <span class="toggle-hint">Visible sur le site public</span>
              </div>
              <div class="toggle-switch-wrapper">
                <input id="published" name="published" type="checkbox" value="1" class="toggle-input" />
                <div class="toggle-switch" aria-hidden="true"></div>
              </div>
            </label>
          </div>
        </div>

        <!-- Submit -->
        <div class="submit-card">
          <button type="submit" class="submit-btn" disabled={loading} aria-busy={loading}>
            {#if loading}
              <span class="spinner" aria-hidden="true"></span>
              Enregistrement...
            {:else}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m20 6-11 11-5-5"/></svg>
              Enregistrer l'événement
            {/if}
          </button>
          <a href="/admin/evenements" class="cancel-btn">Annuler</a>
        </div>
      </div>
    </div>
  </form>
</div>

<style>
.new-event { max-width: 960px; }

.page-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.75rem;
}
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  border: 1.5px solid rgba(255,255,255,0.1);
  text-decoration: none;
  transition: all 150ms;
}
.back-btn:hover { color: white; border-color: rgba(255,255,255,0.2); }
h1 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

/* Layout */
.form-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 1.25rem;
  align-items: start;
}
@media (max-width: 768px) {
  .form-layout { grid-template-columns: 1fr; }
}

/* Cards */
.card {
  background: #111e14;
  border: 1px solid #1e3322;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.25rem;
}
.card.error-card { border-color: rgba(220,38,38,0.35); }

.card h2 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-hint {
  font-size: 0.8125rem;
  color: rgba(255,255,255,0.35);
  margin-top: -0.75rem;
  margin-bottom: 1.25rem;
}

.img-counter {
  margin-left: auto;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255,255,255,0.35);
  background: rgba(255,255,255,0.06);
  padding: 2px 8px;
  border-radius: 100px;
}

/* Fields */
.field { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
.field:last-child { margin-bottom: 0; }
.field label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: rgba(255,255,255,0.65);
}
.req { color: #E8A44A; }
.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 0.6875rem 0.875rem;
  background: #1a2b1e;
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 0.5rem;
  color: white;
  font-size: 0.9375rem;
  font-family: inherit;
  transition: border-color 200ms;
  appearance: none;
}
.field select option {
  background: #1a2b1e;
  color: white;
}
.field textarea { resize: vertical; min-height: 140px; }
.field select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7E6E' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.875rem center;
  padding-right: 2.5rem;
  cursor: pointer;
}
.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: #1B6B45;
  box-shadow: 0 0 0 3px rgba(27,107,69,0.15);
}
.field input::placeholder,
.field textarea::placeholder { color: rgba(255,255,255,0.2); }
.field.error input,
.field.error select,
.field.error textarea { border-color: rgba(220,38,38,0.6); }
.err { font-size: 0.75rem; color: #fca5a5; font-weight: 500; }

/* Drop zone */
.drop-zone {
  border: 2px dashed rgba(255,255,255,0.12);
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 200ms;
  margin-bottom: 1rem;
  user-select: none;
}
.drop-zone:hover,
.drop-zone.drag-over {
  border-color: #1B6B45;
  background: rgba(27,107,69,0.06);
}
.drop-zone.has-files {
  padding: 0.875rem;
  border-style: dashed;
}

.dz-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255,255,255,0.35);
}
.dz-empty p { margin: 0; font-size: 0.9375rem; color: rgba(255,255,255,0.55); }
.dz-empty p strong { color: #2EAD6F; }
.dz-empty span { font-size: 0.75rem; }

.dz-add-more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: rgba(255,255,255,0.45);
}

.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden; clip: rect(0,0,0,0);
}

/* Preview grid */
.preview-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.625rem;
  margin-bottom: 0.5rem;
}
@media (max-width: 640px) {
  .preview-grid { grid-template-columns: repeat(3, 1fr); }
}

.preview-item {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: 0.5rem;
  overflow: hidden;
  background: rgba(255,255,255,0.04);
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0);
  transition: background 150ms;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.375rem;
}
.preview-item:hover .preview-overlay { background: rgba(0,0,0,0.55); }

.preview-info {
  opacity: 0;
  transition: opacity 150ms;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.preview-item:hover .preview-info { opacity: 1; }
.preview-name {
  font-size: 0.625rem;
  color: white;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.preview-size { font-size: 0.5625rem; color: rgba(255,255,255,0.6); }

.preview-remove {
  align-self: flex-end;
  width: 22px; height: 22px;
  border-radius: 50%;
  background: rgba(220,38,38,0.85);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 150ms;
}
.preview-item:hover .preview-remove { opacity: 1; }
.preview-remove:hover { background: #dc2626; }

.preview-main-badge {
  position: absolute;
  top: 0.375rem;
  left: 0.375rem;
  background: #1B6B45;
  color: white;
  font-size: 0.5625rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 100px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.preview-tip {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.3);
  text-align: center;
}

/* Toggle */
.toggle-field {
  padding: 0.875rem;
  background: #152318;
  border-radius: 0.5rem;
  border: 1px solid #1e3322;
}
.toggle-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  gap: 1rem;
}
.toggle-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.toggle-info > span:first-child { font-size: 0.9375rem; font-weight: 600; color: white; }
.toggle-hint { font-size: 0.75rem; color: rgba(255,255,255,0.35); }

.toggle-switch-wrapper { position: relative; flex-shrink: 0; }
.toggle-input {
  position: absolute;
  opacity: 0;
  width: 0; height: 0;
}
.toggle-switch {
  width: 44px; height: 24px;
  background: rgba(255,255,255,0.12);
  border-radius: 100px;
  transition: background 200ms;
  position: relative;
}
.toggle-switch::after {
  content: '';
  position: absolute;
  width: 18px; height: 18px;
  background: white;
  border-radius: 50%;
  top: 3px; left: 3px;
  transition: transform 200ms;
}
.toggle-input:checked ~ .toggle-switch { background: #1B6B45; }
.toggle-input:checked ~ .toggle-switch::after { transform: translateX(20px); }
.toggle-input:focus ~ .toggle-switch { box-shadow: 0 0 0 3px rgba(27,107,69,0.3); }

/* Submit card */
.submit-card {
  background: #111e14;
  border: 1px solid #1e3322;
  border-radius: 1rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.875rem;
  background: #1B6B45;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: all 200ms;
}
.submit-btn:hover:not(:disabled) { background: #14523A; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(27,107,69,0.3); }
.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.cancel-btn {
  text-align: center;
  font-size: 0.875rem;
  color: rgba(255,255,255,0.4);
  text-decoration: none;
  padding: 0.375rem;
  border-radius: 0.375rem;
  transition: color 150ms;
}
.cancel-btn:hover { color: rgba(255,255,255,0.7); }
.spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
