import { create } from "zustand";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { VendorProfile } from "@/types";

type VendorStore = {
    currentVendor: VendorProfile | null;
    isLoading: boolean;
    setProfile: (profile: VendorProfile) => void;
    setLoading: (loading: boolean) => void;
};

export const useVendorStore = create<VendorStore>((set) => ({
    currentVendor: null,
    isLoading: true,
    setProfile: (currentVendor) => {
        set({ currentVendor });
    },
    setLoading: (isLoading) => set({ isLoading }),
}));

export const useInitVendorProfile = () => {
    const { user } = useUser();
    const { setProfile, setLoading } = useVendorStore();

    const convexVendor = useQuery(
        api.vendors.getUserByClerkId,
        user ? { clerkId: user.id } : "skip"
    );

    useEffect(() => {
        if (!user) return;

        setLoading(true);

        if (convexVendor !== undefined) {
            if (convexVendor) {
                setProfile(convexVendor);
            } else {
                console.warn("No vendor profile found in Convex");
            }
            setLoading(false);
        }
    }, [user, convexVendor]);
};
