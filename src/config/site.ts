/**
 * PORTFOLIO LAYOUT CONTROL CENTER
 *
 * Change enabled to false to hide a section everywhere (page and navigation).
 * Change order to rearrange sections. You do NOT need to edit any components.
 * The home/hero section can also be hidden or repositioned.
 */
export const sections = {
  home:       { enabled: true,  order: 0,  label: "Home",       inNav: false },
  ticker:     { enabled: true,  order: 5,  label: "Specialties", inNav: false },
  work:       { enabled: false, order: 10, label: "Work",       inNav: true },
  about:      { enabled: true,  order: 20, label: "About",      inNav: true },
  skills:     { enabled: true,  order: 30, label: "Skills",     inNav: true },
  experience: { enabled: true,  order: 40, label: "Experience", inNav: true },
  resume:     { enabled: true,  order: 45, label: "Résumé",     inNav: true },
  playground: { enabled: true,  order: 50, label: "Playground", inNav: true },
  contact:    { enabled: true,  order: 60, label: "Contact",    inNav: true },
} as const;

export type SectionId = keyof typeof sections;
export type SectionSettings = Record<SectionId, { enabled: boolean; order: number; label: string; inNav: boolean }>;

/** Pure layout selectors can be tested with different visibility/order configurations. */
export function resolveVisibleSections(config: SectionSettings): SectionId[] {
  return (Object.keys(config) as SectionId[])
    .filter((id) => config[id].enabled)
    .sort((a, b) => config[a].order - config[b].order);
}

export function resolveNavigation(config: SectionSettings): { id: SectionId; label: string; href: string }[] {
  return resolveVisibleSections(config)
    .filter((id) => config[id].inNav)
    .map((id) => ({ id, label: config[id].label, href: `#${id}` }));
}

export function getVisibleSections(): SectionId[] {
  return resolveVisibleSections(sections);
}

export function getNavigation(): { id: SectionId; label: string; href: string }[] {
  return resolveNavigation(sections);
}

/** Return the preferred CTA if enabled, otherwise the first visible section. */
export function sectionLink(preferred: SectionId): string {
  const visible = getVisibleSections();
  if (visible.includes(preferred)) return `#${preferred}`;
  return visible.length ? `#${visible[0]}` : "/";
}

/** Sequential visible-section numbering, excluding the hero and decorative ticker. */
export function sectionNumber(id: SectionId): string {
  const numbered: SectionId[] = getVisibleSections().filter((x) => x !== "home" && x !== "ticker");
  const index = numbered.indexOf(id);
  return index < 0 ? "" : String(index + 1).padStart(2, "0");
}
