import { useState } from 'react';
import { Box, TextField, Button, Alert, InputAdornment, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { validateEmail, validatePhone } from '../../../utils/helpers';

const RegisterForm = ({ onSubmit, loading, error }) => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', confirmPassword: '', phone: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Nama harus diisi';
        if (!formData.email) newErrors.email = 'Email harus diisi';
        else if (!validateEmail(formData.email)) newErrors.email = 'Format email tidak valid';
        if (!formData.password) newErrors.password = 'Password harus diisi';
        else if (formData.password.length < 6) newErrors.password = 'Password minimal 6 karakter';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Password tidak cocok';
        if (!formData.phone) newErrors.phone = 'Nomor HP harus diisi';
        else if (!validatePhone(formData.phone)) newErrors.phone = 'Format nomor HP tidak valid';
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
                <Alert severity="error" sx={{ mb: 2, borderRadius: 3, fontSize: '0.83rem' }}>
                    {error}
                </Alert>
            )}

            <TextField
                fullWidth name="name" label="Nama Lengkap" value={formData.name} onChange={handleChange}
                error={!!errors.name} helperText={errors.name} margin="dense" size="small" sx={inputSx}
                InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment> }}
            />

            <TextField
                fullWidth name="email" label="Email" value={formData.email} onChange={handleChange}
                error={!!errors.email} helperText={errors.email} margin="dense" size="small" sx={inputSx}
                InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment> }}
            />

            <TextField
                fullWidth name="password" label="Password" type={showPassword ? 'text' : 'password'}
                value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password}
                margin="dense" size="small" sx={inputSx}
                InputProps={{
                    startAdornment: <InputAdornment position="start"><LockIcon sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment>,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} size="small">
                                {showPassword ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <TextField
                fullWidth name="confirmPassword" label="Konfirmasi Password" type="password"
                value={formData.confirmPassword} onChange={handleChange} error={!!errors.confirmPassword}
                helperText={errors.confirmPassword} margin="dense" size="small" sx={inputSx}
                InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment> }}
            />

            <TextField
                fullWidth name="phone" label="Nomor HP" placeholder="08xxxxxxxxxx" value={formData.phone}
                onChange={handleChange} error={!!errors.phone} helperText={errors.phone} margin="dense" size="small" sx={inputSx}
                InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment> }}
            />

            <Button
                fullWidth type="submit" variant="contained" size="large" disabled={loading}
                sx={{
                    mt: 2.5,
                    py: 1.3,
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #5e548e 0%, #7c6fbd 100%)',
                    '&:hover': { background: 'linear-gradient(135deg, #4a4275 0%, #6b5faa 100%)' },
                }}
            >
                {loading ? 'Memproses...' : 'Daftar Sekarang'}
            </Button>
        </Box>
    );
};

export default RegisterForm;
