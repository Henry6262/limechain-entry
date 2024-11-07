'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProfileStore } from '@/hooks/useProfileStore';

interface ProfileFormProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
}

export default function ProfileForm({ isOpen, onClose, walletAddress }: ProfileFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const setProfileName = useProfileStore((state) => state.setName);
  const setProfileEmail = useProfileStore((state) => state.setEmail);
  const setWalletAddress = useProfileStore((state) => state.setWalletAddress);

  const handleSubmit = () => {
    setProfileName(name);
    setProfileEmail(email);
    setWalletAddress(walletAddress);
    console.log('Profile State:', { name, email, walletAddress });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className="sm:max-w-[425px] bg-[#0D0221] border border-purple-500 text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center text-white mb-4">Create Profile</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input 
                      id="name" 
                      className="pl-10 bg-[#190B33] border-purple-500 text-white" 
                      placeholder="Enter your name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input 
                      id="email" 
                      className="pl-10 bg-[#190B33] border-purple-500 text-white" 
                      placeholder="Enter your email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <Button onClick={handleSubmit} className="w-full bg-[#8A2BE2] hover:bg-[#9A3CF2] text-white">
                  Submit
                </Button>
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}