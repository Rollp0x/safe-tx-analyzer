import { Paper, Box, Typography } from '@mui/material';
import { useTrace } from '../../providers/TraceContext';
import CodeBlock from '../common/CodeBlock';
import { SafeInfo, FormattedTransaction } from '../../types';

function DecodedSection() {
  const { result } = useTrace();
  if (!result) return null;

  // 获取状态的颜色
  // 获取 Safe 交易状态的颜色
  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'SUCCESS':
        return '<span class="positive">SUCCESS</span>';
      case 'FAILED':
        return '<span class="negative">FAILED</span>';
      case 'PENDING':
        return '<span class="warning">PENDING</span>';
      default:
        return status;
    }
  };

  // 格式化交易信息
  const formatTransaction = (tx: FormattedTransaction, index: number) => {
    const { basic_info, transaction_info, function_call } = tx;

    // 格式化交易类型和内容
    let transactionDetails = '';
    if (transaction_info.type === 'Transfer') {
      transactionDetails = `Transfer ${transaction_info.content.value}`;
    } else if (transaction_info.type === 'ContractCreation') {
      transactionDetails = `Contract Creation${
        transaction_info.content.contract_name ? ` (${transaction_info.content.contract_name})` : ''
      }`;
    } else if (transaction_info.type === 'ContractCall') {
      transactionDetails = `Contract Call to ${
        transaction_info.content.contract_name || transaction_info.content.contract_address
      }${transaction_info.content.is_self_call ? ' (Self Call)' : ''}`;
    }

    // 格式化函数调用信息
    const functionDetails = function_call ? `
Function: ${function_call.name}${function_call.description ? ` (${function_call.description})` : ''}
Parameters:${function_call.parameters.map(param => `
  • ${param.name}${param.description ? ` (${param.description})` : ''}
    Value: ${param.display_value}
    Type:  ${param.param_type.split('(')[0]}${
      param.token_info ? `
    Token: ${param.token_info.symbol} (${param.token_info.value})` : ''
    }`).join('')}` : '';

    return `
# Transaction ${index}
----------------------------------------------------
From:   ${basic_info.from}
To:     ${basic_info.to || 'N/A'}${basic_info.to_name ? ` (${basic_info.to_name})` : ''}
Value:  ${basic_info.value}
Type:   ${transactionDetails}${functionDetails}`;
  };

  // 格式化 Safe 交易信息
  const formatSafeInfo = (safeInfo: SafeInfo) => `
# Safe Transaction Info
----------------------------------------------------
Safe Address:     ${safeInfo.safe_address}
Transaction ID:   ${safeInfo.tx_id}
Transaction Hash: ${safeInfo.tx_hash}
Nonce:           ${safeInfo.nonce}
Proposer:        ${safeInfo.proposer}
Executor:        ${safeInfo.executor}
Signatures:      ${safeInfo.confirmations.length} of ${safeInfo.confirmations_required}
Status:          ${getStatusColor(safeInfo.status)}
Block Number:    ${safeInfo.block_number}`;

  const content = `${
    result.safe_info ? formatSafeInfo(result.safe_info) + '\n\n' : ''
  }${
    result.decoded_info.map((tx, index) => formatTransaction(tx, index + 1)).join('\n\n')
  }`;

  return (
    <Paper elevation={2}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          交易参数解析结果
        </Typography>
        <CodeBlock 
          value={content}
        />
      </Box>
    </Paper>
  );
}

export default DecodedSection;
