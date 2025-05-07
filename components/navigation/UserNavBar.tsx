"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./NavBarStyles.module.css";
import { useClerk } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function UserNavBar() {
  const { signOut } = useClerk();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when screen size increases to tablet breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Handle sign out with redirect to home page
  const handleSignOut = () => {
    signOut({ redirectUrl: "/" });
  };

  // Check if a link is active
  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <Link href="/user/map" className={styles.logo}>
            MunchMap
          </Link>
        </div>

        {/* Mobile menu toggle button */}
        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <div
            className={`${styles.menuBar} ${menuOpen ? styles.menuBarActive : ""}`}
          ></div>
        </button>

        {/* Desktop navigation */}
        <div className={styles.desktopNav}>
          <Link 
            href="/user/map" 
            className={`${styles.link} ${isActive('/user/map') ? styles.activeLink : ''}`}
          >
            Map
          </Link>
          <Link 
            href="/user/search" 
            className={`${styles.link} ${isActive('/user/search') ? styles.activeLink : ''}`}
          >
            Search
          </Link>
          <Link 
            href="/user/account" 
            className={`${styles.link} ${isActive('/user/account') ? styles.activeLink : ''}`}
          >
            Account
          </Link>
          <button
            onClick={handleSignOut}
            className={styles.signOutBtn}
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
      >
        <div className={styles.mobileMenuContent}>
          <Link
            href="/user/map"
            className={`${styles.mobileLink} ${isActive('/user/map') ? styles.activeMobileLink : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Map
          </Link>
          <Link
            href="/user/search"
            className={`${styles.mobileLink} ${isActive('/user/search') ? styles.activeMobileLink : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Search
          </Link>
          <Link
            href="/user/account"
            className={`${styles.mobileLink} ${isActive('/user/account') ? styles.activeMobileLink : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Account
          </Link>
          <button
            onClick={() => {
              setMenuOpen(false);
              handleSignOut();
            }}
            className={styles.mobileSecondaryBtn}
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}