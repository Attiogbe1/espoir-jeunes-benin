import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { checkPassword, createSessionToken, COOKIE_NAME, SESSION_DURATION, verifySessionToken } from '$lib/server/auth.js';

export const load: PageServerLoad = ({ cookies }) => {
  const token = cookies.get(COOKIE_NAME);
  if (token && verifySessionToken(token)) {
    redirect(302, '/admin');
  }
  return {};
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const password = String(data.get('password') ?? '');

    if (!password || !checkPassword(password)) {
      return fail(401, { error: 'Mot de passe incorrect.' });
    }

    const token = createSessionToken();
    cookies.set(COOKIE_NAME, token, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: SESSION_DURATION,
      secure: false, // Mettre true en production HTTPS
    });

    redirect(302, '/admin');
  },
};
