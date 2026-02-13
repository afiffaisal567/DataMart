import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ message = 'Memuat...', fullPage = false }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                ...(fullPage && { minHeight: '100vh', bgcolor: '#f0f1f3' }),
                ...(!fullPage && { py: 8 }),
            }}
        >
            <CircularProgress
                size={40}
                thickness={5}
                sx={{ color: '#105e43' }}
            />
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
                {message}
            </Typography>
        </Box>
    );
};

export default Loading;
