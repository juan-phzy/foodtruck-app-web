"use client";
/*
    /app/auth/sign-in/page.tsx
*/

import styles from "./page.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SignInPage() {
    const [email, setEmail] = useState("public-user+clerk_test@example.com");
    const [password, setPassword] = useState("public12345");
    const [isVendor, setIsVendor] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { isLoaded, signIn } = useSignIn();
    const { setActive } = useClerk();
    const router = useRouter();

    useEffect(() => {
        if (isVendor) {
            setEmail("+clerk_test@example.com");
            setPassword("vendor123");
        } else {
            setEmail("+clerk_test@example.com");
            setPassword("public123");
        }
    }, [isVendor]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
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

                if (isVendor) {
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

    return (
        <main className={styles.container}>
            <section className={styles.card}>
                <h1 className={styles.title}>Sign In</h1>
                <p className={styles.subtitle}>
                    {isVendor
                        ? "Business Login"
                        : "Welcome back! Sign in to continue."}
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label}>
                        Email
                        <input
                            type="email"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    <label className={styles.label}>
                        Password
                        <input
                            type="password"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>

                    {error && <p className={styles.error}>{error}</p>}

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={loading}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <p className={styles.linkText}>
                    {isVendor ? "New Business?" : "New User?"}{" "}
                    <Link
                        href={
                            isVendor
                                ? "/auth/createBusiness/step1"
                                : "/auth/createUser/step1"
                        }
                        className={styles.link}
                    >
                        {isVendor
                            ? "Create New Business"
                            : "Create Account Here"}
                    </Link>
                </p>

                <button
                    type="button"
                    onClick={() => setIsVendor((prev) => !prev)}
                    className={styles.switchRole}
                >
                    {isVendor
                        ? "Switch to Public Login"
                        : "Switch to Vendor Login"}
                </button>
            </section>
        </main>
    );
}
