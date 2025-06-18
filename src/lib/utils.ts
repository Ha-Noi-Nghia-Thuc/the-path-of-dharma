import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// utility function to combine Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// get initials from a full name, returns first 2 uppercase letters
export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// email template generator
export const generateEmailTemplate = (
  type: "welcome" | "remind7" | "remind30",
  { fullName }: { fullName: string }
): { subject: string; html: string } => {
  // shared CSS styles embedded in every email
  const baseStyles = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Allura&family=Merriweather:ital,opsz,wght@0,300..900;1,300..900&display=swap');
      
      .email-container {
        font-family: 'Merriweather', Georgia, serif; /* Changed to Merriweather */
        font-weight:400;
        max-width: 560px;
        margin: 0 auto;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(139, 69, 19, 0.08);
      }
      
      .logo {
        color: #FFFFFF;
        font-family: "Allura", cursive; /* Allura for logo */
        font-size: 35px;
        font-weight: 400;
        margin: 0;
      }
      
      .content {
        padding: 40px;
        background: #FFFEF7;
      }
      
      .greeting {
        color: #5D4037;
        font-size: 20px;
        font-weight: 400;
        margin: 0 0 24px 0;
        line-height: 1.4;
      }
      
      .message {
        color: #000000;
        font-size: 16px;
        line-height: 1.7;
        margin: 0 0 20px 0;
      }
      
      .cta-button {
        display: inline-block;
        margin: 32px 0;
        padding: 16px 32px;
        background: #A17D4D;
        color: #FFFFFF !important;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 500;
        font-size: 15px;
        letter-spacing: 0.5px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 16px rgba(139, 69, 19, 0.2);
      }
      
      .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(139, 69, 19, 0.3);
      }
      
      .footer {
        padding: 24px 40px;
        background: #F5F3F0;
        border-top: 1px solid #E8E3DE;
        text-align: center;
      }
      
      .footer-text {
        color: #8D6E63;
        font-size: 13px;
        line-height: 1.5;
        margin: 0;
      }
      
      .divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, #D7CCC8, transparent);
        margin: 24px 0;
      }
    </style>
  `;

  // email content based on type
  switch (type) {
    case "welcome":
      return {
        subject: "Chào mừng bạn đến với Chánh Đạo",
        html: `
${baseStyles}
<div class="email-container">
  <div class="content">
    <h2 class="greeting">Kính chào ${fullName},</h2>
    
    <p class="message">
      Chúng tôi hoan hỷ chào đón bạn đến với <strong>Chánh Đạo</strong> – thư viện Phật pháp trực tuyến,
      nơi gìn giữ, lan toả và giúp tiếp cận kho tàng trí tuệ từ Tam Tạng Kinh Điển.
    </p>
    
    <p class="message">
      Trên hành trình tu học, tri thức là ngọn đèn soi sáng. Chúng tôi mong được là một phần nhỏ 
      hỗ trợ bạn trên con đường hướng về Chánh Pháp.
    </p>
    
    <div class="divider"></div>
    
    <a href="https://the-path-of-dharma.vercel.app/" class="cta-button">
      Bắt đầu khám phá
    </a>
    
    <p class="message" style="margin-top: 32px; font-size: 14px; font-style: italic;">
      “Không có con đường dẫn đến hạnh phúc, hạnh phúc chính là con đường.”<br />
      – Đức Phật
    </p>
  </div>
  
  <div class="footer">
    <p class="footer-text">
      Cảm ơn bạn đã tin tưởng Chánh Đạo.<br>
      Nguyện cho bạn luôn được bình an và vững chãi trên hành trình tâm linh.
    </p>
  </div>
</div>`,
      };

    case "remind7":
      return {
        subject: "Tiếp tục gieo trồng trí tuệ - Chánh Đạo",
        html: `
${baseStyles}
<div class="email-container">
  <div class="content">
    <h2 class="greeting">Kính gửi ${fullName},</h2>
    
    <p class="message">
      Đã bảy ngày kể từ lần cuối bạn ghé thăm <strong>Chánh Đạo</strong>. Những bài kinh quý báu vẫn đang chờ đợi bạn tiếp tục khám phá.
    </p>
    
    <p class="message">
      Pháp học cần sự đều đặn. Mỗi ngày, dù chỉ một đoạn kinh, một câu kệ, cũng góp phần nuôi dưỡng chánh niệm và tuệ giác.
    </p>
    
    <div class="divider"></div>
    
    <a href="https://the-path-of-dharma.vercel.app/" class="cta-button">
      Tiếp tục hành trình
    </a>
    
    <p class="message" style="margin-top: 32px; font-size: 14px; font-style: italic;">
      “Giống như nước nhỏ giọt đều đặn có thể làm đầy bình, người trí cũng vậy, từng chút thiện hạnh sẽ làm đầy tâm.”<br />
      – Kinh Pháp Cú, kệ 122
    </p>
  </div>
  
  <div class="footer">
    <p class="footer-text">
      Chúng tôi luôn đồng hành cùng bạn trên con đường học Phật.<br>
      Nam mô Bổn Sư Thích Ca Mâu Ni Phật.
    </p>
  </div>
</div>`,
      };

    case "remind30":
      return {
        subject: "Ánh sáng Chánh Pháp vẫn luôn hiện hữu - Chánh Đạo",
        html: `
${baseStyles}
<div class="email-container">
  <div class="content">
    <h2 class="greeting">Kính gửi ${fullName},</h2>
    
    <p class="message">
      Đã một tháng kể từ lần cuối bạn dừng lại tại <strong>Chánh Đạo</strong>. Trong guồng quay của cuộc sống, chúng ta dễ quên mất ánh sáng Pháp.
    </p>
    
    <p class="message">
      Nhưng Chánh Pháp luôn ở đó, như ánh trăng soi sáng đêm tối – chỉ cần bạn dừng lại, là có thể thấy rõ.
    </p>
    
    <div class="divider"></div>
    
    <a href="https://the-path-of-dharma.vercel.app/" class="cta-button">
      Quay về nương tựa Pháp
    </a>
    
    <p class="message" style="margin-top: 32px; font-size: 14px; font-style: italic;">
      “Hãy tự mình là ngọn đèn cho chính mình, hãy tự mình nương tựa chính mình, không nương tựa một ai khác.”<br />
      – Đức Phật, Kinh Đại Bát Niết Bàn
    </p>
  </div>
  
  <div class="footer">
    <p class="footer-text">
      Chúng tôi luôn mở rộng vòng tay đón chào sự trở lại của bạn.<br>
      Nguyện cho bạn luôn tinh tấn và an lạc.
    </p>
  </div>
</div>`,
      };

    default:
      throw new Error("Invalid email type");
  }
};
