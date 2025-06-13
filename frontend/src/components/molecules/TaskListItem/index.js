import React from 'react'
import {
    ListItem,
    Card,
    CardContent,
    ListItemText,
    Typography,
    Box,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import StatusChip from '../../atoms/StatusChip'
import TextButton from '../../atoms/TextButton'
import styles from './styles'

export default function TaskListItem({ task }) {
    const navigate = useNavigate()

    return (
        <ListItem disablePadding sx={{ mb: 2 }}>
            <Card sx={styles.taskCard}>
                <CardContent sx={styles.taskCardContent}>
                    <ListItemText
                        primary={<Typography sx={styles.taskTitle}>{task.title}</Typography>}
                        secondary={`Status: ${task.status}`}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <StatusChip status={task.status} />
                        <TextButton
                            onClick={() => navigate(`/tasks/${task.id}/edit`)}
                        >
                            Editar
                        </TextButton>
                    </Box>
                </CardContent>
            </Card>
        </ListItem>
    )
}
