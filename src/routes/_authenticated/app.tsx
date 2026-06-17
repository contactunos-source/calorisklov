import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({ meta: [{ title: "Calorisk — Dashboard" }] }),
  component: AppHome,
});

function AppHome() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const u = data.user;
      if (!u) return;
      setEmail(u.email ?? "");
      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("id", u.id)
        .maybeSingle();
      setName(profile?.first_name ?? (u.user_metadata?.first_name as string) ?? "");
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <span className="font-display text-2xl font-extrabold tracking-tight">
          Calor<span className="text-brand">isk</span>
        </span>
        <button
          onClick={signOut}
          className="h-10 rounded-xl border border-[#e5e7eb] bg-white px-4 text-sm font-medium hover:bg-gray-50 active:scale-[0.985] transition-all"
        >
          Sign out
        </button>
      </header>
      <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8 text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Welcome{name ? `, ${name}` : ""}.
        </h1>
        <p className="mt-3 text-[#6b7280]">
          You're signed in as {email}. The food scanner is coming next.
        </p>
      </main>
    </div>
  );
}
