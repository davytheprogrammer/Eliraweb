# Elira Health Web - Supabase Setup Guide

## 🎯 Overview
This guide will help you set up the Supabase database for the Elira Health web platform.

---

## 📋 Prerequisites
- Supabase project already created
- You already have a `profiles` table from the mobile app
- Environment variables set in `.env.local`

---

## 🚀 Step 1: Run the Migration SQL

### Option A: If you have an existing `profiles` table
1. Go to Supabase Dashboard → SQL Editor
2. Copy the entire contents of `supabase_migration_existing.sql`
3. Paste into SQL Editor
4. Click "RUN"

### Option B: If starting fresh (no mobile app yet)
1. Go to Supabase Dashboard → SQL Editor
2. Copy the entire contents of `supabase_schema.sql`
3. Paste into SQL Editor
4. Click "RUN"

---

## 👥 Step 2: Understanding Roles

The system supports 3 roles:

| Role | Description | Web Access |
|------|-------------|------------|
| `PATIENT` | Regular users from mobile app | ❌ No web access |
| `DOCTOR` or `GYNECOLOGIST` | Healthcare providers | ✅ Doctor Dashboard |
| `ADMIN` | Platform administrators | ✅ Admin Dashboard |

> **Note:** `GYNECOLOGIST` and `DOCTOR` are treated the same by the web app. Use whichever your mobile app uses.

---

## 🔐 Step 3: Creating Users with Roles

### Via Supabase Dashboard (Manual)
1. Go to **Authentication → Users → Add User**
2. Fill in email and password
3. Expand **User Metadata** section
4. Add this JSON:
   ```json
   {
     "role": "DOCTOR",
     "full_name": "Dr. Jane Smith"
   }
   ```
5. Click **Create User**

### Via Supabase Auth API (Programmatic)
```javascript
const { data, error } = await supabase.auth.signUp({
  email: 'doctor@example.com',
  password: 'securepassword',
  options: {
    data: {
      role: 'DOCTOR', // or 'GYNECOLOGIST' or 'ADMIN'
      full_name: 'Dr. Jane Smith'
    }
  }
})
```

### Via Mobile App (Existing Flow)
If your mobile app already creates users with `role: 'GYNECOLOGIST'` in the `profiles` table, no changes needed. The web app will recognize them.

---

## 🏥 Step 4: Creating a Doctor Profile

After a user with role `DOCTOR` or `GYNECOLOGIST` is created, they need a doctor profile:

### Option 1: Via SQL (Quick Setup)
```sql
-- Replace the user_id with the actual UUID from auth.users
INSERT INTO public.doctors (user_id, license_number, specialization, hospital, verification_status)
VALUES (
  'USER_UUID_HERE',
  'LIC-2024-001',
  'Gynecologist',
  'City Hospital',
  'APPROVED'
);
```

### Option 2: Wait for Doctor Sign-up Flow
The web app can include a registration flow where doctors fill in:
- License number
- Specialization
- Hospital
- Bio
- Consultation fee

Status will be `PENDING` until admin approves.

---

## 👨‍💼 Step 5: Creating an Admin

1. Create a user via Supabase Dashboard
2. Set user metadata:
   ```json
   {
     "role": "ADMIN",
     "full_name": "Admin User"
   }
   ```
3. The trigger will automatically sync to `profiles` table

---

## 📊 Step 6: Verify Setup

### Check Tables Created
Run this in SQL Editor:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'profiles', 'doctors', 'doctor_availability', 
  'consultations', 'messages', 'admin_logs'
);
```

You should see all 6 tables.

### Check RLS Policies
```sql
SELECT tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';
```

You should see multiple policies for each table.

### Test Doctor Query
```sql
SELECT d.*, p.full_name, p.role 
FROM doctors d
JOIN profiles p ON d.user_id = p.id
WHERE d.verification_status = 'APPROVED';
```

---

## 🔄 Step 7: Sync Existing Gynecologists (if applicable)

If you already have users with role `GYNECOLOGIST` in `profiles` table but no `doctors` entries:

```sql
-- Create doctor profiles for all gynecologists
INSERT INTO public.doctors (user_id, license_number, specialization, verification_status)
SELECT 
  id,
  'TEMP-' || id::text, -- Temporary license number
  'Gynecologist',
  'PENDING'
FROM public.profiles
WHERE role = 'GYNECOLOGIST'
ON CONFLICT (user_id) DO NOTHING;
```

Then have admins update license numbers and approve.

---

## ✅ Step 8: Test Login

1. Start your Next.js dev server: `npm run dev`
2. Visit `http://localhost:3000`
3. You should be redirected to `/login`
4. Login with a DOCTOR or ADMIN account
5. You should be redirected to the appropriate dashboard

### Test Credentials (Example)
After creating test users in Supabase:
- **Doctor:** `doctor@test.com` / `password123`
- **Admin:** `admin@test.com` / `password123`

---

## 🐛 Troubleshooting

### "Cannot find table 'users'"
- You're using `profiles` table, not `users`
- The code has been updated to use `profiles`

### "Role not recognized"
- Check `auth.users.raw_user_meta_data` has `role` field
- Run: `SELECT id, email, raw_user_meta_data FROM auth.users;`

### "Doctor profile not found"
- User has role but no entry in `doctors` table
- Create doctor profile (see Step 4)

### "Verification status pending"
- Admin needs to approve the doctor
- Go to `/admin/doctors` and click "Approve"

### RLS Policy Errors
- Make sure you ran the full migration SQL
- Check: `SELECT * FROM pg_policies WHERE schemaname = 'public';`

---

## 📝 Important Notes

1. **Mobile App Compatibility:** The migration doesn't modify the `profiles` table structure, only adds a role constraint that includes your existing roles.

2. **GYNECOLOGIST vs DOCTOR:** Both are treated identically by the web app. The code checks for both:
   ```typescript
   const isDoctor = role === 'DOCTOR' || role === 'GYNECOLOGIST';
   ```

3. **Patient Access:** Patients cannot access the web app. They use the mobile app only.

4. **Realtime:** Messages table has realtime enabled for instant chat updates.

5. **Security:** All tables have Row Level Security (RLS) enabled with appropriate policies.

---

## 🎉 You're Done!

The database is now set up and ready. Doctors and admins can log in to the web platform.

Need help? Check the error logs in your browser console and Supabase logs.
