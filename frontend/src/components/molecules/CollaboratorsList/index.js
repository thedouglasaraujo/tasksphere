import { Box, Chip, Typography } from '@mui/material';

export default function CollaboratorsList({ collaborators = [] }) {
  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
      {collaborators.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          Nenhum colaborador adicionado.
        </Typography>
      ) : (
        collaborators.map(collaborator => (
          <Chip
            key={collaborator.id}
            label={collaborator.name}
            variant="outlined"
            color="primary"
          />
        ))
      )}
    </Box>
  );
}
