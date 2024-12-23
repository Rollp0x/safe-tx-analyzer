
import instance from './axios'; // 我们配置的 axios 实例
import { TraceRequest, SafeTraceRequest, TraceResponse, SignedSafeTx } from '@/types';

export const api = {
  // 交易追踪
  trace: (request: TraceRequest) =>
    instance.post<TraceResponse>('/api/decode/internal/trace', request),

  // Safe交易追踪
  traceSafe: (request: SafeTraceRequest) =>
    instance.post<TraceResponse>('/api/decode/internal/trace/safe', request),

  // Safe 交易提交
  proposeSafeTx: (safeAddress: string, signedTx: SignedSafeTx) => {
    let url = `/safe/${safeAddress}/propose`;
    instance.post<void>(url, signedTx);
  },
};
  