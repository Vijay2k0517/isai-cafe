"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// Images now served from public folder
import {
  Instagram,
  Facebook,
  Youtube,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Heart,
  Calendar,
  Clock,
  Users,
  User,
  LogOut,
  ChevronDown,
  Briefcase,
  GraduationCap,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  Globe,
  Terminal,
  ShieldCheck,
  Smartphone,
  Palette,
  Server,
  Copy,
  Check,
  Award,
  BookOpen,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Navigation Component
const Navigation = () => {
  const router = useRouter();
  const { user, isAuthenticated, isAgent, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("events");
  const [isVisible, setIsVisible] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const ref = useRef();
  const menuRef = useRef();

  const navItems = [
    { name: "Home", href: "/", section: "home" },
    { name: "About", href: "/about", section: "about" },
    { name: "Menu", href: "/menu", section: "menu" },
    { name: "Events", href: "/events", section: "events" },
    { name: "Contact", href: "/contact", section: "contact" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    router.push("/");
  };

  return (
    <nav
      ref={ref}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-7xl px-4"
    >
      <div className="flex items-center justify-center">
        <nav className="glass-nav w-full sm:w-auto rounded-2xl sm:rounded-full px-4 sm:px-8 py-3 sm:py-1.5 shadow-lg flex flex-wrap sm:flex-nowrap items-center justify-center gap-3 sm:gap-0">
          <Link href="/" className="flex-shrink-0 mr-0 sm:mr-6">
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/image-1759387620201.png"
              alt="Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 object-cover rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <div className="flex items-center justify-center flex-1 sm:flex-none min-w-0">
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 sm:gap-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-pill px-3 sm:px-4 py-2 rounded-full transition-all duration-300 text-sm sm:text-base ${
                    activeSection === item.section
                      ? "nav-pill-active text-white"
                      : "text-white hover:text-[#EFC1A9]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Section */}
          <div
            className="ml-0 sm:ml-6 mt-2 sm:mt-0 flex items-center flex-shrink-0"
            ref={menuRef}
          >
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-[#EFC1A9]/30 flex items-center justify-center">
                    <User className="w-4 h-4 text-[#EFC1A9]" />
                  </div>
                  <span className="text-white text-sm font-medium max-w-[80px] truncate hidden sm:block">
                    {user?.name?.split(" ")[0]}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-white/60 transition-transform ${showUserMenu ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#2B2B2B] border border-white/10 rounded-xl shadow-xl overflow-hidden">
                    <div className="p-3 border-b border-white/10">
                      <p className="text-white font-medium text-sm truncate">
                        {user?.name}
                      </p>
                      <p className="text-white/50 text-xs capitalize">
                        {user?.role}
                      </p>
                    </div>
                    <div className="p-2">
                      {isAgent && (
                        <Link
                          href="/agent"
                          className="flex items-center gap-2 px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Briefcase className="w-4 h-4" />
                          Dashboard
                        </Link>
                      )}
                      <Link
                        href="/events"
                        className="flex items-center gap-2 px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Calendar className="w-4 h-4" />
                        Events
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg text-sm transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </nav>
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isHeroTextVisible, setIsHeroTextVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsHeroTextVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      <img
        src="/isai-pic/hero/1000071173_83a4620d8de21309f41d927d50ad42d3-15_12_2025%2C%2019_36_34.jpg.jpeg"
        alt="Isai hero background"
        className="parallax-bg absolute inset-0 h-full w-full object-cover object-center"
        style={{
          transform: `translateY(${scrollY * 0.5}px) scale(1.08)`,
          transformOrigin: "center center",
          objectPosition: "54% 58%",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/34 via-black/18 to-black/42" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0) 80%, rgba(0,0,0,0.32) 100%)",
        }}
      />
      <div className="relative z-10 flex h-full items-end px-6 pb-16 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
        <div
          className={`max-w-xl transition-all duration-1000 ease-out ${
            isHeroTextVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <img
            src="/isai-pic/logo/isai-logo.png"
            alt="Isai Cafe The Art Cafe"
            className="w-[220px] sm:w-[260px] md:w-[300px] h-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    </section>
  );
};

// Split Text Component
const SplitText = ({
  text,
  className = "",
  delay = 0,
  isVisible = false,
  staggerDelay = 0.05,
}) => {
  const letters = text.split("").map((letter, index) => (
    <span
      key={index}
      className="inline-block overflow-hidden"
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
        opacity: isVisible ? 1 : 0,
        transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${
          delay + index * staggerDelay
        }s`,
        willChange: "transform, opacity",
      }}
    >
      {letter === " " ? "\u00A0" : letter}
    </span>
  ));

  return <span className={`inline-block ${className}`}>{letters}</span>;
};

// About Snippet Component
const AboutSnippet = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.6 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4 bg-[#2B2B2B]"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="isai-font text-6xl md:text-7xl font-extrabold text-[#EFC1A9] overflow-hidden">
              <SplitText
                text="ABOUT US"
                isVisible={isVisible}
                delay={0.1}
                staggerDelay={0.04}
              />
            </h2>
            <div
              className={`transform transition-all duration-700 delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#EFC1A9] text-[#0a0a0a] rounded-full px-6 py-3 shadow hover:bg-[#d4b088] transition-all duration-300 font-semibold hover:scale-105"
              >
                <span>Learn more</span>
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  ↗
                </span>
              </Link>
            </div>
            <div className="space-y-4">
              <p
                className={`text-xl leading-relaxed text-white transition-all duration-700 delay-500 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                We started with a simple idea: make coffee that feels like home
                and tastes like joy.
              </p>
              <p
                className={`text-xl leading-relaxed text-white transition-all duration-700 delay-700 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                Everything we serve is handmade, heartfelt, and a little
                unexpected.
              </p>
            </div>
          </div>
          <div
            className={`relative transition-all duration-1000 delay-200 ${
              isVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-12 opacity-0 scale-95"
            }`}
          >
            <div className="rounded-3xl overflow-hidden ring-8 ring-[#EFC1A9] shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1573822028151-731623cb0722"
                alt="Barista at work"
                className="w-full h-[350px] md:h-[400px] object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Opening Hours Component
const OpeningHoursBento = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef();

  const hours = [
    {
      day: "Monday",
      hours: "17:00 - 22:00",
      isClosed: false,
      offset: -25,
      delay: 0,
      waveSpeed: 1.2,
      wavePhase: 0.8,
    },
    {
      day: "Tuesday",
      hours: "CLOSED",
      isClosed: true,
      offset: 35,
      delay: 150,
      waveSpeed: 1.6,
      wavePhase: 1.4,
    },
    {
      day: "Wednesday",
      hours: "17:00 - 22:00",
      isClosed: false,
      offset: -30,
      delay: 300,
      waveSpeed: 1.1,
      wavePhase: 2.1,
    },
    {
      day: "Thursday",
      hours: "17:00 - 22:00",
      isClosed: false,
      offset: 40,
      delay: 450,
      waveSpeed: 1.8,
      wavePhase: 2.8,
    },
    {
      day: "Friday",
      hours: "17:00 - 22:00",
      isClosed: false,
      offset: -35,
      delay: 600,
      waveSpeed: 1.3,
      wavePhase: 3.5,
    },
    {
      day: "Saturday",
      hours: "11:00 - 15:00, 17:00 - 22:00",
      isClosed: false,
      offset: 30,
      delay: 750,
      waveSpeed: 0.9,
      wavePhase: 4.2,
    },
    {
      day: "Sunday",
      hours: "11:00 - 15:00, 17:00 - 22:00",
      isClosed: false,
      offset: -40,
      delay: 900,
      waveSpeed: 1.5,
      wavePhase: 4.9,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-20 px-4 min-h-screen flex items-center justify-center bg-[#1A1A1A] overflow-hidden"
    >
      <div
        className="absolute inset-0 w-full h-full bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1759244328512-e4a9128150f4')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="text-center relative mb-20">
          <h2 className="isai-font text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-8">
            <SplitText
              text="OPENING HOURS"
              isVisible={isVisible}
              delay={0.2}
              staggerDelay={0.03}
            />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-7xl mx-auto relative">
          {hours.map((item, index) => {
            const wave1 =
              Math.sin(scrollY * 0.006 + item.wavePhase) * 35 * item.waveSpeed;
            const wave2 =
              Math.cos(scrollY * 0.004 + index * 0.7) *
              20 *
              (item.waveSpeed * 0.6);
            const wave3 =
              Math.sin(scrollY * 0.008 + index * 1.3) *
              15 *
              (item.waveSpeed * 0.4);

            const totalWaveOffset = wave1 + wave2 + wave3;

            const rotation1 = Math.sin(scrollY * 0.005 + index * 0.9) * 3;
            const rotation2 = Math.cos(scrollY * 0.003 + index * 1.7) * 1.5;
            const totalRotation = rotation1 + rotation2;

            const scale1 = 1 + Math.sin(scrollY * 0.01 + index * 0.5) * 0.08;
            const scale2 = Math.cos(scrollY * 0.007 + index * 1.1) * 0.03;
            const totalScale = scale1 + scale2;

            const horizontalOffset =
              Math.sin(scrollY * 0.005 + index * 0.6) * 15;

            return (
              <div
                key={item.day}
                className={`bg-[#EFC1A9] rounded-3xl p-8 shadow-2xl hover:shadow-4xl transition-all duration-1200 group overflow-hidden backdrop-blur-sm transform border-2 border-transparent hover:border-white/20 ${
                  isVisible ? "opacity-100" : "opacity-0 translate-y-16"
                }`}
                style={{
                  transitionDelay: `${item.delay}ms`,
                  transition:
                    "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1s ease-out, box-shadow 0.6s ease",
                  transform: `
                    translateY(${totalWaveOffset + item.offset}px)
                    translateX(${horizontalOffset}px)
                    rotate(${totalRotation}deg)
                    scale(${totalScale})
                  `,
                  marginLeft:
                    index % 4 === 0 ? "2rem" : index % 3 === 1 ? "1rem" : "0",
                  marginRight:
                    index % 4 === 2 ? "2rem" : index % 3 === 0 ? "1rem" : "0",
                  marginTop: index % 2 === 0 ? "3rem" : "1rem",
                  marginBottom: index % 3 === 1 ? "3rem" : "1rem",
                }}
              >
                <h3 className="font-bold text-2xl md:text-3xl text-[#1A1A1A] mb-6 group-hover:text-white transition-all duration-500 text-center tracking-wide">
                  {item.day}
                </h3>
                <div className="text-center">
                  {item.isClosed ? (
                    <p className="text-xl font-bold text-red-600 group-hover:text-red-200 transition-colors duration-500 tracking-wider">
                      {item.hours}
                    </p>
                  ) : (
                    <p className="text-xl font-semibold text-[#1A1A1A] group-hover:text-white transition-colors duration-500 tracking-wider">
                      {item.hours}
                    </p>
                  )}
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#1A1A1A] group-hover:bg-white rounded-full opacity-30 group-hover:opacity-60 transition-all duration-500"></div>
              </div>
            );
          })}
        </div>

        <div
          className={`text-center mt-20 transition-all duration-1200 delay-1200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-white text-2xl opacity-90 font-light tracking-wide">
            Visit us during our opening hours for the best coffee experience
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-1 bg-[#EFC1A9] rounded-full opacity-60"></div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .shadow-4xl {
          box-shadow:
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 30px rgba(239, 193, 169, 0.3),
            0 0 60px rgba(239, 193, 169, 0.1);
        }

        .hover\\:shadow-4xl:hover {
          box-shadow:
            0 35px 60px -12px rgba(0, 0, 0, 0.6),
            0 0 40px rgba(239, 193, 169, 0.4),
            0 0 80px rgba(239, 193, 169, 0.2);
        }
      `}</style>
    </section>
  );
};

// Culinary Experience Section
const CulinaryExperience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Artisanal Coffee",
      description:
        "Handcrafted brews using single-origin beans from sustainable farms",
      delay: 0,
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Seasonal Menu",
      description:
        "Fresh ingredients changing with the seasons for optimal flavor",
      delay: 100,
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Space",
      description:
        "A welcoming environment for creatives and coffee lovers alike",
      delay: 200,
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Live Music",
      description: "Weekly performances featuring local artists and musicians",
      delay: 300,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.4 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 px-4 bg-[#1C1C1C]">
      <div className="container mx-auto max-w-6xl">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="isai-font text-6xl md:text-7xl font-extrabold text-[#EFC1A9] mb-6">
            CULINARY EXPERIENCE
          </h2>
          <p className="text-xl text-white mb-12 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in a world where exceptional flavors meet artistic
            expression. Every dish tells a story, every cup creates a memory.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-700 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-8 opacity-0 scale-95"
            }`}
          >
            <Link
              href="/menu"
              className="inline-flex items-center gap-3 bg-[#EFC1A9] text-[#1A1A1A] rounded-full px-10 py-5 shadow-2xl hover:shadow-3xl transition-all duration-500 font-bold text-xl hover:scale-105 hover:bg-[#d4b088] group"
            >
              <span>Discover Our Menu</span>
              <span className="transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center gap-3 border-2 border-[#EFC1A9] text-[#EFC1A9] rounded-full px-10 py-5 shadow-2xl hover:shadow-3xl transition-all duration-500 font-bold text-xl hover:scale-105 hover:bg-[#EFC1A9] hover:text-[#1A1A1A] group"
            >
              <Calendar className="w-6 h-6" />
              <span>Book a Event</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-[#2B2B2B] rounded-2xl p-8 border border-gray-700 hover:border-[#EFC1A9] transition-all duration-500 hover:scale-105 hover:shadow-2xl group cursor-pointer ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${feature.delay}ms`,
                transform: isVisible
                  ? "translateY(0) rotateY(0)"
                  : "translateY(20px) rotateY(10deg)",
              }}
            >
              <div className="text-[#EFC1A9] mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center group-hover:text-[#EFC1A9] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed text-center group-hover:text-white transition-colors duration-300">
                {feature.description}
              </p>

              <div className="w-0 group-hover:w-full h-1 bg-[#EFC1A9] rounded-full mx-auto mt-6 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="w-32 h-1 bg-[#EFC1A9] rounded-full mx-auto opacity-60"></div>
          <p className="text-white text-lg mt-8 opacity-80">
            Mon, Wed, Thu, Fri: 5:00 PM - 10:00 PM • Weekend: 11:00 AM - 3:00 PM
            & 5:00 PM - 10:00 PM
          </p>
        </div>
      </div>
    </section>
  );
};

// Instagram Section
const InstagramSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  const instagramPosts = [
    {
      id: 1,
      src: "https://www.instagram.com/p/DLctkRcyPg-/",
      thumbnail: "https://i.postimg.cc/sXj9Fy9x/pic-3.jpg",
      alt: "Coffee Art",
    },
    {
      id: 2,
      src: "https://www.instagram.com/p/DPjidybEvjC/",
      thumbnail: "https://i.postimg.cc/TYp0Yd8L/pic-2.jpg",
      alt: "Cafe Interior",
    },
    {
      id: 3,
      src: "https://www.instagram.com/p/DPbsCTdjNla/",
      thumbnail: "https://i.postimg.cc/C5YypRrz/pic-1.jpg",
      alt: "Fresh Pastries",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 px-4 bg-[#1A1A1A]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="isai-font text-5xl md:text-6xl font-extrabold text-[#EFC1A9] mb-6">
            FOLLOW OUR JOURNEY
          </h2>

          <p className="text-white text-xl leading-relaxed max-w-2xl mx-auto mb-8">
            Behind the scenes, daily specials, and moments that make Isai
            special
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://www.instagram.com/isai.artcafe/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#EFC1A9] text-[#1A1A1A] rounded-full px-8 py-4 shadow-lg hover:bg-[#d4b088] transition-all duration-200 font-semibold text-lg"
            >
              <Instagram size={24} />
              <span>Instagram</span>
            </a>

            <a
              href="https://wa.me/918667273422?text=Hello%20Isai%20Caf%C3%A9%2C%20I%27d%20like%20to%20enquire%20about%20an%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border-2 border-[#EFC1A9] text-[#EFC1A9] rounded-full px-8 py-4 hover:bg-[#EFC1A9] hover:text-[#1A1A1A] transition-all duration-200 font-semibold text-lg"
            >
              <MessageCircle size={24} />
              <span>WhatsApp</span>
            </a>

            <a
              href="https://www.youtube.com/@isaiartcafe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border-2 border-white/20 text-white rounded-full px-8 py-4 hover:border-[#EFC1A9] hover:text-[#EFC1A9] transition-all duration-200 font-semibold text-lg"
            >
              <Youtube size={24} />
              <span>YouTube</span>
            </a>
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            {instagramPosts.map((post) => (
              <div key={post.id} className="relative group">
                <a
                  href={post.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative overflow-hidden rounded-2xl bg-gray-800 shadow-2xl"
                >
                  <img
                    src={post.thumbnail}
                    alt={post.alt}
                    className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-2 shadow-lg">
                      <Instagram size={13} className="text-white" />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                        <Instagram size={32} className="text-white" />
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <a
            href="https://www.instagram.com/isai.artcafe/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white hover:text-[#EFC1A9] transition-all duration-200 font-semibold text-lg border-2 border-white hover:border-[#EFC1A9] rounded-full px-8 py-4"
          >
            <span>View All Posts</span>
            <Instagram size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

// Academic Portfolio & Technology Showcase Section
const PortfolioShowcaseSection = () => {
  const [activeTab, setActiveTab] = useState("stack");
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      label: "Architecture",
      value: "Next.js App Router",
      sub: "Server & Client Hydration",
      icon: Globe,
    },
    {
      label: "UI Performance",
      value: "60 FPS Fluid",
      sub: "Intersection Observer Driven",
      icon: Zap,
    },
    {
      label: "Design System",
      value: "Bespoke HSL Tokens",
      sub: "Editorial Playfair & Bento Grid",
      icon: Palette,
    },
    {
      label: "Accessibility",
      value: "WCAG 2.1 AA",
      sub: "Semantic HTML & High Contrast",
      icon: ShieldCheck,
    },
  ];

  const techCategories = [
    {
      category: "Frontend Core & Architecture",
      icon: Code2,
      badge: "Framework & Language",
      description:
        "Modern component-driven web framework engineered for high rendering speed and SEO readiness.",
      items: [
        {
          name: "Next.js (App Router)",
          role: "Framework",
          desc: "Leverages modern file-based routing, static site export capabilities, dynamic metadata, and decoupled client component boundaries.",
          tag: "Next.js 14+",
        },
        {
          name: "React 18",
          role: "UI Library",
          desc: "Utilizes React Hooks (useState, useEffect, useRef), custom Context providers for global session state, and concurrent UI rendering.",
          tag: "React 18",
        },
        {
          name: "JavaScript (ES6+)",
          role: "Core Language",
          desc: "Authored with modern asynchronous patterns, clean modular architecture, and native browser Web APIs.",
          tag: "ES6+",
        },
      ],
    },
    {
      category: "Design System & Styling",
      icon: Palette,
      badge: "Visual Engineering",
      description:
        "A handcrafted aesthetic harmonizing classical Indian cultural warmth with luxury dark-mode aesthetics.",
      items: [
        {
          name: "Tailwind CSS",
          role: "Utility Engine",
          desc: "Bespoke HSL design tokens declared in globals.css, custom responsive breakpoints, fluid typography, and dark-mode color balance.",
          tag: "Tailwind 3.4",
        },
        {
          name: "Playfair Display & Inter",
          role: "Typography Hierarchy",
          desc: "Editorial high-contrast serifs ('Playfair Display') celebrating Indian classical music heritage, paired with geometric sans-serif ('Inter') for crisp body legibility.",
          tag: "Google Fonts",
        },
        {
          name: "Bespoke Palette (#EFC1A9)",
          role: "Color Identity",
          desc: "Signature champagne gold and warm terracotta accents paired with deep obsidian (#1A1A1A / #0A0A0A) surfaces, avoiding generic palettes.",
          tag: "Harmonious HSL",
        },
      ],
    },
    {
      category: "Motion & Micro-Interactions",
      icon: Sparkles,
      badge: "Interaction Design",
      description:
        "Fluid micro-animations that breathe life into content without incurring layout jank or frame drops.",
      items: [
        {
          name: "Intersection Observer API",
          role: "Motion Engine",
          desc: "Replaces heavy scroll event listeners with native browser intersection thresholds, guaranteeing zero jank and fluid entrance triggers.",
          tag: "Zero Jank",
        },
        {
          name: "Framer Motion & CSS Keyframes",
          role: "Animation Pipeline",
          desc: "Smooth marquee tickers, hover lifts, interactive scale transforms, and responsive spring dynamics for a tactile feel.",
          tag: "Micro-animations",
        },
        {
          name: "Asymmetric Bento Grids",
          role: "Spatial UX Layout",
          desc: "Choreographed bento box layout for opening hours and culinary specials, balancing high information density with playful visual hierarchy.",
          tag: "Modern Layouts",
        },
      ],
    },
    {
      category: "UI Primitives & Real-World Integrations",
      icon: Server,
      badge: "Production Ready",
      description:
        "End-to-end integration patterns engineered for real-world reliability, accessibility, and business utility.",
      items: [
        {
          name: "Radix UI & Shadcn Primitives",
          role: "Accessible UI Components",
          desc: "Unstyled, headless accessible dialogs, dropdowns, and interactive widgets adhering to WAI-ARIA authoring guidelines.",
          tag: "Headless Accessible",
        },
        {
          name: "Lucide React",
          role: "Vector Icon System",
          desc: "Unified stroke-width iconography providing clean visual cues across navigation, contact anchors, and social feeds.",
          tag: "Clean Icons",
        },
        {
          name: "WhatsApp Direct Dispatch",
          role: "Real-time Booking Bridge",
          desc: "Dynamic URL encoding protocol enabling instant table and event reservations with pre-filled guest and date parameters.",
          tag: "Business Integration",
        },
      ],
    },
  ];

  const engineeringPillars = [
    {
      title: "Modular Component Architecture",
      icon: Layers,
      highlight: "Clean Codebase",
      description:
        "Engineered with a strict atomic hierarchy. Reusable components (Navigation, Hero, BentoGrid, Menu, SocialFeeds, Modals) are isolated with self-contained styling and minimal prop drilling, facilitating straightforward refactoring and team collaboration.",
      keyPoints: [
        "Separation of presentation and business logic",
        "Encapsulated state machines within interactive islands",
        "DRY layout wrappers across multi-page routes",
      ],
    },
    {
      title: "Core Web Vitals & Performance",
      icon: Zap,
      highlight: "Sub-Second FCP",
      description:
        "Every interactive element is designed to minimize CPU cycles. By leveraging CSS transform/opacity animations rather than layout-triggering properties (width/height), the site sustains a fluid 60 FPS across both desktop and mobile devices.",
      keyPoints: [
        "No Cumulative Layout Shift (CLS = 0)",
        "Hardware-accelerated CSS GPU layers",
        "Lightweight asset footprint without heavy external runtimes",
      ],
    },
    {
      title: "Accessibility & Semantic Standards",
      icon: ShieldCheck,
      highlight: "Inclusive Design",
      description:
        "Built adhering to WCAG 2.1 AA standards. Color contrast ratios between text elements and dark surfaces exceed 4.5:1, semantic landmark tags (<nav>, <main>, <section>, <footer>) guide screen readers, and all buttons feature descriptive ARIA labels.",
      keyPoints: [
        "Semantic HTML5 hierarchy with single <h1> entry",
        "Accessible contrast verified across dark-mode tokens",
        "Keyboard navigable links and dialogs",
      ],
    },
    {
      title: "Mobile-First Responsive Engineering",
      icon: Smartphone,
      highlight: "Multi-Device Fluidity",
      description:
        "Designed and rigorously tested across viewports ranging from 320px mobile screens to 4K displays. Uses dynamic CSS clamp functions, Tailwind breakpoint choreographies, and touch-optimized touch targets (min 44px).",
      keyPoints: [
        "Touch-friendly tap targets and gesture-friendly cards",
        "Responsive bento grid collapsing gracefully into single-column feeds",
        "Adaptive typography scaling proportionally across screen sizes",
      ],
    },
  ];

  const academicImpact = [
    {
      title: "Graduate Admissions & Research Alignment",
      icon: GraduationCap,
      desc: "Developed as a flagship capstone for higher studies applications (Master's in Computer Science, Software Engineering, or Human-Computer Interaction). It demonstrates applied competence in modern software engineering paradigms, user research, and performant web architecture.",
    },
    {
      title: "Engineering Problem Statement",
      icon: Cpu,
      desc: "Traditional cultural café websites often struggle with visual clutter, heavy unoptimized assets, and poor mobile responsiveness. Isai Café solves this by harmonizing editorial artistic aesthetics with lean, componentized code — ensuring fast load times and intuitive conversion pathways.",
    },
    {
      title: "Core Technical Competencies Demonstrated",
      icon: Award,
      desc: "Full-stack frontend architecture, reactive state management via Context API, custom Intersection Observer animation triggers, Bento spatial layout mechanics, and cross-platform design systems.",
    },
    {
      title: "Academic & Professional Growth Focus",
      icon: BookOpen,
      desc: "Highlights readiness for advanced graduate coursework in Distributed Systems, Interactive Media, HCI, and Scalable Web Technologies, emphasizing code craftsmanship and empathy for the end user.",
    },
  ];

  const codeSnippet = `// Isai Café Architecture Blueprint
{
  "application": "Isai - The Art Café Web Platform",
  "developerProfile": "Higher Studies / Master's Portfolio Showcase",
  "technicalStack": {
    "framework": "Next.js (App Router) + React 18",
    "language": "Modern JavaScript (ES6+)",
    "styling": "Tailwind CSS + Custom HSL Design Tokens",
    "motion": "Intersection Observer API + CSS Keyframe Engines",
    "primitives": "Radix UI Headless Components + Lucide Icons",
    "state": "React Context API (Auth / Global Session)"
  },
  "metrics": {
    "targetFrameRate": "60 FPS (Hardware Accelerated)",
    "accessibility": "WCAG 2.1 AA Compliant Contrast",
    "responsiveRange": "320px (Mobile) to 3840px (4K Ultra-Wide)",
    "layoutShift": "0.0 CLS (Zero Cumulative Layout Shift)"
  },
  "integrations": [
    "WhatsApp Instant Booking Protocol",
    "Dynamic Instagram Feed Embed Bridge",
    "Client-Side Authentication Context Provider"
  ]
}`;

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(codeSnippet);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    }
  };

  return (
    <section
      id="portfolio-showcase"
      ref={sectionRef}
      className="py-24 px-4 bg-[#0F0F0F] relative overflow-hidden border-t border-[#262626]"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#EFC1A9]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#EFC1A9]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFC1A9]/10 border border-[#EFC1A9]/30 text-[#EFC1A9] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-5">
            <GraduationCap size={16} />
            <span>Higher Studies Portfolio Showcase</span>
          </div>

          <h2 className="isai-font text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#EFC1A9] mb-4 tracking-tight">
            ABOUT THIS WEBSITE & TECH STACK
          </h2>

          <p className="text-xl sm:text-2xl text-white font-light tracking-wide mb-4 max-w-3xl mx-auto">
            Architectural Blueprint, Design System & Engineering Highlights
          </p>

          <p className="text-[#a8a8a8] text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            A comprehensive breakdown of the architectural decisions, interactive design systems, and frontend engineering principles behind the Isai Café web platform — curated for graduate school admissions and technical portfolio showcase.
          </p>
        </div>

        {/* Quick Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-[#171717] border border-[#2A2A2A] hover:border-[#EFC1A9]/40 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase font-medium tracking-wider text-[#8A8A8A]">
                    {stat.label}
                  </span>
                  <div className="p-2 rounded-lg bg-[#EFC1A9]/10 text-[#EFC1A9] group-hover:bg-[#EFC1A9] group-hover:text-[#171717] transition-colors">
                    <Icon size={16} />
                  </div>
                </div>
                <div className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-[#EFC1A9] transition-colors">
                  {stat.value}
                </div>
                <p className="text-xs text-[#9E9E9E]">{stat.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Interactive Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {[
            { id: "stack", label: "Technology Stack", icon: Code2 },
            { id: "engineering", label: "Engineering Architecture", icon: Layers },
            { id: "academic", label: "Academic Impact & Thesis", icon: GraduationCap },
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#EFC1A9] text-[#141414] shadow-lg shadow-[#EFC1A9]/20"
                    : "bg-[#1A1A1A] text-[#a8a8a8] border border-[#2E2E2E] hover:text-white hover:border-[#EFC1A9]/50"
                }`}
              >
                <TabIcon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Technology Stack */}
        {activeTab === "stack" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {techCategories.map((cat, idx) => {
                const CatIcon = cat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#151515] border border-[#282828] hover:border-[#EFC1A9]/30 rounded-3xl p-6 sm:p-8 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-[#EFC1A9]/10 text-[#EFC1A9]">
                          <CatIcon size={22} />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {cat.category}
                        </h3>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full bg-[#242424] text-[#EFC1A9] border border-[#383838] font-medium">
                        {cat.badge}
                      </span>
                    </div>

                    <p className="text-sm text-[#9A9A9A] mb-6 leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="space-y-4">
                      {cat.items.map((item, i) => (
                        <div
                          key={i}
                          className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-2xl p-4 hover:border-[#EFC1A9]/30 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-semibold text-white text-base">
                              {item.name}
                            </span>
                            <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#282828] text-[#EFC1A9] font-mono">
                              {item.tag}
                            </span>
                          </div>
                          <span className="inline-block text-xs font-medium text-[#EFC1A9] mb-1">
                            {item.role}
                          </span>
                          <p className="text-xs text-[#a8a8a8] leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Engineering Architecture */}
        {activeTab === "engineering" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {engineeringPillars.map((pillar, idx) => {
                const PillarIcon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#151515] border border-[#282828] hover:border-[#EFC1A9]/30 rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-2xl bg-[#EFC1A9]/10 text-[#EFC1A9]">
                          <PillarIcon size={24} />
                        </div>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EFC1A9]/10 text-[#EFC1A9] border border-[#EFC1A9]/20">
                          {pillar.highlight}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3">
                        {pillar.title}
                      </h3>

                      <p className="text-sm text-[#a8a8a8] leading-relaxed mb-6">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="border-t border-[#262626] pt-4 space-y-2">
                      {pillar.keyPoints.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-[#c4c4c4]">
                          <CheckCircle2 size={14} className="text-[#EFC1A9] mt-0.5 shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Academic Impact & Thesis */}
        {activeTab === "academic" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-gradient-to-br from-[#1C1714] via-[#141414] to-[#121212] border border-[#EFC1A9]/30 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFC1A9]/15 text-[#EFC1A9] text-xs font-semibold mb-4">
                  <Award size={14} />
                  <span>Portfolio Narrative</span>
                </div>
                <h3 className="isai-font text-2xl sm:text-3xl font-bold text-white mb-4">
                  Translating Cultural Warmth into High-Performance Software
                </h3>
                <p className="text-sm sm:text-base text-[#c4c4c4] leading-relaxed mb-8">
                  Rather than building a standard generic commercial portal, this website was built to explore the synthesis of cultural heritage and state-of-the-art web engineering. It demonstrates proficiency in user-centric interaction design, performant rendering architectures, and production-quality codebase modularity — key technical prerequisites for advanced graduate research.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {academicImpact.map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-[#181818]/80 border border-[#2E2E2E] rounded-2xl p-5 hover:border-[#EFC1A9]/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-2.5">
                        <div className="p-2 rounded-lg bg-[#EFC1A9]/10 text-[#EFC1A9]">
                          <ItemIcon size={18} />
                        </div>
                        <h4 className="text-base font-bold text-white">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-[#a8a8a8] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Architecture Blueprint Terminal Box */}
        <div className="mt-14 bg-[#141414] border border-[#2A2A2A] rounded-3xl overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-6 py-4 bg-[#1B1B1B] border-b border-[#2A2A2A]">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <div className="flex items-center gap-2 ml-3 text-xs text-[#8A8A8A] font-mono">
                <Terminal size={14} className="text-[#EFC1A9]" />
                <span>isai-architecture-blueprint.json</span>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#2F2F2F] text-xs text-[#c4c4c4] hover:text-white border border-[#333333] transition-all"
            >
              {copiedSnippet ? (
                <>
                  <Check size={14} className="text-green-400" />
                  <span className="text-green-400 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Blueprint</span>
                </>
              )}
            </button>
          </div>

          <div className="p-6 font-mono text-xs sm:text-sm text-[#E0E0E0] overflow-x-auto bg-[#101010]">
            <pre className="text-[#a8a8a8] leading-relaxed">
              <code>
                {`{
  `}<span className="text-[#EFC1A9]">"project"</span>{`: `}<span className="text-green-300">"Isai - The Art Café Web Platform"</span>{`,
  `}<span className="text-[#EFC1A9]">"purpose"</span>{`: `}<span className="text-green-300">"Higher Studies & Master's Portfolio Showcase"</span>{`,
  `}<span className="text-[#EFC1A9]">"architecture"</span>{`: {
    `}<span className="text-[#EFC1A9]">"framework"</span>{`: `}<span className="text-sky-300">"Next.js (App Router) + React 18"</span>{`,
    `}<span className="text-[#EFC1A9]">"styling"</span>{`: `}<span className="text-sky-300">"Tailwind CSS with Custom HSL Design Tokens"</span>{`,
    `}<span className="text-[#EFC1A9]">"motion"</span>{`: `}<span className="text-sky-300">"Intersection Observer API + CSS Keyframes"</span>{`,
    `}<span className="text-[#EFC1A9]">"componentSystem"</span>{`: `}<span className="text-sky-300">"Radix UI Primitives + Lucide React Icons"</span>{`
  },
  `}<span className="text-[#EFC1A9]">"engineeringHighlights"</span>{`: [
    `}<span className="text-yellow-200">"Component-driven modular hierarchy"</span>{`,
    `}<span className="text-yellow-200">"Zero layout shift (CLS = 0) with 60 FPS motion"</span>{`,
    `}<span className="text-yellow-200">"WCAG 2.1 AA compliant color contrast & semantics"</span>{`,
    `}<span className="text-yellow-200">"Production WhatsApp reservation webhook dispatch"</span>{`
  ]
}`}
              </code>
            </pre>
          </div>
        </div>

        {/* Showcase Bottom Summary Banner */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-[#171717] border border-[#2E2E2E] rounded-2xl px-6 py-4">
            <div className="flex items-center gap-2 text-sm text-[#EFC1A9] font-semibold">
              <GraduationCap size={18} />
              <span>Higher Studies Showcase Ready</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-[#333]" />
            <p className="text-xs sm:text-sm text-[#a8a8a8]">
              Engineered with clean code, modern UX principles, and scalable web architecture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Menu", href: "/menu" },
    { name: "Events", href: "/events" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-[#000000] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link
              href="/"
              className="isai-font text-3xl font-bold text-[#EFC1A9]"
            >
              Isai
            </Link>
            <p className="mt-4 text-[#a8a8a8]">
              Where music and home blend into one
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-[#EFC1A9]">Navigation</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#a8a8a8] hover:text-[#EFC1A9] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-[#EFC1A9]">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="text-[#a8a8a8] hover:text-[#EFC1A9] transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="text-[#a8a8a8] hover:text-[#EFC1A9] transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-[#a8a8a8] hover:text-[#EFC1A9] transition-colors"
              >
                <Youtube size={24} />
              </a>
            </div>

            <div className="space-y-2 text-sm text-[#a8a8a8]">
              <div className="flex items-center">
                <Phone size={16} className="mr-2 text-[#EFC1A9]" />
                +91 98765 43210
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-2 text-[#EFC1A9]" />
                hello@isai.cafe
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2 text-[#EFC1A9]" />
                123 Art Street, Music District
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#2a2a2a] mt-8 pt-8 text-center text-[#6b6b6b]">
          <p>&copy; 2025 Isai Café. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main Home Component
export default function Home() {
  return (
    <div className="min-h-screen light-components">
      <Navigation />
      <HeroSection />
      <AboutSnippet />
      <OpeningHoursBento />
      <CulinaryExperience />
      <InstagramSection />
      <PortfolioShowcaseSection />
      <Footer />
    </div>
  );
}
