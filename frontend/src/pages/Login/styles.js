const styles = {
    containerBox: {
        minHeight: '100vh',
        background: '#f0f4f8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
    },
    paper: {
        p: 4,
        borderRadius: 3,
        bgcolor: '#ECF0F1',
        boxShadow: '0 10px 30px rgba(44, 62, 80, 0.2)',
    },
    title: {
        fontWeight: '700',
        color: '#2C3E50',
    },
    subtitle: {
        mb: 3,
        color: '#7F8C8D',
    },
    label: {
        mb: 0.5,
        fontWeight: 600,
        color: '#34495E',
    },
    labelWithMarginTop: {
        mb: 0.5,
        fontWeight: 600,
        color: '#34495E',
        mt: 2,
    },
    button: {
        mt: 4,
        py: 1.5,
        fontWeight: '700',
        bgcolor: '#2C3E50',
        '&:hover': {
            bgcolor: '#3498DB',
        },
    },
    alertSnackbar: {
        width: '100%',
    },
}

export default styles
