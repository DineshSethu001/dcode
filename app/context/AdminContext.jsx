"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { supabase } from "../utils/supabase";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Read admin emails from env
  const adminEmails = useMemo(() => {
    return (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);
  }, []);

  // ✅ Check whether session user is admin
  const isAdminUser = useCallback(
    (session) => {
      const userEmail = session?.user?.email?.trim().toLowerCase();
      if (!userEmail) return false;
      return adminEmails.includes(userEmail);
    },
    [adminEmails]
  );

  // 🔄 Check session on page refresh + auth changes
  useEffect(() => {
    let mounted = true;

    const initSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      setIsAuthenticated(isAdminUser(data.session));
      setIsLoading(false);
    };

    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(isAdminUser(session));
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [isAdminUser]);

  // 🔐 Admin login (Supabase)
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    const userEmail = data?.user?.email?.trim().toLowerCase();

    // 🔒 Allow only admin emails
    if (!adminEmails.includes(userEmail)) {
      await supabase.auth.signOut();
      return { success: false, error: "Access denied" };
    }

    setIsAuthenticated(true);
    return { success: true };
  };

  // 🚪 Logout
  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  return (
    <AdminContext.Provider
      value={{
        login,
        logout,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

// ✅ Safe hook
export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used inside <AdminProvider>");
  }
  return context;
}