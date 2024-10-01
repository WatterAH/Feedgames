import { NextResponse } from "next/server";
const URL = process.env.SERVER_HOST;

export async function POST(req: Request) {
  const { name, username, details, password } = await req.json();
  const response = await fetch(`${URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, username, details, password }),
  });

  const data = await response.json();

  if (response.ok) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json({ message: data.message });
  }
}
