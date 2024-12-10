'use client'
import '@rainbow-me/rainbowkit/styles.css';
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  Typography,
  Container,
  IconButton,
  createTheme,
  AppBar,
  Toolbar
} from '@mui/material'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import InputSection from '@/components/InputSection'
import DecodedSection from '@/components/DecodedSection'
import SimulationSection from '@/components/SimulationSection'
import MenuIcon from '@mui/icons-material/Menu'
import chain_infos from '@/config/chain_infos.json';  // 直接导入 JSON 数据
import { ChainInfo } from '@/types';
import { Providers } from '@/providers/Providers';
// 为导入的 JSON 数据添加类型
// 为导入的 JSON 数据添加类型并排序
const chains: ChainInfo[] = chain_infos.chains.sort((a, b) => {
  // BitLayer (200901) 排在第一位
  if (a.chain_id === 200901) return -1;
  if (b.chain_id === 200901) return 1;
  // 其他按 chain_id 升序排列
  return a.chain_id - b.chain_id;
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
  },
});

export default function Home() {
  return (
    <>
      <Providers>
        <CustomAppBar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <InputSection chains={chains} />
          <Box sx={{ my: 4 }}>
            <DecodedSection />
          </Box>
          <Box sx={{ my: 4 }}>
            <SimulationSection chains={chains} />
          </Box>
        </Container>
      </Providers>
    </>
  )
}

function CustomAppBar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            多链交易参数检查与结果模拟
          </Typography>
        </Box>
        <ConnectButton />
      </Toolbar>
    </AppBar>
  )
}
