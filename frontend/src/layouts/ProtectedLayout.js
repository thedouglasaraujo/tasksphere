import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import TopBar from '../components/organisms/TopBar';

export default function ProtectedLayout() {
    return (
        <>
            <TopBar />
            <Box
                sx={{
                    width: '100%',
                    padding: 0,
                    boxSizing: 'border-box'
                }}
            >
                <Outlet />
            </Box>
        </>
    );
}
