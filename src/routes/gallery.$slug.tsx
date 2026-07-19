import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MapPin } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { QuoteForm } from "@/components/site/QuoteForm";
import { BASE_URL } from "@/lib/site-data";
import {
  CATEGORY_META,
  GALLERY_ITEMS,
  getGalleryItem,
} from "@/lib/gallery-images";

export const Route = createFileRoute("/gallery/$slug")({
  loader: ({ params }) => {
    const item = getGalleryItem(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "المشروع غير موجود | الرواد للزجاج السيكوريت" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { item } = loaderData;
    const title = `${item.title} — ${item.city} | الرواد للزجاج`;
    const desc = item.description;
    const url = `${BASE_URL}/gallery/${item.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: item.url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: item.url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectPage,
});

function ProjectNotFound() {
  return (
    <>
      <PageHero eyebrow="معرض الأعمال" title="المشروع" goldTitle="غير موجود" desc="ربما تم نقل الصفحة أو تغيير رابطها." />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 text-center">
        <Link to="/gallery" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-[#111]" style={{ background: "var(--gradient-gold)" }}>
          <ArrowLeft className="h-4 w-4" /> العودة لمعرض الأعمال
        </Link>
      </div>
    </>
  );
}

function ProjectPage() {
  const { item } = Route.useLoaderData();
  const related = GALLERY_ITEMS.filter((i) => i.category === item.category && i.slug !== item.slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={CATEGORY_META[item.category].label} title={item.title} desc={`${item.city} — المنطقة الشرقية`} />
      <Breadcrumbs
        items={[
          { label: "معرض الأعمال", to: "/gallery" },
          { label: item.title, to: "/gallery/$slug", params: { slug: item.slug } },
        ]}
      />

      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl overflow-hidden bg-card" style={{ boxShadow: "var(--shadow-luxury)" }}>
            <img
              src={item.url}
              alt={`${item.title} — ${CATEGORY_META[item.category].label} في ${item.city}`}
              className="w-full h-auto object-cover"
              loading="eager"
              decoding="async"
            />
          </div>
          <div className="space-y-6 text-right">
            <div className="inline-flex items-center gap-1.5 rounded-full glass-dark px-3 py-1 text-[11px] font-semibold text-[color:var(--gold)]">
              <MapPin className="h-3 w-3" /> {item.city}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              تفاصيل المشروع
            </h2>
            <p className="text-white/75 leading-relaxed">{item.description}</p>
            <ul className="grid gap-2 text-sm text-white/75">
              <li>• التصنيف: {CATEGORY_META[item.category].label}</li>
              <li>• المدينة: {item.city}</li>
              <li>• التنفيذ: زجاج سيكوريت مع تركيبات وإكسسوارات مطابقة للتصميم</li>
            </ul>
            <div className="pt-2">
              <QuoteForm defaultService={CATEGORY_META[item.category].label} compact />
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mx-auto max-w-6xl mt-16">
            <div className="mb-6 flex items-center justify-between">
              <Link to="/gallery" className="text-sm text-[color:var(--gold)] hover:opacity-80 inline-flex items-center gap-1.5">
                كل المشاريع <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
              <h3 className="text-xl sm:text-2xl font-bold text-white">مشاريع مشابهة</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/gallery/$slug"
                  params={{ slug: r.slug }}
                  className="group block overflow-hidden rounded-2xl bg-card text-right"
                  style={{ boxShadow: "var(--shadow-luxury)" }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={r.url}
                      alt={`${r.title} — ${CATEGORY_META[r.category].label} في ${r.city}`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] text-[color:var(--gold)] font-semibold">{r.city}</p>
                    <h4 className="mt-1 text-sm font-bold text-white line-clamp-2">{r.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
