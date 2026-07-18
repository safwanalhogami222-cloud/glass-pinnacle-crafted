import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, MapPin, MessageCircle, Menu, X, ChevronDown,
  ShieldCheck, Wrench, Clock, BadgeDollarSign, Sparkles, Search,
  Building2, DoorOpen, Waves, Grid3x3, Frame, Briefcase,
  MoveHorizontal, Layers, Table as TableIcon, Store, Star, ArrowUpLeft, ArrowLeft,
  PhoneCall, ClipboardList, PencilRuler, Hammer, CheckCircle2,
  Instagram, Twitter, Facebook, Youtube
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import pShower from "@/assets/project-shower.jpg";
import pStorefront from "@/assets/project-storefront.jpg";
import pRailing from "@/assets/project-railing.jpg";
import pOffice from "@/assets/project-office.jpg";
import pDoor from "@/assets/project-door.jpg";
import pMirror from "@/assets/project-mirror.jpg";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    meta: [{ property: "og:url", content: "/" }],
  }),
});

const BRAND = "الرواد للزجاج السيكوريت";
const PHONE = "+966501910923";
const PHONE_DISPLAY = "0501910923";
const WHATSAPP = "966501910923";
const EMAIL = "info@alrowad-glass.sa";

const CITIES = ["الدمام", "الخبر", "القطيف", "الظهران", "الجبيل", "المنطقة الشرقية"];

const SERVICES = [
  { icon: Building2, title: "واجهات زجاج", desc: "واجهات زجاجية للفلل والمباني بتصاميم عصرية وعزل حراري عالي." },
  { icon: DoorOpen, title: "أبواب زجاج سيكوريت", desc: "أبواب زجاج سيكوريت داخلية وخارجية بإكسسوارات فاخرة." },
  { icon: Waves, title: "شاور زجاج", desc: "قواطع شاور زجاجية بدون إطار بتصاميم فندقية راقية." },
  { icon: Grid3x3, title: "درابزين زجاج", desc: "درابزين زجاج للسلالم والشرفات بمعايير أمان أوروبية." },
  { icon: Frame, title: "مرايا", desc: "مرايا مقاسات خاصة، ديكورية، وحمامات بأعلى وضوح." },
  { icon: Briefcase, title: "مكاتب زجاجية", desc: "قواطع مكاتب زجاجية عازلة للصوت بتصاميم احترافية." },
  { icon: MoveHorizontal, title: "أبواب سحاب", desc: "أبواب سحاب زجاجية بحركة سلسة وخامات ثقيلة." },
  { icon: Layers, title: "أبواب كلادينج", desc: "أبواب كلادينج بمظهر معدني أنيق ومتانة عالية." },
  { icon: TableIcon, title: "زجاج للطاولات", desc: "أسطح زجاج مقص وممسوح الحواف بمقاسات مخصصة." },
  { icon: Store, title: "واجهات المحلات", desc: "واجهات محلات تجارية تعكس هوية علامتك التجارية." },
];

const WHY = [
  { icon: ShieldCheck, title: "ضمان شامل", desc: "ضمان على جميع الأعمال والتركيبات لراحة بالك." },
  { icon: Wrench, title: "تركيب احترافي", desc: "فنيون معتمدون بخبرة أكثر من 15 عامًا." },
  { icon: Clock, title: "تنفيذ سريع", desc: "التزام تام بالمواعيد وسرعة في التسليم." },
  { icon: BadgeDollarSign, title: "أسعار تنافسية", desc: "أفضل عرض سعر بلا تنازل عن الجودة." },
  { icon: Sparkles, title: "خامات من الأعلى", desc: "زجاج سيكوريت أصلي بمعايير SASO." },
  { icon: Search, title: "معاينة مجانية", desc: "زيارة الموقع وتقديم عرض السعر بدون رسوم." },
];

const PROJECTS = [
  { img: pShower, title: "شاور فندقي — الخبر", cat: "شاور" },
  { img: pStorefront, title: "واجهة محل تجاري — الدمام", cat: "واجهات" },
  { img: pRailing, title: "درابزين زجاج فيلا — الظهران", cat: "درابزين" },
  { img: pOffice, title: "قواطع مكاتب — الجبيل", cat: "مكاتب" },
  { img: pDoor, title: "باب مدخل رئيسي — الدمام", cat: "أبواب" },
  { img: pMirror, title: "مرايا ديكورية — القطيف", cat: "مرايا" },
];
const FILTERS = ["الكل", "واجهات", "أبواب", "شاور", "درابزين", "مكاتب", "مرايا"];

const TESTIMONIALS = [
  { name: "أ. عبدالله السالم", city: "الدمام", text: "تعامل راقي والتزام تام بالموعد، جودة تركيب ممتازة وأسعار منافسة. أنصح بهم بقوة." },
  { name: "م. نورة الفهد", city: "الخبر", text: "نفذوا واجهة الفيلا بشكل احترافي بعيد المستوى، والنتيجة فاقت التوقعات." },
  { name: "أ. سعود العتيبي", city: "الجبيل", text: "شغل نظيف ومتقن، الفنيون محترفون والخامات ممتازة. شكرًا للرواد." },
  { name: "أ. لينا الحربي", city: "القطيف", text: "شاور الحمام صار تحفة! تصميم أنيق وتنفيذ دقيق." },
];

const FAQ = [
  { q: "ما هو زجاج السيكوريت وما ميزاته؟", a: "زجاج السيكوريت (المقسّى) يُعالج حراريًا ليصبح أقوى من الزجاج العادي بـ 4-5 مرات، وعند كسره يتفتت لحبيبات صغيرة غير حادة، مما يجعله آمنًا للاستخدام في الأبواب والواجهات والشاور." },
  { q: "هل تقدمون معاينة مجانية؟", a: "نعم، نقدم زيارة معاينة مجانية داخل الدمام والخبر والظهران والجبيل والقطيف لتقديم عرض سعر دقيق." },
  { q: "كم تستغرق مدة التنفيذ؟", a: "غالبًا من 3 إلى 7 أيام عمل حسب حجم المشروع ونوع الزجاج والإكسسوارات المطلوبة." },
  { q: "هل هناك ضمان على الأعمال؟", a: "نعم، نمنح ضمانًا شاملًا على التركيب والإكسسوارات، مع صيانة سريعة عند الحاجة." },
  { q: "ما هي المدن التي تخدمونها؟", a: "الدمام، الخبر، القطيف، الظهران، الجبيل، وباقي مدن المنطقة الشرقية." },
];

const STATS = [
  { value: 15, suffix: "+", label: "سنة خبرة" },
  { value: 1200, suffix: "+", label: "مشروع منجز" },
  { value: 950, suffix: "+", label: "عميل راضٍ" },
  { value: 6, suffix: "", label: "مدن نخدمها" },
];

const STEPS = [
  { icon: PhoneCall, title: "تواصل معنا", desc: "اتصل أو أرسل واتساب وسنرد خلال دقائق." },
  { icon: ClipboardList, title: "معاينة مجانية", desc: "زيارة الموقع وأخذ المقاسات بدقة." },
  { icon: PencilRuler, title: "تصميم وعرض سعر", desc: "نقدم لك التصور وعرض سعر شفاف." },
  { icon: Hammer, title: "التصنيع والتركيب", desc: "تنفيذ احترافي بأيدي فنيين معتمدين." },
  { icon: CheckCircle2, title: "التسليم والضمان", desc: "تسليم نهائي مع ضمان شامل على الأعمال." },
];

function useCount(target: number, inView: boolean, duration = 1600) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let raf = 0;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      setN(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return n;
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  };
}

function HomePage() {
  return (
    <div dir="rtl" className="min-h-dvh bg-background text-foreground overflow-x-clip">
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Services />
        <WhyUs />
        <Process />
        <Projects />
        <BeforeAfter />
        <Testimonials />
        <About />
        <FaqSection />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#services", label: "خدماتنا" },
    { href: "#projects", label: "أعمالنا" },
    { href: "#process", label: "خطوات العمل" },
    { href: "#why", label: "لماذا نحن" },
    { href: "#faq", label: "الأسئلة" },
    { href: "#contact", label: "تواصل" },
  ];
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-500 ${scrolled ? "" : ""}`}>
        <div className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-500 ${scrolled ? "glass-dark shadow-2xl" : "bg-transparent"}`}>
          <a href="#top" className="flex items-center gap-3 order-2">
            <div className="min-w-0 text-right">
              <div className={`font-display text-base sm:text-lg font-extrabold truncate text-gold-gradient`}>الرواد</div>
              <div className={`text-[10px] sm:text-[11px] ${scrolled ? "text-white/60" : "text-white/70"}`}>للزجاج السيكوريت</div>
            </div>
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ background: "var(--gradient-gold)" }}>
              <Building2 className="h-5 w-5 text-[#111]" />
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-1 order-1">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="rounded-full px-4 py-2 text-sm text-white/85 hover:text-white hover:bg-white/10 transition">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2 order-0">
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full btn-gold px-5 py-2.5 text-sm" dir="ltr">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
          </div>
          <button
            aria-label="فتح القائمة"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg glass-dark text-white"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden mt-2 rounded-2xl glass-dark p-3"
            >
              <div className="flex flex-col">
                {links.map((l) => (
                  <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-white/90 hover:bg-white/10">
                    {l.label}
                  </a>
                ))}
                <a href="#contact" onClick={() => setOpen(false)} className="mt-2 text-center rounded-full btn-gold px-5 py-3 text-sm">
                  احصل على عرض سعر مجاني
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-dvh w-full overflow-hidden bg-[#0a0a0a]">
      <motion.img
        src={heroImg}
        alt="واجهة زجاج سيكوريت فاخرة"
        width={1920}
        height={1200}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ y }}
        fetchPriority="high"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.35) 40%, rgba(10,10,10,0.9) 100%)" }} />
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, #7CC7E8 0%, transparent 70%)" }} />
      <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full opacity-25 blur-3xl" style={{ background: "radial-gradient(circle, #C9A227 0%, transparent 70%)" }} />

      <motion.div style={{ opacity }} className="relative z-10 mx-auto flex min-h-dvh max-w-7xl flex-col items-start justify-center px-4 sm:px-6 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-2 text-xs sm:text-sm text-white/90"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold)] animate-pulse" />
          خبرة تتجاوز 15 عامًا في المنطقة الشرقية
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 max-w-4xl text-4xl sm:text-6xl md:text-7xl font-black leading-[1.1] tracking-tight text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          نصنع الفخامة من <span className="text-gold-gradient">الزجاج السيكوريت</span>
          <br />
          بلمسة معمارية راقية
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed"
        >
          تفصيل وتركيب زجاج سيكوريت، واجهات، أبواب، شاور، درابزين ومرايا — بأعلى معايير الجودة العالمية وبتصاميم تليق بمنزلك ومشروعك في الدمام والخبر والمنطقة الشرقية.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a href="#contact" className="group inline-flex items-center gap-2 rounded-full btn-gold px-7 py-4 text-sm sm:text-base">
            احصل على عرض سعر مجاني
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </a>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("مرحبًا، أرغب في الاستفسار عن خدماتكم")}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full btn-outline-light px-7 py-4 text-sm sm:text-base text-white"
          >
            <MessageCircle className="h-5 w-5" /> تواصل عبر واتساب
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-white/70"
        >
          {CITIES.map((c) => (
            <span key={c} className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[color:var(--gold)]" /> {c}
            </span>
          ))}
        </motion.div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-white/50">
          <span className="text-[10px] tracking-widest">SCROLL</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------- STATS ---------------- */
function StatItem({ s, i, inView }: { s: (typeof STATS)[number]; i: number; inView: boolean }) {
  const n = useCount(s.value, inView, 1400 + i * 200);
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-5xl font-black text-gold-gradient" style={{ fontFamily: "var(--font-display)" }}>
        {n}{s.suffix}
      </div>
      <div className="mt-2 text-xs sm:text-sm text-white/70">{s.label}</div>
    </div>
  );
}

function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="relative -mt-16 z-20 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-3xl p-6 sm:p-10" style={{ background: "linear-gradient(135deg, #111 0%, #1a1a1a 100%)", boxShadow: "var(--shadow-luxury)" }}>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
          {STATS.map((s, i) => (
            <StatItem key={s.label} s={s} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp()} className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-[color:var(--gold)]" /> خدماتنا
          </div>
          <h2 className="section-title">حلول زجاجية متكاملة <span className="text-gold-gradient">لكل مساحة</span></h2>
          <p className="mt-4 text-muted-foreground">
            من الفلل الفاخرة إلى المكاتب والمحلات — ننفذ كل ما يخطر ببالك من أعمال الزجاج السيكوريت بأعلى معايير الجودة.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeUp(i * 0.05)}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--gold)]"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
            >
              <div className="absolute inset-x-0 top-0 h-[2px] scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100" style={{ background: "var(--gradient-gold)" }} />
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle, var(--glass-blue), transparent 70%)" }} />
              <div className="relative">
                <div className="grid h-14 w-14 place-items-center rounded-xl transition-all duration-500 group-hover:scale-110" style={{ background: "var(--gradient-glass)", border: "1px solid oklch(0.75 0.14 82 / 0.3)" }}>
                  <s.icon className="h-6 w-6 text-[color:var(--gold)]" strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--gold)] opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  اطلب الخدمة <ArrowLeft className="h-3.5 w-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY US ---------------- */
function WhyUs() {
  return (
    <section id="why" className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden" style={{ background: "linear-gradient(180deg, #0d0d0d 0%, #111 100%)" }}>
      <div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-20 blur-3xl" style={{ background: "var(--glass-blue)" }} />
      <div className="relative mx-auto max-w-7xl">
        <motion.div {...fadeUp()} className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-semibold text-white">
            <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--gold)]" /> لماذا الرواد
          </div>
          <h2 className="section-title text-white">سمعتنا مبنية على <span className="text-gold-gradient">الثقة والإتقان</span></h2>
          <p className="mt-4 text-white/70">نلتزم بتقديم أعلى معايير الجودة في كل تفصيلة، من أول معاينة حتى آخر تركيب.</p>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w, i) => (
            <motion.div
              key={w.title}
              {...fadeUp(i * 0.06)}
              className="group relative overflow-hidden rounded-2xl p-6 sm:p-7 transition-all duration-500 hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(201,162,39,0.08), transparent 40%)" }} />
              <div className="relative flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{ background: "var(--gradient-gold)" }}>
                  <w.icon className="h-5 w-5 text-[#111]" strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-white">{w.title}</h3>
                  <p className="mt-1 text-sm text-white/65 leading-relaxed">{w.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROCESS ---------------- */
function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(1000px circle at 50% 0%, oklch(0.75 0.14 82 / 0.08), transparent 60%)" }} />
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp()} className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold">
            <ClipboardList className="h-3.5 w-3.5 text-[color:var(--gold)]" /> خطوات العمل
          </div>
          <h2 className="section-title">من التواصل <span className="text-gold-gradient">حتى التسليم</span></h2>
          <p className="mt-4 text-muted-foreground">رحلة واضحة ومنظمة تضمن لك تجربة مريحة ونتيجة تليق بك.</p>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute top-8 right-0 left-0 hidden lg:block h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(0.75 0.14 82 / 0.4), transparent)" }} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                {...fadeUp(i * 0.08)}
                className="group relative rounded-2xl border border-border bg-card p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--gold)]"
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
              >
                <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl" style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}>
                  <s.icon className="h-7 w-7 text-[#111]" strokeWidth={1.8} />
                  <span className="absolute -top-2 -left-2 grid h-7 w-7 place-items-center rounded-full bg-[#111] text-[11px] font-black text-[color:var(--gold)]" dir="ltr">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-bold">{s.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */
function Projects() {
  const [filter, setFilter] = useState("الكل");
  const shown = filter === "الكل" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);
  return (
    <section id="projects" className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp()} className="flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold">
            <Frame className="h-3.5 w-3.5 text-[color:var(--gold)]" /> أعمالنا
          </div>
          <h2 className="section-title">مشاريع منجزة <span className="text-gold-gradient">تتحدث عن نفسها</span></h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">مجموعة مختارة من مشاريعنا في المنطقة الشرقية.</p>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="mt-8 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${filter === f ? "text-[#111] shadow-lg" : "bg-secondary text-foreground hover:bg-accent/40"}`}
              style={filter === f ? { background: "var(--gradient-gold)" } : {}}
            >
              {f}
            </button>
          ))}
        </motion.div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.a
                key={p.title}
                href="#contact"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group relative block overflow-hidden rounded-2xl bg-card"
                style={{ boxShadow: "var(--shadow-luxury)" }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 transition-opacity" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-[color:var(--gold)]">{p.cat}</div>
                  <div className="mt-1 text-lg font-bold text-white">{p.title}</div>
                </div>
                <div className="absolute top-4 left-4 grid h-10 w-10 place-items-center rounded-full opacity-0 -translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0" style={{ background: "var(--gradient-gold)" }}>
                  <ArrowUpLeft className="h-4 w-4 text-[#111]" />
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------------- BEFORE/AFTER ---------------- */
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(4, Math.min(96, (x / rect.width) * 100));
    setPos(pct);
  };

  useEffect(() => {
    const move = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const cx = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      setFromClientX(cx);
    };
    const up = () => (dragging.current = false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, []);

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6" style={{ background: "linear-gradient(180deg, transparent, oklch(0.97 0 0))" }}>
      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeUp()} className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold">
            <MoveHorizontal className="h-3.5 w-3.5 text-[color:var(--gold)]" /> قبل وبعد
          </div>
          <h2 className="section-title">تحوّل حقيقي <span className="text-gold-gradient">تراه بعينك</span></h2>
          <p className="mt-4 text-muted-foreground">اسحب المقبض لمشاهدة الفرق بعد التنفيذ.</p>
        </motion.div>

        <motion.div
          {...fadeUp(0.1)}
          ref={containerRef}
          className="relative mt-10 aspect-[4/3] sm:aspect-[16/9] w-full select-none overflow-hidden rounded-3xl"
          style={{ boxShadow: "var(--shadow-luxury)" }}
          onMouseDown={(e) => { dragging.current = true; setFromClientX(e.clientX); }}
          onTouchStart={(e) => { dragging.current = true; setFromClientX(e.touches[0].clientX); }}
        >
          <img src={afterImg} alt="بعد التنفيذ" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
            <img src={beforeImg} alt="قبل التنفيذ" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-y-0" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
            <div className="h-full w-[3px]" style={{ background: "var(--gradient-gold)" }} />
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full cursor-ew-resize" style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}>
              <MoveHorizontal className="h-5 w-5 text-[#111]" />
            </div>
          </div>
          <div className="absolute top-4 right-4 rounded-full glass-dark px-3 py-1 text-xs font-semibold text-white">قبل</div>
          <div className="absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold text-[#111]" style={{ background: "var(--gradient-gold)" }}>بعد</div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp()} className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold">
            <Star className="h-3.5 w-3.5 text-[color:var(--gold)]" /> آراء عملائنا
          </div>
          <h2 className="section-title">ثقة تُبنى <span className="text-gold-gradient">مشروعًا بعد مشروع</span></h2>
        </motion.div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              {...fadeUp(i * 0.06)}
              className="relative rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-[color:var(--gold)] text-[color:var(--gold)]" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-foreground/85">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="grid h-10 w-10 place-items-center rounded-full font-bold text-[#111]" style={{ background: "var(--gradient-gold)" }}>
                  {t.name.charAt(2)}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6" style={{ background: "#0d0d0d" }}>
      <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 items-center">
        <motion.div {...fadeUp()}>
          <div className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-semibold text-white">
            من نحن
          </div>
          <h2 className="mt-4 section-title text-white">
            الرواد للزجاج السيكوريت<br />
            <span className="text-gold-gradient">اسم يعني الجودة</span>
          </h2>
          <p className="mt-6 text-white/70 leading-loose">
            نحن في <strong className="text-white">{BRAND}</strong> نجمع بين الخبرة الطويلة والتقنية الحديثة لنقدم حلولًا زجاجية فاخرة في المنطقة الشرقية. منذ انطلاقتنا ونحن نلتزم بمعايير عالمية في اختيار الخامات، ودقة التفصيل، وسرعة التنفيذ، مع اهتمام حقيقي بأدق التفاصيل التي تصنع الفرق.
          </p>
          <p className="mt-4 text-white/60 leading-loose">
            نخدم عملاءنا في الدمام، الخبر، القطيف، الظهران، الجبيل وباقي مدن المنطقة الشرقية بفريق فني معتمد وضمان شامل على جميع الأعمال.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full btn-gold px-6 py-3 text-sm">تواصل معنا</a>
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full btn-outline-light px-6 py-3 text-sm">شاهد أعمالنا</a>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.15)} className="relative">
          <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: "var(--shadow-luxury)" }}>
            <img src={pStorefront} alt="أعمال الرواد" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden sm:block rounded-2xl p-5 glass-dark text-white max-w-xs">
            <div className="text-xs text-white/60">رؤيتنا</div>
            <div className="mt-1 font-bold">أن نكون الخيار الأول للزجاج الفاخر في المملكة.</div>
          </div>
          <div className="absolute -top-4 -left-4 h-24 w-24 rounded-2xl animate-float" style={{ background: "var(--gradient-gold)", opacity: 0.9 }} />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div {...fadeUp()} className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold">
            الأسئلة الشائعة
          </div>
          <h2 className="section-title">إجابات <span className="text-gold-gradient">شفافة</span> لكل استفساراتك</h2>
        </motion.div>
        <div className="mt-12 space-y-3">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                {...fadeUp(i * 0.04)}
                className="rounded-2xl border border-border bg-card overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-right"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-[color:var(--gold)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-5 pb-5 text-sm text-muted-foreground leading-loose">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const service = String(data.get("service") || "");
    const msg = String(data.get("msg") || "");
    const text = `مرحبًا الرواد،%0Aالاسم: ${name}%0Aالجوال: ${phone}%0Aالخدمة: ${service}%0Aالتفاصيل: ${msg}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6" style={{ background: "linear-gradient(180deg, #0d0d0d 0%, #111 100%)" }}>
      <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-2 items-start">
        <motion.div {...fadeUp()}>
          <div className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-semibold text-white">تواصل معنا</div>
          <h2 className="mt-4 section-title text-white">
            جاهزون لخدمتك<br />
            <span className="text-gold-gradient">في أي وقت</span>
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed">
            اطلب معاينة مجانية أو عرض سعر فوري. فريقنا يجيبك خلال دقائق.
          </p>

          <div className="mt-8 space-y-4">
            <a href={`tel:${PHONE}`} className="flex items-center gap-4 rounded-2xl glass-dark p-4 transition hover:bg-white/10">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{ background: "var(--gradient-gold)" }}>
                <Phone className="h-5 w-5 text-[#111]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-white/60">اتصل بنا</div>
                <div className="font-bold text-white" dir="ltr">{PHONE_DISPLAY}</div>
              </div>
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 rounded-2xl glass-dark p-4 transition hover:bg-white/10">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{ background: "var(--gradient-gold)" }}>
                <Mail className="h-5 w-5 text-[#111]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-white/60">البريد الإلكتروني</div>
                <div className="font-bold text-white truncate" dir="ltr">{EMAIL}</div>
              </div>
            </a>
            <div className="flex items-center gap-4 rounded-2xl glass-dark p-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{ background: "var(--gradient-gold)" }}>
                <MapPin className="h-5 w-5 text-[#111]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-white/60">مقر الشركة</div>
                <div className="font-bold text-white">الدمام — المنطقة الشرقية</div>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              src="https://www.google.com/maps?q=Dammam,Saudi+Arabia&output=embed"
              width="100%" height="240" loading="lazy" style={{ border: 0, filter: "grayscale(0.4) contrast(1.1)" }}
              referrerPolicy="no-referrer-when-downgrade" title="خريطة الموقع"
            />
          </div>
        </motion.div>

        <motion.form {...fadeUp(0.1)} onSubmit={submit} className="rounded-3xl bg-white p-6 sm:p-8" style={{ boxShadow: "var(--shadow-luxury)" }}>
          <h3 className="text-xl font-bold">احصل على عرض سعر مجاني</h3>
          <p className="mt-1 text-sm text-muted-foreground">املأ النموذج وسنعاود التواصل خلال أقل من ساعة.</p>
          <div className="mt-6 grid gap-4">
            <Field label="الاسم الكامل" name="name" placeholder="اسمك الكريم" required />
            <Field label="رقم الجوال" name="phone" type="tel" placeholder="05xxxxxxxx" required />
            <div>
              <label className="block text-xs font-semibold mb-1.5">نوع الخدمة</label>
              <select name="service" required className="w-full rounded-xl border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]">
                <option value="">اختر الخدمة</option>
                {SERVICES.map((s) => <option key={s.title}>{s.title}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5">تفاصيل إضافية</label>
              <textarea name="msg" rows={4} placeholder="اكتب تفاصيل مشروعك..." className="w-full rounded-xl border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]" />
            </div>
            <button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full btn-gold px-6 py-4 text-sm">
              إرسال الطلب عبر واتساب <MessageCircle className="h-4 w-4" />
            </button>
            {sent && <div className="text-center text-xs text-emerald-600">تم فتح واتساب لإرسال طلبك.</div>}
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-semibold mb-1.5">{label}</label>
      <input
        id={name} name={name} type={type} placeholder={placeholder} required={required}
        className="w-full rounded-xl border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
      />
    </div>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="relative bg-[#080808] text-white/70 px-4 sm:px-6 pt-16 pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: "var(--gradient-gold)" }}>
                <span className="font-black text-[#111]">ر</span>
              </div>
              <div>
                <div className="font-display font-extrabold text-white">الرواد</div>
                <div className="text-xs text-white/50">للزجاج السيكوريت</div>
              </div>
            </div>
            <p className="mt-4 text-sm max-w-md leading-relaxed">
              خبراء تفصيل وتركيب الزجاج السيكوريت في المنطقة الشرقية — واجهات، أبواب، شاور، درابزين ومرايا بأعلى معايير الجودة.
            </p>
          </div>

          <div>
            <div className="font-bold text-white mb-4">روابط سريعة</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-[color:var(--gold)]">خدماتنا</a></li>
              <li><a href="#projects" className="hover:text-[color:var(--gold)]">أعمالنا</a></li>
              <li><a href="#about" className="hover:text-[color:var(--gold)]">من نحن</a></li>
              <li><a href="#faq" className="hover:text-[color:var(--gold)]">الأسئلة الشائعة</a></li>
              <li><a href="#contact" className="hover:text-[color:var(--gold)]">تواصل</a></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white mb-4">المدن التي نخدمها</div>
            <ul className="space-y-2 text-sm">
              {CITIES.map((c) => (
                <li key={c} className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-[color:var(--gold)]" /> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div>© {new Date().getFullYear()} {BRAND}. جميع الحقوق محفوظة.</div>
          <div className="flex items-center gap-4">
            <a href={`tel:${PHONE}`} className="hover:text-[color:var(--gold)]" dir="ltr">{PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`} className="hover:text-[color:var(--gold)]" dir="ltr">{EMAIL}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- FLOATING ACTIONS ---------------- */
function FloatingActions() {
  return (
    <div className="fixed bottom-4 left-4 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("مرحبًا، أرغب في الاستفسار عن خدماتكم")}`}
        target="_blank" rel="noopener noreferrer"
        aria-label="تواصل عبر واتساب"
        className="group grid h-14 w-14 place-items-center rounded-full shadow-2xl transition-transform hover:scale-110"
        style={{ background: "#25D366" }}
      >
        <MessageCircle className="h-6 w-6 text-white" />
        <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: "#25D366" }} />
      </a>
      <a
        href={`tel:${PHONE}`}
        aria-label="اتصل الآن"
        className="grid h-14 w-14 place-items-center rounded-full shadow-2xl transition-transform hover:scale-110"
        style={{ background: "var(--gradient-gold)" }}
      >
        <Phone className="h-5 w-5 text-[#111]" />
      </a>
    </div>
  );
}
