
import { Paper, Box, Stack } from '@mui/material';

import BasicInfo from './BasicInfo';
import BalanceChangesWithTable from './BalanceChangesWithTable';
import FlowGraph from './FlowGraph';
import { useTrace } from '@/providers/TraceContext';
import { processTokenTransfers } from '@/utils/token';
import LogsTable from './LogsTable'  // 新增
import { TokenTransfer, TokenInfo, TraceResult } from '@/types';
import chain_infos from '@/config/chain_infos.json'

function SimulationSection() {
  
  const { result } = useTrace();

  const chainInfo = chain_infos.chains.find(chain => chain.chain_id === 200901);
  if (!result?.trace_info || !chainInfo) {
    return null;
  }

  // 直接处理数据
  let processedTraceResult: TraceResult;
  try {
    const processedTokenInfo = Object.entries(result?.trace_info?.trace_result?.token_infos ?? {}).reduce(
      (acc, [address, info]) => ({
        ...acc,
        [address.toLowerCase()]: info
      }),
      {} as Record<string, TokenInfo>
    );
    
    const processedTransfers = processTokenTransfers(result.trace_info.trace_result, chainInfo)
      .asset_transfers.map((transfer: TokenTransfer) => ({
        ...transfer,
        token: transfer.token.toLowerCase(),
        from: transfer.from.toLowerCase(),
        to: transfer.to?.toLowerCase() || "合约创建失败",
      }));

    processedTraceResult = {
      ...result?.trace_info?.trace_result,
      token_infos: processedTokenInfo,
      asset_transfers: processedTransfers,
    };
  } catch (error) {
    console.error('Error processing trace result:', error);
    return null;
  }

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <BasicInfo 
          traceResult={processedTraceResult}
          result={result} 
        />
      </Box>

      <Stack spacing={2}>
        <Paper elevation={2}>
          <Box sx={{ p: 3 }}>
            <FlowGraph traceResult={processedTraceResult} />
          </Box>
        </Paper>

        <Paper elevation={2}>
          <Box sx={{ p: 3 }}>
            <BalanceChangesWithTable traceResult={processedTraceResult} />
          </Box>
        </Paper>

        {/* 新增日志列表 */}
        <Paper elevation={2}>
          <Box sx={{ p: 3 }}>
            <LogsTable logs={result.trace_info.trace_result.logs || []} />
          </Box>
        </Paper>
      </Stack>

      
    </>
  );
}

export default SimulationSection;

