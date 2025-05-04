"use client";

import styles from "./page.module.css";
import Link from "next/link";

export default function HomePage() {
    return (
        <main className={styles.container}>
            <section className={styles.hero}>
                <h1 className={styles.title}>Find Food Trucks Near You</h1>
                <p className={styles.subtitle}>
                    Discover local street food, explore menus, and support small
                    businesses — all in one app.
                </p>

                <div className={styles.ctaGroup}>
                    <Link href="/auth/sign-up" className={styles.primaryBtn}>
                        Sign Up
                    </Link>
                    <Link href="/map" className={styles.secondaryBtn}>
                        Explore Map
                    </Link>
                </div>

                <p className={styles.signInPrompt}>
                    Already have an account?{" "}
                    <Link href="/auth/sign-in" className={styles.signInLink}>
                        Sign In
                    </Link>
                </p>
            </section>
        </main>
    );
}
