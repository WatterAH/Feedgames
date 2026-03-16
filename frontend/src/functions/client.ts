import { User } from "@/interfaces/User";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function getUserCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return "";
  const user: User = jwtDecode(token);

  return user.id;
}
