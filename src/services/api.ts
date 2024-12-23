import instance from './axios'; // 我们配置的 axios 实例
import { SafeTraceRequest,TraceResponse,LoginRequest, LoginResponse, SignedSafeTx } from '../types';

export const api = {
  // 登录
  login: (request: LoginRequest) =>
    instance.post<LoginResponse>('/api/decode/external/login', request),

  // Safe交易追踪
  traceSafe: (request: SafeTraceRequest) =>
    instance.post<TraceResponse>('/api/decode/external/auth/trace/safe', request),
  
  // Safe 交易提交
  proposeSafeTx: (safeAddress: string, signedTx: SignedSafeTx) => 
    instance.post<void>(`/safe/${safeAddress}/propose`, signedTx),

};
  