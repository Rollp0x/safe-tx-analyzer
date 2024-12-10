
import instance from './axios'; // 我们配置的 axios 实例
import axios from 'axios';       // 原生 axios
import { TraceRequest, SafeTraceRequest, TraceResponse, SignedSafeTx } from '@/types';

export const api = {
  // 交易追踪
  trace: (request: TraceRequest) =>
    instance.post<TraceResponse>('/trace', request),

  // Safe交易追踪
  traceSafe: (request: SafeTraceRequest) =>
    instance.post<TraceResponse>('/trace/safe', request),

  // Safe 交易提交
  proposeSafeTx: (safeAddress: string, signedTx: SignedSafeTx) => 
    axios.post<void>('/api/safe/propose', { safeAddress, signedTx }),
};
  