import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { formatCurrency } from '../../../utils/helpers';
import { useAuth } from '../../../hooks/useAuth';

const CartSummary = ({ totalItems, totalPrice, onCheckout, loading }) => {
    const { user } = useAuth();
    const balance = typeof user?.balance === 'number' ? user.balance : 0;
    const isInsufficient = balance < totalPrice;

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: '24px',
                border: '1px solid #f3f4f6',
                position: 'sticky',
                top: 24,
                bgcolor: '#ffffff'
            }}
        >
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                Ringkasan Order
            </Typography>

            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" color="text.secondary">Item ({totalItems})</Typography>
                    <Typography variant="body2" fontWeight={600}>{formatCurrency(totalPrice)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" color="text.secondary">Diskon</Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ color: '#105e43' }}>-Rp 0</Typography>
                </Box>
                <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight={700}>Total Bayar</Typography>
                    <Typography variant="h5" fontWeight={800} sx={{ color: '#111827' }}>{formatCurrency(totalPrice)}</Typography>
                </Box>
            </Box>

            <Box sx={{ p: 2, bgcolor: '#f9fafb', borderRadius: '16px', mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">Saldo Tersedia</Typography>
                    <Typography variant="caption" fontWeight={700} sx={{ color: isInsufficient ? '#ef4444' : '#105e43' }}>
                        {isInsufficient ? 'Kurang' : 'Cukup'}
                    </Typography>
                </Box>
                <Typography variant="subtitle2" fontWeight={700}>{formatCurrency(balance)}</Typography>
            </Box>

            <Button
                fullWidth
                variant="contained"
                size="large"
                disabled={isInsufficient || loading || totalItems === 0}
                endIcon={<ArrowForwardIcon />}
                onClick={onCheckout}
                sx={{
                    py: 1.5,
                    borderRadius: '16px',
                    bgcolor: '#105e43',
                    boxShadow: '0 8px 20px -5px rgba(16, 94, 67, 0.4)',
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': { bgcolor: '#0c4a35', boxShadow: '0 10px 25px -5px rgba(16, 94, 67, 0.5)' }
                }}
            >
                {loading ? 'Proses...' : 'Bayar Sekarang'}
            </Button>
        </Paper>
    );
};

export default CartSummary;
