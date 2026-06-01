"use client";
import {
  Clock,
  Star,
  X,
  User,
  LogOut,
  ChevronDown,
  Briefcase,
  Calendar,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram,
  Facebook,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import affogatoImage from "@/isai-pic/menu/affogato.jpg";
import blackTeaIcedImage from "@/isai-pic/menu/black tea (iced) .jpg";
import chickenWalnutSaladImage from "@/isai-pic/menu/chicken walnut salad.jpg";
import eggWrappedNoodlesImage from "@/isai-pic/menu/egg wrapped noodles.jpg";
import eggWrappedShroomsImage from "@/isai-pic/menu/egg wrapped shrooms.jpg";
import eggsAndToastImage from "@/isai-pic/menu/eggs and toast.jpg";
import frenchToastImage from "@/isai-pic/menu/french toast.jpg";
import pohaImage from "@/isai-pic/menu/poha.jpg";
import thickshakeImage from "@/isai-pic/menu/thickshake.jpg";
import watermelonSlushieImage from "@/isai-pic/menu/watermelon slushie .jpg";

// Navigation Component
const Navigation = () => {
  const router = useRouter();
  const { user, isAuthenticated, isAgent, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("menu");
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

// Hero Section
const MenuHero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      <div
        className="parallax-bg absolute inset-0 w-full h-full"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/15818965/pexels-photo-15818965.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      <div className="relative z-10 flex items-center justify-center h-full text-center">
        <div className="max-w-4xl px-4">
          <motion.h1
            className="isai-font text-8xl md:text-9xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Menu
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl text-white font-light tracking-wider"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            A symphony of flavor crafted with love.
          </motion.p>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

// Category Definitions
const categoryDefinitions = {
  appetizers: {
    icon: "🥗",
    description:
      "Fresh starters and crispy bites to kick off your meal with bold flavor.",
    color: "from-green-500/20 to-emerald-600/20",
    bgColor: "bg-gradient-to-br from-green-500/10 to-emerald-600/10",
  },
  salads: {
    icon: "🥬",
    description:
      "Light and refreshing salad bowls with house-style seasoning and dressings.",
    color: "from-lime-500/20 to-green-600/20",
    bgColor: "bg-gradient-to-br from-lime-500/10 to-green-600/10",
  },
  breakfast: {
    icon: "🍳",
    description:
      "All day breakfast favorites, from toast classics to egg-loaded comfort food.",
    color: "from-orange-500/20 to-amber-600/20",
    bgColor: "bg-gradient-to-br from-orange-500/10 to-amber-600/10",
  },
  originals: {
    icon: "🌟",
    description:
      "Isai signatures made with unique combinations and bold house flavors.",
    color: "from-purple-500/20 to-pink-600/20",
    bgColor: "bg-gradient-to-br from-purple-500/10 to-pink-600/10",
  },
  burgers: {
    icon: "🍔",
    description:
      "Loaded burgers and sandwiches with veg/chicken options and house sauces.",
    color: "from-red-500/20 to-orange-600/20",
    bgColor: "bg-gradient-to-br from-red-500/10 to-orange-600/10",
  },
  beverages: {
    icon: "☕",
    description:
      "From classic tea and coffee to coolers and slushies for every mood.",
    color: "from-blue-500/20 to-cyan-600/20",
    bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-600/10",
  },
  seasonal: {
    icon: "🍫",
    description: "Sweet treats and dessert specials to finish on a rich note.",
    color: "from-yellow-500/20 to-orange-600/20",
    bgColor: "bg-gradient-to-br from-yellow-500/10 to-orange-600/10",
  },
  addOns: {
    icon: "➕",
    description:
      "Customize your order with extra toppings and flavor boosters.",
    color: "from-teal-500/20 to-emerald-600/20",
    bgColor: "bg-gradient-to-br from-teal-500/10 to-emerald-600/10",
  },
};

// Complete Menu Data
const menuCategories = {
  appetizers: {
    title: "Appetizers",
    items: [
      {
        id: 1,
        name: "Garlic Bread",
        price: "₹150/₹180",
        description:
          "Regular/Cheesy toasted bread infused with garlic, herbs, jalapenos, and mozzarella",
        category: "Appetizer",
        variants: ["Regular", "Cheesy"],
        image: "https://images.unsplash.com/photo-1573821663912-6df460f9c684",
      },
      {
        id: 2,
        name: "French Fries",
        price: "₹150",
        description: "Classic fries tossed with salt, pepper, and thyme",
        category: "Appetizer",
        image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d",
      },
      {
        id: 3,
        name: "Cajun Fries",
        price: "₹160",
        description:
          "Classic fries tossed with our combination of unique spices",
        category: "Appetizer",
        image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d",
      },
      {
        id: 4,
        name: "Pan Fried Mushrooms",
        price: "₹200",
        description: "A medley of onions and capsicums with sauteed mushrooms",
        category: "Appetizer",
        image: "https://images.unsplash.com/photo-1607532941433-304659e8198a",
      },
      {
        id: 5,
        name: "Pan Fried Chicken",
        price: "₹300",
        description:
          "Deep fried chicken tenders tossed with onions, capsicum, and spices",
        category: "Appetizer",
        image: "https://images.unsplash.com/photo-1562967914-608f82629710",
      },
    ],
  },
  salads: {
    title: "Salads",
    items: [
      {
        id: 6,
        name: "Honey & Spice",
        price: "₹220",
        description:
          "Fresh salad of assorted greens served with our honey vinaigrette",
        category: "Salad",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      },
      {
        id: 7,
        name: "Chicken & Walnut",
        price: "₹300",
        description:
          "Juicy diced chicken and crunchy walnuts with salad and vinaigrette",
        category: "Salad",
        image: chickenWalnutSaladImage.src,
      },
    ],
  },
  breakfast: {
    title: "All Day Breakfast",
    items: [
      {
        id: 8,
        name: "Egg Sandwich",
        price: "₹220",
        description: "Flavorful omelette with veggies wrapped in toasted bread",
        category: "Breakfast",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b",
      },
      {
        id: 9,
        name: "Egg & Cheese Sandwich",
        price: "₹200/₹230",
        description:
          "Regular/Spicy cheesy gooey scrambled egg served in toasted buns with homemade sauce",
        category: "Breakfast",
        variants: ["Regular", "Spicy"],
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
      },
      {
        id: 10,
        name: "French Toast",
        price: "₹220",
        description:
          "Sweet/Savory fluffy buttery egg-soaked bread toasted to perfection",
        category: "Breakfast",
        image: frenchToastImage.src,
      },
      {
        id: 11,
        name: "Eggs & Toast",
        price: "₹200",
        description:
          "Eggs of your choice served with a side of garlic butter toast",
        category: "Breakfast",
        image: eggsAndToastImage.src,
      },
      {
        id: 12,
        name: "Poha",
        price: "₹200",
        description: "Flattened rice sauteed with onions, peanuts, and spices",
        category: "Breakfast",
        image: pohaImage.src,
      },
    ],
  },
  originals: {
    title: "Isai's Originals",
    items: [
      {
        id: 13,
        name: "Egg Wrapped Noodles",
        price: "₹250",
        description: "Saucy garlic noodles wrapped in a fluffy omelette",
        category: "Signature",
        image: eggWrappedNoodlesImage.src,
      },
      {
        id: 14,
        name: "Egg Wrapped Shrooms",
        price: "₹220",
        description: "Butter sauteed mushrooms wrapped in a fluffy omelette",
        category: "Signature",
        image: eggWrappedShroomsImage.src,
      },
      {
        id: 15,
        name: "Semi-Fried Momos",
        price: "₹200/₹250",
        description:
          "Veg/Chicken momos pan-fried with onions, capsicum, and sauces",
        category: "Signature",
        variants: ["Veg", "Chicken"],
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb",
      },
      {
        id: 16,
        name: "Chicken Kebab Skewers",
        price: "₹300",
        description:
          "Three pan-fried juicy chicken skewers served with a drizzle of homemade sauce",
        category: "Signature",
        image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2",
      },
      {
        id: 17,
        name: "Chef's Special",
        price: "₹300-₹600",
        description:
          "Tried deciding what to eat? Leave it up to the chef. We promise you'll love it",
        category: "Signature",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
      },
    ],
  },
  burgers: {
    title: "Sandwiches",
    items: [
      {
        id: 18,
        name: "Shroomy Sandwich",
        price: "₹250",
        description:
          "Pan-fried mushrooms with veggies and sauces, packed in toasted burger buns",
        category: "Sandwich",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      },
      {
        id: 19,
        name: "Classic Burger",
        price: "₹250/₹350",
        description:
          "Veg/Chicken herby homemade patty layered with veggies and house sauces",
        category: "Burger",
        variants: ["Veg", "Chicken"],
        image: "https://images.unsplash.com/photo-1520072959219-c595dc870360",
      },
      {
        id: 20,
        name: "Classic Club Sandwich",
        price: "₹250/₹350",
        description:
          "Veg/Chicken veggie stuffed grilled sandwich layered with sauces and spices",
        category: "Sandwich",
        variants: ["Veg", "Chicken"],
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
      },
    ],
  },
  beverages: {
    title: "Beverages",
    items: [
      {
        id: 21,
        name: "Black Tea",
        price: "₹100/₹150",
        description:
          "Hot/Iced classic black tea brewed to perfection, served with lime and honey",
        category: "Hot Beverages",
        variants: ["Hot", "Iced"],
        image: blackTeaIcedImage.src,
      },
      {
        id: 22,
        name: "Herbal Tea",
        price: "₹200",
        description:
          "Comes in hibiscus/blue pea flower/chamomile, served with lime and honey",
        category: "Hot Beverages",
        variants: ["Hibiscus", "Blue Pea", "Chamomile"],
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc",
      },
      {
        id: 23,
        name: "Mixed Herbal Tea",
        price: "₹220/₹250",
        description:
          "Hot/Iced flowery concoction of herbs served with spices, lime, and honey",
        category: "Hot Beverages",
        variants: ["Hot", "Iced"],
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
      },
      {
        id: 24,
        name: "Americano",
        price: "₹100/₹150",
        description:
          "Hot/Iced classic filter coffee decoction to boost your spirits",
        category: "Coffee",
        variants: ["Hot", "Iced"],
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      },
      {
        id: 25,
        name: "Filter Coffee Latte",
        price: "₹150/₹200",
        description: "Hot/Iced classic filter coffee with a latte foam twist",
        category: "Coffee",
        variants: ["Hot", "Iced"],
        image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1f4d6",
      },
      {
        id: 26,
        name: "Cold Coffee",
        price: "₹200/₹180",
        description:
          "Latte/Soda old school coffee infused with cold milk and ice or sparkling water",
        category: "Cold Beverages",
        variants: ["Latte", "Soda"],
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735",
      },
      {
        id: 27,
        name: "Lemon & Mint Soda",
        price: "₹160",
        description: "Fresh cut lemon, mint, and sparkling water",
        category: "Cold Beverages",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd",
      },
      {
        id: 28,
        name: "Rose Milk",
        price: "₹150",
        description: "Classic rose milk served cold",
        category: "Cold Beverages",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b",
      },
      {
        id: 29,
        name: "Watermelon Slushie",
        price: "₹250",
        description:
          "Blended watermelon with a dash of lime and sparkling water",
        category: "Cold Beverages",
        image: watermelonSlushieImage.src,
      },
      {
        id: 30,
        name: "Hot Chocolate",
        price: "₹200",
        description: "Silky and hot delectable cocoa mixed in milk and cream",
        category: "Hot Beverages",
        image: "https://images.unsplash.com/photo-1517578239113-b03992dcdd25",
      },
    ],
  },
  seasonal: {
    title: "Sweet Treats",
    items: [
      {
        id: 31,
        name: "Brownie",
        price: "₹150",
        description:
          "Egg homemade brownie with a slight warm, gooey fresh batch finish",
        category: "Dessert",
        image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023",
      },
      {
        id: 32,
        name: "Brownie & Ice Cream",
        price: "₹250",
        description: "Warm chocolate brownie served with vanilla ice cream",
        category: "Dessert",
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51",
      },
      {
        id: 33,
        name: "Thick-shake",
        price: "₹250/₹250/₹300",
        description:
          "Coffee/Chocolate/Mocha creamy frozen milk crushed and blended with your chosen flavour",
        category: "Dessert",
        variants: ["Coffee", "Chocolate", "Mocha"],
        image: thickshakeImage.src,
      },
      {
        id: 34,
        name: "Affogato Filter/Rose",
        price: "₹250/₹220",
        description:
          "Creamy vanilla ice cream with a shot of filter coffee espresso or natural rose syrup",
        category: "Dessert",
        variants: ["Filter Coffee Espresso", "Natural Rose Syrup"],
        image: affogatoImage.src,
      },
    ],
  },
  addOns: {
    title: "Add Ons",
    items: [
      {
        id: 35,
        name: "Spicy",
        price: "₹20",
        description: "Add a spicy kick to your dish",
        category: "Add On",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
      },
      {
        id: 36,
        name: "Cheese",
        price: "₹50",
        description: "Extra cheese topping",
        category: "Add On",
        image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d",
      },
      {
        id: 37,
        name: "Mushroom",
        price: "₹60",
        description: "Extra sauteed mushrooms",
        category: "Add On",
        image: "https://images.unsplash.com/photo-1504545102780-26774c1bb073",
      },
      {
        id: 38,
        name: "Chicken",
        price: "₹100",
        description: "Extra chicken portion",
        category: "Add On",
        image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791",
      },
      {
        id: 39,
        name: "Egg",
        price: "₹50",
        description: "Add one egg",
        category: "Add On",
        image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03",
      },
    ],
  },
};

// Floating Particles Background - Fixed for SSR
const FloatingParticles = () => {
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setMounted(true);
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#EFC1A9] rounded-full opacity-20"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Animated Menu Cards Component
const AnimatedMenuCards = () => {
  const [selectedCategory, setSelectedCategory] = useState("appetizers");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [categoryChanging, setCategoryChanging] = useState(false);

  const currentItems = menuCategories[selectedCategory]?.items || [];
  const categoryDef = categoryDefinitions[selectedCategory];

  const handleCategoryChange = (category) => {
    setCategoryChanging(true);
    setSelectedCategory(category);
    setTimeout(() => setCategoryChanging(false), 600);
  };

  const getItemTags = (item) => {
    const tags = [];
    if (item?.category) {
      tags.push(item.category);
    }
    if (item?.popular) {
      tags.push("Popular Choice");
    }
    return tags;
  };

  const getItemVariants = (item) => item?.variants || [];

  const openModal = (item) => {
    if (!item) return;
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Don't render the cards section if there are no items
  if (currentItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#1E1E1E] py-20 px-4 relative">
        <FloatingParticles />
        <div className="flex justify-center gap-3 mb-16 flex-wrap max-w-5xl mx-auto">
          {Object.keys(menuCategories).map((cat) => (
            <motion.button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 text-sm ${
                selectedCategory === cat
                  ? "bg-[#EFC1A9] text-[#1E1E1E] scale-105 shadow-lg"
                  : "bg-[#2B2B2B] text-white hover:bg-[#3B3B3B] hover:shadow-md"
              }`}
            >
              {menuCategories[cat].title}
            </motion.button>
          ))}
        </div>
        <div className="text-center text-white/70 text-xl">
          No items available in this category.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E] py-20 px-4 relative">
      <FloatingParticles />

      {/* Category Selector */}
      <motion.div
        className="flex justify-center gap-3 mb-16 flex-wrap max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {Object.keys(menuCategories).map((cat) => (
          <motion.button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 text-sm border ${
              selectedCategory === cat
                ? "bg-[#EFC1A9] text-[#1E1E1E] scale-105 shadow-lg border-[#EFC1A9]"
                : "bg-[#2B2B2B] text-white hover:bg-[#3B3B3B] hover:shadow-md border-white/10"
            }`}
          >
            {menuCategories[cat].title}
          </motion.button>
        ))}
      </motion.div>

      {/* Category Definition */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`max-w-4xl mx-auto mb-16 p-8 rounded-2xl ${categoryDef.bgColor} border border-white/10 backdrop-blur-sm relative overflow-hidden`}
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />

        <div className="flex items-center gap-4 mb-4 relative z-10">
          <motion.span
            className="text-4xl"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {categoryDef.icon}
          </motion.span>
          <h2 className="text-3xl font-bold text-white">
            {menuCategories[selectedCategory].title}
          </h2>
        </div>
        <motion.p
          className="text-white/80 text-lg leading-relaxed relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {categoryDef.description}
        </motion.p>
      </motion.div>

      {/* Grid Cards Section */}
      <AnimatePresence mode="wait">
        {!categoryChanging && (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mx-auto max-w-6xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentItems.map((item, index) => {
                const tags = getItemTags(item);
                const variants = getItemVariants(item);
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => openModal(item)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    whileHover={{ y: -5, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="text-left w-full min-h-[185px] rounded-2xl border border-white/10 bg-[#1a1a1a] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:border-[#EFC1A9]/40 hover:shadow-[0_16px_34px_rgba(0,0,0,0.45)] transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-2xl font-semibold text-[#EFC1A9] leading-tight">
                        {item.name}
                      </h3>
                      <span className="text-3xl font-bold text-[#EFC1A9] leading-none shrink-0">
                        {item.price.replace(".00", "")}
                      </span>
                    </div>

                    <p className="text-white/55 text-[1.05rem] leading-relaxed mb-5 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-auto">
                      {variants.map((variant) => (
                        <span
                          key={`${item.id}-${variant}`}
                          className="inline-flex items-center rounded-lg px-3 py-1 text-xs font-semibold bg-[#EFC1A9]/15 text-[#EFC1A9] border border-[#EFC1A9]/30"
                        >
                          {variant}
                        </span>
                      ))}
                      {tags.map((tag) => {
                        const isPopularTag = tag
                          .toLowerCase()
                          .includes("popular");
                        return (
                          <span
                            key={`${item.id}-${tag}`}
                            className={`inline-flex items-center rounded-lg px-3 py-1 text-sm font-semibold border ${
                              isPopularTag
                                ? "bg-[#EFC1A9] text-[#1E1E1E] border-[#EFC1A9]"
                                : "bg-[#222222] text-white/90 border-white/10"
                            }`}
                          >
                            {isPopularTag && <Star className="w-3 h-3 mr-1" />}
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Glassmorphism backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "rgba(0,0,0,0.78)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
              onClick={() => setIsModalOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Container */}
            <motion.div
              className="relative z-10 w-full flex flex-col"
              style={{
                maxWidth: "860px",
                background: "#171717",
                borderRadius: "24px",
                border: "1px solid rgba(232,192,168,0.2)",
                boxShadow:
                  "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(232,192,168,0.06) inset",
                // maxHeight: "92vh",
                // overflowY: "auto",
              }}
              initial={{ scale: 0.92, y: 28, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 28, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
            >
              {/* Close button */}
              <motion.button
                onClick={() => setIsModalOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  zIndex: 30,
                  background: "rgba(10,10,10,0.65)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.13)",
                  borderRadius: "50%",
                  width: "38px",
                  height: "38px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                transition={{ duration: 0.18 }}
              >
                <X className="w-4 h-4 text-white" />
              </motion.button>

              {/* ── IMAGE SECTION ── 5:4, fills full width, object-fit cover, zero bleed */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "5 / 4",
                  maxHeight: "300px",
                  overflow: "hidden",
                  background: "#0F0F10",
                  borderRadius: "24px 24px 0 0",
                  flexShrink: 0,
                }}
              >
                <motion.img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                  }}
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                />
              </div>

              {/* ── CONTENT SECTION ── */}
              <div style={{ padding: "20px 28px 24px", flex: 1 }}>
                {/* Name + Price row */}
                <motion.div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "16px",
                    marginBottom: "14px",
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <h2
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 2rem)",
                      fontWeight: 700,
                      color: "#E8C0A8",
                      lineHeight: 1.2,
                      margin: 0,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {selectedItem.name}
                  </h2>
                  <div
                    style={{
                      flexShrink: 0,
                      background: "rgba(232,192,168,0.1)",
                      border: "1px solid rgba(232,192,168,0.25)",
                      borderRadius: "12px",
                      padding: "6px 14px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                        fontWeight: 700,
                        color: "#E8C0A8",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {selectedItem.price}
                    </span>
                  </div>
                </motion.div>

                {/* Divider */}
                <motion.div
                  style={{
                    height: "1px",
                    background: "rgba(255,255,255,0.07)",
                    marginBottom: "16px",
                  }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                />

                {/* Description */}
                <motion.p
                  style={{
                    color: "rgba(255,255,255,0.72)",
                    fontSize: "1.05rem",
                    lineHeight: 1.7,
                    margin: "0 0 20px",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  {selectedItem.description}
                </motion.p>

                {/* Variants */}
                {getItemVariants(selectedItem).length > 0 && (
                  <motion.div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginBottom: "16px",
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.35)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        alignSelf: "center",
                        marginRight: "4px",
                      }}
                    >
                      Options
                    </span>
                    {getItemVariants(selectedItem).map((variant) => (
                      <span
                        key={`modal-${selectedItem.id}-${variant}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          borderRadius: "8px",
                          padding: "5px 13px",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          background: "rgba(232,192,168,0.1)",
                          color: "#E8C0A8",
                          border: "1px solid rgba(232,192,168,0.28)",
                        }}
                      >
                        {variant}
                      </span>
                    ))}
                  </motion.div>
                )}

                {/* Category badge + Popular tag */}
                <motion.div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "20px",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <span
                    style={{
                      padding: "5px 13px",
                      background: "rgba(255,255,255,0.05)",
                      color: "rgba(255,255,255,0.6)",
                      borderRadius: "8px",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {selectedItem.category}
                  </span>
                  {selectedItem.popular && (
                    <motion.span
                      style={{
                        padding: "5px 13px",
                        background: "rgba(232,192,168,0.15)",
                        color: "#E8C0A8",
                        borderRadius: "8px",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        border: "1px solid rgba(232,192,168,0.3)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                      animate={{ scale: [1, 1.04, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      <Star className="w-3 h-3" />
                      Popular Choice
                    </motion.span>
                  )}
                </motion.div>

                {/* Prep time bar */}
                <motion.div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    marginBottom: "14px",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Clock
                    style={{
                      width: "16px",
                      height: "16px",
                      color: "#E8C0A8",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.88rem",
                      color: "rgba(255,255,255,0.7)",
                      fontWeight: 500,
                    }}
                  >
                    Preparation time: 10–15 minutes
                  </span>
                </motion.div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02, brightness: 1.1 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  style={{
                    width: "100%",
                    padding: "15px 24px",
                    background:
                      "linear-gradient(135deg, #E8C0A8 0%, #d4a48e 100%)",
                    color: "#1a1008",
                    border: "none",
                    borderRadius: "14px",
                    fontSize: "1rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "0.02em",
                    transition: "filter 0.2s, transform 0.15s",
                  }}
                  onClick={() => setIsModalOpen(false)}
                >
                  Got it — sounds delicious!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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

export default function Menu() {
  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      <Navigation />
      <MenuHero />
      <AnimatedMenuCards />
      <Footer />
    </div>
  );
}
