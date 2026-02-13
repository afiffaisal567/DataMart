import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { authService } from '../services/authService';
import { AUTH_STORAGE_KEY } from '../utils/constants';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setUser(parsed.user);
                setToken(parsed.token);
            } catch {
                localStorage.removeItem(AUTH_STORAGE_KEY);
            }
        }
        setLoading(false);
    }, []);

    const login = useCallback(async (email, password) => {
        const result = await authService.login(email, password);
        setUser(result.user);
        setToken(result.token);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(result));
        return result;
    }, []);

    const register = useCallback(async (userData) => {
        const result = await authService.register(userData);
        setUser(result.user);
        setToken(result.token);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(result));
        return result;
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem(AUTH_STORAGE_KEY);
    }, []);

    const refreshUser = useCallback(async () => {
        if (!user) return;
        try {
            const updated = await authService.getUser(user.id);
            setUser(updated);
            const stored = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || '{}');
            stored.user = updated;
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(stored));
        } catch (err) {
            console.error('Failed to refresh user:', err);
        }
    }, [user]);

    const updateUser = useCallback(async (userData) => {
        if (!user) return;
        const updated = await authService.updateUser(user.id, userData);
        setUser(updated);
        const stored = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || '{}');
        stored.user = updated;
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(stored));
        return updated;
    }, [user]);

    const value = useMemo(() => ({
        user,
        token,
        loading,
        isAuthenticated: !!user && !!token,
        login,
        register,
        logout,
        refreshUser,
        updateUser,
    }), [user, token, loading, login, register, logout, refreshUser, updateUser]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
