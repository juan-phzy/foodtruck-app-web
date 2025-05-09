"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { useUser } from "@clerk/nextjs";
import Footer from "@/components/landing/Footer";

export default function VendorInfoPage() {
    const { isSignedIn } = useUser();

    return (
        <main className="page-scrollable">
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Grow Your Food Truck Business
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Join MunchMap and connect with hungry customers looking
                        for exactly what you offer.
                    </p>

                    <div className={styles.heroCta}>
                        {!isSignedIn ? (
                            <Link
                                href="/auth/sign-up/vendor"
                                className={styles.primaryBtn}
                            >
                                Join as a Vendor
                            </Link>
                        ) : (
                            <Link
                                href="/vendor/dashboard"
                                className={styles.primaryBtn}
                            >
                                Vendor Dashboard
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.featuresSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>
                            Why Partner With MunchMap?
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Our platform helps food truck vendors increase
                            visibility, manage operations, and grow their
                            customer base
                        </p>
                    </div>

                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>📱</div>
                            <h3 className={styles.featureTitle}>
                                Real-time Location Sharing
                            </h3>
                            <p className={styles.featureDescription}>
                                {`Update your location in real-time so customers can always find you, whether you're at your regular spot or trying a new location`}
                            </p>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>📊</div>
                            <h3 className={styles.featureTitle}>
                                Customer Analytics
                            </h3>
                            <p className={styles.featureDescription}>
                                Gain insights into customer preferences, peak
                                hours, and popular menu items to optimize your
                                business strategy
                            </p>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>🗓️</div>
                            <h3 className={styles.featureTitle}>
                                Schedule Management
                            </h3>
                            <p className={styles.featureDescription}>
                                Easily update your operating hours, special
                                events, and limited-time offerings to keep
                                customers informed
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image Section 1 */}
            <section className={styles.imageSection}>
                <div className="container">
                    <div className={styles.imageContent}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/landing/vendor-1.jpg"
                                alt="Food truck vendor serving customers"
                                width={600}
                                height={400}
                                className={styles.vendorImage}
                            />
                        </div>
                        <div className={styles.imageCopy}>
                            <h2 className={styles.imageCopyTitle}>
                                Increase Your Customer Reach
                            </h2>
                            <p className={styles.imageCopyText}>
                                With MunchMap, your food truck becomes
                                discoverable to thousands of potential customers
                                in your area who are actively searching for
                                dining options.
                            </p>
                            <ul className={styles.benefitsList}>
                                <li>Get discovered by new customers</li>
                                <li>Build a loyal customer base</li>
                                <li>Showcase your unique menu offerings</li>
                                <li>Highlight your brand story and values</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image Section 2 */}
            <section className={styles.imageSection + " " + styles.reversed}>
                <div className="container">
                    <div className={styles.imageContent}>
                        <div className={styles.imageCopy}>
                            <h2 className={styles.imageCopyTitle}>
                                Streamline Your Operations
                            </h2>
                            <p className={styles.imageCopyText}>
                                Our vendor dashboard gives you powerful tools to
                                manage your business more efficiently, from
                                updating your menu to tracking customer
                                engagement.
                            </p>
                            <ul className={styles.benefitsList}>
                                <li>Easily update menus and prices</li>
                                <li>
                                    Manage multiple food trucks under one
                                    account
                                </li>
                                <li>Receive direct customer feedback</li>
                                <li>Track performance metrics</li>
                            </ul>
                        </div>
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/landing/vendor-2.jpg"
                                alt="Vendor using the MunchMap dashboard"
                                width={600}
                                height={400}
                                className={styles.vendorImage}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className={styles.pricingSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>
                            Simple, Transparent Pricing
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Join MunchMap with a pricing plan that works for
                            your business
                        </p>
                    </div>

                    <div className={styles.pricingCards}>
                        <div className={styles.pricingCard}>
                            <div className={styles.pricingHeader}>
                                <h3 className={styles.pricingTitle}>Basic</h3>
                                <p className={styles.pricingPrice}>Free</p>
                            </div>
                            <ul className={styles.pricingFeatures}>
                                <li>Basic profile listing</li>
                                <li>Location updates</li>
                                <li>Basic menu display</li>
                                <li>Customer reviews</li>
                            </ul>
                            <div className={styles.pricingCta}>
                                <Link
                                    href="/auth/sign-up/vendor"
                                    className={styles.secondaryBtn}
                                >
                                    Start Free
                                </Link>
                            </div>
                        </div>

                        <div
                            className={
                                styles.pricingCard + " " + styles.featured
                            }
                        >
                            <div className={styles.pricingBadge}>Popular</div>
                            <div className={styles.pricingHeader}>
                                <h3 className={styles.pricingTitle}>Pro</h3>
                                <p className={styles.pricingPrice}>
                                    $29<span>/month</span>
                                </p>
                            </div>
                            <ul className={styles.pricingFeatures}>
                                <li>Premium profile placement</li>
                                <li>Real-time analytics</li>
                                <li>Menu with photos</li>
                                <li>Customer insights</li>
                                <li>Social media integration</li>
                            </ul>
                            <div className={styles.pricingCta}>
                                <Link
                                    href="/auth/sign-up/vendor"
                                    className={styles.primaryBtn}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>

                        <div className={styles.pricingCard}>
                            <div className={styles.pricingHeader}>
                                <h3 className={styles.pricingTitle}>
                                    Enterprise
                                </h3>
                                <p className={styles.pricingPrice}>Custom</p>
                            </div>
                            <ul className={styles.pricingFeatures}>
                                <li>Multiple truck management</li>
                                <li>Advanced analytics</li>
                                <li>API access</li>
                                <li>Dedicated support</li>
                                <li>Custom integrations</li>
                            </ul>
                            <div className={styles.pricingCta}>
                                <Link
                                    href="/contact"
                                    className={styles.secondaryBtn}
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className={styles.testimonialsSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>
                            What Vendors Say
                        </h2>
                    </div>

                    <div className={styles.testimonialCards}>
                        <div className={styles.testimonialCard}>
                            <div className={styles.testimonialContent}>
                                <p className={styles.testimonialText}>
                                    {`"Since joining MunchMap, we've seen a 40% increase in new customers. The location tracking feature has been a game-changer for our mobile business."`}
                                </p>
                            </div>
                            <div className={styles.testimonialAuthor}>
                                <div className={styles.testimonialAvatar}>
                                    SM
                                </div>
                                <div className={styles.testimonialInfo}>
                                    <p className={styles.testimonialName}>
                                        Sarah M.
                                    </p>
                                    <p className={styles.testimonialBusiness}>
                                        Taco Tienda
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.testimonialCard}>
                            <div className={styles.testimonialContent}>
                                <p className={styles.testimonialText}>
                                    {`"The analytics tools help me make better business decisions. I know which locations perform best and what menu items are most popular."`}
                                </p>
                            </div>
                            <div className={styles.testimonialAuthor}>
                                <div className={styles.testimonialAvatar}>
                                    JD
                                </div>
                                <div className={styles.testimonialInfo}>
                                    <p className={styles.testimonialName}>
                                        James D.
                                    </p>
                                    <p className={styles.testimonialBusiness}>
                                        Burger Boulevard
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <div className={styles.ctaCard}>
                        <h2 className={styles.ctaTitle}>
                            Ready to grow your food truck business?
                        </h2>
                        <p className={styles.ctaSubtitle}>
                            Join thousands of successful vendors on MunchMap
                        </p>

                        {!isSignedIn ? (
                            <Link
                                href="/auth/sign-up/vendor"
                                className={styles.ctaBtn}
                            >
                                Join MunchMap Today
                            </Link>
                        ) : (
                            <Link
                                href="/vendor/dashboard"
                                className={styles.ctaBtn}
                            >
                                Access Vendor Dashboard
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
