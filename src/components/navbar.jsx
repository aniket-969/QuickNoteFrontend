import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Plus, Home, Menu, X, LogOut } from "lucide-react";
import { paths } from "../config/paths";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout.mutateAsync();
    setMenuOpen(false);
  };

  return (
    <nav className="bg-bg border-b border-border px-4 py-2 flex items-center justify-between relative">
      {/* Brand / Home */}
      <Link to={paths.notes.list.getHref()} className="flex items-center space-x-2">
        <Home className="w-6 h-6 text-primary" />
        <span className="text-xl font-semibold text-text">QuickNotes</span>
      </Link>

      {/* Desktop nav items */}
      <div className="hidden md:flex items-center space-x-6">
        <Link
          to={paths.notes.create.getHref()}
          className="flex items-center px-3 py-1 bg-primary text-white rounded hover:bg-primary/90 transition"
        >
          <Plus className="w-4 h-4 mr-1" /> Create
        </Link>

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded hover:bg-surface/50 transition"
        >
          {theme === "light" ? (
            <Moon className="w-6 h-6 text-text" />
          ) : (
            <Sun className="w-6 h-6 text-text" />
          )}
        </button>

        <button
          onClick={handleLogout}
          disabled={logout.isLoading}
          className="flex items-center px-3 py-1 bg-destructive rounded hover:bg-destructive/90 transition disabled:opacity-50"
        >
          <LogOut className="w-5 h-5 text-text" />
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen((o) => !o)}
        className="md:hidden p-2"
        aria-label="Menu"
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-bg border-t border-border flex flex-col md:hidden">
          <Link
            to={paths.notes.list.getHref()}
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 hover:bg-surface"
          >
            Home
          </Link>
          <Link
            to={paths.notes.create.getHref()}
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 hover:bg-surface"
          >
            Create
          </Link>
          <button
            onClick={() => {
              toggleTheme(); setMenuOpen(false);
            }}
            className="text-left px-4 py-2 hover:bg-surface"
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
          <button
            onClick={handleLogout}
            disabled={logout.isLoading}
            className="text-left px-4 py-2 hover:bg-surface disabled:opacity-50"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
