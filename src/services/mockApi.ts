import safeTrace from '@/config/trace_safe.json';
import { 
  TraceResponse,
  SafeTraceRequest, 
  ApiResponse, 
  SignedSafeTx
} from '@/types';


export const mockApi = {
  
  traceSafe: (request: SafeTraceRequest): Promise<ApiResponse<TraceResponse>> => {
    return Promise.resolve(safeTrace as ApiResponse<TraceResponse>);
  },

  proposeSafeTx: (safeAddress: string, signedTx: SignedSafeTx): Promise<ApiResponse<void>> => {
    return Promise.resolve({
      code: 200,
      data: undefined
    });
  }
}; 
