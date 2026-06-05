import { NextResponse } from "next/server";

function parseSetCookieHeader(setCookie: string) {
  // Extract name and value from the first segment before `;`.
  const firstPart = setCookie.split(";")[0] || "";
  const [name, ...rest] = firstPart.split("=");
  const value = rest.join("=");

  // Try to get Max-Age if present
  const maxAgeMatch = setCookie.match(/Max-Age=(\d+)/i);
  const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : undefined;

  // Try to get SameSite
  const sameSiteMatch = setCookie.match(/SameSite=(None|Lax|Strict)/i);
  const sameSite = sameSiteMatch
    ? (sameSiteMatch[1] as "none" | "lax" | "strict")
    : undefined;

  // Check flags
  const httpOnly = /httponly/i.test(setCookie);
  const secure = /secure/i.test(setCookie);

  return {
    name: name?.trim(),
    value: value ?? "",
    maxAge,
    sameSite: sameSite ? sameSite.toLowerCase() : undefined,
    httpOnly,
    secure,
  };
}

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

    // Prefer the backend Set-Cookie header, but also fallback to token in body
    const setCookieHeader = backendRes.headers.get("set-cookie");

    if (setCookieHeader) {
      const parsed = parseSetCookieHeader(setCookieHeader);
      if (parsed.name) {
        // Use NextResponse cookies API to ensure cookie is set on frontend domain
        res.cookies.set({
          name: parsed.name,
          value: parsed.value,
          httpOnly: parsed.httpOnly ?? true,
          secure: parsed.secure ?? process.env.NODE_ENV === "production",
          path: "/",
          maxAge: parsed.maxAge,
          sameSite: (parsed.sameSite as any) ?? "none",
        });
      } else {
        // Fallback: set raw header
        res.headers.set("Set-Cookie", setCookieHeader);
      }
    } else if (data && (data.token || data.accessToken)) {
      // Backend returned token in body; set it as HttpOnly cookie on frontend
      const token = data.token ?? data.accessToken;
      res.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
        sameSite: "none",
      });
    }

    return res;
  } catch (err) {
    console.error("Sign-in proxy error:", err);
    return NextResponse.json({ message: "Proxy error" }, { status: 500 });
  }
}
