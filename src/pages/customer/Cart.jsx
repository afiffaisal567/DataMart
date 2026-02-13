import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    InputAdornment,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import CartItem from '../../components/features/cart/CartItem';
import CartSummary from '../../components/features/cart/CartSummary';
import EmptyState from '../../components/common/EmptyState';
import { useAuth } from '../../hooks/useAuth';
import { transactionService } from '../../services/transactionService';
import { productService } from '../../services/productService';
import { authService } from '../../services/authService';
import { validatePhone } from '../../utils/helpers';
import { useSnackbar } from 'notistack';

const Cart = ({ cartItems, onUpdateQuantity, onRemove, onClearCart, totalItems, totalPrice }) => {
    const { user, refreshUser } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user?.phone) setPhoneNumber(user.phone);
    }, [user?.phone]);

    const handleCheckout = async () => {
        if (!validatePhone(phoneNumber)) {
            setPhoneError('Format nomor HP tidak valid');
            return;
        }
        setPhoneError('');
        setLoading(true);

        try {
            const currentBalance = typeof user.balance === 'number' ? user.balance : 0;

            for (const item of cartItems) {
                const currentStock = typeof item.stock === 'number' ? item.stock : 0;

                await transactionService.create({
                    userId: user.id,
                    productId: item.productId,
                    productName: item.name,
                    provider: item.provider,
                    quota: item.quota,
                    quantity: item.quantity,
                    totalPrice: item.price * item.quantity,
                    phoneNumber,
                    status: 'success',
                    paymentMethod: 'saldo',
                    createdAt: new Date().toISOString(),
                });

                await productService.updateStock(item.productId, currentStock - item.quantity);
            }

            const newBalance = currentBalance - totalPrice;
            await authService.updateBalance(user.id, newBalance);

            await refreshUser();
            onClearCart();
            setCheckoutOpen(false);
            enqueueSnackbar('Checkout berhasil! Paket data akan segera aktif.', { variant: 'success' });
        } catch (err) {
            enqueueSnackbar('Checkout gagal. Silakan coba lagi.', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    if (totalItems === 0) {
        return (
            <Box>
                <Typography variant="h4" fontWeight={800} sx={{ mb: 3, letterSpacing: '-0.5px' }}>
                    Keranjang
                </Typography>
                <EmptyState
                    title="Keranjang Kosong"
                    subtitle="Belum ada produk di keranjang Anda"
                    actionLabel="Belanja Sekarang"
                    actionPath="/products"
                />
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.5px' }}>
                    Keranjang Belanja
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {totalItems} item di keranjang Anda
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.productId}
                            item={item}
                            onUpdateQuantity={onUpdateQuantity}
                            onRemove={onRemove}
                        />
                    ))}
                </Grid>

                <Grid item xs={12} lg={4}>
                    <CartSummary
                        totalItems={totalItems}
                        totalPrice={totalPrice}
                        onCheckout={() => setCheckoutOpen(true)}
                        loading={loading}
                    />
                </Grid>
            </Grid>

            <Dialog
                open={checkoutOpen}
                onClose={() => !loading && setCheckoutOpen(false)}
                maxWidth="xs"
                fullWidth
                PaperProps={{ sx: { borderRadius: '24px', p: 1 } }}
            >
                <DialogTitle sx={{ fontWeight: 800 }}>Konfirmasi Checkout</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Masukkan nomor HP tujuan pengisian paket data
                    </Typography>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Nomor HP Tujuan"
                        placeholder="08xxxxxxxxxx"
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            setPhoneError('');
                        }}
                        error={!!phoneError}
                        helperText={phoneError}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button
                        onClick={() => setCheckoutOpen(false)}
                        disabled={loading}
                        sx={{ borderRadius: '12px', fontWeight: 600, color: '#6b7280' }}
                    >
                        Batal
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleCheckout}
                        disabled={loading}
                        sx={{
                            borderRadius: '12px',
                            fontWeight: 600,
                            px: 3,
                            bgcolor: '#105e43',
                            '&:hover': { bgcolor: '#0c4a35' },
                        }}
                    >
                        {loading ? 'Memproses...' : 'Bayar Sekarang'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Cart;
