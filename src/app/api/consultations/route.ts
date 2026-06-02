import { NextRequest, NextResponse } from "next/server";
import {
  createConsultation,
  getConsultationsByDoctor,
} from "@/lib/services/consultationService";

export async function GET(req: NextRequest) {
  const doctorId = req.nextUrl.searchParams.get("doctorId");
  if (!doctorId) return NextResponse.json({ error: "doctorId required" }, { status: 400 });
  const consultations = await getConsultationsByDoctor(doctorId);
  return NextResponse.json(consultations);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { doctor_id, patient_id, topic, description } = body;
  if (!doctor_id || !patient_id || !topic) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const consultation = await createConsultation({ doctor_id, patient_id, topic, description });
  return NextResponse.json(consultation, { status: 201 });
}
