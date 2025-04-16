'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ApiResponse } from '@/utils/types';

interface StateContextType {
  response: ApiResponse | null;
  loading: boolean;
  setResponse: (data: ApiResponse | null) => void;
  setLoading: (loading: boolean) => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export function StateProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage if available
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // Load state from localStorage on initial mount
  useEffect(() => {
    try {
      const savedResponse = localStorage.getItem('vibefusion_response');
      if (savedResponse) {
        setResponse(JSON.parse(savedResponse));
      }
    } catch (error) {
      console.error('Error loading state from localStorage:', error);
    }
  }, []);

  // Save response to localStorage whenever it changes
  useEffect(() => {
    if (response) {
      localStorage.setItem('vibefusion_response', JSON.stringify(response));
    }
  }, [response]);

  return (
    <StateContext.Provider
      value={{
        response,
        loading,
        setResponse,
        setLoading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a StateProvider');
  }
  return context;
}
