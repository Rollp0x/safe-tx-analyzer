import instance from './axios'; // 我们配置的 axios 实例
import { SafeTraceRequest,TraceResponse,LoginRequest, LoginResponse, SignedSafeTx } from '../types';

const safe_url = process.env.NEXT_PUBLIC_BITLAYER_SAFE_URL

if (!safe_url) {
  throw new Error('NEXT_PUBLIC_BITLAYER_SAFE_URL is not defined')
}


interface PublicKeyResponse {
  public_key: string
}

export const api = {
  // 获取公钥
  getPublicKey: () => 
    instance.get<PublicKeyResponse>('/auth/public-key'),
  // 登录
  login: (request: LoginRequest) =>
    instance.post<LoginResponse>('/user/login', request),

  // Safe交易追踪
  traceSafe: (request: SafeTraceRequest) =>
    instance.post<TraceResponse>('/trace/safe', request),
  
  // Safe 交易提交
  proposeSafeTx: (safeAddress: string, signedTx: SignedSafeTx) => 
    instance.post<void>(`${safe_url}/${safeAddress}/propose`, signedTx),

};
  