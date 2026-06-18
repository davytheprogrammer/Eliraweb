# How to Set User Metadata in Supabase

## Method 1: Supabase Dashboard (Recommended for Testing)

### Step-by-Step:

1. **Go to Supabase Dashboard**
   - Open your project at: https://supabase.com/dashboard
   - Navigate to your Elira Health project

2. **Go to Authentication**
   - Click on "Authentication" in the left sidebar
   - Click on "Users" tab

3. **Add New User**
   - Click the "Add user" button (top right)
   - OR click on an existing user to edit

4. **Fill in User Details**
   ```
   Email: doctor@test.com
   Password: test123
   Auto Confirm User: ✓ (check this box)
   ```

5. **Set User Metadata**
   - Scroll down to find "User Meta Data" section
   - Click to expand it
   - You'll see a JSON editor
   - Paste this JSON:
   ```json
   {
     "role": "DOCTOR",
     "full_name": "Dr. Jane Smith"
   }
   ```

6. **Click "Create user" or "Save"**

### What Each Field Means:

| Field | Value | Purpose |
|-------|-------|---------|
| `role` | `"DOCTOR"` or `"GYNECOLOGIST"` or `"ADMIN"` | Determines dashboard access |
| `full_name` | `"Dr. Jane Smith"` | User's display name |

### Screenshots Guide:

```
Dashboard → Authentication → Users → Add User

┌─────────────────────────────────────┐
│ Email *                              │
│ [doctor@test.com             ]      │
│                                      │
│ Password *                           │
│ [test123                     ]      │
│                                      │
│ ☑ Auto Confirm User                 │
│                                      │
│ ▼ User Meta Data                    │
│ ┌─────────────────────────────────┐│
│ │ {                               ││
│ │   "role": "DOCTOR",             ││
│ │   "full_name": "Dr. Jane Smith" ││
│ │ }                               ││
│ └─────────────────────────────────┘│
│                                      │
│        [Create user]                 │
└─────────────────────────────────────┘
```

---

## Method 2: SQL Query (For Existing Users)

If you already created a user WITHOUT metadata, update it with SQL:

```sql
-- Find the user ID first
SELECT id, email FROM auth.users WHERE email = 'doctor@test.com';

-- Update the user metadata
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"DOCTOR"'
)
WHERE email = 'doctor@test.com';

-- Also set the full_name
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  raw_user_meta_data,
  '{full_name}',
  '"Dr. Jane Smith"'
)
WHERE email = 'doctor@test.com';

-- Verify it worked
SELECT 
  id,
  email,
  raw_user_meta_data->>'role' as role,
  raw_user_meta_data->>'full_name' as full_name
FROM auth.users
WHERE email = 'doctor@test.com';
```

---

## Method 3: Supabase JavaScript (For Sign-up Flow)

Add this to your sign-up code if you want to build a registration page:

```typescript
// src/app/register/page.tsx
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

async function signUp(email: string, password: string, role: string, fullName: string) {
  const supabase = createSupabaseBrowserClient();
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: role,           // "DOCTOR", "ADMIN", or "GYNECOLOGIST"
        full_name: fullName,  // "Dr. Jane Smith"
      }
    }
  });
  
  return { data, error };
}
```

---

## Method 4: Via Supabase REST API

```bash
# Get your Service Role Key from: Dashboard → Settings → API
# DO NOT use this key in client-side code!

curl -X PUT 'https://YOUR_PROJECT.supabase.co/auth/v1/admin/users/USER_ID' \
  -H "apikey: YOUR_SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "user_metadata": {
      "role": "DOCTOR",
      "full_name": "Dr. Jane Smith"
    }
  }'
```

---

## Quick Test Script

Run this in Supabase SQL Editor to create a ready-to-use test doctor:

```sql
-- Step 1: Create user in auth.users (you still need to do this in Dashboard)
-- Dashboard → Authentication → Users → Add User
-- Email: doctor@test.com
-- Password: test123
-- Auto Confirm: ✓

-- Step 2: After creating user, run this to set metadata
UPDATE auth.users
SET raw_user_meta_data = '{
  "role": "DOCTOR",
  "full_name": "Dr. Test Doctor"
}'::jsonb
WHERE email = 'doctor@test.com';

-- Step 3: Get the user ID
SELECT id FROM auth.users WHERE email = 'doctor@test.com';

-- Step 4: Create doctor profile (replace USER_ID with the ID from step 3)
INSERT INTO public.doctors (
  user_id,
  license_number,
  specialization,
  hospital,
  verification_status,
  is_available
) VALUES (
  'USER_ID_HERE', -- Replace with actual ID
  'LIC-001',
  'Gynecologist',
  'Test Hospital',
  'APPROVED',
  true
);

-- Step 5: Verify everything
SELECT 
  u.email,
  u.raw_user_meta_data->>'role' as role,
  u.raw_user_meta_data->>'full_name' as full_name,
  d.license_number,
  d.verification_status
FROM auth.users u
LEFT JOIN public.doctors d ON d.user_id = u.id
WHERE u.email = 'doctor@test.com';
```

---

## Common Roles

| Role | Used For | Can Access |
|------|----------|------------|
| `DOCTOR` | Gynecologists/Doctors | `/doctor/*` routes |
| `GYNECOLOGIST` | Same as DOCTOR | `/doctor/*` routes |
| `ADMIN` | Platform administrators | `/admin/*` routes |
| `PATIENT` | Mobile app users | No web access |

---

## Troubleshooting

### "User metadata not showing"
- Make sure you're editing `raw_user_meta_data` not `app_metadata`
- Check with: `SELECT raw_user_meta_data FROM auth.users WHERE email = 'xxx';`

### "Still redirecting to login"
- Metadata must be set BEFORE login
- OR user needs to logout and login again after metadata is added
- Clear browser cookies/cache

### "Role not recognized"
- Check spelling: must be exactly `"DOCTOR"` (uppercase)
- Check JSON format: `{"role": "DOCTOR"}` not `{role: DOCTOR}`
- Verify with SQL query above

---

## Complete Example: Creating Test Doctor from Scratch

### In Supabase Dashboard:
1. Authentication → Users → Add User
2. Email: `doctor@test.com`
3. Password: `test123`
4. Auto Confirm: ✓
5. User Meta Data:
   ```json
   {
     "role": "DOCTOR",
     "full_name": "Dr. Test"
   }
   ```
6. Click "Create user"

### In Supabase SQL Editor:
```sql
-- Get the new user's ID
SELECT id FROM auth.users WHERE email = 'doctor@test.com';

-- Create doctor profile (replace USER_ID)
INSERT INTO public.doctors (user_id, license_number, specialization, verification_status)
VALUES ('USER_ID_FROM_ABOVE', 'LIC-001', 'Gynecologist', 'APPROVED');
```

### Test Login:
1. Go to `http://localhost:3001`
2. Login with `doctor@test.com` / `test123`
3. Should redirect to `/doctor/dashboard`

Done! 🎉
