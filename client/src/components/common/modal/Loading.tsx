import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface LoadingProps {
  message?: string;
  isOpen?: boolean;
}

export default function Loading({ message = '잠시만 기다려주세요...', isOpen = false }: LoadingProps) {
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
