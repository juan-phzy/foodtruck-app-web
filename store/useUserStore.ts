import { create } from "zustand";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PublicUserProfile } from "@/types";

type UserStore = {
    currentUser: PublicUserProfile | null;
    isLoading: boolean;
    setProfile: (profile: PublicUserProfile) => void;
    setLoading: (loading: boolean) => void;
};

export const useUserStore = create<UserStore>((set) => ({
    currentUser: null,
    isLoading: true,
    setProfile: (currentUser) => {
        set({ currentUser });
    },
    setLoading: (isLoading) => set({ isLoading }),
}));

export const useInitUserProfile = () => {
    const { user } = useUser();
    const { setProfile, setLoading } = useUserStore();

    const convexUser = useQuery(
        api.users.getUserByClerkId,
        user ? { clerkId: user.id } : "skip"
    );
    
    useEffect(() => {
        if (!user) return;

        setLoading(true);

        if (convexUser !== undefined) {
            if (convexUser) {
                setProfile(convexUser);
            } else {
                console.warn("No public user profile found in Convex");
            }
            setLoading(false);
        }
    }, [user, convexUser]);
};
