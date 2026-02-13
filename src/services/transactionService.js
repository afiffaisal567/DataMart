import api from './api';

export const transactionService = {
    getAll: async (params = {}) => {
        const { data } = await api.get('/transactions', {
            params: { ...params, _sort: 'createdAt', _order: 'desc' },
        });
        return data;
    },

    getByUserId: async (userId, page = 1, limit = 10) => {
        const { data, headers } = await api.get('/transactions', {
            params: {
                userId,
                _sort: 'createdAt',
                _order: 'desc',
                _page: page,
                _limit: limit,
            },
        });
        const total = parseInt(headers['x-total-count'] || data.length, 10);
        return { data, total };
    },

    getById: async (id) => {
        const { data } = await api.get(`/transactions/${id}`);
        return data;
    },

    create: async (transactionData) => {
        const newTransaction = {
            ...transactionData,
            status: 'success',
            paymentMethod: 'saldo',
            createdAt: new Date().toISOString(),
        };
        const { data } = await api.post('/transactions', newTransaction);
        return data;
    },
};
