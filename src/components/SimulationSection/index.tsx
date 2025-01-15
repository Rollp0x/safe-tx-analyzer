
import { Paper, Box, Stack } from '@mui/material';

import BasicInfo from './BasicInfo';
import BalanceChangesWithTable from './BalanceChangesWithTable';
import FlowGraph from './FlowGraph';
import { useTrace } from '@/providers/TraceContext';
import { processTokenTransfers } from '@/utils/token';
import LogsTable from './LogsTable'  // 新增
import { TokenTransfer, TokenInfo, TraceInfo } from '@/types';
import chain_infos from '@/config/chain_infos.json'

function SimulationSection() {
  
  const { result } = useTrace();

  const chainInfo = chain_infos.chains.find(chain => chain.chain_id === 200901);
  if (!result?.trace_info || !chainInfo) {
    return null;
  }

  // 直接处理数据
  let processedTraceResult: TraceInfo;
  try {
    const {token_infos, asset_transfers} = processTokenTransfers(result.trace_info, chainInfo);
    
    const processedTransfers = asset_transfers.map((transfer: TokenTransfer) => ({
        ...transfer,
        token: transfer.token.toLowerCase(),
        from: transfer.from.toLowerCase(),
        to: transfer.to?.toLowerCase() || "合约创建失败",
      }));

    processedTraceResult = {
      ...result?.trace_info,
      token_infos,
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
            <LogsTable logs={result.trace_info.logs || []} />
          </Box>
        </Paper>
      </Stack>

      
    </>
  );
}

export default SimulationSection;

