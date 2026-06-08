export type EventCategory = 'td' | 'fournitures' | 'formations' | 'autre';

export const categoryLabels: Record<EventCategory, string> = {
  td: 'TD Gratuits',
  fournitures: 'Fournitures Scolaires',
  formations: 'Formations',
  autre: 'Autre',
};

export const categoryColors: Record<EventCategory, string> = {
  td: '#1B6B45',
  fournitures: '#E8A44A',
  formations: '#2EAD6F',
  autre: '#6B7E6E',
};
