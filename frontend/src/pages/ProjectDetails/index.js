import React from 'react'
import {
    Box,
    Typography,
    Divider,
    Container,
    Stack,
} from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './styles'

import CollaboratorsList from '../../components/molecules/CollaboratorsList'
import TaskList from '../../components/organisms/TaskList'
import ProjectDateChips from '../../components/atoms/ProjectDateChips'
import ProjectActionsButtons from '../../components/atoms/ProjectActionsButtons'
import TextButton from '../../components/atoms/TextButton'

const mockProject = {
    id: 1,
    name: 'Projeto Alpha',
    description: 'Descrição detalhada do projeto.',
    start_date: '2025-01-10',
    end_date: '2025-04-15',
    collaborators: [102, 103, 104],
    tasks: [
        { id: 1, title: 'Planejamento inicial', status: 'Concluída' },
        { id: 2, title: 'Definir escopo', status: 'Pendente' },
        { id: 3, title: 'Desenvolver protótipo', status: 'Em andamento' },
    ],
}

export default function ProjectDetails() {
    const { id } = useParams()
    const navigate = useNavigate()

    const handleEdit = () => {
        navigate(`/projects/${id}/edit`)
    }

    const handleDelete = () => {
        console.log('Excluir projeto', id)
    }

    return (
        <Box sx={styles.containerBox}>
            <Container maxWidth={false} sx={styles.contentContainer}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h4" sx={styles.headerTitle}>
                        {mockProject.name}
                    </Typography>

                    <Stack direction="row" spacing={1}>
                        <ProjectActionsButtons
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </Stack>
                </Box>

                <Typography sx={styles.projectDescription}>
                    {mockProject.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <ProjectDateChips
                        startDate={mockProject.start_date}
                        endDate={mockProject.end_date}
                    />
                </Box>

                <Typography variant="h6" sx={styles.title} mt={4}>
                    Colaboradores
                </Typography>

                <CollaboratorsList collaborators={mockProject.collaborators} />

                <Divider sx={{ my: 4 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={styles.title}>
                        Tarefas
                    </Typography>
                    <TextButton onClick={() => navigate(`/projects/${id}/tasks/new`)}>
                        + Adicionar Tarefa
                    </TextButton>
                </Box>

                <TaskList tasks={mockProject.tasks} />
            </Container>
        </Box>
    )
}
