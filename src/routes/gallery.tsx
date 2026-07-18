import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpLeft, MapPin, X } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { BASE_URL, GALLERY, GALLERY_CATS } from "@/lib/site-data";

const TITLE = "معرض الأعمال | الرواد للزجاج السيكوريت";
const DESC = "استعرض أكثر من 30 مشروعًا منجزًا من واجهات، أبواب، شاور، درابزين ومرايا زجاج سيكوريت في الدمام والخبر والمنطقة الشرقية.";

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
  const [filter, setFilter] = useState("الكل");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const shown = filter === "الكل" ? GALLERY : GALLERY.filter((p) => p.cat === filter);

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
      <PageHero eyebrow="معرض الأعمال" title="مشاريع تنفيذ" goldTitle="نفخر بها" desc="أكثر من 30 مشروعًا مختارًا من أعمالنا في المنطقة الشرقية — اضغط الصورة للتكبير." />
      <Breadcrumbs items={[{ label: "معرض الأعمال", to: "/gallery" }]} />

      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-2">
            {GALLERY_CATS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${filter === f ? "text-[#111] shadow-lg" : "bg-secondary text-foreground hover:bg-accent/40"}`}
                style={filter === f ? { background: "var(--gradient-gold)" } : {}}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
            {shown.map((p, i) => (
              <motion.button
                key={`${p.title}-${i}`}
                type="button"
                onClick={() => setLightbox(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.04 }}
                className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-card text-right"
                style={{ boxShadow: "var(--shadow-luxury)" }}
              >
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-[color:var(--gold)]">{p.cat}</div>
                  <div className="mt-1 text-lg font-bold text-white">{p.title}</div>
                  <div className="mt-1 inline-flex items-center gap-1 text-xs text-white/70">
                    <MapPin className="h-3 w-3" /> {p.city}
                  </div>
                </div>
                <div className="absolute top-4 left-4 grid h-10 w-10 place-items-center rounded-full opacity-0 -translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0" style={{ background: "var(--gradient-gold)" }}>
                  <ArrowUpLeft className="h-4 w-4 text-[#111]" />
                </div>
              </motion.button>
            ))}
          </div>
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
                <img src={shown[lightbox].img} alt={shown[lightbox].title} className="mx-auto max-h-[88vh] w-auto rounded-2xl object-contain" />
                <div className="mt-3 text-center text-white">
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-[color:var(--gold)]">{shown[lightbox].cat}</div>
                  <div className="mt-1 font-bold">{shown[lightbox].title}</div>
                  <div className="mt-1 text-xs text-white/60">{shown[lightbox].city}</div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
