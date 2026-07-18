import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, ChevronDown, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { QuoteForm } from "@/components/site/QuoteForm";
import { BASE_URL, PHONE, PHONE_DISPLAY, SERVICES_META, WHATSAPP } from "@/lib/site-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES_META.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return service;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "الخدمة غير موجودة" }, { name: "robots", content: "noindex" }] };
    }
    const url = `${BASE_URL}/services/${params.slug}`;
    return {
      meta: [
        { title: loaderData.seoTitle },
        { name: "description", content: loaderData.seoDesc },
        { property: "og:title", content: loaderData.seoTitle },
        { property: "og:description", content: loaderData.seoDesc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: `${BASE_URL}${loaderData.hero}` },
        { name: "twitter:title", content: loaderData.seoTitle },
        { name: "twitter:description", content: loaderData.seoDesc },
        { name: "twitter:image", content: `${BASE_URL}${loaderData.hero}` },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: loaderData.title,
            description: loaderData.seoDesc,
            provider: { "@type": "LocalBusiness", name: "الرواد للزجاج السيكوريت", telephone: PHONE },
            areaServed: ["الدمام", "الخبر", "الظهران", "القطيف", "الجبيل", "رأس تنورة"],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: loaderData.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: ServicePage,
  notFoundComponent: ServiceNotFound,
});

function ServiceNotFound() {
  return (
    <div className="min-h-dvh grid place-items-center text-center px-4 pt-32">
      <div>
        <h1 className="text-3xl font-black">الخدمة غير موجودة</h1>
        <Link to="/services" className="mt-6 inline-flex items-center gap-2 rounded-full btn-gold px-6 py-3 text-sm">
          عرض كل الخدمات
        </Link>
      </div>
    </div>
  );
}

function ServicePage() {
  const service = Route.useLoaderData();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <PageHero eyebrow="خدمة متخصصة" title={service.title} desc={service.intro} image={service.hero} />
      <Breadcrumbs
        items={[
          { label: "الخدمات", to: "/services" },
          { label: service.title },
        ]}
      />

      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-[1.2fr_1fr] items-start">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: "var(--shadow-luxury)" }}>
                <img src={service.hero} alt={service.title} className="aspect-[16/10] w-full object-cover" />
              </div>

              <h2 className="mt-10 section-title">مميزات <span className="text-gold-gradient">{service.title}</span></h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{service.intro}</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {service.features.map((f) => (
                  <div key={f} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[color:var(--gold)]" />
                    <span className="text-sm">{f}</span>
                  </div>
                ))}
              </div>

              {/* FAQ */}
              <div className="mt-14">
                <h2 className="section-title">الأسئلة الشائعة</h2>
                <div className="mt-6 space-y-3">
                  {service.faq.map((f, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <div key={f.q} className="rounded-2xl border border-border bg-card overflow-hidden">
                        <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-right" aria-expanded={isOpen}>
                          <span className="font-bold">{f.q}</span>
                          <ChevronDown className={`h-5 w-5 shrink-0 text-[color:var(--gold)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                              <p className="px-5 pb-5 text-sm text-muted-foreground leading-loose">{f.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:sticky lg:top-28">
            <QuoteForm defaultService={service.title} />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2 rounded-full btn-gold px-5 py-3 text-sm" dir="ltr">
                <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
              </a>
              <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`مرحبًا، أرغب في الاستفسار عن: ${service.title}`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm text-white" style={{ background: "#25D366" }}>
                <MessageCircle className="h-4 w-4" /> واتساب
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40 py-14 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-sm font-semibold text-muted-foreground mb-4">خدمات أخرى قد تهمك</div>
          <div className="flex flex-wrap gap-3">
            {SERVICES_META.filter((s) => s.slug !== service.slug).map((s) => (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-[color:var(--gold)] hover:text-[color:var(--gold)] transition">
                {s.title} <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
