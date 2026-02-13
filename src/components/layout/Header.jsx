import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Avatar,
    Badge,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../hooks/useAuth';

const Header = ({ cartCount, isMobile, onOpenSidebar }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: '#f0f1f3',
                borderBottom: 'none',
                px: { xs: 1, sm: 2, md: 3 },
                pt: 2,
                pb: 1,
            }}
        >
            <Toolbar
                sx={{
                    bgcolor: '#ffffff',
                    borderRadius: '16px',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    minHeight: { xs: 56, sm: 64 },
                    px: { xs: 2, sm: 3 },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {isMobile && (
                        <IconButton onClick={onOpenSidebar} edge="start" sx={{ color: '#111827' }}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography
                        variant="h6"
                        fontWeight={800}
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            color: '#111827',
                            fontSize: '1.1rem',
                        }}
                    >
                        Dashboard
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                        onClick={() => navigate('/cart')}
                        sx={{
                            color: '#374151',
                            '&:hover': { bgcolor: '#f3f4f6' },
                        }}
                    >
                        <Badge
                            badgeContent={cartCount}
                            color="error"
                            sx={{
                                '& .MuiBadge-badge': {
                                    fontSize: '0.65rem',
                                    height: 18,
                                    minWidth: 18,
                                },
                            }}
                        >
                            <ShoppingCartOutlinedIcon sx={{ fontSize: 22 }} />
                        </Badge>
                    </IconButton>

                    <Box
                        onClick={() => navigate('/profile')}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            ml: 0.5,
                            cursor: 'pointer',
                            py: 0.5,
                            px: 1,
                            borderRadius: '50px',
                            transition: 'background 0.2s',
                            '&:hover': { bgcolor: '#f9fafb' },
                        }}
                    >
                        <Avatar
                            src={user?.avatar}
                            sx={{
                                width: 34,
                                height: 34,
                                bgcolor: '#105e43',
                                fontSize: '0.85rem',
                                fontWeight: 700,
                            }}
                        >
                            {user?.name?.charAt(0)}
                        </Avatar>
                        <Box sx={{ display: { xs: 'none', sm: 'block' }, lineHeight: 1, mr: 0.5 }}>
                            <Typography
                                variant="subtitle2"
                                sx={{ color: '#111827', fontWeight: 700, fontSize: '0.85rem' }}
                            >
                                {user?.name}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
