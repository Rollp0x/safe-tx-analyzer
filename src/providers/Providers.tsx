'use client'

import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/config/wagmi'
import { ThemeProvider, createTheme } from '@mui/material'
import { SnackbarProvider } from './SnackbarContext'
import { TraceProvider } from './TraceContext'
import { WalletProvider } from './WalletContext'
import { AuthProvider } from './AuthContext'

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

if (!projectId) {
  throw new Error('NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID is not defined')
}


const queryClient = new QueryClient()

const theme = createTheme()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <ThemeProvider theme={theme}>
              <SnackbarProvider>
                <TraceProvider>
                  <WalletProvider>
                    {children}
                  </WalletProvider>
                </TraceProvider>
              </SnackbarProvider>
            </ThemeProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </AuthProvider>
  )
} 