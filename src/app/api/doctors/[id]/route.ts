import { NextResponse } from "next/server";
import { getDoctorById } from "@/lib/services/doctorService";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doctor = await getDoctorById(id);
  if (!doctor) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(doctor);
}
