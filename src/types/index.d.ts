interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
}

interface Sutra {
  id: string;
  title: string;
  author: string;
  rating: number;
  description: string;
  color: string;
  cover: string;
  pdf?: string;
  link?: string;
  video: string;
  summary: string;
}
