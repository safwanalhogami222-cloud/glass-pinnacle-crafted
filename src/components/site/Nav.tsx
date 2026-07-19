import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X, ChevronDown } from "lucide-react";
import { PHONE, PHONE_DISPLAY, SERVICES_META } from "@/lib/site-data";
import logoUrl from "@/assets/logo-horizontal.png";
const logo = { url: logoUrl };

const LINKS = [
  { to: "/", label: "الرئيسية" },
  { to: "/services", label: "خدماتنا" },
  { to: "/gallery", label: "معرض الأعمال" },
  { to: "/contact", label: "تواصل معنا" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-500 ${scrolled ? "glass-dark shadow-2xl" : "bg-transparent"}`}>
          <Link to="/" className="flex items-center gap-3 order-2">
            <img src={logo.url} alt="الرواد للزجاج السيكوريت" className="h-12 sm:h-14 w-auto object-contain" />
          </Link>

          <nav className="hidden md:flex items-center gap-1 order-1">
            {LINKS.map((l) =>
              l.to === "/services" ? (
                <div
                  key={l.to}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    to={l.to}
                    className="flex items-center gap-1 rounded-full px-4 py-2 text-sm text-white/85 hover:text-white hover:bg-white/10 transition"
                    activeProps={{ className: "flex items-center gap-1 rounded-full px-4 py-2 text-sm text-[color:var(--gold)] bg-white/10 transition" }}
                  >
                    {l.label} <ChevronDown className="h-3 w-3" />
                  </Link>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 w-64 rounded-2xl glass-dark p-2 shadow-2xl"
                      >
                        {SERVICES_META.map((s) => (
                          <Link
                            key={s.slug}
                            to="/services/$slug"
                            params={{ slug: s.slug }}
                            className="block rounded-lg px-3 py-2 text-sm text-white/85 hover:bg-white/10 hover:text-[color:var(--gold)] transition"
                          >
                            {s.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  className="rounded-full px-4 py-2 text-sm text-white/85 hover:text-white hover:bg-white/10 transition"
                  activeProps={{ className: "rounded-full px-4 py-2 text-sm text-[color:var(--gold)] bg-white/10 transition" }}
                  activeOptions={{ exact: true }}
                >
                  {l.label}
                </Link>
              ),
            )}
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
                {LINKS.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-white/90 hover:bg-white/10"
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="mt-2 mb-1 px-3 text-[11px] font-semibold text-white/50">الخدمات</div>
                {SERVICES_META.map((s) => (
                  <Link
                    key={s.slug}
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-white/75 hover:bg-white/10"
                  >
                    — {s.title}
                  </Link>
                ))}
                <Link to="/contact" onClick={() => setOpen(false)} className="mt-3 text-center rounded-full btn-gold px-5 py-3 text-sm">
                  احصل على عرض سعر مجاني
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
