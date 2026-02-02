import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import type { AppRole } from "@/types/booking";
import { toast } from "@/hooks/use-toast";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<AppRole | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchRole = async (userId: string) => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) throw error;
      return (data?.role as AppRole) ?? null;
    };

    // IMPORTANT: Keep onAuthStateChange callback synchronous.
    // Any Supabase calls (like role lookup) must be deferred.
    const applySessionSync = (nextSession: Session | null) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      // Reset role immediately; it will be re-fetched below.
      setUserRole(null);

      const userId = nextSession?.user?.id;
      if (!userId) return;

      setTimeout(async () => {
        if (cancelled) return;
        try {
          const role = await fetchRole(userId);
          if (!cancelled) setUserRole(role);
        } catch (err: any) {
          if (!cancelled) setUserRole(null);
          // Don't hard-fail auth on role fetch; but surface for debugging.
          toast({
            variant: "destructive",
            title: "Role lookup failed",
            description: err?.message || "Could not fetch user role.",
          });
        }
      }, 0);
    };

    // Set up auth state listener FIRST
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setLoading(true);
      applySessionSync(nextSession);
      if (!cancelled) setLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      setLoading(true);
      applySessionSync(existingSession);
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: fullName },
      },
    });

    if (error) throw error;
    return data;
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    setLoading(true);
    let lastError: any = null;

    // Best-effort server revoke, but ALWAYS ensure local session is cleared.
    try {
      const { error } = await supabase.auth.signOut({ scope: "global" });
      if (error) {
        lastError = error;
        // Fallback: local-only signout (clears storage) even if revoke fails.
        await supabase.auth.signOut({ scope: "local" });
      }
    } catch (err: any) {
      lastError = err;
      try {
        await supabase.auth.signOut({ scope: "local" });
      } catch (err2: any) {
        lastError = err2;
      }
    } finally {
      // Hard-clear any persisted auth tokens (failsafe for stuck sessions).
      try {
        Object.keys(localStorage)
          .filter((k) => k.startsWith("sb-") && k.includes("auth-token"))
          .forEach((k) => localStorage.removeItem(k));
      } catch {
        // ignore
      }

      setSession(null);
      setUser(null);
      setUserRole(null);
      setLoading(false);
    }

    if (lastError) {
      // Surface the issue but don't block sign-out UX.
      toast({
        variant: "destructive",
        title: "Sign out issue",
        description: lastError?.message || "Signed out locally, but server revoke failed.",
      });
    }
  };

  const isAdmin = userRole === 'super_admin' || userRole === 'staff';
  const isSuperAdmin = userRole === 'super_admin';

  return {
    user,
    session,
    loading,
    userRole,
    isAdmin,
    isSuperAdmin,
    signUp,
    signIn,
    signOut,
  };
}
