import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import ExtensionIcon from '@mui/icons-material/Extension';

const EmptyState = ({ title, subtitle, icon, actionLabel, actionPath }) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
                px: 2,
                textAlign: 'center',
                bgcolor: '#f9fafb',
                borderRadius: '24px',
                border: '1px dashed #e5e7eb'
            }}
        >
            <Box
                sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#ffffff',
                    color: '#105e43',
                    mb: 2,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                }}
            >
                {icon || <ExtensionIcon fontSize="large" />}
            </Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5, color: '#374151' }}>
                {title || 'Tidak ada data'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320, mb: actionLabel ? 3 : 0 }}>
                {subtitle}
            </Typography>
            {actionLabel && actionPath && (
                <Button
                    variant="outlined"
                    onClick={() => navigate(actionPath)}
                    sx={{
                        px: 3,
                        py: 1,
                        borderRadius: '12px',
                        borderColor: '#e5e7eb',
                        color: '#374151',
                        '&:hover': { bgcolor: '#ffffff', borderColor: '#d1d5db' },
                    }}
                >
                    {actionLabel}
                </Button>
            )}
        </Box>
    );
};

export default EmptyState;
