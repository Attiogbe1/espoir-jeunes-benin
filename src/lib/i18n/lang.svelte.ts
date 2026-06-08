import { fr } from './fr.js';
import { en } from './en.js';
import type { Translations } from './fr.js';

type Lang = 'fr' | 'en';

const translations: Record<Lang, Translations> = { fr, en } as any;

class LangStore {
  current: Lang = $state('fr');

  get t(): Translations {
    return translations[this.current];
  }

  toggle() {
    this.current = this.current === 'fr' ? 'en' : 'fr';
  }

  set(lang: Lang) {
    this.current = lang;
  }
}

export const langStore = new LangStore();
