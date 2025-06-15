import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const statusOptions = [
    { value: 'todo', label: 'Pendente' },
    { value: 'in_progress', label: 'Em andamento' },
    { value: 'done', label: 'Concluída' },
];

export default function TaskFilter({ filters, onFilterChange }) {
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({ [name]: value });
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
            <TextField
                label="Título"
                name="title"
                value={filters.title}
                onChange={handleFilterChange}
                fullWidth
            />

            <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    label="Status"
                >
                    <MenuItem value="">
                        <em>Todos</em>
                    </MenuItem>
                    {statusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
