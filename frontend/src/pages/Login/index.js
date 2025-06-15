import { Box, Container, Paper, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import LoginForm from '~/components/molecules/LoginForm'
import styles from './styles'
import useAuth from '~/hooks/useAuth'
import { loginRequest } from '~/services/authService'
import { useSnackbar } from '~/contexts/SnackbarContext';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { login } = useAuth()
    const { showSnackbar } = useSnackbar();

    const onSubmit = async (data) => {
        try {
            const result = await loginRequest(data);
            login(result.token, result.user);
        } catch (err) {
            showSnackbar('Email ou senha incorretos!', 'error');
        }
    };

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
            </Container>
        </Box>
    )
}
