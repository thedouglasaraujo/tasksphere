import { Box, Container, Divider, Pagination, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import ErrorMessage from '~/components/atoms/ErrorMessage';
import LoadingIndicator from '~/components/atoms/LoadingIndicator';
import ProjectActionsButtons from '~/components/atoms/ProjectActionsButtons';
import ProjectDateChips from '~/components/atoms/ProjectDateChips';
import TextButton from '~/components/atoms/TextButton';
import CollaboratorsList from '~/components/molecules/CollaboratorsList';
import ConfirmDialog from '~/components/molecules/ConfirmDialog';
import TaskFilter from '~/components/molecules/TaskFilter';
import TaskList from '~/components/organisms/TaskList';
import { deleteProject, getProjectById } from '~/services/projectService';
import { getTasks } from '~/services/taskService';
import stylesFn from './styles';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = stylesFn(theme);

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState({
    title: '',
    status: '',
    page: 1,
    limit: 10,
  });

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(id);
        setProject(data);
      } catch (err) {
        setError(true);
      }
    };
    fetchProject();
  }, [id]);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const { title, status, page, limit } = filters;
        const project_id = id;

        const data = await getTasks({ project_id, title, status, page, limit });
        setTasks(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      fetchTasks();
    }, 500);

    return () => clearTimeout(debounceTimeout.current);
  }, [filters, id, project]);

  const handleFilterChange = newFilters => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const handlePageChange = (_, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      page: value,
    }));
  };

  const handleEdit = () => {
    navigate(`/projects/${id}/edit`);
  };

  const handleDelete = () => {
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProject(id);
      navigate('/dashboard');
    } catch (err) {
      console.log('Erro ao excluir projeto:', err);
    }
    setOpenConfirmDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  if (loading) return <LoadingIndicator />;
  if (error || !project) return <ErrorMessage message="Projeto não encontrado." />;

  return (
    <Box sx={styles.containerBox}>
      <Container maxWidth={false} sx={styles.contentContainer}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={styles.headerTitle}>
            {project.name}
          </Typography>

          <Stack direction="row" spacing={1}>
            {project.canManage && (
              <ProjectActionsButtons onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </Stack>
        </Box>

        <Typography sx={styles.projectDescription}>
          {project.description || 'Sem descrição'}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <ProjectDateChips startDate={project.start_date} endDate={project.end_date} />
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={styles.title}>
            Colaboradores
          </Typography>
          {project.canManage && (
            <TextButton onClick={() => navigate(`/projects/${id}/collaborators`)}>
              Gerenciar Colaboradores
            </TextButton>
          )}
        </Box>

        <CollaboratorsList collaborators={project.collaborators} />

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={styles.title}>
            Tarefas
          </Typography>
          <TextButton onClick={() => navigate(`/projects/${id}/tasks/new`)}>
            Adicionar Tarefa
          </TextButton>
        </Box>

        <TaskFilter filters={filters} onFilterChange={handleFilterChange} />
        <TaskList tasks={tasks.data} />

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={tasks.pages}
            page={filters.page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Container>

      <ConfirmDialog
        open={openConfirmDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Tem certeza de que deseja excluir este projeto?"
      />
    </Box>
  );
}
