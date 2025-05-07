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
    data: UserOnboardingData;
    updateField: (field: keyof UserOnboardingData, value: string | string[]) => void;
    reset: () => void;
};

// Initialize all required fields with empty strings
const initialData: UserOnboardingData = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    dob: "",
    primary_city: "",
    selectedCategories: [],
};

export const useUserOnboardingStore = create<UserOnboardingStore>(
    (set) => ({
        data: initialData,
        updateField: (field, value) =>
            set((state) => ({
                data: {
                    ...state.data,
                    [field]: value,
                },
            })),
        reset: () => set({ data: initialData }),
    })
);