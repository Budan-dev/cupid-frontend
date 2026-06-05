import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Forward any cookies sent by the browser to the backend
    const cookie = req.headers.get("cookie") || "";

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`,
      {
        method: "GET",
        headers: {
          cookie,
        },
      },
    );

    const data = await backendRes.json().catch(() => ({}));

    return NextResponse.json(data, { status: backendRes.status });
  } catch (err) {
    console.error("Profile proxy error:", err);
    return NextResponse.json({ message: "Proxy error" }, { status: 500 });
  }
}
