import React, { useEffect, useRef, useState } from "react";
import { navbarStyles } from "../assets/dummyStyles";
import logo from "../assets/logo.png";
import {
  Home,
  BookOpen,
  BookMarked,
  Users,
  Contact,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth, useClerk, useUser, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const { openSignUp, signOut } = useClerk();
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuRef = useRef(null);

  /* ================= TOKEN SYNC ================= */
  useEffect(() => {
    const syncToken = async () => {
      if (isSignedIn) {
        const token = await getToken();
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    };
    syncToken();
  }, [isSignedIn, getToken]);

  /* ================= SCROLL BEHAVIOR ================= */
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);
      setShowNavbar(!(y > lastScrollY && y > 120));
      setLastScrollY(y);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const navItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Courses", icon: BookOpen, href: "/courses" },
    { name: "About", icon: BookMarked, href: "/about" },
    { name: "Faculty", icon: Users, href: "/faculty" },
    { name: "Contact", icon: Contact, href: "/contact" },
  ];

  return (
    <nav
      className={`${navbarStyles.navbar} ${
        showNavbar ? navbarStyles.navbarVisible : navbarStyles.navbarHidden
      } ${isScrolled ? navbarStyles.navbarScrolled : navbarStyles.navbarDefault}`}
    >
      <div className={navbarStyles.container}>
        <div className={navbarStyles.innerContainer}>
          {/* LOGO */}
          <div className={navbarStyles.logo}>
            <img src={logo} alt="StudyHub" className={navbarStyles.logoImage} />
            <span className={navbarStyles.logoText}>StudyHub</span>
          </div>

          {/* DESKTOP NAV */}
          <div className={navbarStyles.desktopNav}>
            {navItems.map(({ name, icon: Icon, href }) => (
              <NavLink
                key={name}
                to={href}
                end={href === "/"}
                className={({ isActive }) =>
                  `${navbarStyles.desktopNavItem} ${
                    isActive && navbarStyles.desktopNavItemActive
                  }`
                }
              >
                <Icon size={16} />
                <span>{name}</span>
              </NavLink>
            ))}
          </div>

          {/* DESKTOP AUTH */}
          <div className={navbarStyles.authContainer}>
            {!isSignedIn ? (
              <button
                onClick={() => openSignUp()}
                className={navbarStyles.primaryButton}
              >
                Get Started
              </button>
            ) : (
              <UserButton afterSignoutUrl="/" />
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen((p) => !p)}
            className={navbarStyles.mobileMenuButton}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          ref={menuRef}
          className={`${navbarStyles.mobileMenu} ${
            isOpen ? navbarStyles.mobileMenuOpen : navbarStyles.mobileMenuClosed
          }`}
        >
          {navItems.map(({ name, icon: Icon, href }) => (
            <NavLink
              key={name}
              to={href}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${navbarStyles.mobileNavItem} ${
                  isActive && navbarStyles.mobileNavItemActive
                }`
              }
            >
              <Icon size={16} />
              <span>{name}</span>
            </NavLink>
          ))}

          {!isSignedIn ? (
            <button
              onClick={() => {
                openSignUp();
                setIsOpen(false);
              }}
              className={navbarStyles.mobilePrimaryButton}
            >
              Create Account
            </button>
          ) : (
            <button
              onClick={async () => {
                await signOut();
                localStorage.removeItem("token");
                setIsOpen(false);
              }}
              className={navbarStyles.mobileLogoutButton}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
