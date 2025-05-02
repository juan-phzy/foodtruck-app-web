"use client";

import Link from "next/link";
import styles from "./PublicNavBar.module.css";
import { useUser } from "@clerk/nextjs";

export default function PublicNavBar() {
  const { isSignedIn } = useUser();

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link href="/" className={styles.logo}>
          MunchMap
        </Link>
      </div>

      <div className={styles.right}>
        <Link href="/map" className={styles.link}>
          Explore Map
        </Link>
        <Link href="/vendor-info" className={styles.link}>
          For Vendors
        </Link>

        {!isSignedIn ? (
          <>
            <Link href="/auth/signin" className={styles.link}>
              Sign In
            </Link>
            <Link href="/auth/signup" className={styles.signupBtn}>
              Sign Up
            </Link>
          </>
        ) : (
          <Link href="/public" className={styles.link}>
            Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
}
