import { User } from "@/interfaces/User";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function getUserCookie() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) return "";
  const user: User = jwtDecode(token);

  return user.id;
}
