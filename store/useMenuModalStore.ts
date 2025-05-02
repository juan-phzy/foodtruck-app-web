import { create } from "zustand";

interface ModalState {
    showMenuModal: boolean;
    toggleMenuModal: () => void;
}

const useMenuModalStore = create<ModalState>((set) => ({
    showMenuModal: false,

    // Toggle function: Opens if closed, closes if open
    toggleMenuModal: () => set((state) => ({ showMenuModal: !state.showMenuModal })),
}));

export default useMenuModalStore;
