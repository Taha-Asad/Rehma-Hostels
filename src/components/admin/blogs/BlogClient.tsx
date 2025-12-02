"use client";
import React, { useTransition } from "react";
import { BlogCardModal } from "./BlogsModal";
import { DeleteBlog, UpdateBlog } from "@/actions/blogs.action";
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
  const handleEdit = (blogId: string, formData: FormData) => {
    startTransition(() => {
      UpdateBlog(blogId, formData);
    });
  };

  return (
    <>
      {blogs.map((blog) => (
        <BlogCardModal
          key={blog.id}
          blogs={blog}
          onDelete={() => handleDelete(blog)}
          onEdit={(id, data) => handleEdit(id, data)}
        />
      ))}
    </>
  );
}

// export function RoomCreateClient() {
//   const [, startTransition] = useTransition();

//   const handleCreate = (formData: FormData) => {
//     startTransition(async () => {
//       const res = await createRoom(formData);
//       console.log("SERVER RESULT:", res); // add this
//     });
//   };
//   return (
//     <>
//       <CreateRoomCardModal onCreate={(data) => handleCreate(data)} />
//     </>
//   );
// }
