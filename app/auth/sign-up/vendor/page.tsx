"use client";

/*
    /app/auth/sign-up/vendor/page.tsx
*/

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { toast } from "react-toastify";
import Link from "next/link";
import styles from "./page.module.css";
import { useVendorOnboardingStore } from "@/store/useVendorOnboardingStore";

type Step = 1 | 2 | 3 | 4 | 5;

export default function VendorSignUpPage() {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [verificationCode, setVerificationCode] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { isLoaded, signUp } = useSignUp();

    const { data, updateField, reset } = useVendorOnboardingStore();

    // Step validation
    const validateStep = (step: Step): boolean => {
        switch (step) {
            case 1:
                return Boolean(data.first_name && data.last_name);
            case 2:
                return Boolean(data.email); // Only email is required
            case 3:
                // Check if password matches confirmation
                return Boolean(
                    data.password &&
                        confirmPassword &&
                        data.password === confirmPassword
                );
            case 4:
                return true; // Review step, no validation needed
            case 5:
                return verificationCode.length > 0;
            default:
                return false;
        }
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            if (currentStep === 4) {
                handleSignUp();
            } else {
                setCurrentStep((currentStep + 1) as Step);
            }
        } else {
            // Show appropriate error message based on step
            if (currentStep === 3 && data.password !== confirmPassword) {
                toast.error("Passwords do not match", {
                    position: "bottom-right",
                    autoClose: 4000,
                });
            } else {
                toast.error("Please fill in all required fields", {
                    position: "bottom-right",
                    autoClose: 4000,
                });
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((currentStep - 1) as Step);
        }
    };

    const handleSignUp = async () => {
        if (!isLoaded) return;

        setLoading(true);
        try {
            // Start the sign-up process
            await signUp.create({
                firstName: data.first_name,
                lastName: data.last_name,
                emailAddress: data.email,
                phoneNumber: data.phone_number,
                password: data.password,
                unsafeMetadata: {
                    role: "vendor", // Set the role as vendor
                },
            });

            // Send the email verification code
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });

            // Move to verification step
            setCurrentStep(5);
            setLoading(false);
        } catch (err: unknown) {
            setLoading(false);
            let message = "Sign up failed";

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

    const handleVerify = async () => {
        if (!isLoaded || !verificationCode) return;

        setLoading(true);
        try {
            // Attempt to verify the email
            const result = await signUp.attemptEmailAddressVerification({
                code: verificationCode,
            });

            if (result.status === "complete") {
                // Account created successfully
                setLoading(false);

                // Clear the store and redirect to subscription page
                reset();

                // Redirect to the subscription selection page
                toast.success("Account created successfully!", {
                    position: "bottom-right",
                    autoClose: 4000,
                });

                // Use window.location.href for a full page reload to ensure Clerk session is established
                window.location.href = "/auth/sign-up/vendor/subscription";
            } else {
                setLoading(false);
                toast.error("Verification failed. Please try again.", {
                    position: "bottom-right",
                    autoClose: 4000,
                });
            }
        } catch (err: unknown) {
            setLoading(false);
            let message = "Verification failed";

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

    // Render form content based on current step
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <div className={styles.stepIndicator}>
                            <span className={styles.activeStep}>1</span>
                            <span className={styles.inactiveStep}>2</span>
                            <span className={styles.inactiveStep}>3</span>
                            <span className={styles.inactiveStep}>4</span>
                        </div>
                        <div className={styles.stepTitle}>
                            Basic Information
                        </div>

                        <div className={styles.inputGroup}>
                            <label
                                className={styles.label}
                                htmlFor="first_name"
                            >
                                First Name *
                            </label>
                            <input
                                id="first_name"
                                type="text"
                                className={styles.input}
                                value={data.first_name || ""}
                                onChange={(e) =>
                                    updateField("first_name", e.target.value)
                                }
                                placeholder="Enter your first name"
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="last_name">
                                Last Name *
                            </label>
                            <input
                                id="last_name"
                                type="text"
                                className={styles.input}
                                value={data.last_name || ""}
                                onChange={(e) =>
                                    updateField("last_name", e.target.value)
                                }
                                placeholder="Enter your last name"
                                required
                            />
                        </div>

                        <div className={styles.buttonContainer}>
                            <button
                                type="button"
                                className={styles.nextButton}
                                onClick={handleNext}
                                disabled={loading}
                            >
                                Continue
                            </button>
                        </div>
                    </>
                );

            case 2:
                return (
                    <>
                        <div className={styles.stepIndicator}>
                            <span className={styles.completedStep}>1</span>
                            <span className={styles.activeStep}>2</span>
                            <span className={styles.inactiveStep}>3</span>
                            <span className={styles.inactiveStep}>4</span>
                        </div>
                        <div className={styles.stepTitle}>
                            Contact Information
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="email">
                                Email Address *
                            </label>
                            <input
                                id="email"
                                type="email"
                                className={styles.input}
                                value={data.email || ""}
                                onChange={(e) =>
                                    updateField("email", e.target.value)
                                }
                                placeholder="Enter your email address"
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label
                                className={styles.label}
                                htmlFor="phone_number"
                            >
                                Phone Number (Optional)
                            </label>
                            <input
                                id="phone_number"
                                type="tel"
                                className={styles.input}
                                value={data.phone_number || ""}
                                onChange={(e) =>
                                    updateField("phone_number", e.target.value)
                                }
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div className={styles.buttonContainer}>
                            <button
                                type="button"
                                className={styles.backButton}
                                onClick={handleBack}
                                disabled={loading}
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                className={styles.nextButton}
                                onClick={handleNext}
                                disabled={loading}
                            >
                                Continue
                            </button>
                        </div>
                    </>
                );

            case 3:
                return (
                    <>
                        <div className={styles.stepIndicator}>
                            <span className={styles.completedStep}>1</span>
                            <span className={styles.completedStep}>2</span>
                            <span className={styles.activeStep}>3</span>
                            <span className={styles.inactiveStep}>4</span>
                        </div>
                        <div className={styles.stepTitle}>Create Password</div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="password">
                                Password *
                            </label>
                            <input
                                id="password"
                                type="password"
                                className={styles.input}
                                value={data.password || ""}
                                onChange={(e) =>
                                    updateField("password", e.target.value)
                                }
                                placeholder="Create a password"
                                required
                            />
                            <p className={styles.helperText}>
                                Password should be at least 8 characters
                            </p>
                        </div>

                        <div className={styles.inputGroup}>
                            <label
                                className={styles.label}
                                htmlFor="confirm_password"
                            >
                                Confirm Password *
                            </label>
                            <input
                                id="confirm_password"
                                type="password"
                                className={styles.input}
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="Confirm your password"
                                required
                            />
                        </div>

                        <div className={styles.buttonContainer}>
                            <button
                                type="button"
                                className={styles.backButton}
                                onClick={handleBack}
                                disabled={loading}
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                className={styles.nextButton}
                                onClick={handleNext}
                                disabled={loading}
                            >
                                Continue
                            </button>
                        </div>
                    </>
                );

            case 4:
                return (
                    <>
                        <div className={styles.stepIndicator}>
                            <span className={styles.completedStep}>1</span>
                            <span className={styles.completedStep}>2</span>
                            <span className={styles.completedStep}>3</span>
                            <span className={styles.activeStep}>4</span>
                        </div>
                        <div className={styles.stepTitle}>
                            Review Information
                        </div>

                        <div className={styles.reviewContainer}>
                            <div className={styles.reviewSection}>
                                <h3 className={styles.reviewSectionTitle}>
                                    Personal Information
                                </h3>
                                <div className={styles.reviewItem}>
                                    <span className={styles.reviewLabel}>
                                        Name:
                                    </span>
                                    <span className={styles.reviewValue}>
                                        {data.first_name} {data.last_name}
                                    </span>
                                </div>
                                <div className={styles.reviewItem}>
                                    <span className={styles.reviewLabel}>
                                        Email:
                                    </span>
                                    <span className={styles.reviewValue}>
                                        {data.email}
                                    </span>
                                </div>
                                {data.phone_number && (
                                    <div className={styles.reviewItem}>
                                        <span className={styles.reviewLabel}>
                                            Phone:
                                        </span>
                                        <span className={styles.reviewValue}>
                                            {data.phone_number}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={styles.termsSection}>
                            <p className={styles.termsText}>
                                By clicking Create Account, you agree to our{" "}
                                <Link
                                    href="/terms"
                                    className={styles.termsLink}
                                >
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link
                                    href="/privacy"
                                    className={styles.termsLink}
                                >
                                    Privacy Policy
                                </Link>
                                .
                            </p>
                        </div>

                        <div className={styles.buttonContainer}>
                            <button
                                type="button"
                                className={styles.backButton}
                                onClick={handleBack}
                                disabled={loading}
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                className={styles.nextButton}
                                onClick={handleNext}
                                disabled={loading}
                            >
                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"}
                            </button>
                        </div>
                    </>
                );

            case 5:
                return (
                    <>
                        <div className={styles.stepTitle}>
                            Verify Your Email
                        </div>
                        <p className={styles.verificationText}>
                            {`We've sent a verification code to`}{" "}
                            <strong>{data.email}</strong>
                            {`. Please check your inbox and enter the code below.`}
                        </p>

                        <div className={styles.inputGroup}>
                            <label
                                className={styles.label}
                                htmlFor="verification_code"
                            >
                                Verification Code *
                            </label>
                            <input
                                id="verification_code"
                                type="text"
                                className={styles.input}
                                value={verificationCode}
                                onChange={(e) =>
                                    setVerificationCode(e.target.value)
                                }
                                placeholder="Enter verification code"
                                required
                            />
                        </div>

                        <div className={styles.buttonContainer}>
                            <button
                                type="button"
                                className={styles.nextButton}
                                onClick={handleVerify}
                                disabled={loading}
                            >
                                {loading ? "Verifying..." : "Verify & Complete"}
                            </button>
                        </div>

                        <p className={styles.resendText}>
                            {`Didn't receive the code? `}
                            <button
                                type="button"
                                className={styles.resendButton}
                                onClick={async () => {
                                    if (!isLoaded) return;
                                    try {
                                        await signUp.prepareEmailAddressVerification(
                                            {
                                                strategy: "email_code",
                                            }
                                        );
                                        toast.info(
                                            "Verification code resent to your email",
                                            {
                                                position: "bottom-right",
                                                autoClose: 4000,
                                            }
                                        );
                                    } catch (err) {
                                        console.error(err);
                                        toast.error(
                                            "Failed to resend verification code",
                                            {
                                                position: "bottom-right",
                                                autoClose: 4000,
                                            }
                                        );
                                    }
                                }}
                            >
                                Resend Code
                            </button>
                        </p>
                    </>
                );
        }
    };

    return (
        <main className="page-fullscreen">
            <section className={styles.container}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Create Vendor Account</h1>
                    {currentStep < 5 && (
                        <p className={styles.subtitle}>
                            Join MunchMap and start showcasing your food truck
                        </p>
                    )}

                    <form
                        className={styles.form}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        {renderStepContent()}
                    </form>

                    {currentStep === 1 && (
                        <div className={styles.switchSection}>
                            <p className={styles.switchText}>
                                Looking for a customer account?{" "}
                                <Link
                                    href="/auth/sign-up/user"
                                    className={styles.switchLink}
                                >
                                    Create a user account
                                </Link>
                            </p>
                        </div>
                    )}

                    <p className={styles.linkText}>
                        Already have an account?{" "}
                        <Link href="/auth/sign-in" className={styles.link}>
                            Sign In
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}
