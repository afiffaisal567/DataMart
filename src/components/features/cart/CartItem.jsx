import { Box, Typography, IconButton, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { formatCurrency } from '../../../utils/helpers';
import { PROVIDER_COLORS } from '../../../utils/constants';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    const providerColor = PROVIDER_COLORS[item.provider] || '#105e43';
    const stock = typeof item.stock === 'number' ? item.stock : 0;

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2.5,
                mb: 2,
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
                bgcolor: '#ffffff',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box
                    sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '12px',
                        bgcolor: `${providerColor}15`,
                        color: providerColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem',
                        fontWeight: 800,
                        flexShrink: 0,
                    }}
                >
                    {item.provider?.charAt(0)}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" fontWeight={700} noWrap>
                        {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {item.provider} &bull; {item.quota} &bull; {item.validity}
                    </Typography>
                </Box>
                <IconButton
                    size="small"
                    onClick={() => onRemove(item.productId)}
                    sx={{
                        color: '#ef4444',
                        bgcolor: '#fef2f2',
                        borderRadius: '10px',
                        flexShrink: 0,
                        '&:hover': { bgcolor: '#fee2e2' },
                    }}
                >
                    <DeleteOutlineIcon fontSize="small" />
                </IconButton>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1.5,
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    {formatCurrency(item.price)} / unit
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #e5e7eb',
                        borderRadius: '10px',
                        overflow: 'hidden',
                    }}
                >
                    <IconButton
                        size="small"
                        onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                        sx={{ width: 32, height: 32, borderRadius: 0, color: item.quantity <= 1 ? '#d1d5db' : '#374151' }}
                    >
                        <RemoveIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    <Typography
                        variant="body2"
                        fontWeight={700}
                        sx={{ px: 1.5, minWidth: 24, textAlign: 'center', userSelect: 'none' }}
                    >
                        {item.quantity}
                    </Typography>
                    <IconButton
                        size="small"
                        onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                        disabled={item.quantity >= stock}
                        sx={{ width: 32, height: 32, borderRadius: 0, color: item.quantity >= stock ? '#d1d5db' : '#374151' }}
                    >
                        <AddIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                </Box>
                <Typography variant="subtitle1" fontWeight={800} sx={{ color: '#105e43' }}>
                    {formatCurrency(item.price * item.quantity)}
                </Typography>
            </Box>
        </Paper>
    );
};

export default CartItem;
