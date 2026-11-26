import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_TOKEN_NAME = "admin_auth_token";
const SECRET_SALT = "portfolio_admin_secure_key_2024";

function getExpectedToken(): string {
  const password = process.env.ADMIN_PASSWORD || "admin123";
  // Simple deterministic token for password validation
  return Buffer.from(`${password}:${SECRET_SALT}`).toString("base64");
}

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const correctPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (!password || password !== correctPassword) {
      return NextResponse.json(
        { error: "Password atau PIN yang dimasukkan salah" },
        { status: 401 }
      );
    }

    const token = getExpectedToken();
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Login berhasil" });
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan saat proses login" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_TOKEN_NAME)?.value;
    const expectedToken = getExpectedToken();

    const isAuthenticated = token === expectedToken;
    return NextResponse.json({ authenticated: isAuthenticated });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_TOKEN_NAME);
    return NextResponse.json({ success: true, message: "Logout berhasil" });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
