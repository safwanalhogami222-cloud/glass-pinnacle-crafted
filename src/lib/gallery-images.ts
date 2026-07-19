// Auto-discovers every image in src/assets/gallery/ via Vite's import.meta.glob.
// Handles regular image files and lovable-assets .asset.json pointers.
const fileModules = import.meta.glob("../assets/gallery/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const assetModules = import.meta.glob("../assets/gallery/*.asset.json", {
  eager: true,
}) as Record<string, { default: { url: string } }>;

const fromFiles = Object.entries(fileModules).map(([path, url]) => ({ path, url }));
const fromAssets = Object.entries(assetModules).map(([path, mod]) => ({
  path,
  url: mod.default.url,
}));

export type GalleryCategory = "facades" | "doors" | "showers" | "railings" | "mirrors";

export const CATEGORY_LABELS: Record<GalleryCategory | "all", string> = {
  all: "الكل",
  facades: "واجهات زجاج",
  doors: "أبواب زجاج",
  showers: "شاور زجاج",
  railings: "درابزين زجاج",
  mirrors: "مرايا",
};

const CATEGORIES: GalleryCategory[] = ["facades", "doors", "showers", "railings", "mirrors"];

// Explicit overrides based on filename hints (e.g. "مرايات" → mirrors).
function categoryFor(path: string, index: number): GalleryCategory {
  const p = path.toLowerCase();
  if (path.includes("مراي") || p.includes("mirror")) return "mirrors";
  if (p.includes("shower") || p.includes("شاور")) return "showers";
  if (p.includes("door") || path.includes("باب")) return "doors";
  if (p.includes("railing") || path.includes("درابز")) return "railings";
  if (p.includes("facade") || path.includes("واجه")) return "facades";
  return CATEGORIES[index % CATEGORIES.length];
}

const merged = [...fromFiles, ...fromAssets].sort((a, b) => a.path.localeCompare(b.path));

export const GALLERY_ITEMS: { url: string; category: GalleryCategory }[] = merged.map(
  (x, i) => ({ url: x.url, category: categoryFor(x.path, i) }),
);

export const GALLERY_IMAGES: string[] = GALLERY_ITEMS.map((x) => x.url);
