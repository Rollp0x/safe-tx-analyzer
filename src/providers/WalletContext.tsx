'use client';

import { createContext, useContext, ReactNode ,useCallback} from 'react';
import { SafeTx } from '../types';
import { ethers } from 'ethers';
import { useChainId } from 'wagmi';

interface WalletContextType {
  requestSignature: (params: {
    safeAddress: string;
    safeTxHash: string;
    safeTx: SafeTx;
  }) => Promise<string>;
}

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const chainId = useChainId();

  const requestSignature = useCallback(async (params: {
    safeAddress: string;
    safeTxHash: string;
    safeTx: SafeTx;
  }) => {
    // 2. 请求签名
    if (!window.ethereum) {
      throw new Error('No ethereum wallet found');
    }
    // 检查链ID
    const expectedChainId = 200901;
    if (chainId !== expectedChainId) {
      throw new Error(`Please switch to BitLayer network (Chain ID: ${expectedChainId})`);
    }
    // EIP-712 domain
    const domain = {
      chainId: expectedChainId,
      verifyingContract: params.safeAddress
    };

    // Types definition for EIP-712
    const types = {
      SafeTx: [
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'data', type: 'bytes' },
        { name: 'operation', type: 'uint8' },
        { name: 'safeTxGas', type: 'uint256' },
        { name: 'baseGas', type: 'uint256' },
        { name: 'gasPrice', type: 'uint256' },
        { name: 'gasToken', type: 'address' },
        { name: 'refundReceiver', type: 'address' },
        { name: 'nonce', type: 'uint256' }
      ]
    };

    // 使用 TypedDataEncoder 计算哈希
    const calculatedHash = ethers.TypedDataEncoder.hash(
      domain,
      types,
      params.safeTx
    );
    // 验证哈希是否匹配
    if (calculatedHash !== params.safeTxHash) {
      throw new Error('Transaction hash verification failed');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    try {
      // 使用 EIP-712 签名,签名之前先转成bytes
      const signature = await signer.signTypedData(domain, types, params.safeTx);
      return signature;
    } catch (error) {
      console.error('Signing failed:', error);
      throw error;
    }
  }, [chainId]);

  return (
    <WalletContext.Provider value={{ requestSignature }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
} 