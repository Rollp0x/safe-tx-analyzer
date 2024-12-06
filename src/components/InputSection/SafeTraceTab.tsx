import { useState } from 'react';
import { 
  TextField, 
  Button,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useTrace } from '../../providers/TraceContext';
import { useSnackbar } from '../../providers/SnackbarContext';

function SafeTraceTab() {
  const { trace } = useTrace();
  const { showError, showSuccess } = useSnackbar();
  const [txUrl, setTxUrl] = useState('');
  const [loading, setLoading] = useState(false);
  // URL 验证
  const isValidUrl = (url: string) => {
    return url.trim().startsWith('https://multisign.bitlayer.org/transactions/tx');
  };

  const handleSubmit = async () => {
    if (!isValidUrl(txUrl)) return;
    setLoading(true);
    try {
      await trace({
        type: 'safe',
        data: {
          tx_url: txUrl.trim()
        }
      });
      showSuccess("交易解析成功");
    } catch (error) {
      showError(error instanceof Error ? error.message : '交易解析请求失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Stack 
        spacing={1}
        sx={{ 
          p: 2,
          bgcolor: 'info.lighter',
          borderRadius: 1,
        }}
      >
        <Typography color="info.main" fontWeight="medium">
          注意：
        </Typography>
        <Typography color="info.main" sx={{ pl: 2 }}>
          • 当前仅支持 BitLayer 链上的 Safe 交易通过 URL 来解析和模拟
        </Typography>
        <Typography color="info.main" sx={{ pl: 2 }}>
          • 其它链上的 Safe 交易请使用普通交易解析模拟
        </Typography>
        <Typography color="info.main" sx={{ pl: 2 }}>
          • 此功能为 BitLayer 链上的 Safe 交易提供便捷入口，可以显示交易详细信息（如：发起人、执行人、签名数等）
        </Typography>
        <Typography color="info.main" sx={{ pl: 2 }}>
          • 当前也提供了签名交易功能，可以签名后提交到 Safe 合约，暂未提供执行交易功能。
        </Typography>
      </Stack>
      <TextField
        required
        fullWidth
        label="Safe 交易 URL"
        value={txUrl}
        onChange={(e) => setTxUrl(e.target.value)}
        placeholder="https://multisign.bitlayer.org/transactions/tx?safe=&id=multisig_..."
        error={Boolean(txUrl.trim() && !isValidUrl(txUrl))}
        helperText={
          txUrl.trim() && !isValidUrl(txUrl)
            ? "请输入有效的 Safe 交易 URL"
            : "请输入Safe 交易的完整 URL"
        }
      />
      <Typography variant="body2" color="text.secondary">
        URL 格式示例:https://multisign.bitlayer.org/transactions/tx/0x...
      </Typography>

      {/* 提交按钮 */}
      <Button 
        variant="contained" 
        onClick={handleSubmit}
        disabled={loading || !txUrl.trim() || !isValidUrl(txUrl)}
        fullWidth
        startIcon={loading && <CircularProgress size={20} color="inherit" />}
      >
        {loading ? '解析中 (预计需要60秒)...' : '解析并模拟交易'}
      </Button>
    </Stack>
  );
}

export default SafeTraceTab;