import React, { useState } from 'react'
import {
    Box, Container, Typography, Divider, List, ListItem, ListItemText,
    IconButton
} from '@mui/material'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from './styles'
import AddCollaboratorModal from '../../components/organisms/AddCollaboratorModal'
import PrimaryButton from '../../components/atoms/PrimaryButton'

export default function CollaboratorsManager() {
    const { id } = useParams()
    const [collaborators, setCollaborators] = useState([{ id: 102 }, { id: 103 }])
    const [modalOpen, setModalOpen] = useState(false)

    const handleRemove = (userId) => {
        console.log('Removendo colaborador:', userId)
    }

    const handleAddCollaborator = (form) => {
        console.log('Adicionar colaborador:', form)
    }

    return (
        <Box sx={styles.containerBox}>
            <Container maxWidth={false} sx={styles.contentContainer}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" sx={styles.headerTitle}>
                        Colaboradores do Projeto #{id}
                    </Typography>
                    <PrimaryButton
                        label="Adicionar Colaborador"
                        onClick={() => setModalOpen(true)}
                    />
                </Box>

                <Divider sx={{ my: 4 }} />

                <List>
                    {collaborators.map(c => (
                        <ListItem
                            key={c.id}
                            secondaryAction={
                                <IconButton edge="end" onClick={() => handleRemove(c.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText primary={`Usuário ${c.id}`} secondary={c.name} />
                        </ListItem>
                    ))}
                </List>
            </Container>

            <AddCollaboratorModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onAdd={handleAddCollaborator}
            />
        </Box>
    )
}
