// store/useVendorOnboardingStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Stripe product information
export type SubscriptionPlan = {
    id: string; // 'free_trial' | 'vendor_subscription'
    name: string; // 'Free Trial' | 'Vendor Subscription'
    price: number; // 0.00 | 40.00
    stripePriceId: string; // Stripe price ID from your dashboard
    interval: "month"; // Currently only monthly
    description: string; // Description of the plan
    truckLimit: number | null; // Number of trucks allowed (null for unlimited)
    employeeLimit: number | null; // Number of employees allowed (null for unlimited)
    features: string[]; // List of features included in the plan
};

// Define the vendor onboarding data structure
type VendorOnboardingData = {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    password?: string;

    // Subscription information
    subscriptionPlan?: SubscriptionPlan;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;

    // Business Information
    business_name?: string;
    business_description?: string;
    phone?: string;
    primary_city?: string;
    categories?: string[];
    website?: string;
    instagram_link?: string;
    twitter_link?: string;
    facebook_link?: string;
    business_email?: string;
};

type VendorOnboardingStore = {
    data: Partial<VendorOnboardingData>;
    updateField: <K extends keyof VendorOnboardingData>(
        field: K,
        value: VendorOnboardingData[K]
    ) => void;
    updateMultipleFields: (fields: Partial<VendorOnboardingData>) => void;
    selectPlan: (plan: SubscriptionPlan) => void;
    setStripeIds: (customerId: string, subscriptionId: string) => void;
    reset: () => void;
};

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
    {
        id: "starter",
        name: "Starter",
        price: 15.0,
        stripePriceId: "price_1RMWCmP9lPB3MfUbRuKQs5lG", // Replace with actual ID
        interval: "month",
        description: "Perfect for single truck operations",
        truckLimit: 1,
        employeeLimit: 3,
        features: [
            "Single location", 
            "Basic location tracking", 
            "Standard menu management", 
            "Basic analytics", 
            "Email support", 
            "Up to 3 empoyees",
        ],
    },
    {
        id: "growth",
        name: "Growth",
        price: 35.0,
        stripePriceId: "price_1RMWFdP9lPB3MfUbo2j9ND8l", // Replace with actual ID
        interval: "month",
        description: "Ideal for growing food truck businesses",
        truckLimit: 3,
        employeeLimit: 10,
        features: [
            "Up to 3 locations", 
            "Enhanced map visibility", 
            "Daily analytics reports", 
            "Priority email support", 
            "Up to 10 employees",
        ],
    },
    {
        id: "professional",
        name: "Professional",
        price: 60.0,
        stripePriceId: "price_1RMWHmP9lPB3MfUbbrbSJpwG", // Replace with actual ID
        interval: "month",
        description: "For established multi-truck operations",
        truckLimit: 6,
        employeeLimit: 30,
        features: [
            "Up to 6 locations", 
            "Up to 30 employees", 
            "Premium map placement", 
            "Advanced analytics with insights", 
            "Priority support",
        ],
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: 100.0,
        stripePriceId: "price_1RMWJTP9lPB3MfUbEXayLiVm", 
        interval: "month",
        description: "Unlimited capability for large operations",
        truckLimit: null,
        employeeLimit: null,
        features: [
            "Unlimited locations", 
            "Unlimited employees", 
            "Top map placement", 
            "Advanced reporting",
        ],
    },
];

export const useVendorOnboardingStore = create<VendorOnboardingStore>()(
    persist(
        (set) => ({
            data: {},
            updateField: (field, value) =>
                set((state) => ({
                    data: {
                        ...state.data,
                        [field]: value,
                    },
                })),
            updateMultipleFields: (fields) =>
                set((state) => ({
                    data: {
                        ...state.data,
                        ...fields,
                    },
                })),
            selectPlan: (plan) =>
                set((state) => ({
                    data: {
                        ...state.data,
                        subscriptionPlan: plan,
                    },
                })),
            setStripeIds: (customerId, subscriptionId) =>
                set((state) => ({
                    data: {
                        ...state.data,
                        stripeCustomerId: customerId,
                        stripeSubscriptionId: subscriptionId,
                    },
                })),
            reset: () => set({ data: {} }),
        }),
        {
            name: "vendor-onboarding-storage",
        }
    )
);
