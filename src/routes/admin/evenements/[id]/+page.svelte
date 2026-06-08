<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';
  import { categoryLabels } from '$lib/data/categories.js';

  let { data, form }: {
    data: PageData;
    form: { success?: boolean; errors?: Record<string, string> } | null
  } = $props();

  let loading  = $state(false);
  let deleting = $state(false);
  let confirmDelete = $state(false);

  // Images existantes conservées
  let keptImages = $state<string[]>([...data.event.images]);
  // Nouvelles images à uploader
  let newPreviewUrls = $state<{ url: string; name: string; size: number }[]>([]);
  let dragOver = $state(false);
  const MAX_IMAGES = 8;

  function handleFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    addFiles(input.files ? Array.from(input.files) : []);
  }
  function addFiles(files: File[]) {
    const remaining = MAX_IMAGES - keptImages.length - newPreviewUrls.length;
    for (const f of files.slice(0, remaining)) {
      newPreviewUrls = [...newPreviewUrls, { url: URL.createObjectURL(f), name: f.name, size: f.size }];
    }
  }
  function removeKept(img: string) { keptImages = keptImages.filter(i => i !== img); }
  function removeNew(idx: number) {
    URL.revokeObjectURL(newPreviewUrls[idx].url);
    newPreviewUrls = newPreviewUrls.filter((_, i) => i !== idx);
  }

  let fileInput: HTMLInputElement | undefined = $state();
  const totalImages = $derived(keptImages.length + newPreviewUrls.length);
</script>

<svelte:head><title>Modifier — {data.event.title}</title></svelte:head>

<div class="edit-event">
  <div class="page-header">
    <a href="/admin/evenements" class="back-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
      Retour
    </a>
    <div>
      <h1>Modifier l'événement</h1>
      <p>{data.event.title}</p>
    </div>
    {#if data.event.published}
      <a href="/evenements/{data.event.id}" target="_blank" class="view-live-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        Voir en ligne
      </a>
    {/if}
  </div>

  {#if data.created}
    <div class="toast success" role="alert">
      ✅ Événement créé avec succès !
    </div>
  {/if}

  {#if form?.success}
    <div class="toast success" role="alert">
      ✅ Modifications enregistrées.
    </div>
  {/if}

  <form
    method="POST"
    action="?/update"
    enctype="multipart/form-data"
    use:enhance={() => {
      loading = true;
      return async ({ update }) => { await update(); loading = false; };
    }}
  >
    <div class="form-layout">
      <div class="col-main">
        <!-- Infos générales -->
        <div class="card">
          <h2>Informations générales</h2>
          <div class="field" class:error={form?.errors?.title}>
            <label for="title">Titre <span class="req">*</span></label>
            <input id="title" name="title" type="text" value={data.event.title} required />
            {#if form?.errors?.title}<span class="err">{form.errors.title}</span>{/if}
          </div>
          <div class="field" class:error={form?.errors?.excerpt}>
            <label for="excerpt">Résumé court <span class="req">*</span></label>
            <input id="excerpt" name="excerpt" type="text" value={data.event.excerpt} maxlength="180" required />
            {#if form?.errors?.excerpt}<span class="err">{form.errors.excerpt}</span>{/if}
          </div>
          <div class="field" class:error={form?.errors?.description}>
            <label for="description">Description complète <span class="req">*</span></label>
            <textarea id="description" name="description" rows="7" required>{data.event.description}</textarea>
            {#if form?.errors?.description}<span class="err">{form.errors.description}</span>{/if}
          </div>
        </div>

        <!-- Gestion des images -->
        <div class="card">
          <h2>
            Photos
            <span class="img-counter">{totalImages}/{MAX_IMAGES}</span>
          </h2>

          <!-- Images actuelles -->
          {#if keptImages.length > 0}
            <p class="section-label">Images actuelles</p>
            <div class="preview-grid">
              {#each keptImages as img, i}
                <!-- Champ caché pour conserver cette image -->
                <input type="hidden" name="keep_image" value={img} />
                <div class="preview-item">
                  <img src={img} alt="Image {i + 1}" />
                  <button
                    type="button"
                    class="preview-remove"
                    onclick={() => removeKept(img)}
                    aria-label="Retirer cette image"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m18 6-12 12M6 6l12 12"/></svg>
                  </button>
                  {#if i === 0 && newPreviewUrls.length === 0}
                    <div class="preview-main-badge">Principale</div>
                  {/if}
                </div>
              {/each}
            </div>
          {/if}

          <!-- Nouvelles images -->
          {#if newPreviewUrls.length > 0}
            <p class="section-label">Nouvelles images à ajouter</p>
            <div class="preview-grid">
              {#each newPreviewUrls as preview, i}
                <div class="preview-item">
                  <img src={preview.url} alt="Nouveau {i + 1}" />
                  <button
                    type="button"
                    class="preview-remove"
                    onclick={() => removeNew(i)}
                    aria-label="Retirer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m18 6-12 12M6 6l12 12"/></svg>
                  </button>
                  {#if keptImages.length === 0 && i === 0}
                    <div class="preview-main-badge">Principale</div>
                  {/if}
                </div>
              {/each}
            </div>
          {/if}

          {#if totalImages < MAX_IMAGES}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="drop-zone"
              class:drag-over={dragOver}
              ondragover={(e) => { e.preventDefault(); dragOver = true; }}
              ondragleave={() => dragOver = false}
              ondrop={(e) => { e.preventDefault(); dragOver = false; addFiles(Array.from(e.dataTransfer?.files ?? []).filter(f => f.type.startsWith('image/'))); }}
              onclick={() => fileInput?.click()}
              onkeydown={(e) => { if (e.key === 'Enter') fileInput?.click(); }}
              role="button"
              tabindex="0"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Ajouter des photos ({MAX_IMAGES - totalImages} restant{MAX_IMAGES - totalImages > 1 ? 's' : ''})
            </div>
          {/if}

          <input
            bind:this={fileInput}
            type="file"
            name="images"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            onchange={handleFileChange}
            class="sr-only"
          />
        </div>
      </div>

      <!-- Sidebar -->
      <div class="col-side">
        <div class="card">
          <h2>Publication</h2>
          <div class="field" class:error={form?.errors?.date}>
            <label for="date">Date <span class="req">*</span></label>
            <input id="date" name="date" type="date" value={data.event.date} required />
          </div>
          <div class="field">
            <label for="category">Catégorie <span class="req">*</span></label>
            <select id="category" name="category">
              <option value="td"          selected={data.event.category === 'td'}>TD Gratuits</option>
              <option value="fournitures" selected={data.event.category === 'fournitures'}>Fournitures Scolaires</option>
              <option value="formations"  selected={data.event.category === 'formations'}>Formations</option>
              <option value="autre"       selected={data.event.category === 'autre'}>Autre</option>
            </select>
          </div>
          <div class="toggle-field">
            <label for="published" class="toggle-label">
              <div class="toggle-info">
                <span>Publié</span>
                <span class="toggle-hint">Visible sur le site</span>
              </div>
              <div class="toggle-switch-wrapper">
                <input id="published" name="published" type="checkbox" value="1" class="toggle-input" checked={data.event.published} />
                <div class="toggle-switch" aria-hidden="true"></div>
              </div>
            </label>
          </div>
        </div>

        <!-- Metadata -->
        <div class="card meta-card">
          <p class="meta-item">
            <span>Créé le</span>
            <span>{new Date(data.event.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </p>
          <p class="meta-item">
            <span>Modifié</span>
            <span>{new Date(data.event.updatedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </p>
          <p class="meta-item">
            <span>ID</span>
            <code>{data.event.id}</code>
          </p>
        </div>

        <div class="submit-card">
          <button type="submit" class="submit-btn" disabled={loading}>
            {#if loading}
              <span class="spinner" aria-hidden="true"></span>Enregistrement...
            {:else}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m20 6-11 11-5-5"/></svg>
              Enregistrer
            {/if}
          </button>
          <button
            type="button"
            class="delete-btn"
            onclick={() => confirmDelete = true}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            Supprimer cet événement
          </button>
        </div>
      </div>
    </div>
  </form>
</div>

<!-- Confirm delete dialog -->
{#if confirmDelete}
  <div class="modal-backdrop" role="dialog" aria-modal="true">
    <div class="modal">
      <h3>Supprimer définitivement ?</h3>
      <p>"{data.event.title}" et ses {data.event.images.length} image{data.event.images.length > 1 ? 's' : ''} seront supprimés.</p>
      <div class="modal-actions">
        <button class="btn-cancel" onclick={() => confirmDelete = false}>Annuler</button>
        <form method="POST" action="?/delete" use:enhance={() => { deleting = true; return async ({ update }) => { await update(); deleting = false; }; }}>
          <button type="submit" class="btn-delete-confirm" disabled={deleting}>
            {deleting ? 'Suppression...' : 'Supprimer'}
          </button>
        </form>
      </div>
    </div>
  </div>
{/if}

<style>
.edit-event { max-width: 960px; }

.page-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.page-header > div { flex: 1; }
.page-header h1 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin: 0 0 2px;
}
.page-header > div > p { font-size: 0.8125rem; color: rgba(255,255,255,0.4); margin: 0; }

.back-btn {
  display: inline-flex; align-items: center; gap: 0.375rem;
  padding: 0.5rem 0.875rem; border-radius: 0.5rem; font-size: 0.8125rem; font-weight: 600;
  color: rgba(255,255,255,0.5); border: 1.5px solid rgba(255,255,255,0.1);
  text-decoration: none; transition: all 150ms; flex-shrink: 0;
}
.back-btn:hover { color: white; border-color: rgba(255,255,255,0.2); }

.view-live-btn {
  display: inline-flex; align-items: center; gap: 0.375rem;
  padding: 0.5rem 0.875rem; border-radius: 0.5rem; font-size: 0.8125rem; font-weight: 600;
  color: #2EAD6F; border: 1.5px solid rgba(46,173,111,0.3);
  text-decoration: none; transition: all 150ms; flex-shrink: 0;
}
.view-live-btn:hover { background: rgba(46,173,111,0.1); }

.toast {
  padding: 0.75rem 1rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 600; margin-bottom: 1rem;
}
.toast.success { background: rgba(46,173,111,0.15); border: 1px solid rgba(46,173,111,0.3); color: #6ee7b7; }

/* layout */
.form-layout { display: grid; grid-template-columns: 1fr 280px; gap: 1.25rem; align-items: start; }
@media (max-width: 768px) { .form-layout { grid-template-columns: 1fr; } }

.card { background: #111e14; border: 1px solid #1e3322; border-radius: 1rem; padding: 1.5rem; margin-bottom: 1.25rem; }
.card h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.9375rem; font-weight: 700; color: white; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem; }
.img-counter { margin-left: auto; font-size: 0.75rem; color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 100px; }

.field { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
.field:last-child { margin-bottom: 0; }
.field label { font-size: 0.8125rem; font-weight: 600; color: rgba(255,255,255,0.65); }
.req { color: #E8A44A; }
.field input, .field select, .field textarea {
  width: 100%; padding: 0.6875rem 0.875rem; background: #1a2b1e;
  border: 1.5px solid #243d28; border-radius: 0.5rem; color: white;
  font-size: 0.9375rem; font-family: inherit; transition: border-color 200ms; appearance: none;
}
.field select option { background: #1a2b1e; color: white; }
.field textarea { resize: vertical; min-height: 140px; }
.field select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7E6E' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 0.875rem center; padding-right: 2.5rem; cursor: pointer;
}
.field input:focus, .field select:focus, .field textarea:focus { outline: none; border-color: #1B6B45; box-shadow: 0 0 0 3px rgba(27,107,69,0.15); }
.field.error input, .field.error select { border-color: rgba(220,38,38,0.6); }
.err { font-size: 0.75rem; color: #fca5a5; font-weight: 500; }

.section-label { font-size: 0.75rem; font-weight: 600; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.625rem; margin-top: 0.25rem; }

.preview-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-bottom: 0.75rem; }
.preview-item { position: relative; aspect-ratio: 4/3; border-radius: 0.5rem; overflow: hidden; background: rgba(255,255,255,0.04); }
.preview-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
.preview-remove { position: absolute; top: 0.375rem; right: 0.375rem; width: 22px; height: 22px; border-radius: 50%; background: rgba(220,38,38,0.85); color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 150ms; }
.preview-item:hover .preview-remove { opacity: 1; }
.preview-remove:hover { background: #dc2626; }
.preview-main-badge { position: absolute; top: 0.375rem; left: 0.375rem; background: #1B6B45; color: white; font-size: 0.5625rem; font-weight: 700; padding: 2px 6px; border-radius: 100px; letter-spacing: 0.04em; text-transform: uppercase; }

.drop-zone { border: 2px dashed rgba(255,255,255,0.1); border-radius: 0.5rem; padding: 1rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer; color: rgba(255,255,255,0.4); font-size: 0.875rem; transition: all 200ms; user-select: none; }
.drop-zone:hover, .drop-zone.drag-over { border-color: #1B6B45; background: rgba(27,107,69,0.06); color: rgba(255,255,255,0.7); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

/* Toggle */
.toggle-field { padding: 0.875rem; background: #152318; border-radius: 0.5rem; border: 1px solid #1e3322; }
.toggle-label { display: flex; align-items: center; justify-content: space-between; cursor: pointer; gap: 1rem; }
.toggle-info { display: flex; flex-direction: column; gap: 2px; }
.toggle-info > span:first-child { font-size: 0.9375rem; font-weight: 600; color: white; }
.toggle-hint { font-size: 0.75rem; color: rgba(255,255,255,0.35); }
.toggle-switch-wrapper { position: relative; flex-shrink: 0; }
.toggle-input { position: absolute; opacity: 0; width: 0; height: 0; }
.toggle-switch { width: 44px; height: 24px; background: rgba(255,255,255,0.12); border-radius: 100px; transition: background 200ms; position: relative; }
.toggle-switch::after { content: ''; position: absolute; width: 18px; height: 18px; background: white; border-radius: 50%; top: 3px; left: 3px; transition: transform 200ms; }
.toggle-input:checked ~ .toggle-switch { background: #1B6B45; }
.toggle-input:checked ~ .toggle-switch::after { transform: translateX(20px); }

/* Meta */
.meta-card { padding: 1rem 1.25rem; }
.meta-item { display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: rgba(255,255,255,0.35); margin-bottom: 0.5rem; }
.meta-item:last-child { margin-bottom: 0; }
.meta-item > span:last-child { color: rgba(255,255,255,0.5); }
code { font-size: 0.6875rem; background: rgba(255,255,255,0.06); padding: 2px 6px; border-radius: 3px; font-family: monospace; }

/* Submit */
.submit-card { background: #111e14; border: 1px solid #1e3322; border-radius: 1rem; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; }
.submit-btn { display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; padding: 0.875rem; background: #1B6B45; color: white; border: none; border-radius: 0.5rem; font-size: 0.9375rem; font-weight: 700; font-family: inherit; cursor: pointer; transition: all 200ms; }
.submit-btn:hover:not(:disabled) { background: #14523A; transform: translateY(-1px); }
.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.delete-btn { display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; padding: 0.625rem; background: transparent; border: 1.5px solid rgba(220,38,38,0.25); color: rgba(255,100,100,0.6); border-radius: 0.5rem; font-size: 0.8125rem; font-weight: 600; cursor: pointer; font-family: inherit; transition: all 150ms; }
.delete-btn:hover { background: rgba(220,38,38,0.1); border-color: rgba(220,38,38,0.4); color: #fca5a5; }
.spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Modal */
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.75); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem; }
.modal { background: #111a13; border: 1px solid rgba(255,255,255,0.1); border-radius: 1rem; padding: 2rem; max-width: 400px; width: 100%; }
.modal h3 { color: white; font-size: 1.125rem; margin-bottom: 0.75rem; }
.modal p { color: rgba(255,255,255,0.6); font-size: 0.9rem; margin-bottom: 1.5rem; }
.modal-actions { display: flex; gap: 0.75rem; justify-content: flex-end; }
.btn-cancel { padding: 0.5625rem 1.25rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 600; background: transparent; border: 1.5px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.6); cursor: pointer; font-family: inherit; transition: all 150ms; }
.btn-cancel:hover { background: rgba(255,255,255,0.05); color: white; }
.btn-delete-confirm { padding: 0.5625rem 1.25rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 700; background: #dc2626; border: none; color: white; cursor: pointer; font-family: inherit; transition: background 150ms; }
.btn-delete-confirm:hover:not(:disabled) { background: #b91c1c; }
.btn-delete-confirm:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
