import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Typography } from '@mui/material';

export default function SelectField({ label, name, register, rules, errors, options }) {
    return (
        <>
            <Typography variant="subtitle1">
                {label}
            </Typography>
            <FormControl fullWidth margin="normal" error={!!errors[name]}>
                <InputLabel>{label}</InputLabel>
                <Select {...register(name, rules)} label={label}>
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{errors[name]?.message}</FormHelperText>
            </FormControl>
        </>
    );
}
