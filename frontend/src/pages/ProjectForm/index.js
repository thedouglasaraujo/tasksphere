import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '../../components/atoms/InputField';
import PrimaryButton from '../../components/atoms/PrimaryButton';
import TextButton from '../../components/atoms/TextButton';
import styles from './styles';
import { getProjectById, updateProject, createProject } from '../../services/projectService';

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const startDate = watch('start_date');

  useEffect(() => {
    if (isEdit) {
      const fetchProject = async () => {
        try {
          const project = await getProjectById(id);
          Object.entries(project).forEach(([key, value]) => setValue(key, value));
        } catch (err) {
          console.log('Erro ao carregar o projeto:', err);
        }
      };
      fetchProject();
    }
  }, [id, isEdit, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateProject(id, data);
      } else {
        await createProject(data);
      }
      navigate('/dashboard');
    } catch (err) {
      console.log('Erro ao salvar o projeto:', err);
    }
  };

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
              hideLabel
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
              hideLabel
            />

            <Box mt={2}>
              <Stack direction="row" spacing={2} sx={styles.buttonRow}>
                <TextButton onClick={() => navigate(-1)}>Cancelar</TextButton>
                <PrimaryButton label="Salvar" type="submit" />
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
