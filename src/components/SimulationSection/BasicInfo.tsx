import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CreateIcon from '@mui/icons-material/Create';
import { SignedSafeTx, TraceResponse, TraceInfo, TransactionStatus, ExecutionStatus } from '../../types';
import { useWallet } from '../../providers/WalletContext';
import { useSnackbar } from '../../providers/SnackbarContext';
import { useAccount } from 'wagmi';
import { api } from '../../services/api';import CallHierarchy from './CallHierarchy';

interface BasicInfoProps {
  result: TraceResponse | null;
  traceResult: TraceInfo | null;
}

function BasicInfo({ result, traceResult }: BasicInfoProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { showSuccess, showError } = useSnackbar();
  const { requestSignature } = useWallet();
  // 获取当前连接的钱包地址
  const { address, isConnected } = useAccount();

  const toggleCallHierarchy = () => {
    setDialogOpen((old) => !old);
  };


  const handleSignTransaction = async () => {
    if (!result?.safe_info) return;

    // 检查钱包是否已连接
    if (!isConnected || !address) {
      showError('请先连接钱包');
      return;
    }

    // 检查签名者是否在signers列表中
    if (!result.safe_info.signers.map(s => s.toLowerCase()).includes(address.toLowerCase())) {
      showError('您不是签名者，无法签名');
      return;
    }

    // 检查是否已经签名过
    const hasAlreadySigned = result.safe_info.confirmations.some(
      confirmation => confirmation.signer.toLowerCase() === address.toLowerCase()
    );

    if (hasAlreadySigned) {
      showError('当前地址已经签名过该交易');
      return;
    }

    try {
      const signature = await requestSignature({
        safeAddress: result.safe_info.safe_address,
        safeTxHash: result.safe_info.tx_id,
        safeTx: result.safe_info.safe_tx
      });
      let new_signatures = result.safe_info.confirmations.concat([{
        signer: address,
        signature: signature
      }]).sort((a, b) => a.signer.localeCompare(b.signer));
      let signatures = new_signatures.map(s => s.signature).join(',');
      // 我们需要构造一个 SignedSafeTx 对象
      const signedSafeTx: SignedSafeTx = {
        ...result.safe_info.safe_tx,
        safe: result.safe_info.safe_address,
        signature: signatures,
        sender: address,
        safeTxHash: result.safe_info.tx_id
      };
      try {
        await api.proposeSafeTx(result.safe_info.safe_address, signedSafeTx);
        showSuccess('交易签名并提交成功');
      }catch (err) {
        showError('交易签名提交失败:' + err);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Transaction hash verification failed') {
          showError('交易数据验证失败，请检查交易信息');
        } else if (error.message.includes('switch to BitLayer')) {
          showError('请切换到 BitLayer 网络后再试');
        } else if (error.message.includes('No ethereum wallet found')) {
          showError('请先安装并连接钱包');
        } else {
          showError('签名失败：' + error.message);
        }
      } else {
        showError('签名失败：未知错误');
      }
    }
  };
  const status_flag = result?.safe_info?.status?.toUpperCase() === 'PENDING' || result?.safe_info?.status?.toUpperCase() === 'CANCELED';
  const threshold_flag = (result?.safe_info?.confirmations?.length ?? 0) < (result?.safe_info?.confirmations_required ?? 0);
  const vailid =  threshold_flag && status_flag; //todo 这里是测试用，真实情况是pending中。
  
  
  
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ mr: 2 }}>
          模拟交易结果
        </Typography>
        { (!result || !result.trace_info) ? (
          <Typography color="text.secondary">
            未进行模拟交易
          </Typography>
        ) : (
          <>
            <Typography 
              color={getStatusColor(result.trace_info.status)} 
              sx={{ mr: 1 }}
            >
              {getExecutionStatusText(result.trace_info.status,result.trace_info.error_message)}
            </Typography>
          </>
        )}
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {result?.safe_info?.status && (
          <Button
            variant="outlined"
            startIcon={<CreateIcon />}
            onClick={handleSignTransaction}
            size="small"
            color="warning"
            disabled={!vailid}
            sx={{ mr: 2 }}
          >
            签名交易
          </Button>
        )} 

        {result?.trace_info && (
          <Button
            variant="outlined"
            startIcon={<AccountTreeIcon />}
            onClick={toggleCallHierarchy}
            size="small"
          >
            显示调用层级
          </Button>
        )}
      </Box>
      <CallHierarchy
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        error_trace_address={result?.trace_info?.error_trace_address}
        traceResult={traceResult}
      />
    </Box>
  );
}

export default BasicInfo;

// 获取状态颜色
const getStatusColor = (status: ExecutionStatus) => {
  return ("Success" in status) ? 'success.main' : 'error.main';
};

// 获取状态文本
const getExecutionStatusText = (status: ExecutionStatus,error_message: string| undefined | null) => {
  let prefix = ("Success" in status) ? "模拟交易执行成功." : "模拟交易执行失败.";
  if (error_message) {
    prefix += ` 初始错误信息: ${formatErrorMessage(error_message)}`;
  }
  return prefix;
};

// 格式化错误信息
const formatErrorMessage = (error: string) => {
  if (error.startsWith('0x')) {
    // 如果是16进制字符串，只显示前10位
    return `${error.slice(0, 10)}...`;
  }
  return error;
};