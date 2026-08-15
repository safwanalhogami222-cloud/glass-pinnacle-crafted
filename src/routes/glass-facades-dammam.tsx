import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, ChevronDown, Phone, ShieldCheck, Clock, Award, Wrench, Ruler, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { PageHero } from "@/components/site/PageHero";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { QuoteForm } from "@/components/site/QuoteForm";
import { BASE_URL, BRAND, EMAIL, HOURS, PHONE, PHONE_DISPLAY, SERVICE_AREAS, SERVICES_META, WHATSAPP } from "@/lib/site-data";
import { GALLERY_ITEMS } from "@/lib/gallery-images";
import heroImg from "@/assets/project-storefront.jpg";

const TITLE = "تركيب واجهات زجاج بالدمام | واجهات سيكوريت | الرواد";
const DESC =
  "تركيب وتفصيل واجهات زجاج سيكوريت للمحلات والمكاتب والمباني في الدمام والخبر والقطيف، بأنظمة فريملس وسبايدر وستراكشر جلاس مع المعاينة والتركيب والضمان.";
const URL = `${BASE_URL}/glass-facades-dammam`;


const FACADE_TYPES = [
  { type: "واجهة زجاج سيكوريت شفاف", use: "محلات ومعارض العرض", note: "أعلى وضوح لعرض المنتجات وجذب المارة" },
  { type: "واجهة ستراكشر جلاس", use: "المباني والمكاتب الإدارية", note: "مظهر زجاجي متصل بدون إطارات ظاهرة" },
  { type: "نظام سبايدر جلاس", use: "المداخل والصالات المرتفعة", note: "تثبيت بمخالب ستانلس ستيل لأسطح كبيرة" },
  { type: "زجاج مزدوج عازل (Double Glazed)", use: "المكاتب والفلل", note: "عزل حراري وصوتي وتخفيض فاتورة التكييف" },
  { type: "زجاج ريفلكتف عاكس", use: "الواجهات المعرضة للشمس", note: "خصوصية نهارية وتقليل الحرارة الداخلة" },
  { type: "زجاج Low-E", use: "المشاريع التجارية الكبيرة", note: "أداء حراري أعلى مع نفاذ ضوء طبيعي ممتاز" },
  { type: "واجهة كيرتن وول ألمنيوم", use: "الأبراج والمباني متعددة الأدوار", note: "هيكل ألمنيوم إنشائي يحمل ألواح الزجاج" },
  { type: "واجهة زجاج مصفح (Laminated)", use: "المواقع عالية الحركة", note: "طبقة PVB تمنع تناثر الزجاج عند الكسر" },
];

const FEATURES = [
  { icon: Award, t: "خبرة تفوق 15 عامًا", d: "نفّذنا مئات واجهات الزجاج التجارية والسكنية في الدمام والخبر والقطيف والظهران." },
  { icon: Ruler, t: "تصميم ومقاسات دقيقة", d: "رفع مقاسات على الطبيعة ودراسة أحمال الرياح قبل اعتماد السماكة ونظام التثبيت." },
  { icon: ShieldCheck, t: "زجاج مطابق للمواصفات", d: "زجاج سيكوريت مقسّى ومصفح مطابق لكود البناء السعودي مع شهادات مصنع." },
  { icon: Clock, t: "التزام بالمواعيد", d: "جدول زمني مكتوب لكل مرحلة من التصنيع حتى التركيب والتسليم النهائي." },
  { icon: Wrench, t: "إكسسوارات وأنظمة أصلية", d: "بروفيلات ألمنيوم معتمدة وسيليكون إنشائي وستانلس ستيل 316 مقاوم للصدأ." },
  { icon: Sparkles, t: "ضمان وصيانة", d: "ضمان على التركيب والتسريب مع عقود صيانة دورية للمحلات والمنشآت التجارية." },
];

const SCOPE = [
  "واجهات محلات زجاج بأنظمة فريملس وواجهات عرض كاملة الارتفاع",
  "واجهات زجاج تجارية للمعارض والمطاعم والصيدليات والعيادات",
  "واجهات زجاج للمكاتب والقواطع الزجاجية العازلة للصوت",
  "أنظمة سبايدر وستراكشر جلاس للمداخل والصالات المرتفعة",
  "تركيب زجاج واجهات الخبر والظهران والقطيف والجبيل",
  "زجاج مزدوج وعاكس وLow-E لتقليل الحرارة واستهلاك الطاقة",
  "استبدال زجاج الواجهات المكسور ومعالجة التسريب والصيانة",
];

const STEPS = [
  { t: "المعاينة والاستشارة", d: "زيارة الموقع داخل الدمام أو الخبر لأخذ المقاسات وتحديد النظام الأنسب للواجهة." },
  { t: "التصميم وعرض السعر", d: "رسم تنفيذي مبدئي وعرض سعر مفصّل يوضح نوع الزجاج والسماكة والإكسسوارات والمدة." },
  { t: "التصنيع في الورشة", d: "قص وتقسية ومعالجة الحواف وتجهيز البروفيلات قبل نقل الألواح للموقع بأمان." },
  { t: "التركيب والتسليم", d: "تركيب على يد فنيين متخصصين مع اختبار التسريب والتلميع وتسليم الموقع نظيفًا." },
];

const FAQ = [
  {
    q: "كم تكلفة تركيب واجهات زجاج بالدمام؟",
    a: "تُحسب تكلفة تركيب واجهات زجاج بالدمام بالمتر المربع، وتعتمد على سماكة الزجاج (10 – 19 ملم)، ونوع النظام (فريملس، سبايدر، ستراكشر، كيرتن وول)، وارتفاع الواجهة، ونوع الزجاج (شفاف، عاكس، مزدوج). نقدم معاينة مجانية وعرض سعر مكتوب مفصّل قبل بدء العمل بدون بنود مخفية.",
  },
  {
    q: "ما الفرق بين واجهات زجاج سيكوريت والزجاج العادي؟",
    a: "الزجاج السيكوريت مقسّى حراريًا فيصبح أقوى من الزجاج العادي بعدة أضعاف ويتحمل الحرارة وفروق درجاتها وأحمال الرياح، وعند الكسر يتفتت إلى حبيبات صغيرة غير حادة. لهذا فهو الخيار المعتمد في واجهات المحلات والمباني بدلًا من الزجاج العادي.",
  },
  {
    q: "ما أفضل نوع زجاج لواجهات محلات في المنطقة الشرقية؟",
    a: "لمناخ المنطقة الشرقية الحار والرطب ننصح بزجاج سيكوريت مزدوج أو عاكس بسماكة مناسبة؛ فهو يقلل الحرارة الداخلة ويخفض استهلاك التكييف ويحافظ على وضوح العرض. أما واجهات المعارض التي تحتاج أقصى شفافية فيُفضل فيها الزجاج الشفاف عالي النقاء.",
  },
  {
    q: "كم يستغرق تنفيذ واجهة زجاج تجارية؟",
    a: "واجهات المحلات الصغيرة تُنفّذ خلال 3 إلى 5 أيام عمل من تاريخ أخذ المقاس. أما واجهات زجاج تجارية كبيرة أو أنظمة السبايدر والستراكشر جلاس فتستغرق عادة من 7 إلى 14 يوم عمل حسب المساحة ونوع الزجاج المطلوب تصنيعه.",
  },
  {
    q: "هل تنفذون تركيب زجاج واجهات الخبر والمدن المجاورة؟",
    a: `نعم، نغطي ${SERVICE_AREAS.join(" و")} وبقية مدن المنطقة الشرقية بنفس الأسعار والمعايير، مع إمكانية تنفيذ مشاريع خارج المنطقة حسب حجم العمل.`,
  },
  {
    q: "هل الواجهات الزجاجية تتحمل حرارة الصيف والرطوبة؟",
    a: "نعم، عند اختيار السماكة والنظام الصحيحين. نستخدم زجاجًا مقسّى وسيليكون إنشائي مقاوم للأشعة فوق البنفسجية وبروفيلات ألمنيوم مطلية بالبودرة أو أنودايز، وهي مواد مصممة لتحمل حرارة ورطوبة المنطقة الشرقية لسنوات طويلة.",
  },
  {
    q: "هل يمكن استبدال زجاج واجهة مكسور دون تغيير الواجهة كاملة؟",
    a: "نعم في أغلب الحالات. نأخذ مقاس اللوح المكسور ونصنّع بديلًا مطابقًا في السماكة واللون والمعالجة، ثم نستبدله ونعيد ضبط التثبيت والسيليكون دون المساس ببقية الألواح، مع خدمة طارئة سريعة للمحلات.",
  },
  {
    q: "هل تقدمون ضمانًا على واجهات الزجاج؟",
    a: "نعم، نقدم ضمانًا على أعمال التركيب وعلى التسريب وحركة الأبواب والإكسسوارات، بالإضافة إلى شهادة الزجاج من المصنع، مع خدمة صيانة سريعة وعقود صيانة سنوية للمنشآت التجارية.",
  },
];

const FACADE_PROJECTS = GALLERY_ITEMS.filter((g) => g.category === "facade" || g.category === "office").slice(0, 9);

export const Route = createFileRoute("/glass-facades-dammam")({
  component: FacadesPage,
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
      { property: "og:image:alt", content: "واجهة زجاج سيكوريت لمحل تجاري في الدمام" },
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
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "تركيب واجهات زجاج",
          name: "تركيب واجهات زجاج بالدمام",
          description: DESC,
          url: URL,
          provider: { "@type": "LocalBusiness", name: BRAND, telephone: PHONE, url: BASE_URL },
          areaServed: SERVICE_AREAS.map((c) => ({ "@type": "City", name: c })),
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "أنواع الواجهات الزجاجية",
            itemListElement: FACADE_TYPES.map((t) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: t.type, description: t.note },
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
            { "@type": "ListItem", position: 2, name: "الخدمات", item: `${BASE_URL}/services` },
            { "@type": "ListItem", position: 3, name: "تركيب واجهات زجاج بالدمام", item: URL },
          ],
        }),
      },
    ],
  }),
});

function FacadesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <PageHero
        eyebrow="واجهات زجاج — الدمام والمنطقة الشرقية"
        title="تركيب واجهات زجاج"
        goldTitle="بالدمام"
        desc="واجهات زجاج سيكوريت للمحلات والمكاتب والمباني التجارية بأنظمة فريملس وسبايدر وستراكشر جلاس — تصميم وتصنيع وتركيب بضمان ومعاينة مجانية."
        image={heroImg}
      />
      <Breadcrumbs items={[{ label: "الخدمات", to: "/services" }, { label: "تركيب واجهات زجاج بالدمام" }]} />

      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto w-full max-w-7xl grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
          <div className="min-w-0">

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="section-title">
                خدمة <span className="text-gold-gradient">تركيب واجهات زجاج بالدمام</span> بمعايير هندسية
              </h2>
              <div className="mt-4 space-y-4 text-muted-foreground leading-loose">
                <p>
                  تُعد الواجهة الزجاجية أول ما يراه العميل في أي نشاط تجاري، وهي في الوقت نفسه العنصر الذي يحدد كمية الضوء والحرارة الداخلة إلى المبنى. لهذا فإن
                  تركيب واجهات زجاج بالدمام ليس عملًا شكليًا فقط، بل عمل هندسي يحتاج إلى دراسة دقيقة لأحمال الرياح، وارتفاع الواجهة، ونوع النشاط، وطبيعة المناخ في
                  المنطقة الشرقية. في مؤسسة {BRAND} نتعامل مع كل واجهة كمشروع مستقل: نرفع المقاسات على الطبيعة، ونحدد نوع الزجاج وسماكته ونظام التثبيت الأنسب، ثم
                  نصنّع الألواح في ورشتنا ونركّبها على يد فنيين متخصصين مع اختبار نهائي للتسريب والثبات.
                </p>
                <p>
                  نعتمد بشكل أساسي على واجهات زجاج سيكوريت، أي الزجاج المقسّى حراريًا، لأنه يتحمل الصدمات وفروق درجات الحرارة بين داخل المبنى وخارجه، وهو أمر جوهري في
                  مدن مثل الدمام والخبر حيث تتجاوز حرارة الصيف الخمسين درجة على سطح الزجاج المعرض للشمس. الزجاج المقسّى أيضًا أكثر أمانًا؛ فعند تعرضه لكسر مفاجئ يتفتت
                  إلى حبيبات صغيرة غير حادة بدل الشظايا الخطرة، وهو ما يجعله الخيار المعتمد في الأماكن ذات الحركة العالية مثل المحلات والمولات والعيادات والمطاعم.
                </p>
                <h3 className="pt-2 text-xl font-bold text-foreground">واجهات محلات زجاج تزيد ظهور نشاطك التجاري</h3>
                <p>
                  عندما ننفذ واجهات محلات زجاج، نضع في الاعتبار هدفًا تسويقيًا واضحًا: أن يرى المارّ ما بداخل المحل بأقصى وضوح ممكن. لذلك نميل إلى أنظمة فريملس (بدون
                  إطار) أو أنظمة بإطارات نحيفة جدًا، مع ألواح كاملة الارتفاع تقلل عدد الفواصل الرأسية. نضيف إلى ذلك بابًا زجاجيًا مفصليًا أو أوتوماتيكيًا حسب طبيعة
                  الحركة، ونعالج الحواف بالتلميع لتجنب أي حواف حادة. كما يمكن دمج ستيكرات النشاط أو النقش المصنفر أو الإضاءة الخطية داخل الواجهة لإبراز هوية العلامة
                  التجارية ليلًا.
                </p>
                <p>
                  ولأن أغلب المحلات لا تحتمل توقفًا طويلًا عن العمل، ننظّم جدول التنفيذ بحيث تتم أعمال التصنيع بالكامل في الورشة، ولا يستغرق التركيب في الموقع سوى يوم
                  أو يومين في الغالب، مع إمكانية العمل خارج ساعات الدوام أو ليلًا في المجمعات التجارية التي تفرض ذلك.
                </p>
                <h3 className="pt-2 text-xl font-bold text-foreground">واجهات زجاج تجارية للمعارض والمباني</h3>
                <p>
                  تتطلب واجهات زجاج تجارية الكبيرة حلولًا مختلفة عن واجهات المحلات الصغيرة. هنا نستخدم أنظمة الستراكشر جلاس التي تخفي عناصر التثبيت خلف الزجاج فتبدو
                  الواجهة كسطح زجاجي متصل، أو نظام السبايدر الذي يثبّت الألواح عبر مخالب من الستانلس ستيل 316 ويسمح بتغطية مساحات وارتفاعات كبيرة مثل صالات المعارض
                  ومداخل الأبراج. وفي المشاريع متعددة الأدوار ننفذ أنظمة الكيرتن وول بهيكل ألمنيوم إنشائي يحمل ألواح الزجاج ويوزع الأحمال على المبنى بشكل صحيح.
                </p>
                <p>
                  اختيار نوع الزجاج في هذه المشاريع لا يقل أهمية عن اختيار النظام. الزجاج المزدوج العازل (Double Glazed) يفصل بين لوحين بفراغ هوائي أو غاز خامل فيقلل
                  انتقال الحرارة والصوت بشكل ملحوظ، والزجاج العاكس يمنح خصوصية نهارية ويخفض الحمل الحراري، أما زجاج Low-E فيوفر أفضل معادلة بين نفاذ الضوء الطبيعي
                  وحجب الأشعة تحت الحمراء. نشرح للعميل الفروق العملية بين هذه الخيارات وتأثير كل منها على فاتورة التكييف قبل الاعتماد، بدل الاكتفاء بترشيح الأغلى.
                </p>
                <h3 className="pt-2 text-xl font-bold text-foreground">واجهات زجاج للمكاتب والقواطع الداخلية</h3>
                <p>
                  في بيئات العمل الحديثة أصبحت واجهات زجاج للمكاتب معيارًا أساسيًا؛ فهي تمنح الشفافية البصرية والإحساس بالاتساع دون التخلي عن الخصوصية الصوتية. ننفذ
                  قواطع مكتبية بزجاج مفرد أو مزدوج مع شرائح عزل صوتي في الإطارات، وأبوابًا زجاجية مخفية المفصلات، وقاعات اجتماعات بزجاج يمكن تحبيبه جزئيًا على مستوى
                  النظر. يمكن كذلك دمج ستائر داخلية بين لوحي الزجاج المزدوج للتحكم بالخصوصية بلمسة زر دون الحاجة إلى ستائر خارجية تتراكم عليها الأتربة.
                </p>
                <p>
                  نراعي في تنفيذ مكاتب الشركات مسارات التكييف والكهرباء والإنذار، وننسق مع المقاول أو المهندس المشرف لضمان أن تكون فتحات الزجاج مطابقة للمخططات، مع
                  تسليم رسومات تنفيذية معتمدة قبل التصنيع.
                </p>
                <h3 className="pt-2 text-xl font-bold text-foreground">تركيب زجاج واجهات الخبر وبقية مدن الشرقية</h3>
                <p>
                  لا تقتصر خدمتنا على الدمام؛ فنحن ننفذ تركيب زجاج واجهات الخبر والظهران والقطيف والجبيل ورأس تنورة بنفس المعايير والأسعار. وتُنفَّذ واجهات زجاج
                  الشرقية لدينا بفريق ثابت وسيارات نقل مجهزة بحوامل زجاج آمنة، وهو ما يقلل احتمالات التلف أثناء النقل ويضمن وصول الألواح بحالة سليمة إلى الموقع. كما
                  نوفر خدمة طوارئ لاستبدال زجاج الواجهات المكسور خلال أقصر وقت ممكن، مع تركيب ألواح مؤقتة عند الحاجة لتأمين المحل حتى جاهزية اللوح البديل.
                </p>
                <p>
                  خبرتنا الممتدة لأكثر من خمسة عشر عامًا في السوق المحلي جعلتنا نعرف تمامًا ما الذي يفشل في الواجهات الزجاجية سيئة التنفيذ: سيليكون غير إنشائي يتحلل مع
                  الشمس، بروفيلات ألمنيوم رديئة تتأكسد مع الرطوبة، تصريف مياه غير مدروس يسبب تسريبًا داخل المحل، أو سماكة زجاج أقل من اللازم تسبب اهتزازًا مع الرياح.
                  نحن نتفادى كل ذلك باستخدام مواد معتمدة وتفاصيل تنفيذية صحيحة، ونمنح ضمانًا مكتوبًا على التركيب والتسريب.
                </p>
                <p>
                  في النهاية، الواجهة الزجاجية استثمار طويل الأمد في مظهر منشأتك وكفاءتها. سواء كنت صاحب محل تبحث عن واجهة عرض جذابة، أو مستثمرًا ينفذ مبنى تجاريًا
                  كاملًا، أو شركة تعيد تصميم مكاتبها، يسعدنا أن نقدم لك استشارة فنية مجانية وعرض سعر واضح خلال وقت قصير. تواصل معنا عبر الهاتف أو واتساب وسنكون في
                  موقعك للمعاينة خلال 24 ساعة داخل الدمام والخبر والقطيف.
                </p>
              </div>

              <h2 className="mt-12 section-title">
                أنواع <span className="text-gold-gradient">الواجهات الزجاجية</span> واستخدام كل نوع
              </h2>
              <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
                <table className="w-full min-w-[560px] text-right text-sm">
                  <caption className="sr-only">جدول أنواع الواجهات الزجاجية واستخداماتها</caption>
                  <thead className="bg-secondary/60">
                    <tr>
                      <th scope="col" className="p-4 font-bold">النوع</th>
                      <th scope="col" className="p-4 font-bold">الاستخدام الأنسب</th>
                      <th scope="col" className="p-4 font-bold">الميزة الأبرز</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FACADE_TYPES.map((t) => (
                      <tr key={t.type} className="border-t border-border align-top">
                        <th scope="row" className="p-4 font-semibold text-foreground">{t.type}</th>
                        <td className="p-4 text-muted-foreground">{t.use}</td>
                        <td className="p-4 text-muted-foreground">{t.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="mt-12 section-title">
                أعمال <span className="text-gold-gradient">ننفذها في الواجهات</span>
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
                مزايا اختيار <span className="text-gold-gradient">مؤسسة الرواد</span>
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
                خطوات <span className="text-gold-gradient">تنفيذ الواجهة</span>
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

          <div className="min-w-0 lg:sticky lg:top-28">
            <QuoteForm defaultService="تركيب واجهات زجاج بالدمام" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2 rounded-full btn-gold px-5 py-3 text-sm" dir="ltr">
                <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("مرحبًا، أرغب في عرض سعر لتركيب واجهة زجاج بالدمام")}`}
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

      {FACADE_PROJECTS.length > 0 && (
        <section className="border-t border-border py-16 px-4 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <h2 className="section-title">
              معرض <span className="text-gold-gradient">واجهات زجاج</span> من تنفيذنا
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FACADE_PROJECTS.map((p) => (
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
                      alt={`${p.title} — ${p.city} | تركيب واجهات زجاج`}
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
            اطلب <span className="text-gold-gradient">عرض سعر مجاني</span> لواجهتك اليوم
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground leading-relaxed">
            معاينة مجانية داخل الدمام والخبر والقطيف، وعرض سعر مكتوب ومفصّل خلال 24 ساعة بدون أي التزام.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full btn-gold px-6 py-3 text-sm" dir="ltr">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("مرحبًا، أرغب في عرض سعر مجاني لتركيب واجهة زجاج")}`}
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
          </div>
        </div>
      </section>
    </>
  );
}
