import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { BASE_URL, WHATSAPP } from "@/lib/site-data";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import videoAsset from "@/assets/glass-railing-installation.mp4.asset.json";
import posterAsset from "@/assets/glass-railing-poster.jpg.asset.json";

export const RAILING_VIDEO_URL = videoAsset.url;
export const RAILING_VIDEO_POSTER = posterAsset.url;

const VIDEO_TITLE = "تركيب درابزين زجاج سيكوريت مع ستانلس ستيل";
const VIDEO_DESC =
  "شاهد تنفيذ وتركيب درابزين زجاج سيكوريت مع ستانلس ستيل بأيدي فنيين متخصصين، مع الاهتمام بدقة القياسات وجودة التثبيت والتشطيب النهائي.";

export const railingVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: VIDEO_TITLE,
  description: VIDEO_DESC,
  thumbnailUrl: [`${BASE_URL}${RAILING_VIDEO_POSTER}`],
  contentUrl: `${BASE_URL}${RAILING_VIDEO_URL}`,
  uploadDate: "2026-04-26",
  inLanguage: "ar",
  publisher: {
    "@type": "Organization",
    name: "الرواد للزجاج السيكوريت",
  },
};

const WA_LINK = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  "السلام عليكم، أرغب في عرض سعر لتركيب درابزين زجاج سيكوريت مع ستانلس ستيل",
)}`;

/** Video player with poster + click-to-load (lazy) */
function Player({ rounded = "rounded-2xl" }: { rounded?: string }) {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`relative w-full max-w-full overflow-hidden ${rounded} bg-black`}
      style={{ boxShadow: "var(--shadow-luxury)" }}
    >
      <div className="aspect-video w-full max-w-full">
        {active ? (
          <video
            className="block h-full w-full max-w-full object-contain bg-black"
            src={RAILING_VIDEO_URL}
            poster={RAILING_VIDEO_POSTER}
            controls
            autoPlay
            playsInline
            preload="metadata"
            controlsList="nodownload"
            title={VIDEO_TITLE}
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            className="group relative block h-full w-full"
            aria-label={`تشغيل الفيديو: ${VIDEO_TITLE}`}
          >
            <img
              src={RAILING_VIDEO_POSTER}
              alt="تركيب درابزين زجاج سيكوريت مع ستانلس ستيل في الدمام"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/25" />
            <span
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[#111] transition-transform group-hover:scale-110 sm:h-20 sm:w-20"
              style={{ background: "var(--gradient-gold)" }}
            >
              <Play className="h-7 w-7 sm:h-8 sm:w-8 translate-x-[1px]" fill="currentColor" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

/** Full section — used on the gallery page */
export function RailingVideoSection() {
  return (
    <section id="railing-video" className="w-full overflow-hidden px-4 sm:px-6 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold">
            <Play className="h-3.5 w-3.5 text-[color:var(--gold)]" /> فيديو من الموقع
          </div>
          <h2 className="section-title">
            مشاهدة أعمالنا في تنفيذ وتركيب <span className="text-gold-gradient">الدرابزين الزجاجي</span>
          </h2>
        </div>

        <div className="mt-8 grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="min-w-0">
            <Player />
          </div>

          <div className="min-w-0 text-right">
            <p className="text-base sm:text-lg leading-relaxed text-foreground/85">{VIDEO_DESC}</p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
              نُنفّذ <strong className="text-foreground">درابزين زجاج</strong> و
              <strong className="text-foreground"> درابزين زجاج ستانلس ستيل</strong> للسلالم والشرفات والمداخل، مع
              خبرة واسعة في <strong className="text-foreground">تركيب درابزين زجاج</strong> بمقاسات دقيقة. وإذا كنت
              تبحث عن <strong className="text-foreground">درابزين زجاج بالدمام</strong> بتصميم
              <strong className="text-foreground"> درابزين زجاج مودرن</strong>، فريقنا متخصص في
              <strong className="text-foreground"> تركيب درابزين زجاج سيكوريت</strong> مع ضمان على التنفيذ.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-[#111] transition-transform hover:scale-105"
                style={{ background: "var(--gradient-gold)" }}
              >
                <WhatsAppIcon className="h-4 w-4" /> اطلب عرض سعر
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-6 py-3 text-sm font-bold transition-colors hover:bg-accent/40"
              >
                صفحة التواصل
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Compact teaser — used on the home page */
export function RailingVideoTeaser() {
  return (
    <section className="w-full overflow-hidden px-4 sm:px-6 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <h2 className="section-title">
            مشاهدة أعمالنا في تنفيذ وتركيب <span className="text-gold-gradient">الدرابزين الزجاجي</span>
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">{VIDEO_DESC}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mt-8 w-full min-w-0"
        >
          <Player />
        </motion.div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/gallery"
            hash="railing-video"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-[#111] transition-transform hover:scale-105"
            style={{ background: "var(--gradient-gold)" }}
          >
            شاهد تنفيذ الدرابزين
          </Link>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-6 py-3 text-sm font-bold transition-colors hover:bg-accent/40"
          >
            <WhatsAppIcon className="h-4 w-4" /> اطلب عرض سعر
          </a>
        </div>
      </div>
    </section>
  );
}
