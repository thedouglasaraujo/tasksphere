const styles = theme => ({
  taskCard: {
    width: '100%',
    bgcolor: theme.palette.grey[100],
    borderRadius: 3,
    boxShadow: '0 5px 20px rgba(44, 62, 80, 0.1)',
  },

  taskCardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  taskTitle: {
    fontWeight: 600,
    color: theme.palette.grey[700],
  },

  image: {
    width: '100px',
    height: '100px',
    borderRadius: '8px',
  },
});

export default styles;
