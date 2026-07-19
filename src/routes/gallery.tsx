import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState, type ComponentType } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  X,
  Droplets,
  Layers,
  SquareStack,
  Building2,
  DoorOpen,
  Armchair,
  Sparkles,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { BASE_URL } from "@/lib/site-data";
import { GALLERY_ITEMS, CATEGORY_META, type GalleryCategory } from "@/lib/gallery-images";

const TITLE = "معرض الأعمال | الرواد للزجاج السيكوريت";
const DESC = "استعرض مشاريعنا المنجزة من واجهات، أبواب، شاور، درابزين ومرايا زجاج سيكوريت في الدمام والخبر والمنطقة الشرقية.";

const CATEGORY_ICON: Record<GalleryCategory, ComponentType<{ className?: string }>> = {
  shower: Droplets,
  railing: Layers,
  mirror: SquareStack,
  facade: Building2,
  partition: DoorOpen,
  table: Armchair,
  etched: Sparkles,
};

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
  const [lightbox, setLightbox] = useState<number | null>(null);
  const shown = GALLERY_ITEMS;

  // Group by category preserving the order defined in gallery-images.ts
  const groups = useMemo(() => {
    const map = new Map<GalleryCategory, typeof shown>();
    for (const item of shown) {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    }
    return Array.from(map.entries());
  }, [shown]);

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
      <PageHero eyebrow="معرض الأعمال" title="مشاريع تنفيذ" goldTitle="نفخر بها" desc="مجموعة مختارة من أعمالنا في المنطقة الشرقية — مصنفة حسب نوع العمل. اضغط الصورة للتكبير." />
      <Breadcrumbs items={[{ label: "معرض الأعمال", to: "/gallery" }]} />

      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl space-y-20">
          {groups.map(([category, items]) => {
            const Icon = CATEGORY_ICON[category];
            return (
              <div key={category}>
                <div className="mb-8 flex items-center justify-end gap-3">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-right" style={{ background: "var(--gradient-gold)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      {CATEGORY_META[category].label}
                    </h2>
                    <p className="text-sm text-muted-foreground text-right mt-1">{items.length} مشروع</p>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-full" style={{ background: "var(--gradient-gold)" }}>
                    <Icon className="h-6 w-6 text-[#111]" />
                  </div>
                </div>

                <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
                  {items.map((item) => {
                    const globalIndex = shown.indexOf(item);
                    return (
                      <motion.button
                        key={item.url}
                        type="button"
                        onClick={() => setLightbox(globalIndex)}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, delay: (globalIndex % 6) * 0.04 }}
                        className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-card text-right"
                        style={{ boxShadow: "var(--shadow-luxury)" }}
                        aria-label={item.title}
                      >
                        <img
                          src={item.url}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${globalIndex % 3 === 0 ? "aspect-[4/5]" : globalIndex % 3 === 1 ? "aspect-square" : "aspect-[4/3]"}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute top-4 left-4 grid h-10 w-10 place-items-center rounded-full opacity-0 -translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0" style={{ background: "var(--gradient-gold)" }}>
                          <ArrowUpLeft className="h-4 w-4 text-[#111]" />
                        </div>
                        <div className="absolute bottom-0 right-0 left-0 p-4 flex items-end justify-between gap-3">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur px-2.5 py-1 text-[11px] text-white/90 border border-white/10">
                            <Icon className="h-3 w-3" />
                            {CATEGORY_META[category].label}
                          </span>
                          <h3 className="text-white text-sm sm:text-base font-semibold leading-tight drop-shadow">
                            {item.title}
                          </h3>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {lightbox !== null && (
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
                <img src={shown[lightbox].url} alt={shown[lightbox].title} className="mx-auto max-h-[82vh] w-auto rounded-2xl object-contain" />
                <div className="mt-4 text-center">
                  <p className="text-white/90 text-sm sm:text-base font-medium">{shown[lightbox].title}</p>
                  <p className="text-white/60 text-xs mt-1">{CATEGORY_META[shown[lightbox].category].label}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
