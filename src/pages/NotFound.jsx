import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                textAlign: 'center',
                px: 2,
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontWeight: 900,
                    fontSize: { xs: '6rem', md: '10rem' },
                    color: '#105e43',
                    lineHeight: 1,
                    opacity: 0.2
                }}
            >
                404
            </Typography>
            <Typography variant="h6" fontWeight={800} sx={{ mt: 2, mb: 1, color: '#111827' }}>
                Halaman Tidak Ditemukan
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 360 }}>
                Halaman yang Anda cari mungkin telah dihapus atau URL salah.
            </Typography>
            <Button
                variant="contained"
                onClick={() => navigate('/')}
                sx={{
                    px: 4,
                    py: 1.2,
                    borderRadius: '12px',
                    bgcolor: '#105e43',
                    '&:hover': { bgcolor: '#0c4a35' }
                }}
            >
                Kembali ke Beranda
            </Button>
        </Box>
    );
};

export default NotFound;
