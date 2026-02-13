import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Skeleton,
    Pagination,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { formatCurrency, formatDate, getStatusColor } from '../../../utils/helpers';
import EmptyState from '../../common/EmptyState';
import { PROVIDER_COLORS } from '../../../utils/constants';

const TxCard = ({ tx }) => {
    const providerColor = PROVIDER_COLORS[tx.provider] || '#105e43';
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                mb: 1.5,
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
                bgcolor: '#ffffff',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <Box
                    sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '10px',
                        bgcolor: `${providerColor}15`,
                        color: providerColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        flexShrink: 0,
                    }}
                >
                    {tx.provider?.charAt(0)}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" fontWeight={700} noWrap>
                        {tx.productName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {tx.provider} &bull; {tx.quantity}x
                    </Typography>
                </Box>
                <Chip
                    label={tx.status === 'success' ? 'Sukses' : tx.status}
                    size="small"
                    sx={{
                        fontWeight: 700,
                        fontSize: '0.65rem',
                        bgcolor: `${getStatusColor(tx.status)}15`,
                        color: getStatusColor(tx.status),
                        borderRadius: '6px',
                        height: 22,
                    }}
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">{tx.phoneNumber}</Typography>
                <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#105e43' }}>
                    {formatCurrency(tx.totalPrice)}
                </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                {formatDate(tx.createdAt)}
            </Typography>
        </Paper>
    );
};

const TransactionHistory = ({ transactions, loading, page, totalPages, onPageChange }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    if (!loading && (!transactions || transactions.length === 0)) {
        return <EmptyState title="Belum ada transaksi" subtitle="Transaksi Anda akan muncul di sini" />;
    }

    if (isMobile) {
        return (
            <Box>
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} height={100} sx={{ mb: 1.5, borderRadius: '16px' }} />
                    ))
                    : transactions.map((tx) => <TxCard key={tx.id} tx={tx} />)}

                {totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(_, val) => onPageChange(val)}
                            shape="rounded"
                            size="small"
                            sx={{ '& .Mui-selected': { bgcolor: '#105e43 !important', color: '#fff', fontWeight: 700 } }}
                        />
                    </Box>
                )}
            </Box>
        );
    }

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: '20px',
                border: '1px solid #f3f4f6',
                overflow: 'hidden',
                bgcolor: '#ffffff',
            }}
        >
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f9fafb' }}>
                            {['Produk', 'No. HP', 'Total', 'Status', 'Tanggal'].map((h) => (
                                <TableCell key={h} sx={{ fontWeight: 700, color: '#6b7280', borderBottom: '1px solid #f3f4f6' }}>
                                    {h}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading
                            ? Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    {Array.from({ length: 5 }).map((_, j) => (
                                        <TableCell key={j}><Skeleton width={j === 0 ? 140 : 70} /></TableCell>
                                    ))}
                                </TableRow>
                            ))
                            : transactions.map((tx) => {
                                const providerColor = PROVIDER_COLORS[tx.provider] || '#105e43';
                                return (
                                    <TableRow
                                        key={tx.id}
                                        sx={{
                                            transition: 'background 0.15s',
                                            '&:hover': { bgcolor: '#f9fafb' },
                                            '&:last-child td': { border: 0 },
                                        }}
                                    >
                                        <TableCell sx={{ borderBottom: '1px solid #f3f4f6' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <Box
                                                    sx={{
                                                        width: 36,
                                                        height: 36,
                                                        borderRadius: '10px',
                                                        bgcolor: `${providerColor}15`,
                                                        color: providerColor,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 800,
                                                        fontSize: '0.85rem',
                                                    }}
                                                >
                                                    {tx.provider?.charAt(0)}
                                                </Box>
                                                <Box>
                                                    <Typography variant="subtitle2" fontWeight={700}>{tx.productName}</Typography>
                                                    <Typography variant="caption" color="text.secondary">{tx.provider}</Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid #f3f4f6' }}>
                                            <Typography variant="body2" fontWeight={500}>{tx.phoneNumber}</Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid #f3f4f6' }}>
                                            <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#105e43' }}>
                                                {formatCurrency(tx.totalPrice)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid #f3f4f6' }}>
                                            <Chip
                                                label={tx.status === 'success' ? 'Sukses' : tx.status}
                                                size="small"
                                                sx={{
                                                    fontWeight: 700,
                                                    fontSize: '0.7rem',
                                                    bgcolor: `${getStatusColor(tx.status)}15`,
                                                    color: getStatusColor(tx.status),
                                                    borderRadius: '6px',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid #f3f4f6' }}>
                                            <Typography variant="caption" color="text.secondary">{formatDate(tx.createdAt)}</Typography>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 3, borderTop: '1px solid #f3f4f6' }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, val) => onPageChange(val)}
                        shape="rounded"
                        sx={{ '& .Mui-selected': { bgcolor: '#105e43 !important', color: '#fff', fontWeight: 700 } }}
                    />
                </Box>
            )}
        </Paper>
    );
};

export default TransactionHistory;
