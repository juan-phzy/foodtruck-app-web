// app/auth/sign-up/vendor/business/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useUser, useClerk } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import styles from "../page.module.css";
import {
    useVendorOnboardingStore,
    // SUBSCRIPTION_PLANS,
} from "@/store/useVendorOnboardingStore";

import { CATEGORIES } from "@/constants";
import Image from "next/image";

export default function BusinessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user, isLoaded } = useUser();
    const { createOrganization } = useClerk();
    const [organizationCreated, setOrganizationCreated] = useState(false);
    const [organizationId, setOrganizationId] = useState<string | null>(null);

    const { data, updateField, updateMultipleFields } =
        useVendorOnboardingStore();
    const [loading, setLoading] = useState(true);
    const [subscriptionVerified, setSubscriptionVerified] = useState(false);
    const [creatingOrganization, setCreatingOrganization] = useState(false);

    // Add a new state for selected categories
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [categoryError, setCategoryError] = useState<string>("");

    // Convex mutations
    const updatePublicInfo = useMutation(api.businesses.updatePublicInfo);
    const updateSocials = useMutation(api.businesses.updateSocials);
    const updateCategories = useMutation(api.businesses.updateCategories);
    const updateVendorSubscription = useMutation(
        api.vendors.updateVendorSubscription
    );

    // Form states
    const [step, setStep] = useState(1); // Step 1: Business Name, Step 2: Business Details
    const [businessName, setBusinessName] = useState(data.business_name || "");
    const [businessDescription, setBusinessDescription] = useState(
        data.business_description || ""
    );
    const [primaryCity, setPrimaryCity] = useState(data.primary_city || "");
    const [businessEmail, setBusinessEmail] = useState(
        data.business_email || ""
    );
    const [phone, setPhone] = useState(data.phone || "");
    const [website, setWebsite] = useState(data.website || "");
    const [instagram, setInstagram] = useState(data.instagram_link || "");
    const [twitter, setTwitter] = useState(data.twitter_link || "");
    const [facebook, setFacebook] = useState(data.facebook_link || "");
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Handle category selection toggle
    const handleCategoryToggle = (categoryName: string) => {
        setCategoryError(""); // Clear any previous error

        if (selectedCategories.includes(categoryName)) {
            // Remove category if already selected
            setSelectedCategories((prev) =>
                prev.filter((cat) => cat !== categoryName)
            );
        } else {
            // Add category if less than 4 are selected
            if (selectedCategories.length < 4) {
                setSelectedCategories((prev) => [...prev, categoryName]);
            } else {
                // Show error if trying to select more than 4
                setCategoryError("You can select a maximum of 4 categories");
            }
        }
    };

    // Load initial form data from store when available
    useEffect(() => {
        if (data.business_name) setBusinessName(data.business_name);
        if (data.business_description)
            setBusinessDescription(data.business_description);
        if (data.primary_city) setPrimaryCity(data.primary_city);
        if (data.business_email) setBusinessEmail(data.business_email);
        if (data.phone) setPhone(data.phone);
        if (data.website) setWebsite(data.website);
        if (data.instagram_link) setInstagram(data.instagram_link);
        if (data.twitter_link) setTwitter(data.twitter_link);
        if (data.facebook_link) setFacebook(data.facebook_link);
    }, [data]);

    useEffect(() => {
        // First check if user is authenticated
        if (isLoaded && !user) {
            router.replace("/auth/sign-in");
            return; // Exit early
        }

        if (!isLoaded) {
            return; // Wait until user data is loaded
        }

        // Skip verification if already done
        if (subscriptionVerified) {
            setLoading(false);
            return;
        }

        // Now proceed with session verification
        const sessionId = searchParams.get("session_id");
        const canceled = searchParams.get("canceled");

        const verifySession = async () => {
            if (sessionId) {
                try {
                    const response = await fetch(
                        `/api/verify-subscription?session_id=${sessionId}`
                    );

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(
                            errorData.message || "Failed to verify subscription"
                        );
                    }

                    const data = await response.json();

                    console.log("Subscription verification data:", data);

                    if (data.success) {
                        // Now that we have the subscription data, update the vendor record directly
                        if (user) {
                            try {
                                // Find the selected plan
                                const planId = data.planId || "starter";

                                // Update vendor's subscription in Convex
                                await updateVendorSubscription({
                                    clerkId: user.id,
                                    stripeCustomerId: data.customerId.id,
                                    stripeSubscriptionId:
                                        data.subscriptionId.id,
                                    subscriptionPlanId: planId,
                                    subscriptionStatus: data.status || "active",
                                    subscriptionCurrentPeriodEnd: data.trialEnd
                                        ? new Date(
                                              data.trialEnd * 1000
                                          ).toISOString()
                                        : new Date(
                                              Date.now() +
                                                  30 * 24 * 60 * 60 * 1000
                                          ).toISOString(),
                                });

                                toast.success(
                                    "Subscription activated successfully!",
                                    {
                                        position: "bottom-right",
                                        autoClose: 4000,
                                    }
                                );

                                // Mark as verified to prevent multiple updates
                                setSubscriptionVerified(true);
                            } catch (err) {
                                console.error(
                                    "Error updating subscription in database:",
                                    err
                                );
                                toast.error(
                                    "Subscription verified but couldn't update your account. Please contact support.",
                                    {
                                        position: "bottom-right",
                                        autoClose: 4000,
                                    }
                                );
                            }
                        }
                    } else {
                        toast.error(
                            data.message ||
                                "There was an issue with your subscription. Please contact support.",
                            {
                                position: "bottom-right",
                                autoClose: 4000,
                            }
                        );
                        router.replace("/auth/sign-up/vendor/subscription");
                        return;
                    }
                } catch (error) {
                    console.error("Error verifying session:", error);
                    toast.error(
                        error instanceof Error
                            ? error.message
                            : "Failed to verify your subscription. Please contact support.",
                        {
                            position: "bottom-right",
                            autoClose: 4000,
                        }
                    );
                    router.replace("/auth/sign-up/vendor/subscription");
                    return;
                }
            } else if (canceled) {
                toast.info(
                    "Subscription process was canceled. Please try again.",
                    {
                        position: "bottom-right",
                        autoClose: 4000,
                    }
                );
                router.replace("/auth/sign-up/vendor/subscription");
                return;
            }
            // For development/testing, you might want to comment out this check
            // else if (!data.stripeSubscriptionId) {
            //     // No session ID and no subscription ID in store
            //     // User might have navigated here directly
            //     toast.warning("Please select a subscription plan first", {
            //         position: "bottom-right",
            //         autoClose: 4000,
            //     });
            //     router.replace("/auth/sign-up/vendor/subscription");
            //     return;
            // }

            setLoading(false);
        };

        // Call verifySession only if user is authenticated
        if (user) {
            verifySession();
        }
    }, [
        isLoaded,
        user,
        searchParams,
        router,
        updateField,
        subscriptionVerified,
        updateVendorSubscription,
    ]);

    // Step 1 validation (Business Name)
    const validateStep1 = () => {
        const errors: Record<string, string> = {};

        if (!businessName.trim()) {
            errors.businessName = "Business name is required";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Step 2 validation (Business Details)
    const validateStep2 = () => {
        const errors: Record<string, string> = {};

        if (!businessDescription.trim()) {
            errors.businessDescription =
                "Please provide a description of your business";
        } else if (businessDescription.trim().length < 20) {
            errors.businessDescription =
                "Description should be at least 20 characters";
        }

        if (!primaryCity.trim()) {
            errors.primaryCity = "Primary city is required";
        }

        if (!businessEmail.trim()) {
            errors.businessEmail = "Business email is required";
        } else if (!/\S+@\S+\.\S+/.test(businessEmail)) {
            errors.businessEmail = "Please enter a valid email address";
        }

        if (phone && !/^\+?[\d\s-()]{7,}$/.test(phone)) {
            errors.phone = "Please enter a valid phone number";
        }

        if (
            website &&
            !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
                website
            )
        ) {
            errors.website = "Please enter a valid website URL";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle step 1 submit (Business Name and Org Creation)
    const handleStep1Submit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateStep1()) {
            toast.error("Please fix the errors in the form", {
                position: "bottom-right",
                autoClose: 4000,
            });
            return;
        }

        setFormSubmitting(true);
        setCreatingOrganization(true);

        try {
            // Update the store with business name
            updateField("business_name", businessName);

            // Create a Clerk Organization
            if (createOrganization && !organizationCreated && user) {
                const organization = await createOrganization({
                    name: businessName,
                });
                setOrganizationId(organization.id);
                setOrganizationCreated(true);

                toast.success("Business created successfully!", {
                    position: "bottom-right",
                    autoClose: 4000,
                });

                // Move to step 2
                setStep(2);
            }
        } catch (error) {
            console.error("Error creating organization:", error);
            toast.error(
                error instanceof Error
                    ? `Error: ${error.message}`
                    : "Failed to create business. Please try again.",
                {
                    position: "bottom-right",
                    autoClose: 4000,
                }
            );
        } finally {
            setFormSubmitting(false);
            setCreatingOrganization(false);
        }
    };

    // Handle step 2 submit (Business Details)
    const handleStep2Submit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateStep2()) {
            toast.error("Please fix the errors in the form", {
                position: "bottom-right",
                autoClose: 4000,
            });
            return;
        }

        setFormSubmitting(true);

        try {
            // Update the store with all business information
            const businessData = {
                business_name: businessName,
                business_description: businessDescription,
                primary_city: primaryCity,
                business_email: businessEmail,
                phone: phone,
                website: website,
                instagram_link: instagram,
                twitter_link: twitter,
                facebook_link: facebook,
            };

            updateMultipleFields(businessData);

            // Manually update the business in Convex if needed
            // The organization created webhook should have already created the business
            // This is just for updating additional details
            if (organizationId && user) {
                // Either update the existing business or create if not already created by webhook
                try {
                    await updatePublicInfo({
                        clerkId: organizationId,
                        description: businessDescription,
                        phone_number: phone,
                        primary_city: primaryCity,
                        email_link: businessEmail,
                    });
                } catch (error) {
                    console.log(
                        "Error adding public business info to convex",
                        error
                    );
                }
                try {
                    await updateSocials({
                        clerkId: organizationId,
                        website: website,
                        instagram_link: instagram,
                        facebook_link: facebook,
                        twitter_link: twitter,
                    });
                } catch (error) {
                    console.log(
                        "Error adding social business info to convex",
                        error
                    );
                }
            }

            toast.success("Business details saved successfully!", {
                position: "bottom-right",
                autoClose: 4000,
            });

            // Navigate to the dashboard
            setStep(3);
        } catch (error) {
            console.error("Error saving business information:", error);
            toast.error(
                error instanceof Error
                    ? `Error: ${error.message}`
                    : "Failed to save business information. Please try again.",
                {
                    position: "bottom-right",
                    autoClose: 4000,
                }
            );
        } finally {
            setFormSubmitting(false);
        }
    };

    const handleStep3Submit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedCategories.length === 0) {
            setCategoryError("Please select at least one category");
            return;
        }

        setFormSubmitting(true);

        try {
            // Update categories in Convex
            if (organizationId) {
                await updateCategories({
                    clerkId: organizationId,
                    categories: selectedCategories,
                });

                // Update store with selected categories
                updateField("categories", selectedCategories);

                toast.success("Categories saved successfully!", {
                    position: "bottom-right",
                    autoClose: 4000,
                });

                // Navigate to the dashboard (or wherever you want to go next)
                router.push("/vendor/dashboard");
            } else {
                throw new Error("Organization ID not found");
            }
        } catch (error) {
            console.error("Error saving categories:", error);
            toast.error(
                error instanceof Error
                    ? `Error: ${error.message}`
                    : "Failed to save categories. Please try again.",
                {
                    position: "bottom-right",
                    autoClose: 4000,
                }
            );
        } finally {
            setFormSubmitting(false);
        }
    };

    if (loading) {
        return (
            <main className="page-fullscreen">
                <section className={styles.container}>
                    <div className={styles.card}>
                        <h1 className={styles.title}>
                            Processing Subscription
                        </h1>
                        <p className={styles.subtitle}>
                            Please wait while we verify your subscription...
                        </p>
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
                    <h1 className={styles.title}>
                        {step === 1 ? "Name Your Business" : "Business Details"}
                    </h1>
                    <p className={styles.subtitle}>
                        {step === 1
                            ? "First, let's give your food truck business a name"
                            : "Tell us more about your food truck business"}
                    </p>

                    {step === 1 && (
                        <form
                            className={styles.form}
                            onSubmit={handleStep1Submit}
                        >
                            <div className={styles.inputGroup}>
                                <label
                                    htmlFor="businessName"
                                    className={styles.label}
                                >
                                    Business Name *
                                </label>
                                <input
                                    id="businessName"
                                    type="text"
                                    className={`${styles.input} ${formErrors.businessName ? styles.inputError : ""}`}
                                    value={businessName}
                                    onChange={(e) =>
                                        setBusinessName(e.target.value)
                                    }
                                    placeholder="Your food truck's name"
                                    required
                                />
                                {formErrors.businessName && (
                                    <span className={styles.errorText}>
                                        {formErrors.businessName}
                                    </span>
                                )}
                                <p className={styles.helperText}>
                                    This will be the name customers see when
                                    browsing for food trucks
                                </p>
                            </div>

                            <div className={styles.buttonContainer}>
                                <button
                                    type="button"
                                    className={styles.backButton}
                                    onClick={() =>
                                        router.push(
                                            "/auth/sign-up/vendor/subscription"
                                        )
                                    }
                                    disabled={formSubmitting}
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className={styles.nextButton}
                                    disabled={formSubmitting}
                                >
                                    {creatingOrganization
                                        ? "Creating..."
                                        : "Create Business"}
                                </button>
                            </div>
                        </form>
                    )}
                    {step === 2 && (
                        <form
                            className={styles.form}
                            onSubmit={handleStep2Submit}
                        >
                            <div className={styles.inputGroup}>
                                <label
                                    htmlFor="businessDescription"
                                    className={styles.label}
                                >
                                    Business Description *
                                </label>
                                <textarea
                                    id="businessDescription"
                                    className={`${styles.input} ${formErrors.businessDescription ? styles.inputError : ""}`}
                                    value={businessDescription}
                                    onChange={(e) =>
                                        setBusinessDescription(e.target.value)
                                    }
                                    placeholder="Describe your food truck business, what you offer, and what makes you special"
                                    rows={4}
                                    required
                                />
                                {formErrors.businessDescription && (
                                    <span className={styles.errorText}>
                                        {formErrors.businessDescription}
                                    </span>
                                )}
                            </div>

                            <div className={styles.inputGroup}>
                                <label
                                    htmlFor="primaryCity"
                                    className={styles.label}
                                >
                                    Primary City/Area *
                                </label>
                                <input
                                    id="primaryCity"
                                    type="text"
                                    className={`${styles.input} ${formErrors.primaryCity ? styles.inputError : ""}`}
                                    value={primaryCity}
                                    onChange={(e) =>
                                        setPrimaryCity(e.target.value)
                                    }
                                    placeholder="e.g. Los Angeles, CA"
                                    required
                                />
                                {formErrors.primaryCity && (
                                    <span className={styles.errorText}>
                                        {formErrors.primaryCity}
                                    </span>
                                )}
                            </div>

                            <div className={styles.inputGroup}>
                                <label
                                    htmlFor="businessEmail"
                                    className={styles.label}
                                >
                                    Business Email *
                                </label>
                                <input
                                    id="businessEmail"
                                    type="email"
                                    className={`${styles.input} ${formErrors.businessEmail ? styles.inputError : ""}`}
                                    value={businessEmail}
                                    onChange={(e) =>
                                        setBusinessEmail(e.target.value)
                                    }
                                    placeholder="business@example.com"
                                    required
                                />
                                {formErrors.businessEmail && (
                                    <span className={styles.errorText}>
                                        {formErrors.businessEmail}
                                    </span>
                                )}
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="phone" className={styles.label}>
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    className={`${styles.input} ${formErrors.phone ? styles.inputError : ""}`}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="(123) 456-7890"
                                />
                                {formErrors.phone && (
                                    <span className={styles.errorText}>
                                        {formErrors.phone}
                                    </span>
                                )}
                            </div>

                            <div className={styles.inputGroup}>
                                <label
                                    htmlFor="website"
                                    className={styles.label}
                                >
                                    Website (Optional)
                                </label>
                                <input
                                    id="website"
                                    type="url"
                                    className={`${styles.input} ${formErrors.website ? styles.inputError : ""}`}
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    placeholder="https://yourwebsite.com"
                                />
                                {formErrors.website && (
                                    <span className={styles.errorText}>
                                        {formErrors.website}
                                    </span>
                                )}
                            </div>

                            <div className={styles.inputGroup}>
                                <label
                                    htmlFor="instagram"
                                    className={styles.label}
                                >
                                    Instagram (Optional)
                                </label>
                                <input
                                    id="instagram"
                                    type="text"
                                    className={styles.input}
                                    value={instagram}
                                    onChange={(e) =>
                                        setInstagram(e.target.value)
                                    }
                                    placeholder="@yourbusiness"
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label
                                    htmlFor="facebook"
                                    className={styles.label}
                                >
                                    Facebook (Optional)
                                </label>
                                <input
                                    id="facebook"
                                    type="text"
                                    className={styles.input}
                                    value={facebook}
                                    onChange={(e) =>
                                        setFacebook(e.target.value)
                                    }
                                    placeholder="facebook.com/yourbusiness"
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label
                                    htmlFor="twitter"
                                    className={styles.label}
                                >
                                    Twitter/X (Optional)
                                </label>
                                <input
                                    id="twitter"
                                    type="text"
                                    className={styles.input}
                                    value={twitter}
                                    onChange={(e) => setTwitter(e.target.value)}
                                    placeholder="@yourbusiness"
                                />
                            </div>

                            <div className={styles.buttonContainer}>
                                <button
                                    type="button"
                                    className={styles.backButton}
                                    onClick={() => setStep(1)}
                                    disabled={formSubmitting}
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className={styles.nextButton}
                                    disabled={formSubmitting}
                                >
                                    {formSubmitting
                                        ? "Saving..."
                                        : "Complete Setup"}
                                </button>
                            </div>
                        </form>
                    )}
                    {step === 3 && (
                        <form
                            className={styles.form}
                            onSubmit={handleStep3Submit}
                        >
                            <div>
                                <h2 className={styles.stepTitle}>
                                    Select Your Categories
                                </h2>
                                <p className={styles.subtitle}>
                                    Choose up to 4 categories that best describe
                                    your food truck
                                </p>

                                {categoryError && (
                                    <div className={styles.errorMessage}>
                                        {categoryError}
                                    </div>
                                )}

                                <div className={styles.categoriesContainer}>
                                    {CATEGORIES.map((category) => (
                                        <div
                                            key={category.name}
                                            className={`${styles.categoryCard} ${
                                                selectedCategories.includes(
                                                    category.name
                                                )
                                                    ? styles.selectedCategory
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleCategoryToggle(
                                                    category.name
                                                )
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.categoryImageContainer
                                                }
                                            >
                                                <Image
                                                    src={category.url}
                                                    alt={category.name}
                                                    width={40}
                                                    height={40}
                                                />
                                            </div>
                                            <span
                                                className={styles.categoryName}
                                            >
                                                {category.name}
                                            </span>
                                            {selectedCategories.includes(
                                                category.name
                                            ) && (
                                                <div
                                                    className={
                                                        styles.selectedCheckmark
                                                    }
                                                >
                                                    ✓
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.selectionSummary}>
                                    <span className={styles.selectionCount}>
                                        {selectedCategories.length} of 4
                                        selected
                                    </span>
                                    {selectedCategories.length > 0 && (
                                        <div className={styles.selectedList}>
                                            {selectedCategories.map(
                                                (cat, index) => (
                                                    <span
                                                        key={cat}
                                                        className={
                                                            styles.selectedTag
                                                        }
                                                    >
                                                        {cat}
                                                        {index <
                                                        selectedCategories.length -
                                                            1
                                                            ? ", "
                                                            : ""}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className={styles.buttonContainer}>
                                    <button
                                        type="button"
                                        className={styles.backButton}
                                        onClick={() => setStep(2)}
                                        disabled={formSubmitting}
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className={styles.nextButton}
                                        disabled={
                                            formSubmitting ||
                                            selectedCategories.length === 0
                                        }
                                    >
                                        {formSubmitting
                                            ? "Saving..."
                                            : "Finish Setup"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </main>
    );
}
