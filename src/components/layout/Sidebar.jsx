import { useNavigate, useLocation } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Typography,
    useTheme,
    useMediaQuery,
    Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShopIcon from '@mui/icons-material/Shop';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { useAuth } from '../../hooks/useAuth';

const DRAWER_WIDTH = 260;

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Paket Data', icon: <ShopIcon />, path: '/products' },
    { text: 'Keranjang', icon: <ShoppingCartIcon />, path: '/cart' },
    { text: 'Transaksi', icon: <ReceiptLongIcon />, path: '/transactions' },
    { text: 'Profil', icon: <PersonIcon />, path: '/profile' },
];

const Sidebar = ({ open, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { logout } = useAuth();

    const handleNavigate = (path) => {
        navigate(path);
        if (isMobile) onClose?.();
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const drawerContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3, bgcolor: '#ffffff' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4, pl: 1 }}>
                <Box
                    sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#105e43',
                        color: '#fff',
                    }}
                >
                    <SignalCellularAltIcon fontSize="small" />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.5px', color: '#111827' }}>
                    Data<span style={{ color: '#105e43' }}>Mart</span>
                </Typography>
            </Box>

            <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 600, mb: 1.5, pl: 2 }}>
                MENU UTAMA
            </Typography>

            <List sx={{ mb: 2 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItemButton
                            key={item.text}
                            onClick={() => handleNavigate(item.path)}
                            sx={{
                                borderRadius: '12px',
                                mb: 0.5,
                                py: 1.5,
                                px: 2,
                                bgcolor: isActive ? '#f0fdf4' : 'transparent',
                                color: isActive ? '#105e43' : '#6b7280',
                                '&:hover': { bgcolor: '#f9fafb', color: '#111827' },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontSize: '0.9rem',
                                    fontWeight: isActive ? 700 : 500,
                                }}
                            />
                        </ListItemButton>
                    );
                })}
            </List>

            <Divider sx={{ my: 1, borderStyle: 'dashed' }} />

            <List>
                <ListItemButton
                    onClick={handleLogout}
                    sx={{
                        borderRadius: '12px',
                        color: '#6b7280',
                        py: 1.5,
                        px: 2,
                        '&:hover': { bgcolor: '#fef2f2', color: '#ef4444' },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Keluar Aplikasi" primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }} />
                </ListItemButton>
            </List>

        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
        >
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? open : true}
                onClose={onClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: DRAWER_WIDTH,
                        border: 'none',
                        bgcolor: '#ffffff',
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};

export { DRAWER_WIDTH };
export default Sidebar;
