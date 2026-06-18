# 🔑 Get Your Supabase Service Role Key

## Steps:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard

2. Select your **Elira Health** project

3. Click on **Settings** (gear icon in sidebar)

4. Click on **API**

5. Scroll down to **Project API keys**

6. Copy the **service_role** key (NOT the anon key)

   ⚠️ **IMPORTANT:** 
   - This key bypasses Row Level Security
   - NEVER expose it in client-side code
   - Keep it secret in `.env.local`

7. Add it to your `.env.local` file:

```bash
# Add this line to .env.local
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi...YOUR_KEY_HERE
```

8. Restart your dev server:

```bash
# Stop the server (Ctrl+C)
npm run dev
```

---

## Your Updated .env.local Should Look Like:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://nddwczvegewcjmketyvw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...YOUR_SERVICE_KEY
```

---

## Why Do We Need This?

The service role key is needed for **server-side operations** that bypass Row Level Security (RLS), such as:

- Creating user accounts (signup)
- Admin operations
- Background jobs
- Database migrations

During signup:
1. User is NOT authenticated yet
2. RLS blocks unauthenticated inserts
3. Service role key bypasses RLS
4. Profile and doctor records are created
5. User can then login

---

## Security Notes

✅ **Safe:**
- Used only in server-side code (`src/lib/services/authService.ts`)
- Never sent to browser
- Never in client components

❌ **Never:**
- Commit to Git (add `.env.local` to `.gitignore`)
- Use in client-side code
- Share publicly
- Expose in API responses

---

## Test After Adding Key

```bash
# 1. Add service role key to .env.local
# 2. Restart dev server
npm run dev

# 3. Test signup
http://localhost:3001/signup
```

Should work without RLS errors! 🎉
