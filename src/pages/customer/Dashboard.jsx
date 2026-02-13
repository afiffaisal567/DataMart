import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Skeleton,
    Avatar,
    Button,
    Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAuth } from '../../hooks/useAuth';
import { formatCurrency } from '../../utils/helpers';
import { transactionService } from '../../services/transactionService';
import { PROVIDER_COLORS } from '../../utils/constants';

const StatCard = ({ icon, label, value, color, bgcolor }) => (
    <Paper
        elevation={0}
        sx={{
            p: 2.5,
            borderRadius: '20px',
            border: '1px solid #f3f4f6',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            height: '100%',
            bgcolor: '#ffffff',
            '&:first-of-type': {
                ml: { xs: 0, lg: 0 }
            },
            '&:last-of-type': {
                mr: { xs: 0, lg: 0 }
            },
        }}
    >
        <Box
            sx={{
                width: 48,
                height: 48,
                borderRadius: '14px',
                bgcolor: bgcolor || '#ecfdf5',
                color: color || '#105e43',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
            }}
        >
            {icon}
        </Box>
        <Box sx={{ minWidth: 0 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
                {label}
            </Typography>
            <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: '-0.5px', lineHeight: 1.2 }} noWrap>
                {value}
            </Typography>
        </Box>
    </Paper>
);

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const txRes = await transactionService.getByUserId(user?.id, 1, 10);
                const data = txRes?.data || txRes || [];
                setTransactions(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (user?.id) fetchData();
    }, [user?.id]);

    const totalTx = transactions.length;
    const totalSpending = transactions.reduce((a, t) => a + (t.totalPrice || 0), 0);
    const balance = typeof user?.balance === 'number' ? user.balance : 0;

    return (
        <Box sx={{
            mx: { xs: -2, sm: 0 },
            px: { xs: 2, sm: 0 }
        }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    flexWrap: 'wrap',
                    gap: 2,
                    mb: 3,
                    pt: { xs: 1, sm: 0 },
                }}
            >
                <Box sx={{
                    flex: '1 1 auto',
                    minWidth: 0,
                    pr: { xs: 1, sm: 0 }
                }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            letterSpacing: '-0.5px',
                            whiteSpace: { xs: 'nowrap', sm: 'normal' },
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        Halo, {user?.name?.split(' ')[0]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: '100%' }}>
                        Kelola transaksi dan paket data Anda.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/products')}
                    sx={{
                        borderRadius: '50px',
                        px: 3,
                        py: 1,
                        bgcolor: '#105e43',
                        flexShrink: 0,
                        alignSelf: { xs: 'flex-start', sm: 'center' },
                        mt: { xs: 0.5, sm: 0 },
                        '&:hover': { bgcolor: '#0c4a35' },
                        whiteSpace: 'nowrap'
                    }}
                >
                    Beli Paket
                </Button>
            </Box>

            <Grid
                container
                spacing={2}
                sx={{
                    mb: 3,
                    mx: { xs: -1, sm: 0 },
                    px: { xs: 1, sm: 0 }
                }}
            >
                {[
                    {
                        icon: <AccountBalanceWalletIcon />,
                        label: "Saldo",
                        value: formatCurrency(balance),
                        color: "#105e43",
                        bgcolor: "#ecfdf5"
                    },
                    {
                        icon: <ReceiptLongIcon />,
                        label: "Total Transaksi",
                        value: totalTx,
                        color: "#3b82f6",
                        bgcolor: "#eff6ff"
                    },
                    {
                        icon: <TrendingUpIcon />,
                        label: "Pengeluaran",
                        value: formatCurrency(totalSpending),
                        color: "#f59e0b",
                        bgcolor: "#fffbeb"
                    },
                    {
                        icon: <ShoppingBagIcon />,
                        label: "Paket Dibeli",
                        value: transactions.reduce((a, t) => a + (t.quantity || 0), 0),
                        color: "#8b5cf6",
                        bgcolor: "#f5f3ff"
                    }
                ].map((stat, index) => (
                    <Grid
                        item
                        xs={6}
                        lg={3}
                        key={index}
                        sx={{
                            pl: index % 2 === 0 ? { xs: 0, sm: 1.25 } : { xs: 1, sm: 1.25 },
                            pr: index % 2 === 1 ? { xs: 0, sm: 1.25 } : { xs: 1, sm: 1.25 },
                            pb: { xs: 1, sm: 0 }
                        }}
                    >
                        {loading ? (
                            <Skeleton variant="rounded" height={90} sx={{ borderRadius: '20px' }} />
                        ) : (
                            <StatCard {...stat} />
                        )}
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3} sx={{ mx: { xs: -2, sm: 0 }, px: { xs: 2, sm: 0 } }}>
                <Grid item xs={12} lg={4}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: '20px',
                            bgcolor: '#105e43',
                            color: '#fff',
                            mb: 3,
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5, position: 'relative', zIndex: 1 }}>
                            Saldo Anda
                        </Typography>
                        <Typography variant="h4" fontWeight={800} sx={{ mb: 2, letterSpacing: '-0.5px', position: 'relative', zIndex: 1 }}>
                            {formatCurrency(balance)}
                        </Typography>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => navigate('/products')}
                            sx={{
                                bgcolor: '#fff',
                                color: '#105e43',
                                fontWeight: 700,
                                borderRadius: '10px',
                                position: 'relative',
                                zIndex: 1,
                                '&:hover': { bgcolor: '#f0fdf4' },
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Belanja Sekarang
                        </Button>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: -40,
                                right: -40,
                                width: 140,
                                height: 140,
                                borderRadius: '50%',
                                bgcolor: 'rgba(255,255,255,0.08)',
                            }}
                        />
                    </Paper>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {[
                            { label: 'Lihat Semua Transaksi', path: '/transactions', icon: <ReceiptLongIcon fontSize="small" /> },
                            { label: 'Beli Paket Data', path: '/products', icon: <ShoppingBagIcon fontSize="small" /> },
                        ].map((link) => (
                            <Paper
                                key={link.path}
                                elevation={0}
                                onClick={() => navigate(link.path)}
                                sx={{
                                    p: 2,
                                    borderRadius: '14px',
                                    border: '1px solid #e5e7eb',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    '&:hover': { borderColor: '#105e43', bgcolor: '#f9fafb' },
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Box sx={{ color: '#105e43' }}>{link.icon}</Box>
                                    <Typography variant="body2" fontWeight={600}>
                                        {link.label}
                                    </Typography>
                                </Box>
                                <ArrowForwardIcon fontSize="small" sx={{ color: '#9ca3af' }} />
                            </Paper>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={12} lg={8}>
                    <Paper
                        elevation={0}
                        sx={{
                            borderRadius: '20px',
                            border: '1px solid #f3f4f6',
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                px: 3,
                                py: 2.5,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid #f3f4f6',
                            }}
                        >
                            <Typography variant="subtitle1" fontWeight={700}>
                                Transaksi Terakhir
                            </Typography>
                            <Button
                                size="small"
                                onClick={() => navigate('/transactions')}
                                sx={{ color: '#105e43', fontWeight: 600, fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                            >
                                Lihat Semua
                            </Button>
                        </Box>

                        {loading ? (
                            <Box sx={{ p: 3 }}>
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} height={60} sx={{ mb: 1, borderRadius: '12px' }} />
                                ))}
                            </Box>
                        ) : transactions.length === 0 ? (
                            <Box sx={{ p: 4, textAlign: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Belum ada transaksi
                                </Typography>
                            </Box>
                        ) : (
                            <Box>
                                {transactions.slice(0, 5).map((tx) => {
                                    const providerColor = PROVIDER_COLORS[tx.provider] || '#105e43';
                                    return (
                                        <Box
                                            key={tx.id}
                                            sx={{
                                                px: 3,
                                                py: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                                borderBottom: '1px solid #f9fafb',
                                                transition: 'background 0.15s',
                                                '&:hover': { bgcolor: '#f9fafb' },
                                                '&:last-child': { borderBottom: 'none' },
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: '12px',
                                                    bgcolor: `${providerColor}15`,
                                                    color: providerColor,
                                                    fontWeight: 800,
                                                    fontSize: '0.9rem',
                                                }}
                                            >
                                                {tx.provider?.charAt(0)}
                                            </Avatar>
                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography variant="subtitle2" fontWeight={700} noWrap>
                                                    {tx.productName}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" noWrap>
                                                    {tx.provider} &bull; {tx.quantity}x
                                                </Typography>
                                            </Box>
                                            <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                                                <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#105e43' }}>
                                                    {formatCurrency(tx.totalPrice)}
                                                </Typography>
                                                <Chip
                                                    label={tx.status === 'success' ? 'Sukses' : 'Pending'}
                                                    size="small"
                                                    icon={<CheckCircleIcon sx={{ fontSize: '14px !important' }} />}
                                                    sx={{
                                                        height: 22,
                                                        fontSize: '0.65rem',
                                                        fontWeight: 700,
                                                        bgcolor: tx.status === 'success' ? '#ecfdf5' : '#fffbeb',
                                                        color: tx.status === 'success' ? '#059669' : '#d97706',
                                                        '& .MuiChip-icon': { color: 'inherit' },
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;