import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ConsultationStatus } from "@/types";

export async function createConsultation(data: {
  doctor_id: string;
  patient_id: string;
  topic: string;
  description?: string;
}) {
  const supabase = await createSupabaseServerClient();
  const { data: created, error } = await supabase
    .from("consultations")
    .insert(data)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return created;
}

export async function getConsultationsByDoctor(doctorId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("consultations")
    .select("*")
    .eq("doctor_id", doctorId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function updateConsultationStatus(
  id: string,
  status: ConsultationStatus
) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("consultations")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
}
