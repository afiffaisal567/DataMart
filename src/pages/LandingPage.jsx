import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Container,
    Grid,
    Paper,
    Avatar,
    AvatarGroup,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    IconButton,
} from '@mui/material';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import WifiIcon from '@mui/icons-material/Wifi';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SecurityIcon from '@mui/icons-material/Security';

const features = [
    { icon: <WifiIcon />, title: 'Multi Provider', desc: 'Telkomsel, XL, Indosat, Tri & Smartfren' },
    { icon: <SpeedIcon />, title: 'Proses Instan', desc: 'Kuota aktif dalam hitungan detik' },
    { icon: <SupportAgentIcon />, title: 'Support 24/7', desc: 'Layanan bantuan kapan saja' },
    { icon: <SecurityIcon />, title: 'Transaksi Aman', desc: 'Pembayaran terenkripsi & terjamin' },
];

const LandingPage = () => {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', color: '#111827', overflowX: 'hidden' }}>
            <Box
                component="header"
                sx={{
                    py: 2,
                    px: { xs: 2, md: 6 },
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    bgcolor: 'rgba(255,255,255,0.97)',
                    backdropFilter: 'blur(8px)',
                    borderBottom: '1px solid #f3f4f6',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ p: 0.8, borderRadius: '10px', bgcolor: '#105e43', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <SignalCellularAltIcon fontSize="small" />
                    </Box>
                    <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: '-0.3px' }}>
                        DataMart.
                    </Typography>
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1.5 }}>
                    <Button onClick={() => navigate('/login')} sx={{ color: '#374151', fontWeight: 600, borderRadius: '10px', px: 2.5 }}>
                        Masuk
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/register')}
                        sx={{ bgcolor: '#105e43', borderRadius: '50px', px: 3.5, py: 1, '&:hover': { bgcolor: '#0c4a35' } }}
                    >
                        Daftar Gratis
                    </Button>
                </Box>

                <IconButton onClick={() => setMobileOpen(true)} sx={{ display: { xs: 'flex', md: 'none' }, color: '#111827' }}>
                    <MenuIcon />
                </IconButton>
            </Box>

            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                PaperProps={{ sx: { width: 260, borderRadius: '16px 0 0 16px' } }}
            >
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={() => setMobileOpen(false)}><CloseIcon /></IconButton>
                </Box>
                <List sx={{ px: 2 }}>
                    <ListItemButton onClick={() => { navigate('/login'); setMobileOpen(false); }} sx={{ borderRadius: '12px', mb: 1 }}>
                        <ListItemText primary="Masuk" primaryTypographyProps={{ fontWeight: 600 }} />
                    </ListItemButton>
                    <ListItemButton
                        onClick={() => { navigate('/register'); setMobileOpen(false); }}
                        sx={{ borderRadius: '12px', bgcolor: '#105e43', color: '#fff', '&:hover': { bgcolor: '#0c4a35' } }}
                    >
                        <ListItemText primary="Daftar Gratis" primaryTypographyProps={{ fontWeight: 600 }} />
                    </ListItemButton>
                </List>
            </Drawer>

            <Container maxWidth="lg" sx={{ pt: { xs: 5, md: 10 }, pb: { xs: 6, md: 12 } }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            <Box sx={{ display: 'inline-block', px: 2, py: 0.5, bgcolor: '#ecfdf5', color: '#105e43', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, mb: 2.5 }}>
                                Termurah & Tercepat
                            </Box>

                            <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' }, fontWeight: 800, lineHeight: 1.15, mb: 2.5, letterSpacing: '-1px' }}>
                                Paket Data Murah{' '}
                                <Box component="span" sx={{ color: '#105e43' }}>Tanpa Ribet.</Box>
                            </Typography>

                            <Typography variant="body1" sx={{ color: '#6b7280', fontSize: { xs: '0.9rem', md: '1.05rem' }, lineHeight: 1.7, mb: 3.5, maxWidth: 460, mx: { xs: 'auto', md: 0 } }}>
                                Top up kuota internet semua operator dalam hitungan detik. Harga agen, proses otomatis 24 jam.
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 1.5, justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap' }}>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate('/register')}
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{ bgcolor: '#105e43', borderRadius: '12px', px: 3, py: 1.2, '&:hover': { bgcolor: '#0c4a35' } }}
                                >
                                    Mulai Sekarang
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate('/login')}
                                    sx={{ borderColor: '#e5e7eb', color: '#374151', borderRadius: '12px', px: 3, py: 1.2, '&:hover': { borderColor: '#d1d5db', bgcolor: '#f9fafb' } }}
                                >
                                    Lihat Demo
                                </Button>
                            </Box>

                            <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                <AvatarGroup max={3}>
                                    <Avatar sx={{ width: 28, height: 28, bgcolor: '#105e43', fontSize: '0.65rem' }}>JD</Avatar>
                                    <Avatar sx={{ width: 28, height: 28, bgcolor: '#059669', fontSize: '0.65rem' }}>AS</Avatar>
                                    <Avatar sx={{ width: 28, height: 28, bgcolor: '#34d399', fontSize: '0.65rem' }}>MK</Avatar>
                                </AvatarGroup>
                                <Typography variant="caption" fontWeight={600} color="text.secondary">10k+ Transaksi Sukses</Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box sx={{ position: 'relative', width: '100%', maxWidth: { xs: 340, sm: 380 }, mx: 'auto' }}>
                            <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', bgcolor: '#f9fafb', border: '1px solid #e5e7eb', position: 'relative', zIndex: 1 }}>
                                <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 2 }}>Status Transaksi</Typography>
                                {[
                                    { name: 'Telkomsel 10GB', time: '12:30 WIB' },
                                    { name: 'XL 5GB', time: '11:45 WIB' },
                                    { name: 'Indosat 15GB', time: '10:20 WIB' },
                                ].map((item, i) => (
                                    <Box
                                        key={i}
                                        sx={{ bgcolor: '#fff', p: 1.5, borderRadius: '12px', mb: 1, display: 'flex', alignItems: 'center', gap: 1.5, border: '1px solid #f3f4f6' }}
                                    >
                                        <CheckCircleIcon sx={{ color: '#105e43', fontSize: 20 }} />
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="body2" fontWeight={700}>{item.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">Sukses &bull; {item.time}</Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Paper>
                            <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', top: -25, right: -25, width: 120, height: 120, borderRadius: '50%', bgcolor: '#d1fae5', zIndex: 0 }} />
                            <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', bottom: -15, left: -15, width: 80, height: 80, borderRadius: '50%', bgcolor: '#ecfdf5', zIndex: 0 }} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, md: 5 },
                        borderRadius: '24px',
                        bgcolor: '#105e43',
                        color: '#fff',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <Typography variant="h5" fontWeight={800} sx={{ mb: 1.5, position: 'relative', zIndex: 1 }}>
                        Siap Mulai?
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.85, mb: 3, maxWidth: 360, mx: 'auto', position: 'relative', zIndex: 1 }}>
                        Daftar gratis dan nikmati promo paket data spesial untuk pengguna baru.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/register')}
                        sx={{ bgcolor: '#fff', color: '#105e43', fontWeight: 700, borderRadius: '12px', px: 4, py: 1.2, position: 'relative', zIndex: 1, '&:hover': { bgcolor: '#f0fdf4' } }}
                    >
                        Daftar Gratis
                    </Button>
                    <Box sx={{ position: 'absolute', top: -60, right: -60, width: 160, height: 160, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.06)' }} />
                    <Box sx={{ position: 'absolute', bottom: -40, left: -40, width: 120, height: 120, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.04)' }} />
                </Paper>
            </Container>

            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: { xs: 2, md: 6 },
                    borderTop: '1px solid #f3f4f6',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ p: 0.4, borderRadius: '6px', bgcolor: '#105e43', color: '#fff', display: 'flex' }}>
                        <SignalCellularAltIcon sx={{ fontSize: 14 }} />
                    </Box>
                    <Typography variant="body2" fontWeight={700}>
                        Data<span style={{ color: '#105e43' }}>Mart</span>
                    </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                    &copy; {new Date().getFullYear()} DataMart. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default LandingPage;
