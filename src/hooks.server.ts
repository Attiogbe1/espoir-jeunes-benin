import type { Handle } from '@sveltejs/kit';
import { existsSync, readFileSync, statSync } from 'fs';
import { join, extname } from 'path';

const MIME: Record<string, string> = {
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png':  'image/png',
  '.webp': 'image/webp',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
};

export const handle: Handle = async ({ event, resolve }) => {
  const { pathname } = event.url;

  // Servir les images uploadées depuis le volume persistant (uniquement en production)
  // En développement, Vite gère directement le dossier /static
  if (pathname.startsWith('/uploads/') && process.env.STORAGE_PATH) {
    const filePath = join(process.env.STORAGE_PATH, pathname);

    if (existsSync(filePath) && statSync(filePath).isFile()) {
      const data        = readFileSync(filePath);
      const contentType = MIME[extname(filePath).toLowerCase()] ?? 'application/octet-stream';

      return new Response(data, {
        headers: {
          'Content-Type':  contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
          'Content-Length': String(data.byteLength),
        },
      });
    }

    return new Response('Not found', { status: 404 });
  }

  return resolve(event);
};
