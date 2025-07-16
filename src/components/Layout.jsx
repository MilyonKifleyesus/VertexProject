import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import {
  Briefcase,
  Home,
  PlusCircle,
  User,
  LogOut,
  FileText,
  Users,
} from "lucide-react";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const sidebarItems = user
    ? [
        { path: "/dashboard", icon: Home, label: "Dashboard" },
        { path: "/jobs", icon: Briefcase, label: "Jobs" },
        ...(user.role === "employer"
          ? [{ path: "/jobs/new", icon: PlusCircle, label: "Post Job" }]
          : []),
        { path: `/profile/${user.id}`, icon: User, label: "Profile" },
      ]
    : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Vertex Logo" className="h-8 w-8" />
            <span className="text-2xl font-bold text-gray-900">Vertex</span>
          </Link>

          <nav className="flex items-center space-x-6">
            {!user ? (
              <>
                <Link
                  to="/auth/login"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - only show when user is logged in */}
        {user && (
          <aside className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen">
            <nav className="p-4 space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    isActive(item.path)
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className={`flex-1 ${user ? "p-6" : ""}`}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
