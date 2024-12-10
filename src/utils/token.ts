import { TokenTransfer, ChainInfo, TraceInfo} from '@/types';

export function processTokenTransfers(traceResult: TraceInfo, chainInfo: ChainInfo): TraceInfo {
    // 过滤掉 value 为 0 的转账记录
    const processedTransfers = [...traceResult.asset_transfers].filter(transfer => transfer.value !== '0x0');
    const tokenInfos = { ...traceResult.token_infos };
    const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
    
    // 预先处理 chain_info 中的地址为小写
    const wrapTokenAddress = chainInfo.wrap_token?.toLowerCase();
    
    // 从后向前遍历，方便插入新的记录
    for (let i = processedTransfers.length - 1; i >= 0; i--) {
        const transfer = processedTransfers[i];
        
        // 检查是否是向 wrap token 转移原生代币
        if (
            transfer.token === ZERO_ADDRESS && 
            wrapTokenAddress && 
            transfer.to === wrapTokenAddress  // 不需要再转换小写了
        ) {
            // 创建对应的 wrapped token 转移记录
            const wrappedTokenTransfer: TokenTransfer = {
                token: wrapTokenAddress,  // 已经是小写了
                from: wrapTokenAddress,   // 已经是小写了
                to: transfer.from,        // transfer.from 已经是小写的
                value: transfer.value
            };
            
            // 在当前位置后插入新记录
            processedTransfers.splice(i + 1, 0, wrappedTokenTransfer);
            
            // 如果 token_info 中没有 wrap token 的信息，添加它
            if (!tokenInfos[wrapTokenAddress] && chainInfo.wrap_token_symbol) {
                tokenInfos[wrapTokenAddress] = {
                    symbol: chainInfo.wrap_token_symbol,
                    decimals: chainInfo.decimals
                };
            }
        }
    }
    
    return {
        ...traceResult,
        asset_transfers: processedTransfers,
        token_infos: tokenInfos
    };
}