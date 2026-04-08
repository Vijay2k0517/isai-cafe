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
      "Begin your culinary journey with our carefully crafted starters that awaken the palate and set the tone for the meal ahead.",
    color: "from-green-500/20 to-emerald-600/20",
    bgColor: "bg-gradient-to-br from-green-500/10 to-emerald-600/10",
  },
  salads: {
    icon: "🥬",
    description:
      "Fresh, crisp, and vibrant salads made with seasonal greens and house-made dressings for a refreshing experience.",
    color: "from-lime-500/20 to-green-600/20",
    bgColor: "bg-gradient-to-br from-lime-500/10 to-green-600/10",
  },
  breakfast: {
    icon: "🍳",
    description:
      "Start your day right with our all-day breakfast selections, combining classic favorites with innovative twists.",
    color: "from-orange-500/20 to-amber-600/20",
    bgColor: "bg-gradient-to-br from-orange-500/10 to-amber-600/10",
  },
  originals: {
    icon: "🌟",
    description:
      "Our signature creations - unique dishes that showcase the creativity and passion of our culinary team.",
    color: "from-purple-500/20 to-pink-600/20",
    bgColor: "bg-gradient-to-br from-purple-500/10 to-pink-600/10",
  },
  burgers: {
    icon: "🍔",
    description:
      "Hearty, satisfying burgers and sandwiches made with premium ingredients and served with our signature sauces.",
    color: "from-red-500/20 to-orange-600/20",
    bgColor: "bg-gradient-to-br from-red-500/10 to-orange-600/10",
  },
  beverages: {
    icon: "☕",
    description:
      "Carefully crafted drinks ranging from traditional brews to innovative creations that complement your meal perfectly.",
    color: "from-blue-500/20 to-cyan-600/20",
    bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-600/10",
  },
  seasonal: {
    icon: "🎄",
    description:
      "Special creations that celebrate the seasons, featuring limited-time ingredients and festive flavors.",
    color: "from-yellow-500/20 to-orange-600/20",
    bgColor: "bg-gradient-to-br from-yellow-500/10 to-orange-600/10",
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
        price: "₹130.00",
        description:
          "Freshly baked bread topped with garlic butter and herbs, served warm with crispy edges",
        category: "Appetizer",
        image: "https://images.unsplash.com/photo-1573821663912-6df460f9c684",
      },
      {
        id: 2,
        name: "Cheesy Garlic Bread",
        price: "₹150.00",
        description:
          "Golden garlic bread topped with melted cheese blend, baked to perfection",
        category: "Appetizer",
        image: "https://images.unsplash.com/photo-1619740455993-9e0c7c1d80e4",
      },
      {
        id: 3,
        name: "French Fries",
        price: "₹130.00",
        description:
          "Crispy golden fries seasoned with herbs and served with tangy dipping sauce",
        category: "Appetizer",
        image: "https://images.unsplash.com/photo-1573821663912-6df460f9c684",
      },
      {
        id: 4,
        name: "Spicy French Fries",
        price: "₹150.00",
        description:
          "Seasoned fries with a spicy kick, perfect for those who love bold flavors",
        category: "Appetizer",
        image: "https://images.unsplash.com/photo-1630384082084-735a7f9beb39",
      },
      {
        id: 5,
        name: "Pan Fried Mushrooms",
        price: "₹180.00",
        description:
          "Fresh mushrooms pan-fried to perfection with aromatic herbs and garlic",
        category: "Appetizer",
        image: "https://images.unsplash.com/photo-1607532941433-304659e8198a",
      },
      {
        id: 6,
        name: "Pan Fried Tenders",
        price: "₹300.00",
        description:
          "Juicy chicken tenders pan-fried with special seasoning and golden crisp",
        category: "Appetizer",
        image: "https://images.unsplash.com/photo-1562967914-608f82629710",
        popular: true,
      },
    ],
  },
  salads: {
    title: "Salads",
    items: [
      {
        id: 7,
        name: "Honey & Spice",
        price: "₹200.00",
        description:
          "Fresh mixed greens with honey dressing and spicy peanuts for the perfect balance",
        category: "Salad",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      },
      {
        id: 8,
        name: "Chicken & Walnut",
        price: "₹250.00",
        description:
          "Tender chicken pieces with crunchy walnuts and fresh seasonal vegetables",
        category: "Salad",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        popular: true,
      },
    ],
  },
  breakfast: {
    title: "All Day Breakfast",
    items: [
      {
        id: 9,
        name: "Egg Sandwich",
        price: "₹200.00",
        description:
          "Perfectly cooked eggs with fresh vegetables and herbs on toasted bread",
        category: "Breakfast",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b",
      },
      {
        id: 10,
        name: "French Toast",
        price: "₹200.00",
        description:
          "Classic French toast with cinnamon, vanilla, and maple syrup",
        category: "Breakfast",
        image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929",
      },
      {
        id: 11,
        name: "Masala Toast",
        price: "₹220.00",
        description:
          "Spiced toast with traditional Indian flavors and aromatic spices",
        category: "Breakfast",
        image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62",
      },
      {
        id: 12,
        name: "Eggs & Toast",
        price: "₹200.00",
        description:
          "Simple yet delicious combination of sunny-side eggs with buttered toast",
        category: "Breakfast",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8",
      },
      {
        id: 13,
        name: "The English Breakfast",
        price: "₹400.00",
        description:
          "Complete English breakfast with eggs, sausages, bacon, beans, and toast",
        category: "Breakfast",
        image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666",
        popular: true,
      },
      {
        id: 14,
        name: "Cornflakes & Milk",
        price: "₹160.00",
        description: "Classic breakfast cereal served with fresh cold milk",
        category: "Breakfast",
        image: "https://images.unsplash.com/photo-1620970663330-6c56e1f77f48",
      },
      {
        id: 15,
        name: "Poha",
        price: "₹180.00",
        description:
          "Light and fluffy flattened rice cooked with onions, herbs, and spices",
        category: "Breakfast",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84",
      },
    ],
  },
  originals: {
    title: "Isai's Originals",
    items: [
      {
        id: 16,
        name: "Egg Wrapped Ramen",
        price: "₹200.00",
        description:
          "Our signature ramen wrapped in a perfectly cooked egg, creating layers of flavor",
        category: "Signature",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624",
        popular: true,
      },
      {
        id: 17,
        name: "Egg Wrapped Shrooms",
        price: "₹200.00",
        description:
          "Sauteed mushrooms wrapped in delicate egg layers with aromatic herbs",
        category: "Signature",
        image: "https://images.unsplash.com/photo-1608039831741-8e4a4a3d77b8",
      },
      {
        id: 18,
        name: "Semi-Fried Momos",
        price: "₹200.00",
        description:
          "Delicate dumplings semi-fried to achieve the perfect texture and taste",
        category: "Signature",
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb",
      },
      {
        id: 19,
        name: "The Bacon Special",
        price: "₹300.00",
        description:
          "Premium bacon preparation with our special sauce and cooking technique",
        category: "Signature",
        image: "https://images.unsplash.com/photo-1528607929212-2636ec44253e",
        popular: true,
      },
    ],
  },
  burgers: {
    title: "Burgers & Sandwiches",
    items: [
      {
        id: 23,
        name: "The Shroomy Burger",
        price: "₹200.00",
        description:
          "Juicy mushroom patty with fresh vegetables and our signature sauce",
        category: "Burger",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      },
      {
        id: 24,
        name: "Classic Veggie Burger",
        price: "₹200.00",
        description:
          "Fresh vegetable patty with lettuce, tomato, and creamy sauce",
        category: "Burger",
        image: "https://images.unsplash.com/photo-1520072959219-c595dc870360",
      },
      {
        id: 25,
        name: "Classic Chicken Burger",
        price: "₹220.00",
        description:
          "Grilled chicken breast with fresh vegetables and herbs in soft bun",
        category: "Burger",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
        popular: true,
      },
      {
        id: 27,
        name: "Coleslaw Sandwich",
        price: "₹200.00",
        description: "Fresh coleslaw mix with crunchy vegetables in soft bread",
        category: "Sandwich",
        image: "https://images.unsplash.com/photo-1509722747041-616f39b57569",
      },
      {
        id: 29,
        name: "Bacon Special Sandwich",
        price: "₹300.00",
        description:
          "Premium bacon sandwich with our special sauce and fresh vegetables",
        category: "Sandwich",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
        popular: true,
      },
    ],
  },
  beverages: {
    title: "Beverages",
    items: [
      {
        id: 30,
        name: "Black Tea / Coffee",
        price: "₹60.00",
        description:
          "Traditional black tea or coffee served hot, a perfect morning ritual",
        category: "Hot Beverages",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574",
      },
      {
        id: 31,
        name: "Filter Coffee",
        price: "₹100.00",
        description:
          "Authentic South Indian filter coffee served hot with rich aroma",
        category: "Hot Beverages",
        image: "https://images.unsplash.com/photo-1509048191080-d2b6ca099d14",
        popular: true,
      },
      {
        id: 32,
        name: "Cold Coffee",
        price: "₹160.00",
        description: "Refreshing cold coffee blend served over ice with cream",
        category: "Cold Beverages",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735",
      },
      {
        id: 33,
        name: "Affogato Filter Coffee",
        price: "₹200.00",
        description:
          "Rich filter coffee poured over vanilla ice cream for a delightful treat",
        category: "Specialty",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
        popular: true,
      },
      {
        id: 34,
        name: "Affogato Rose",
        price: "₹200.00",
        description: "Rose-flavored coffee preparation with vanilla ice cream",
        category: "Specialty",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      },
      {
        id: 36,
        name: "Italian Soda",
        price: "₹150.00",
        description:
          "Classic Italian soda with sparkling water and flavored syrup",
        category: "Cold Beverages",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd",
      },
      {
        id: 37,
        name: "Herbal Tea",
        price: "₹180.00",
        description: "Soothing herbal tea blend with natural herbs and flavors",
        category: "Hot Beverages",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc",
      },
      {
        id: 38,
        name: "Hot Chocolate",
        price: "₹150.00",
        description: "Rich and creamy hot chocolate topped with froth",
        category: "Hot Beverages",
        image: "https://images.unsplash.com/photo-1517578239113-b03992dcdd25",
      },
      {
        id: 39,
        name: "Rose Milk",
        price: "₹150.00",
        description:
          "Refreshing rose-flavored milk drink, perfect for any time of day",
        category: "Cold Beverages",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b",
      },
    ],
  },
  seasonal: {
    title: "Seasonal Specials",
    items: [
      {
        id: 46,
        name: "Brownie",
        price: "₹100.00",
        description:
          "Rich chocolate brownie baked fresh daily with premium cocoa",
        category: "Dessert",
        image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023",
      },
      {
        id: 47,
        name: "Brownie & Ice Cream",
        price: "₹200.00",
        description: "Warm chocolate brownie served with vanilla ice cream",
        category: "Dessert",
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51",
        popular: true,
      },
      {
        id: 48,
        name: "Watermelon Slushie",
        price: "₹200.00",
        description:
          "Refreshing watermelon slushie perfect for hot summer days",
        category: "Seasonal",
        image: "https://images.unsplash.com/photo-1546173159-315724a31696",
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

                    <div className="flex items-center gap-2 mt-auto">
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
      <AnimatePresence>
        {isModalOpen && selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 backdrop-blur-sm bg-black/60"
              onClick={() => setIsModalOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative z-10 max-w-3xl w-full bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <motion.button
                onClick={() => setIsModalOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-colors border border-white/10"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
              <div className="relative h-56 sm:h-64">
                <motion.img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="p-6 sm:p-8">
                <motion.div
                  className="flex justify-between items-start mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-3xl font-bold text-[#EFC1A9]">
                    {selectedItem.name}
                  </h2>
                  <span className="text-2xl font-bold text-[#EFC1A9]">
                    {selectedItem.price}
                  </span>
                </motion.div>
                <motion.p
                  className="text-white/80 text-lg mb-6 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedItem.description}
                </motion.p>
                <motion.div
                  className="flex flex-wrap items-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="px-4 py-2 bg-[#2B2B2B] text-white rounded-full text-sm border border-white/10">
                    {selectedItem.category}
                  </span>
                  {selectedItem.popular && (
                    <motion.span
                      className="px-4 py-2 bg-yellow-500 text-white rounded-full text-sm flex items-center gap-2 border border-yellow-600"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Star className="w-4 h-4" />
                      Popular Choice
                    </motion.span>
                  )}
                </motion.div>

                <motion.div
                  className="mt-6 rounded-xl border border-white/10 bg-[#2B2B2B] px-4 py-3 flex items-center gap-2 text-white/85"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                >
                  <Clock className="w-4 h-4 text-[#EFC1A9]" />
                  <span className="text-sm font-medium">
                    Preparation time: 10-15 minutes
                  </span>
                </motion.div>

                <motion.button
                  className="mt-6 w-full sm:w-auto px-6 py-3 rounded-full bg-[#EFC1A9] text-[#1E1E1E] font-bold hover:bg-[#d4b088] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Place an order
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
