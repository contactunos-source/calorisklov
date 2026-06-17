# Calorisk

AI food scanner landing page. Built with TanStack Start + React + Tailwind, with Supabase for auth and database.

This repo is designed to be deployed: **Lovable → GitHub → Vercel**, using **your own** Supabase project for the backend.

---

## Deploy in 6 steps (no coding required)

### 1. Set up your Supabase project
1. Go to [supabase.com](https://supabase.com) → your project → **SQL Editor** → **New query**.
2. Open the file `docs/supabase-setup.sql` from this repo.
3. Copy the entire contents, paste into the SQL Editor, click **Run**.
   This creates the `profiles` table, security rules, and an auto-trigger that creates a profile when someone signs up.

### 2. Enable Google sign-in (optional but recommended)
In Supabase Dashboard → **Authentication → Providers → Google**:
- Toggle **Enable**.
- Follow Supabase's instructions to create a Google OAuth client in [Google Cloud Console](https://console.cloud.google.com/).
- Paste the **Client ID** and **Client Secret** back into Supabase.
- Copy the **Callback URL** Supabase shows and paste it into the Google OAuth client's "Authorized redirect URIs".

### 3. Add your Vercel URL to Supabase
In Supabase Dashboard → **Authentication → URL Configuration**:
- **Site URL**: `https://your-app.vercel.app`
- **Redirect URLs**: add both `https://your-app.vercel.app/**` and `http://localhost:3000/**`

### 4. Push this repo to GitHub
Use Lovable's GitHub integration (top right → GitHub → Connect project), or download and push manually.

### 5. Import into Vercel
1. Go to [vercel.com](https://vercel.com) → **Add New… → Project** → pick your GitHub repo.
2. Framework preset: **Other** (Vercel auto-detects Vite).
3. **Environment Variables** — copy from `.env.example` and fill in the values from Supabase Dashboard → **Project Settings → API**:

   | Variable | Where to find it |
   |---|---|
   | `VITE_SUPABASE_URL` | Project URL |
   | `VITE_SUPABASE_PUBLISHABLE_KEY` | `anon` / publishable key |
   | `VITE_SUPABASE_PROJECT_ID` | Your project ref (the subdomain in the URL) |
   | `SUPABASE_URL` | same as `VITE_SUPABASE_URL` |
   | `SUPABASE_PUBLISHABLE_KEY` | same as `VITE_SUPABASE_PUBLISHABLE_KEY` |
   | `SUPABASE_SERVICE_ROLE_KEY` | `service_role` key (**keep secret**) |

4. Click **Deploy**.

### 6. Done
Visit your Vercel URL, sign up, and confirm a row appears in your Supabase `profiles` table.

---

## Local development

```bash
bun install        # or: npm install
cp .env.example .env   # then fill in your Supabase values
bun run dev        # http://localhost:3000
```

---

## Project structure

```
src/
  routes/              # Pages (TanStack Start file-based routing)
    index.tsx          # Landing page (sign up / sign in)
    _authenticated/    # Protected pages (require login)
      app.tsx          # Post-login welcome page
  integrations/
    supabase/          # Supabase client (browser + server)
  components/ui/       # Reusable UI components
supabase/
  migrations/          # Database schema — run in your Supabase SQL Editor
vercel.json            # Vercel build settings
.env.example           # List of required environment variables
```

---

## Notes for non-coders

- **Where data lives**: in your Supabase project. Nothing is stored in this repo.
- **What deploys to Vercel**: only the frontend + server code in `src/`. Database schema lives in Supabase and is changed by running new SQL files from `supabase/migrations/`.
- **Adding a new page**: create a file in `src/routes/`. Lovable's chat can do this for you.
- **Rotating secrets**: change the value in Vercel → Settings → Environment Variables, then redeploy.
