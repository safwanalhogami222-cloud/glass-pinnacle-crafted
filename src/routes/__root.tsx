import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PHONE } from "@/lib/site-data";

const SITE_NAME = "الرواد للزجاج السيكوريت";
const SITE_DESC =
  "الرواد للزجاج السيكوريت — تفصيل وتركيب زجاج سيكوريت، واجهات زجاج، أبواب، شاور، درابزين ومرايا في الدمام والخبر والقطيف والظهران والجبيل والمنطقة الشرقية.";

function NotFoundComponent() {
  return (
    <div dir="rtl" className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-black text-gold-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full btn-gold px-6 py-3 text-sm"
          >
            العودة إلى الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div dir="rtl" className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">حدث خطأ غير متوقع</h1>
        <p className="mt-2 text-sm text-muted-foreground">حاول تحديث الصفحة أو العودة للرئيسية.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-full btn-gold px-5 py-2.5 text-sm"
          >
            إعادة المحاولة
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm hover:bg-accent">
            الرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "ajbTa3SSxoEPKCNpF_iNqxFFN_EJ_Su6SDUGra7lWVw" },
      { title: `${SITE_NAME} | زجاج سيكوريت بالمنطقة الشرقية` },
      { name: "description", content: SITE_DESC },
      { name: "author", content: SITE_NAME },
      { name: "theme-color", content: "#111111" },
      { name: "keywords", content: "تركيب زجاج سيكوريت, تفصيل زجاج, واجهات زجاج, شاور زجاج, درابزين زجاج, أبواب زجاج, مرايا, زجاج مكاتب, زجاج طاولات, تركيب زجاج بالدمام, زجاج سيكوريت الخبر, زجاج القطيف, الرواد للزجاج السيكوريت" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: `${SITE_NAME} | زجاج سيكوريت بالمنطقة الشرقية` },
      { property: "og:description", content: SITE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ar_SA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_NAME },
      { name: "twitter:description", content: SITE_DESC },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/OLYltlrAckcer0SGKNoQvsyKwxy1/social-images/social-1784407358116-1000212118.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/OLYltlrAckcer0SGKNoQvsyKwxy1/social-images/social-1784407358116-1000212118.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: SITE_NAME,
          image: "https://www.rowadglass.com/favicon.png",
          url: "https://www.rowadglass.com/",
          description: SITE_DESC,
          telephone: PHONE,
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            addressLocality: "الدمام",
            addressRegion: "المنطقة الشرقية",
            addressCountry: "SA",
          },
          areaServed: ["الدمام", "الخبر", "القطيف", "الظهران", "الجبيل", "رأس تنورة", "المنطقة الشرقية"],
          sameAs: [],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-dvh bg-background text-foreground">
        <Nav />
        <main>
          <Outlet />
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </QueryClientProvider>
  );
}
