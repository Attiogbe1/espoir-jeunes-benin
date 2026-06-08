import type { Actions, PageServerLoad } from './$types';
import { readMessages, writeMessages } from '$lib/server/messages.js';

export const load: PageServerLoad = () => {
  return { messages: readMessages() };
};

export const actions: Actions = {
  markRead: async ({ request }) => {
    const form = await request.formData();
    const id = String(form.get('id') ?? '');
    const messages = readMessages();
    const msg = messages.find(m => m.id === id);
    if (msg) { msg.read = true; writeMessages(messages); }
    return { success: true };
  },

  markAllRead: async () => {
    const messages = readMessages();
    messages.forEach(m => { m.read = true; });
    writeMessages(messages);
    return { success: true };
  },

  delete: async ({ request }) => {
    const form = await request.formData();
    const id = String(form.get('id') ?? '');
    writeMessages(readMessages().filter(m => m.id !== id));
    return { success: true };
  },
};
