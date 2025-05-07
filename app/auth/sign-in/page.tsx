"use client";

import { useEffect, useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import styles from "./page.module.css";

export default function SignInPage() {
    const [email, setEmail] = useState("+clerk_test@example.com");
    const [password, setPassword] = useState("public123");
    const [activeTab, setActiveTab] = useState<"user" | "vendor">("user");
    const [loading, setLoading] = useState(false);

    const { isLoaded, signIn } = useSignIn();
    const { setActive } = useClerk();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        setLoading(true);
        try {
            const attempt = await signIn.create({
                identifier: email,
                password,
            });

            if (attempt.status === "complete") {
                await setActive({ session: attempt.createdSessionId });
                setLoading(false);

                if (activeTab === "vendor") {
                    router.replace("/vendor/dashboard");
                } else {
                    router.replace("/user/map");
                }
            } else {
                setLoading(false);
                console.warn("Unexpected status:", attempt.status);
            }
        } catch (err: unknown) {
            setLoading(false);
            let message = "Sign in failed";

            if (err instanceof Error && "errors" in err) {
                type ClerkError = { errors?: { message: string }[] };
                message = (err as ClerkError)?.errors?.[0]?.message ?? message;
            }

            toast.error(message, {
                position: "bottom-right",
                autoClose: 4000,
            });
        }
    };

    useEffect(() => {
        if (activeTab === "vendor") {
            setPassword("vendor123");
        } else {
            setPassword("public123");
        }
    }, [activeTab]);

    return (
        <main className="page-fullscreen">
            <section className={styles.container}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>
                        Sign in to continue to MunchMap
                    </p>

                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${activeTab === "user" ? styles.activeTab : ""}`}
                            onClick={() => setActiveTab("user")}
                        >
                            Food Explorer
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === "vendor" ? styles.activeTab : ""}`}
                            onClick={() => setActiveTab("vendor")}
                        >
                            Food Vendor
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <div className={styles.passwordHeader}>
                                <label
                                    className={styles.label}
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <Link
                                    href="/auth/forgot-password"
                                    className={styles.forgotPassword}
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            <input
                                id="password"
                                type="password"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={styles.button}
                            disabled={loading}
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>

                    <div className={styles.divider}>
                        <span>OR</span>
                    </div>

                    {/* <div className={styles.socialSignIn}>
                    <button className={styles.socialButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        Continue with Facebook
                    </button>
                    <button className={styles.socialButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                        Continue with Google
                    </button>
                </div> */}

                    <p className={styles.linkText}>
                        {`Don't have an account? `}
                        <Link
                            href={
                                activeTab === "vendor"
                                    ? "/auth/sign-up/vendor"
                                    : "/auth/sign-up/user"
                            }
                            className={styles.link}
                        >
                            Sign Up Now
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}
