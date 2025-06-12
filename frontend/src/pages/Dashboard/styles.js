const styles = {
  containerBox: {
    minHeight: '100vh',
    background: '#f0f4f8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    pt: 8,
    pb: 8,
    px: 2,
  },
  contentContainer: {
    width: '75%',
  },
  card: {
    bgcolor: '#ECF0F1',
    borderRadius: 3,
    boxShadow: '0 10px 30px rgba(44, 62, 80, 0.2)',
    minHeight: 220,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    p: 3,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      boxShadow: '0 14px 40px rgba(44, 62, 80, 0.3)',
      transform: 'translateY(-6px)',
    },
  },
  headerBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 2,
    mb: 4,
  },
  headerTitle: {
    fontWeight: 700,
    color: '#2C3E50',
  },
  buttonNewProject: {
    borderRadius: 2,
    px: 4,
    fontWeight: 'bold',
    boxShadow: '0 4px 8px rgba(44, 62, 80, 0.3)',
    transition: 'all 0.3s ease',
    bgcolor: '#2C3E50',
    '&:hover': {
      bgcolor: '#3498DB',
      boxShadow: '0 6px 14px rgba(52, 152, 219, 0.5)',
      transform: 'translateY(-2px)',
    },
  },
  noProjectsText: {
    color: '#7F8C8D',
    textAlign: 'center',
    mt: 6,
  },
  title: {
    fontWeight: 700,
    color: '#2C3E50',
  },
  description: {
    color: '#34495E',
    minHeight: 64,
    mb: 2,
  },
  chipStart: {
    fontWeight: 600,
  },
  chipEnd: {
    fontWeight: 600,
  },
}

export default styles
