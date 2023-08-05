import { postUserRegister } from '@/api/auth.api';
import { UserRegisterRequest } from '@/types/auth';
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

interface RegisterModalProps {
  isOpen: boolean;
  onClose?: (isSuccess: boolean) => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserRegisterRequest & { passwordConfirm: string }>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
  });
  const [formErrors, setFormErrors] = useState<UserRegisterRequest & { passwordConfirm: string }>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
  });
  const { mutate, isError } = useMutation(postUserRegister, {
    onMutate: (data: UserRegisterRequest & { passwordConfirm: string }) => {
      if (data.password !== data.passwordConfirm) {
        setFormErrors((prev) => ({ ...prev, passwordConfirm: '비밀번호가 일치하지 않습니다.' }));
        throw new Error('비밀번호가 일치하지 않습니다.');
      }
    },
    onSuccess: (data) => {
      if (!data.data.token) {
        throw new Error('토큰을 받아오지 못하였습니다.');
      }
      sessionStorage.setItem('token', data.data.token);
      navigate('/home');
    },
    onError: (error: AxiosError) => {
      const { message } = error;
      if (message === '이미 존재하는 아이디입니다.') setFormErrors((prev) => ({ ...prev, email: message }));
    },
  });

  const handleClose = (isSuccess: boolean = false) => {
    if (typeof onClose === 'function') onClose(isSuccess);
  };

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitLogin: FormEventHandler = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div>
      <Dialog open={isOpen}>
        <form onSubmit={handleSubmitLogin}>
          <DialogTitle>회원가입</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              id="email"
              label="이메일 주소"
              type="email"
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
              id="name"
              label="이름"
              variant="standard"
              value={formData.name}
              onChange={handleChangeInput}
              error={isError}
              helperText={formErrors.name}
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

            <TextField
              fullWidth
              margin="dense"
              id="passwordConfirm"
              label="비밀번호 확인"
              type="password"
              variant="standard"
              value={formData.passwordConfirm}
              onChange={handleChangeInput}
              error={isError}
              helperText={formErrors.passwordConfirm}
              required
            />

            <DialogContentText>
              <small>
                계정이 이미 있으신가요?{' '}
                <Link
                  onClick={() => navigate('/login')}
                  component="button"
                  sx={{ color: 'inherit', textDecorationColor: 'inherit', fontWeight: 500, verticalAlign: 'baseline' }}
                >
                  로그인하러 가기
                </Link>
              </small>
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button color="error" onClick={() => handleClose(false)}>
              취소
            </Button>
            <Button type="submit">회원가입</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
