import { error } from '@sveltejs/kit';
import { teamMembers } from '$lib/data/team.js';
import type { PageLoad } from './$types.js';

export const load: PageLoad = ({ params }) => {
  const member = teamMembers.find((m) => m.slug === params.slug);
  if (!member) error(404, 'Membre introuvable');
  return { member };
};
