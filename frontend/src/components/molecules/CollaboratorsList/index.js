import React from 'react'
import { Box, Chip } from '@mui/material'

export default function CollaboratorsList({ collaborators }) {
    return (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
            {collaborators.map((id) => (
                <Chip key={id} label={`Usuário ${id}`} variant="outlined" color="primary" />
            ))}
        </Box>
    )
}
