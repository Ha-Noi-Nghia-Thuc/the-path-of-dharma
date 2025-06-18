interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
}

interface Sutra {
  id: string;
  title: string;
  author: string;
  scripture: "Kinh" | "Luật" | "Luận" | string;
  description: string;
  summary: string;
  totalView: number;
  coverColor: string;
  coverUrl: string;
  pdfUrl?: string;
  linkUrl?: string;
  videoUrl?: string;
  tags?: string[];
}
