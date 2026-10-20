/** Match only concrete, existing service slugs. Route params are already decoded. */
export function findServiceBySlug<T extends { slug: string }>(services: readonly T[], slug: string): T | undefined {
  if (!slug || slug.includes("$")) return undefined;
  return services.find((service) => service.slug === slug);
}