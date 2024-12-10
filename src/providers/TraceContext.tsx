import React, { createContext, useContext, useState } from 'react';
import { TraceResponse, TraceRequestType, SignedSafeTx } from '../types';
import { api } from '../services/api';
import { mockApi } from '../services/mockApi';
import { AxiosResponse } from 'axios';

interface TraceContextType {
  result: TraceResponse | null;
  currentChainId: number | null;
  trace: (request: TraceRequestType) => Promise<void>;
  proposeSafeTx: (safeAddress: string, signedSafeTx: SignedSafeTx) => Promise<void>;
  reset: () => void;
}

const TraceContext = createContext<TraceContextType | null>(null);

export function TraceProvider({ children }: { children: React.ReactNode }) {
  const [result, setResult] = useState<TraceResponse | null>(null);
  const [currentChainId, setCurrentChainId] = useState<number | null>(null);

  const trace = async (request: TraceRequestType) => {
    try {
      if (request.type === 'general') {
        setCurrentChainId(request.data.chain_id);
        const response = await api.trace(request.data);
        setResult((response as unknown as AxiosResponse<TraceResponse>).data);
      } else {
        setCurrentChainId(200901);
        const response = await api.traceSafe(request.data);
        setResult((response as unknown as AxiosResponse<TraceResponse>).data);
      }
    } catch (error) {
      setResult(null);
      throw error;
    }
  };

  const proposeSafeTx = async (safeAddress: string, signedSafeTx: SignedSafeTx) => {
    const response = await api.proposeSafeTx(safeAddress, signedSafeTx);
    return response.data;
  };

  return (
    <TraceContext.Provider value={{
      result,
      currentChainId,
      trace,
      proposeSafeTx,
      reset: () => {
        setResult(null);
        setCurrentChainId(null);
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