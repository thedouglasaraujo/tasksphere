import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingIndicator({ message = 'Carregando...' }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mt={4}>
      <CircularProgress />
      <Typography mt={2} color="textSecondary">
        {message}
      </Typography>
    </Box>
  );
}
