import type { Metadata } from "next";
import { Noto_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin", "vietnamese"],
  weight: ["700"],
  display: "swap",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chánh Đạo - The Path of Dharma",
  description:
    "Trang web nghiên cứu và đọc tụng Kinh điển Phật giáo hoàn toàn miễn phí.",
  keywords: [
    "Phật giáo",
    "Kinh Phật",
    "Kinh điển",
    "Đạo Phật",
    "Tu học",
    "Tụng kinh",
    "Kinh Pháp Cú",
    "Phật pháp",
    "Chánh Đạo - The Path of Dharma",
    "Tâm linh",
    "Thiền",
  ],
  // authors: [{ name: "Hà Nội Nghĩa Thục", url: "https://yourdomain.com" }],
  creator: "Hà Nội Nghĩa Thục",
  themeColor: "#FCFBF7",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Chánh Đạo - The Path of Dharma",
    description:
      "Khám phá kho tàng Kinh điển Phật giáo — tụng đọc, nghiên cứu và chiêm nghiệm.",
    url: "https://yourdomain.com",
    siteName: "Chánh Đạo - The Path of Dharma",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chánh Đạo - The Path of Dharma - Kinh điển Phật giáo",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${playfairDisplay.variable} ${notoSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
