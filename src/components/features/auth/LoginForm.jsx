import { useState } from 'react';
import { Box, TextField, Button, Alert, InputAdornment, IconButton, Typography, Chip } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { validateEmail } from '../../../utils/helpers';

const LoginForm = ({ onSubmit, loading, error }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email harus diisi';
        else if (!validateEmail(formData.email)) newErrors.email = 'Format email tidak valid';
        if (!formData.password) newErrors.password = 'Password harus diisi';
        else if (formData.password.length < 6) newErrors.password = 'Password minimal 6 karakter';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) onSubmit(formData);
    };

    const inputSx = {
        '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            '& fieldset': { borderColor: 'divider' },
            '&:hover fieldset': { borderColor: '#5e548e' },
            '&.Mui-focused fieldset': { borderColor: '#5e548e' },
        },
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            {error && (
                <Alert severity="error" sx={{ mb: 2.5, borderRadius: 3, fontSize: '0.83rem' }}>
                    {error}
                </Alert>
            )}

            <TextField
                fullWidth
                name="email"
                label="Email"
                placeholder="contoh@email.com"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
                size="small"
                sx={inputSx}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start"><EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment>
                    ),
                }}
            />

            <TextField
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                margin="normal"
                size="small"
                sx={inputSx}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start"><LockIcon sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                                {showPassword ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                    mt: 3,
                    py: 1.3,
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #5e548e 0%, #7c6fbd 100%)',
                    '&:hover': { background: 'linear-gradient(135deg, #4a4275 0%, #6b5faa 100%)' },
                }}
            >
                {loading ? 'Memproses...' : 'Masuk'}
            </Button>

            <Box sx={{ mt: 3, p: 2, borderRadius: 3, bgcolor: 'rgba(0,201,167,0.06)', border: '1px solid rgba(0,201,167,0.12)' }}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: '#00c9a7', display: 'block', mb: 0.5 }}>
                    🔑 Demo Credentials
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.72rem' }}>
                    john@example.com / password123
                </Typography>
            </Box>
        </Box>
    );
};

export default LoginForm;
