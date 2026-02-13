import { Box, Typography } from '@mui/material';
import ProductList from '../../components/features/product/ProductList';
import { useProducts } from '../../hooks/useProducts';
import { useSnackbar } from 'notistack';

const Products = ({ onAddToCart }) => {
    const { products, loading, selectedProvider, setSelectedProvider, searchQuery, setSearchQuery } = useProducts();
    const { enqueueSnackbar } = useSnackbar();

    const handleAddToCart = (product) => {
        onAddToCart(product);
        enqueueSnackbar(`${product.name} ditambahkan ke keranjang`, { variant: 'success' });
    };

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.5px' }}>Beli Paket</Typography>
                <Typography variant="body2" color="text.secondary">
                    Pilih paket data termurah dari berbagai provider
                </Typography>
            </Box>

            <ProductList
                products={products}
                loading={loading}
                selectedProvider={selectedProvider}
                onProviderChange={setSelectedProvider}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onAddToCart={handleAddToCart}
            />
        </Box>
    );
};

export default Products;
