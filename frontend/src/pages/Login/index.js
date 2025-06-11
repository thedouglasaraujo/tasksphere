import React, { useState } from 'react'
import { Box, Container, Paper, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import LoginForm from '../../components/molecules/LoginForm'
import AlertSnackbar from '../../components/atoms/AlertSnackbar'
import styles from './styles'

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [errorOpen, setErrorOpen] = useState(false)

    const onSubmit = (data) => {
        if (data.email === 'usuario@teste.com' && data.password === '123456') {
            console.log('Login sucesso:', data)
        } else {
            setErrorOpen(true)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        setErrorOpen(false)
    }

    return (
        <Box sx={styles.containerBox}>
            <Container maxWidth="xs">
                <Paper elevation={6} sx={styles.paper}>
                    <Typography variant="h4" component="h1" align="center" gutterBottom sx={styles.title}>
                        TaskSphere
                    </Typography>
                    <Typography variant="h6" component="h2" align="center" gutterBottom sx={styles.subtitle}>
                        Faça login para continuar
                    </Typography>

                    <LoginForm
                        onSubmit={onSubmit}
                        register={register}
                        errors={errors}
                        handleSubmit={handleSubmit}
                        sxButton={styles.button}
                        sxLabel={styles.label}
                        sxLabelWithMarginTop={styles.labelWithMarginTop}
                    />
                </Paper>

                <AlertSnackbar
                    open={errorOpen}
                    onClose={handleClose}
                    severity="error"
                    message="Email ou senha incorretos!"
                />
            </Container>
        </Box>
    )
}
