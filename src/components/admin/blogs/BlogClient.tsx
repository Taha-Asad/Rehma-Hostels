"use client";
import React, { useTransition } from "react";
import { BlogCardModal, CreateBlogCardModal } from "./BlogsModal";
import { CreateBlog, DeleteBlog, UpdateBlog } from "@/actions/blogs.action";
import type { Post } from "@prisma/client";

interface BlogsClientProps {
  blogs: Post[];
}
export function BlogClient({ blogs }: BlogsClientProps) {
  const [, startTransition] = useTransition();
  const handleDelete = (blog: Post) => {
    startTransition(() => {
      DeleteBlog(blog.id);
    });
  };
  const handleEdit = (formData: FormData) => {
    startTransition(() => {
      UpdateBlog(formData);
    });
  };

  return (
    <>
      {blogs.map((blog) => (
        <BlogCardModal
          key={blog.id}
          blogs={blog}
          onDelete={() => handleDelete(blog)}
          onEdit={(id, data) => handleEdit(data)}
        />
      ))}
    </>
  );
}

export function BlogCreateClient() {
  const [, startTransition] = useTransition();

  const handleCreate = (formData: FormData) => {
    startTransition(async () => {
      const res = await CreateBlog(formData);
      console.log("SERVER RESULT:", res); // add this
    });
  };
  return (
    <>
      <CreateBlogCardModal onCreate={(data) => handleCreate(data)} />
    </>
  );
}
