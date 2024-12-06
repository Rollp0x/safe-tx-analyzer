'use client';

import React, { createContext, useContext, useState } from 'react';
import { TraceResponse, TraceRequestType } from '../types';
import { api } from '../services/api';
import { mockApi } from '../services/mockApi';
import { AxiosResponse } from 'axios';

interface TraceContextType {
  result: TraceResponse | null;
  trace: (request: TraceRequestType) => Promise<void>;
  reset: () => void;
}

const TraceContext = createContext<TraceContextType | null>(null);

export function TraceProvider({ children }: { children: React.ReactNode }) {
  const [result, setResult] = useState<TraceResponse | null>(null);

  const trace = async (request: TraceRequestType) => {
    try {
       const response = await mockApi.traceSafe(request.data);
       setResult((response as unknown as AxiosResponse<TraceResponse>).data);
    } catch (error) {
      setResult(null);
      throw error;
    }
  };

  return (
    <TraceContext.Provider value={{
      result,
      trace,
      reset: () => {
        setResult(null);
      }
    }}>
      {children}
    </TraceContext.Provider>
  );
}

export function useTrace() {
  const context = useContext(TraceContext);
  if (!context) {
    throw new Error('useTrace must be used within a TraceProvider');
  }
  return context;
} 