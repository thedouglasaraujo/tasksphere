import React, { useState, useEffect } from 'react';
import {
    Modal,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from './styles';

export default function ImportExternalCollaboratorsModal({ open, onClose, onAdd }) {
    const [loading, setLoading] = useState(false);
    const [externalCollaborators, setExternalCollaborators] = useState([]);

    const fetchExternalCollaborators = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://randomuser.me/api/?results=5&inc=name,email,picture');
            const data = await response.json();
            setExternalCollaborators(data.results);
        } catch (err) {
            console.error('Erro ao buscar colaboradores externos', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            fetchExternalCollaborators();
        }
    }, [open]);

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={styles.modalBox}>
                <Typography variant="h6" sx={styles.title}>Importar Colaboradores Externos</Typography>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Typography variant="subtitle1" sx={{ mt: 2 }}>
                            Colaboradores sugeridos:
                        </Typography>
                        {externalCollaborators.length > 0 ? (
                            <List sx={{ mt: 2 }}>
                                {externalCollaborators.map((collaborator, index) => (
                                    <ListItem
                                        key={index}
                                        secondaryAction={
                                            <IconButton edge="end" onClick={() => onAdd(collaborator)}>
                                                <AddIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText primary={`${collaborator.name.first} ${collaborator.name.last}`} secondary={collaborator.email} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                                Nenhum colaborador externo encontrado.
                            </Typography>
                        )}
                    </>
                )}
            </Box>
        </Modal>
    );
}
