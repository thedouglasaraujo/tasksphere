import React from 'react'
import {
    ListItem,
    Card,
    CardContent,
    ListItemText,
    Typography,
} from '@mui/material'
import StatusChip from '../../atoms/StatusChip'
import styles from './styles'

export default function TaskListItem({ task }) {
    return (
        <ListItem disablePadding sx={{ mb: 2 }}>
            <Card sx={styles.taskCard}>
                <CardContent sx={styles.taskCardContent}>
                    <ListItemText
                        primary={<Typography sx={styles.taskTitle}>{task.title}</Typography>}
                        secondary={`Status: ${task.status}`}
                    />
                    <StatusChip status={task.status} />
                </CardContent>
            </Card>
        </ListItem>
    )
}
