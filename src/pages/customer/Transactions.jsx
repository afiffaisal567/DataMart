import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import TransactionHistory from '../../components/features/transaction/TransactionHistory';
import { useAuth } from '../../hooks/useAuth';
import { transactionService } from '../../services/transactionService';

const Transactions = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const res = await transactionService.getByUserId(user?.id, page, limit);
                const data = res?.data || res || [];
                setTransactions(Array.isArray(data) ? data : []);
                const total = res?.headers?.['x-total-count'] || data.length || 0;
                setTotalPages(Math.ceil(total / limit) || 1);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (user?.id) fetch();
    }, [user?.id, page]);

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.5px' }}>Riwayat Transaksi</Typography>
                <Typography variant="body2" color="text.secondary">
                    Daftar semua pembelian paket data Anda
                </Typography>
            </Box>
            <TransactionHistory
                transactions={transactions}
                loading={loading}
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </Box>
    );
};

export default Transactions;
