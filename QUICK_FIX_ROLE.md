# ⚡ Quick Fix: Role Constraint Error

## The Problem in Pictures

### What's Happening:

```
You: "Hey database, insert role = 'DOCTOR'"
Database: "Sorry, I only accept 'PATIENT'"
You: ❌ Error!
```

### Why:

```
┌─────────────────────────────┐
│   profiles table            │
├─────────────────────────────┤
│ role column constraint:     │
│                             │
│ ✅ PATIENT    (allowed)     │
│ ❌ DOCTOR     (blocked!)    │
│ ❌ ADMIN      (blocked!)    │
└─────────────────────────────┘
```

---

## The Fix (Copy-Paste)

### Open Supabase SQL Editor and run:

```sql
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('PATIENT', 'DOCTOR', 'ADMIN', 'GYNECOLOGIST'));
```

### Result:

```
┌─────────────────────────────┐
│   profiles table            │
├─────────────────────────────┤
│ role column constraint:     │
│                             │
│ ✅ PATIENT    (allowed)     │
│ ✅ DOCTOR     (allowed!)    │
│ ✅ ADMIN      (allowed!)    │
│ ✅ GYNECOLOGIST (allowed!)  │
└─────────────────────────────┘
```

---

## Where to Run This

```
1. Open browser
   ↓
2. Go to: supabase.com/dashboard
   ↓
3. Click your project
   ↓
4. Click "SQL Editor" (left sidebar)
   ↓
5. Paste the SQL above
   ↓
6. Click "RUN" button
   ↓
7. See "Success" ✅
```

---

## Test It Worked

Visit: `http://localhost:3001/signup`

Try signing up. Should work now! 🎉

---

## Two Fixes Needed Total

For signup to work, you need BOTH:

### Fix #1: Service Role Key ✅
File: `FIX_RLS_ERROR.md`
```bash
# Add to .env.local
SUPABASE_SERVICE_ROLE_KEY=your-key-here
```

### Fix #2: Role Constraint ✅
This file - run the SQL above

---

## Visual: Before vs After

### Before (Broken):

```
User submits signup form
    ↓
Create auth user ✅
    ↓
Insert into profiles with role='DOCTOR'
    ↓
❌ ERROR: "DOCTOR" not allowed
    ↓
Signup fails
```

### After (Fixed):

```
User submits signup form
    ↓
Create auth user ✅
    ↓
Insert into profiles with role='DOCTOR'
    ↓
✅ SUCCESS: "DOCTOR" is now allowed
    ↓
Insert into doctors table ✅
    ↓
Redirect to success page ✅
```

---

## TL;DR

**Problem:** Database won't accept `role = 'DOCTOR'`

**Fix:** Tell database to accept 'DOCTOR', 'ADMIN', 'GYNECOLOGIST'

**How:** Run the SQL in Supabase SQL Editor

**Done!** ✅
