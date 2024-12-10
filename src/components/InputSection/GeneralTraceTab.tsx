import { useState } from 'react';
import { 
  TextField, 
  MenuItem, 
  Switch, 
  FormControlLabel,
  Button,
  Stack,
  CircularProgress
} from '@mui/material';
import { ChainInfo } from '@/types';
import { useTrace } from '@/providers/TraceContext';
import { useSnackbar } from '@/providers/SnackbarContext';

function GeneralTraceTab({ chains }: { chains: ChainInfo[] }) {
  const { trace } = useTrace();
  const { showError, showSuccess } = useSnackbar();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    chain_id: '',
    from: '',
    to: '',
    value: '',
    data: '',
    operation: 0 as 0 | 1 | 2,
    is_trace: true,
    block_number: '',
  });

  // 表单验证
  const isValid = () => {
    if (!formData.chain_id || !formData.from) return false;
    // if (formData.is_trace && !formData.block_number) return false;
    if (!/^0x[a-fA-F0-9]{40}$/.test(formData.from)) return false;
    if (formData.to && !/^0x[a-fA-F0-9]{40}$/.test(formData.to)) return false;
    return true;
  };

  // 提交处理函数
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 处理 data 字段
    const data = formData.data && formData.data.toLowerCase() !== '0x' ? formData.data : null;
    if (formData.operation === 2 && formData.to) {
      showError("部署合约时to地址不能为空");
      return;
    }
    if (formData.operation === 2 && !formData.data) {
      showError("部署合约时data不能为空");
      return;
    }
    if (formData.operation !== 2 && !formData.to) {
      showError("普通交易时to地址不能为空");
      return;
    }

    try {
      setLoading(true);
      await trace({
        type: 'general',
        data: {
          chain_id: Number(formData.chain_id),
          from: formData.from,
          to: formData.to || null,
          value: formData.value || null,
          data,  // ���果是 '0x' 或 '0X'，则传 null
          operation: formData.operation,
          block_number: formData.block_number ? Number(formData.block_number) : null,
          is_trace: formData.is_trace,
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
      {/* 链选择 */}
      <TextField
        select
        required
        fullWidth
        label="选择链"
        value={formData.chain_id}
        onChange={(e) => setFormData(prev => ({ ...prev, chain_id: e.target.value }))}
        error={!formData.chain_id}
        helperText={!formData.chain_id ? "请选择链" : ""}
      >
        {chains.map((chain) => (
          <MenuItem key={chain.chain_id} value={chain.chain_id}>
            {chain.name}
          </MenuItem>
        ))}
      </TextField>

      {/* From 地址 */}
      <TextField
        required
        fullWidth
        label="From 地址"
        value={formData.from}
        onChange={(e) => setFormData(prev => ({ ...prev, from: e.target.value }))}
        error={Boolean(formData.from && !/^0x[a-fA-F0-9]{40}$/.test(formData.from))}
        helperText={
          formData.from && !/^0x[a-fA-F0-9]{40}$/.test(formData.from)
            ? "请输入有效的地址"
            : ""
        }
      />

      {/* To 地址 */}
      <TextField
        // required
        fullWidth
        label="To 地址,部署合约时为空"
        value={formData.to}
        onChange={(e) => setFormData(prev => ({ ...prev, to: e.target.value }))}
        error={Boolean(formData.to && !/^0x[a-fA-F0-9]{40}$/.test(formData.to))}
        helperText={
          formData.to && !/^0x[a-fA-F0-9]{40}$/.test(formData.to)
            ? "请输入有效的地址"
            : ""
        }
      />

      {/* Value */}
      <TextField
        fullWidth
        label="Value (可选)"
        value={formData.value}
        onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
        placeholder="输入十进制数值，如: 1000000000000000000 表示 1 ETH"
        helperText="请输入十进制数值，单位为 wei (1 ETH = 1e18 wei)"
      />

      {/* Data */}
      <TextField
        fullWidth
        label="Data (可选)"
        value={formData.data}
        onChange={(e) => setFormData(prev => ({ ...prev, data: e.target.value }))}
        placeholder="0x"
      />

      {/* Operation */}
      <TextField
        select
        required
        fullWidth
        label="调用类型"
        value={formData.operation}
        onChange={(e) => setFormData(prev => ({ ...prev, operation: Number(e.target.value) as 0 | 1 }))}
        helperText={
          "From为合约时,选择DelegateCall时仅支持to地址为MultiCallV2或者MultiSendCallOnly"
        }
      >
        <MenuItem value={0}>Call</MenuItem>
        <MenuItem value={1}>DelegateCall</MenuItem>
        <MenuItem value={2}>Create</MenuItem>
      </TextField>

      {/* 是否追踪 */}
      <FormControlLabel
        control={
          <Switch
            checked={formData.is_trace}
            onChange={(e) => setFormData(prev => ({ ...prev, is_trace: e.target.checked }))}
          />
        }
        label="模拟执行"
      />

      {/* 区块号（仅在 is_trace 为 true 时显示） */}
      {formData.is_trace && (
        <TextField
          fullWidth
          label="区块号"
          type="number"
          value={formData.block_number}
          onChange={(e) => setFormData(prev => ({ ...prev, block_number: e.target.value }))}
          error={!formData.block_number}
          helperText={!formData.block_number ? "普通交易模拟执行时选填,不填默认使用最新区块,Safe交易不用填写,使用最新区块或者交易成功前一个区块" : ""}
        />
      )}

      {/* 提交按钮 */}
      <Button 
        variant="contained" 
        onClick={handleSubmit}
        disabled={loading || !isValid()}
        fullWidth
        startIcon={loading && <CircularProgress size={20} color="inherit" />}
      >
        {loading ? '解析/模拟中 (预计需要30秒)...' : '解析/模拟交易'}
      </Button>
    </Stack>
  );
}

export default GeneralTraceTab;