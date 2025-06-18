import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const generateEmailTemplate = (
  type: "welcome" | "remind7" | "remind30",
  { fullName }: { fullName: string }
): { subject: string; html: string } => {
  switch (type) {
    case "welcome":
      return {
        subject: "Chào mừng đến với Hà Nội Nghĩa Thục",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #8B4513;">🙏 Chào mừng ${fullName},</h2>
          <p>Chúng tôi rất vui mừng khi bạn đã gia nhập <strong>Hà Nội Nghĩa Thục</strong> – nơi chia sẻ, nghiên cứu và học hỏi các kinh điển Phật giáo.</p>
          <p>Hãy bắt đầu hành trình khám phá trí tuệ và an lạc.</p>
          <a href="https://yourdomain.com/kinh" style="display: inline-block; margin-top: 16px; padding: 12px 20px; background-color: #FFD700; color: black; text-decoration: none; border-radius: 6px;">📖 Khám phá Kinh điển</a>
          <p style="margin-top: 32px; font-size: 12px; color: #888;">Nếu bạn không đăng ký, hãy bỏ qua email này.</p>
        </div>`,
      };

    case "remind7":
      return {
        subject: "Chúng tôi nhớ bạn!",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #8B4513;">📿 Xin chào ${fullName},</h2>
          <p>Đã 7 ngày kể từ lần cuối bạn ghé thăm <strong>Hà Nội Nghĩa Thục</strong>. Những bài giảng và kinh điển vẫn đang chờ bạn khám phá!</p>
          <p>Quay lại để tiếp tục hành trình học tập của bạn nhé.</p>
          <a href="https://yourdomain.com/kinh" style="display: inline-block; margin-top: 16px; padding: 12px 20px; background-color: #FFA500; color: white; text-decoration: none; border-radius: 6px;">➡️ Quay lại học tập</a>
          <p style="margin-top: 32px; font-size: 12px; color: #888;">Chúc bạn một ngày an lạc.</p>
        </div>`,
      };

    case "remind30":
      return {
        subject: "Bạn vẫn còn ở đó chứ?",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #8B0000;">⏳ Đã 1 tháng rồi, ${fullName} ơi...</h2>
          <p>Hà Nội Nghĩa Thục vẫn ở đây, cùng bạn tiếp tục con đường tìm về chân lý và trí tuệ.</p>
          <p>Quay lại ngay hôm nay để tiếp tục học hỏi và sẻ chia.</p>
          <a href="https://yourdomain.com/kinh" style="display: inline-block; margin-top: 16px; padding: 12px 20px; background-color: #CD5C5C; color: white; text-decoration: none; border-radius: 6px;">🧘‍♀️ Tiếp tục hành trình</a>
          <p style="margin-top: 32px; font-size: 12px; color: #888;">Chúng tôi luôn sẵn sàng chào đón bạn trở lại.</p>
        </div>`,
      };

    default:
      throw new Error("Invalid email type");
  }
};
