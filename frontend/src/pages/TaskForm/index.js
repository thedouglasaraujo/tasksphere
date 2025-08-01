import { Box, Container, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '~/components/atoms/InputField';
import PrimaryButton from '~/components/atoms/PrimaryButton';
import SelectField from '~/components/atoms/SelectField';
import CancelButton from '~/components/atoms/TextButton';
import { useSnackbar } from '~/contexts/SnackbarContext';
import { createTask, getTaskById, updateTask } from '~/services/taskService';
import stylesFn from './styles';

const statusOptions = [
  { value: 'todo', label: 'Pendente' },
  { value: 'in_progress', label: 'Em andamento' },
  { value: 'done', label: 'Concluída' },
];

export default function TaskForm() {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(taskId);
  const { showSnackbar } = useSnackbar();
  const theme = useTheme();
  const styles = stylesFn(theme);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEdit) {
      const fetchTask = async () => {
        try {
          const task = await getTaskById(taskId);
          reset(task);
        } catch (err) {
          console.error('Erro ao carregar tarefa:', err);
        }
      };
      fetchTask();
    }
  }, [taskId, isEdit, reset]);

  const onSubmit = async data => {
    try {
      const taskData = { ...data, project_id: projectId };

      if (isEdit) {
        await updateTask(taskId, taskData);
        showSnackbar('Tarefa atualizada com sucesso!', 'success');
      } else {
        await createTask(taskData);
        showSnackbar('Tarefa criada com sucesso!', 'success');
      }

      navigate(-1);
    } catch (err) {
      showSnackbar('Erro ao salvar a tarefa', 'error');
    }
  };

  return (
    <Container maxWidth={false} sx={styles.containerBox}>
      <Box sx={styles.contentContainer}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" sx={styles.title}>
            {isEdit ? 'Editar Tarefa' : 'Nova Tarefa'}
          </Typography>

          <Stack spacing={1}>
            <InputField
              label="Título *"
              name="title"
              placeholder="Digite o título da tarefa"
              register={register}
              rules={{
                required: 'Campo obrigatório',
                minLength: {
                  value: 3,
                  message: 'O título deve ter no mínimo 3 caracteres',
                },
              }}
              errors={errors}
            />
            <SelectField
              label="Status *"
              name="status"
              placeholder="Selecione o status"
              register={register}
              rules={{ required: 'Campo obrigatório' }}
              errors={errors}
              options={statusOptions}
            />
            <InputField
              label="Data de Entrega *"
              name="due_date"
              type="date"
              register={register}
              rules={{
                required: 'Campo obrigatório',
                validate: value => {
                  const currentDate = new Date();
                  const dueDate = new Date(value);
                  return dueDate > currentDate || 'A data de entrega deve ser no futuro';
                },
              }}
              errors={errors}
              hideLabel
            />
            <InputField
              label="URL da Imagem *"
              name="image_url"
              placeholder="Digite a URL da imagem"
              register={register}
              rules={{ required: 'Campo obrigatório' }}
              errors={errors}
            />

            <Box mt={2}>
              <Stack direction="row" spacing={2} sx={styles.buttonRow}>
                <CancelButton onClick={() => navigate(-1)}>Cancelar</CancelButton>
                <PrimaryButton type="submit">Salvar</PrimaryButton>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
