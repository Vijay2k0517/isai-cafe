"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  User,
  LogOut,
  Calendar,
  ChefHat,
  Briefcase,
  Coffee,
  ChevronDown,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setShowUserMenu(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setShowUserMenu(false);
    window.dispatchEvent(new Event("authChange"));

    if (pathname === "/agent") {
      router.push("/");
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "agent":
        return <Briefcase className="w-4 h-4" />;
      case "admin":
        return <ChefHat className="w-4 h-4" />;
      default:
        return <Coffee className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "agent":
        return "text-blue-400";
      case "admin":
        return "text-purple-400";
      default:
        return "text-[#EFC1A9]";
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#1E1E1E]/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-3">
          <Link href="/" className="flex-shrink-0">
            <span className="isai-font text-2xl sm:text-3xl md:text-4xl font-bold text-[#EFC1A9] hover:text-[#d4b088] transition-colors">
              Isai
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative group ${
                  pathname === link.href
                    ? "text-[#EFC1A9]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#EFC1A9] rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            <Link
              href="/events"
              className="px-4 py-2 bg-[#EFC1A9]/20 text-[#EFC1A9] rounded-lg text-sm font-medium hover:bg-[#EFC1A9]/30 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              Book Event
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#EFC1A9]/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-[#EFC1A9]" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-white truncate max-w-[100px]">
                      {user.name}
                    </p>
                    <p className={`text-xs capitalize ${getRoleColor(user.role)}`}>
                      {user.role}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-white/60 transition-transform ${
                      showUserMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-[#2B2B2B] border border-white/10 rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/10">
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-white/60 text-sm truncate">{user.phone}</p>
                        <div
                          className={`inline-flex items-center gap-1 mt-2 px-2 py-1 rounded text-xs font-medium ${
                            user.role === "agent"
                              ? "bg-blue-500/20 text-blue-400"
                              : user.role === "admin"
                                ? "bg-purple-500/20 text-purple-400"
                                : "bg-[#EFC1A9]/20 text-[#EFC1A9]"
                          }`}
                        >
                          {getRoleIcon(user.role)}
                          <span className="capitalize">{user.role}</span>
                        </div>
                      </div>

                      <div className="p-2">
                        {(user.role === "agent" || user.role === "admin") && (
                          <Link
                            href="/agent"
                            className="flex items-center gap-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                          >
                            <Briefcase className="w-4 h-4" />
                            Agent Dashboard
                          </Link>
                        )}
                        <Link
                          href="/events"
                          className="flex items-center gap-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <Calendar className="w-4 h-4" />
                          Events
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/contact"
                className="px-4 py-2 bg-[#EFC1A9] text-[#1E1E1E] rounded-lg text-sm font-semibold hover:bg-[#d4b088] transition-colors"
              >
                Contact
              </Link>
            )}
          </div>

          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className="p-2 text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close mobile menu overlay"
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="md:hidden absolute top-full left-0 right-0 z-50 bg-[#171717]/98 border-t border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="px-4 py-5 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
                {user && (
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#EFC1A9]/20 flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-[#EFC1A9]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-medium truncate">{user.name}</p>
                        <p className={`text-sm capitalize ${getRoleColor(user.role)}`}>
                          {user.role}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors border ${
                        pathname === link.href
                          ? "bg-[#EFC1A9]/10 text-[#EFC1A9] border-[#EFC1A9]/20"
                          : "text-white/80 hover:text-white hover:bg-white/5 border-white/10"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/events"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-4 rounded-2xl text-base font-semibold bg-[#EFC1A9] text-[#1E1E1E] text-center hover:bg-[#d4b088] transition-colors"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Book Event
                  </span>
                </Link>

                {user && (user.role === "agent" || user.role === "admin") && (
                  <Link
                    href="/agent"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-base font-medium text-blue-400 hover:bg-blue-500/10 transition-colors border border-blue-500/20"
                  >
                    <span className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Agent Dashboard
                    </span>
                  </Link>
                )}

                <div className="pt-2 border-t border-white/10">
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 rounded-xl text-base font-medium text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  ) : (
                    <Link
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl text-base font-medium bg-[#EFC1A9] text-[#1E1E1E] text-center hover:bg-[#d4b088] transition-colors"
                    >
                      Contact
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
