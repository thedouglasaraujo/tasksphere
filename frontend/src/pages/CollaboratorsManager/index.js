import React, { useEffect, useState } from 'react';
import {
    Box, Container, Typography, Divider, List, ListItem, ListItemText,
    IconButton
} from '@mui/material';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './styles';
import AddCollaboratorModal from '../../components/organisms/AddCollaboratorModal';
import PrimaryButton from '../../components/atoms/PrimaryButton';
import { getCollaborators, addCollaborator, removeCollaborator } from '../../services/projectService';

export default function CollaboratorsManager() {
    const { id } = useParams();
    const [collaborators, setCollaborators] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchCollaborators = async () => {
            try {
                const data = await getCollaborators(id);
                setCollaborators(data);
            } catch (err) {
                console.log('Erro ao buscar colaboradores:', err);
            }
        };
        fetchCollaborators();
    }, [id]);

    const handleAddCollaborator = async (data) => {
        try {
            await addCollaborator(id, data);
            setModalOpen(false);
        } catch (err) {
            console.log('Erro ao adicionar colaborador:', err);
        }
    };

    const handleRemoveCollaborator = async (userId) => {
        try {
            await removeCollaborator(id, userId);
            setCollaborators(collaborators.filter(c => c.id !== userId));
        } catch (err) {
            console.log('Erro ao remover colaborador:', err);
        }
    };

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
                                <IconButton edge="end" onClick={() => handleRemoveCollaborator(c.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText primary={c.name} />
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
    );
}
