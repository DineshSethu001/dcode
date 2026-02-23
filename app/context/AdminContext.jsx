"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabase";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Change this to your admin email
  const ADMIN_EMAIL = "dineshsethu15981@gmail.com";

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
      async (_event, session) => {
        const sessionUser = session?.user;

        if (sessionUser && sessionUser.email === ADMIN_EMAIL) {
          setUser(sessionUser);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
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
  };

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
  return useContext(AdminContext);
}