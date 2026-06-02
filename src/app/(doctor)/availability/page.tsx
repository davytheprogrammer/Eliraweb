import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getDoctorByUserId, upsertAvailability } from "@/lib/services/doctorService";
import { redirect } from "next/navigation";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default async function AvailabilityPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const doctor = await getDoctorByUserId(user.id);
  if (!doctor) redirect("/login");

  async function saveAvailability(formData: FormData) {
    "use server";
    const slots = DAYS.flatMap((day) => {
      const start = formData.get(`${day}_start`) as string;
      const end = formData.get(`${day}_end`) as string;
      if (!start || !end) return [];
      return [{ day, start_time: start, end_time: end }];
    });
    await upsertAvailability(doctor!.id, slots);
  }

  const existing = Object.fromEntries(
    (doctor.doctor_availability ?? []).map((a: { day: string; start_time: string; end_time: string }) => [a.day, { start: a.start_time, end: a.end_time }])
  );

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-xl font-semibold">Availability</h1>
      <form action={saveAvailability} className="space-y-3">
        {DAYS.map((day) => (
          <div key={day} className="flex items-center gap-3">
            <span className="w-28 text-sm">{day}</span>
            <input
              type="time"
              name={`${day}_start`}
              defaultValue={existing[day]?.start ?? ""}
              className="rounded-md border bg-background px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <span className="text-sm text-muted-foreground">to</span>
            <input
              type="time"
              name={`${day}_end`}
              defaultValue={existing[day]?.end ?? ""}
              className="rounded-md border bg-background px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        ))}
        <button
          type="submit"
          className="mt-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Save availability
        </button>
      </form>
    </div>
  );
}
