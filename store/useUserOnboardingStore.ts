// store/useUserOnboardingStore.ts
import { create } from "zustand";

type UserOnboardingData = {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    dob?: string;
    primary_city?: string;
    selectedCategories?: string[];
};

type UserOnboardingStore = {
    data: Partial<UserOnboardingData>;
    updateField: (field: keyof UserOnboardingData, value: string | string[]) => void;
    reset: () => void;
};

export const useUserOnboardingStore = create<UserOnboardingStore>(
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
