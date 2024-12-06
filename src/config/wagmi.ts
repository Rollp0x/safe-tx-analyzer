import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'viem'
const WALLET_CONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

export const bitLayer = {
  id: 200901,
  name: 'BitLayer',
  network: 'bitlayer',
  nativeCurrency: {
    decimals: 18,
    name: 'BTC',
    symbol: 'BTC',
  },
  rpcUrls: {
    public: { http: ['https://rpc.bitlayer.org'] },
    default: { http: ['https://rpc.bitlayer.org'] },
  },
  blockExplorers: {
    default: {
      name: 'BitLayer Explorer',
      url: 'https://scan.bitlayer.org'
    }
  }
} as const

export const config = getDefaultConfig({
  appName: 'Safe TX Analyzer',
  projectId: WALLET_CONNECT_PROJECT_ID as string,
  chains: [bitLayer],
  transports: {
    [bitLayer.id]: http(bitLayer.rpcUrls.default.http[0])
  },
  ssr: true
})