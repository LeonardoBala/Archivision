'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type FormData = {
  inputType: string;
  projectName: string;
  roomName: string;
  roomType: string;
  style: string;
  colorPalette: string;
  uploadedImages: string[]; 
};

type CreateContextType = {
  formData: FormData;
  setFormData: (data: FormData) => void;
  updateData: (key: keyof FormData, value: any) => void; 
};

const CreateContext = createContext<CreateContextType | undefined>(undefined);

export function CreateProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>({
    inputType: '',
    projectName: '',
    roomName: '',
    roomType: '',
    style: '',
    colorPalette: '',
    // INIZIALIZZA COME ARRAY VUOTO
    uploadedImages: [], 
  });

  const updateData = (key: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <CreateContext.Provider value={{ formData, setFormData, updateData }}>
      {children}
    </CreateContext.Provider>
  );
}

export function useCreate() {
  const context = useContext(CreateContext);
  if (!context) throw new Error('useCreate must be used within a CreateProvider');
  return context;
}