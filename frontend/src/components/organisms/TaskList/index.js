import { List, Typography } from '@mui/material';
import TaskListItem from '~/components/molecules/TaskListItem';

export default function TaskList({ tasks = [], onDeleteTask }) {
  return (
    <List>
      {tasks.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          Nenhuma tarefa encontrada.
        </Typography>
      ) : (
        tasks.map(task => <TaskListItem key={task.id} task={task} onDelete={onDeleteTask} />)
      )}
    </List>
  );
}
