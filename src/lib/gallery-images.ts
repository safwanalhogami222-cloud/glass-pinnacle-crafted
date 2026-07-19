// Auto-discovers every image in src/assets/gallery/ via Vite's import.meta.glob.
// Each image is paired with a real, descriptive Arabic name and a work category
// so the gallery can group items by type of work and show a matching icon.

const fileModules = import.meta.glob("../assets/gallery/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const assetModules = import.meta.glob("../assets/gallery/*.asset.json", {
  eager: true,
}) as Record<string, { default: { url: string; original_filename?: string } }>;

// Build a map: filename (without folder) -> URL
const urlByName: Record<string, string> = {};
for (const [path, url] of Object.entries(fileModules)) {
  const name = path.split("/").pop() as string;
  urlByName[name] = url;
}
for (const [path, mod] of Object.entries(assetModules)) {
  // .asset.json files replace the underlying image with the same base name
  const name = (path.split("/").pop() as string).replace(/\.asset\.json$/, "");
  urlByName[name] = mod.default.url;
}

export type GalleryCategory =
  | "shower"
  | "railing"
  | "mirror"
  | "facade"
  | "partition"
  | "table"
  | "etched";

export interface GalleryItem {
  url: string;
  title: string;
  category: GalleryCategory;
}

// Ordered list — grouped by category (شاور، درابزين، مرايا، واجهات، قواطع، طاولات، نقوش)
const CATALOG: Array<{ file: string; title: string; category: GalleryCategory }> = [
  // ── شاور زجاج سيكوريت ──
  { file: "IMG-20260212-WA0034.jpg", title: "كابينة شاور زجاج سيكوريت بإطار أسود", category: "shower" },
  { file: "٢٠٢٦٠٢٠٩_١٧٢١٢٢.jpg", title: "شاور زجاج مضلع (ريدد) بجدار رخام", category: "shower" },
  { file: "٢٠٢٦٠٢٠٩_١٧٣٤٢١.jpg", title: "لوح شاور زجاج مضلع لحمام حديث", category: "shower" },
  { file: "٢٠٢٦٠٢٠٩_١٧٣٨٢٦.jpg", title: "شاور زجاج مضلع بجدار رمادي", category: "shower" },
  { file: "٢٠٢٦٠٢٠٩_١٧٥٥٥٩.jpg", title: "شاور زجاج مضلع بمقبض كروم", category: "shower" },
  { file: "IMG-20260523-WA0179.jpeg", title: "شاور زجاج منزلق بمقبض كروم", category: "shower" },

  // ── درابزين زجاج ──
  { file: "IMG-20260421-WA0006(1).jpg", title: "درابزين زجاج لدرج رخام", category: "railing" },
  { file: "IMG-20260421-WA0008.jpg", title: "درابزين زجاج بإطار أسود للدرج", category: "railing" },
  { file: "IMG-20260421-WA0013.jpg", title: "درابزين زجاج لدرج معلق بإضاءة", category: "railing" },
  { file: "IMG-20260421-WA0019.jpg", title: "درابزين زجاج لدرج رخامي", category: "railing" },
  { file: "IMG-20260624-WA0084.jpeg", title: "درابزين شرفة زجاج سيكوريت", category: "railing" },

  // ── واجهات ومداخل ──
  { file: "٢٠٢٦٠٦٣٠_١٨٣٥٢٠.jpg", title: "واجهة مبنى بمدخل زجاج سيكوريت", category: "facade" },

  // ── قواطع وأبواب زجاج ──
  { file: "IMAGE-2023-07-16-170438-846x1024.jpg", title: "قاطع زجاج سيكوريت للمطبخ بإطار أسود", category: "partition" },
  { file: "٢٠٢٦٠٢٢٦_٢٣٤٨٤٠.jpg", title: "نافذة زجاج فروست بمقبض ذهبي", category: "partition" },
  { file: "IMG-20260711-WA0091.jpeg", title: "أبواب منزلقة بمرايا", category: "partition" },

  // ── مرايا فاخرة ──
  { file: "مرايات-مداخل-مستديرة.jpg", title: "مرآة مستديرة لمدخل حديث", category: "mirror" },
  { file: "62dea600-5e49-4db7-8840-948915717483-890x1000-0bsljek8EZyhHVD43GICpCOrL0GFivr6p3H0Ca56.jpg", title: "مرآة مستديرة بإطار أسود لمدخل", category: "mirror" },
  { file: "6d59ee65-6542-4f36-a1c3-598034830654-915.14598540146x1000-urNmgtc8SsthNKtZjAlQ8kpG4ZZxB6DjpvqfstY4.jpg", title: "مرآة حائط بنقش الماس", category: "mirror" },
  { file: "HkxvtS4fayCYlIxQkrOdGRWVc8IqUFSVVvqA5tzh.jpg", title: "مرآة كاملة الطول بإضاءة خلفية", category: "mirror" },
  { file: "f5ec0597-5d2a-46b1-ac32-a6e635c2646b-1000x1000-udqxVpDZhUsnbw89uy2DhmJyhPLAU53opHPjovrj.jpg", title: "مرآة كاملة الطول لمدخل فاخر", category: "mirror" },

  // ── طاولات زجاج سيكوريت ──
  { file: "168162056-168162056-HC25062025_02-2100 (1).jpg", title: "طاولة قهوة زجاج بقاعدة خشبية", category: "table" },
  { file: "207cbc8f-a9cb-416d-a7d3-04286ebc10a5-1000x1000-dp10NVXXZLqtjXIVlDIf4JTaVNHdZ0iURMGCm4ou.jpg", title: "طاولة زجاج دائرية بقاعدة ترافرتين", category: "table" },
  { file: "34177cd1-2f2b-4ad0-981b-4b406078c8e9-1000x1000-SbBJWPXT0DZBj2jqUNRSxVaQlew6oPdnLW2BPLgG.jpg", title: "طقم طاولات زجاج بقواعد ذهبية", category: "table" },
  { file: "FJqkO4q9VQCdz05vsxDabcimbjTxDryf6CeZmeTO.jpg", title: "طاولة زجاج دائرية بقواعد حجرية", category: "table" },
  { file: "nHEgKdAh4Unul98ExJdNhtOTXQX76WArvXlvPgcY.jpg", title: "طاولة زجاج مستطيلة بقاعدة ترافرتين", category: "table" },
  { file: "٢٠٢٦٠٢١٧_١٥١٣١٢.jpg", title: "طاولة طعام زجاج بإطلالة داخلية", category: "table" },

  // ── نقوش وحفر على الزجاج ──
  { file: "٢٠٢٦٠٣٠٩_٠٧٠٦٢٣.jpg", title: "قاطع زجاج منقوش بأمواج مع نافذة معشقة", category: "etched" },
  { file: "٢٠٢٦٠٣٠٩_٠٧٢٥٣٦.jpg", title: "زجاج شاور منقوش مع فيتراج أزرق", category: "etched" },
  { file: "٢٠٢٦٠٣٠٩_٠٨١١٣٠.jpg", title: "قاطع زجاج منقوش بأمواج ناعمة", category: "etched" },
  { file: "٢٠٢٦٠٤١٣_٢٠٤٢٢٧.jpg", title: "شاور زجاج منقوش بإطار ذهبي", category: "etched" },
  { file: "٢٠٢٦٠٤١٣_٢٢٢٨٤٥.jpg", title: "زجاج ديكوري منقوش بتصميم فاخر", category: "etched" },
];

export const GALLERY_ITEMS: GalleryItem[] = CATALOG
  .filter((c) => urlByName[c.file])
  .map((c) => ({ url: urlByName[c.file], title: c.title, category: c.category }));

export const CATEGORY_META: Record<GalleryCategory, { label: string }> = {
  shower: { label: "شاور زجاج" },
  railing: { label: "درابزين زجاج" },
  mirror: { label: "مرايا" },
  facade: { label: "واجهات" },
  partition: { label: "قواطع وأبواب" },
  table: { label: "طاولات زجاج" },
  etched: { label: "نقوش وحفر" },
};

// Back-compat export (URL-only list) for any older imports
export const GALLERY_IMAGES: string[] = GALLERY_ITEMS.map((i) => i.url);
