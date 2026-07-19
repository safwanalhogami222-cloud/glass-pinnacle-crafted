import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpLeft, MapPin, X } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { BASE_URL } from "@/lib/site-data";
import {
  CATEGORY_META,
  CATEGORY_ORDER,
  GALLERY_ITEMS,
  type GalleryCategory,
} from "@/lib/gallery-images";

const TITLE = "معرض الأعمال | الرواد للزجاج السيكوريت";
const DESC =
  "استعرض مشاريعنا في الزجاج السيكوريت — واجهات، أبواب، شاور، درابزين، مكاتب زجاجية ومرايا في الدمام والخبر والقطيف والمنطقة الشرقية.";

type Filter = "all" | GalleryCategory;

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BASE_URL}/gallery` },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/gallery` }],
  }),
});

function GalleryPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const shown = useMemo(
    () => (filter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === filter)),
    [filter],
  );

  // Reset lightbox if filter changes
  useEffect(() => {
    setLightbox(null);
  }, [filter]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? 0 : (i + 1) % shown.length));
      if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? 0 : (i - 1 + shown.length) % shown.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, shown.length]);

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "جميع المشاريع", count: GALLERY_ITEMS.length },
    ...CATEGORY_ORDER.map((c) => ({
      key: c as Filter,
      label: CATEGORY_META[c].label,
      count: GALLERY_ITEMS.filter((i) => i.category === c).length,
    })),
  ];

  return (
    <>
      <PageHero
        eyebrow="معرض الأعمال"
        title="مشاريع تنفيذ"
        goldTitle="نفخر بها"
        desc="مجموعة مختارة من أعمالنا في المنطقة الشرقية — مصنفة حسب نوع العمل. اضغط أي صورة لعرضها بالحجم الكامل أو فتح صفحة المشروع."
      />
      <Breadcrumbs items={[{ label: "معرض الأعمال", to: "/gallery" }]} />

      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          {/* Filter bar */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {filters.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    active
                      ? "text-[#111] shadow-md scale-105"
                      : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                  style={active ? { background: "var(--gradient-gold)" } : undefined}
                  aria-pressed={active}
                >
                  <span>{f.label}</span>
                  <span
                    className={`inline-flex min-w-[22px] justify-center rounded-full px-1.5 text-[10px] font-bold ${
                      active ? "bg-black/15 text-[#111]" : "bg-white/10 text-white/70"
                    }`}
                  >
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Uniform 4:3 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {shown.map((item, idx) => (
                <motion.article
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, delay: (idx % 6) * 0.03 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-card text-right"
                  style={{ boxShadow: "var(--shadow-luxury)" }}
                >
                  {/* Image (uniform 4:3) — click to open lightbox */}
                  <button
                    type="button"
                    onClick={() => setLightbox(idx)}
                    className="relative block w-full overflow-hidden"
                    aria-label={`تكبير صورة: ${item.title}`}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-black/20">
                      <img
                        src={item.url}
                        alt={`${item.title} — ${CATEGORY_META[item.category].label} في ${item.city}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-90" />
                    <span
                      className="pointer-events-none absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur px-2.5 py-1 text-[11px] text-white/95 border border-white/10"
                    >
                      {CATEGORY_META[item.category].label}
                    </span>
                    <span
                      className="absolute top-3 left-3 grid h-9 w-9 place-items-center rounded-full opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                      style={{ background: "var(--gradient-gold)" }}
                    >
                      <ArrowUpLeft className="h-4 w-4 text-[#111]" />
                    </span>
                  </button>

                  {/* Meta */}
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[color:var(--gold)]">
                        <MapPin className="h-3 w-3" />
                        {item.city}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold leading-snug text-white line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-white/65 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    <Link
                      to="/gallery/$slug"
                      params={{ slug: item.slug }}
                      className="mt-3 inline-flex items-center justify-end gap-1.5 text-xs font-semibold text-[color:var(--gold)] hover:opacity-80 transition"
                    >
                      عرض تفاصيل المشروع
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {shown.length === 0 && (
            <p className="mt-12 text-center text-sm text-white/60">لا توجد مشاريع في هذا التصنيف حاليًا.</p>
          )}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && shown[lightbox] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
              onClick={() => setLightbox(null)}
              role="dialog"
              aria-modal="true"
              aria-label={shown[lightbox].title}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox(null);
                }}
                aria-label="إغلاق"
                className="absolute top-5 left-5 grid h-11 w-11 place-items-center rounded-full glass-dark text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((i) => (i === null ? 0 : (i + 1) % shown.length));
                }}
                aria-label="السابق"
                className="absolute right-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full glass-dark text-white"
              >
                <ArrowLeft className="h-5 w-5 rotate-180" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((i) => (i === null ? 0 : (i - 1 + shown.length) % shown.length));
                }}
                aria-label="التالي"
                className="absolute left-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full glass-dark text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <motion.div
                key={lightbox}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="relative max-h-[88vh] max-w-6xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={shown[lightbox].url}
                  alt={`${shown[lightbox].title} — ${CATEGORY_META[shown[lightbox].category].label} في ${shown[lightbox].city}`}
                  className="mx-auto max-h-[78vh] w-auto rounded-2xl object-contain"
                />
                <div className="mt-4 text-center">
                  <p className="text-white/95 text-sm sm:text-base font-semibold">
                    {shown[lightbox].title}
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    {CATEGORY_META[shown[lightbox].category].label} — {shown[lightbox].city}
                  </p>
                  <Link
                    to="/gallery/$slug"
                    params={{ slug: shown[lightbox].slug }}
                    onClick={() => setLightbox(null)}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-[#111]"
                    style={{ background: "var(--gradient-gold)" }}
                  >
                    فتح صفحة المشروع
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
