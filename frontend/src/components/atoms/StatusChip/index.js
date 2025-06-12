import React from 'react'
import { Chip } from '@mui/material'

function getStatusColor(status) {
    const statusMap = {
        'Concluída': 'success',
        'Em andamento': 'warning',
        'Pendente': 'default',
    }
    return statusMap[status] || 'default'
}

export default function StatusChip({ status }) {
    return <Chip label={status} color={getStatusColor(status)} />
}
