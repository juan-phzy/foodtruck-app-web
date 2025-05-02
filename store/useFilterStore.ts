import { create } from "zustand";

/**
 * Zustand Store for managing category filters and modal state.
 *
 * This store is used to:
 * - Store selected category filters for filtering food trucks.
 * - Manage the visibility of the category selection modal.
 * - Provide actions to update category selections and modal state.
 */

interface FilterStore {
    categoryFilters: string[];
    showCategoryModal: boolean;
    setCategoryFilters: (filters: string[]) => void;
    updateCategories: (category: string) => void;
    clearCategoryFilters: () => void;
    toggleCategoryModal: () => void;
}

const useFilterStore = create<FilterStore>((set) => ({
    categoryFilters: [],
    showCategoryModal: false,

    setCategoryFilters: (filters) => set({ categoryFilters: filters }),
    updateCategories: (category) =>
        set((state) => ({
            categoryFilters: state.categoryFilters.includes(category)
                ? state.categoryFilters.filter((c) => c !== category)
                : [...state.categoryFilters, category],
        })),
    clearCategoryFilters: () => set({ categoryFilters: [] }),
    toggleCategoryModal: () => set((state)=>({showCategoryModal: !state.showCategoryModal})),
}));

export default useFilterStore;
