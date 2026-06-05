import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/signin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

    const data = await backendRes.json().catch(() => ({}));

    const res = NextResponse.json(data, { status: backendRes.status });

    const setCookie = backendRes.headers.get("set-cookie");
    if (setCookie) {
      // Forward the backend Set-Cookie to the browser on the frontend domain
      res.headers.set("Set-Cookie", setCookie);
    }

    return res;
  } catch (err) {
    console.error("Sign-in proxy error:", err);
    return NextResponse.json({ message: "Proxy error" }, { status: 500 });
  }
}
