import { Button } from '@mui/material'
import styles from './styles'

export default function PrimaryButton({
    label,
    onClick,
    sx = {},
    ...props
}) {
    return (
        <Button
            variant="contained"
            size="large"
            onClick={onClick}
            sx={(theme) => ({
                ...styles(theme),
                ...sx,
            })}
            {...props}
        >
            {label}
        </Button>
    )
}
