// store/useUserLocationStore.tsx

import { create } from "zustand";
import * as Location from "expo-location";
import { Coordinates } from "@/types";

type LocationState = {
    userLocation: Coordinates | null;
    setLocation: (coords: Coordinates) => void;
    fetchUserLocation: () => Promise<void>;
};

const useUserLocationStore = create<LocationState>((set) => ({
    userLocation: null,
    setLocation: (coords) => set({ userLocation: coords }),
    fetchUserLocation: async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log("Status: ", status);
        if (status !== "granted") {
            console.warn("Permission denied");
            return;
        }

        try {
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            set({
                userLocation: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                },
            });
        } catch (error) {
            console.error("Error fetching user location:", error);
        }
    },
}));

export default useUserLocationStore;
