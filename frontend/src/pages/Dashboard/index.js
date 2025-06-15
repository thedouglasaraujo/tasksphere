import { Box, Card, Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '~/components/atoms/ErrorMessage';
import LoadingIndicator from '~/components/atoms/LoadingIndicator';
import PrimaryButton from '~/components/atoms/PrimaryButton';
import ProjectDateChips from '~/components/atoms/ProjectDateChips';
import { getProjects } from '~/services/projectService';
import stylesFn from './styles';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = stylesFn(theme);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorMessage message="Erro ao carregar projetos." />;

  return (
    <Box sx={styles.containerBox}>
      <Container maxWidth={false} sx={styles.contentContainer}>
        <Box sx={styles.headerBox}>
          <Typography variant="h4" sx={styles.headerTitle}>
            Meus Projetos
          </Typography>
          <PrimaryButton onClick={() => navigate('/projects/new')}>Novo Projeto</PrimaryButton>
        </Box>

        {projects.length === 0 ? (
          <Typography sx={styles.noProjectsText}>Nenhum projeto encontrado.</Typography>
        ) : (
          <Grid container spacing={4}>
            {projects.map(project => (
              <Grid item xs={12} sm={6} key={project.id}>
                <Card
                  sx={styles.card}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  elevation={0}
                >
                  <Box>
                    <Typography variant="h6" noWrap sx={styles.title}>
                      {project.name}
                    </Typography>
                    <Typography variant="body2" sx={styles.description}>
                      {project.description || 'Sem descrição'}
                    </Typography>
                  </Box>

                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <ProjectDateChips startDate={project.start_date} endDate={project.end_date} />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
