import React from 'react'
import { Typography, TextField } from '@mui/material'

export default function InputField({ label, register, name, rules, errors, type = 'text', sxLabel, hideLabel }) {
    return (
        <>
            <Typography variant="subtitle1" sx={sxLabel}>
                {label}
            </Typography>
            <TextField
                label={!hideLabel && label}
                fullWidth
                margin="normal"
                type={type}
                {...register(name, rules)}
                error={!!errors[name]}
                helperText={errors[name]?.message}
            />
        </>
    )
}
