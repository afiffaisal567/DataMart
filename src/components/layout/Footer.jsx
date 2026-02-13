import { Box, Typography, Container, Grid, IconButton } from '@mui/material';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 4,
                px: 3,
                mt: 'auto',
                borderTop: '1px solid #f3f4f6',
                bgcolor: '#ffffff',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Box
                                sx={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: '#105e43',
                                }}
                            >
                                <SignalCellularAltIcon sx={{ fontSize: 16, color: '#fff' }} />
                            </Box>
                            <Typography variant="body2" fontWeight={700}>
                                Data<span style={{ color: '#105e43' }}>Mart</span>
                            </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                            Platform pembelian paket data internet terpercaya.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                            © {new Date().getFullYear()} DataMart.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                            <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: '#105e43' } }}>
                                <GitHubIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: '#105e43' } }}>
                                <LinkedInIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: '#105e43' } }}>
                                <TwitterIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
