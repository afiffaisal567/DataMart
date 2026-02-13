import { Box, Card, CardContent, Typography, Button, Skeleton } from '@mui/material';
import { formatCurrency } from '../../../utils/helpers';
import { PROVIDER_COLORS } from '../../../utils/constants';

const ProductCard = ({ product, onAddToCart, loading }) => {
    if (loading) {
        return (
            <Card
                elevation={0}
                sx={{
                    borderRadius: '16px',
                    border: '1px solid #f3f4f6',
                    height: { xs: 190, sm: 230 },
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
                    <Box sx={{ textAlign: 'center', mb: 1.5 }}>
                        <Skeleton width={36} height={36} variant="rounded" sx={{ borderRadius: '10px', mx: 'auto', mb: 1 }} />
                        <Skeleton width="80%" height={18} sx={{ mx: 'auto', mb: 0.5 }} />
                        <Skeleton width="60%" height={16} sx={{ mx: 'auto', mb: 0.5 }} />
                    </Box>

                    <Box sx={{
                        mt: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1.5,
                        pt: 1.5,
                        borderTop: '1px dashed #f3f4f6',
                        width: '100%'
                    }}>
                        <Skeleton width={60} height={20} />
                        <Skeleton width={50} height={28} variant="rounded" />
                    </Box>
                </CardContent>
            </Card>
        );
    }

    const providerColor = PROVIDER_COLORS[product.provider] || '#105e43';
    const stock = typeof product.stock === 'number' ? product.stock : 0;
    const isOutOfStock = stock <= 0;

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
                height: { xs: 190, sm: 230 },
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 20px -8px rgba(0,0,0,0.1)',
                    borderColor: '#105e43',
                },
            }}
        >
            <CardContent
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'space-between',
                    alignItems: { xs: 'center', sm: 'flex-start' }
                }}
            >
                <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
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
                            fontSize: '0.85rem',
                            fontWeight: 800,
                            mb: 1,
                            mx: { xs: 'auto', sm: 0 }
                        }}
                    >
                        {product.provider?.charAt(0)}
                    </Box>

                    <Typography
                        variant="subtitle2"
                        fontWeight={700}
                        sx={{
                            fontSize: '0.85rem',
                            lineHeight: 1.3,
                            mb: 0.5,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textAlign: { xs: 'center', sm: 'left' }
                        }}
                    >
                        {product.name}
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                            fontSize: '0.7rem',
                            display: 'block',
                            mb: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textAlign: { xs: 'center', sm: 'left' }
                        }}
                    >
                        {product.quota} • {product.validity}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: { xs: 'center', sm: 'space-between' },
                        gap: 1,
                        pt: 2,
                        borderTop: '1px dashed #f3f4f6',
                        width: '100%',
                        mt: 'auto'
                    }}
                >
                    <Typography
                        variant="subtitle2"
                        fontWeight={800}
                        sx={{
                            color: '#111827',
                            fontSize: '0.85rem',
                            textAlign: { xs: 'center', sm: 'left' }
                        }}
                    >
                        {formatCurrency(product.price)}
                    </Typography>

                    <Button
                        variant="contained"
                        disableElevation
                        disabled={isOutOfStock}
                        onClick={() => onAddToCart?.(product)}
                        size="small"
                        sx={{
                            minWidth: 60,
                            borderRadius: '8px',
                            py: 0.5,
                            px: 1.5,
                            bgcolor: '#105e43',
                            color: '#fff',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            '&:hover': { bgcolor: '#0c4a35' },
                            mt: { xs: 1, sm: 0 }
                        }}
                    >
                        {isOutOfStock ? 'Habis' : 'Beli'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;