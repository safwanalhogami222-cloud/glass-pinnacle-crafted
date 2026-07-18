import { MessageCircle, Phone } from "lucide-react";
import { PHONE, WHATSAPP } from "@/lib/site-data";

export function FloatingActions() {
  return (
    <div className="fixed bottom-4 left-4 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("مرحبًا، أرغب في الاستفسار عن خدماتكم")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل عبر واتساب"
        className="relative grid h-14 w-14 place-items-center rounded-full shadow-2xl transition-transform hover:scale-110"
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
