import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './styles';
import ProjectDateChips from '../../components/atoms/ProjectDateChips';
import PrimaryButton from '../../components/atoms/PrimaryButton';
import { getProjects } from '../../services/projectService';
import LoadingIndicator from '../../components/atoms/LoadingIndicator'
import ErrorMessage from '../../components/atoms/ErrorMessage'

export default function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

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
                    <PrimaryButton
                        label="Novo Projeto"
                        onClick={() => navigate('/projects/new')}
                    />
                </Box>

                {projects.length === 0 ? (
                    <Typography sx={styles.noProjectsText}>Nenhum projeto encontrado.</Typography>
                ) : (
                    <Grid container spacing={4}>
                        {projects.map((project) => (
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
                                        <ProjectDateChips
                                            startDate={project.start_date}
                                            endDate={project.end_date}
                                        />
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
