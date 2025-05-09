// app/vendor/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import styles from "./page.module.css";
import Link from "next/link";

export default function VendorDashboard() {
    const router = useRouter();
    const { user, isLoaded, isSignedIn } = useUser();
    const [greeting, setGreeting] = useState("Good day");
    const [currentTime, setCurrentTime] = useState(new Date());

    // Fetch vendor data
    const vendor = useQuery(api.vendors.getVendorByClerkId, {
        clerkId: user?.id || "",
    });

    // Fetch business data
    const business = useQuery(api.businesses.getBusinessByVendor, {
        vendor_clerk_id: user?.id || "",
    });

    // Set appropriate greeting based on time of day
    useEffect(() => {
        const now = new Date();
        setCurrentTime(now);

        const hour = now.getHours();

        if (hour < 12) {
            setGreeting("Good morning");
        } else if (hour < 17) {
            setGreeting("Good afternoon");
        } else {
            setGreeting("Good evening");
        }
    }, []);

    // Auth check
    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace("/auth/sign-in");
        }
    }, [isLoaded, isSignedIn, router]);

    if (!isLoaded || !vendor || !business) {
        return (
            <main className="page-scrollable">
                <div className={styles.loadingContainer}>
                    <div className={styles.loader}></div>
                    <p>Loading your dashboard...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="page-scrollable">
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.welcomeSection}>
                        <h1 className={styles.greeting}>
                            {greeting}, {vendor?.first_name || "Vendor"}
                        </h1>
                        <p className={styles.businessName}>
                            {business?.business_name || "Your Business"}
                        </p>
                        <p className={styles.date}>
                            {currentTime.toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>

                    <div className={styles.statusCard}>
                        <div className={styles.statusItem}>
                            <div className={styles.statusValue}>
                                {business?.categories?.length || 0}
                            </div>
                            <div className={styles.statusLabel}>Categories</div>
                        </div>
                        <div className={styles.statusDivider}></div>
                        <div className={styles.statusItem}>
                            <div className={styles.statusValue}>
                                {vendor?.subscriptionPlanId || "Starter"}
                            </div>
                            <div className={styles.statusLabel}>Plan</div>
                        </div>
                    </div>
                </div>

                <div className={styles.quickLinks}>
                    <Link href="/vendor/locations" className={styles.quickLink}>
                        <div className={styles.linkIcon}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                        </div>
                        <div className={styles.linkContent}>
                            <h3>Locations</h3>
                            <p>Manage your food truck locations</p>
                        </div>
                    </Link>

                    <Link href="/vendor/menus" className={styles.quickLink}>
                        <div className={styles.linkIcon}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 3h18v18H3zM8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"></path>
                            </svg>
                        </div>
                        <div className={styles.linkContent}>
                            <h3>Menus</h3>
                            <p>Create and update your food menus</p>
                        </div>
                    </Link>

                    <Link href="/vendor/employees" className={styles.quickLink}>
                        <div className={styles.linkIcon}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <div className={styles.linkContent}>
                            <h3>Employees</h3>
                            <p>Manage your team members</p>
                        </div>
                    </Link>

                    <Link href="/vendor/account" className={styles.quickLink}>
                        <div className={styles.linkIcon}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <div className={styles.linkContent}>
                            <h3>Account</h3>
                            <p>Manage your profile and settings</p>
                        </div>
                    </Link>
                </div>

                <div className={styles.recentActivity}>
                    <h2 className={styles.sectionTitle}>Recent Activity</h2>
                    <div className={styles.activityCard}>
                        <div className={styles.emptyState}>
                            <svg
                                className={styles.emptyIcon}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <h3>No recent activity</h3>
                            <p>Your recent activities will appear here</p>
                        </div>
                    </div>
                </div>

                <div className={styles.quickStats}>
                    <h2 className={styles.sectionTitle}>Quick Statistics</h2>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                    <line
                                        x1="15"
                                        y1="9"
                                        x2="15.01"
                                        y2="9"
                                    ></line>
                                </svg>
                            </div>
                            <div className={styles.statInfo}>
                                <span className={styles.statValue}>0</span>
                                <span className={styles.statLabel}>
                                    Customer Visits
                                </span>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                                    <line x1="4" y1="22" x2="4" y2="15"></line>
                                </svg>
                            </div>
                            <div className={styles.statInfo}>
                                <span className={styles.statValue}>0</span>
                                <span className={styles.statLabel}>
                                    Menu Views
                                </span>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                                </svg>
                            </div>
                            <div className={styles.statInfo}>
                                <span className={styles.statValue}>0</span>
                                <span className={styles.statLabel}>
                                    Favorites
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
