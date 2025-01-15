
import { Paper, Box, Stack } from '@mui/material';
import { useMemo } from 'react';
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
  const currentChainId = 200901;
  // 使用 useMemo 缓存处理后的数据
  const processedTraceResult = useMemo(() => {
    const chainInfo = chain_infos.chains.find(chain => chain.chain_id === currentChainId);
    if (!result?.trace_info || !chainInfo) {
      return null;
    }

    try {
      // const processedTokenInfo = Object.entries(result.trace_info.token_infos ?? {}).reduce(
      //   (acc, [address, info]) => ({
      //     ...acc,
      //     [address.toLowerCase()]: info
      //   }),
      //   {} as Record<string, TokenInfo>
      // );
      const {
        asset_transfers,
        token_infos
      } = processTokenTransfers(result.trace_info, chainInfo)
      
      const processedTransfers = asset_transfers.map((transfer: TokenTransfer) => ({
          ...transfer,
          token: transfer.token.toLowerCase(),
          from: transfer.from.toLowerCase(),
          to: transfer.to?.toLowerCase() || "合约创建失败",
        }));
      return {
        ...result.trace_info,
        token_infos,
        asset_transfers: processedTransfers,
      };
    } catch (error) {
      console.error('Error processing trace result:', error);
      return null;
    }
  }, [result?.trace_info, currentChainId, chain_infos]); // 只有这些依赖项变化时才重新计算

  if (!processedTraceResult) {
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
            <LogsTable logs={processedTraceResult.logs || []} />
          </Box>
        </Paper>
      </Stack>

      
    </>
  );
}

export default SimulationSection;

