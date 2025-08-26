import ShortUniqueId from 'short-unique-id';

export function generateId(prefix?: string): string {
  const uid = new ShortUniqueId({ length: 10 });
  return `${prefix ?? ''}${uid.rnd()}`;
}
