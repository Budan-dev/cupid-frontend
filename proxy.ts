import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  console.log("Token found in proxy:", token);
  //   const url = request.nextUrl.clone();
  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  } else {
    return NextResponse.next();
  }
}
export const config = {
  matcher: ["/profile", "/communities", "/messages"],
};
