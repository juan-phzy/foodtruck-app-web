import { create } from "zustand";
import { Coordinates } from "@/types";

type LocationState = {
  userLocation: Coordinates | null;
  setLocation: (coords: Coordinates) => void;
  fetchUserLocation: () => Promise<void>;
};

export const useUserLocationStore = create<LocationState>((set) => ({
  userLocation: null,

  setLocation: (coords) => {
    set({ userLocation: coords });
  },

  fetchUserLocation: async () => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("User location fetched:", position.coords);
        const coords = {
          latitude: 40.7698219/*position.coords.latitude*/,
          longitude: -73.9825347/*position.coords.longitude*/,
        };
        set({ userLocation: coords });
      },
      (error) => {
        console.error("Error fetching user location:", error.message);
      },
      { enableHighAccuracy: true }
    );
  },
}));
