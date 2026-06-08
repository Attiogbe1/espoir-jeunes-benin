import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { readEvents } from '$lib/server/events.js';
import { readMessages } from '$lib/server/messages.js';
import { COOKIE_NAME } from '$lib/server/auth.js';

export const load: PageServerLoad = () => {
  const events   = readEvents();
  const messages = readMessages();
  return {
    total:     events.length,
    published: events.filter(e => e.published).length,
    drafts:    events.filter(e => !e.published).length,
    recent:    events
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5),
    unreadMessages: messages.filter(m => !m.read).length,
    totalMessages:  messages.length,
  };
};

export const actions: Actions = {
  logout: ({ cookies }) => {
    cookies.delete(COOKIE_NAME, { path: '/' });
    redirect(302, '/admin/login');
  },
};
