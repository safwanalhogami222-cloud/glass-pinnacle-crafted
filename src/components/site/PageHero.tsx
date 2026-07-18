import { motion } from "framer-motion";

export function PageHero({
  eyebrow,
  title,
  goldTitle,
  desc,
  image,
}: {
  eyebrow?: string;
  title: string;
  goldTitle?: string;
  desc?: string;
  image?: string;
}) {
  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden bg-[#0a0a0a]">
      {image && (
        <>
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" loading="eager" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.85) 100%)" }} />
        </>
      )}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-25 blur-3xl" style={{ background: "radial-gradient(circle, #7CC7E8 0%, transparent 70%)" }} />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #C9A227 0%, transparent 70%)" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {eyebrow && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-semibold text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold)]" /> {eyebrow}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-5 max-w-3xl text-4xl sm:text-6xl font-black leading-tight text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title} {goldTitle && <span className="text-gold-gradient">{goldTitle}</span>}
        </motion.h1>
        {desc && (
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }} className="mt-5 max-w-2xl text-base sm:text-lg text-white/75 leading-relaxed">
            {desc}
          </motion.p>
        )}
      </div>
    </section>
  );
}
