import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface LoadingProps {
  message: string;
  isOpen?: boolean;
}

export default function Loading({ message, isOpen = false }: LoadingProps) {
  return (
    <Dialog open={isOpen}>
      <DialogTitle style={{ marginTop: '10px', textAlign: 'center' }}>
        <CircularProgress />
      </DialogTitle>

      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
