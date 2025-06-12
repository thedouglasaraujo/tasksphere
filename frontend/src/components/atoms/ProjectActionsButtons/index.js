import React from 'react'
import { Button, Stack } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'

export default function ProjectActionsButtons({ onEdit, onDelete }) {
    return (
        <Stack direction="row" spacing={1}>
            <Button
                variant="outlined"
                color="primary"
                startIcon={<Edit />}
                onClick={onEdit}
            >
                Editar
            </Button>
            <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={onDelete}
            >
                Excluir
            </Button>
        </Stack>
    )
}
