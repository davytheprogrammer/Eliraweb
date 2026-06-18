# ✅ Elira Health Web - Ready to Use

## 🎯 Final Structure

```
src/app/
├── login/              → Public login page
├── admin/              → Admin dashboard & doctor management
│   ├── dashboard/
│   └── doctors/
├── doctor/             → Doctor dashboard & features
│   ├── dashboard/
│   ├── profile/
│   ├── availability/
│   └── consultations/
└── api/                → REST API for mobile app
    ├── doctors/
    ├── consultations/
    └── messages/
```

## 🌐 Routes

| URL | Access | Description |
|-----|--------|-------------|
| `/` | Public → redirects to `/login` | Root |
| `/login` | Public | Login page for doctors & admins |
| `/doctor/dashboard` | 🩺 Doctor only | Doctor dashboard with stats |
| `/doctor/profile` | 🩺 Doctor only | Edit profile, bio, fees |
| `/doctor/availability` | 🩺 Doctor only | Set weekly schedule |
| `/doctor/consultations` | 🩺 Doctor only | View all consultations |
| `/admin/dashboard` | 👨‍💼 Admin only | Platform stats |
| `/admin/doctors` | 👨‍💼 Admin only | Approve/reject doctors |

## 🔐 Authentication Flow

1. Visit `http://localhost:3001` → redirects to `/login`
2. Enter credentials
3. Middleware checks `user_metadata.role`:
   - `DOCTOR` or `GYNECOLOGIST` → `/doctor/dashboard`
   - `ADMIN` → `/admin/dashboard`
   - No role or wrong role → stays on `/login`

## 🚀 Start Development

```bash
npm run dev
```

Server runs on `http://localhost:3001`

## 📊 Database Setup

Run **one** of these SQL files in Supabase:

### Option 1: Existing Mobile App (Recommended)
```sql
-- Use: supabase_migration_existing.sql
-- Works with existing 'profiles' table
-- Supports DOCTOR, GYNECOLOGIST, ADMIN, PATIENT roles
```

### Option 2: Fresh Setup
```sql
-- Use: supabase_schema.sql
-- Creates everything from scratch
-- Only if no mobile app exists yet
```

## 👥 Create Test Users

### Method 1: Supabase Dashboard
1. Go to **Authentication → Users → Add User**
2. Set email/password
3. Add **User Metadata**:
   ```json
   {
     "role": "DOCTOR",
     "full_name": "Dr. Jane Smith"
   }
   ```

### Method 2: SQL (After user created)
```sql
-- Get user ID from auth.users
SELECT id, email FROM auth.users;

-- Create doctor profile
INSERT INTO public.doctors (user_id, license_number, specialization, verification_status)
VALUES ('USER_ID_HERE', 'LIC-001', 'Gynecologist', 'APPROVED');
```

## 🧪 Test Accounts

After setup, test with:

**Doctor:**
- Email: `doctor@test.com`
- Password: (what you set)
- Should redirect to: `/doctor/dashboard`

**Admin:**
- Email: `admin@test.com`
- Password: (what you set)
- Should redirect to: `/admin/dashboard`

## 🐛 Troubleshooting

### Port 3000 in use
```bash
# Server will auto-select port 3001 (or 3002, etc.)
# Check terminal output for the correct URL
```

### "Cannot read properties of undefined"
- Check Supabase env vars in `.env.local`
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### "Doctor profile not found"
- User has role but no `doctors` table entry
- Run the SQL to create doctor profile (see above)

### "Access denied" / Redirects to login
- Check user role in `auth.users.raw_user_meta_data`
- Must be `DOCTOR`, `GYNECOLOGIST`, or `ADMIN`

### Middleware warning about "proxy"
- Informational only, can be ignored
- "middleware" still works in Next.js 15+

## 📱 Mobile App Integration

The API routes are ready for the mobile app:

```bash
# Get approved doctors
GET /api/doctors

# Get doctor details
GET /api/doctors/{id}

# Create consultation
POST /api/consultations
Body: { doctor_id, patient_id, topic, description }

# Get consultations
GET /api/consultations?doctorId={id}

# Get messages
GET /api/messages?consultationId={id}

# Send message
POST /api/messages
Body: { consultation_id, sender_id, sender_role, message }
```

## ✨ Features Implemented

- ✅ Role-based authentication (Doctor/Admin)
- ✅ Protected routes with middleware
- ✅ Doctor dashboard with stats
- ✅ Profile management
- ✅ Availability scheduling
- ✅ Consultation list
- ✅ Admin approval workflow
- ✅ REST API for mobile app
- ✅ Realtime ready (Supabase)
- ✅ Row Level Security (RLS)
- ✅ Mobile app compatibility

## 📚 Files Reference

| File | Purpose |
|------|---------|
| `supabase_migration_existing.sql` | Database setup (use this) |
| `supabase_schema.sql` | Alternative for fresh setup |
| `SETUP_GUIDE.md` | Detailed setup instructions |
| `src/middleware.ts` | Route protection & auth |
| `src/lib/services/` | Supabase data access layer |
| `.env.local` | Environment variables |

## 🎉 You're Ready!

Everything is set up and working. Just need to:
1. Run the SQL migration in Supabase
2. Create test users
3. Login and explore!

Need help? Check `SETUP_GUIDE.md` for detailed troubleshooting.
