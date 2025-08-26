import ShortUniqueId from "short-unique-id";

export function generateId(prefix?: string): string {
  // @ts-ignore
  const uid = new ShortUniqueId({ length: 10 });
  // @ts-ignore
  return `${prefix ?? ""}${uid.rnd()}`;
}
