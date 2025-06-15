import { Snackbar, Alert } from '@mui/material'

export default function AlertSnackbar({ open, onClose, severity, message }) {
    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={onClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}
