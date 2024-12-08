import type { ParsedContent } from "@nuxt/content";

export type BlogAuthor = {
  name: string;
  avatar: string;
};

export interface ParsedBlog extends ParsedContent {
  slug: string;
  description: string;
  cover: string;
  author: BlogAuthor;
  tags: string[];
  category: string;
  created: string;
  updated: string;
}
