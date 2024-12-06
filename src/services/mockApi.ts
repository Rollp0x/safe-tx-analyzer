import safeTrace from '@/config/trace_safe.json';
import chainInfos from '@/config/chain_infos.json'
import { 
  ChainInfo, 
  TraceResponse, 
  TraceRequest, 
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
