import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Calorisk — AI Food Scanner for Instant Nutrition" },
      {
        name: "description",
        content:
          "Snap a photo of any meal and Calorisk's AI instantly reveals calories, protein, carbs, and fat.",
      },
      { property: "og:title", content: "Calorisk — AI Food Scanner" },
      {
        property: "og:description",
        content: "Scan your meal. Know your nutrition instantly.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

const signupSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required").max(50),
  last_name: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
});

function Landing() {
  const navigate = useNavigate();
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", password: "" });

  // Redirect already-signed-in users
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/app" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) navigate({ to: "/app" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function handleGoogle() {
    setLoadingGoogle(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/app` },
    });
    if (error) {
      toast.error("Google sign-in failed. Please try again.");
      setLoadingGoogle(false);
    }
    // On success the browser is redirected to Google.
  }

  async function handleEmailSignup(e: React.FormEvent) {
    e.preventDefault();
    const parsed = signupSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoadingEmail(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/app`,
        data: {
          first_name: parsed.data.first_name,
          last_name: parsed.data.last_name,
        },
      },
    });
    setLoadingEmail(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created. Check your email to confirm, then sign in.");
  }

  return (
    <div className="min-h-screen bg-white font-sans text-foreground antialiased">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="/" className="group inline-flex items-baseline gap-0.5">
          <span className="font-display text-2xl font-extrabold tracking-tight text-foreground">
            Calor
          </span>
          <span className="font-display text-2xl font-extrabold tracking-tight text-brand">
            isk
          </span>
        </a>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl items-start justify-center px-5 pt-8 pb-16 sm:px-8">
        <section className="w-full max-w-sm">
          <div className="rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-6 sm:p-8">
            <div className="text-center">
              <h1 className="font-display text-[26px] font-bold leading-tight tracking-tight text-foreground sm:text-[28px]">
                Scan Your Meal.
                <br />
                Know Your Nutrition Instantly.
              </h1>
              <p className="mt-2 text-[15px] text-[#6b7280]">
                Get started with Calorisk today
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={handleGoogle}
                disabled={loadingGoogle}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#e5e7eb] bg-white px-4 text-[15px] font-medium text-foreground transition-all duration-200 hover:bg-gray-50 active:scale-[0.985] focus:outline-none disabled:opacity-60"
              >
                <span className="text-lg font-bold">G</span>
                <span>{loadingGoogle ? "Connecting…" : "Continue with Google"}</span>
              </button>

              <div className="flex items-center gap-3 py-1">
                <div className="h-px flex-1 bg-[#e5e7eb]" />
                <span className="text-[13px] text-[#6b7280]">or</span>
                <div className="h-px flex-1 bg-[#e5e7eb]" />
              </div>

              <form onSubmit={handleEmailSignup} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-foreground">
                      First name
                    </label>
                    <input
                      type="text"
                      value={form.first_name}
                      onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                      placeholder="John"
                      className="h-12 w-full rounded-xl border border-[#e5e7eb] bg-white px-4 text-[15px] text-foreground placeholder:text-[#9ca3af] outline-none transition-all focus:border-[#a0aec0] focus:ring-2 focus:ring-[#a0aec0]/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-foreground">
                      Last name
                    </label>
                    <input
                      type="text"
                      value={form.last_name}
                      onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                      placeholder="Doe"
                      className="h-12 w-full rounded-xl border border-[#e5e7eb] bg-white px-4 text-[15px] text-foreground placeholder:text-[#9ca3af] outline-none transition-all focus:border-[#a0aec0] focus:ring-2 focus:ring-[#a0aec0]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-xl border border-[#e5e7eb] bg-white px-4 text-[15px] text-foreground placeholder:text-[#9ca3af] outline-none transition-all focus:border-[#a0aec0] focus:ring-2 focus:ring-[#a0aec0]/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-foreground">
                    Password
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="At least 8 characters"
                    className="h-12 w-full rounded-xl border border-[#e5e7eb] bg-white px-4 text-[15px] text-foreground placeholder:text-[#9ca3af] outline-none transition-all focus:border-[#a0aec0] focus:ring-2 focus:ring-[#a0aec0]/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loadingEmail}
                  className="flex h-12 w-full items-center justify-center rounded-xl bg-brand px-4 text-[15px] font-medium text-brand-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.985] focus:outline-none disabled:opacity-60"
                >
                  {loadingEmail ? "Creating account…" : "Continue"}
                </button>
              </form>
            </div>

            <p className="mt-5 text-center text-[13px] text-[#6b7280]">
              Already have an account?{" "}
              <button
                type="button"
                onClick={async () => {
                  const parsed = z
                    .object({
                      email: z.string().trim().email(),
                      password: z.string().min(1),
                    })
                    .safeParse({ email: form.email, password: form.password });
                  if (!parsed.success) {
                    toast.error("Enter your email and password to sign in.");
                    return;
                  }
                  setLoadingEmail(true);
                  const { error } = await supabase.auth.signInWithPassword(parsed.data);
                  setLoadingEmail(false);
                  if (error) toast.error(error.message);
                }}
                className="font-semibold text-[#3b82f6] transition-colors hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
