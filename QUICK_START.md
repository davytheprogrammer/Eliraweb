# 🎯 Quick Start: Create Your First Doctor Account

## ⚡ Super Fast Method (5 minutes)

### Step 1: Open Supabase Dashboard
1. Go to: https://supabase.com/dashboard
2. Click on your **Elira Health** project

### Step 2: Navigate to Users
```
Left Sidebar → Authentication → Users
```

### Step 3: Click "Add user" Button
Look for the green button in the top-right corner that says **"Add user"**

### Step 4: Fill the Form

**Email:**
```
doctor@test.com
```

**Password:**
```
test123
```

**Auto Confirm User:** ☑️ **CHECK THIS BOX** (important!)

### Step 5: Expand "User Meta Data"
- You'll see a section called **"User Meta Data"**
- Click on it to expand
- You'll see a JSON text box

### Step 6: Paste This JSON
Delete whatever is there and paste exactly this:
```json
{
  "role": "DOCTOR",
  "full_name": "Dr. Test Doctor"
}
```

### Step 7: Click "Create user"
The green button at the bottom

### Step 8: Copy the User ID
- After user is created, you'll see a list of users
- Click on the user you just created
- You'll see their details page
- **Copy the `id` field** (it looks like: `a1b2c3d4-5678-90ab-cdef-1234567890ab`)

### Step 9: Create Doctor Profile
Go to: **SQL Editor** (in left sidebar)

Paste this SQL and **replace** `USER_ID_HERE` with the ID you copied:

```sql
INSERT INTO public.doctors (
  user_id,
  license_number,
  specialization,
  verification_status,
  is_available
) VALUES (
  'USER_ID_HERE',  -- ⚠️ PASTE YOUR USER ID HERE
  'LIC-001',
  'Gynecologist',
  'APPROVED',
  true
);
```

Click **"RUN"** button

### Step 10: Test Login! 🎉
1. Go to: http://localhost:3001
2. Login with:
   - **Email:** `doctor@test.com`
   - **Password:** `test123`
3. You should see the doctor dashboard!

---

## 🎨 Visual Guide

```
┌────────────────────────────────────────────────────────────┐
│  Supabase Dashboard                                         │
├────────────────────────────────────────────────────────────┤
│                                                              │
│  ⚡ Authentication                                          │
│     ├── Users                     👈 CLICK HERE             │
│     ├── Policies                                            │
│     └── Providers                                           │
│                                                              │
└────────────────────────────────────────────────────────────┘

Then click the green button:

┌────────────────────────────────────────────────────────────┐
│  Users                                    [+ Add user] 👈   │
├────────────────────────────────────────────────────────────┤
│                                                              │
│  📋 List of users will appear here                         │
│                                                              │
└────────────────────────────────────────────────────────────┘

Fill the form:

┌────────────────────────────────────────────────────────────┐
│  Add User                                                   │
├────────────────────────────────────────────────────────────┤
│                                                              │
│  Email *                                                    │
│  ┌────────────────────────────────────────────────────┐   │
│  │ doctor@test.com                                     │   │
│  └────────────────────────────────────────────────────┘   │
│                                                              │
│  Password *                                                 │
│  ┌────────────────────────────────────────────────────┐   │
│  │ test123                                             │   │
│  └────────────────────────────────────────────────────┘   │
│                                                              │
│  ☑ Auto Confirm User  👈 CHECK THIS!                       │
│                                                              │
│  ▼ User Meta Data  👈 CLICK TO EXPAND                      │
│  ┌────────────────────────────────────────────────────┐   │
│  │ {                                                   │   │
│  │   "role": "DOCTOR",                                 │   │
│  │   "full_name": "Dr. Test Doctor"                    │   │
│  │ }                                                   │   │
│  └────────────────────────────────────────────────────┘   │
│                                                              │
│                              [Create user] 👈 CLICK         │
│                                                              │
└────────────────────────────────────────────────────────────┘
```

---

## 🔑 Different Role Examples

### For Admin User:
```json
{
  "role": "ADMIN",
  "full_name": "Admin User"
}
```

### For Gynecologist:
```json
{
  "role": "GYNECOLOGIST",
  "full_name": "Dr. Sarah Johnson"
}
```

### For Another Doctor:
```json
{
  "role": "DOCTOR",
  "full_name": "Dr. Michael Chen"
}
```

---

## ⚠️ Important Notes

### 1. **Auto Confirm User** must be checked
If you forget this, user won't be able to login until they confirm email.

### 2. **Role must be UPPERCASE**
- ✅ `"DOCTOR"` - Correct
- ❌ `"doctor"` - Wrong
- ❌ `"Doctor"` - Wrong

### 3. **JSON format matters**
- ✅ `"role": "DOCTOR"` with quotes - Correct
- ❌ `role: DOCTOR` without quotes - Wrong

### 4. **Doctor profile is separate**
Creating a user with role="DOCTOR" is NOT enough. You must also:
1. Create the user (Steps 1-7)
2. Create doctor profile in `doctors` table (Steps 8-9)

---

## 🆘 Common Errors

### "Invalid JSON"
Your JSON has a syntax error. Copy-paste the example exactly:
```json
{
  "role": "DOCTOR",
  "full_name": "Dr. Test"
}
```

### "User already exists"
Email is taken. Try a different email or delete the existing user first.

### "Can't login"
Did you check **Auto Confirm User**? If not:
- Go to Users list
- Click on the user
- Click "Send confirmation email" or manually set `email_confirmed_at`

### "Redirects back to login"
Either:
1. User metadata not set correctly - check the JSON
2. Doctor profile not created - run the SQL from Step 9
3. Doctor not approved - check `verification_status = 'APPROVED'`

---

## ✅ Verify It Worked

Run this in SQL Editor to check everything:

```sql
-- Check user metadata
SELECT 
  email,
  raw_user_meta_data->>'role' as role,
  raw_user_meta_data->>'full_name' as full_name,
  email_confirmed_at
FROM auth.users
WHERE email = 'doctor@test.com';

-- Check doctor profile
SELECT 
  d.license_number,
  d.specialization,
  d.verification_status,
  d.is_available,
  p.full_name,
  p.email
FROM doctors d
JOIN profiles p ON d.user_id = p.id
WHERE p.email = 'doctor@test.com';
```

Both queries should return 1 row each.

---

## 🎉 Success!

If you can login and see the dashboard, congratulations! You've successfully set up your first doctor account.

Now you can:
- Create more doctors
- Create admin users
- Start building features
- Test the mobile app API

Happy coding! 🚀
