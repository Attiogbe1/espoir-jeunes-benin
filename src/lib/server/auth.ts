import { createHmac, timingSafeEqual, randomBytes } from 'crypto';
import { ADMIN_PASSWORD, SESSION_SECRET } from '$env/static/private';

const COOKIE_NAME = 'ejb_admin_session';
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 jours en secondes

/** Génère un token de session signé HMAC */
export function createSessionToken(): string {
  const random = randomBytes(32).toString('hex');
  const timestamp = Date.now().toString();
  const payload = `${random}.${timestamp}`;
  const sig = createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}.${sig}`).toString('base64url');
}

/** Vérifie qu'un token de session est valide */
export function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64url').toString();
    const parts = decoded.split('.');
    if (parts.length !== 3) return false;
    const [random, timestamp, sig] = parts;
    const payload = `${random}.${timestamp}`;
    const expected = createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
    const sigBuf = Buffer.from(sig, 'hex');
    const expBuf = Buffer.from(expected, 'hex');
    if (sigBuf.length !== expBuf.length) return false;
    if (!timingSafeEqual(sigBuf, expBuf)) return false;
    // Vérifier l'expiration (7 jours)
    const age = Date.now() - parseInt(timestamp, 10);
    return age < SESSION_DURATION * 1000;
  } catch {
    return false;
  }
}

/** Vérifie le mot de passe administrateur */
export function checkPassword(input: string): boolean {
  try {
    const a = Buffer.from(input.padEnd(64).slice(0, 64));
    const b = Buffer.from(ADMIN_PASSWORD.padEnd(64).slice(0, 64));
    return timingSafeEqual(a, b) && input === ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

export { COOKIE_NAME, SESSION_DURATION };
