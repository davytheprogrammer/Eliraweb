1. Database Schema
* Created and ran migrate_appointments.ts to add the new appointments table.
* The table integrates securely into the existing architecture, referencing profiles(id) for patient_id/booked_by and experts(id) for specialist_id.

2. Validation & Types
* Created src/lib/types/appointment.ts defining all the typescript interfaces (Appointment, CreateAppointmentInput, etc.).
* Built strict Zod schemas that explicitly validate startTime is always before endTime, date structures, and valid enum statuses (PENDING, CONFIRMED, COMPLETED, CANCELLED, NO_SHOW, RESCHEDULED).

3. Business Logic (AppointmentService)
* Created src/services/appointment.service.ts to handle raw parameterised SQL queries for the module.
* Conflict Prevention:
* checkSpecialistAvailability: Validates that the requested time slot falls within the specialist's weekly working hours (from the expert_availability table).
* checkSpecialistConflict: Prevents a specialist from being double-booked.
* checkPatientConflict: Prevents a patient from accidentally booking overlapping appointments.
* validateFutureDate: Ensures all newly booked or rescheduled appointments are explicitly in the future.

4. API Endpoints
All APIs are strictly secured behind their respective role verifiers (requirePatient, requireSpecialist, requireAdmin).

* Patient Endpoints (Ready for your Mobile App):
* POST /api/appointments - Books a new appointment (runs all 4 conflict rules).
* GET /api/appointments/my - Returns the logged-in patient's appointments (supports pagination).
* GET /api/appointments/[id] - Returns details of a specific appointment.
* PATCH /api/appointments/[id]/cancel - Safe soft-delete pattern.
* PATCH /api/appointments/[id]/reschedule - Reschedules the appointment, re-running all conflict checks.
* Specialist Endpoints:
* GET /api/specialist/appointments - Fetches appointments strictly assigned to them with status/date filters.
* PATCH /api/specialist/appointments/[id]/confirm
* PATCH /api/specialist/appointments/[id]/complete
* PATCH /api/specialist/appointments/[id]/no-show
* Admin Endpoints:
* GET /api/admin/appointments - System-wide appointment viewer with comprehensive filtering.
* GET /api/admin/appointments/stats - Dashboard metrics for total, pending, confirmed, cancelled, etc.

5. Integration
* Updated the Specialist Dashboard API (/api/specialist/dashboard) to combine your legacy consultation stats with the new appointment metrics (todayAppointments, upcomingAppointments, completedAppointments).

Everything is fully typed, compiles without errors, and has been safely committed to the repository!