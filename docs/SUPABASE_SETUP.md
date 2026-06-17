# Connect Calorisk to your Supabase project

Your Supabase project: `https://eyyieruywvdqradsqpdu.supabase.co`

Do these 3 steps **once** inside your Supabase dashboard. The app code is already wired — no code changes needed on your side.

---

## 1. Create the `profiles` table + auto-create trigger

Open **Supabase Dashboard → SQL Editor → New query**, paste the contents of
[`docs/supabase-setup.sql`](./supabase-setup.sql), and click **Run**.

This creates:
- `public.profiles` table (linked to `auth.users`)
- Row-Level Security so users can only see their own profile
- A trigger that auto-inserts a profile row whenever someone signs up

---

## 2. Enable Google Sign-In

In Supabase Dashboard:

1. Go to **Authentication → Providers → Google** → toggle **Enable**.
2. Supabase shows a **Callback URL** that looks like:
   `https://eyyieruywvdqradsqpdu.supabase.co/auth/v1/callback`
   Copy it.
3. Open [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials)
   → **Create OAuth client ID** → **Web application**.
4. Under **Authorized redirect URIs**, paste the Supabase callback URL from step 2.
5. Copy the generated **Client ID** and **Client secret** back into the
   Google provider screen in Supabase → **Save**.

---

## 3. Allow your app URLs to receive the login redirect (fixes 404 after login)

In Supabase Dashboard → **Authentication → URL Configuration**:

- **Site URL**: your production URL (e.g. `https://your-app.vercel.app`)
- **Redirect URLs** — add every URL you'll log in from, one per line:
  ```
  http://localhost:3000/**
  http://localhost:5173/**
  https://your-app.vercel.app/**
  https://*.vercel.app/**
  ```

Without this, Supabase blocks the redirect back to `/app` and you get a 404.

---

## 4. Add the env vars to Vercel

When you deploy, set these in **Vercel → Project → Settings → Environment Variables**:

| Name | Value |
| --- | --- |
| `VITE_SUPABASE_URL` | `https://eyyieruywvdqradsqpdu.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | your anon public key |
| `SUPABASE_URL` | `https://eyyieruywvdqradsqpdu.supabase.co` |
| `SUPABASE_PUBLISHABLE_KEY` | your anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | service role key (from Supabase → Settings → API) |

> **Note on the Lovable preview:** the preview window here runs against
> Lovable's managed backend, not your Supabase. That's by design — keeps
> test signups out of your real database. Your Vercel deployment will use
> the credentials above.

---

## Auth flow (already implemented)

- **Login** (Google or email/password) → `src/routes/index.tsx`
- **Callback** → Supabase handles it, redirects to `/app`
- **Protected `/app`** → `src/routes/_authenticated/route.tsx` checks
  `supabase.auth.getUser()` and bounces unauthenticated visitors to `/`
- **Profile data** → `src/routes/_authenticated/app.tsx` reads from `profiles`
- **Sign out** → button in `/app` calls `supabase.auth.signOut()` and returns to `/`
- **Errors** → shown via `sonner` toasts
