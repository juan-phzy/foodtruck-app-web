// store/useVendorOnboardingStore.ts
import { create } from "zustand";

type VendorOnboardingData = {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    primary_city?: string;
    dob?: string;
    business_name?: string;
    business_id?: string;
    instagram_link?: string;
    twitter_link?: string;
    facebook_link?: string;
    website?: string;
    business_primary_city?: string;
    description?: string;
    business_phone_number?: string;
    business_email?: string;
    categories?: string[];
};

type VendorOnboardingStore = {
    data: Partial<VendorOnboardingData>;
    updateField: (field: keyof VendorOnboardingData, value: string | string[]) => void;
    reset: () => void;
};

export const useVendorOnboardingStore = create<VendorOnboardingStore>(
    (set) => ({
        data: {},
        updateField: (field, value) =>
            set((state) => ({
                data: {
                    ...state.data,
                    [field]: value,
                },
            })),
        reset: () => set({ data: {} }),
    })
);
