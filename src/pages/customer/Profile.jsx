import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    TextField,
    Button,
    Avatar,
    InputAdornment,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SaveIcon from '@mui/icons-material/Save';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import { formatCurrency } from '../../utils/helpers';
import { validatePhone } from '../../utils/helpers';
import { useSnackbar } from 'notistack';

const Profile = () => {
    const { user, refreshUser } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({ name: '', phone: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) setFormData({ name: user.name || '', phone: user.phone || '' });
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Nama harus diisi';
        if (formData.phone && !validatePhone(formData.phone)) newErrors.phone = 'Format nomor HP tidak valid';
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        setLoading(true);
        try {
            await authService.updateUser(user.id, formData);
            await refreshUser();
            enqueueSnackbar('Profil berhasil diperbarui', { variant: 'success' });
        } catch (err) {
            enqueueSnackbar('Gagal memperbarui profil', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.5px' }}>Profil Pengguna</Typography>
                <Typography variant="body2" color="text.secondary">Kelola informasi akun Anda</Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} lg={4}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            borderRadius: '24px',
                            border: '1px solid #f3f4f6',
                            textAlign: 'center',
                            bgcolor: '#ffffff'
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 100,
                                height: 100,
                                mx: 'auto',
                                fontSize: 32,
                                fontWeight: 800,
                                bgcolor: '#ecfdf5',
                                color: '#105e43',
                                mb: 2
                            }}
                        >
                            {user?.name?.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="h6" fontWeight={800}>{user?.name}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{user?.email}</Typography>

                        <Box
                            sx={{
                                p: 2.5,
                                borderRadius: '16px',
                                bgcolor: '#105e43',
                                color: '#fff',
                                mb: 1
                            }}
                        >
                            <Typography variant="caption" sx={{ opacity: 0.8 }}>Saldo Tersedia</Typography>
                            <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.5px' }}>
                                {formatCurrency(typeof user?.balance === 'number' ? user.balance : 0)}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={8}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            borderRadius: '24px',
                            border: '1px solid #f3f4f6',
                            height: '100%'
                        }}
                    >
                        <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>Edit Profil</Typography>

                        <Box component="form" onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" fontWeight={700} sx={{ color: '#374151', mb: 1, display: 'block' }}>Nama Lengkap</Typography>
                                    <TextField
                                        fullWidth name="name" value={formData.name} onChange={handleChange}
                                        error={!!errors.name} helperText={errors.name} size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" fontWeight={700} sx={{ color: '#374151', mb: 1, display: 'block' }}>Email</Typography>
                                    <TextField
                                        fullWidth value={user?.email || ''} size="small" disabled
                                        InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon fontSize="small" /></InputAdornment> }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption" fontWeight={700} sx={{ color: '#374151', mb: 1, display: 'block' }}>Nomor HP</Typography>
                                    <TextField
                                        fullWidth name="phone" value={formData.phone} onChange={handleChange}
                                        error={!!errors.phone} helperText={errors.phone} size="small"
                                        InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon fontSize="small" /></InputAdornment> }}
                                    />
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={<SaveIcon />}
                                disabled={loading}
                                sx={{
                                    mt: 4,
                                    px: 4,
                                    py: 1.2,
                                    borderRadius: '12px',
                                    bgcolor: '#105e43',
                                    '&:hover': { bgcolor: '#0c4a35' }
                                }}
                            >
                                {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;
