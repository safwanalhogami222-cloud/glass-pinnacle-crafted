import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpLeft, X } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { BASE_URL } from "@/lib/site-data";
import { GALLERY_ITEMS, CATEGORY_LABELS, type GalleryCategory } from "@/lib/gallery-images";

const TITLE = "معرض الأعمال | الرواد للزجاج السيكوريت";
const DESC = "استعرض مشاريعنا المنجزة من واجهات، أبواب، شاور، درابزين ومرايا زجاج سيكوريت في الدمام والخبر والمنطقة الشرقية.";

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

type Filter = "all" | GalleryCategory;
const FILTERS: Filter[] = ["all", "facades", "doors", "showers", "railings", "mirrors"];

function GalleryPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const shown = useMemo(
    () => (filter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((x) => x.category === filter)),
    [filter],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? 0 : (i + 1) % shown.length));
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? 0 : (i - 1 + shown.length) % shown.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, shown.length]);

  return (
    <>
      <PageHero eyebrow="معرض الأعمال" title="مشاريع تنفيذ" goldTitle="نفخر بها" desc="مجموعة مختارة من أعمالنا في المنطقة الشرقية — اضغط الصورة للتكبير." />
      <Breadcrumbs items={[{ label: "معرض الأعمال", to: "/gallery" }]} />

      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${active ? "btn-gold shadow-lg" : "border border-white/15 bg-white/5 text-white/80 hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"}`}
                >
                  {CATEGORY_LABELS[f]}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {shown.map((item, i) => (
              <motion.button
                key={item.url}
                type="button"
                onClick={() => setLightbox(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 6) * 0.04 }}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-card text-right"
                style={{ boxShadow: "var(--shadow-luxury)" }}
                aria-label={`عرض الصورة ${i + 1}`}
              >
                <img
                  src={item.url}
                  alt={`${CATEGORY_LABELS[item.category]} — مشروع رقم ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />
                <div className="absolute bottom-4 right-4 text-right text-white">
                  <span className="inline-block rounded-full bg-black/50 backdrop-blur px-3 py-1 text-[11px] font-bold text-[color:var(--gold)]">
                    {CATEGORY_LABELS[item.category]}
                  </span>
                </div>
                <div className="absolute top-4 left-4 grid h-10 w-10 place-items-center rounded-full opacity-0 -translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0" style={{ background: "var(--gradient-gold)" }}>
                  <ArrowUpLeft className="h-4 w-4 text-[#111]" />
                </div>
              </motion.button>
            ))}
          </div>

          {shown.length === 0 && (
            <div className="mt-12 text-center text-white/60">لا توجد صور في هذا التصنيف بعد.</div>
          )}
        </div>

        <AnimatePresence>
          {lightbox !== null && shown[lightbox] && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
              onClick={() => setLightbox(null)}
            >
              <button onClick={(e) => { e.stopPropagation(); setLightbox(null); }} aria-label="إغلاق" className="absolute top-5 left-5 grid h-11 w-11 place-items-center rounded-full glass-dark text-white">
                <X className="h-5 w-5" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? 0 : (i + 1) % shown.length)); }} aria-label="السابق" className="absolute right-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full glass-dark text-white">
                <ArrowLeft className="h-5 w-5 rotate-180" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? 0 : (i - 1 + shown.length) % shown.length)); }} aria-label="التالي" className="absolute left-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full glass-dark text-white">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <motion.div key={lightbox} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.25 }} className="relative max-h-[88vh] max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                <img src={shown[lightbox].url} alt={`${CATEGORY_LABELS[shown[lightbox].category]} — مشروع رقم ${lightbox + 1}`} className="mx-auto max-h-[88vh] w-auto rounded-2xl object-contain" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
