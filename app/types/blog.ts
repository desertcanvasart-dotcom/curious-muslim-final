export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  featuredImage?: string;
  tags: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  description?: string;
}
