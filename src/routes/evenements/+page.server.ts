import type { PageServerLoad } from './$types';
import { getPublishedEvents } from '$lib/server/events.js';

export const load: PageServerLoad = () => {
  return { events: getPublishedEvents() };
};
