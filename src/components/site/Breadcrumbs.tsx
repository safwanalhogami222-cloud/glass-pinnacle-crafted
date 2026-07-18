import { Link } from "@tanstack/react-router";
import { ChevronLeft, Home } from "lucide-react";
import { BASE_URL } from "@/lib/site-data";

export type Crumb = { label: string; to?: string; params?: Record<string, string> };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${BASE_URL}/` },
      ...items.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.label,
        ...(c.to
          ? { item: `${BASE_URL}${resolvePath(c.to, c.params)}` }
          : {}),
      })),
    ],
  };
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/70">
        <li>
          <Link to="/" className="inline-flex items-center gap-1 hover:text-[color:var(--gold)] transition">
            <Home className="h-3.5 w-3.5" /> الرئيسية
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={i} className="inline-flex items-center gap-1.5">
            <ChevronLeft className="h-3 w-3 opacity-50" />
            {c.to && i < items.length - 1 ? (
              <Link
                to={c.to as never}
                params={c.params as never}
                className="hover:text-[color:var(--gold)] transition"
              >
                {c.label}
              </Link>
            ) : (
              <span className="text-[color:var(--gold)] font-semibold">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}

function resolvePath(to: string, params?: Record<string, string>) {
  if (!params) return to;
  let out = to;
  for (const [k, v] of Object.entries(params)) out = out.replaceAll(`$${k}`, v);
  return out;
}
