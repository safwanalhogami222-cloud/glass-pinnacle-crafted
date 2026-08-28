import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, ChevronDown, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { PageHero } from "@/components/site/PageHero";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { QuoteForm } from "@/components/site/QuoteForm";
import { BASE_URL, BRAND, EMAIL, HOURS, PHONE, PHONE_DISPLAY, SERVICE_AREAS, SERVICES_META, WHATSAPP } from "@/lib/site-data";
import { GALLERY_ITEMS } from "@/lib/gallery-images";
import heroImg from "@/assets/project-railing.jpg";

const TITLE = "تركيب درابزين زجاج بالدمام | الرواد للزجاج السيكوريت";
const DESC =
  "تركيب درابزين زجاج بالدمام بتصاميم عصرية وجودة مناسبة للمنازل والفلل والمكاتب، مع تفصيل وتركيب درابزين زجاج سيكوريت حسب الموقع.";
const URL = `${BASE_URL}/glass-railings-dammam`;

const DESIGNS = [
  { t: "درابزين زجاج مع الاستانلس ستيل", d: "قوائم ومقابض من الستانلس ستيل مع ألواح زجاج سيكوريت، مناسب للسلالم الداخلية والخارجية." },
  { t: "درابزين زجاج بإكسسوارات معدنية", d: "تثبيت بقواعد سبايدر أو كلبسات معدنية بتشطيب كروم أو أسود أو ذهبي حسب ديكور المكان." },
  { t: "درابزين زجاج مودرن بدون قوائم", d: "تثبيت الزجاج داخل قاعدة أرضية (يو تشانل) للحصول على مظهر زجاجي متصل بأقل عناصر ظاهرة." },
  { t: "درابزين زجاج مع مقبض خشبي", d: "دمج الزجاج مع هاندريل خشبي يمنح إحساسًا دافئًا في الفلل والمداخل السكنية." },
];

const SCOPE = [
  "تفصيل درابزين زجاج للدرج الداخلي والخارجي حسب المقاس",
  "درابزين زجاج للشرفات والبلكونات والأسطح",
  "درابزين زجاج للمداخل والمناور والفراغات المفتوحة",
  "درابزين زجاج سيكوريت للمكاتب والمواقع التجارية",
  "استبدال ألواح الزجاج التالفة وصيانة الإكسسوارات",
];

const WHY = [
  { t: "مظهر عصري", d: "درابزين زجاج مودرن ينسجم مع التصاميم الحديثة دون أن يثقل شكل المكان." },
  { t: "وضوح المساحة", d: "الزجاج الشفاف يحافظ على الرؤية والإضاءة الطبيعية ويجعل المساحات تبدو أوسع." },
  { t: "سهولة التنظيف", d: "سطح الزجاج الأملس يحتاج مسحًا بسيطًا، بخلاف الدرابزين المعدني المزخرف." },
  { t: "مرونة في التصميم", d: "إمكانية اختيار الزجاج الشفاف أو المصنفر أو الملوّن والإكسسوارات المناسبة." },
];

const FAQ = [
  {
    q: "كم سعر تركيب درابزين زجاج بالدمام؟",
    a: "يُحسب سعر تركيب درابزين زجاج بالدمام بالمتر الطولي، ويتغير حسب سماكة الزجاج، وطريقة التثبيت (قوائم ستانلس، كلبسات، قاعدة أرضية)، ونوع المقبض والإكسسوارات، وطبيعة الموقع. نقدم معاينة وعرض سعر مكتوب بعد أخذ المقاسات على الطبيعة حتى يكون السعر دقيقًا وواضحًا.",
  },
  {
    q: "هل يمكن تفصيل درابزين زجاج حسب مقاس الدرج؟",
    a: "نعم، تفصيل درابزين زجاج يتم دائمًا حسب مقاس الدرج وزاوية الميل وارتفاع القوائم المطلوب. نرفع المقاسات في الموقع ثم يُقص الزجاج ويُقسّى ويُثقب في الورشة قبل التركيب، لأن الزجاج السيكوريت لا يمكن تعديله بعد التقسية.",
  },
  {
    q: "هل يتوفر درابزين زجاج مودرن؟",
    a: "نعم، تتوفر تصاميم درابزين زجاج مودرن بمظهر بسيط: زجاج بقاعدة أرضية بدون قوائم ظاهرة، أو إكسسوارات معدنية نحيفة بتشطيب أسود أو كروم أو ذهبي مطفي، مع إمكانية إضافة مقبض علوي أو الاستغناء عنه حسب التصميم.",
  },
  {
    q: "هل يتم تركيب درابزين زجاج للشرفات؟",
    a: "نعم، درابزين زجاج للشرفات من أكثر الأعمال التي ننفذها. نستخدم زجاجًا سيكوريت بسماكة مناسبة للموقع المكشوف وتثبيتًا مقاومًا للصدأ، مع مراعاة ارتفاع الحماية المطلوب وأحمال الرياح في الأدوار المرتفعة.",
  },
  {
    q: "ما الفرق بين أنواع تثبيت الدرابزين الزجاجي؟",
    a: "التثبيت بالقوائم يعتمد على أعمدة ستانلس ستيل تحمل الزجاج وهو الأنسب للسلالم الطويلة، والتثبيت بالكلبسات يستخدم قواعد معدنية صغيرة تمنح مظهرًا أنعم، أما القاعدة الأرضية (يو تشانل) فتخفي عناصر التثبيت بالكامل وتحتاج أرضية قادرة على تحمل الحمل. نرشّح الطريقة المناسبة بعد رؤية الموقع.",
  },
];

const RAILING_PROJECTS = GALLERY_ITEMS.filter((g) => g.category === "railing").slice(0, 6);

export const Route = createFileRoute("/glass-railings-dammam")({
  component: RailingsPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { property: "og:site_name", content: BRAND },
      { property: "og:locale", content: "ar_SA" },
      { property: "og:image", content: `${BASE_URL}${heroImg}` },
      { property: "og:image:alt", content: "درابزين زجاج سيكوريت لدرج داخلي منفذ في الدمام" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: `${BASE_URL}${heroImg}` },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "تركيب درابزين زجاج",
          name: "تركيب درابزين زجاج بالدمام",
          description: DESC,
          url: URL,
          provider: {
            "@type": "LocalBusiness",
            name: BRAND,
            telephone: PHONE,
            email: EMAIL,
            url: BASE_URL,
            image: `${BASE_URL}${heroImg}`,
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              addressLocality: "الدمام",
              addressRegion: "المنطقة الشرقية",
              addressCountry: "SA",
            },
          },
          areaServed: SERVICE_AREAS.map((c) => ({ "@type": "City", name: c })),
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "تصاميم درابزين الزجاج",
            itemListElement: DESIGNS.map((d) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: d.t, description: d.d },
            })),
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "الرئيسية", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "خدمات الزجاج", item: `${BASE_URL}/services` },
            { "@type": "ListItem", position: 3, name: "تركيب درابزين زجاج بالدمام", item: URL },
          ],
        }),
      },
    ],
  }),
});

function RailingsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <PageHero
        eyebrow="درابزين زجاج — الدمام والمنطقة الشرقية"
        title="تركيب درابزين زجاج"
        goldTitle="بالدمام"
        desc="نقدم تفصيل وتركيب درابزين زجاج سيكوريت للدرج والشرفات والمداخل والمواقع التجارية حسب المقاسات وطبيعة المكان."
        image={heroImg}
        imageAlt="درابزين زجاج سيكوريت لدرج داخلي بتصميم مودرن في الدمام"
      />
      <Breadcrumbs items={[{ label: "خدمات الزجاج", to: "/services" }, { label: "تركيب درابزين زجاج بالدمام" }]} />

      <section className="pt-8 px-4 sm:px-6">
        <div className="mx-auto w-full max-w-7xl flex flex-wrap gap-3">
          <a href="#quote" className="inline-flex items-center gap-2 rounded-full btn-gold px-6 py-3 text-sm">
            احصل على عرض سعر
          </a>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("مرحبًا، أرغب في عرض سعر لتركيب درابزين زجاج بالدمام")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-white"
            style={{ background: "#25D366" }}
          >
            <WhatsAppIcon size={16} /> تواصل عبر واتساب
          </a>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="mx-auto w-full max-w-7xl grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
          <div className="min-w-0">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="section-title">
                <span className="text-gold-gradient">درابزين زجاج سيكوريت</span> للدرج
              </h2>
              <div className="mt-4 space-y-4 text-muted-foreground leading-loose">
                <p>
                  يُستخدم درابزين زجاج للدرج في السلالم الداخلية للمنازل والفلل، وكذلك في السلالم الخارجية والمداخل. الزجاج المقسّى (السيكوريت) يتحمل
                  الاستخدام اليومي والاستناد، وفي الوقت نفسه لا يحجب الرؤية، فيبقى الدرج والمساحة المحيطة به واضحين ومضاءين بشكل طبيعي بدل الحواجز
                  المعدنية أو الجبسية المغلقة.
                </p>
                <p>
                  عند تنفيذ الدرج نأخذ في الحسبان زاوية ميل السلم وارتفاع الحماية المطلوب ونوع الأرضية (رخام، سيراميك، خرسانة) لأن ذلك يحدد طريقة
                  التثبيت المناسبة. ويتم تجهيز ألواح الزجاج كاملة في الورشة قبل نقلها إلى الموقع، لأن الزجاج السيكوريت لا يقبل القص أو الثقب بعد
                  التقسية.
                </p>
              </div>

              <h2 className="mt-12 section-title">
                درابزين زجاج <span className="text-gold-gradient">للشرفات والمداخل</span>
              </h2>
              <div className="mt-4 space-y-4 text-muted-foreground leading-loose">
                <p>
                  درابزين زجاج للشرفات خيار عملي في المنازل والفلل والمباني التجارية، إذ يوفّر حاجزًا آمنًا مع الإبقاء على الإطلالة كما هي. ونفّذه كذلك
                  في المداخل والمناور والفراغات المفتوحة بين الأدوار، وفي شرفات المطاعم والمكاتب حيث يُفضّل حاجز واضح لا يغلق المشهد.
                </p>
                <p>
                  في المواقع المكشوفة نختار سماكة زجاج مناسبة وإكسسوارات مقاومة للصدأ لتتحمل الرطوبة والحرارة في المنطقة الشرقية، مع مراعاة أحمال
                  الرياح في الأدوار المرتفعة.
                </p>
              </div>

              <h2 className="mt-12 section-title">
                تفصيل درابزين زجاج <span className="text-gold-gradient">حسب الموقع</span>
              </h2>
              <div className="mt-4 space-y-4 text-muted-foreground leading-loose">
                <p>
                  تفصيل درابزين زجاج يبدأ من زيارة الموقع ورفع المقاسات، ثم تحديد طريقة التثبيت المناسبة للتصميم المطلوب وطبيعة الأرضية. بعد ذلك
                  نتفق على الإكسسوارات والتشطيبات: لون القوائم أو الكلبسات، وجود مقبض علوي من عدمه، ونوع الزجاج (شفاف، مصنفر، أو بلون خفيف).
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {SCOPE.map((s) => (
                    <div key={s} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[color:var(--gold)]" aria-hidden="true" />
                      <span className="text-sm leading-relaxed">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <h2 className="mt-12 section-title">
                أنواع وتصاميم <span className="text-gold-gradient">درابزين الزجاج</span>
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {DESIGNS.map((d) => (
                  <div key={d.t} className="rounded-2xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-luxury)" }}>
                    <h3 className="font-bold">{d.t}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{d.d}</p>
                  </div>
                ))}
              </div>

              <h2 className="mt-12 section-title">
                لماذا تختار <span className="text-gold-gradient">درابزين الزجاج؟</span>
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {WHY.map((w) => (
                  <div key={w.t} className="rounded-2xl border border-border bg-card p-5">
                    <h3 className="font-bold">{w.t}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{w.d}</p>
                  </div>
                ))}
              </div>

              <h2 className="mt-12 section-title">
                تركيب درابزين زجاج بالدمام <span className="text-gold-gradient">والخبر والقطيف</span>
              </h2>
              <div className="mt-4 space-y-4 text-muted-foreground leading-loose">
                <p>
                  ننفّذ أعمال درابزين زجاج بالدمام، وكذلك في الخبر والقطيف والظهران والجبيل، بنفس طريقة العمل: معاينة، رفع مقاسات، تصنيع في الورشة، ثم
                  تركيب في الموقع.
                </p>
                <p>
                  وإلى جانب الدرابزين، ننفّذ بقية أعمال الزجاج التي تكمل المشروع غالبًا مثل{" "}
                  <Link to="/glass-installation-dammam" className="text-[color:var(--gold)] underline-offset-4 hover:underline">
                    تركيب زجاج سيكوريت بالدمام
                  </Link>{" "}
                  و
                  <Link to="/glass-facades-dammam" className="text-[color:var(--gold)] underline-offset-4 hover:underline">
                    واجهات زجاج بالدمام
                  </Link>
                  ، مع أبواب الزجاج وكبائن الشاور والمرايا حسب حاجة الموقع.
                </p>
              </div>

              <div className="mt-14">
                <h2 className="section-title">الأسئلة الشائعة</h2>
                <div className="mt-6 space-y-3">
                  {FAQ.map((f, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <div key={f.q} className="rounded-2xl border border-border bg-card overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          className="flex w-full items-center justify-between gap-4 p-5 text-right"
                          aria-expanded={isOpen}
                        >
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

          <div id="quote" className="min-w-0 lg:sticky lg:top-28 scroll-mt-28">
            <QuoteForm defaultService="تركيب درابزين زجاج بالدمام" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2 rounded-full btn-gold px-5 py-3 text-sm" dir="ltr">
                <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("مرحبًا، أرغب في عرض سعر لتركيب درابزين زجاج بالدمام")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm text-white"
                style={{ background: "#25D366" }}
              >
                <WhatsAppIcon size={16} /> واتساب
              </a>
            </div>
            <div className="mt-4 rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
              <div className="font-bold text-foreground">أوقات العمل</div>
              {HOURS.map((h) => (
                <div key={h.day} className="mt-2 flex items-center justify-between gap-3">
                  <span>{h.day}</span>
                  <span dir="ltr">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {RAILING_PROJECTS.length > 0 && (
        <section className="border-t border-border py-16 px-4 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <h2 className="section-title">
              أعمال <span className="text-gold-gradient">درابزين زجاج</span> من تنفيذنا
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {RAILING_PROJECTS.map((p) => (
                <Link
                  key={p.slug}
                  to="/gallery/$slug"
                  params={{ slug: p.slug }}
                  className="group overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--gold)]"
                  style={{ boxShadow: "var(--shadow-luxury)" }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={p.url}
                      alt={`${p.title} — ${p.description} في ${p.city}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold">{p.title}</h3>
                    <div className="mt-1 text-xs text-muted-foreground">{p.city}</div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{p.description}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/gallery" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--gold)]">
                تصفح كامل معرض الأعمال <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-border bg-secondary/40 py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="section-title">
            اطلب <span className="text-gold-gradient">عرض سعر</span> لدرابزين الزجاج
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground leading-relaxed">
            معاينة ورفع مقاسات داخل الدمام والخبر والقطيف، وعرض سعر مكتوب حسب الموقع والتصميم المطلوب.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full btn-gold px-6 py-3 text-sm" dir="ltr">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("مرحبًا، أرغب في عرض سعر لتركيب درابزين زجاج")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-white"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={16} /> تواصل عبر واتساب
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-14 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-sm font-semibold text-muted-foreground mb-4">خدمات أخرى قد تهمك</div>
          <div className="flex flex-wrap gap-3">
            {SERVICES_META.map((s) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-[color:var(--gold)] hover:text-[color:var(--gold)] transition"
              >
                {s.title} <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            ))}
            <Link
              to="/glass-installation-dammam"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-[color:var(--gold)] hover:text-[color:var(--gold)] transition"
            >
              تركيب زجاج سيكوريت بالدمام <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              to="/glass-facades-dammam"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-[color:var(--gold)] hover:text-[color:var(--gold)] transition"
            >
              واجهات زجاج بالدمام <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
