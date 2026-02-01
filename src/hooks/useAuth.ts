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

    const applySession = async (nextSession: Session | null) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);

      if (!nextSession?.user) {
        setUserRole(null);
        return;
      }

      try {
        const role = await fetchRole(nextSession.user.id);
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
    };

    // Set up auth state listener FIRST
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setLoading(true);
      await applySession(nextSession);
      if (!cancelled) setLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session: existingSession } }) => {
      setLoading(true);
      await applySession(existingSession);
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
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
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
