## Goal
Make the Calorisk landing page functional: working Google sign-in, working email sign-up form, and a real signed-in destination.

## What gets wired

1. **Enable Lovable Cloud** — provisions auth + database so sign-in actually works (no external setup needed from you).

2. **Auth providers**
   - Google OAuth via the Lovable broker (`lovable.auth.signInWithOAuth("google", ...)`).
   - Email sign-up using the form already on the page (first name, last name, email) + a password field we'll add. On submit → `supabase.auth.signUp` with the names stored in user metadata.

3. **Profiles table** (so first/last name persist)
   - `public.profiles` keyed by `auth.users.id` with `first_name`, `last_name`, `email`.
   - RLS: users can read/update only their own row.
   - Trigger auto-creates a profile row on signup using the metadata from the form.

4. **Routes**
   - `/` — landing (current page), buttons become functional. If already signed in, redirect to `/app`.
   - `/_authenticated/app.tsx` — minimal placeholder "Welcome, {first name}" page with a Sign out button. This is the post-login destination. (Full dashboard/results pages still come later as you said.)
   - Root `__root.tsx` — single `onAuthStateChange` listener that invalidates the router on SIGNED_IN / SIGNED_OUT.

5. **UX polish on the form**
   - Zod validation (name required, valid email, password ≥ 8 chars).
   - Loading state on the Continue / Google buttons while the request is in flight.
   - Toast on error, redirect to `/app` on success.

## Open questions before I build

1. **Password field** — your current form has name + email only. Email signup needs a password. Add a password input to the card, or switch email signup to **magic link** (passwordless: user clicks a link in their email)?
2. **Post-login page** — okay to ship a minimal `/app` placeholder now so the flow has somewhere to land, with the real scanner/dashboard built later?

Reply with answers (or "password" / "magic link" + "yes/no") and I'll lock the plan and implement.