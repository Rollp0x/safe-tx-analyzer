'use client'
import '@rainbow-me/rainbowkit/styles.css';
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Container,
  IconButton,
  InputAdornment,
  AppBar,
  Toolbar
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useAuth } from '@/providers/AuthContext'
import { useSnackbar } from '@/providers/SnackbarContext'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import InputSection from '@/components/InputSection'
import DecodedSection from '@/components/DecodedSection'
import SimulationSection from '@/components/SimulationSection'
import MenuIcon from '@mui/icons-material/Menu'

interface LoginForm {
  username: string
  password: string
}

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { showError, showSuccess } = useSnackbar()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    try {
      await login(data.username, data.password)
      showSuccess('登录成功')
    } catch (error: any) {

      showError(error.response?.data?.message || '登录失败,请检查用户名和密码')
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h5" component="h1" gutterBottom textAlign="center">
            登录
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="用户名"
            margin="normal"
            error={Boolean(errors.username)}
            helperText={errors.username?.message}
            {...register('username', {
              required: '用户名是必填项',
              minLength: {
                value: 3,
                message: '用户名至少需要3个字符'
              },
              maxLength: {
                value: 20,
                message: '用户名不能超过20个字符'
              },
              pattern: {
                value: /^[a-zA-Z0-9_-]+$/,
                message: '用户名只能包含字母、数字、下划线和横线'
              }
            })}
          />
            
            <TextField
              fullWidth
              label="密码"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              {...register('password', {
                required: '密码是必填项',
                minLength: {
                  value: 6,
                  message: '密码长度至少为6个字符',
                },
              })}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? '登录中...' : '登录'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  )
}

export default function Home() {
  const { token } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 在客户端渲染之前返回一个加载状态或空内容
  if (!mounted) {
    return null // 或者返回一个加载指示器
  }

  if (!token) {
    return <LoginForm />
  }

  return (
    <>
      <CustomAppBar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <InputSection />
        <Box sx={{ my: 4 }}>
          <DecodedSection />
        </Box>
        <Box sx={{ my: 4 }}>
          <SimulationSection />
        </Box>
      </Container>
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
            Safe交易参数检查与结果模拟
          </Typography>
        </Box>
        <ConnectButton />
      </Toolbar>
    </AppBar>
  )
}
