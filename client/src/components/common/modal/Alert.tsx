import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertProps {
  title?: string;
  message: string;
  confirm?: string;
  isOpen?: boolean;
  onClose?: (isConfirm: boolean) => void;
}

export default function Alert({ title, message, confirm = '확인', isOpen = false, onClose }: AlertProps) {
  const handleClose = (isConfirm: boolean) => {
    if (typeof onClose === 'function') onClose(isConfirm);
  };

  return (
    <Dialog open={isOpen} onClose={() => handleClose(false)}>
      {title && <DialogTitle>{title}</DialogTitle>}

      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => handleClose(true)}>{confirm}</Button>
      </DialogActions>
    </Dialog>
  );
}
