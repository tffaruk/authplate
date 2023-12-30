import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
export const fetchUserByEmail = async () => {
  const userData = await fetch("http://localhost:3000/api/users", {
    method: "GET",
    headers: headers(),
    cache: "no-cache",
  });

  // const data = await userData.json();
  revalidatePath("/dashboard/subscriptions", "page");

  return await userData.json();
};
