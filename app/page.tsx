"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

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
                                <Link href="/auth/sign-up" className={styles.primaryBtn}>
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
                            <Link href="/auth/sign-up" className={styles.ctaBtn}>
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
            <footer className={styles.footer}>
                <div className="container">
                    <div className={styles.footerContent}>
                        <div className={styles.footerLogo}>
                            <Link href="/" className={styles.footerLogoLink}>
                                MunchMap
                            </Link>
                            <p className={styles.footerTagline}>
                                Discovering street food made easy
                            </p>
                        </div>
                        
                        <div className={styles.footerLinks}>
                            <div className={styles.footerLinkGroup}>
                                <h4 className={styles.footerLinkTitle}>Explore</h4>
                                <Link href="/map" className={styles.footerLink}>Map</Link>
                                <Link href="/vendor-info" className={styles.footerLink}>For Vendors</Link>
                            </div>
                            
                            <div className={styles.footerLinkGroup}>
                                <h4 className={styles.footerLinkTitle}>Company</h4>
                                <Link href="/about" className={styles.footerLink}>About Us</Link>
                                <Link href="/contact" className={styles.footerLink}>Contact</Link>
                            </div>
                            
                            <div className={styles.footerLinkGroup}>
                                <h4 className={styles.footerLinkTitle}>Legal</h4>
                                <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
                                <Link href="/terms" className={styles.footerLink}>Terms of Use</Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.footerBottom}>
                        <p className={styles.copyright}>
                            &copy; {new Date().getFullYear()} MunchMap. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    );
}