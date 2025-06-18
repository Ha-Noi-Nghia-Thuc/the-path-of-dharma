import type React from "react";
import { auth } from "@/auth";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Noto_Sans, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Chánh Đạo - Thư viện Kinh điển Phật giáo",
    template: "%s | Chánh Đạo",
  },
  description:
    "Thư viện Kinh điển Phật giáo trực tuyến - Nơi lưu giữ và chia sẻ kho tàng trí tuệ Phật pháp. Đọc, nghiên cứu và thực hành giáo lý Đức Phật một cách thuận tiện và miễn phí.",
  keywords: [
    "Phật giáo",
    "Kinh Phật",
    "Kinh điển",
    "Đạo Phật",
    "Tu học",
    "Tụng kinh",
    "Phật pháp",
    "Chánh Đạo",
    "Thư viện Phật giáo",
    "Tam Tạng",
    "Thiền",
    "Giác ngộ",
    "Trí tuệ",
    "Từ bi",
  ],
  authors: [
    {
      name: "Chánh Đạo",
      url: "https://the-path-of-dharma.vercel.app/",
    },
  ],
  creator: "Chánh Đạo",
  publisher: "Chánh Đạo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://the-path-of-dharma.vercel.app/",
    siteName: "Chánh Đạo - Thư viện Kinh điển Phật giáo",
    title: "Chánh Đạo - Thư viện Kinh điển Phật giáo",
    description:
      "Thư viện Kinh điển Phật giáo trực tuyến - Nơi lưu giữ và chia sẻ kho tàng trí tuệ Phật pháp",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chánh Đạo - Thư viện Kinh điển Phật giáo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chánh Đạo - Thư viện Kinh điển Phật giáo",
    description:
      "Thư viện Kinh điển Phật giáo trực tuyến - Nơi lưu giữ và chia sẻ kho tàng trí tuệ Phật pháp",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://the-path-of-dharma.vercel.app/",
  },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Chánh Đạo",
              description: "Thư viện Kinh điển Phật giáo trực tuyến",
              url: "https://the-path-of-dharma.vercel.app/",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://the-path-of-dharma.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <SessionProvider session={session}>
        <body
          className={`${playfairDisplay.variable} ${notoSans.variable} antialiased`}
        >
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "hsl(var(--card))",
                color: "hsl(var(--card-foreground))",
                border: "1px solid hsl(var(--border))",
              },
            }}
          />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
