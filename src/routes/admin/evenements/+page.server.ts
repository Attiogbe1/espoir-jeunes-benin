import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { readEvents, writeEvents } from '$lib/server/events.js';

export const load: PageServerLoad = () => {
  return { events: readEvents().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) };
};

export const actions: Actions = {
  togglePublish: async ({ request }) => {
    const data = await request.formData();
    const id = String(data.get('id') ?? '');
    const events = readEvents();
    const idx = events.findIndex(e => e.id === id);
    if (idx === -1) return fail(404, { error: 'Événement introuvable.' });
    events[idx].published = !events[idx].published;
    events[idx].updatedAt = new Date().toISOString();
    writeEvents(events);
    return { success: true };
  },

  delete: async ({ request }) => {
    const data = await request.formData();
    const id = String(data.get('id') ?? '');
    const events = readEvents();
    const filtered = events.filter(e => e.id !== id);
    if (filtered.length === events.length) return fail(404, { error: 'Événement introuvable.' });
    writeEvents(filtered);
    return { success: true, deleted: id };
  },
};
