import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Card, CardContent, ListItem, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import StatusChip from '~/components/atoms/StatusChip';
import TextButton from '~/components/atoms/TextButton';
import { formatDateBR } from '~/utils/dateUtils';
import stylesFn from './styles';

export default function TaskListItem({ task, onDelete }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = stylesFn(theme);

  return (
    <ListItem disablePadding sx={{ mb: 2 }}>
      <Card sx={styles.taskCard}>
        <CardContent sx={styles.taskCardContent}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {task.image_url && <img src={task.image_url} alt="Task Image" style={styles.image} />}

            <ListItemText
              primary={<Typography sx={styles.taskTitle}>{task.title}</Typography>}
              secondary={`Data de entrega: ${formatDateBR(task.due_date)}`}
            />
          </Box>

          <Box sx={styles.taskActions}>
            <StatusChip status={task.status} />
            <TextButton onClick={() => navigate(`/tasks/${task.id}/edit`)}>
              <EditIcon />
            </TextButton>
            {onDelete && (
              <TextButton onClick={() => onDelete(task.id)}>
                <DeleteIcon />
              </TextButton>
            )}
          </Box>
        </CardContent>
      </Card>
    </ListItem>
  );
}
