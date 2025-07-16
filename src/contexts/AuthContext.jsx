import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("vertexUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    // This will be replaced with actual API call
    // For now, simulate login with mock data
    const mockUser = {
      id: "1",
      email,
      name: email.split("@")[0],
      role: email.includes("employer") ? "employer" : "jobseeker",
      company: email.includes("employer") ? "Tech Corp" : undefined,
      location: "San Francisco, CA",
      bio: "Passionate about connecting talent with opportunities",
      skills: email.includes("employer")
        ? undefined
        : ["JavaScript", "React", "Node.js"],
      experience: email.includes("employer") ? undefined : "3+ years",
      createdAt: new Date().toISOString(),
    };

    setUser(mockUser);
    localStorage.setItem("vertexUser", JSON.stringify(mockUser));
  };

  const register = async (userData) => {
    // This will be replaced with actual API call
    const mockUser = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      role: userData.role,
      company: userData.company,
      location: "",
      bio: "",
      skills: userData.role === "jobseeker" ? [] : undefined,
      experience: userData.role === "jobseeker" ? "" : undefined,
      createdAt: new Date().toISOString(),
    };

    setUser(mockUser);
    localStorage.setItem("vertexUser", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("vertexUser");
  };

  const updateProfile = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("vertexUser", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
