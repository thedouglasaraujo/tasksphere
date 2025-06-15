import { Box, Chip } from '@mui/material'

export default function ProjectDateChips({ startDate, endDate }) {
    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip label={`Início: ${startDate}`} color="info" />
            <Chip label={`Fim: ${endDate}`} color="warning" />
        </Box>
    )
}
