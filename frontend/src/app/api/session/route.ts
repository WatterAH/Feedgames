import { NextResponse } from "next/server";
const URL = process.env.SERVER_HOST;

export async function GET(req: Request) {
  const userToken = req.headers.get("Authorization");
  const response = await fetch(`${URL}/api/checkAuth?userToken=${userToken}`);
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
