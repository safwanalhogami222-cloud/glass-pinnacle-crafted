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

export const GALLERY_IMAGES: string[] = [...fromFiles, ...fromAssets]
  .sort((a, b) => a.path.localeCompare(b.path))
  .map((x) => x.url);
