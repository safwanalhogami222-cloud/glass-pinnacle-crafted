import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, ChevronDown, Phone, ShieldCheck, Clock, Award, Wrench, Ruler, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { PageHero } from "@/components/site/PageHero";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { QuoteForm } from "@/components/site/QuoteForm";
import { BASE_URL, BRAND, EMAIL, HOURS, PHONE, PHONE_DISPLAY, SERVICE_AREAS, SERVICES_META, WHATSAPP } from "@/lib/site-data";
import heroImg from "@/assets/project-storefront.jpg";

const TITLE = "تركيب زجاج سيكوريت بالدمام | تفصيل وتركيب زجاج | الرواد";
const DESC =
  "تفصيل وتركيب زجاج سيكوريت بالدمام: واجهات زجاج، أبواب، شاور، درابزين ومرايا بمقاسات خاصة. محل زجاج ومرايا بالدمام مع معاينة مجانية وضمان — اتصل 0501910923.";

const URL = `${BASE_URL}/glass-installation-dammam`;

const FEATURES = [
  { icon: Award, t: "خبرة تفوق 15 عامًا", d: "فريق متخصص في تركيب زجاج سيكوريت الدمام نفّذ مئات المشاريع السكنية والتجارية في المنطقة الشرقية." },
  { icon: Ruler, t: "تفصيل زجاج الدمام بالمقاس", d: "نأخذ المقاسات على الطبيعة وننفذ التفصيل في ورشتنا لضمان تطابق دقيق دون فراغات أو اهتزاز." },
  { icon: ShieldCheck, t: "زجاج مطابق للمواصفات", d: "زجاج مقسّى (Tempered) يتحمل الحرارة والصدمات ويتفتت لحبيبات غير حادة عند الكسر لأقصى درجات الأمان." },
  { icon: Clock, t: "سرعة في التنفيذ", d: "زيارة معاينة خلال 24 ساعة داخل الدمام والخبر والقطيف، وتنفيذ أغلب الأعمال في نفس اليوم أو اليوم التالي." },
  { icon: Wrench, t: "إكسسوارات أصلية", d: "مفصلات وأقفال ومكاسر من ماركات عالمية (Dorma / GEZE) مع صيانة وضمان على الحركة." },
  { icon: Sparkles, t: "نظافة وتشطيب نهائي", d: "تسليم الموقع نظيفًا مع تلميع الزجاج ومراجعة كل نقطة تثبيت قبل إنهاء العمل." },
];

const SCOPE = [
  "واجهات زجاج الدمام للمحلات والمعارض والفلل بأنظمة سبايدر وستراكشر جلاس",
  "أبواب زجاج سيكوريت مفصلية وسحاب وأوتوماتيكية للمداخل والمكاتب",
  "شاور زجاج الدمام بدون إطار مع معالجة ضد بقع الماء",
  "درابزين زجاج للأدراج والشرفات بقواعد ستانلس ستيل 316",
  "مرايا مقاسات خاصة وديكورية وحمامات بإضاءة LED",
  "قواطع مكاتب زجاجية عازلة للصوت وقاعات اجتماعات",
  "صيانة واستبدال الزجاج المكسور وضبط الأبواب",
];

const STEPS = [
  { t: "التواصل والاستشارة", d: "تواصل معنا عبر الهاتف أو واتساب واشرح لنا نوع العمل المطلوب وموقعه داخل الدمام أو المنطقة الشرقية." },
  { t: "المعاينة وأخذ المقاسات", d: "زيارة مجانية للموقع لأخذ المقاسات الدقيقة واقتراح السماكة والنظام والإكسسوارات المناسبة." },
  { t: "عرض السعر والاتفاق", d: "عرض سعر واضح ومفصّل بدون بنود مخفية، يشمل الزجاج والإكسسوارات والتركيب ومدة التنفيذ." },
  { t: "التفصيل والتركيب", d: "تفصيل الزجاج في الورشة ثم التركيب على يد فنيين متخصصين مع اختبار نهائي وتسليم نظيف." },
];

const FAQ = [
  {
    q: "ما تكلفة تركيب زجاج سيكوريت بالدمام؟",
    a: "تختلف التكلفة حسب سماكة الزجاج (8 – 19 ملم)، والمساحة، ونوع العمل (واجهة، باب، شاور، درابزين)، والإكسسوارات المطلوبة. نقدم معاينة مجانية داخل الدمام والخبر والقطيف ثم عرض سعر تفصيلي مكتوب قبل بدء العمل.",
  },
  {
    q: "كم يستغرق تنفيذ العمل؟",
    a: "أعمال الشاور والمرايا والأبواب الفردية تُنفّذ عادة في يوم إلى يومين من تاريخ أخذ المقاس. أما واجهات زجاج الدمام والمشاريع الكبيرة فتستغرق من 7 إلى 14 يوم عمل حسب المساحة والنظام المستخدم.",
  },
  {
    q: "هل الزجاج السيكوريت آمن للمنازل والأطفال؟",
    a: "نعم، الزجاج السيكوريت مقسّى حراريًا ويتحمل الصدمات أكثر من الزجاج العادي بعدة أضعاف، وعند الكسر يتفتت إلى حبيبات صغيرة غير حادة، وهو الخيار المعتمد في المدارس والفنادق والمنازل.",
  },
  {
    q: "هل تقدمون ضمانًا على التركيب؟",
    a: "نعم، نقدم ضمانًا على أعمال التركيب وعلى الإكسسوارات وحركة الأبواب، مع خدمة صيانة سريعة تشمل ضبط الأبواب واستبدال أي قطعة خلال فترة الضمان.",
  },
  {
    q: "ما المدن التي تخدمونها؟",
    a: `نخدم ${SERVICE_AREAS.join(" و")} وبقية مدن المنطقة الشرقية، مع إمكانية تنفيذ مشاريع خارجها بحسب حجم العمل.`,
  },
];

export const Route = createFileRoute("/glass-installation-dammam")({
  component: DammamPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { property: "og:image", content: `${BASE_URL}${heroImg}` },
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
          "@type": "LocalBusiness",
          name: BRAND,
          description: DESC,
          url: URL,
          telephone: PHONE,
          email: EMAIL,
          image: `${BASE_URL}${heroImg}`,
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            addressLocality: "الدمام",
            addressRegion: "المنطقة الشرقية",
            addressCountry: "SA",
          },
          areaServed: SERVICE_AREAS.map((c) => ({ "@type": "City", name: c })),
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], opens: "08:00", closes: "22:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday"], opens: "15:00", closes: "22:00" },
          ],
          makesOffer: SCOPE.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
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
            { "@type": "ListItem", position: 3, name: "تركيب زجاج سيكوريت بالدمام", item: URL },
          ],
        }),
      },
    ],
  }),
});

function DammamPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <PageHero
        eyebrow="خدمة الدمام والمنطقة الشرقية"
        title="تركيب زجاج سيكوريت"
        goldTitle="بالدمام"
        desc="واجهات زجاج، أبواب زجاج سيكوريت، شاور، درابزين ومرايا — تفصيل وتركيب بمعايير احترافية وضمان، مع معاينة مجانية داخل الدمام والخبر والقطيف."
        image={heroImg}
        imageAlt="واجهة زجاج سيكوريت لمحل تجاري بالدمام من تنفيذ مؤسسة الرواد للزجاج"
      />
      <Breadcrumbs items={[{ label: "خدمات الزجاج", to: "/services" }, { label: "تركيب زجاج سيكوريت بالدمام" }]} />

      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-[1.2fr_1fr] items-start">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="section-title">
                خدمة <span className="text-gold-gradient">تركيب زجاج سيكوريت الدمام</span> بمعايير احترافية
              </h2>
              <div className="mt-4 space-y-4 text-muted-foreground leading-loose">
                <p>
                  تُعد مؤسسة {BRAND} من أبرز الجهات المتخصصة في تركيب زجاج سيكوريت بالدمام، حيث نقدم خدمة متكاملة تبدأ من الاستشارة وأخذ المقاسات على الطبيعة، وتمر
                  بمرحلة التفصيل في ورشتنا المجهزة، وتنتهي بالتركيب النهائي والتلميع وتسليم الموقع نظيفًا. اخترنا التركيز على الزجاج المقسّى (السيكوريت) لأنه الخيار
                  الأنسب لمناخ المنطقة الشرقية؛ فهو يتحمل ارتفاع درجات الحرارة والرطوبة العالية والفروقات الحرارية بين الداخل والخارج، ويوفر في الوقت نفسه مستوى أمان
                  عاليًا للمنازل والمنشآت التجارية.
                </p>
                <p>
                  تشمل خدماتنا تنفيذ <Link to="/glass-facades-dammam" className="text-[color:var(--gold)] underline decoration-[color:var(--gold)]/40 hover:decoration-[color:var(--gold)]">واجهات زجاج بالدمام</Link> للمحلات والمعارض والمطاعم والفلل، باستخدام أنظمة تثبيت حديثة مثل السبايدر والستراكشر جلاس والزجاج المزدوج
                  العازل. الواجهة الزجاجية ليست مجرد عنصر جمالي؛ فهي واجهة تسويقية لأي نشاط تجاري، ولهذا نعمل على اختيار السماكة المناسبة لكل لوح، ودراسة أحمال الرياح،
                  واستخدام سيليكون إنشائي معتمد يضمن ثبات الواجهة لسنوات طويلة دون تسريب أو ارتخاء.
                </p>
                <p>
                  كما نُنفّذ <Link to="/services/$slug" params={{ slug: "glass-doors" }} className="text-[color:var(--gold)] underline decoration-[color:var(--gold)]/40 hover:decoration-[color:var(--gold)]">أبواب زجاج سيكوريت</Link> بجميع أنواعها: أبواب مفصلية للمداخل الرئيسية، وأبواب سحاب للمكاتب والفنادق، وأبواب أوتوماتيكية بحساسات حركة للمحلات
                  والصيدليات والعيادات. نستخدم إكسسوارات أصلية من ماركات عالمية لضمان حركة سلسة وعمر افتراضي أطول، مع إمكانية تنفيذ النقش المصنفر أو التحبيب الجزئي لإضافة
                  خصوصية دون التأثير على انتقال الضوء الطبيعي.
                </p>
                <p>
                  وفي القسم السكني، يمثّل <Link to="/services/$slug" params={{ slug: "shower-glass" }} className="text-[color:var(--gold)] underline decoration-[color:var(--gold)]/40 hover:decoration-[color:var(--gold)]">شاور زجاج</Link> واحدًا من أكثر الأعمال المطلوبة لدينا. ننفذ قواطع الشاور بدون إطار (Frameless) بمقاسات مخصصة لكل حمام، مع
                  إكسسوارات كروم أو ذهبي أو أسود مطفي، ومعالجة نانو للزجاج تقلل ترسبات الماء والجيرية وتجعل التنظيف أسهل بكثير. إلى جانب ذلك ننفذ <Link to="/services/$slug" params={{ slug: "glass-railings" }} className="text-[color:var(--gold)] underline decoration-[color:var(--gold)]/40 hover:decoration-[color:var(--gold)]">درابزين زجاج</Link> للأدراج
                  والشرفات والمسابح باستخدام زجاج مصفح ومقسّى وقواعد ستانلس ستيل 316 مقاومة للصدأ، وهو حل يمنح إحساسًا بالاتساع ويحفظ الإطلالة مع الحفاظ على معايير
                  السلامة.
                </p>
                <p>
                  ولأننا نعمل كذلك كمحل زجاج ومرايا متكامل، نوفر خدمة تفصيل زجاج الدمام بجميع الاستخدامات: أرفف زجاجية، أسطح طاولات، <Link to="/services/$slug" params={{ slug: "office-glass" }} className="text-[color:var(--gold)] underline decoration-[color:var(--gold)]/40 hover:decoration-[color:var(--gold)]">حواجز مكاتب</Link>، <Link to="/services/$slug" params={{ slug: "mirrors" }} className="text-[color:var(--gold)] underline decoration-[color:var(--gold)]/40 hover:decoration-[color:var(--gold)]">مرايا</Link> حمامات وصالونات
                  ومرايا ديكورية بأشكال هندسية وإضاءة LED خلفية. جميع أعمال المرايا لدينا مُعالجة ضد الرطوبة والأكسدة لتناسب بيئة الحمامات، وتُقص حوافها بشكل مصقول أو
                  مشطوف حسب رغبة العميل وطبيعة الديكور.
                </p>
                <p>
                  نلتزم في كل مشروع بثلاث قواعد أساسية: الدقة في المقاس، وشفافية السعر، والالتزام بالموعد. تبدأ الرحلة بزيارة معاينة مجانية داخل الدمام والخبر والظهران
                  والقطيف والجبيل، نحدد فيها نوع الزجاج والسماكة والنظام المناسب، ونشرح للعميل الفروقات العملية بين الخيارات المتاحة بدلًا من بيع الأغلى. بعد ذلك نرسل
                  عرض سعر مكتوبًا يوضح كل بند: الزجاج، الإكسسوارات، التركيب، ومدة التنفيذ، ثم نبدأ العمل بعد الموافقة مباشرة.
                </p>
                <p>
                  ولا تنتهي علاقتنا بالعميل عند التسليم؛ فنحن نوفر خدمة صيانة زجاج سريعة تشمل استبدال الزجاج المكسور، وضبط الأبواب المتدلية، وتغيير المفصلات والأقفال،
                  وإزالة الترسبات وتلميع الخدوش، مع عقود صيانة سنوية للفنادق والمحلات والمنشآت التجارية. إذا كنت تبحث عن جهة موثوقة لتركيب زجاج سيكوريت بالدمام أو أي من
                  مدن المنطقة الشرقية، فنحن على بعد اتصال واحد، ويسعدنا تقديم استشارة فنية مجانية قبل أن تتخذ قرارك.
                </p>
              </div>

              <h2 className="mt-12 section-title">
                أعمال <span className="text-gold-gradient">ننفذها بالدمام</span>
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {SCOPE.map((s) => (
                  <div key={s} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[color:var(--gold)]" />
                    <span className="text-sm leading-relaxed">{s}</span>
                  </div>
                ))}
              </div>

              <h2 className="mt-12 section-title">
                مميزات <span className="text-gold-gradient">مؤسسة الرواد للزجاج</span>
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {FEATURES.map((f) => (
                  <div key={f.t} className="rounded-2xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-luxury)" }}>
                    <f.icon className="h-6 w-6 text-[color:var(--gold)]" aria-hidden="true" />
                    <h3 className="mt-3 font-bold">{f.t}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
                  </div>
                ))}
              </div>

              <h2 className="mt-12 section-title">
                خطوات <span className="text-gold-gradient">العمل معنا</span>
              </h2>
              <ol className="mt-6 space-y-3">
                {STEPS.map((s, i) => (
                  <li key={s.t} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full btn-gold text-sm font-bold">{i + 1}</span>
                    <div>
                      <h3 className="font-bold">{s.t}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-14">
                <h2 className="section-title">الأسئلة الشائعة</h2>
                <div className="mt-6 space-y-3">
                  {FAQ.map((f, i) => {
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
            <QuoteForm defaultService="تركيب زجاج سيكوريت بالدمام" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2 rounded-full btn-gold px-5 py-3 text-sm" dir="ltr">
                <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("مرحبًا، أرغب في الاستفسار عن تركيب زجاج سيكوريت بالدمام")}`}
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

      <section className="border-t border-border bg-secondary/40 py-14 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-lg font-bold mb-4">تعرف على خدمات الزجاج بالتفصيل</h2>
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
          </div>
        </div>
      </section>
    </>
  );
}
