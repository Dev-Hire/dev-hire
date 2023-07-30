import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

interface LoginModalProps {
  isOpen: boolean;
  onClose?: (isSuccess: boolean) => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const handleClose = (isSuccess: boolean = false) => {
    if (typeof onClose === 'function') onClose(isSuccess);
  };

  return (
    <div>
      <Dialog open={isOpen}>
        <DialogTitle>로그인</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="이메일 주소"
            type="email"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="비밀번호"
            type="password"
            fullWidth
            variant="standard"
          />

          <DialogContentText>
            <small>
              계정이 없으신가요? <span className="link">회원가입하러 가기</span>
            </small>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="error" onClick={() => handleClose(false)}>
            취소
          </Button>
          <Button>로그인</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
