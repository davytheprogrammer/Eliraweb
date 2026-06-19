// src/components/admin/AddSpecialistButtonWrapper.tsx
'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { AddSpecialistModal } from '@/components/admin/AddSpecialistModal';
import { useRouter } from 'next/navigation';

export function AddSpecialistButtonWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold rounded-xl shadow-sm transition-all text-sm shrink-0"
      >
        <Plus className="w-4 h-4" />
        Add New Specialist ➕
      </button>

      <AddSpecialistModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSpecialistAdded={() => {
          router.refresh();
        }}
      />
    </>
  );
}
