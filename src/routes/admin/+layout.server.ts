import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { COOKIE_NAME, verifySessionToken } from '$lib/server/auth.js';
import { readMessages } from '$lib/server/messages.js';

export const load: LayoutServerLoad = ({ cookies, url }) => {
  if (url.pathname === '/admin/login') return { unread: 0 };

  const token = cookies.get(COOKIE_NAME);
  if (!token || !verifySessionToken(token)) {
    redirect(302, `/admin/login?from=${encodeURIComponent(url.pathname)}`);
  }

  const unread = readMessages().filter(m => !m.read).length;
  return { unread };
};
