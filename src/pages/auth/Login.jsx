import { useState } from 'react';
import { Box, TextField, Button, Alert, InputAdornment, IconButton, Typography, Link, Paper } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login, loading } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(formData.email, formData.password);
        if (!res.success) setError(res.message);
        else navigate('/dashboard');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                bgcolor: '#f0f1f3',
                p: 2
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    m: 'auto',
                    display: 'flex',
                    width: '100%',
                    maxWidth: 1000,
                    borderRadius: '32px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                    border: '1px solid #ffffff'
                }}
            >
                <Box
                    sx={{
                        width: '45%',
                        bgcolor: '#105e43',
                        display: { xs: 'none', md: 'flex' },
                        flexDirection: 'column',
                        justifyContent: 'center',
                        p: 6,
                        color: '#fff',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <Box sx={{ position: 'relative', zIndex: 2 }}>
                        <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>DataMart.</Typography>
                        <Typography variant="body1" sx={{ opacity: 0.8, lineHeight: 1.6 }}>
                            Kelola paket data internet Anda lebih mudah, cepat, dan hemat dengan platform dashboard all-in-one kami.
                        </Typography>
                    </Box>

                    <Box sx={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)' }} />
                    <Box sx={{ position: 'absolute', bottom: -50, left: -50, width: 200, height: 200, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)' }} />
                </Box>
                <Box sx={{ flex: 1, p: { xs: 4, md: 8 }, bgcolor: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" fontWeight={800} sx={{ mb: 1, color: '#111827' }}>Selamat Datang!</Typography>
                        <Typography variant="body2" color="text.secondary">Silakan masuk untuk mengakses akun Anda</Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit}>
                        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>{error}</Alert>}

                        <Box sx={{ mb: 2.5 }}>
                            <Typography variant="caption" fontWeight={700} sx={{ color: '#374151', mb: 1, display: 'block' }}>Email</Typography>
                            <TextField
                                fullWidth
                                placeholder="name@example.com"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#f9fafb' } }}
                            />
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            <Typography variant="caption" fontWeight={700} sx={{ color: '#374151', mb: 1, display: 'block' }}>Password</Typography>
                            <TextField
                                fullWidth
                                placeholder="••••••••"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#f9fafb' } }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>

                        <Button
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                py: 1.5,
                                borderRadius: '12px',
                                bgcolor: '#105e43',
                                fontSize: '1rem',
                                textTransform: 'none',
                                mb: 3,
                                '&:hover': { bgcolor: '#0c4a35' }
                            }}
                        >
                            {loading ? 'Memproses...' : 'Masuk Dashboard'}
                        </Button>

                        <Typography variant="body2" align="center" color="text.secondary">
                            Belum punya akun?{' '}
                            <Link component="button" type="button" onClick={() => navigate('/register')} sx={{ color: '#105e43', fontWeight: 700, textDecoration: 'none' }}>
                                Daftar sekarang
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;
