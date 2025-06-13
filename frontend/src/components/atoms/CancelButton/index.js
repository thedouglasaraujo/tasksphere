import React from 'react'
import Button from '@mui/material/Button'
import styles from './styles'

export default function CancelButton({ onClick, children, sx }) {
    return (
        <Button
            variant="text"
            onClick={onClick}
            sx={{ ...styles.button, ...sx }}
        >
            {children}
        </Button>
    )
}
