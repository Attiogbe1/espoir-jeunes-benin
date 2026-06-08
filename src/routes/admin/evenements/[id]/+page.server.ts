import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { readEvents, writeEvents, saveImage, deleteImage, getEventById } from '$lib/server/events.js';
import type { EventCategory } from '$lib/server/events.js';

export const load: PageServerLoad = ({ params, url }) => {
  const event = getEventById(params.id);
  if (!event) error(404, 'Événement introuvable.');
  return { event, created: url.searchParams.has('created') };
};

export const actions: Actions = {
  update: async ({ request, params }) => {
    const data = await request.formData();
    const title       = String(data.get('title') ?? '').trim();
    const excerpt     = String(data.get('excerpt') ?? '').trim();
    const description = String(data.get('description') ?? '').trim();
    const date        = String(data.get('date') ?? '').trim();
    const category    = String(data.get('category') ?? '').trim() as EventCategory;
    const published   = data.get('published') === '1';
    const newImages   = (data.getAll('images') as File[]).filter(f => f.size > 0);
    const keepImages  = data.getAll('keep_image') as string[];

    const errors: Record<string, string> = {};
    if (!title)       errors.title       = 'Le titre est requis.';
    if (!excerpt)     errors.excerpt     = 'Le résumé est requis.';
    if (!description) errors.description = 'La description est requise.';
    if (!date)        errors.date        = 'La date est requise.';

    if (Object.keys(errors).length > 0) {
      return fail(422, { errors });
    }

    const events = readEvents();
    const idx = events.findIndex(e => e.id === params.id);
    if (idx === -1) error(404, 'Événement introuvable.');

    const existing = events[idx];

    // Supprimer les images non conservées
    for (const img of existing.images) {
      if (!keepImages.includes(img)) deleteImage(img);
    }

    // Sauvegarder les nouvelles images
    const newPaths: string[] = [];
    for (const img of newImages) {
      const path = await saveImage(img, params.id);
      newPaths.push(path);
    }

    events[idx] = {
      ...existing,
      title,
      excerpt,
      description,
      date,
      category,
      published,
      images: [...keepImages, ...newPaths],
      updatedAt: new Date().toISOString(),
    };

    writeEvents(events);
    return { success: true };
  },

  delete: async ({ params }) => {
    const events = readEvents();
    const event = events.find(e => e.id === params.id);
    if (!event) error(404, 'Événement introuvable.');

    for (const img of event.images) deleteImage(img);
    writeEvents(events.filter(e => e.id !== params.id));

    redirect(302, '/admin/evenements');
  },
};
