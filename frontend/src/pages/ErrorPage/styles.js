const errorPageStyles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
    },
    content: {
        textAlign: 'center',
    },
    code: {
        color: '#DB1E2F',
        fontWeight: 700,
    },
    message: {
        mt: 2,
        mb: 4,
        color: '#2C3E50',
    },
    button: {
        backgroundColor: '#DB1E2F',
        '&:hover': {
            backgroundColor: '#AF0421',
        },
    },
}

export default errorPageStyles
