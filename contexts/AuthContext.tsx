"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { fetchAPI } from "@/utils/api";

interface User {
  id: string;
  email: string;
  is_active?: boolean;
  is_superuser?: boolean;
  is_verified?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const fetchUser = async () => {
    const token = localStorage.getItem("access_token");
    console.log(token)
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetchAPI("/users/me", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        // If token is invalid or expired
        localStorage.removeItem("access_token");
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = (token: string) => {
    localStorage.setItem("access_token", token);
    fetchUser();
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    router.push("/auth/login");
  };

useEffect(() => {
  if (isLoading) return;

  const isAuthRoute =
    pathname === "/auth/login" ||
    pathname === "/auth/register";

  const isHomePage = pathname === "/";

  // Logged-in users should not see auth pages
  if (user && isAuthRoute) {
    router.push("/dashboard");
    return;
  }

  // Home page is public for everyone
  if (isHomePage) {
    return;
  }

  // Protected routes
  const isProtectedRoute = !isAuthRoute;

  if (!user && isProtectedRoute) {
    router.push("/auth/login");
  }
}, [user, isLoading, pathname, router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
