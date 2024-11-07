import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProfileState {
  name: string;
  email: string;
  walletAddress: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setWalletAddress: (walletAddress: string) => void;
  profileExists: (walletAddress: string) => boolean;
}

const log = (config) => (set, get, api) =>
  config(
    (args) => {
      console.log('Applying', args);
      set(args);
      console.log('New state', get());
    },
    get,
    api
  );

export const useProfileStore = create<ProfileState>()(
  log(
    persist(
      (set, get) => ({
        name: '',
        email: '',
        walletAddress: '',
        setName: (name) => set(() => ({ name })),
        setEmail: (email) => set(() => ({ email })),
        setWalletAddress: (walletAddress) => set(() => ({ walletAddress })),
        profileExists: (walletAddress) => get().walletAddress === walletAddress,
      }),
      {
        name: 'profile-storage', // unique name for localStorage
      }
    )
  )
);