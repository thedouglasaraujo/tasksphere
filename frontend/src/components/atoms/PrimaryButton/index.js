import { Button } from '@mui/material'
import { defaultStyles } from './styles'

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
            sx={{ ...defaultStyles, ...sx }}
            {...props}
        >
            {label}
        </Button>
    )
}
