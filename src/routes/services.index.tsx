import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { BASE_URL, SERVICES_META } from "@/lib/site-data";

const TITLE = "خدماتنا | الرواد للزجاج السيكوريت";
const DESC = "تصفح جميع خدمات الرواد: واجهات زجاج سيكوريت، أبواب، شاور، درابزين، مرايا، قواطع مكاتب وصيانة الزجاج في الدمام والخبر والمنطقة الشرقية.";

export const Route = createFileRoute("/services/")({
  component: ServicesIndex,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BASE_URL}/services` },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/services` }],
  }),
});

function ServicesIndex() {
  return (
    <>
      <PageHero
        eyebrow="خدماتنا"
        title="حلول زجاجية متكاملة"
        goldTitle="لكل مساحة"
        desc="من الفلل الفاخرة إلى المكاتب والمحلات، ننفذ كل ما يتعلق بالزجاج السيكوريت بأعلى معايير الجودة."
      />
      <Breadcrumbs items={[{ label: "الخدمات", to: "/services" }]} />
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES_META.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group relative block overflow-hidden rounded-3xl bg-card border border-border transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--gold)]"
                style={{ boxShadow: "var(--shadow-luxury)" }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={s.hero} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold">{s.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.short}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--gold)]">
                    اقرأ المزيد
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
