import api from './api';

export const authService = {
    login: async (email, password) => {
        const { data: users } = await api.get('/users', {
            params: { email, password },
        });
        if (users.length === 0) {
            throw new Error('Email atau password salah');
        }
        const user = users[0];
        const { password: _, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            token: `mock-token-${user.id}-${Date.now()}`,
        };
    },

    register: async (userData) => {
        const { data: existing } = await api.get('/users', {
            params: { email: userData.email },
        });
        if (existing.length > 0) {
            throw new Error('Email sudah terdaftar');
        }
        const newUser = {
            ...userData,
            role: 'customer',
            balance: 200000,
            avatar: '',
            createdAt: new Date().toISOString(),
        };
        const { data: created } = await api.post('/users', newUser);
        const { password: _, ...userWithoutPassword } = created;
        return {
            user: userWithoutPassword,
            token: `mock-token-${created.id}-${Date.now()}`,
        };
    },

    getUser: async (id) => {
        const { data } = await api.get(`/users/${id}`);
        const { password: _, ...userWithoutPassword } = data;
        return userWithoutPassword;
    },

    updateUser: async (id, userData) => {
        const { data } = await api.patch(`/users/${id}`, userData);
        const { password: _, ...userWithoutPassword } = data;
        return userWithoutPassword;
    },

    updateBalance: async (id, newBalance) => {
        const { data } = await api.patch(`/users/${id}`, { balance: newBalance });
        return data;
    },
};
