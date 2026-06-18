import { getMany, approveExpert, rejectExpert } from "@/lib/db/queries";
import { revalidatePath } from "next/cache";

async function setVerification(formData: FormData) {
  "use server";
  const doctorId = formData.get("doctorId") as string;
  const action = formData.get("action") as string;
  
  if (action === "APPROVE") {
    await approveExpert(doctorId);
  } else if (action === "REJECT") {
    await rejectExpert(doctorId);
  }
  
  revalidatePath("/admin/doctors");
}

export default async function AdminDoctorsPage() {
  // Fetch experts from Turso
  const doctors = await getMany<any>(
    `SELECT e.*, p.email, p.first_name, p.last_name 
     FROM experts e 
     JOIN profiles p ON e.user_id = p.id 
     ORDER BY e.is_verified ASC, e.created_at DESC`
  );

  const getStatusLabel = (isVerified: number) => {
    return isVerified === 1 ? "APPROVED" : "PENDING";
  };

  const getBadgeClass = (isVerified: number) => {
    return isVerified === 1 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Experts Management</h1>
      <div className="rounded-xl border divide-y overflow-hidden bg-card">
        {doctors.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No experts found in the database.
          </div>
        ) : (
          doctors.map((d) => (
            <div key={d.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium">{d.display_name || `${d.first_name} ${d.last_name}`}</p>
                <p className="text-xs text-muted-foreground">
                  {d.email} · {JSON.parse(d.specialties || '[]').join(', ')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getBadgeClass(d.is_verified)}`}>
                  {getStatusLabel(d.is_verified)}
                </span>
                {d.is_verified === 0 && (
                  <div className="flex gap-2">
                    <form action={setVerification}>
                      <input type="hidden" name="doctorId" value={d.id} />
                      <input type="hidden" name="action" value="APPROVE" />
                      <button type="submit" className="text-xs rounded-md bg-green-600 px-2 py-1 text-white hover:bg-green-700">
                        Approve
                      </button>
                    </form>
                    <form action={setVerification}>
                      <input type="hidden" name="doctorId" value={d.id} />
                      <input type="hidden" name="action" value="REJECT" />
                      <button type="submit" className="text-xs rounded-md bg-red-600 px-2 py-1 text-white hover:bg-red-700">
                        Reject
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
