import { create } from "zustand";

interface directionRowStore {
  opened: Record<string, boolean>;
  setOpen: (id: string, isOpen: boolean) => void;
  isOpen: (id: string) => boolean;
}

export const useDirectionRowStore = create<directionRowStore>((set, get) => ({
  opened: {},
  setOpen: (id, isOpen) => {
    set((state) => ({
      opened: {
        ...state.opened,
        [id]: isOpen,
      },
    }));
  },
  isOpen: (id: string) => {
    return get().opened[id];
  },
}));
