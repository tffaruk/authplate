import config from "@/config/config.json";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
const { base_url } = config.site;
export const fetchUserByEmail = async () => {
  const userData = await fetch(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/users"
      : base_url + "/api/users",
    {
      method: "GET",
      headers: headers(),
      cache: "no-cache",
    },
  );

  // const data = await userData.json();
  revalidatePath("/", "page");

  return await userData.json();
};
