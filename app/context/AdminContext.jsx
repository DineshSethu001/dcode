"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 🔄 Check existing session on refresh
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(!!data.session);
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 🔐 Supabase Login ONLY (Admin restricted)
  const login = async (email, password) => {
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // 🔒 Admin email check AFTER successful login
    if (data.user.email !== ADMIN_EMAIL) {
      await supabase.auth.signOut();
      return { success: false, error: "Access denied" };
    }

    return { success: true, user: data.user };
  };

  // 🚪 Logout
  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  return (
    <AdminContext.Provider
      value={{ login, logout, isAuthenticated, isLoading }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
