import { JsonArray } from "@prisma/client/runtime/library";

export enum PostStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export interface Post {
  id: string;
  title: string;
  content: string;
  fullContent: string;
  image?: string | null;
  date: Date;
  authorId: string;
  readTime: string;
  category: string;
  chips: JsonArray[];
  createdAt: Date;
  updatedAt: Date;

  author: User;
  comments: Comment[];
  likes: Like[];
  notifications: Notification[];
  status: PostStatus;
}
