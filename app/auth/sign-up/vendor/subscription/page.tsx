// app/auth/sign-up/vendor/subscription/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useUser } from "@clerk/nextjs";
import styles from "../page.module.css";
import {
    useVendorOnboardingStore,
    SUBSCRIPTION_PLANS,
} from "@/store/useVendorOnboardingStore";

export default function SubscriptionPage() {
    const router = useRouter();
    const { user, isLoaded } = useUser();
    const { selectPlan } = useVendorOnboardingStore();
    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Move auth check inside useEffect
    useEffect(() => {
        if (isLoaded && !user) {
            router.replace("/auth/sign-in");
        }

        // Pre-select the Growth plan as recommended option
        if (!selectedPlanId) {
            setSelectedPlanId("growth");
        }
    }, [isLoaded, user, router, selectedPlanId]);

    // Handle plan selection
    const handlePlanSelect = (planId: string) => {
        setSelectedPlanId(planId);
    };

    // Handle form submission
    const handleContinue = async () => {
        if (!selectedPlanId) {
            toast.error("Please select a subscription plan", {
                position: "bottom-right",
                autoClose: 4000,
            });
            return;
        }

        // Find the selected plan
        const selectedPlan = SUBSCRIPTION_PLANS.find(
            (plan) => plan.id === selectedPlanId
        );

        if (!selectedPlan) {
            toast.error("Invalid plan selected", {
                position: "bottom-right",
                autoClose: 4000,
            });
            return;
        }

        setLoading(true);
        try {
            // Store the selected plan in our state
            selectPlan(selectedPlan);

            // Create checkout session
            const response = await fetch("/api/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    plan: selectedPlanId,
                    stripePriceId: selectedPlan.stripePriceId,
                    redirectUrl: `${window.location.origin}/auth/sign-up/vendor/business`,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.error || "Failed to create checkout session"
                );
            }

            const data = await response.json();

            // If we got a URL back, redirect to Stripe
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error("No checkout URL returned");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to process subscription. Please try again.",
                {
                    position: "bottom-right",
                    autoClose: 4000,
                }
            );
            setLoading(false);
        }
    };

    // Show loading state while checking auth
    if (!isLoaded) {
        return (
            <main className="page-fullscreen">
                <section className={styles.container}>
                    <div className={styles.card}>
                        <h1 className={styles.title}>Loading...</h1>
                        <div className={styles.loaderContainer}>
                            <div className={styles.loader}></div>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="page-fullscreen">
            <section className={styles.container}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Choose Your Plan</h1>
                    <p className={styles.subtitle}>
                        Select a subscription plan that fits your business needs
                    </p>

                    <div className={styles.plansContainer}>
                        {SUBSCRIPTION_PLANS.map((plan) => (
                            <div
                                key={plan.id}
                                className={`${styles.planCard} ${
                                    selectedPlanId === plan.id
                                        ? styles.selectedPlan
                                        : ""
                                } ${
                                    plan.id === "growth"
                                        ? styles.recommendedPlan
                                        : ""
                                }`}
                                onClick={() => handlePlanSelect(plan.id)}
                            >
                                <h3 className={styles.planName}>{plan.name}</h3>

                                <div className={styles.planPrice}>
                                    <span className={styles.currency}>$</span>
                                    <span className={styles.amount}>
                                        {plan.price.toFixed(2)}
                                    </span>
                                    <span className={styles.period}>
                                        /{plan.interval}
                                    </span>
                                </div>

                                <div className={styles.planLimits}>
                                    <div className={styles.limitBadge}>
                                        {plan.truckLimit === null
                                            ? "Unlimited locations"
                                            : `${plan.truckLimit} location${plan.truckLimit > 1 ? "s" : ""}`}
                                    </div>
                                    <div className={styles.limitBadge}>
                                        {plan.employeeLimit === null
                                            ? "Unlimited employees"
                                            : `${plan.employeeLimit} employee${plan.employeeLimit > 1 ? "s" : ""}`}
                                    </div>
                                </div>

                                {plan.description && (
                                    <p className={styles.planDescription}>
                                        {plan.description}
                                    </p>
                                )}

                                <ul className={styles.featuresList}>
                                    {plan.features.map((feature, index) => (
                                        <li
                                            key={index}
                                            className={styles.featureItem}
                                        >
                                            <span className={styles.checkmark}>
                                                ✓
                                            </span>{" "}
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {(plan.id === "growth" ||
                                    plan.id === "professional" ||
                                    plan.id === "enterprise") && (
                                    <div className={styles.trialBadge}>
                                        30-day free trial
                                    </div>
                                )}

                                <button
                                    type="button"
                                    className={`${styles.selectButton} ${
                                        selectedPlanId === plan.id
                                            ? styles.selectedButton
                                            : ""
                                    }`}
                                    onClick={() => handlePlanSelect(plan.id)}
                                >
                                    {selectedPlanId === plan.id
                                        ? "Selected"
                                        : "Select Plan"}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className={styles.buttonContainer}>
                        <button
                            type="button"
                            className={styles.backButton}
                            onClick={() => router.back()}
                            disabled={loading}
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            className={styles.nextButton}
                            onClick={handleContinue}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Continue to Checkout"}
                        </button>
                    </div>

                    <div className={styles.secureNotice}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                        </svg>
                        <span>Secure payment processing by Stripe</span>
                    </div>
                </div>
            </section>
        </main>
    );
}
