import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { BRAND, EMAIL, PHONE, PHONE_DISPLAY, SERVICES_META, WHATSAPP } from "@/lib/site-data";
import { WhatsAppIcon } from "./WhatsAppIcon";
const logo = { url: "/images/logo-horizontal.png" };

const socials = [
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "Twitter" },
  { icon: Facebook, label: "Facebook" },
  { icon: Youtube, label: "Youtube" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#080808] text-white/70 px-4 sm:px-6 pt-20 pb-8">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(0.75 0.14 82 / 0.6), transparent)" }} />
      <div className="absolute -top-32 right-1/4 h-64 w-64 rounded-full opacity-20 blur-3xl" style={{ background: "var(--gold)" }} />
      <div className="absolute -bottom-40 left-1/4 h-72 w-72 rounded-full opacity-10 blur-3xl" style={{ background: "var(--glass-blue)" }} />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6" style={{ background: "linear-gradient(135deg, #141414, #1c1c1c)", border: "1px solid rgba(201,162,39,0.2)", boxShadow: "var(--shadow-luxury)" }}>
          <div className="text-center sm:text-right">
            <h3 className="text-xl sm:text-2xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>
              جاهز لتبدأ مشروعك؟ <span className="text-gold-gradient">اتصل بنا الآن</span>
            </h3>
            <p className="mt-2 text-sm text-white/60">معاينة مجانية وعرض سعر خلال ساعة.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full btn-gold px-6 py-3 text-sm" dir="ltr">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full btn-outline-light px-6 py-3 text-sm">
              <WhatsAppIcon size={16} /> واتساب
            </a>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo.url} alt="الرواد للزجاج السيكوريت" className="h-16 w-auto object-contain" />
            </div>
            <p className="mt-5 text-sm max-w-md leading-relaxed">
              خبراء تفصيل وتركيب الزجاج السيكوريت في المنطقة الشرقية — واجهات، أبواب، شاور، درابزين ومرايا بأعلى معايير الجودة العالمية.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  aria-label={s.label}
                  title="قريبًا"
                  className="group grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:-translate-y-0.5"
                >
                  <s.icon className="h-4 w-4 text-white/70 transition-colors group-hover:text-[#111]" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="font-bold text-white mb-4">خدماتنا</div>
            <ul className="space-y-2.5 text-sm">
              {SERVICES_META.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-[color:var(--gold)] transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-bold text-white mb-4">تواصل معنا</div>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`tel:${PHONE}`} className="flex items-center gap-2 hover:text-[color:var(--gold)] transition-colors" dir="ltr">
                  <Phone className="h-4 w-4 text-[color:var(--gold)]" /> {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[color:var(--gold)] transition-colors">
                  <WhatsAppIcon size={16} className="text-[color:var(--gold)]" /> واتساب
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-[color:var(--gold)] transition-colors" dir="ltr">
                  <Mail className="h-4 w-4 text-[color:var(--gold)]" /> {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[color:var(--gold)]" /> الدمام — المنطقة الشرقية
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div>© {new Date().getFullYear()} {BRAND}. جميع الحقوق محفوظة.</div>
          <div className="flex items-center gap-2">
            <span>صُنع بعناية في</span>
            <span className="text-gold-gradient font-bold">المملكة العربية السعودية</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
