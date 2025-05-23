import { NextRequest, NextResponse } from "next/server";

export const forgotMiddleware = (req: NextRequest) => {
  const forgotPassword = req.cookies.get("forgot_email")?.value;
  const pathname = req.nextUrl.pathname;
  if (pathname === "/forgot-password" && !forgotPassword) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/forgot-password"],
};
