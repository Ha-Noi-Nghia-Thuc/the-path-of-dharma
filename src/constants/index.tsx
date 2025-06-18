// form field configurations
export const FIELD_NAMES = {
  fullName: "Họ và tên",
  email: "Email",
  password: "Mật khẩu",
} as const;

export const FIELD_TYPES = {
  fullName: "text",
  email: "email",
  password: "password",
} as const;

// scripture types
export const SCRIPTURE_TYPES = [
  { value: "Kinh", label: "Kinh" },
  { value: "Luật", label: "Luật" },
  { value: "Luận", label: "Luận" },
] as const;

// admin sidebar navigation links
export const adminSideBarLinks = [
  {
    icon: "HomeIcon",
    route: "/admin",
    text: "Trang chủ",
  },
  {
    icon: "UsersIcon",
    route: "/admin/users",
    text: "Quản lý người dùng",
  },
  {
    icon: "BookOpenIcon",
    route: "/admin/sutras",
    text: "Quản lý kinh điển",
  },
  {
    icon: "FolderIcon",
    route: "/admin/categories",
    text: "Danh mục",
  },
  {
    icon: "TagIcon",
    route: "/admin/tags",
    text: "Thẻ tag",
  },
  {
    icon: "BarChart3Icon",
    route: "/admin/analytics",
    text: "Thống kê",
  },
  {
    icon: "SettingsIcon",
    route: "/admin/settings",
    text: "Cài đặt",
  },
] as const;

// sample sutras data
export interface Sutra {
  id: string;
  title: string;
  author: string;
  scripture: string;
  description: string;
  summary: string;
  totalView: number;
  coverColor: string;
  coverUrl: string;
  pdfUrl: string;
  linkUrl: string;
  videoUrl: string;
  tags: string[];
}

export const sampleSutras: Sutra[] = [
  {
    id: "1",
    title: "Kinh Kim Cương Bát Nhã Ba La Mật",
    author: "Đức Phật Thích Ca Mâu Ni",
    scripture: "Kinh",
    description:
      "Một trong những bộ kinh Đại Thừa quan trọng nhất, tập trung vào giáo lý Bát Nhã (trí tuệ siêu việt) về tánh không và sự vô ngã. Kinh Kim Cương giúp người đọc thấu hiểu bản chất của vạn vật và giải thoát khỏi mọi chấp trước.",
    summary:
      "Kinh Kim Cương Bát Nhã Ba La Mật là một trong những bộ kinh Đại Thừa quan trọng nhất, nhấn mạnh về tánh không (Sunyata) và trí tuệ Bát Nhã. Kinh chỉ ra rằng mọi hiện tượng đều vô thường, vô ngã, không có tự tính. Bằng cách quán chiếu sâu sắc điều này, hành giả có thể phá bỏ mọi chấp trước, đạt được giác ngộ. Kinh thường được trì tụng và nghiên cứu rộng rãi trong Phật giáo Đông Á.",
    totalView: 12000,
    coverColor: "#8b2f28",
    coverUrl:
      "https://m.media-amazon.com/images/I/711oexsZPIL._UF1000,1000_QL80_.jpg",
    pdfUrl: "",
    linkUrl: "",
    videoUrl: "",
    tags: ["Bát Nhã", "Tánh không", "Đại Thừa"],
  },
  {
    id: "2",
    title: "Kinh Pháp Hoa (Diệu Pháp Liên Hoa Kinh)",
    author: "Đức Phật Thích Ca Mâu Ni",
    scripture: "Kinh",
    description:
      "Bộ kinh tối thượng của Phật giáo Đại Thừa, tiết lộ giáo lý nhất thừa và khả năng thành Phật của tất cả chúng sinh. Kinh sử dụng nhiều thí dụ và câu chuyện sinh động để truyền tải thông điệp.",
    summary:
      "Kinh Pháp Hoa, hay Diệu Pháp Liên Hoa Kinh, là một trong những bộ kinh vĩ đại nhất của Phật giáo Đại Thừa. Kinh chủ yếu giảng về giáo lý nhất thừa, khẳng định rằng tất cả chúng sinh đều có Phật tánh và có thể thành Phật. Kinh sử dụng nhiều phương tiện thiện xảo và các thí dụ kinh điển như nhà lửa, người con hoang, cây thuốc… để truyền đạt chân lý sâu xa về sự bình đẳng và phổ độ chúng sinh.",
    totalView: 9500,
    coverColor: "#344e94",
    coverUrl: "https://m.media-amazon.com/images/I/71kaO4hpXeL._SL1500_.jpg",
    pdfUrl: "",
    linkUrl: "",
    videoUrl: "",
    tags: ["Nhất thừa", "Pháp Hoa", "Phật tánh"],
  },
  {
    id: "3",
    title: "Kinh Bát Đại Nhân Giác",
    author: "Đức Phật Thích Ca Mâu Ni",
    scripture: "Kinh",
    description:
      "Một bộ kinh ngắn gọn nhưng súc tích, tóm lược tám điều giác ngộ vĩ đại của bậc đại nhân, bao gồm các giáo lý cơ bản về vô thường, khổ, vô ngã, thiểu dục tri túc, tinh tấn, thiền định, trí tuệ và bình đẳng.",
    summary:
      "Kinh Bát Đại Nhân Giác tóm tắt tám điều giác ngộ quan trọng mà một bậc đại nhân cần thấu suốt. Các điều này bao gồm: thế giới vô thường, thân người là khổ, mọi pháp vô ngã, thiểu dục tri túc (biết đủ), tinh tấn tu hành, giữ giới trong sạch, tu thiền định, và phát khởi trí tuệ để lợi ích chúng sinh. Đây là một bộ kinh hướng dẫn thực hành căn bản và thiết yếu cho người tu Phật.",
    totalView: 8000,
    coverColor: "#d9cdb3",
    coverUrl:
      "https://plumvillage.shop/wp-content/uploads/2020/10/8Realizations_Draft.png",
    pdfUrl: "",
    linkUrl: "",
    videoUrl: "",
    tags: ["Giác ngộ", "Vô thường", "Thiểu dục"],
  },
  {
    id: "4",
    title: "Kinh Địa Tạng Bồ Tát Bổn Nguyện",
    author: "Đức Phật Thích Ca Mâu Ni",
    scripture: "Kinh",
    description:
      "Bộ kinh nói về hạnh nguyện cứu độ chúng sinh trong cõi địa ngục của Bồ Tát Địa Tạng, nhấn mạnh lòng hiếu thảo và sự báo hiếu cha mẹ. Kinh cũng mô tả các cảnh giới địa ngục và lợi ích của việc tụng kinh, cúng dường Địa Tạng Bồ Tát.",
    summary:
      "Kinh Địa Tạng Bồ Tát Bổn Nguyện kể về những lời thề nguyện vĩ đại của Bồ Tát Địa Tạng để cứu độ tất cả chúng sinh khỏi đau khổ, đặc biệt là những chúng sinh trong địa ngục. Kinh nhấn mạnh tầm quan trọng của lòng hiếu thảo, sự sám hối và công đức của việc tạo phước. Đây là một bộ kinh được rất nhiều Phật tử tụng đọc để cầu siêu cho người đã khuất và tích lũy công đức cho bản thân.",
    totalView: 10200,
    coverColor: "#9d6031",
    coverUrl: "https://m.media-amazon.com/images/I/81YdiPuTu7L._SL1500_.jpg",
    pdfUrl: "",
    linkUrl: "",
    videoUrl: "",
    tags: ["Địa Tạng", "Hiếu thảo", "Địa ngục"],
  },
] as const;

// application constants
export const APP_CONFIG = {
  name: "Chánh Đạo - The Path of Dharma",
  description:
    "Trang web nghiên cứu và đọc tụng Kinh điển Phật giáo hoàn toàn miễn phí",
  url: "https://the-path-of-dharma.vercel.app",
  version: "1.0.0",
  author: "Hà Nội Nghĩa Thục",
} as const;

// file upload limits
export const UPLOAD_LIMITS = {
  image: {
    maxSize: 20 * 1024 * 1024, // 20MB
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  },
  video: {
    maxSize: 50 * 1024 * 1024, // 50MB
    allowedTypes: ["video/mp4", "video/webm"],
  },
  document: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ["application/pdf"],
  },
} as const;

// pagination defaults
export const PAGINATION_DEFAULTS = {
  page: 1,
  limit: 10,
  maxLimit: 100,
} as const;

// cache durations (in seconds)
export const CACHE_DURATIONS = {
  short: 60, // 1 minute
  medium: 300, // 5 minutes
  long: 3600, // 1 hour
  day: 86400, // 24 hours
} as const;
