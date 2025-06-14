import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

export default function SelectField({ label, name, register, rules, errors, options }) {
    return (
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
    );
}
