export const FIELD_NAMES = {
  fullName: "Họ và tên",
  email: "Email",
  password: "Mật khẩu",
};

export const FIELD_TYPES = {
  fullName: "text",
  email: "email",
  password: "password",
};

export const adminSideBarLinks = [
  {
    icon: "HomeIcon",
    route: "/admin",
    text: "Home",
  },
  {
    icon: "UsersIcon",
    route: "/admin/users",
    text: "All Users",
  },
  {
    icon: "BookOpenTextIcon",
    route: "/admin/sutras",
    text: "All Sutras",
  },

  {
    icon: "UserPlusIcon",
    route: "/admin/account-requests",
    text: "Account Requests",
  },
];

export const sampleSutras = [
  {
    id: "1",
    title: "Kinh Kim Cương Bát Nhã Ba La Mật",
    author: "Đức Phật Thích Ca Mâu Ni",
    scripture: "Kinh",
    description: "Một trong những bộ kinh Đại Thừa quan trọng nhất...",
    summary: "Kinh Kim Cương Bát Nhã Ba La Mật là một trong những bộ kinh...",
    totalView: 12000,
    coverColor: "#8b2f28",
    coverUrl:
      "https://m.media-amazon.com/images/I/711oexsZPIL._UF1000,1000_QL80_.jpg",
    pdfUrl: "",
    linkUrl: "",
    videoUrl: "",
    tags: ["Bát Nhã", "Tánh không"],
  },
  {
    id: "2",
    title: "Kinh Pháp Hoa (Diệu Pháp Liên Hoa Kinh)",
    author: "Đức Phật Thích Ca Mâu Ni (thông qua truyền thừa)",
    scripture: "Kinh",
    description:
      "Bộ kinh tối thượng của Phật giáo Đại Thừa, tiết lộ giáo lý nhất thừa và khả năng thành Phật của tất cả chúng sinh. Kinh sử dụng nhiều thí dụ và câu chuyện sinh động để truyền tải thông điệu.",
    summary:
      "Kinh Pháp Hoa, hay Diệu Pháp Liên Hoa Kinh, là một trong những bộ kinh vĩ đại nhất của Phật giáo Đại Thừa. Kinh chủ yếu giảng về giáo lý nhất thừa, khẳng định rằng tất cả chúng sinh đều có Phật tánh và có thể thành Phật...",
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
    author: "Đức Phật Thích Ca Mâu Ni (thông qua truyền thừa)",
    scripture: "Kinh",
    description:
      "Một bộ kinh ngắn gọn nhưng súc tích, tóm lược tám điều giác ngộ vĩ đại của bậc đại nhân, bao gồm các giáo lý cơ bản về vô thường, khổ, vô ngã, thiểu dục tri túc, tinh tấn, thiền định, trí tuệ và bình đẳng.",
    summary:
      "Kinh Bát Đại Nhân Giác tóm tắt tám điều giác ngộ quan trọng mà một bậc đại nhân cần thấu suốt. Các điều này bao gồm: thế giới vô thường, thân người là khổ, mọi pháp vô ngã...",
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
    author: "Đức Phật Thích Ca Mâu Ni (thông qua truyền thừa)",
    scripture: "Kinh",
    description:
      "Bộ kinh nói về hạnh nguyện cứu độ chúng sinh trong cõi địa ngục của Bồ Tát Địa Tạng, nhấn mạnh lòng hiếu thảo và sự báo hiếu cha mẹ...",
    summary:
      "Kinh Địa Tạng Bồ Tát Bổn Nguyện kể về những lời thề nguyện vĩ đại của Bồ Tát Địa Tạng để cứu độ tất cả chúng sinh khỏi đau khổ...",
    totalView: 10200,
    coverColor: "#9d6031",
    coverUrl: "https://m.media-amazon.com/images/I/81YdiPuTu7L._SL1500_.jpg",
    pdfUrl: "",
    linkUrl: "",
    videoUrl: "",
    tags: ["Địa Tạng", "Hiếu thảo", "Địa ngục"],
  },
];
