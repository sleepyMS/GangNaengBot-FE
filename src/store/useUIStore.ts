import { create } from "zustand";

interface UIState {
  // State
  isSidebarOpen: boolean;
  isSettingsModalOpen: boolean;
  isMobile: boolean;
  settingsInitialTab: string | null;

  // Legacy alias (deprecated, use isSettingsModalOpen)
  isProfileModalOpen: boolean;

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openSettingsModal: (initialTab?: string) => void;
  closeSettingsModal: () => void;
  setIsMobile: (isMobile: boolean) => void;
  setSettingsInitialTab: (tab: string | null) => void;

  // Legacy alias (deprecated)
  openProfileModal: () => void;
  closeProfileModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Initial State
  isSidebarOpen: true,
  isSettingsModalOpen: false,
  isProfileModalOpen: false, // Legacy alias
  isMobile: typeof window !== "undefined" ? window.innerWidth < 768 : false,
  settingsInitialTab: null,

  // Actions
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  setSidebarOpen: (open) => set({ isSidebarOpen: open }),

  openSettingsModal: (initialTab) =>
    set({
      isSettingsModalOpen: true,
      isProfileModalOpen: true,
      settingsInitialTab: initialTab || null,
    }),

  closeSettingsModal: () =>
    set({ isSettingsModalOpen: false, isProfileModalOpen: false }),

  setIsMobile: (isMobile) => set({ isMobile, isSidebarOpen: !isMobile }),

  setSettingsInitialTab: (tab) => set({ settingsInitialTab: tab }),

  // Legacy alias (deprecated, use openSettingsModal/closeSettingsModal)
  openProfileModal: () =>
    set({ isSettingsModalOpen: true, isProfileModalOpen: true }),
  closeProfileModal: () =>
    set({ isSettingsModalOpen: false, isProfileModalOpen: false }),
}));
