import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { randomBytes } from 'crypto';

export type { EventCategory } from '$lib/data/categories.js';
export { categoryLabels, categoryColors } from '$lib/data/categories.js';
import type { EventCategory } from '$lib/data/categories.js';

export interface OngEvent {
  id: string;
  title: string;
  excerpt: string;
  description: string;
  date: string;         // ISO date 'YYYY-MM-DD'
  category: EventCategory;
  images: string[];     // Chemins relatifs depuis /uploads/events/
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// En production Railway, STORAGE_PATH pointe vers le volume persistant (ex: /storage)
const STORAGE = process.env.STORAGE_PATH;
const DATA_DIR   = STORAGE ? join(STORAGE, 'data')           : join(process.cwd(), 'src', 'lib', 'data');
const EVENTS_FILE = join(DATA_DIR, 'events.json');
const UPLOADS_DIR = STORAGE ? join(STORAGE, 'uploads', 'events') : join(process.cwd(), 'static', 'uploads', 'events');

function ensureDirs() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  if (!existsSync(UPLOADS_DIR)) mkdirSync(UPLOADS_DIR, { recursive: true });
}

export function readEvents(): OngEvent[] {
  ensureDirs();
  if (!existsSync(EVENTS_FILE)) {
    writeFileSync(EVENTS_FILE, '[]', 'utf-8');
    return [];
  }
  try {
    return JSON.parse(readFileSync(EVENTS_FILE, 'utf-8')) as OngEvent[];
  } catch {
    return [];
  }
}

export function writeEvents(events: OngEvent[]): void {
  ensureDirs();
  writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2), 'utf-8');
}

export function getPublishedEvents(): OngEvent[] {
  return readEvents()
    .filter(e => e.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getEventById(id: string): OngEvent | undefined {
  return readEvents().find(e => e.id === id);
}

export function generateId(): string {
  return randomBytes(8).toString('hex');
}

/** Sauvegarde une image uploadée, retourne le chemin public */
export async function saveImage(file: File, eventId: string): Promise<string> {
  ensureDirs();
  const eventDir = join(UPLOADS_DIR, eventId);
  if (!existsSync(eventDir)) mkdirSync(eventDir, { recursive: true });

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
  if (!allowedExts.includes(ext)) throw new Error(`Extension non autorisée : ${ext}`);

  const filename = `${randomBytes(8).toString('hex')}.${ext}`;
  const filepath = join(eventDir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  writeFileSync(filepath, buffer);

  return `/uploads/events/${eventId}/${filename}`;
}

/** Supprime le fichier image du disque */
export function deleteImage(imagePath: string): void {
  try {
    const base = process.env.STORAGE_PATH ?? join(process.cwd(), 'static');
    const fullPath = join(base, imagePath);
    if (existsSync(fullPath)) {
      const { unlinkSync } = require('fs');
      unlinkSync(fullPath);
    }
  } catch {
    // Silently ignore missing files
  }
}

