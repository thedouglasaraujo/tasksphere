import { Chip } from '@mui/material';

const STATUS_CONFIG = {
  todo: { label: 'Pendente', color: 'default' },
  in_progress: { label: 'Em andamento', color: 'warning' },
  done: { label: 'Concluída', color: 'success' },
};

export default function StatusChip({ status }) {
  const { label, color } = STATUS_CONFIG[status] || {
    label: status,
    color: 'default',
  };

  return <Chip label={label} color={color} />;
}
