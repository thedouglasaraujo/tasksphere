import React from 'react'
import Button from '@mui/material/Button'
import styles from './styles'

export default function TextButton({ onClick, children, sx, ...props }) {
    return (
        <Button
            variant="text"
            onClick={onClick}
            sx={{ ...styles.button, ...sx }}
            {...props}
        >
            {children}
        </Button>
    )
}
