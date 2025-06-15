import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PrimaryButton from '~/components/atoms/PrimaryButton';
import ConfirmDialog from '~/components/molecules/ConfirmDialog';
import AddCollaboratorModal from '~/components/organisms/AddCollaboratorModal';
import ImportExternalCollaboratorsModal from '~/components/organisms/ImportExternalCollaboratorsModal';
import { useSnackbar } from '~/contexts/SnackbarContext';
import { addCollaborator, getCollaborators, removeCollaborator } from '~/services/projectService';
import stylesFn from './styles';

export default function CollaboratorsManager() {
  const { id } = useParams();
  const [collaborators, setCollaborators] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [externalModalOpen, setExternalModalOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [collaboratorToRemove, setCollaboratorToRemove] = useState(null);
  const { showSnackbar } = useSnackbar();
  const theme = useTheme();
  const styles = stylesFn(theme);

  const fetchCollaborators = async () => {
    try {
      const data = await getCollaborators(id);
      setCollaborators(data);
    } catch (err) {
      console.log('Erro ao buscar colaboradores:', err);
    }
  };

  useEffect(() => {
    fetchCollaborators();
  }, [id]);

  const handleAddCollaborator = async data => {
    try {
      await addCollaborator(id, data);
      setModalOpen(false);
      showSnackbar('Colaborador adicionado com sucesso!', 'success');
      fetchCollaborators();
    } catch (err) {
      console.log('Erro ao adicionar colaborador:', err);
    }
  };

  const handleRemoveCollaborator = userId => {
    setCollaboratorToRemove(userId);
    setConfirmDialogOpen(true);
  };

  const handleAddExternalCollaborator = async collaborator => {
    const collaboratorData = {
      name: `${collaborator.name.first} ${collaborator.name.last}`,
      email: collaborator.email,
      password: '123456',
    };
    try {
      await addCollaborator(id, collaboratorData);
      setExternalModalOpen(false);
      showSnackbar('Colaborador adicionado com sucesso!', 'success');
      fetchCollaborators();
    } catch (err) {
      console.log('Erro ao adicionar colaborador externo:', err);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await removeCollaborator(id, collaboratorToRemove);
      showSnackbar('Colaborador removido com sucesso!', 'success');
      fetchCollaborators();
    } catch (err) {
      showSnackbar('Erro ao remover colaborador', 'error');
    } finally {
      setConfirmDialogOpen(false);
      setCollaboratorToRemove(null);
    }
  };

  return (
    <Box sx={styles.containerBox}>
      <Container maxWidth={false} sx={styles.contentContainer}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={styles.headerTitle}>
            Colaboradores
          </Typography>
          <Stack direction="row" spacing={1}>
            <PrimaryButton onClick={() => setModalOpen(true)}>Adicionar Colaborador</PrimaryButton>
            <PrimaryButton onClick={() => setExternalModalOpen(true)}>
              Importar Colaborador
            </PrimaryButton>
          </Stack>
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
              <ListItemText primary={c.name} secondary={c.email} />
            </ListItem>
          ))}
        </List>
      </Container>

      <AddCollaboratorModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddCollaborator}
      />

      <ImportExternalCollaboratorsModal
        open={externalModalOpen}
        onClose={() => setExternalModalOpen(false)}
        onAdd={handleAddExternalCollaborator}
      />

      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Tem certeza de que deseja remover este colaborador?"
      />
    </Box>
  );
}
