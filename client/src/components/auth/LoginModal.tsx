import { postUserLogin } from '@/api/auth.api';
import { UserLoginRequest } from '@/types/auth';
import { Link } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { AxiosError } from 'axios';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose?: (isSuccess: boolean) => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserLoginRequest>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<UserLoginRequest>({
    email: '',
    password: '',
  });

  const { mutate, isError } = useMutation(postUserLogin, {
    onSuccess: (data) => {
      if (!data.data.token) {
        throw new Error('토큰을 받아오지 못하였습니다.');
      }
      sessionStorage.setItem('token', data.data.token);
      navigate('/home');
    },
    onError: (error: AxiosError) => {
      const { message } = error;
      if (message === '존재하지 않는 아이디입니다.') setFormErrors({ email: message, password: '' });
      else setFormErrors({ email: '', password: message });
    },
  });

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitLogin: FormEventHandler = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleClose = (isSuccess: boolean = false) => {
    if (typeof onClose === 'function') onClose(isSuccess);
  };

  return (
    <div>
      <Dialog open={isOpen}>
        <form onSubmit={handleSubmitLogin}>
          <DialogTitle>로그인</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              id="email"
              type="email"
              label="이메일 주소"
              variant="standard"
              autoComplete="email"
              value={formData.email}
              onChange={handleChangeInput}
              error={isError}
              helperText={formErrors.email}
              required
            />

            <TextField
              fullWidth
              margin="dense"
              id="password"
              label="비밀번호"
              type="password"
              variant="standard"
              value={formData.password}
              onChange={handleChangeInput}
              error={isError}
              helperText={formErrors.password}
              required
            />

            <DialogContentText>
              <small>
                계정이 없으신가요?{' '}
                <Link
                  onClick={() => navigate('/register')}
                  component="button"
                  sx={{ color: 'inherit', textDecorationColor: 'inherit', fontWeight: 500, verticalAlign: 'baseline' }}
                >
                  회원가입하러 가기
                </Link>
              </small>
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button color="error" onClick={() => handleClose(false)}>
              취소
            </Button>
            <Button type="submit">로그인</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
