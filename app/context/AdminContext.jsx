"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabase";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  /* ---------- SESSION CHECK ---------- */
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data?.session?.user;

      if (sessionUser && sessionUser.email === ADMIN_EMAIL) {
        setUser(sessionUser);
      } else {
        setUser(null);
      }

      setIsLoading(false);
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const sessionUser = session?.user;
        if (sessionUser && sessionUser.email === ADMIN_EMAIL) {
          setUser(sessionUser);
        } else {
          setUser(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [ADMIN_EMAIL]);

  /* ---------- LOGIN (v2) ---------- */
  const login = async (email, password) => {
    setIsLoading(true);

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user.email !== ADMIN_EMAIL) {
        await supabase.auth.signOut();
        return { success: false, error: "Access denied" };
      }

      setUser(data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: "Network error" };
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- LOGOUT ---------- */
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AdminContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}