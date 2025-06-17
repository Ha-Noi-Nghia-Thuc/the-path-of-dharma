/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: "var(--font-playfair-display)",
        body: "var(--font-noto-sans)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        primary: {
          DEFAULT: "#C9A66B", // Vàng nhạt – màu của áo cà sa, biểu tượng Phật pháp
          dark: "#A17D4D", // Dùng cho hover hoặc tiêu đề phụ
          light: "#F3E9D3", // Dùng cho nền nhẹ
        },
        accent: {
          DEFAULT: "#5C755E", // Xanh lá đất – tượng trưng cho sự phát triển, giác ngộ
          light: "#DDE8E2", // Nền phụ hoặc viền
        },
        text: {
          primary: "#2C2C2C", // Văn bản chính – đen nhẹ dịu mắt
          secondary: "#555555", // Phụ đề, mô tả ngắn
          muted: "#888888", // Chú thích, metadata
        },
        background: {
          DEFAULT: "#FCFBF7", // Nền chính – be ngà nhẹ, thân thiện mắt
          paper: "#F8F5F0", // Card, blockquote, sidebar
        },
        border: {
          DEFAULT: "#E0DED9", // Viền mỏng
        },
        error: {
          DEFAULT: "#B33A3A", // Màu đỏ trầm – cảnh báo
        },
        info: {
          DEFAULT: "#467CA3", // Xanh lam cổ – liên kết, thông báo
        },
        white: "#FFFFFF",
        black: "#000000",
      },
      screens: {
        xs: "480px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
