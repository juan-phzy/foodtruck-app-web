import { create } from "zustand";
import { Trucks } from "@/types";
import { Id } from "@/convex/_generated/dataModel";

interface TruckStore {
    selectedTruckId: Id<"trucks"> | null;
    selectedTruck: Trucks | null;
    persistedTrucks: Trucks[];
    showTruckModal: boolean;
    setSelectedTruckId: (id: Id<"trucks"> | null) => void;
    clearSelectedTruck: () => void;
    nextTruck: () => void;
    previousTruck: () => void;
    setPersistedTrucks: (newTrucks: Trucks[]) => void;
    toggleTruckModal: () => void;
    reset: () => void;
}

const useTruckStore = create<TruckStore>((set, get) => ({
    selectedTruckId: null,
    selectedTruck: null,
    persistedTrucks: [],
    showTruckModal: false,

    toggleTruckModal: () =>
        set((state) => ({ showTruckModal: !state.showTruckModal })),

    setPersistedTrucks: (newTrucks) => {
        set((state) => {
            const ids = new Set(state.persistedTrucks.map((t) => t._id));
            const trucksToAdd = newTrucks.filter((t) => !ids.has(t._id));
            return {
                persistedTrucks: [...state.persistedTrucks, ...trucksToAdd],
            };
        });
    },

    setSelectedTruckId: (id) => {
        if (!id) {
            set({ selectedTruckId: null, selectedTruck: null });
            return;
        }

        const { persistedTrucks, selectedTruckId } = get();

        if (id === selectedTruckId) {
            set({ selectedTruckId: null, selectedTruck: null });
            return;
        }
        const truck = persistedTrucks.find((t) => t._id === id) || null;

        set({ selectedTruckId: id, selectedTruck: truck });
    },

    clearSelectedTruck: () =>
        set({ selectedTruckId: null, selectedTruck: null }),

    nextTruck: () => {
        const { selectedTruckId, persistedTrucks } = get();
        if (!selectedTruckId || persistedTrucks.length === 0) return;

        const currentIndex = persistedTrucks.findIndex(
            (t) => t._id === selectedTruckId
        );
        if (currentIndex === -1) return;

        const nextIndex = (currentIndex + 1) % persistedTrucks.length;
        const nextTruck = persistedTrucks[nextIndex];

        set({ selectedTruckId: nextTruck._id, selectedTruck: nextTruck });
    },

    previousTruck: () => {
        const { selectedTruckId, persistedTrucks } = get();
        if (!selectedTruckId || persistedTrucks.length === 0) return;

        const currentIndex = persistedTrucks.findIndex(
            (t) => t._id === selectedTruckId
        );
        if (currentIndex === -1) return;

        const prevIndex =
            (currentIndex - 1 + persistedTrucks.length) %
            persistedTrucks.length;
        const prevTruck = persistedTrucks[prevIndex];

        set({ selectedTruckId: prevTruck._id, selectedTruck: prevTruck });
    },

    reset: () => {
        set({
            selectedTruckId: null,
            selectedTruck: null,
            persistedTrucks: [],
            showTruckModal: false,
        });
    }
}));

export default useTruckStore;
