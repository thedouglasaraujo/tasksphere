import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  Container,
  Stack,
  Typography,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import InputField from '../../components/atoms/InputField'
import PrimaryButton from '../../components/atoms/PrimaryButton'
import CancelButton from '../../components/atoms/CancelButton'
import styles from './styles'

const mockProjects = {
  1: {
    name: 'Projeto Alpha',
    description: 'Descrição detalhada do projeto.',
    start_date: '2025-01-10',
    end_date: '2025-04-15',
  },
}

export default function ProjectForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm()

  const startDate = watch('start_date')

  useEffect(() => {
    if (isEdit && mockProjects[id]) {
      const project = mockProjects[id]
      Object.entries(project).forEach(([key, value]) => setValue(key, value))
    }
  }, [id, isEdit, setValue])

  const onSubmit = (data) => {
    if (isEdit) {
      console.log('Atualizar projeto:', data)
    } else {
      console.log('Criar novo projeto:', data)
    }
    navigate('/projects')
  }

  return (
    <Container maxWidth={false} sx={styles.containerBox}>
      <Box sx={styles.contentContainer}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" sx={styles.title}>
            {isEdit ? 'Editar Projeto' : 'Novo Projeto'}
          </Typography>

          <Stack spacing={1}>
            <InputField
              label="Nome"
              name="name"
              register={register}
              rules={{ required: 'Campo obrigatório' }}
              errors={errors}
            />
            <InputField
              label="Descrição"
              name="description"
              register={register}
              rules={{ required: 'Campo obrigatório' }}
              errors={errors}
            />
            <InputField
              label="Data de Início"
              name="start_date"
              type="date"
              register={register}
              rules={{ required: 'Campo obrigatório' }}
              errors={errors}
            />
            <InputField
              label="Data de Fim"
              name="end_date"
              type="date"
              register={register}
              rules={{
                required: 'Campo obrigatório',
                validate: (value) =>
                  !startDate || value >= startDate || 'A data de fim deve ser posterior à data de início',
              }}
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
