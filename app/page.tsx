"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
    const { isSignedIn } = useUser();

    return (
        <main className="page-scrollable">
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroBackground}>
                    <Image
                        src="/images/landing/home-bg-2.jpg"
                        alt="Food trucks background"
                        fill
                        priority
                        className={styles.heroImage}
                    />
                    <div className={styles.heroOverlay}></div>
                </div>
                
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Find Food Trucks Near You</h1>
                    <p className={styles.heroSubtitle}>
                        Discover local street food, explore menus, and support small
                        businesses — all in one app.
                    </p>

                    <div className={styles.heroCta}>
                        {!isSignedIn ? (
                            <>
                                <Link href="/auth/sign-up/user" className={styles.primaryBtn}>
                                    Sign Up Free
                                </Link>
                                <Link href="/map" className={styles.secondaryBtn}>
                                    Explore Map
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/user/map" className={styles.primaryBtn}>
                                    Open Map
                                </Link>
                                <Link href="/user/account" className={styles.secondaryBtn}>
                                    My Account
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                
                <div className={styles.scrollPrompt}>
                    <span className={styles.scrollIcon}></span>
                    <span>Scroll to learn more</span>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.featuresSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Why Use MunchMap?</h2>
                        <p className={styles.sectionSubtitle}>
                            MunchMap helps you discover the best street food experiences in your city
                        </p>
                    </div>

                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>🗺️</div>
                            <h3 className={styles.featureTitle}>Real-time Location</h3>
                            <p className={styles.featureDescription}>
                                Find food trucks near you with accurate, up-to-date locations and opening hours
                            </p>
                        </div>
                        
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>📱</div>
                            <h3 className={styles.featureTitle}>Browse Menus</h3>
                            <p className={styles.featureDescription}>
                                View detailed menus, prices, and food photos before you visit
                            </p>
                        </div>
                        
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>⭐</div>
                            <h3 className={styles.featureTitle}>Ratings & Reviews</h3>
                            <p className={styles.featureDescription}>
                                See what other food lovers think and share your own experiences
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className={styles.testimonialSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>What Our Users Say</h2>
                    </div>
                    
                    <div className={styles.testimonialCard}>
                        <p className={styles.testimonialText}>
                            {`"MunchMap has completely changed how I discover food trucks in my city. I've found amazing hidden gems I never would have known about!"`}
                        </p>
                        <div className={styles.testimonialAuthor}>
                            <div className={styles.testimonialAvatar}>JD</div>
                            <div>
                                <p className={styles.testimonialName}>Jane Doe</p>
                                <p className={styles.testimonialRole}>Food Enthusiast</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <div className={styles.ctaCard}>
                        <h2 className={styles.ctaTitle}>Ready to discover amazing street food?</h2>
                        <p className={styles.ctaSubtitle}>
                            Join thousands of food lovers finding their next favorite meal
                        </p>
                        
                        {!isSignedIn ? (
                            <Link href="/auth/sign-up/user" className={styles.ctaBtn}>
                                Get Started Now
                            </Link>
                        ) : (
                            <Link href="/user/map" className={styles.ctaBtn}>
                                Open MunchMap
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
           <Footer />
        </main>
    );
}