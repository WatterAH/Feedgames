import { NextResponse } from "next/server";
const URL = process.env.SERVER_HOST;

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const response = await fetch(`${URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (response.ok) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json(
      { message: data.message },
      { status: response.status }
    );
  }
}
