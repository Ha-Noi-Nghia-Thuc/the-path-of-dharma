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
  // Modern CSS styles matching your project's design system
  const baseStyles = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Noto+Sans:wght@300;400;500;600&display=swap');
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      .email-container {
        font-family: "Noto Sans", -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 14px;
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        border: 1px solid #e5e7eb;
      }
      
      .content {
        padding: 40px;
        background: #ffffff;
      }
      
      .greeting {
        font-family: "Playfair Display", serif;
        color: #333333;
        font-size: 22px;
        font-weight: 500;
        margin: 0 0 24px 0;
        line-height: 1.3;
        letter-spacing: -0.025em;
      }
      
      .message {
        color: #4b5563;
        font-size: 14px;
        line-height: 1.6;
        margin: 0 0 18px 0;
        font-weight: 400;
      }
      
      .message strong {
        color: #333333;
        font-weight: 500;
      }
      
      .cta-button {
        display: inline-block;
        margin: 28px 0;
        padding: 12px 24px;
        background: #333333;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 500;
        font-size: 14px;
        letter-spacing: 0.025em;
        transition: all 0.2s ease;
        border: 1px solid #333333;
      }
      
      .cta-button:hover {
        background: #1f2937;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      
      .quote {
        background: #fafafa;
        border-left: 3px solid #d1d5db;
        padding: 20px 24px;
        margin: 28px 0;
        border-radius: 0 8px 8px 0;
      }
      
      .quote-text {
        font-family: "Playfair Display", serif;
        color: #4b5563;
        font-size: 15px;
        line-height: 1.6;
        font-style: italic;
        margin: 0;
        font-weight: 400;
      }
      
      .quote-author {
        color: #6b7280;
        font-size: 13px;
        font-weight: 500;
        margin-top: 12px;
        text-align: right;
        font-family: "Noto Sans", sans-serif;
      }
      
      .footer {
        padding: 32px 40px;
        background: #fafafa;
        border-top: 1px solid #e5e7eb;
        text-align: center;
      }
      
      .footer-text {
        color: #6b7280;
        font-size: 13px;
        line-height: 1.5;
        margin: 0;
      }
      
      .divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
        margin: 24px 0;
      }
      
      .highlight {
        background: #f3f4f6;
        padding: 2px 6px;
        border-radius: 4px;
        color: #374151;
        font-weight: 500;
        border: 1px solid #e5e7eb;
      }
      
      .lotus-symbol {
        color: #9ca3af;
        font-size: 16px;
        margin: 16px 0;
        text-align: center;
      }
      
      @media (max-width: 640px) {
        .email-container {
          margin: 0 16px;
          border-radius: 8px;
        }
        
        .header, .content, .footer {
          padding: 24px 20px;
        }
        
        .greeting {
          font-size: 20px;
        }
        
        .message {
          font-size: 14px;
        }
        
        .cta-button {
          display: block;
          text-align: center;
          margin: 24px 0;
        }
      }
    </style>
  `;

  // Email content based on type
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
      nơi gìn giữ, lan toả và giúp tiếp cận kho tàng trí tuệ từ <span class="highlight">Tam Tạng Kinh Điển</span>.
    </p>
    
    <p class="message">
      Trên hành trình tu học, tri thức là ngọn đèn soi sáng. Chúng tôi mong được là một phần nhỏ 
      hỗ trợ bạn trên con đường hướng về Chánh Pháp.
    </p>
    
    <div class="divider"></div>
    
    <a href="https://the-path-of-dharma.vercel.app/" class="cta-button">
      Bắt đầu khám phá →
    </a>
    
    <div class="quote">
      <p class="quote-text">
        "Không có con đường dẫn đến hạnh phúc, hạnh phúc chính là con đường."
      </p>
      <p class="quote-author">– Đức Phật</p>
    </div>
    
    <div class="lotus-symbol">❀</div>
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
      Pháp học cần sự đều đặn. Mỗi ngày, dù chỉ một đoạn kinh, một câu kệ, cũng góp phần nuôi dưỡng <span class="highlight">chánh niệm</span> và tuệ giác.
    </p>
    
    <div class="divider"></div>
    
    <a href="https://the-path-of-dharma.vercel.app/" class="cta-button">
      Tiếp tục hành trình →
    </a>
    
    <div class="quote">
      <p class="quote-text">
        "Giống như nước nhỏ giọt đều đặn có thể làm đầy bình, người trí cũng vậy, từng chút thiện hạnh sẽ làm đầy tâm."
      </p>
      <p class="quote-author">– Kinh Pháp Cú, kệ 122</p>
    </div>
    
    <div class="lotus-symbol">❀</div>
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
      Nhưng <span class="highlight">Chánh Pháp</span> luôn ở đó, như ánh trăng soi sáng đêm tối – chỉ cần bạn dừng lại, là có thể thấy rõ.
    </p>
    
    <div class="divider"></div>
    
    <a href="https://the-path-of-dharma.vercel.app/" class="cta-button">
      Quay về nương tựa Pháp →
    </a>
    
    <div class="quote">
      <p class="quote-text">
        "Hãy tự mình là ngọn đèn cho chính mình, hãy tự mình nương tựa chính mình, không nương tựa một ai khác."
      </p>
      <p class="quote-author">– Đức Phật, Kinh Đại Bát Niết Bàn</p>
    </div>
    
    <div class="lotus-symbol">❀</div>
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
