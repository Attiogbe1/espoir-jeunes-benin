import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { randomBytes } from 'crypto';

export interface ContactMessage {
  id: string;
  name: string;
  org: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const STORAGE = process.env.STORAGE_PATH;
const DATA_DIR = STORAGE ? join(STORAGE, 'data') : join(process.cwd(), 'src', 'lib', 'data');
const MESSAGES_FILE = join(DATA_DIR, 'messages.json');

function ensureDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

export function readMessages(): ContactMessage[] {
  ensureDir();
  if (!existsSync(MESSAGES_FILE)) {
    writeFileSync(MESSAGES_FILE, '[]', 'utf-8');
    return [];
  }
  try {
    return JSON.parse(readFileSync(MESSAGES_FILE, 'utf-8')) as ContactMessage[];
  } catch {
    return [];
  }
}

export function writeMessages(messages: ContactMessage[]): void {
  ensureDir();
  writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
}

export function saveMessage(data: Omit<ContactMessage, 'id' | 'read' | 'createdAt'>): ContactMessage {
  const messages = readMessages();
  const msg: ContactMessage = {
    id: randomBytes(8).toString('hex'),
    ...data,
    read: false,
    createdAt: new Date().toISOString(),
  };
  messages.unshift(msg);
  writeMessages(messages);
  return msg;
}
