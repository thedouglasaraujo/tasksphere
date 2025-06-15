import React from 'react';
import {
    ListItem,
    Card,
    CardContent,
    ListItemText,
    Typography,
    Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StatusChip from '../../atoms/StatusChip';
import TextButton from '../../atoms/TextButton';
import styles from './styles';
import EditIcon from '@mui/icons-material/Edit';

export default function TaskListItem({ task }) {
    const navigate = useNavigate();

    return (
        <ListItem disablePadding sx={{ mb: 2 }}>
            <Card sx={styles.taskCard}>
                <CardContent sx={styles.taskCardContent}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {task.image_url && (
                            <img
                                src={task.image_url}
                                alt="Task Image"
                                style={styles.image}
                            />
                        )}

                        <ListItemText
                            primary={<Typography sx={styles.taskTitle}>{task.title}</Typography>}
                            secondary={`Status: ${task.status}`}
                        />
                    </Box>

                    <Box sx={styles.taskActions}>
                        <StatusChip status={task.status} />
                        <TextButton onClick={() => navigate(`/tasks/${task.id}/edit`)}>
                            <EditIcon />
                        </TextButton>
                    </Box>
                </CardContent>
            </Card>
        </ListItem>
    );
}
