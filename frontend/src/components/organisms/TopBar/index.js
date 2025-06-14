import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link as RouterLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

export default function TopBar() {
    const { user, logout } = useAuth();

    return (
        <AppBar position="static" color="primary" elevation={2}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="h5"
                    component={RouterLink}
                    to="/dashboard"
                    sx={{ color: 'inherit', textDecoration: 'none' }}
                >
                    TaskSphere
                </Typography>

                <Box display="flex" alignItems="center" gap={2}>
                    <Typography variant="h6">{user?.name}</Typography>
                    <Button
                        color="inherit"
                        startIcon={<LogoutIcon />}
                        onClick={logout}
                    >
                        Sair
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
