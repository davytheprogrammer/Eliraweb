# 🚀 Quick Test: Doctor Signup

## ✅ Step-by-Step Test

### 1. Start Dev Server
```bash
npm run dev
```

### 2. Visit Signup Page
```
http://localhost:3001/signup
```

### 3. Fill the Form

**Test Data:**
```
Full Name: Dr. Test Doctor
Email: testdoctor@hospital.com
Password: test1234
Confirm Password: test1234
License Number: LIC-TEST-001
Specialization: Gynecologist (select from dropdown)
Hospital: Test General Hospital
Years of Experience: 5
```

### 4. Click "Create Doctor Account"

You should see:
- Loading spinner
- Form disables
- Redirect to success page

### 5. Success Page Should Show
- ✅ Green checkmark
- "Account Created Successfully!"
- What happens next instructions
- "Go to Login" button

### 6. Verify in Database

**SQL Query:**
```sql
-- Check if user was created
SELECT 
  p.id,
  p.full_name,
  p.email,
  p.role,
  d.license_number,
  d.specialization,
  d.hospital,
  d.verification_status,
  d.is_available
FROM profiles p
JOIN doctors d ON d.user_id = p.id
WHERE p.email = 'testdoctor@hospital.com';
```

**Expected Result:**
```
full_name: Dr. Test Doctor
email: testdoctor@hospital.com
role: DOCTOR
license_number: LIC-TEST-001
specialization: Gynecologist
hospital: Test General Hospital
verification_status: PENDING
is_available: false
```

---

## 🧪 Test Error Cases

### Duplicate Email
1. Try signing up with same email again
2. Should show: "This email is already registered"

### Password Mismatch
1. Password: `test1234`
2. Confirm: `different`
3. Should show: "Passwords do not match"

### Invalid Email
1. Email: `notanemail`
2. Should show: "Please enter a valid email address"

### Short Password
1. Password: `test`
2. Should show: "Password must be at least 8 characters"

### Empty Fields
1. Leave any required field empty
2. Should show: Field-specific error message

---

## 📊 Navigation Flow

```
┌─────────────┐
│   /signup   │  User fills form
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  Server validates   │  Checks all fields
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Creates auth user  │  Supabase Auth
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Creates profile    │  profiles table
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Creates doctor     │  doctors table
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ /verification-      │  Success page
│     pending         │
└─────────────────────┘
       │
       ▼
┌─────────────────────┐
│   User clicks       │  Returns to login
│   "Go to Login"     │
└─────────────────────┘
```

---

## 🔍 Where to Find Things

### Pages
- Signup Form: `src/app/signup/page.tsx`
- Success Page: `src/app/verification-pending/page.tsx`

### Components
- SignupForm: `src/components/forms/SignupForm.tsx`
- FormInput: `src/components/forms/FormInput.tsx`
- FormSelect: `src/components/forms/FormSelect.tsx`

### Logic
- Server Action: `src/lib/actions/signup.actions.ts`
- Auth Service: `src/lib/services/authService.ts`

### Styling
- Uses Tailwind CSS
- Purple accent: `bg-purple-600`, `text-purple-600`
- Responsive: `md:grid-cols-2`

---

## 🎨 Visual Preview

### Signup Page
```
╔════════════════════════════════════════╗
║         🏥 Elira Health               ║
║   Join Our Medical Network            ║
║   Register as a healthcare provider   ║
╠════════════════════════════════════════╣
║                                        ║
║  ℹ️ Your account will be reviewed     ║
║                                        ║
║  Full Name *                          ║
║  [Dr. Test Doctor            ]        ║
║                                        ║
║  Email Address *                      ║
║  [testdoctor@hospital.com    ]        ║
║                                        ║
║  Password *         Confirm Password *║
║  [••••••••]         [••••••••]        ║
║                                        ║
║  Medical License Number *             ║
║  [LIC-TEST-001               ]        ║
║                                        ║
║  Specialization *                     ║
║  [▼ Gynecologist             ]        ║
║                                        ║
║  Hospital/Clinic *  Years Experience *║
║  [Test Hospital]    [5             ]  ║
║                                        ║
║  [   Create Doctor Account   ]        ║
║                                        ║
║  Already have an account? Sign in     ║
╚════════════════════════════════════════╝
```

### Success Page
```
╔════════════════════════════════════════╗
║                                        ║
║         ✅ Success!                    ║
║                                        ║
║   Account Created Successfully!       ║
║   Your doctor account is now pending  ║
║   verification by our admin team.     ║
║                                        ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ║
║  What happens next?                   ║
║  ✓ Our team will review your creds   ║
║  ✓ You'll receive email notification ║
║  ✓ Once approved, you can login      ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ║
║                                        ║
║  ⏱️ Verification: 24-48 hours         ║
║                                        ║
║  [      Go to Login      ]            ║
║                                        ║
╚════════════════════════════════════════╝
```

---

## ✅ Checklist Before Testing

- [ ] Database migration ran (`supabase_migration_existing.sql`)
- [ ] Tables exist: `profiles`, `doctors`
- [ ] Dev server running (`npm run dev`)
- [ ] Supabase env vars set in `.env.local`
- [ ] Browser JavaScript enabled
- [ ] Network connection active

---

## 🐛 Common Issues

### "Cannot read properties of undefined"
- **Fix:** Check Supabase env vars in `.env.local`

### "User already exists"
- **Fix:** Delete from database:
  ```sql
  DELETE FROM auth.users WHERE email = 'testdoctor@hospital.com';
  ```

### Page doesn't load
- **Fix:** Clear Next.js cache: `rm -rf .next`

### Form doesn't submit
- **Fix:** Check browser console for errors

### Redirect doesn't work
- **Fix:** Middleware must allow `/verification-pending`

---

## 🎉 Success Criteria

✅ Signup form renders correctly
✅ All fields validate properly
✅ Form submits without errors
✅ User created in auth.users
✅ Profile created in profiles table
✅ Doctor created in doctors table
✅ Status is PENDING
✅ is_available is false
✅ Redirects to success page
✅ Can click "Go to Login"
✅ No console errors

---

## 📞 Need Help?

Check these files:
- Full docs: `SIGNUP_FEATURE.md`
- Database setup: `SETUP_GUIDE.md`
- Quick start: `CHECKLIST.md`

Or check:
- Browser console (F12)
- Network tab (for API errors)
- Supabase logs (in dashboard)

Happy testing! 🚀
