import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedProvider, setSelectedProvider] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            let data;
            if (searchQuery) {
                data = await productService.search(searchQuery);
            } else if (selectedProvider && selectedProvider !== 'Semua') {
                data = await productService.getByProvider(selectedProvider);
            } else {
                data = await productService.getAll();
            }
            setProducts(data.filter(p => p.isActive));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [selectedProvider, searchQuery]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        loading,
        error,
        selectedProvider,
        searchQuery,
        setSelectedProvider,
        setSearchQuery,
        refreshProducts: fetchProducts,
    };
};
