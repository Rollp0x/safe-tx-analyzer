'use client'
import '@rainbow-me/rainbowkit/styles.css';
import { useState } from 'react'
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
  email: string
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
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    try {
      await login(data.email, data.password)
      showSuccess('登录成功')
    } catch (error: any) {
      showError(error.response?.data?.message || '登录失败，请检查邮箱和密码')
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
              label="邮箱"
              margin="normal"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              {...register('email', {
                required: '邮箱是必填项',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '请输入有效的电子邮件地址',
                },
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

  // 如果没有 token，显示登录表单
  // if (!token) {
  //   return <LoginForm />
  // }

  // 有 token，显示主页内容
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
