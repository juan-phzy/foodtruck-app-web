"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./PublicNavBar.module.css";
import { useUser, useClerk } from "@clerk/nextjs";

export default function PublicNavBar() {
    const { isSignedIn } = useUser();
    const { signOut } = useClerk();
    const [menuOpen, setMenuOpen] = useState(false);

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

    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.left}>
                    <Link href="/" className={styles.logo}>
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
                    <Link href="/map" className={styles.link}>
                        Explore Map
                    </Link>
                    <Link href="/vendor-info" className={styles.link}>
                        For Vendors
                    </Link>

                    {!isSignedIn ? (
                        <>
                            <Link href="/auth/sign-in" className={styles.link}>
                                Sign In
                            </Link>
                            <Link
                                href="/auth/sign-up"
                                className={styles.signupBtn}
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/user/map" className={styles.signupBtn}>
                                Enter App
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className={styles.signOutBtn}
                            >
                                Sign Out
                            </button>
                        </>
                    )}
                </div>
            </nav>

            {/* Mobile menu overlay */}
            <div
                className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
            >
                <div className={styles.mobileMenuContent}>
                    <Link
                        href="/map"
                        className={styles.mobileLink}
                        onClick={() => setMenuOpen(false)}
                    >
                        Explore Map
                    </Link>
                    <Link
                        href="/vendor-info"
                        className={styles.mobileLink}
                        onClick={() => setMenuOpen(false)}
                    >
                        For Vendors
                    </Link>

                    {!isSignedIn ? (
                        <>
                            <Link
                                href="/auth/sign-in"
                                className={styles.mobileLink}
                                onClick={() => setMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/auth/sign-up"
                                className={styles.mobilePrimaryBtn}
                                onClick={() => setMenuOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/user/map"
                                className={styles.mobilePrimaryBtn}
                                onClick={() => setMenuOpen(false)}
                            >
                                Enter App
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
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
