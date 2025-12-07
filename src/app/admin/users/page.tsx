"use server";

import { getAllUsers } from "@/actions/user.action";
import UsersPage from "@/components/admin/userModals/User";

export default async function Page() {
  const res = await getAllUsers();
  const users = (res.data ?? []).map((user) => ({
    ...user,
    image: user.image ?? "",
  }));

  return <UsersPage users={users} />;
}
