import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { readEvents, writeEvents, saveImage, generateId } from '$lib/server/events.js';
import type { EventCategory } from '$lib/server/events.js';

const MAX_IMAGES = 8;
const MAX_SIZE_MB = 5;

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const title       = String(data.get('title') ?? '').trim();
    const excerpt     = String(data.get('excerpt') ?? '').trim();
    const description = String(data.get('description') ?? '').trim();
    const date        = String(data.get('date') ?? '').trim();
    const category    = String(data.get('category') ?? '').trim() as EventCategory;
    const published   = data.get('published') === '1';
    const imageFiles  = data.getAll('images') as File[];

    // Validation
    const errors: Record<string, string> = {};
    if (!title)       errors.title       = 'Le titre est requis.';
    if (!excerpt)     errors.excerpt     = "Le résumé est requis.";
    if (!description) errors.description = 'La description est requise.';
    if (!date)        errors.date        = 'La date est requise.';
    if (!['td','fournitures','formations','autre'].includes(category))
      errors.category = 'Catégorie invalide.';

    const validImages = imageFiles.filter(f => f && f.size > 0);
    if (validImages.length === 0) errors.images = 'Au moins une image est requise.';
    if (validImages.length > MAX_IMAGES) errors.images = `Maximum ${MAX_IMAGES} images.`;

    for (const img of validImages) {
      if (img.size > MAX_SIZE_MB * 1024 * 1024)
        errors.images = `Chaque image doit faire moins de ${MAX_SIZE_MB} Mo. "${img.name}" est trop grande.`;
    }

    if (Object.keys(errors).length > 0) {
      return fail(422, {
        errors,
        values: { title, excerpt, description, date, category }
      });
    }

    const id = generateId();
    const savedPaths: string[] = [];

    for (const img of validImages) {
      const path = await saveImage(img, id);
      savedPaths.push(path);
    }

    const now = new Date().toISOString();
    const events = readEvents();
    events.push({
      id,
      title,
      excerpt,
      description,
      date,
      category,
      images: savedPaths,
      published,
      createdAt: now,
      updatedAt: now,
    });
    writeEvents(events);

    redirect(302, `/admin/evenements/${id}?created=1`);
  },
};
