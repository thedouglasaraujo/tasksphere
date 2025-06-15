import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack
} from '@mui/material';
import PrimaryButton from '../../atoms/PrimaryButton';
import TextButton from '../../atoms/TextButton';

export default function ConfirmDialog({ open, onClose, onConfirm, message }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle color="primary" fontWeight={'bold'}>Confirmar Ação</DialogTitle>
            <DialogContent>
                <p>{message}</p>
            </DialogContent>
            <DialogActions>
                <Stack direction="row" spacing={2}>
                    <TextButton onClick={onClose}>Cancelar</TextButton>
                    <PrimaryButton label="Confirmar" onClick={onConfirm}></PrimaryButton>
                </Stack>
            </DialogActions>
        </Dialog>
    );
}
