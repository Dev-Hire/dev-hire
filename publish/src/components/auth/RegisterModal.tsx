import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function RegisterModal({
  isOpen,
  hide,
}: {
  isOpen: boolean;
  hide: (isConfirm: boolean) => void;
}) {
  const handleClose = () => {
    hide(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>회원가입</DialogTitle>
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

          <TextField
            autoFocus
            margin="dense"
            id="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="이름"
            type="name"
            fullWidth
            variant="standard"
          />

          <DialogContentText>
            <small>
              계정이 이미 있으신가요?{' '}
              <span className="link">로그인하러 가기</span>
            </small>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="error" onClick={handleClose}>
            취소
          </Button>
          <Button>회원가입</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
