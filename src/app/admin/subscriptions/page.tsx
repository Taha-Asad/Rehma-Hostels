import { getAllSubscription } from "@/actions/sub.action";
import Subs from "@/components/admin/subscription/Subs";
import React from "react";

async function page() {
  const res = await getAllSubscription();
  const subscription = (res.data ?? []).map((cnt) => ({
    ...cnt,
  }));
  return (
    <div>
      <Subs subs={subscription} />
    </div>
  );
}

export default page;
