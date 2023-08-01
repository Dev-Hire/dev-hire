import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ConfirmProps {
  title?: string;
  message: string;
  confirm?: string;
  cancel?: string;
  isOpen?: boolean;
  onClose?: (isConfirm: boolean) => void;
}

export default function Confirm({
  title,
  message,
  confirm = '확인',
  cancel = '취소',
  isOpen = false,
  onClose,
}: ConfirmProps) {
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
        <Button onClick={() => handleClose(false)} autoFocus>
          {cancel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
