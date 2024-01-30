"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";

import React, { createContext } from "react";
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, loading, error] = useAuthState(auth);
  // const [loggedIn, setLoggedIn] = useState(user);
  return <AuthContext.Provider value={{user, loading, error}}>{children}</AuthContext.Provider>;
}
