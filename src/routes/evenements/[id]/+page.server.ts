import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getEventById, getPublishedEvents } from '$lib/server/events.js';

export const load: PageServerLoad = ({ params }) => {
  const event = getEventById(params.id);
  if (!event || !event.published) error(404, 'Événement introuvable.');

  // Autres événements publiés (hors celui-ci, max 3)
  const related = getPublishedEvents()
    .filter(e => e.id !== params.id)
    .slice(0, 3);

  return { event, related };
};
