import React, { useEffect } from 'react'
import {
    Box,
    Container,
    Stack,
    Typography,
    MenuItem,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import InputField from '../../components/atoms/InputField'
import PrimaryButton from '../../components/atoms/PrimaryButton'
import CancelButton from '../../components/atoms/TextButton'
import styles from './styles'

const mockTasks = {
    1: {
        title: 'Corrigir bugs',
        status: 'Em andamento',
        due_date: '2025-06-30',
        image_url: 'https://exemplo.com/imagem.png',
    },
}

const statusOptions = ['Pendente', 'Em andamento', 'Concluída']

export default function TaskForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = Boolean(id)

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        if (isEdit && mockTasks[id]) {
            reset(mockTasks[id])
        }
    }, [id, isEdit, reset])

    const onSubmit = (data) => {
        if (isEdit) {
            console.log('Atualizar tarefa:', data)
        } else {
            console.log('Criar nova tarefa:', data)
        }
        navigate('/tasks')
    }

    return (
        <Container maxWidth={false} sx={styles.containerBox}>
            <Box sx={styles.contentContainer}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h4" sx={styles.title}>
                        {isEdit ? 'Editar Tarefa' : 'Nova Tarefa'}
                    </Typography>

                    <Stack spacing={1}>
                        <InputField
                            label="Título"
                            name="title"
                            register={register}
                            rules={{ required: 'Campo obrigatório' }}
                            errors={errors}
                        />
                        <InputField
                            label="Status"
                            name="status"
                            select
                            register={register}
                            rules={{ required: 'Campo obrigatório' }}
                            errors={errors}
                        >
                            {statusOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </InputField>
                        <InputField
                            label="Data de Entrega"
                            name="due_date"
                            type="date"
                            register={register}
                            rules={{ required: 'Campo obrigatório' }}
                            errors={errors}
                        />
                        <InputField
                            label="URL da Imagem"
                            name="image_url"
                            register={register}
                            rules={{ required: 'Campo obrigatório' }}
                            errors={errors}
                        />

                        <Box mt={2}>
                            <Stack direction="row" spacing={2} sx={styles.buttonRow}>
                                <CancelButton onClick={() => navigate(-1)}>Cancelar</CancelButton>
                                <PrimaryButton label="Salvar" type="submit" />
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Container>
    )
}
