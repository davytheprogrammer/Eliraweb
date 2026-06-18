# 🏥 Elira Health - Healthcare Platform

Elira Health is a modern healthcare platform built with Next.js and Supabase, designed to connect patients with healthcare providers, manage consultations, and facilitate secure messaging.

---

## 🛠 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Authentication & Database:** [Supabase](https://supabase.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide-react.dev/), [Phosphor Icons](https://phosphoricons.com/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

---

## 📂 Project Structure

```text
src/
├── app/                  # Next.js App Router pages & API routes
│   ├── admin/            # Admin-only dashboard and doctor management
│   ├── doctor/           # Doctor-only dashboard, profile, and consultations
│   ├── api/              # Backend API endpoints
│   ├── login/            # Authentication pages
│   ├── signup/           # Doctor registration
│   └── verification-pending/ # Post-signup landing page
├── components/           # Reusable UI and Form components
├── lib/                  # Core logic, services, and Supabase config
│   ├── actions/          # Server Actions for Auth and Signup
│   ├── services/         # Business logic & Database abstractions
│   └── supabase/         # Supabase client and server configurations
└── types/                # TypeScript interfaces and types
```

---

## 🔄 Application Flow

### 1. Authentication & Authorization
The application uses **Middleware-based protection** (`src/middleware.ts`) to manage access:
- **Public Routes:** `/login`, `/signup`, `/verification-pending`, and all `/api/*` routes.
- **Role-Based Redirects:**
  - `PATIENT` / `USER` (Default) -> Currently handled as generic users.
  - `DOCTOR` / `GYNECOLOGIST` -> Redirected to `/doctor/dashboard`.
  - `ADMIN` -> Redirected to `/admin/dashboard`.
- **Root Redirect:** `/` automatically redirects to `/login` if not authenticated.

### 2. Doctor Onboarding Flow
1. **Registration (`/signup`):** Prospective doctors fill in their professional details (license, specialization, hospital).
2. **Pending State:** After submission, the account is created in `auth.users`, a profile is created in `profiles`, and a record is added to the `doctors` table with `verification_status = 'PENDING'`.
3. **Verification Page:** The user is redirected to `/verification-pending` and cannot access the dashboard until approved.
4. **Admin Approval:** An administrator logs into `/admin/doctors` to review and **Approve** or **Reject** the application.
5. **Full Access:** Once approved, the doctor can log in and access `/doctor/dashboard` to manage availability and consultations.

---

## 🚀 API Reference

All APIs are located under `/src/app/api`.

### Doctors
- `GET /api/doctors`: Returns a list of all **approved** and **available** doctors.
- `GET /api/doctors/[id]`: Returns detailed information for a specific doctor, including availability.

### Consultations
- `GET /api/consultations?doctorId=[id]`: Fetch all consultations assigned to a specific doctor.
- `POST /api/consultations`: Create a new consultation.
  - **Body:** `{ doctor_id, patient_id, topic, description }`

### Messages
- `GET /api/messages?consultationId=[id]`: Fetch message history for a consultation.
- `POST /api/messages`: Send a message within a consultation.
  - **Body:** `{ consultation_id, sender_id, sender_role, message, attachment_url? }`

---

## 🧪 Testing Procedures

### 1. Prerequisites
Ensure your `.env.local` contains:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key # Required for Signup bypass RLS
```

### 2. Manual Signup Test
1. Visit `http://localhost:3000/signup`.
2. Fill the form with test data (e.g., `testdoctor@example.com`).
3. Verify redirect to `/verification-pending`.
4. Run this SQL in your Supabase Editor to confirm records:
   ```sql
   SELECT * FROM profiles WHERE email = 'testdoctor@example.com';
   SELECT * FROM doctors WHERE user_id = (SELECT id FROM profiles WHERE email = 'testdoctor@example.com');
   ```

### 3. Admin Approval Test
1. Log in as an Admin (User with `role = 'ADMIN'` in `profiles` and `user_metadata`).
2. Navigate to `/admin/doctors`.
3. Click **Approve** on the pending doctor.
4. Attempt to log in with the doctor's credentials.

### 4. Database Diagnostics
Check role constraints if signup fails:
```sql
SELECT pg_get_constraintdef(oid) FROM pg_constraint WHERE conname = 'profiles_role_check';
-- Should include 'PATIENT', 'DOCTOR', 'ADMIN', 'GYNECOLOGIST'
```

---

## 🛠 Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint checks
```

For more detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md).
