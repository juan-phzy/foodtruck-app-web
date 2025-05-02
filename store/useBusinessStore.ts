import { create } from "zustand";
import { useEffect } from "react";
import { useAuth, } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Business } from "@/types";

type BusinessStore = {
    business: Business | null;
    isLoading: boolean;
    setBusiness: (business: any) => void;
    setLoading: (loading: boolean) => void;
};

export const useBusinessStore = create<BusinessStore>((set) => ({
    business: null,
    isLoading: true,
    setBusiness: (business) => {
        set({ business });
    },
    setLoading: (isLoading) => set({ isLoading }),
}));

export const useInitVendorBusiness = () => {
    const { userId } = useAuth();
    const { setBusiness, setLoading } = useBusinessStore();

    const convexBusiness = useQuery(
        api.businesses.getBusinessByVendor,
        userId ? { vendor_clerk_id: userId } : "skip"
    );
    
    useEffect(() => {
        if (!userId) return;

        setLoading(true);

        if (convexBusiness !== undefined) {
            if (convexBusiness) {
                setBusiness(convexBusiness);
            } else {
                console.warn("No public user profile found in Convex");
            }
            setLoading(false);
        }
    }, [userId, convexBusiness]);
};
