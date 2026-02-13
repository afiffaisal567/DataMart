import api from './api';

export const productService = {
    getAll: async (params = {}) => {
        const { data } = await api.get('/products', { params });
        return data;
    },

    getById: async (id) => {
        const { data } = await api.get(`/products/${id}`);
        return data;
    },

    getByProvider: async (provider) => {
        const { data } = await api.get('/products', {
            params: { provider },
        });
        return data;
    },

    search: async (query) => {
        const { data } = await api.get('/products', {
            params: { q: query },
        });
        return data;
    },

    updateStock: async (id, newStock) => {
        const { data } = await api.patch(`/products/${id}`, { stock: newStock });
        return data;
    },
};
