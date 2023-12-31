//@ts-ignore
import { Server, ChannelType, Channel } from "@prisma/client"
//@ts-ignore
import { create } from "zustand";

export type ModalType = "createServer" | "invite" | "editServer" | "members" | "createChannel" | "leaveServer" | "deleteServer" | "deleteChannel" | "editChannel" | "messageFile" | "deleteMessage";

interface ModalData {
    server?: Server;
    channelType?: ChannelType;
    channel?: Channel;
    apiUrl?: string;
    query?: Record<string, any>;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void
}

export const useModal = create<ModalStore>((set: any) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type: ModalType, data = {}) => set({ isOpen: true, type, data } as ModalStore),
    onClose: () => set({ type: null, isOpen: false })
}));
