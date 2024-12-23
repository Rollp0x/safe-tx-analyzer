import instance from './axios'; // 我们配置的 axios 实例
import { SafeTraceRequest,TraceResponse,LoginRequest, LoginResponse, SignedSafeTx } from '../types';
import axios from 'axios';
interface ErrorResponse {
  code: number;
  message: string;
}


export const api = {
  // 登录
  login: (request: LoginRequest) =>
    instance.post<LoginResponse>('/api/decode/external/login', request),

  // Safe交易追踪
  traceSafe: (request: SafeTraceRequest) =>
    instance.post<TraceResponse>('/api/decode/external/auth/trace/safe', request),
  
  // Safe 交易提交
  proposeSafeTx: async (safeAddress: string, signedTx: SignedSafeTx) => {
    try {
      const url = `/safe/${safeAddress}/propose`;
      await instance.post(url, signedTx);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data as ErrorResponse;
        throw new Error(errorData.message);
      }
      throw error;
    }
  },
};
  