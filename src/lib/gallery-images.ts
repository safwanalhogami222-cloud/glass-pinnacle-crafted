// Auto-discovers every image in src/assets/gallery/ via Vite's import.meta.glob.
// Each project has a slug (project URL), Arabic name, city, description, and category.

const fileModules = import.meta.glob("../assets/gallery/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const assetModules = import.meta.glob("../assets/gallery/*.asset.json", {
  eager: true,
}) as Record<string, { default: { url: string; original_filename?: string } }>;

const urlByName: Record<string, string> = {};
for (const [path, url] of Object.entries(fileModules)) {
  const name = path.split("/").pop() as string;
  urlByName[name] = url;
}
for (const [path, mod] of Object.entries(assetModules)) {
  const name = (path.split("/").pop() as string).replace(/\.asset\.json$/, "");
  urlByName[name] = mod.default.url;
}

export type GalleryCategory =
  | "facade"
  | "door"
  | "shower"
  | "railing"
  | "office"
  | "mirror";

export interface GalleryItem {
  slug: string;
  url: string;
  title: string;
  city: string;
  description: string;
  category: GalleryCategory;
}

export const CATEGORY_META: Record<GalleryCategory, { label: string }> = {
  facade: { label: "واجهات زجاج" },
  door: { label: "أبواب زجاج" },
  shower: { label: "شاور زجاج" },
  railing: { label: "درابزين زجاج" },
  office: { label: "مكاتب زجاجية" },
  mirror: { label: "مرايا" },
};

export const CATEGORY_ORDER: GalleryCategory[] = [
  "facade",
  "door",
  "shower",
  "railing",
  "office",
  "mirror",
];

type RawItem = {
  file: string;
  slug: string;
  title: string;
  city: string;
  description: string;
  category: GalleryCategory;
};

const CATALOG: RawItem[] = [
  // ── شاور زجاج سيكوريت ──
  {
    file: "IMG-20260212-WA0034.jpg",
    slug: "shower-black-frame-dammam",
    title: "كابينة شاور زجاج سيكوريت بإطار أسود",
    city: "الدمام",
    description:
      "كابينة شاور بزجاج سيكوريت 10 مم وإطار ألمنيوم أسود مطفي، تنفيذ دقيق يمنح الحمام مظهرًا عصريًا ومتينًا.",
    category: "shower",
  },
  {
    file: "٢٠٢٦٠٢٠٩_١٧٢١٢٢.jpg",
    slug: "shower-reeded-marble-khobar",
    title: "شاور زجاج مضلع (ريدد) بجدار رخام",
    city: "الخبر",
    description:
      "شاور زجاج مضلع بنقشة ريدد ناعمة على جدار رخامي، يوفر خصوصية ممتازة مع دخول الإضاءة الطبيعية.",
    category: "shower",
  },
  {
    file: "٢٠٢٦٠٢٠٩_١٧٣٤٢١.jpg",
    slug: "shower-reeded-modern-dammam",
    title: "لوح شاور زجاج مضلع لحمام حديث",
    city: "الدمام",
    description:
      "لوح شاور ثابت بزجاج سيكوريت مضلع، تصميم بسيط وأنيق يناسب الحمامات الحديثة صغيرة ومتوسطة المساحة.",
    category: "shower",
  },
  {
    file: "٢٠٢٦٠٢٠٩_١٧٣٨٢٦.jpg",
    slug: "shower-reeded-grey-qatif",
    title: "شاور زجاج مضلع بجدار رمادي",
    city: "القطيف",
    description:
      "قاطع شاور بزجاج مضلع مثبت على جدار رمادي، حل عملي يفصل منطقة الاستحمام دون تقليل الإحساس بالاتساع.",
    category: "shower",
  },
  {
    file: "٢٠٢٦٠٢٠٩_١٧٥٥٥٩.jpg",
    slug: "shower-reeded-chrome-dhahran",
    title: "شاور زجاج مضلع بمقبض كروم",
    city: "الظهران",
    description:
      "شاور سيكوريت بمقبض كروم لامع وإكسسوارات فاخرة، تنفيذ متكامل يجمع بين الأناقة وسهولة الاستخدام.",
    category: "shower",
  },
  {
    file: "IMG-20260523-WA0179.jpeg",
    slug: "shower-sliding-chrome-khobar",
    title: "شاور زجاج منزلق بمقبض كروم",
    city: "الخبر",
    description:
      "كابينة شاور منزلقة بزجاج سيكوريت ومقبض كروم، تصميم يوفر مساحة إضافية داخل الحمام دون التنازل عن الفخامة.",
    category: "shower",
  },
  {
    file: "٢٠٢٦٠٣٠٩_٠٧٢٥٣٦.jpg",
    slug: "shower-etched-vitraj-dammam",
    title: "زجاج شاور منقوش مع فيتراج أزرق",
    city: "الدمام",
    description:
      "شاور بزجاج منقوش يدويًا مع لمسة فيتراج زرقاء، تصميم مميز يمنح الحمام طابعًا فنيًا فاخرًا.",
    category: "shower",
  },
  {
    file: "٢٠٢٦٠٤١٣_٢٠٤٢٢٧.jpg",
    slug: "shower-etched-gold-frame-khobar",
    title: "شاور زجاج منقوش بإطار ذهبي",
    city: "الخبر",
    description:
      "كابينة شاور بزجاج منقوش وإطار ذهبي فاخر، خيار مثالي للحمامات ذات الطابع الكلاسيكي الحديث.",
    category: "shower",
  },

  // ── درابزين زجاج ──
  {
    file: "IMG-20260421-WA0006(1).jpg",
    slug: "railing-marble-stair-dammam",
    title: "درابزين زجاج لدرج رخام",
    city: "الدمام",
    description:
      "درابزين زجاج سيكوريت شفاف لدرج رخامي، يمنح إطلالة نظيفة ومفتوحة مع أعلى معايير الأمان.",
    category: "railing",
  },
  {
    file: "IMG-20260421-WA0008.jpg",
    slug: "railing-black-frame-stair-khobar",
    title: "درابزين زجاج بإطار أسود للدرج",
    city: "الخبر",
    description:
      "درابزين درج بإطار ألمنيوم أسود وزجاج سيكوريت، تنفيذ عصري يبرز خطوط الدرج ويضيف طابعًا جريئًا.",
    category: "railing",
  },
  {
    file: "IMG-20260421-WA0013.jpg",
    slug: "railing-floating-stair-dhahran",
    title: "درابزين زجاج لدرج معلق بإضاءة",
    city: "الظهران",
    description:
      "درابزين زجاجي لدرج معلق مع إضاءة خفية، حل فاخر يبرز جماليات الدرج ويضيف إحساسًا بالخفة والاتساع.",
    category: "railing",
  },
  {
    file: "IMG-20260421-WA0019.jpg",
    slug: "railing-marble-villa-dammam",
    title: "درابزين زجاج لدرج رخامي",
    city: "الدمام",
    description:
      "درابزين زجاج سيكوريت لدرج فيلا رخامي، تركيب دقيق يمنح مدخل الدور العلوي مظهرًا هادئًا وأنيقًا.",
    category: "railing",
  },
  {
    file: "IMG-20260624-WA0084.jpeg",
    slug: "railing-balcony-khobar",
    title: "درابزين شرفة زجاج سيكوريت",
    city: "الخبر",
    description:
      "درابزين شرفة بزجاج سيكوريت مقسى، يوفر إطلالة كاملة دون عوائق مع مقاومة عالية للعوامل الجوية.",
    category: "railing",
  },

  // ── واجهات ──
  {
    file: "٢٠٢٦٠٦٣٠_١٨٣٥٢٠.jpg",
    slug: "facade-entrance-dammam",
    title: "واجهة مبنى بمدخل زجاج سيكوريت",
    city: "الدمام",
    description:
      "واجهة زجاجية لمدخل مبنى تجاري بزجاج سيكوريت شفاف، تصميم يعكس هوية المكان ويعزز ظهوره من الخارج.",
    category: "facade",
  },

  // ── أبواب / قواطع زجاج ──
  {
    file: "IMAGE-2023-07-16-170438-846x1024.jpg",
    slug: "door-kitchen-partition-dammam",
    title: "قاطع زجاج سيكوريت للمطبخ بإطار أسود",
    city: "الدمام",
    description:
      "باب وقاطع زجاج سيكوريت بإطار أسود يفصل المطبخ عن الصالة، حل عملي يحافظ على الاتساع البصري ويعزل الروائح.",
    category: "door",
  },
  {
    file: "٢٠٢٦٠٢٢٦_٢٣٤٨٤٠.jpg",
    slug: "door-frosted-gold-handle-khobar",
    title: "نافذة زجاج فروست بمقبض ذهبي",
    city: "الخبر",
    description:
      "باب زجاج فروست بمقبض ذهبي فاخر، يجمع بين الخصوصية والفخامة ويناسب مداخل المكاتب والغرف الخاصة.",
    category: "door",
  },
  {
    file: "IMG-20260711-WA0091.jpeg",
    slug: "door-mirror-sliding-qatif",
    title: "أبواب منزلقة بمرايا",
    city: "القطيف",
    description:
      "أبواب خزائن منزلقة بمرايا كاملة الطول، توفر تخزينًا عمليًا وتوسع المساحة بصريًا داخل الغرفة.",
    category: "door",
  },
  {
    file: "٢٠٢٦٠٣٠٩_٠٧٠٦٢٣.jpg",
    slug: "door-etched-waves-dammam",
    title: "قاطع زجاج منقوش بأمواج مع نافذة معشقة",
    city: "الدمام",
    description:
      "قاطع زجاجي بنقش أمواج متدرجة ونافذة معشقة، عمل مخصص يضفي لمسة فنية على المدخل الداخلي.",
    category: "door",
  },
  {
    file: "٢٠٢٦٠٣٠٩_٠٨١١٣٠.jpg",
    slug: "door-etched-soft-waves-khobar",
    title: "قاطع زجاج منقوش بأمواج ناعمة",
    city: "الخبر",
    description:
      "قاطع زجاج سيكوريت بنقش أمواج هادئة، يوفر خصوصية مع تمرير الإضاءة الطبيعية بين المساحات.",
    category: "door",
  },
  {
    file: "٢٠٢٦٠٤١٣_٢٢٢٨٤٥.jpg",
    slug: "door-decorative-luxury-dhahran",
    title: "زجاج ديكوري منقوش بتصميم فاخر",
    city: "الظهران",
    description:
      "باب زجاجي ديكوري بنقش فاخر مخصص حسب الطلب، قطعة مركزية تمنح المدخل هوية بصرية مميزة.",
    category: "door",
  },

  // ── مرايا ──
  {
    file: "مرايات-مداخل-مستديرة.jpg",
    slug: "mirror-round-entry-dammam",
    title: "مرآة مستديرة لمدخل حديث",
    city: "الدمام",
    description:
      "مرآة مستديرة بتصميم بسيط لمدخل عصري، تعكس الإضاءة وتضيف عمقًا بصريًا للممر.",
    category: "mirror",
  },
  {
    file: "62dea600-5e49-4db7-8840-948915717483-890x1000-0bsljek8EZyhHVD43GICpCOrL0GFivr6p3H0Ca56.jpg",
    slug: "mirror-round-black-frame-khobar",
    title: "مرآة مستديرة بإطار أسود لمدخل",
    city: "الخبر",
    description:
      "مرآة مستديرة بإطار أسود معدني، قطعة كلاسيكية أنيقة تناسب المداخل ذات الطابع الحديث.",
    category: "mirror",
  },
  {
    file: "6d59ee65-6542-4f36-a1c3-598034830654-915.14598540146x1000-urNmgtc8SsthNKtZjAlQ8kpG4ZZxB6DjpvqfstY4.jpg",
    slug: "mirror-diamond-wall-qatif",
    title: "مرآة حائط بنقش الماس",
    city: "القطيف",
    description:
      "مرآة حائط بتصميم ألماسي مقطع بدقة، لمسة فاخرة تعزز جماليات صالات الاستقبال والممرات.",
    category: "mirror",
  },
  {
    file: "HkxvtS4fayCYlIxQkrOdGRWVc8IqUFSVVvqA5tzh.jpg",
    slug: "mirror-full-length-led-dammam",
    title: "مرآة كاملة الطول بإضاءة خلفية",
    city: "الدمام",
    description:
      "مرآة كاملة الطول بإضاءة LED خلفية، تصميم عملي وفخم يناسب غرف الملابس والحمامات.",
    category: "mirror",
  },
  {
    file: "f5ec0597-5d2a-46b1-ac32-a6e635c2646b-1000x1000-udqxVpDZhUsnbw89uy2DhmJyhPLAU53opHPjovrj.jpg",
    slug: "mirror-luxury-entry-dhahran",
    title: "مرآة كاملة الطول لمدخل فاخر",
    city: "الظهران",
    description:
      "مرآة كبيرة كاملة الطول لمدخل فيلا فاخرة، تعكس جماليات الديكور وتضاعف الإحساس بالاتساع.",
    category: "mirror",
  },

  // ── مكاتب زجاجية (طاولات / أثاث زجاج) ──
  {
    file: "168162056-168162056-HC25062025_02-2100 (1).jpg",
    slug: "office-coffee-table-wood-base-dammam",
    title: "طاولة قهوة زجاج بقاعدة خشبية",
    city: "الدمام",
    description:
      "طاولة قهوة بسطح زجاج سيكوريت وقاعدة خشبية، قطعة أنيقة تناسب صالات الاستقبال وغرف المكاتب.",
    category: "office",
  },
  {
    file: "207cbc8f-a9cb-416d-a7d3-04286ebc10a5-1000x1000-dp10NVXXZLqtjXIVlDIf4JTaVNHdZ0iURMGCm4ou.jpg",
    slug: "office-round-travertine-khobar",
    title: "طاولة زجاج دائرية بقاعدة ترافرتين",
    city: "الخبر",
    description:
      "طاولة زجاج دائرية بقاعدة ترافرتين طبيعي، تصميم فاخر يجمع بين نعومة الزجاج ودفء الحجر.",
    category: "office",
  },
  {
    file: "34177cd1-2f2b-4ad0-981b-4b406078c8e9-1000x1000-SbBJWPXT0DZBj2jqUNRSxVaQlew6oPdnLW2BPLgG.jpg",
    slug: "office-tables-gold-base-dhahran",
    title: "طقم طاولات زجاج بقواعد ذهبية",
    city: "الظهران",
    description:
      "طقم طاولات جانبية بأسطح زجاجية وقواعد ذهبية، إضافة راقية لغرف الاستقبال والمكاتب التنفيذية.",
    category: "office",
  },
  {
    file: "FJqkO4q9VQCdz05vsxDabcimbjTxDryf6CeZmeTO.jpg",
    slug: "office-round-stone-base-qatif",
    title: "طاولة زجاج دائرية بقواعد حجرية",
    city: "القطيف",
    description:
      "طاولة اجتماعات دائرية بسطح زجاج سيكوريت وقواعد حجرية، تصميم قوي وأنيق لبيئات العمل الفاخرة.",
    category: "office",
  },
  {
    file: "nHEgKdAh4Unul98ExJdNhtOTXQX76WArvXlvPgcY.jpg",
    slug: "office-rect-travertine-dammam",
    title: "طاولة زجاج مستطيلة بقاعدة ترافرتين",
    city: "الدمام",
    description:
      "طاولة طعام / اجتماعات مستطيلة بسطح زجاج وقاعدة ترافرتين نحتية، قطعة مركزية تليق بالمساحات الفاخرة.",
    category: "office",
  },
  {
    file: "٢٠٢٦٠٢١٧_١٥١٣١٢.jpg",
    slug: "office-dining-view-khobar",
    title: "طاولة طعام زجاج بإطلالة داخلية",
    city: "الخبر",
    description:
      "طاولة طعام بسطح زجاج سيكوريت مثبتة داخل مساحة مفتوحة، تصميم يوازن بين الشفافية وقوة الحضور.",
    category: "office",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = CATALOG.filter((c) => urlByName[c.file]).map((c) => ({
  slug: c.slug,
  url: urlByName[c.file],
  title: c.title,
  city: c.city,
  description: c.description,
  category: c.category,
}));

export function getGalleryItem(slug: string): GalleryItem | undefined {
  return GALLERY_ITEMS.find((i) => i.slug === slug);
}

// Back-compat
export const GALLERY_IMAGES: string[] = GALLERY_ITEMS.map((i) => i.url);
