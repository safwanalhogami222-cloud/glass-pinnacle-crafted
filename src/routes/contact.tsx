import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { PageHero } from "@/components/site/PageHero";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { QuoteForm } from "@/components/site/QuoteForm";
import { BASE_URL, EMAIL, HOURS, PHONE, PHONE_DISPLAY, SERVICE_AREAS, WHATSAPP } from "@/lib/site-data";

const TITLE = "اتصل بنا | الرواد للزجاج السيكوريت — 0501910923";
const DESC = "تواصل مع الرواد للزجاج السيكوريت: هاتف 0501910923، واتساب، خريطة، ساعات العمل، ومناطق الخدمة في الدمام والخبر والظهران والقطيف والجبيل ورأس تنورة.";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BASE_URL}/contact` },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/contact` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "الرواد للزجاج السيكوريت",
          telephone: PHONE,
          email: EMAIL,
          address: { "@type": "PostalAddress", addressLocality: "الدمام", addressRegion: "المنطقة الشرقية", addressCountry: "SA" },
          areaServed: SERVICE_AREAS,
          openingHours: ["Sa-Th 08:00-22:00", "Fr 15:00-22:00"],
        }),
      },
    ],
  }),
});

function ContactPage() {
  return (
    <>
      <PageHero eyebrow="تواصل معنا" title="جاهزون لخدمتك" goldTitle="في أي وقت" desc="اتصل بنا مباشرة أو أرسل تفاصيل مشروعك عبر النموذج، وسنعاود التواصل خلال أقل من ساعة." />
      <Breadcrumbs items={[{ label: "اتصل بنا", to: "/contact" }]} />

      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-2 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="grid gap-3 sm:grid-cols-2">
              <a href={`tel:${PHONE}`} className="group rounded-2xl border border-border bg-card p-5 flex items-center gap-4 transition-all hover:-translate-y-0.5 hover:border-[color:var(--gold)]">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{ background: "var(--gradient-gold)" }}>
                  <Phone className="h-5 w-5 text-[#111]" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">اتصل الآن</div>
                  <div className="font-bold" dir="ltr">{PHONE_DISPLAY}</div>
                </div>
              </a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-border bg-card p-5 flex items-center gap-4 transition-all hover:-translate-y-0.5 hover:border-[color:var(--gold)]">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{ background: "#25D366" }}>
                  <WhatsAppIcon size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">واتساب</div>
                  <div className="font-bold">راسلنا مباشرة</div>
                </div>
              </a>
              <a href={`mailto:${EMAIL}`} className="group rounded-2xl border border-border bg-card p-5 flex items-center gap-4 transition-all hover:-translate-y-0.5 hover:border-[color:var(--gold)]">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{ background: "var(--gradient-gold)" }}>
                  <Mail className="h-5 w-5 text-[#111]" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">البريد الإلكتروني</div>
                  <div className="font-bold truncate" dir="ltr">{EMAIL}</div>
                </div>
              </a>
              <div className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{ background: "var(--gradient-gold)" }}>
                  <MapPin className="h-5 w-5 text-[#111]" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">مقر الشركة</div>
                  <div className="font-bold">الدمام — المنطقة الشرقية</div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 font-bold">
                <Clock className="h-4 w-4 text-[color:var(--gold)]" /> ساعات العمل
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {HOURS.map((h) => (
                  <li key={h.day} className="flex items-center justify-between border-b border-border/60 last:border-0 pb-2 last:pb-0">
                    <span className="text-muted-foreground">{h.day}</span>
                    <span className="font-semibold" dir="ltr">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 font-bold">
                <MapPin className="h-4 w-4 text-[color:var(--gold)]" /> مناطق الخدمة
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {SERVICE_AREAS.map((a) => (
                  <span key={a} className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <iframe
                src="https://www.google.com/maps?q=Dammam,Saudi+Arabia&output=embed"
                width="100%" height="320" loading="lazy" style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade" title="خريطة موقع الرواد للزجاج السيكوريت"
              />
            </div>
          </motion.div>

          <div className="lg:sticky lg:top-28">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
