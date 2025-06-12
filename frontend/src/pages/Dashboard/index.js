import React, { useState } from 'react'
import { Box, Container, Typography, Button, Grid, Card, Chip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import styles from './styles'

const mockProjects = [
    {
        id: 1,
        name: 'Projeto Alpha',
        description: 'Descrição do projeto Alpha',
        start_date: '2025-01-10',
        end_date: '2025-04-15',
        creator_id: 101,
        collaborators: [102, 103],
    },
        {
        id: 1,
        name: 'Projeto Alpha',
        description: 'Descrição do projeto Alpha',
        start_date: '2025-01-10',
        end_date: '2025-04-15',
        creator_id: 101,
        collaborators: [102, 103],
    },
        {
        id: 1,
        name: 'Projeto Alpha',
        description: 'Descrição do projeto Alpha',
        start_date: '2025-01-10',
        end_date: '2025-04-15',
        creator_id: 101,
        collaborators: [102, 103],
    },
    {
        id: 2,
        name: 'Projeto Beta',
        description: '',
        start_date: '2025-02-01',
        end_date: '2025-06-30',
        creator_id: 102,
        collaborators: [101],
    },
]

export default function Dashboard() {
    const [projects] = useState(mockProjects)
    const navigate = useNavigate()

    return (
        <Box sx={styles.containerBox}>
            <Container maxWidth={false} sx={styles.contentContainer}>
                <Box sx={styles.headerBox}>
                    <Typography variant="h4" sx={styles.headerTitle}>
                        Meus Projetos
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        sx={styles.buttonNewProject}
                        onClick={() => navigate('/projects/new')}
                    >
                        Novo Projeto
                    </Button>
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
                                        <Chip label={`Início: ${project.start_date}`} color="info" size="small" sx={styles.chipStart} />
                                        <Chip label={`Fim: ${project.end_date}`} color="warning" size="small" sx={styles.chipEnd} />
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    )
}
