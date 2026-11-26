import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  const isSupabase = !!getSupabase();
  return NextResponse.json({
    database: isSupabase ? "Supabase (Cloud PostgreSQL)" : "Local File (portfolio.json)",
    isSupabase,
  });
}
