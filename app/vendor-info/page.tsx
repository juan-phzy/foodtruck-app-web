"use client";

import styles from "./page.module.css";
import Image from "next/image";
import { MapPin, Eye, Star, UsersThree, ShoppingCart } from "phosphor-react";
import { motion } from "framer-motion";


export default function VendorInfoPage() {
    return (
        <main className={styles.container}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.text}>
                        <h1 className={styles.heading}>
                            Grow Your Food Truck Business with MunchMap
                        </h1>
                        <p className={styles.subtext}>
                            MunchMap is the first nationwide platform focused
                            solely on mobile food vendors. We help users find
                            trucks like yours through our interactive map and
                            user-focused search tools.
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className={styles.ctaWrapper}
                        >
                            <a href="/auth/signup" className={styles.ctaButton}>
                                Sign Up as a Vendor
                            </a>
                        </motion.div>
                    </div>

                    <div className={styles.imageWrapper}>
                        <Image
                            src="/images/placeholder.jpg"
                            alt="Vendor preview"
                            width={300}
                            height={200}
                            className={styles.image}
                        />
                    </div>
                </div>
            </section>

            <section className={styles.features}>
                <div className={styles.featureCard}>
                    <MapPin size={32} weight="bold" />
                    <h2>Be Discoverable</h2>
                    <p>
                        Get placed directly on the map so hungry locals can find
                        you instantly.
                    </p>
                </div>

                <div className={styles.featureCard}>
                    <Eye size={32} weight="bold" />
                    <h2>Insights & Analytics</h2>
                    <p>
                        Track views, clicks, and activity around your truck in
                        real time.
                    </p>
                </div>

                <div className={styles.featureCard}>
                    <UsersThree size={32} weight="bold" />
                    <h2>Community Visibility</h2>
                    <p>
                        Join a network of vendors and gain loyal customers who
                        share and save your location.
                    </p>
                </div>

                <div className={styles.featureCard}>
                    <ShoppingCart size={32} weight="bold" />
                    <h2>Future: In-App Ordering</h2>
                    <p>
                        Soon, users will be able to order directly through
                        MunchMap — with vendor-friendly fees.
                    </p>
                </div>

                <div className={styles.featureCard}>
                    <Star size={32} weight="bold" />
                    <h2>Ratings & Reviews</h2>
                    <p>
                        Build trust with new customers through feedback and
                        social proof.
                    </p>
                </div>
            </section>
        </main>
    );
}
