"use client";

import styles from "./page.module.css";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";

export default function HomePage() {
    const { isSignedIn } = useAuth();

    return (
        <main className={styles.container}>
            <div className={styles.backgroundWrapper}>
                <Image
                    src="/images/landing/home-bg-2.jpg"
                    alt="Food trucks background"
                    fill
                    priority
                    className={styles.backgroundImage}
                />
                <div className={styles.overlay}></div>
            </div>

            <section className={styles.hero}>
                <div className={styles.glassCard}>
                    <div className={styles.logo}>
                        <span className={styles.logoText}>MunchMap</span>
                    </div>

                    <h1 className={styles.title}>Find Food Trucks Near You</h1>

                    <p className={styles.subtitle}>
                        Discover local street food, explore menus, and support
                        small businesses — all in one app.
                    </p>

                    <div className={styles.ctaGroup}>
                        {!isSignedIn ? (
                            <>
                                <Link
                                    href="/auth/sign-up"
                                    className={styles.primaryBtn}
                                >
                                    Sign Up
                                </Link>
                                <Link
                                    href="/map"
                                    className={styles.secondaryBtn}
                                >
                                    Explore Map
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/user/map"
                                    className={styles.primaryBtn}
                                >
                                    Open Map
                                </Link>
                                <Link
                                    href="/user/account"
                                    className={styles.secondaryBtn}
                                >
                                    My Account
                                </Link>
                            </>
                        )}
                    </div>

                    {!isSignedIn && (
                        <p className={styles.signInPrompt}>
                            Already have an account?{" "}
                            <Link
                                href="/auth/sign-in"
                                className={styles.signInLink}
                            >
                                Sign In
                            </Link>
                        </p>
                    )}

                    <div className={styles.featuresGrid}>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>🔍</div>
                            <h3>Real-time Location</h3>
                            <p>Find trucks near you with live updates</p>
                        </div>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>🍔</div>
                            <h3>Browse Menus</h3>
                            <p>View detailed menus before you visit</p>
                        </div>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>⭐</div>
                            <h3>Reviews</h3>
                            <p>See ratings from other food lovers</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
