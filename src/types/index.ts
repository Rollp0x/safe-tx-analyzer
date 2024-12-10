// 链信息
export interface ChainInfo {
  name: string;
  chain_id: number;
  symbol: string;
  decimals: number;
  rpc_url: string;
  multi_send_call_only: string;
  wrap_token: string;
  wrap_token_symbol: string;
  // explorer_url: string | null;
}

// 普通交易请求
export interface TraceRequest {
  chain_id: number;
  from: string;
  to?: string | null;
  value?: string | null;
  data?: string | null;
  operation: 0 | 1 | 2; // 0=call, 1=delegatecall, 2=create 
  block_number?: number | null;
  is_trace: boolean;
}

// 签名信息
export interface ConfirmationInfo {
  signer: string;
  signature: string;
}

// Safe交易请求
export interface SafeTraceRequest {
  tx_url: string;
}


interface BlockEnv {
  number: number;
  timestamp: number;
}

// API响应
export interface ApiResponse<T> {
  code: number;
  data: T;
}

export interface TokenTransfer {
  token: string;   // Address
  from: string;    // Address
  to?: string | null;      // Address
  value: string;   // U256
}


// Safe交易的信息,字段采用String是为了方便前端UI展示
export interface SafeInfo {
  safe_address: string;
  tx_id: string;            // Safe交易id,是交易内容hash后的结果
  tx_hash?: string | null;   // 这里的tx_hash是Safe交易hash
  nonce: number;
  value: string;
  proposer: string;
  executor?: string | null;
  confirmations: ConfirmationInfo[];
  signers: string[];
  status: string;
  confirmations_required: number;
  block_number?: number | null; // 执行区块高度
  safe_tx: SafeTx;
}
  

// 日志结构
export interface Log {
  address: string;     // Address -> string
  topics: string[];    // Vec<B256> -> string[]
  data: string;        // Bytes -> string
}

// 交易状态
export type TransactionStatus = 
  | "Success"
  | "PartialSuccess"
  | { Failed: { error: string; origin_error?: string | null } };




// 基础类型
export interface TokenInfo {
  symbol: string;
  decimals: number;
}
  
export type CreateScheme = 
  | "Create"                              // 无绑定值，直接是字符串
  | { Create2: { salt: string } };        // 有绑定值，是对象

// 修改为
export type CallScheme = 
  | 'Call'
  | 'CallCode'
  | 'DelegateCall'
  | 'StaticCall'
  | 'ExtCall'
  | 'ExtStaticCall'
  | 'ExtDelegateCall';

export interface Gas {
  limit: number;
  remaining: number;
  refunded: number;
}

// 合约调用状态
export type CallStatus = 
  | "Success"
  | { Revert: string }
  | { Halt: string }
  | "FatalError"
  | "InProgress";

export interface CallTrace {
  from: string;
  to: string;
  value: string;
  input: string;
  call_scheme?: CallScheme | null;
  create_scheme?: CreateScheme | null;
  gas_used: string;
  output: string;
  status: CallStatus;
  error_origin: boolean;
  subtraces: CallTrace[];
  trace_address: number[];
}

// 请求类型
export interface TraceRequestType {
  data: SafeTraceRequest 
};


// 执行失败的类型
export type FailureKind = 
  | { PreExecution: string }
  | { Revert: string }
  | { Halt: string };

// 交易执行状态,只有成功和失败两个状态
export type ExecutionStatus = 
  | {
      Success: {
        gas_used: number;
        gas_refunded: number;
        output: {
          Call: string;
        } | {
          Create: [string, string | null];  // 对应 Create(Bytes, Option<Address>)
        };
      }
    }
  | {
      Failed: {
        types: string;
        gas_used: number;
        output?: string | null;
      }
    };

  // Token 信息
export interface TokenInfoParam {
  address: string;
  symbol: string;
  decimals: number;
  value: string;  // 格式化后的值
}

// 参数信息
export interface Parameter {
  name: string;
  description: string;
  display_value: string;
  param_type: string;
  token_info?: TokenInfoParam | null;
}

// 函数调用信息
export interface FunctionCall {
  name: string;
  description?: string | null;
  parameters: Parameter[];
}

// 基本信息
export interface BasicInfo {
  from: string;
  to?: string | null;
  to_name?: string | null;
  value: string;
  symbol: string;
}

// 交易类型信息 注意这里后台使用了tag和content来修改json的key
export type TransactionInfo =
  | {
      type: 'Transfer';
      content: {
        value: string;
        symbol: string;
      };
    }
  | {
      type: 'ContractCreation';
      content: {
        contract_name?: string | null;
      };
    }
  | {
      type: 'ContractCall';
      content: {
        contract_address: string;
        contract_name?: string | null;
        is_self_call: boolean;
      };
    };

// 格式化后的交易信息
export interface FormattedTransaction {
  basic_info: BasicInfo;
  transaction_info: TransactionInfo;
  function_call?: FunctionCall | null;
}


// 追踪信息
export interface TraceInfo {
  block_number: number;
  token_infos?: Record<string, TokenInfo>;
  asset_transfers: TokenTransfer[];
  call_traces: CallTrace[];
  logs: Log[];
  status: ExecutionStatus;
  error_trace_address?: number[] | null;
  error_message?: string | null;
}
  
// 统一的追踪响应类型
export interface TraceResponse {
  safe_info?: SafeInfo | null;
  trace_info?: TraceInfo | null;
  decoded_info: FormattedTransaction[];
}

export interface SafeTx {
  to: string;
  value: string;
  data: string;
  operation: number;
  safeTxGas: string;
  baseGas: string;
  gasPrice: string;
  gasToken: string;
  refundReceiver: string;
  nonce: string;
}

// 签名后的准备提交的交易
export interface SignedSafeTx {
  safe: string;
  to: string;
  value: string;
  data: string;
  operation: number;
  safeTxGas: string;
  baseGas: string;
  gasPrice: string;
  gasToken: string;
  refundReceiver: string;
  nonce: string;
  signature: string;
  sender: string;
  safeTxHash: string;
}

// 定义用户登录的请求和响应
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string
}