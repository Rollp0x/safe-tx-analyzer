import safeTrace from '@/config/trace_safe.json';
import { 
  TraceResponse, 
  TraceRequest, 
  SafeTraceRequest, 
  ApiResponse, 
  SignedSafeTx
} from '@/types';
import { AxiosResponse } from 'axios';


export const mockApi = {
  
  trace: (request: TraceRequest): Promise<ApiResponse<TraceResponse>> => {
    return Promise.resolve(safeTrace as ApiResponse<TraceResponse>);
  },

  traceSafe: (request: SafeTraceRequest): Promise<ApiResponse<TraceResponse>> => {
    return Promise.resolve(safeTrace as ApiResponse<TraceResponse>);
  },

  // Safe 交易提交
  proposeSafeTx: (safeAddress: string, signedSafeTx: SignedSafeTx): Promise<AxiosResponse<void>> => 
    Promise.resolve({} as AxiosResponse<void>),
}; 
