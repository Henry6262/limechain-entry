import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProfileState {
  name: string;
  email: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      name: '',
      email: '',
      setName: (name) => set(() => ({ name })),
      setEmail: (email) => set(() => ({ email })),
    }),
    {
      name: 'profile-storage', // unique name for localStorage
    }
  )
);