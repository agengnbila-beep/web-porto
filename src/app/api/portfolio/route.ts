import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPortfolioData, savePortfolioData } from "@/lib/portfolio-store";
import { PortfolioData } from "@/types/portfolio";

const ADMIN_TOKEN_NAME = "admin_auth_token";
const SECRET_SALT = "portfolio_admin_secure_key_2024";

function isAuthorized(token: string | undefined): boolean {
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const expectedToken = Buffer.from(`${password}:${SECRET_SALT}`).toString("base64");
  return token === expectedToken;
}

export async function GET() {
  try {
    const data = getPortfolioData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal memuat data portofolio" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_TOKEN_NAME)?.value;

    if (!isAuthorized(token)) {
      return NextResponse.json(
        { error: "Akses ditolak. Silakan login terlebih dahulu." },
        { status: 401 }
      );
    }

    const updatedData: PortfolioData = await req.json();

    if (!updatedData.personal || !updatedData.projects || !updatedData.skills) {
      return NextResponse.json(
        { error: "Format data portofolio tidak valid" },
        { status: 400 }
      );
    }

    const success = savePortfolioData(updatedData);

    if (!success) {
      return NextResponse.json(
        { error: "Gagal menyimpan perubahan ke file database" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Data portofolio berhasil disimpan!",
      data: updatedData,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan internal saat menyimpan data" },
      { status: 500 }
    );
  }
}
