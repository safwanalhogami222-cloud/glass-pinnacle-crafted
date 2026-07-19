import { useState } from "react";
import { motion } from "framer-motion";
import { CITIES, SERVICES_META, WHATSAPP } from "@/lib/site-data";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function QuoteForm({ defaultService, compact = false }: { defaultService?: string; compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const [fileName, setFileName] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const city = String(data.get("city") || "");
    const service = String(data.get("service") || "");
    const msg = String(data.get("msg") || "");
    const file = data.get("photo") as File | null;
    const hasPhoto = file && file.size > 0 ? `%0Aمرفق صورة: ${file.name} (سأرسلها في المحادثة)` : "";
    const text = `مرحبًا الرواد،%0Aالاسم: ${name}%0Aالجوال: ${phone}%0Aالمدينة: ${city}%0Aالخدمة: ${service}%0Aالتفاصيل: ${msg}${hasPhoto}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
    setSent(true);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onSubmit={submit}
      className={`rounded-3xl bg-white ${compact ? "p-5 sm:p-6" : "p-6 sm:p-8"}`}
      style={{ boxShadow: "var(--shadow-luxury)" }}
    >
      <h3 className="text-xl font-bold">احصل على عرض سعر مجاني</h3>
      <p className="mt-1 text-sm text-muted-foreground">املأ النموذج وسنعاود التواصل خلال أقل من ساعة.</p>
      <div className="mt-6 grid gap-4">
        <Field label="الاسم الكامل" name="name" placeholder="اسمك الكريم" required />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="رقم الجوال" name="phone" type="tel" placeholder="05xxxxxxxx" required />
          <div>
            <label htmlFor="city" className="block text-xs font-semibold mb-1.5">المدينة</label>
            <select id="city" name="city" required className="w-full rounded-xl border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]">
              <option value="">اختر المدينة</option>
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="service" className="block text-xs font-semibold mb-1.5">نوع الخدمة</label>
          <select id="service" name="service" required defaultValue={defaultService ?? ""} className="w-full rounded-xl border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]">
            <option value="">اختر الخدمة</option>
            {SERVICES_META.map((s) => <option key={s.slug}>{s.title}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5">صورة الموقع (اختياري)</label>
          <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-input bg-secondary/50 px-4 py-3 text-sm hover:border-[color:var(--gold)] transition">
            <span className="truncate text-muted-foreground">{fileName || "اختر صورة من جهازك (JPG/PNG)"}</span>
            <span className="shrink-0 rounded-full bg-[#111] px-3 py-1 text-xs font-bold text-[color:var(--gold)]">تصفح</span>
            <input type="file" name="photo" accept="image/*" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
          </label>
          <p className="mt-1 text-[11px] text-muted-foreground">ملاحظة: بعد الضغط على الإرسال، أرفق الصورة داخل محادثة واتساب.</p>
        </div>
        <div>
          <label htmlFor="msg" className="block text-xs font-semibold mb-1.5">تفاصيل إضافية</label>
          <textarea id="msg" name="msg" rows={4} placeholder="اكتب تفاصيل مشروعك..." className="w-full rounded-xl border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]" />
        </div>
        <button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full btn-gold px-6 py-4 text-sm">
          إرسال الطلب عبر واتساب <WhatsAppIcon size={16} />
        </button>
        {sent && <div className="text-center text-xs text-emerald-600">تم فتح واتساب لإرسال طلبك.</div>}
      </div>
    </motion.form>
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
