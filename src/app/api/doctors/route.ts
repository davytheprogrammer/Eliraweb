import { NextResponse } from "next/server";
import { getApprovedDoctors } from "@/lib/services/doctorService";

export async function GET() {
  const doctors = await getApprovedDoctors();
  return NextResponse.json(doctors);
}
