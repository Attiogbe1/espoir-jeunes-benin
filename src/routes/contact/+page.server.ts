import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { saveMessage } from '$lib/server/messages.js';

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const name    = String(data.get('name')    ?? '').trim();
    const org     = String(data.get('org')     ?? '').trim();
    const email   = String(data.get('email')   ?? '').trim();
    const phone   = String(data.get('phone')   ?? '').trim();
    const type    = String(data.get('type')    ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    const errors: Record<string, string> = {};
    if (!name) errors.name = 'Le nom est requis.';
    if (!email) errors.email = "L'email est requis.";
    else if (!validateEmail(email)) errors.email = "L'adresse email n'est pas valide.";
    if (!type) errors.type = 'Veuillez sélectionner un type de demande.';
    if (!message) errors.message = 'Le message est requis.';
    if (message && message.length < 20) errors.message = 'Le message doit contenir au moins 20 caractères.';

    if (Object.keys(errors).length > 0) {
      return fail(422, { errors, values: { name, org, email, phone, type, message } });
    }

    saveMessage({ name, org, email, phone, type, message });

    return { success: true };
  },
};
