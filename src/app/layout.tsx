import { auth } from "@/auth";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Noto_Sans, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
  authors: [
    {
      name: "Hà Nội Nghĩa Thục",
      url: "https://the-path-of-dharma.vercel.app/",
    },
  ],
  creator: "Hà Nội Nghĩa Thục",
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
    url: "https://the-path-of-dharma.vercel.app/",
    siteName: "Chánh Đạo - The Path of Dharma",
    images: [
      {
        url: "https://imagekit.io/public/share/4xz2wxxpg/332e4273020f5ffd53b6eeebfe70ff28c0303b775a2ff1e58bad2fcfba2ae45a6cb7479ff3e5b317079da2924ee1115ee433436978a8059b35c8704e41016dd070f7fa314ef78cab006522c7d1e75b10",
        width: 1200,
        height: 630,
        alt: "Chánh Đạo - The Path of Dharma - Kinh điển Phật giáo",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  return (
    <html lang="vi">
      <SessionProvider session={session}>
        <body className={`${playfairDisplay.variable} ${notoSans.variable}`}>
          {children}

          <Toaster position="bottom-right" />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
