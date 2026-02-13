import { Box, TextField, InputAdornment, Grid, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from './ProductCard';
import EmptyState from '../../common/EmptyState';

const ProductList = ({ products, loading, selectedProvider, onProviderChange, searchQuery, onSearchChange, onAddToCart }) => {
    const filteredProducts = Array.isArray(products)
        ? products.filter((p) => {
            const matchProvider = !selectedProvider || selectedProvider === 'Semua' || p.provider === selectedProvider;
            const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchProvider && matchSearch;
        })
        : [];

    return (
        <Box>
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    mb: 4,
                    borderRadius: '24px',
                    bgcolor: '#ffffff',
                    border: '1px solid #f3f4f6'
                }}
            >
                <TextField
                    placeholder="Cari paket data..."
                    size="small"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            bgcolor: '#f9fafb',
                            '& fieldset': { border: 'none' },
                            '&:hover fieldset': { borderColor: '#e5e7eb' },
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" sx={{ ml: 0.5 }}>
                                <SearchIcon sx={{ color: '#9ca3af', fontSize: 18 }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Paper>

            {loading ? (
                <Grid container spacing={2}>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Grid item xs={6} sm={4} md={3} key={i}>
                            <ProductCard loading />
                        </Grid>
                    ))}
                </Grid>
            ) : filteredProducts.length === 0 ? (
                <EmptyState
                    title="Paket tidak ditemukan"
                    subtitle="Coba ubah filter atau kata kunci pencarian"
                />
            ) : (
                <Grid container spacing={2}>
                    {filteredProducts.map((product) => (
                        <Grid item xs={6} sm={4} md={3} key={product.id}>
                            <ProductCard product={product} onAddToCart={onAddToCart} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default ProductList;