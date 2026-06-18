import { createSupabaseServerClient } from "@/lib/supabase/server";
import { updateDoctorVerification } from "@/lib/services/doctorService";
import { VerificationStatus } from "@/types";

async function setVerification(formData: FormData) {
  "use server";
  const doctorId = formData.get("doctorId") as string;
  const status = formData.get("status") as VerificationStatus;
  await updateDoctorVerification(doctorId, status);
}

export default async function AdminDoctorsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: doctors } = await supabase
    .from("doctors")
    .select("*, profiles(full_name, email)")
    .order("verification_status");

  const BADGE: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Doctors</h1>
      <div className="rounded-xl border divide-y overflow-hidden">
        {(doctors ?? []).map((d) => (
          <div key={d.id} className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-medium">{d.profiles?.full_name}</p>
              <p className="text-xs text-muted-foreground">
                {d.profiles?.email} · {d.specialization}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${BADGE[d.verification_status]}`}>
                {d.verification_status}
              </span>
              {d.verification_status === "PENDING" && (
                <div className="flex gap-2">
                  <form action={setVerification}>
                    <input type="hidden" name="doctorId" value={d.id} />
                    <input type="hidden" name="status" value="APPROVED" />
                    <button type="submit" className="text-xs rounded-md bg-green-600 px-2 py-1 text-white hover:bg-green-700">
                      Approve
                    </button>
                  </form>
                  <form action={setVerification}>
                    <input type="hidden" name="doctorId" value={d.id} />
                    <input type="hidden" name="status" value="REJECTED" />
                    <button type="submit" className="text-xs rounded-md bg-red-600 px-2 py-1 text-white hover:bg-red-700">
                      Reject
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
