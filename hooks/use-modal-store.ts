//@ts-ignore
import { create } from "zustand";

export type ModalType = "createServer";

interface ModalStore{
    type: ModalType | null;
    isOpen: boolean;
    onOpen: (type: ModalType) => void;
    onClose: () => void
}

export const useModal = create<ModalStore>((set: (arg0: { isOpen: boolean; type: any; }) => any) => ({
    type: null,
    isOpen: false,
    onOpen: (type: any) => set({ isOpen: true, type }),
    onClose: () => set({ type: null, isOpen: false })
}));